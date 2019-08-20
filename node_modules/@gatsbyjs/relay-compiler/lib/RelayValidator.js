/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict-local
 * @format
 */
'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _require = require("./GraphQLValidator"),
    GLOBAL_RULES = _require.GLOBAL_RULES,
    LOCAL_RULES = _require.LOCAL_RULES,
    validate = _require.validate;

function DisallowIdAsAliasValidationRule(context) {
  return {
    Field: function Field(field) {
      if (field.alias && field.alias.value === 'id' && field.name.value !== 'id') {
        throw new Error('RelayValidator: Relay does not allow aliasing fields to `id`. ' + 'This name is reserved for the globally unique `id` field on ' + '`Node`.');
      }
    }
  };
}

var relayGlobalRules = GLOBAL_RULES;
var relayLocalRules = (0, _toConsumableArray2["default"])(LOCAL_RULES).concat([DisallowIdAsAliasValidationRule]);
module.exports = {
  GLOBAL_RULES: relayGlobalRules,
  LOCAL_RULES: relayLocalRules,
  validate: validate
};