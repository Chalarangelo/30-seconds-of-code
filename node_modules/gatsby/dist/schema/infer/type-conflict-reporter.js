"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

const _ = require(`lodash`);

const report = require(`gatsby-cli/lib/reporter`);

const typeOf = require(`type-of`);

const util = require(`util`);

const {
  findRootNodeAncestor
} = require(`../../db/node-tracking`);

const isNodeWithDescription = node => node && node.internal && node.internal.description;

const findNodeDescription = obj => {
  if (obj) {
    const node = findRootNodeAncestor(obj, isNodeWithDescription);

    if (isNodeWithDescription(node)) {
      return node.internal.description;
    }
  }

  return ``;
};

const formatValue = value => {
  if (!_.isArray(value)) {
    return util.inspect(value, {
      colors: true,
      depth: 0,
      breakLength: Infinity
    });
  }

  let wasElipsisLast = false;
  const usedTypes = [];
  const output = [];
  value.forEach(item => {
    const type = typeOf(item);

    if (usedTypes.indexOf(type) !== -1) {
      if (!wasElipsisLast) {
        output.push(`...`);
        wasElipsisLast = true;
      }
    } else {
      output.push(formatValue(item));
      wasElipsisLast = false;
      usedTypes.push(type);
    }
  });
  return `[ ${output.join(`, `)} ]`;
};

class TypeConflictEntry {
  constructor(selector) {
    (0, _defineProperty2.default)(this, "selector", void 0);
    (0, _defineProperty2.default)(this, "types", void 0);
    this.selector = selector;
    this.types = new Map();
  }

  addExample({
    value,
    type,
    parent
  }) {
    this.types.set(type, {
      value,
      description: findNodeDescription(parent)
    });
  }

  printEntry() {
    const sortedByTypeName = _.sortBy(Array.from(this.types.entries()), ([typeName, value]) => typeName);

    report.log(`${this.selector}:${sortedByTypeName.map(([typeName, {
      value,
      description
    }]) => `\n - type: ${typeName}\n   value: ${formatValue(value)}${description && `\n   source: ${description}`}`).join(``)}`);
  }

}

class TypeConflictReporter {
  constructor() {
    (0, _defineProperty2.default)(this, "entries", void 0);
    this.entries = new Map();
  }

  clearConflicts() {
    this.entries.clear();
  }

  getEntryFromSelector(selector) {
    let dataEntry = this.entries.get(selector);

    if (!dataEntry) {
      dataEntry = new TypeConflictEntry(selector);
      this.entries.set(selector, dataEntry);
    }

    return dataEntry;
  }

  addConflict(selector, examples) {
    if (selector.substring(0, 11) === `SitePlugin.`) {
      // Don't store and print out type conflicts in plugins.
      // This is out of user control so he/she can't do anything
      // to hide those.
      return;
    }

    const entry = this.getEntryFromSelector(selector);
    examples.filter(example => example.value != null).forEach(example => entry.addExample(example));
  }

  printConflicts() {
    if (this.entries.size > 0) {
      report.warn(`There are conflicting field types in your data.\n\n` + `If you have explicitly defined a type for those fields, you can ` + `safely ignore this warning message.\n` + `Otherwise, Gatsby will omit those fields from the GraphQL schema.\n\n` + `If you know all field types in advance, the best strategy is to ` + `explicitly define them with the \`createTypes\` action, and skip ` + `inference with the \`@dontInfer\` directive.\n` + `See https://www.gatsbyjs.org/docs/actions/#createTypes`);
      this.entries.forEach(entry => entry.printEntry());
    }
  }

  getConflicts() {
    return Array.from(this.entries.values());
  }

}

module.exports = {
  TypeConflictReporter,
  TypeConflictEntry
};
//# sourceMappingURL=type-conflict-reporter.js.map