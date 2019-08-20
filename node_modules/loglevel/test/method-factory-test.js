"use strict";

define(['test/test-helpers'], function(testHelpers) {
    var it = testHelpers.itWithFreshLog;

    describe("Setting the methodFactory tests:", function() {

        it("methodFactory should be called once for each loggable level", function(log) {
            log.methodFactory = jasmine.createSpy("methodFactory");

            log.setLevel("trace");
            expect(log.methodFactory.calls.length).toEqual(5);
            expect(log.methodFactory.argsForCall[0]).toEqual(["trace", 0, undefined]);
            expect(log.methodFactory.argsForCall[1]).toEqual(["debug", 0, undefined]);
            expect(log.methodFactory.argsForCall[2]).toEqual(["info",  0, undefined]);
            expect(log.methodFactory.argsForCall[3]).toEqual(["warn",  0, undefined]);
            expect(log.methodFactory.argsForCall[4]).toEqual(["error", 0, undefined]);

            log.setLevel("error");
            expect(log.methodFactory.calls.length).toEqual(6);
            expect(log.methodFactory.argsForCall[5]).toEqual(["error", 4, undefined]);
        });

        it("functions returned by methodFactory should be used as logging functions", function(log) {
            var logFunction = function() {};
            log.methodFactory = function() { return logFunction; };
            log.setLevel("error");

            expect(log.warn).not.toEqual(logFunction);
            expect(log.error).toEqual(logFunction);
        });

        it("the third argument should be logger's name", function(log) {
            var logger = log.getLogger("newLogger");
            logger.methodFactory = jasmine.createSpy("methodFactory");

            logger.setLevel("error");
            expect(logger.methodFactory.argsForCall[0]).toEqual(["error", 4, "newLogger"]);
        });

    });
});
