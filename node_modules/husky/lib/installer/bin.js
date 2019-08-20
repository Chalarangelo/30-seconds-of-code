"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const isCI = require("is-ci");
const path = require("path");
const _1 = require("./");
// Just for testing
if (process.env.HUSKY_DEBUG === 'true') {
    console.log(`husky:debug INIT_CWD=${process.env.INIT_CWD}`);
}
// Action can be "install" or "uninstall"
// huskyDir is ONLY used in dev, don't use this arguments
const [, , action, huskyDir = path.join(__dirname, '../..')] = process.argv;
// Find Git dir
try {
    // Run installer
    if (action === 'install') {
        _1.install(huskyDir, undefined, isCI);
    }
    else {
        _1.uninstall(huskyDir);
    }
}
catch (error) {
    console.log(`husky > failed to ${action}`);
    console.log(error.message);
}
