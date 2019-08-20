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
 */
class BaseWatchPlugin {
  constructor({stdin, stdout}) {
    _defineProperty(this, '_stdin', void 0);

    _defineProperty(this, '_stdout', void 0);

    this._stdin = stdin;
    this._stdout = stdout;
  }

  apply(_hooks) {}

  getUsageInfo(_globalConfig) {
    return null;
  }

  onKey(_key) {}

  run(_globalConfig, _updateConfigAndRun) {
    return Promise.resolve();
  }
}

var _default = BaseWatchPlugin;
exports.default = _default;
