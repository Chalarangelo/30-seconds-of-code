"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTypeAnnotation = getTypeAnnotation;
exports._getTypeAnnotation = _getTypeAnnotation;
exports.isBaseType = isBaseType;
exports.couldBeBaseType = couldBeBaseType;
exports.baseTypeStrictlyMatches = baseTypeStrictlyMatches;
exports.isGenericType = isGenericType;

var inferers = _interopRequireWildcard(require("./inferers"));

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function getTypeAnnotation() {
  if (this.typeAnnotation) return this.typeAnnotation;
  let type = this._getTypeAnnotation() || t().anyTypeAnnotation();
  if (t().isTypeAnnotation(type)) type = type.typeAnnotation;
  return this.typeAnnotation = type;
}

function _getTypeAnnotation() {
  const node = this.node;

  if (!node) {
    if (this.key === "init" && this.parentPath.isVariableDeclarator()) {
      const declar = this.parentPath.parentPath;
      const declarParent = declar.parentPath;

      if (declar.key === "left" && declarParent.isForInStatement()) {
        return t().stringTypeAnnotation();
      }

      if (declar.key === "left" && declarParent.isForOfStatement()) {
        return t().anyTypeAnnotation();
      }

      return t().voidTypeAnnotation();
    } else {
      return;
    }
  }

  if (node.typeAnnotation) {
    return node.typeAnnotation;
  }

  let inferer = inferers[node.type];

  if (inferer) {
    return inferer.call(this, node);
  }

  inferer = inferers[this.parentPath.type];

  if (inferer && inferer.validParent) {
    return this.parentPath.getTypeAnnotation();
  }
}

function isBaseType(baseName, soft) {
  return _isBaseType(baseName, this.getTypeAnnotation(), soft);
}

function _isBaseType(baseName, type, soft) {
  if (baseName === "string") {
    return t().isStringTypeAnnotation(type);
  } else if (baseName === "number") {
    return t().isNumberTypeAnnotation(type);
  } else if (baseName === "boolean") {
    return t().isBooleanTypeAnnotation(type);
  } else if (baseName === "any") {
    return t().isAnyTypeAnnotation(type);
  } else if (baseName === "mixed") {
    return t().isMixedTypeAnnotation(type);
  } else if (baseName === "empty") {
    return t().isEmptyTypeAnnotation(type);
  } else if (baseName === "void") {
    return t().isVoidTypeAnnotation(type);
  } else {
    if (soft) {
      return false;
    } else {
      throw new Error(`Unknown base type ${baseName}`);
    }
  }
}

function couldBeBaseType(name) {
  const type = this.getTypeAnnotation();
  if (t().isAnyTypeAnnotation(type)) return true;

  if (t().isUnionTypeAnnotation(type)) {
    for (const type2 of type.types) {
      if (t().isAnyTypeAnnotation(type2) || _isBaseType(name, type2, true)) {
        return true;
      }
    }

    return false;
  } else {
    return _isBaseType(name, type, true);
  }
}

function baseTypeStrictlyMatches(right) {
  const left = this.getTypeAnnotation();
  right = right.getTypeAnnotation();

  if (!t().isAnyTypeAnnotation(left) && t().isFlowBaseAnnotation(left)) {
    return right.type === left.type;
  }
}

function isGenericType(genericName) {
  const type = this.getTypeAnnotation();
  return t().isGenericTypeAnnotation(type) && t().isIdentifier(type.id, {
    name: genericName
  });
}