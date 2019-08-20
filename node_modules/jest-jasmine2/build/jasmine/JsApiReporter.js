'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
// This file is a heavily modified fork of Jasmine. Original license:

/*
Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

/* eslint-disable sort-keys */
const noopTimer = {
  start() {},

  elapsed() {
    return 0;
  }
};

class JsApiReporter {
  constructor(options) {
    _defineProperty(this, 'started', void 0);

    _defineProperty(this, 'finished', void 0);

    _defineProperty(this, 'runDetails', void 0);

    _defineProperty(this, 'jasmineStarted', void 0);

    _defineProperty(this, 'jasmineDone', void 0);

    _defineProperty(this, 'status', void 0);

    _defineProperty(this, 'executionTime', void 0);

    _defineProperty(this, 'suiteStarted', void 0);

    _defineProperty(this, 'suiteDone', void 0);

    _defineProperty(this, 'suiteResults', void 0);

    _defineProperty(this, 'suites', void 0);

    _defineProperty(this, 'specResults', void 0);

    _defineProperty(this, 'specDone', void 0);

    _defineProperty(this, 'specs', void 0);

    _defineProperty(this, 'specStarted', void 0);

    const timer = options.timer || noopTimer;
    let status = 'loaded';
    this.started = false;
    this.finished = false;
    this.runDetails = {};

    this.jasmineStarted = () => {
      this.started = true;
      status = 'started';
      timer.start();
    };

    let executionTime;

    function validateAfterAllExceptions({failedExpectations}) {
      if (failedExpectations && failedExpectations.length > 0) {
        throw failedExpectations[0];
      }
    }

    this.jasmineDone = function(runDetails) {
      validateAfterAllExceptions(runDetails);
      this.finished = true;
      this.runDetails = runDetails;
      executionTime = timer.elapsed();
      status = 'done';
    };

    this.status = function() {
      return status;
    };

    const suites = [];
    const suites_hash = {};

    this.specStarted = function() {};

    this.suiteStarted = function(result) {
      suites_hash[result.id] = result;
    };

    this.suiteDone = function(result) {
      storeSuite(result);
    };

    this.suiteResults = function(index, length) {
      return suites.slice(index, index + length);
    };

    function storeSuite(result) {
      suites.push(result);
      suites_hash[result.id] = result;
    }

    this.suites = function() {
      return suites_hash;
    };

    const specs = [];

    this.specDone = function(result) {
      specs.push(result);
    };

    this.specResults = function(index, length) {
      return specs.slice(index, index + length);
    };

    this.specs = function() {
      return specs;
    };

    this.executionTime = function() {
      return executionTime;
    };
  }
}

exports.default = JsApiReporter;
