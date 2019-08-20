"use strict";

const {
  store
} = require(`./index`);
/**
 * Get all nodes from redux store.
 *
 * @returns {Array}
 */


const getNodes = () => {
  const nodes = store.getState().nodes;

  if (nodes) {
    return Array.from(nodes.values());
  } else {
    return [];
  }
};

exports.getNodes = getNodes;
/** Get node by id from store.
 *
 * @param {string} id
 * @returns {Object}
 */

const getNode = id => store.getState().nodes.get(id);

exports.getNode = getNode;
/**
 * Get all nodes of type from redux store.
 *
 * @param {string} type
 * @returns {Array}
 */

const getNodesByType = type => {
  const nodes = store.getState().nodesByType.get(type);

  if (nodes) {
    return Array.from(nodes.values());
  } else {
    return [];
  }
};

exports.getNodesByType = getNodesByType;
/**
 * Get all type names from redux store.
 *
 * @returns {Array}
 */

const getTypes = () => Array.from(store.getState().nodesByType.keys());

exports.getTypes = getTypes;
/**
 * Determine if node has changed.
 *
 * @param {string} id
 * @param {string} digest
 * @returns {boolean}
 */

exports.hasNodeChanged = (id, digest) => {
  const node = store.getState().nodes.get(id);

  if (!node) {
    return true;
  } else {
    return node.internal.contentDigest !== digest;
  }
};
/**
 * Get node and save path dependency.
 *
 * @param {string} id
 * @param {string} path
 * @returns {Object} node
 */


exports.getNodeAndSavePathDependency = (id, path) => {
  const createPageDependency = require(`./actions/add-page-dependency`);

  const node = getNode(id);
  createPageDependency({
    path,
    nodeId: id
  });
  return node;
};
//# sourceMappingURL=nodes.js.map