/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *  strict
 * @format
 */
'use strict';

var invariant = require("fbjs/lib/invariant");

function getLiteralArgumentValues(args) {
  var values = {};
  args.forEach(function (arg) {
    !(arg.value.kind === 'Literal') ? process.env.NODE_ENV !== "production" ? invariant(false, 'getLiteralArgumentValues(): Expected all args to be literals.') : invariant(false) : void 0;
    values[arg.name] = arg.value.value;
  });
  return values;
}

module.exports = getLiteralArgumentValues;