"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.encodeNode = encodeNode;
exports.encodeU32 = void 0;

var encoder = _interopRequireWildcard(require("./encoder"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function encodeNode(n) {
  switch (n.type) {
    case "ModuleImport":
      // $FlowIgnore: ModuleImport ensure that the node is well formated
      return encoder.encodeModuleImport(n);

    case "SectionMetadata":
      // $FlowIgnore: SectionMetadata ensure that the node is well formated
      return encoder.encodeSectionMetadata(n);

    case "CallInstruction":
      // $FlowIgnore: SectionMetadata ensure that the node is well formated
      return encoder.encodeCallInstruction(n);

    case "CallIndirectInstruction":
      // $FlowIgnore: SectionMetadata ensure that the node is well formated
      return encoder.encodeCallIndirectInstruction(n);

    case "TypeInstruction":
      return encoder.encodeTypeInstruction(n);

    case "Instr":
      // $FlowIgnore
      return encoder.encodeInstr(n);

    case "ModuleExport":
      // $FlowIgnore: SectionMetadata ensure that the node is well formated
      return encoder.encodeModuleExport(n);

    case "Global":
      // $FlowIgnore
      return encoder.encodeGlobal(n);

    case "Func":
      return encoder.encodeFuncBody(n);

    case "IndexInFuncSection":
      return encoder.encodeIndexInFuncSection(n);

    case "StringLiteral":
      return encoder.encodeStringLiteral(n);

    case "Elem":
      return encoder.encodeElem(n);

    default:
      throw new Error("Unsupported encoding for node of type: " + JSON.stringify(n.type));
  }
}

var encodeU32 = encoder.encodeU32;
exports.encodeU32 = encodeU32;