'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stripSpacesBefore = exports.stripSpacesBefore = function stripSpacesBefore(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.start - spaces, node.start]);
  };
};

var stripSpacesAfter = exports.stripSpacesAfter = function stripSpacesAfter(node, spaces) {
  return function (fixer) {
    return fixer.removeRange([node.end, node.end + spaces]);
  };
};

var addSpaceBefore = exports.addSpaceBefore = function addSpaceBefore(node) {
  return function (fixer) {
    return fixer.insertTextBefore(node, ' ');
  };
};

var addSpaceAfter = exports.addSpaceAfter = function addSpaceAfter(node) {
  return function (fixer) {
    return fixer.insertTextAfter(node, ' ');
  };
};

var replaceWithSpaceBefore = exports.replaceWithSpaceBefore = function replaceWithSpaceBefore(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.start - spaces, node.start], ' ');
  };
};

var replaceWithSpaceAfter = exports.replaceWithSpaceAfter = function replaceWithSpaceAfter(node, spaces) {
  return function (fixer) {
    return fixer.replaceTextRange([node.end, node.end + spaces], ' ');
  };
};

var stripSpaces = exports.stripSpaces = function stripSpaces(direction, node, spaces) {
  if (direction === 'before') {
    return stripSpacesBefore(node, spaces);
  } else {
    return stripSpacesAfter(node, spaces);
  }
};

var addSpace = exports.addSpace = function addSpace(direction, node) {
  if (direction === 'before') {
    return addSpaceBefore(node);
  } else {
    return addSpaceAfter(node);
  }
};

var replaceWithSpace = exports.replaceWithSpace = function replaceWithSpace(direction, node, spaces) {
  if (direction === 'before') {
    return replaceWithSpaceBefore(node, spaces);
  } else {
    return replaceWithSpaceAfter(node, spaces);
  }
};