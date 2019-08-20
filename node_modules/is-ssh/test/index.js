"use strict";

// Dependencies
var isSsh = require("../lib"),
    tester = require("tester");

// Prepare the input data
var input = [
// Secure Shell Transport Protocol (SSH)
["ssh://user@host.xz:port/path/to/repo.git/", true], ["ssh://user@host.xz/path/to/repo.git/", true], ["ssh://host.xz:port/path/to/repo.git/", true], ["ssh://host.xz/path/to/repo.git/", true], ["ssh://user@host.xz/path/to/repo.git/", true], ["ssh://host.xz/path/to/repo.git/", true], ["ssh://user@host.xz/~user/path/to/repo.git/", true], ["ssh://host.xz/~user/path/to/repo.git/", true], ["ssh://user@host.xz/~/path/to/repo.git", true], ["ssh://host.xz/~/path/to/repo.git", true], ["user@host.xz:/path/to/repo.git/", true], ["user@host.xz:~user/path/to/repo.git/", true], ["user@host.xz:path/to/repo.git", true], ["host.xz:/path/to/repo.git/", true], ["host.xz:path/to/repo.git", true], ["host.xz:~user/path/to/repo.git/", true], ["rsync://host.xz/path/to/repo.git/", true]

// Git Transport Protocol
, ["git://host.xz/path/to/repo.git/", false], ["git://host.xz/~user/path/to/repo.git/", false]

// HTTP/S Transport Protocol
, ["http://host.xz/path/to/repo.git/", false], ["https://host.xz/path/to/repo.git/", false]

// Local (Filesystem) Transport Protocol
, ["/path/to/repo.git/", false], ["path/to/repo.git/", false], ["~/path/to/repo.git", false], ["file:///path/to/repo.git/", false], ["file://~/path/to/repo.git/", false]];

tester.describe("check urls", function (test) {
    // Run the tests
    input.forEach(function (c) {
        test.it(c[0] + " is supposed " + (!c[1] ? "not " : "") + "to be a ssh url", function () {
            test.expect(isSsh(c[0])).toBe(c[1]);
        });
    });
});