const path = require("path");
const rcfile = require("rc-config-loader");

function parseExtendsInConfig(config) {
    if (config && config["@extends"]) {
        const extendPath = config["@extends"];
        const extendConfig = rcfile("scripts", {
            cwd: path.join("node_modules", extendPath)
        });

        delete config["@extends"];

        const newConfig = Object.assign({}, config, extendConfig.config)

        return parseExtendsInConfig(newConfig);
    }

    return config;
}

exports.load = function () {
    const rootConfig = rcfile("scripts");

    return parseExtendsInConfig(rootConfig.config);
}