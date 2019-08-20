"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merge2 = require("merge2");
/**
 * Merge multiple streams and propagate their errors into one stream in parallel.
 */
function merge(streams) {
    var mergedStream = merge2(streams);
    streams.forEach(function (stream) {
        stream.on('error', function (err) { return mergedStream.emit('error', err); });
    });
    return mergedStream;
}
exports.merge = merge;
