"use strict";

/*global document*/
var fixture = document.getElementById("qunit-fixture");

/*global QUnit*/
QUnit.module('loglevel', {
    setup: function() {
    },
    teardown: function() {
    }
});

/*global test*/
test('basic test', function() {
    /*global ok*/
    /*global logging*/
    /*global log*/

    // Check that noConflict restored the original log
    ok(typeof log === "function", "log is a function");
    ok(log === QUnit.log, "log is Qunit.log");

    // Check that noConflict setup logging
    ok(typeof logging !== "undefined", "logging is defined");
    ok(typeof logging === "object", "logging is an object");
    ok(typeof logging.trace === "function", "trace is a function");
    ok(typeof logging.debug === "function", "debug is a function");
    ok(typeof logging.info === "function", "info is a function");
    ok(typeof logging.warn === "function", "warn is a function");
    ok(typeof logging.error === "function", "error is a function");
    ok(typeof logging.setLevel === "function", "setLevel is a function");
    ok(typeof logging.setDefaultLevel === "function", "setDefaultLevel is a function");
    ok(typeof logging.enableAll === "function", "enableAll is a function");
    ok(typeof logging.disableAll === "function", "disableAll is a function");
    ok(typeof logging.getLogger === "function", "getLogger is a function");

    // Use the API to make sure it doesn't blantantly fail with exceptions
    logging.trace("a trace message");
    logging.debug("a debug message");
    logging.info("an info message");
    logging.warn("a warn message");
    logging.error("an error message");

    var newLogger = logging.getLogger("newLogger");
    newLogger.trace("a trace message");
    newLogger.debug("a debug message");
    newLogger.info("an info message");
    newLogger.warn("a warn message");
    newLogger.error("an error message");
});
