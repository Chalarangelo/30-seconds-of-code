"use strict";

if (typeof window === "undefined") {
    window = {};
}

var logMethods = [
    "trace",
    "debug",
    "info",
    "warn",
    "error"
];

define(function () {
    function getStorageKey(loggerName) {
        var key = "loglevel";
        if (loggerName) {
            key += ":" + loggerName;
        }
        return key;
    }

    var self = {};

    // Jasmine matcher to check the log level of a log object
    self.toBeAtLevel = function toBeAtLevel(level) {
        var log = this.actual;
        var expectedWorkingCalls = log.levels.SILENT - log.levels[level.toUpperCase()];
        var realLogMethod = window.console.log;
        var priorCalls = realLogMethod.calls.length;

        for (var ii = 0; ii < logMethods.length; ii++) {
            var methodName = logMethods[ii];
            log[methodName](methodName);
        }

        expect(realLogMethod.calls.length - priorCalls).toEqual(expectedWorkingCalls);
        return true;
    };

    self.isCookieStorageAvailable = function isCookieStorageAvailable() {
        if (window && window.document && window.document.cookie) {
            // We need to check not just that the cookie objects are available, but that they work, because
            // if we run from file:// URLs they appear present but are non-functional
            window.document.cookie = "test=hi;";

            var result = window.document.cookie.indexOf('test=hi') !== -1;
            window.document.cookie = "test=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

            return result;
        } else {
            return false;
        }
    };

    self.isLocalStorageAvailable = function isLocalStorageAvailable() {
        try {
            return !!window.localStorage;
        } catch (e){
            return false;
        }
    };

    self.isAnyLevelStoragePossible = function isAnyLevelStoragePossible() {
        return self.isCookieStorageAvailable() || self.isLocalStorageAvailable();
    };

    self.toBeTheLevelStoredByCookie = function toBeTheLevelStoredByCookie(name) {
        var level = this.actual.toUpperCase();
        var storageKey = encodeURIComponent(getStorageKey(name));

        if (window.document.cookie.indexOf(storageKey + "=" + level) !== -1) {
            return true;
        } else {
            return false;
        }
    };

    self.toBeTheLevelStoredByLocalStorage = function toBeTheLevelStoredByLocalStorage(name) {
        var level = this.actual.toUpperCase();

        if (window.localStorage[getStorageKey(name)] === level) {
            return true;
        }

        return false;
    };

    // Jasmine matcher to check whether a given string was saved by loglevel
    self.toBeTheStoredLevel = function toBeTheStoredLevel(name) {
        return self.toBeTheLevelStoredByLocalStorage.call(this, name) ||
               self.toBeTheLevelStoredByCookie.call(this, name);
    };

    self.setCookieStoredLevel = function setCookieStoredLevel(level, name) {
        window.document.cookie =
            encodeURIComponent(getStorageKey(name)) + "=" +
            level.toUpperCase() + ";";
    };

    self.setLocalStorageStoredLevel = function setLocalStorageStoredLevel(level, name) {
        window.localStorage[getStorageKey(name)] = level.toUpperCase();
    };

    self.setStoredLevel = function setStoredLevel(level, name) {
        if (self.isCookieStorageAvailable()) {
            self.setCookieStoredLevel(level, name);
        }
        if (self.isLocalStorageAvailable()) {
            self.setLocalStorageStoredLevel(level, name);
        }
    };

    self.clearStoredLevels = function clearStoredLevels() {
        if (self.isLocalStorageAvailable()) {
            window.localStorage.clear();
        }
        if (self.isCookieStorageAvailable()) {
            var storedKeys = window.document.cookie.match(/(?:^|;\s)(loglevel(\:\w+)?)(?=\=)/g);
            if (storedKeys) {
                for (var i = 0; i < storedKeys.length; i++) {
                    window.document.cookie = storedKeys[i] + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
                }
            }
        }
    };

    self.describeIf = function describeIf(condition, name, test) {
        if (condition) {
            jasmine.getEnv().describe(name, test);
        }
    };

    self.itIf = function itIf(condition, name, test) {
        if (condition) {
            jasmine.getEnv().it(name, test);
        }
    };

    // Forcibly reloads loglevel, and asynchronously hands the resulting log back to the given callback
    // via Jasmine async magic
    self.withFreshLog = function withFreshLog(toRun) {
        require.undef("lib/loglevel");

        var freshLog;

        waitsFor(function() {
            require(['lib/loglevel'], function(log) {
                freshLog = log;
            });
            return typeof freshLog !== "undefined";
        });

        runs(function() {
            toRun(freshLog);
        });
    };

    // Wraps Jasmine's it(name, test) call to reload the loglevel dependency for the given test
    self.itWithFreshLog = function itWithFreshLog(name, test) {
        jasmine.getEnv().it(name, function() {
            self.withFreshLog(test);
        });
    };

    return self;
});
