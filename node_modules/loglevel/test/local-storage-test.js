"use strict";

define(['test/test-helpers'], function(testHelpers) {
    var describeIf = testHelpers.describeIf;
    var it = testHelpers.itWithFreshLog;

    var originalConsole = window.console;

    describeIf(testHelpers.isLocalStorageAvailable(), "Local storage persistence tests:", function() {

        beforeEach(function() {
            window.console = {"log" : jasmine.createSpy("console.log")};
            this.addMatchers({
                "toBeAtLevel" : testHelpers.toBeAtLevel,
                "toBeTheStoredLevel" : testHelpers.toBeTheLevelStoredByLocalStorage,
                "toBeTheLevelStoredByLocalStorage": testHelpers.toBeTheLevelStoredByLocalStorage,
                "toBeTheLevelStoredByCookie": testHelpers.toBeTheLevelStoredByCookie
            });

            testHelpers.clearStoredLevels();
        });

        afterEach(function() {
            window.console = originalConsole;
        });

        describe("If no level is saved", function() {
            it("log level is set to warn by default", function(log) {
                expect(log).toBeAtLevel("warn");
            });

            it("warn is not persisted as the current level", function(log) {
                expect("warn").not.toBeTheStoredLevel();
            });

            it("log can be set to info level", function(log) {
                log.setLevel("info");
                expect(log).toBeAtLevel("info");
            });

            it("log.setLevel() sets a cookie with the given level", function(log) {
                log.setLevel("debug");
                expect("debug").toBeTheStoredLevel();
            });

            it("log.setLevel() does not set a cookie if `persist` argument is false", function(log) {
                log.setLevel("debug", false);
                expect("debug").not.toBeTheStoredLevel();
            });
        });
        
        describe("If trace level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("trace");
            });
            
            it("trace is the default log level", function (log) {
                expect(log).toBeAtLevel("trace");
            });
        });

        describe("If debug level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("debug");
            });

            it("debug is the default log level", function (log) {
                expect(log).toBeAtLevel("debug");
            });
        });
        
        describe("If info level is saved", function() {
            beforeEach(function() {
                testHelpers.setStoredLevel("info");
            });

            it("info is the default log level", function(log) {
                expect(log).toBeAtLevel("info");
            });

            it("log can be changed to warn level", function(log) {
                log.setLevel("warn");
                expect(log).toBeAtLevel("warn");
            });

            it("log.setLevel() overwrites the saved level", function(log) {
                log.setLevel("error");

                expect("error").toBeTheStoredLevel();
                expect("info").not.toBeTheStoredLevel();
            });

            it("log.setLevel() does not overwrite the saved level if `persist` argument is false", function(log) {
                log.setLevel("error", false);

                expect("info").toBeTheStoredLevel();
                expect("error").not.toBeTheStoredLevel();
            });
        });

        describe("If warn level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("warn");
            });

            it("warn is the default log level", function (log) {
                expect(log).toBeAtLevel("warn");
            });
        });

        describe("If error level is saved", function () {
            beforeEach(function () {
                testHelpers.setStoredLevel("error");
            });

            it("error is the default log level", function (log) {
                expect(log).toBeAtLevel("error");
            });
        });


        describe("If the level is saved with other data", function() {
            beforeEach(function() {
                window.localStorage['qwe'] = "asd";
                window.localStorage['loglevel'] = "ERROR";
                window.localStorage['msg'] = "hello world";
            });

            it("error is the default log level", function(log) {
                expect(log).toBeAtLevel("error");
            });

            it("log can be changed to silent level", function(log) {
                log.setLevel("silent");
                expect(log).toBeAtLevel("silent");
            });

            it("log.setLevel() overrides the saved level only", function(log) {
                log.setLevel("debug");

                expect('debug').toBeTheStoredLevel();
                expect(window.localStorage['msg']).toBe("hello world");
            });
        });

        describe("If the level is stored incorrectly", function() {
            beforeEach(function() {
                testHelpers.setLocalStorageStoredLevel('gibberish');
            });

            it("warn is the default log level", function(log) {
                expect(log).toBeAtLevel("warn");
            });

            it("warn is not persisted as the current level", function(log) {
                expect("warn").not.toBeTheStoredLevel();
            });

            it("log can be changed to info level", function(log) {
                log.setLevel("info");
                expect(log).toBeAtLevel("info");
            });

            it("log.setLevel() overrides the saved level with the new level", function(log) {
                expect('debug').not.toBeTheStoredLevel();

                log.setLevel("debug");

                expect('debug').toBeTheStoredLevel();
            });
        });

        describeIf(testHelpers.isCookieStorageAvailable() && testHelpers.isLocalStorageAvailable(),
                   "if localStorage and cookies are both available", function () {

            it("the level stored in cookies is ignored if a local storage level is set", function () {
                testHelpers.setCookieStoredLevel("info");
                testHelpers.setLocalStorageStoredLevel("debug");

                testHelpers.withFreshLog(function (log) {
                    expect(log).toBeAtLevel("debug");
                });
            });

            it("the level stored in cookies is used if no local storage level is set", function () {
                testHelpers.setCookieStoredLevel("info");
                window.localStorage.clear();

                testHelpers.withFreshLog(function (log) {
                    expect(log).toBeAtLevel("info");
                });
            });

            it("the local storage level is set and the cookie level is not", function (log) {
                log.setLevel("error");
                expect("error").toBeTheLevelStoredByLocalStorage();
                expect("error").not.toBeTheLevelStoredByCookie();
            });
        });
    });
});
