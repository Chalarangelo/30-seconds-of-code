"use strict";

define(['test/test-helpers'], function(testHelpers) {
    var describeIf = testHelpers.describeIf;
    var it = testHelpers.itWithFreshLog;

    var originalConsole = window.console;

    describe("Setting default log level tests:", function() {

        beforeEach(function() {
            window.console = {"log" : jasmine.createSpy("console.log")};
            this.addMatchers({
                "toBeAtLevel" : testHelpers.toBeAtLevel,
                "toBeTheStoredLevel" : testHelpers.toBeTheLevelStoredByLocalStorage
            });

            testHelpers.clearStoredLevels();
        });

        afterEach(function() {
            window.console = originalConsole;
        });

        describe("If no level is saved", function() {
            it("new level is always set", function(log) {
                log.setDefaultLevel("trace");
                expect(log).toBeAtLevel("trace");
            });

            it("level is not persisted", function(log) {
                log.setDefaultLevel("debug");
                expect("debug").not.toBeTheStoredLevel();
            });
        });
        
        describe("If a level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("trace");
            });
            
            it("saved level is not modified", function (log) {
                log.setDefaultLevel("debug");
                expect(log).toBeAtLevel("trace");
            });
        });

        describe("If the level is stored incorrectly", function() {
            beforeEach(function() {
                testHelpers.setLocalStorageStoredLevel("gibberish");
            });

            it("new level is set", function(log) {
                log.setDefaultLevel("debug");
                expect(log).toBeAtLevel("debug");
                expect("debug").not.toBeTheStoredLevel();
            });
        });
    });
});
