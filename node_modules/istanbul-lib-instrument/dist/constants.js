"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MAGIC_VALUE = exports.MAGIC_KEY = exports.SHA = void 0;

var _crypto = require("crypto");

var _semver = require("semver");

var _package = require("../package.json");

// function to use for creating hashes
const SHA = 'sha1'; // name of coverage data magic key

exports.SHA = SHA;
const MAGIC_KEY = '_coverageSchema'; // name of coverage data magic value

exports.MAGIC_KEY = MAGIC_KEY;
const MAGIC_VALUE = (0, _crypto.createHash)(SHA).update(_package.name + '@' + (0, _semver.major)(_package.version)).digest('hex');
exports.MAGIC_VALUE = MAGIC_VALUE;