"use strict";

exports.__esModule = true;
exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _IS_TYPE;

exports.isNode = isNode;
exports.isPseudoElement = isPseudoElement;
exports.isPseudoClass = isPseudoClass;
exports.isContainer = isContainer;
exports.isNamespace = isNamespace;

var _types = require("./types");

var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);

function isNode(node) {
    return (typeof node === "undefined" ? "undefined" : _typeof(node)) === "object" && IS_TYPE[node.type];
}

function isNodeType(type, node) {
    return isNode(node) && node.type === type;
}

var isAttribute = exports.isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
var isClassName = exports.isClassName = isNodeType.bind(null, _types.CLASS);
var isCombinator = exports.isCombinator = isNodeType.bind(null, _types.COMBINATOR);
var isComment = exports.isComment = isNodeType.bind(null, _types.COMMENT);
var isIdentifier = exports.isIdentifier = isNodeType.bind(null, _types.ID);
var isNesting = exports.isNesting = isNodeType.bind(null, _types.NESTING);
var isPseudo = exports.isPseudo = isNodeType.bind(null, _types.PSEUDO);
var isRoot = exports.isRoot = isNodeType.bind(null, _types.ROOT);
var isSelector = exports.isSelector = isNodeType.bind(null, _types.SELECTOR);
var isString = exports.isString = isNodeType.bind(null, _types.STRING);
var isTag = exports.isTag = isNodeType.bind(null, _types.TAG);
var isUniversal = exports.isUniversal = isNodeType.bind(null, _types.UNIVERSAL);

function isPseudoElement(node) {
    return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value === ":before" || node.value === ":after");
}
function isPseudoClass(node) {
    return isPseudo(node) && !isPseudoElement(node);
}

function isContainer(node) {
    return !!(isNode(node) && node.walk);
}

function isNamespace(node) {
    return isAttribute(node) || isTag(node);
}