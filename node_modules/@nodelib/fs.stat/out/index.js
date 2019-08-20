"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const optionsManager = require("./managers/options");
const statProvider = require("./providers/stat");
/**
 * Asynchronous API.
 */
function stat(path, opts) {
    return new Promise((resolve, reject) => {
        statProvider.async(path, optionsManager.prepare(opts), (err, stats) => err ? reject(err) : resolve(stats));
    });
}
exports.stat = stat;
function statCallback(path, optsOrCallback, callback) {
    if (typeof optsOrCallback === 'function') {
        callback = optsOrCallback; /* tslint:disable-line: no-parameter-reassignment */
        optsOrCallback = undefined; /* tslint:disable-line: no-parameter-reassignment */
    }
    if (typeof callback === 'undefined') {
        throw new TypeError('The "callback" argument must be of type Function.');
    }
    statProvider.async(path, optionsManager.prepare(optsOrCallback), callback);
}
exports.statCallback = statCallback;
/**
 * Synchronous API.
 */
function statSync(path, opts) {
    return statProvider.sync(path, optionsManager.prepare(opts));
}
exports.statSync = statSync;
