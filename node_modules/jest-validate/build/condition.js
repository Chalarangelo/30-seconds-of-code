'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.getValues = getValues;
exports.validationCondition = validationCondition;
exports.multipleValidOptions = multipleValidOptions;

/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const toString = Object.prototype.toString;
const MULTIPLE_VALID_OPTIONS_SYMBOL = Symbol('JEST_MULTIPLE_VALID_OPTIONS');

function validationConditionSingle(option, validOption) {
  return (
    option === null ||
    option === undefined ||
    (typeof option === 'function' && typeof validOption === 'function') ||
    toString.call(option) === toString.call(validOption)
  );
}

function getValues(validOption) {
  if (
    Array.isArray(validOption) && // @ts-ignore
    validOption[MULTIPLE_VALID_OPTIONS_SYMBOL]
  ) {
    return validOption;
  }

  return [validOption];
}

function validationCondition(option, validOption) {
  return getValues(validOption).some(e => validationConditionSingle(option, e));
}

function multipleValidOptions(...args) {
  const options = [...args]; // @ts-ignore

  options[MULTIPLE_VALID_OPTIONS_SYMBOL] = true;
  return options;
}
