exports.getScriptName = function () {
    return process.argv[2];
}

exports.getOtherArgs = function () {
    return process.argv.slice(3);
}

exports.getOtherArgsInline = function () {
    const otherArguments = exports.getOtherArgs();
    return otherArguments.length ? " " + otherArguments.join(" ") : "";
}