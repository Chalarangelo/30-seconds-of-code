"use strict";

var _index = require("./index");

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe("Default hashLength", function () {
  test("Returns for /foo-bar", function () {
    expect((0, _index2.default)("/foo-bar")).toBe("foo-bar-096");
  });

  test("Returns for /foo/bar", function () {
    expect((0, _index2.default)("/foo/bar")).toBe("foo-bar-1df");
  });
});

describe("hashLength 5", function () {
  test("Returns for /foo-bar", function () {
    expect((0, _index2.default)("/foo-bar", 5)).toBe("foo-bar-09652");
  });

  test("Returns for /foo/bar", function () {
    expect((0, _index2.default)("/foo/bar", 5)).toBe("foo-bar-1df48");
  });
});