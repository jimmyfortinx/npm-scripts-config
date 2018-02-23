#! /usr/bin/env node
const configLoader = require("../config-loader");
const ScriptRunner = require("../script-runner");

const config = configLoader.load();

const runner = new ScriptRunner(config);
runner.run();