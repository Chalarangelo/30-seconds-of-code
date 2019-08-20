/* global log */
"use strict";

describe("loglevel from a global <script> tag", function () {
    it("is available globally", function () {
        expect(log).not.toBeUndefined();
    });

    it("allows setting the logging level", function () {
        log.setLevel(log.levels.TRACE);
        log.setLevel(log.levels.DEBUG);
        log.setLevel(log.levels.INFO);
        log.setLevel(log.levels.WARN);
        log.setLevel(log.levels.ERROR);
    });

    it("successfully logs", function () {
        window.console = { "log": jasmine.createSpy("log") };

        log.setLevel(log.levels.INFO);
        log.info("test message");

        expect(console.log).toHaveBeenCalledWith("test message");
    });
});