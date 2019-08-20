"use strict";

describe("loglevel included via node", function () {
    it("is included successfully", function () {
        expect(require('../lib/loglevel')).not.toBeUndefined();
    });

    it("allows setting the logging level", function () {
        var log = require('../lib/loglevel');

        log.setLevel(log.levels.TRACE);
        log.setLevel(log.levels.DEBUG);
        log.setLevel(log.levels.INFO);
        log.setLevel(log.levels.WARN);
        log.setLevel(log.levels.ERROR);
    });

    it("successfully logs", function () {
        var log = require('../lib/loglevel');
        console.info = jasmine.createSpy("info");

        log.setLevel(log.levels.INFO);
        log.info("test message");

        expect(console.info).toHaveBeenCalledWith("test message");
    });
});