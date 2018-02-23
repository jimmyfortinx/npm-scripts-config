const execSh = require("exec-sh");
const args = require("./args");

class ScriptRunner {
    constructor(scripts) {
        this.scripts = scripts;
    }

    run() {
        const cmd = this.scripts[args.getScriptName()];

        execSh(cmd + args.getOtherArgsInline(), function (err) {
            if (err) {
                process.exit(err.code);
            }
        });
    }
}

module.exports = ScriptRunner;