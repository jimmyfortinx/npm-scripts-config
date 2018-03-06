const nmp = require('npm-module-path');
const fs = require("fs");
const path = require("path");
const rcfile = require("rc-config-loader");

function parseExtendsInConfig(config) {
    if (config && config["@extends"]) {
        const extendModuleName = config["@extends"];

        return nmp.resolveOne(extendModuleName)
            .then((extendModulePath) => {
                if (!extendModulePath) {
                    throw new Error(`@extends failed because module "${extendModuleName}" can not be found under node_modules folder.`);
                }

                const extendConfig = rcfile("scripts", {
                    cwd: extendModulePath
                });

                // When no configuration file found it will return the root configuration
                // file, so we need to validate the file path.
                if (path.normalize(extendConfig.filePath).indexOf(path.normalize(extendModulePath)) == -1) {
                    throw new Error(`@extends failed because module "${extendModuleName}" does not contain a configuration file.`);
                }

                delete config["@extends"];

                const newConfig = Object.assign({}, config, extendConfig.config)

                return parseExtendsInConfig(newConfig);
            });
    }

    return Promise.resolve(config);
}

exports.load = function () {
    const rootConfig = rcfile("scripts");

    return parseExtendsInConfig(rootConfig.config);
}