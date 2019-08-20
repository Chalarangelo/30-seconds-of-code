"use strict";
const definitions = require("../../lib/definitions");

const has = Function.call.bind(Object.prototype.hasOwnProperty);

function joinComparisons(leftArr, right) {
  return (
    leftArr.map(JSON.stringify).join(` === ${right} || `) + ` === ${right}`
  );
}

function addIsHelper(type, aliasKeys, deprecated) {
  const targetType = JSON.stringify(type);
  let aliasSource = "";
  if (aliasKeys) {
    aliasSource = " || " + joinComparisons(aliasKeys, "nodeType");
  }

  let placeholderSource = "";
  const placeholderTypes = [];
  if (
    definitions.PLACEHOLDERS.includes(type) &&
    has(definitions.FLIPPED_ALIAS_KEYS, type)
  ) {
    placeholderTypes.push(type);
  }
  if (has(definitions.PLACEHOLDERS_FLIPPED_ALIAS, type)) {
    placeholderTypes.push(...definitions.PLACEHOLDERS_FLIPPED_ALIAS[type]);
  }
  if (placeholderTypes.length > 0) {
    placeholderSource =
      ' || nodeType === "Placeholder" && (' +
      joinComparisons(placeholderTypes, "node.expectedNode") +
      ")";
  }

  return `export function is${type}(node: ?Object, opts?: Object): boolean {
    ${deprecated || ""}
    if (!node) return false;

    const nodeType = node.type;
    if (nodeType === ${targetType}${aliasSource}${placeholderSource}) {
      if (typeof opts === "undefined") {
        return true;
      } else {
        return shallowEqual(node, opts);
      }
    }

    return false;
  }
  `;
}

module.exports = function generateValidators() {
  let output = `// @flow
/*
 * This file is auto-generated! Do not modify it directly.
 * To re-generate run 'make build'
 */
import shallowEqual from "../../utils/shallowEqual";\n\n`;

  Object.keys(definitions.VISITOR_KEYS).forEach(type => {
    output += addIsHelper(type);
  });

  Object.keys(definitions.FLIPPED_ALIAS_KEYS).forEach(type => {
    output += addIsHelper(type, definitions.FLIPPED_ALIAS_KEYS[type]);
  });

  Object.keys(definitions.DEPRECATED_KEYS).forEach(type => {
    const newType = definitions.DEPRECATED_KEYS[type];
    const deprecated = `console.trace("The node type ${type} has been renamed to ${newType}");`;
    output += addIsHelper(type, null, deprecated);
  });

  return output;
};
