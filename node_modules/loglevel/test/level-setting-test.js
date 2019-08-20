"use strict";

var logMethods = [
    "trace",
    "debug",
    "info",
    "warn",
    "error"
];

function getConsoleMethod(logMethodName) {
    if (logMethodName === 'debug') {
        return console.log;
    } else {
        return console[logMethodName];
    }
}

define(['../lib/loglevel'], function(log) {
    var originalConsole = window.console;

    describe("Basic log levels changing tests:", function() {
        beforeEach(function() {
            window.console = {};

            for (var ii = 0; ii < logMethods.length; ii++) {
                window.console[logMethods[ii]] = jasmine.createSpy(logMethods[ii]);
            }

            window.console.log = jasmine.createSpy('log');
        });

        afterEach(function() {
            window.console = originalConsole;
        });

        describe("log.enableAll()", function() {
            it("enables all log methods", function() {
                log.enableAll(false);

                for (var ii = 0; ii < logMethods.length; ii++) {
                    var method = logMethods[ii];
                    log[method]("a log message");

                    expect(getConsoleMethod(method)).toHaveBeenCalled();
                }
            });
        });

        describe("log.disableAll()", function() {
            it("disables all log methods", function() {
                log.disableAll(false);

                for (var ii = 0; ii < logMethods.length; ii++) {
                    var method = logMethods[ii];
                    log[method]("a log message");

                    expect(getConsoleMethod(method)).not.toHaveBeenCalled();
                }
            });
        });

        describe("log.setLevel() throws errors if given", function() {
            it("no level argument", function() {
                expect(function() {
                    log.setLevel();
                }).toThrow("log.setLevel() called with invalid level: undefined");
            });

            it("a null level argument", function() {
                expect(function() {
                    log.setLevel(null);
                }).toThrow("log.setLevel() called with invalid level: null");
            });

            it("an undefined level argument", function() {
                expect(function() {
                    log.setLevel(undefined);
                }).toThrow("log.setLevel() called with invalid level: undefined");
            });

            it("an invalid log level index", function() {
                expect(function() {
                    log.setLevel(-1);
                }).toThrow("log.setLevel() called with invalid level: -1");
            });

            it("an invalid log level name", function() {
                expect(function() {
                    log.setLevel("InvalidLevelName");
                }).toThrow("log.setLevel() called with invalid level: InvalidLevelName");
            });
        });

        describe("setting log level by name", function() {
            function itCanSetLogLevelTo(level) {
                it("can set log level to " + level, function() {
                    log.setLevel(level, false);

                    log[level]("log message");
                    expect(getConsoleMethod(level)).toHaveBeenCalled();
                });
            }

            itCanSetLogLevelTo("trace");
            itCanSetLogLevelTo("debug");
            itCanSetLogLevelTo("info");
            itCanSetLogLevelTo("warn");
            itCanSetLogLevelTo("error");
        });

        describe("log level settings", function() {
            describe("log.trace", function() {
                it("is enabled at trace level", function() {
                    log.setLevel(log.levels.TRACE);

                    log.trace("a log message");
                    expect(console.trace).toHaveBeenCalled();
                });

                it("is disabled at debug level", function() {
                    log.setLevel(log.levels.DEBUG);

                    log.trace("a log message");
                    expect(console.trace).not.toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.trace("a log message");
                    expect(console.trace).not.toHaveBeenCalled();
                });
            });

            describe("log.debug", function() {
                it("is enabled at trace level", function() {
                    log.setLevel(log.levels.TRACE);

                    log.debug("a log message");
                    expect(console.log).toHaveBeenCalled();
                });

                it("is enabled at debug level", function() {
                    log.setLevel(log.levels.DEBUG);

                    log.debug("a log message");
                    expect(console.log).toHaveBeenCalled();
                });

                it("is disabled at info level", function() {
                    log.setLevel(log.levels.INFO);

                    log.debug("a log message");
                    expect(console.log).not.toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.debug("a log message");
                    expect(console.log).not.toHaveBeenCalled();
                });
            });

            describe("log.log", function() {
                it("is enabled at trace level", function() {
                    log.setLevel(log.levels.TRACE);

                    log.log("a log message");
                    expect(console.log).toHaveBeenCalled();
                });

                it("is enabled at debug level", function() {
                    log.setLevel(log.levels.DEBUG);

                    log.log("a log message");
                    expect(console.log).toHaveBeenCalled();
                });

                it("is disabled at info level", function() {
                    log.setLevel(log.levels.INFO);

                    log.log("a log message");
                    expect(console.log).not.toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.log("a log message");
                    expect(console.log).not.toHaveBeenCalled();
                });
            });

            describe("log.info", function() {
                it("is enabled at debug level", function() {
                    log.setLevel(log.levels.DEBUG);

                    log.info("a log message");
                    expect(console.info).toHaveBeenCalled();
                });

                it("is enabled at info level", function() {
                    log.setLevel(log.levels.INFO);

                    log.info("a log message");
                    expect(console.info).toHaveBeenCalled();
                });

                it("is disabled at warn level", function() {
                    log.setLevel(log.levels.WARN);

                    log.info("a log message");
                    expect(console.info).not.toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.info("a log message");
                    expect(console.info).not.toHaveBeenCalled();
                });
            });

            describe("log.warn", function() {
                it("is enabled at info level", function() {
                    log.setLevel(log.levels.INFO);

                    log.warn("a log message");
                    expect(console.warn).toHaveBeenCalled();
                });

                it("is enabled at warn level", function() {
                    log.setLevel(log.levels.WARN);

                    log.warn("a log message");
                    expect(console.warn).toHaveBeenCalled();
                });

                it("is disabled at error level", function() {
                    log.setLevel(log.levels.ERROR);

                    log.warn("a log message");
                    expect(console.warn).not.toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.warn("a log message");
                    expect(console.warn).not.toHaveBeenCalled();
                });
            });

            describe("log.error", function() {
                it("is enabled at warn level", function() {
                    log.setLevel(log.levels.WARN);

                    log.error("a log message");
                    expect(console.error).toHaveBeenCalled();
                });

                it("is enabled at error level", function() {
                    log.setLevel(log.levels.ERROR);

                    log.error("a log message");
                    expect(console.error).toHaveBeenCalled();
                });

                it("is disabled at silent level", function() {
                    log.setLevel(log.levels.SILENT);

                    log.error("a log message");
                    expect(console.error).not.toHaveBeenCalled();
                });
            });
        });
    });
});

