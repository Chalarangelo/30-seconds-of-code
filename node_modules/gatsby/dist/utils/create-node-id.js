"use strict";

const uuidv5 = require(`uuid/v5`);

const report = require(`gatsby-cli/lib/reporter`);

const seedConstant = `638f7a53-c567-4eca-8fc1-b23efb1cfb2b`;
/**
 * createNodeId() Generate UUID
 *
 * @param {String} id - A string of arbitrary length
 * @param {String} namespace - Namespace to use for UUID
 *
 * @return {String} - UUID
 */

function createNodeId(id, namespace) {
  if (typeof id === `number`) {
    id = id.toString();
  } else if (typeof id !== `string`) {
    report.panic(`Parameter passed to createNodeId must be a String or Number (got ${typeof id})`);
  }

  return uuidv5(id, uuidv5(namespace, seedConstant));
}

module.exports = createNodeId;
//# sourceMappingURL=create-node-id.js.map