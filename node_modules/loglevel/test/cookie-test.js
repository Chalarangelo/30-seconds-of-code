"use strict";

define(['test/test-helpers'], function(testHelpers) {
    var describeIf = testHelpers.describeIf;
    var it = testHelpers.itWithFreshLog;

    var originalConsole = window.console;
    var originalDocument = window.document;

    describeIf(testHelpers.isCookieStorageAvailable() && !testHelpers.isLocalStorageAvailable(),
               "Cookie-only persistence tests:", function() {

        beforeEach(function() {
            window.console = {"log" : jasmine.createSpy("console.log")};
            this.addMatchers({
                "toBeAtLevel" : testHelpers.toBeAtLevel,
                "toBeTheStoredLevel" : testHelpers.toBeTheLevelStoredByCookie
            });
        });

        afterEach(function() {
            window.console = originalConsole;
        });

        describe("If no level is saved", function() {
            beforeEach(function() {
                testHelpers.clearStoredLevels();
            });

            it("log level is set to warn by default", function(log) {
                expect(log).toBeAtLevel("warn");
            });

            it("warn is persisted as the current level", function(log) {
                expect("warn").toBeTheStoredLevel();
            });

            it("log can be set to info level", function(log) {
                log.setLevel("info");
                expect(log).toBeAtLevel("info");
            });

            it("log.setLevel() sets a cookie with the given level", function(log) {
                log.setLevel("debug");
                expect("debug").toBeTheStoredLevel();
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
        });

        describe("If the level is saved with other data", function() {
            beforeEach(function() {
                window.document.cookie = "qwe=asd";
                window.document.cookie = "loglevel=ERROR";
                window.document.cookie = "msg=hello world";
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
                expect(window.document.cookie).toContain("msg=hello world");
            });
        });

        describe("If the level cookie is set incorrectly", function() {
            beforeEach(function() {
                testHelpers.setCookieStoredLevel('gibberish');
            });

            it("warn is the default log level", function(log) {
                expect(log).toBeAtLevel("warn");
            });

            it("warn is persisted as the current level, overriding the invalid cookie", function(log) {
                expect("warn").toBeTheStoredLevel();
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
    });
});
