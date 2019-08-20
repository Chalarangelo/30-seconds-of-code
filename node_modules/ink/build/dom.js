"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTextNode = exports.setAttribute = exports.removeChildNode = exports.insertBeforeNode = exports.appendStaticNode = exports.appendChildNode = exports.createNode = void 0;

// Helper utilities implementing some common DOM methods to simplify reconciliation code
const createNode = tagName => ({
  nodeName: tagName.toUpperCase(),
  style: {},
  attributes: {},
  childNodes: [],
  parentNode: null
});

exports.createNode = createNode;

const appendChildNode = (node, childNode) => {
  if (childNode.parentNode) {
    removeChildNode(childNode.parentNode, childNode);
  }

  childNode.parentNode = node;
  node.childNodes.push(childNode);
}; // Same as `appendChildNode`, but without removing child node from parent node


exports.appendChildNode = appendChildNode;

const appendStaticNode = (node, childNode) => {
  node.childNodes.push(childNode);
};

exports.appendStaticNode = appendStaticNode;

const insertBeforeNode = (node, newChildNode, beforeChildNode) => {
  if (newChildNode.parentNode) {
    removeChildNode(newChildNode.parentNode, newChildNode);
  }

  newChildNode.parentNode = node;
  const index = node.childNodes.indexOf(beforeChildNode);

  if (index >= 0) {
    node.childNodes.splice(index, 0, newChildNode);
    return;
  }

  node.childNodes.push(newChildNode);
};

exports.insertBeforeNode = insertBeforeNode;

const removeChildNode = (node, removeNode) => {
  removeNode.parentNode = null;
  const index = node.childNodes.indexOf(removeNode);

  if (index >= 0) {
    node.childNodes.splice(index, 1);
  }
};

exports.removeChildNode = removeChildNode;

const setAttribute = (node, key, value) => {
  node.attributes[key] = value;
};

exports.setAttribute = setAttribute;

const createTextNode = text => ({
  nodeName: '#text',
  nodeValue: text
});

exports.createTextNode = createTextNode;