import { decode } from "@webassemblyjs/wasm-parser";
import { traverse } from "@webassemblyjs/ast";
import { cloneNode } from "@webassemblyjs/ast/lib/clone";
import { shrinkPaddedLEB128 } from "@webassemblyjs/wasm-opt";
import { getSectionForNode } from "@webassemblyjs/helper-wasm-bytecode";
import constants from "@webassemblyjs/helper-wasm-bytecode";
import { applyOperations } from "./apply";

function hashNode(node) {
  return JSON.stringify(node);
}

function preprocess(ab) {
  var optBin = shrinkPaddedLEB128(new Uint8Array(ab));
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
    var sectionA = getSectionForNode(a);
    var sectionB = getSectionForNode(b);
    var aId = constants.sections[sectionA];
    var bId = constants.sections[sectionB];

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

export function edit(ab, visitors) {
  ab = preprocess(ab);
  var ast = decode(ab);
  return editWithAST(ast, ab, visitors);
}
export function editWithAST(ast, ab, visitors) {
  var operations = [];
  var uint8Buffer = new Uint8Array(ab);
  var nodeBefore;

  function before(type, path) {
    nodeBefore = cloneNode(path.node);
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

  traverse(ast, visitors, before, after);
  uint8Buffer = applyOperations(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}
export function add(ab, newNodes) {
  ab = preprocess(ab);
  var ast = decode(ab);
  return addWithAST(ast, ab, newNodes);
}
export function addWithAST(ast, ab, newNodes) {
  // Sort nodes by insertion order
  sortBySectionOrder(newNodes);
  var uint8Buffer = new Uint8Array(ab); // Map node into operations

  var operations = newNodes.map(function (n) {
    return {
      kind: "add",
      node: n
    };
  });
  uint8Buffer = applyOperations(ast, uint8Buffer, operations);
  return uint8Buffer.buffer;
}