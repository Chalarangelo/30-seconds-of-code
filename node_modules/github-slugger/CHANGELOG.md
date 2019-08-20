# github-slugger change log

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## 1.2.1 2019-xx-xx
* Fix collisions for slugs with occurrences
* Fix accessing `Object.prototype` methods
* Fix Russian
* Add `files` to package.json

## 1.2.0 2017-09-21
* Add `maintainCase` support

## 1.1.3 2017-05-29
* Fix`emoji-regex` semver version to ensure npm5 compatibility.

## 1.1.2 2017-05-26
* Lock down `emoji-regex` dependency to avoid [strange unicode bug](https://github.com/Flet/github-slugger/issues/9)

## 1.1.1
* Add more conformant unicode handling to ensure:
   - emoji are correctly stripped
   - non-Latin characters are not incorrectly lowercased
* Also adds more verified test cases

Check the [PR](https://github.com/Flet/github-slugger/pull/8) for more details!

Thanks [@wooorm](https://github.com/wooorm)!

## 1.1.0
* Feature: Support for non-latin characters in slugs https://github.com/Flet/github-slugger/pull/3) Thanks [@tadatuta](https://github.com/tadatuta)!

## 1.0.1
* Fix: bug for multiple empty slugds (https://github.com/Flet/github-slugger/pull/1) Thanks [@wooorm](https://github.com/wooorm)!
