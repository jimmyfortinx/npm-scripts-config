const execSh = require("exec-sh");
const args = require("./args");

class ScriptRunner {
    constructor(scripts) {
        this.scripts = scripts;
    }

    run() {
        const cmd = this.scripts[args.getScriptName()];
        const cmdWithArgs = cmd + args.getOtherArgsInline();

        console.log(`npm-scripts-config: ${cmdWithArgs}`);

        execSh(cmdWithArgs, function (err) {
            if (err) {
                process.exit(err.code);
            }
        });
    }
}

module.exports = ScriptRunner;