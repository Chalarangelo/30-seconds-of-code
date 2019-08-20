"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var optionsManager = require("./managers/options");
var taskManager = require("./managers/tasks");
var reader_async_1 = require("./providers/reader-async");
var reader_stream_1 = require("./providers/reader-stream");
var reader_sync_1 = require("./providers/reader-sync");
var arrayUtils = require("./utils/array");
var streamUtils = require("./utils/stream");
/**
 * Synchronous API.
 */
function sync(source, opts) {
    assertPatternsInput(source);
    var works = getWorks(source, reader_sync_1.default, opts);
    return arrayUtils.flatten(works);
}
exports.sync = sync;
/**
 * Asynchronous API.
 */
function async(source, opts) {
    try {
        assertPatternsInput(source);
    }
    catch (error) {
        return Promise.reject(error);
    }
    var works = getWorks(source, reader_async_1.default, opts);
    return Promise.all(works).then(arrayUtils.flatten);
}
exports.async = async;
/**
 * Stream API.
 */
function stream(source, opts) {
    assertPatternsInput(source);
    var works = getWorks(source, reader_stream_1.default, opts);
    return streamUtils.merge(works);
}
exports.stream = stream;
/**
 * Return a set of tasks based on provided patterns.
 */
function generateTasks(source, opts) {
    assertPatternsInput(source);
    var patterns = [].concat(source);
    var options = optionsManager.prepare(opts);
    return taskManager.generate(patterns, options);
}
exports.generateTasks = generateTasks;
/**
 * Returns a set of works based on provided tasks and class of the reader.
 */
function getWorks(source, _Reader, opts) {
    var patterns = [].concat(source);
    var options = optionsManager.prepare(opts);
    var tasks = taskManager.generate(patterns, options);
    var reader = new _Reader(options);
    return tasks.map(reader.read, reader);
}
function assertPatternsInput(source) {
    if ([].concat(source).every(isString)) {
        return;
    }
    throw new TypeError('Patterns must be a string or an array of strings');
}
function isString(source) {
    /* tslint:disable-next-line strict-type-predicates */
    return typeof source === 'string';
}
