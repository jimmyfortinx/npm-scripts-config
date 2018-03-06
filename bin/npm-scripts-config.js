#! /usr/bin/env node
const configLoader = require("../config-loader");
const ScriptRunner = require("../script-runner");

configLoader.load()
    .then((config) => {
        const runner = new ScriptRunner(config);
        runner.run();
    })
    .catch((error) => {
        console.error(error);
    });