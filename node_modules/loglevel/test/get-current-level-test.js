"use strict";

define(['test/test-helpers'], function(testHelpers) {
    var describeIf = testHelpers.describeIf;
    var it = testHelpers.itWithFreshLog;

    var originalConsole = window.console;

    describe("Setting default log level tests:", function() {

        beforeEach(function() {
            window.console = {"log" : jasmine.createSpy("console.log")};
        });

        afterEach(function() {
            window.console = originalConsole;
        });

        describe("If no level is saved", function() {
            it("current level is the default level", function(log) {
                log.setDefaultLevel("trace");
                expect(log.getLevel()).toBe(log.levels.TRACE);
            });
        });

        describe("If a level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("trace");
            });

            it("current level is the level which has been saved", function (log) {
                log.setDefaultLevel("debug");
                expect(log.getLevel()).toBe(log.levels.TRACE);
            });
        });

        describe("If the level is stored incorrectly", function() {
            beforeEach(function() {
                testHelpers.setLocalStorageStoredLevel("gibberish");
            });

            it("current level is the default level", function(log) {
                log.setDefaultLevel("debug");
                expect(log.getLevel()).toBe(log.levels.DEBUG);
            });
        });
    });
});
