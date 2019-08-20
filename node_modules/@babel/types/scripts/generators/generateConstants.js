"use strict";
const definitions = require("../../lib/definitions");

module.exports = function generateConstants() {
  let output = `// @flow
/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import { FLIPPED_ALIAS_KEYS } from "../../definitions";\n\n`;

  Object.keys(definitions.FLIPPED_ALIAS_KEYS).forEach(type => {
    output += `export const ${type.toUpperCase()}_TYPES = FLIPPED_ALIAS_KEYS["${type}"];\n`;
  });

  return output;
};
