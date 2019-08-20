"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.edit = edit;
exports.editWithAST = editWithAST;
exports.add = add;
exports.addWithAST = addWithAST;

var _wasmParser = require("@webassemblyjs/wasm-parser");

var _ast = require("@webassemblyjs/ast");

var _clone = require("@webassemblyjs/ast/lib/clone");

var _wasmOpt = require("@webassemblyjs/wasm-opt");

var _helperWasmBytecode = _interopRequireWildcard(require("@webassemblyjs/helper-wasm-bytecode"));

var _apply = require("./apply");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function hashNode(node) {
  return JSON.stringify(node);
}

function preprocess(ab) {
  var optBin = (0, _wasmOpt.shrinkPaddedLEB128)(new Uint8Array(ab));
  return optBin.buffer;
}

function sortBySectionOrder(nodes) {
  var originalOrder = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nodes[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _node = _step.value;
      originalOrder.set(_node, originalOrder.size);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  nodes.sort(function (a, b) {
    var sectionA = (0, _helperWasmBytecode.getSectionForNode)(a);
    var sectionB = (0, _helperWasmBytecode.getSectionForNode)(b);
    var aId = _helperWasmBytecode.default.sections[sectionA];
    var bId = _helperWasmBytecode.default.sections[sectionB];

    if (typeof aId !== "number" || typeof bId !== "number") {
      throw new Error("Section id not found");
    }

    if (aId === bId) {
      // $FlowIgnore originalOrder is filled for all nodes
      return originalOrder.get(a) - originalOrder.get(b);
    }

    return aId - bId;
  });
}

function edit(ab, visitors) {
  ab = preprocess(ab);
  var ast = (0, _wasmParser.decode)(ab);
  return editWithAST(ast, ab, visitors);
}

function editWithAST(ast, ab, visitors) {
  var operations = [];
  var uint8Buffer = new Uint8Array(ab);
  var nodeBefore;

  function before(type, path) {
    nodeBefore = (0, _clone.cloneNode)(path.node);
  }

  function after(type, path) {
    if (path.node._deleted === true) {
      operations.push({
        kind: "delete",
        node: path.node
      }); // $FlowIgnore
    } else if (hashNode(nodeBefore) !== hashNode(path.node)) {
      operations.push({
        kind: "update",
        oldNode: nodeBefore,
        node: path.node
      });
    }
  }

  (0, _ast.traverse)(ast, visitors, before, after);
  uint8Buffer = (0, _apply.applyOperations)(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}

function add(ab, newNodes) {
  ab = preprocess(ab);
  var ast = (0, _wasmParser.decode)(ab);
  return addWithAST(ast, ab, newNodes);
}

function addWithAST(ast, ab, newNodes) {
  // Sort nodes by insertion order
  sortBySectionOrder(newNodes);
  var uint8Buffer = new Uint8Array(ab); // Map node into operations

  var operations = newNodes.map(function (n) {
    return {
      kind: "add",
      node: n
    };
  });
  uint8Buffer = (0, _apply.applyOperations)(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}