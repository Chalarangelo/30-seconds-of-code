"use strict"

if (Number((/([0-9]+)\./.exec(process.version) || [])[1]) >= 10) {
    var Console = require("console").Console;
    global.console = new Console({
        stdout: process.stdout,
        stderr: process.stderr,
        colorMode: false
    });
}

