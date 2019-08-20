"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  numberLiteralFromRaw: true,
  withLoc: true,
  withRaw: true,
  funcParam: true,
  indexLiteral: true,
  memIndexLiteral: true,
  instruction: true,
  objectInstruction: true,
  traverse: true,
  signatures: true,
  getSectionMetadata: true,
  getSectionMetadatas: true,
  sortSectionMetadata: true,
  orderedInsertNode: true,
  assertHasLoc: true,
  getEndOfSection: true,
  shiftSection: true,
  shiftLoc: true,
  isAnonymous: true,
  getUniqueNameGenerator: true,
  signatureForOpcode: true,
  cloneNode: true
};
Object.defineProperty(exports, "numberLiteralFromRaw", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.numberLiteralFromRaw;
  }
});
Object.defineProperty(exports, "withLoc", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.withLoc;
  }
});
Object.defineProperty(exports, "withRaw", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.withRaw;
  }
});
Object.defineProperty(exports, "funcParam", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.funcParam;
  }
});
Object.defineProperty(exports, "indexLiteral", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.indexLiteral;
  }
});
Object.defineProperty(exports, "memIndexLiteral", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.memIndexLiteral;
  }
});
Object.defineProperty(exports, "instruction", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.instruction;
  }
});
Object.defineProperty(exports, "objectInstruction", {
  enumerable: true,
  get: function get() {
    return _nodeHelpers.objectInstruction;
  }
});
Object.defineProperty(exports, "traverse", {
  enumerable: true,
  get: function get() {
    return _traverse.traverse;
  }
});
Object.defineProperty(exports, "signatures", {
  enumerable: true,
  get: function get() {
    return _signatures.signatures;
  }
});
Object.defineProperty(exports, "getSectionMetadata", {
  enumerable: true,
  get: function get() {
    return _utils.getSectionMetadata;
  }
});
Object.defineProperty(exports, "getSectionMetadatas", {
  enumerable: true,
  get: function get() {
    return _utils.getSectionMetadatas;
  }
});
Object.defineProperty(exports, "sortSectionMetadata", {
  enumerable: true,
  get: function get() {
    return _utils.sortSectionMetadata;
  }
});
Object.defineProperty(exports, "orderedInsertNode", {
  enumerable: true,
  get: function get() {
    return _utils.orderedInsertNode;
  }
});
Object.defineProperty(exports, "assertHasLoc", {
  enumerable: true,
  get: function get() {
    return _utils.assertHasLoc;
  }
});
Object.defineProperty(exports, "getEndOfSection", {
  enumerable: true,
  get: function get() {
    return _utils.getEndOfSection;
  }
});
Object.defineProperty(exports, "shiftSection", {
  enumerable: true,
  get: function get() {
    return _utils.shiftSection;
  }
});
Object.defineProperty(exports, "shiftLoc", {
  enumerable: true,
  get: function get() {
    return _utils.shiftLoc;
  }
});
Object.defineProperty(exports, "isAnonymous", {
  enumerable: true,
  get: function get() {
    return _utils.isAnonymous;
  }
});
Object.defineProperty(exports, "getUniqueNameGenerator", {
  enumerable: true,
  get: function get() {
    return _utils.getUniqueNameGenerator;
  }
});
Object.defineProperty(exports, "signatureForOpcode", {
  enumerable: true,
  get: function get() {
    return _utils.signatureForOpcode;
  }
});
Object.defineProperty(exports, "cloneNode", {
  enumerable: true,
  get: function get() {
    return _clone.cloneNode;
  }
});

var _nodes = require("./nodes");

Object.keys(_nodes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _nodes[key];
    }
  });
});

var _nodeHelpers = require("./node-helpers.js");

var _traverse = require("./traverse");

var _signatures = require("./signatures");

var _utils = require("./utils");

var _clone = require("./clone");