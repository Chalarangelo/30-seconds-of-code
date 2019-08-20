"use strict";

const _ = require(`lodash`);

const is32BitInteger = require(`./is-32-bit-integer`);

const {
  looksLikeADate
} = require(`../types/date`);

const getExampleValue = ({
  nodes,
  typeName,
  typeConflictReporter,
  ignoreFields
}) => {
  const exampleValue = getExampleObject({
    nodes,
    prefix: typeName,
    typeConflictReporter,
    ignoreFields
  });
  return exampleValue;
};

module.exports = {
  getExampleValue
};

const getExampleObject = ({
  nodes: rawNodes,
  prefix,
  typeConflictReporter,
  ignoreFields = []
}) => {
  const nodes = rawNodes.filter(node => node != null);
  const allKeys = nodes.reduce((acc, node) => Object.keys(node).forEach(key => key && !ignoreFields.includes(key) && acc.add(key)) || acc, new Set());
  const exampleValue = Array.from(allKeys).reduce((acc, key) => {
    const entries = nodes.map(node => {
      const value = node[key];
      const type = getType(value);
      return type && {
        value,
        type,
        parent: node
      };
    }).filter(Boolean);
    const selector = prefix ? `${prefix}.${key}` : key;

    const entriesByType = _.uniqBy(entries, entry => entry.type);

    if (!entriesByType.length) return acc; // TODO: This whole thing could be prettier!

    let {
      value,
      type
    } = entriesByType[0];
    let arrayWrappers = 0;

    while (Array.isArray(value)) {
      value = value.find(v => v != null);
      arrayWrappers++;
    }

    if (entriesByType.length > 1 || type.includes(`,`)) {
      if (isMixOfDatesAndStrings(entriesByType.map(entry => entry.type), arrayWrappers)) {
        // TODO: Possibly revisit this in Gatsby v3.
        const allNonEmptyStringsAreDates = entries.every(entry => {
          const values = Array.isArray(entry.value) ? _.flatMap(entry.value) : [entry.value];
          return values.every(value => value === `` || getType(value) === `date`);
        });

        if (allNonEmptyStringsAreDates) {
          value = `1978-09-26`;
        } else {
          value = `String`;
        }
      } else {
        typeConflictReporter.addConflict(selector, entriesByType);
        return acc;
      }
    }

    let exampleFieldValue;

    if (_.isObject(value) && !_.isArray(value) && !_.isDate(value) && !_.isRegExp(value)) {
      const objects = entries.reduce((acc, entry) => {
        let {
          value
        } = entry;
        let arrays = arrayWrappers - 1;

        while (arrays > 0) {
          value = value.find(v => v != null);
          arrays--;
        }

        return acc.concat(value);
      }, []);
      const exampleObject = getExampleObject({
        nodes: objects,
        prefix: selector,
        typeConflictReporter
      });
      if (!Object.keys(exampleObject).length) return acc;
      exampleFieldValue = exampleObject;
    } else if (key.includes(`___NODE`) && arrayWrappers) {
      // For arrays on ___NODE foreign-key fields we return all values,
      // because the array values are allowed to link to nodes of different types.
      // For those we will create a GraphQLUnionType later.
      arrayWrappers--;
      exampleFieldValue = entries.reduce((acc, entry) => acc.concat(entry.value), []);
    } else {
      // FIXME: Why not simply treat every number as float (instead of looping through all values again)?
      exampleFieldValue = typeof value === `number` && findFloat(entries) || value; // exampleFieldValue = value === `number` ? 0.1 : value
    }

    while (arrayWrappers--) {
      exampleFieldValue = [exampleFieldValue];
    }

    acc[key] = exampleFieldValue;
    return acc;
  }, {});
  return exampleValue;
};

const isMixOfDatesAndStrings = (types, arrayWrappers) => {
  const acc = new Set();
  types.every(type => {
    let arrays = arrayWrappers;

    while (arrays--) {
      if (type.startsWith(`[`)) {
        type = type.slice(1, -1);
      } else {
        return false;
      }
    }

    type.split(`,`).forEach(t => acc.add(t.replace(/[[]]/g, ``)));
    return true;
  });
  return acc.size === 2 && acc.has(`date`) && acc.has(`string`);
};

const findFloat = entries => {
  let result;

  const find = numbers => numbers.some(value => {
    const number = typeof value === `object` ? value.value : value;
    return Array.isArray(number) ? find(number) : !is32BitInteger(number) && (result = number);
  });

  find(entries);
  return result;
};

const getType = value => {
  switch (typeof value) {
    case `number`:
      return `number`;

    case `string`:
      return looksLikeADate(value) ? `date` : `string`;

    case `boolean`:
      return `boolean`;

    case `object`:
      if (value === null) return null;
      if (value instanceof Date) return `date`;
      if (value instanceof String) return `string`;

      if (Array.isArray(value)) {
        const uniqueValues = _.uniq(value.map(getType).filter(v => v != null));

        return uniqueValues.length ? `[${uniqueValues.join(`,`)}]` : null;
      }

      if (!Object.keys(value).length) return null;
      return `object`;

    default:
      return null;
  }
};
//# sourceMappingURL=example-value.js.map