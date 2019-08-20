/* global MyCustomLogger, log */
"use strict";

describe("loglevel from a global <script> tag with a custom context", function () {
    it("is available globally", function () {
        expect(MyCustomLogger).not.toBeUndefined();
    });

    it("doesn't have log defined globally", function () {
        expect(window.log).not.toBeDefined();
    });

    it("allows setting the logging level", function () {
        MyCustomLogger.setLevel(MyCustomLogger.levels.TRACE);
        MyCustomLogger.setLevel(MyCustomLogger.levels.DEBUG);
        MyCustomLogger.setLevel(MyCustomLogger.levels.INFO);
        MyCustomLogger.setLevel(MyCustomLogger.levels.WARN);
        MyCustomLogger.setLevel(MyCustomLogger.levels.ERROR);
    });

    it("successfully logs", function () {
        window.console = { "log": jasmine.createSpy("log") };

        MyCustomLogger.setLevel(MyCustomLogger.levels.INFO);
        MyCustomLogger.info("test message");

        expect(console.log).toHaveBeenCalledWith("test message");
    });
});
