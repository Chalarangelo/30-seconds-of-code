"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function getObjRef(node, nodes, file, scope) {
  let ref;

  if (t().isSuper(node)) {
    return node;
  } else if (t().isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      return node;
    } else {
      ref = node;
    }
  } else if (t().isMemberExpression(node)) {
    ref = node.object;

    if (t().isSuper(ref) || t().isIdentifier(ref) && scope.hasBinding(ref.name)) {
      return ref;
    }
  } else {
    throw new Error(`We can't explode this node type ${node.type}`);
  }

  const temp = scope.generateUidIdentifierBasedOnNode(ref);
  scope.push({
    id: temp
  });
  nodes.push(t().assignmentExpression("=", t().cloneNode(temp), t().cloneNode(ref)));
  return temp;
}

function getPropRef(node, nodes, file, scope) {
  const prop = node.property;
  const key = t().toComputedKey(node, prop);
  if (t().isLiteral(key) && t().isPureish(key)) return key;
  const temp = scope.generateUidIdentifierBasedOnNode(prop);
  scope.push({
    id: temp
  });
  nodes.push(t().assignmentExpression("=", t().cloneNode(temp), t().cloneNode(prop)));
  return temp;
}

function _default(node, nodes, file, scope, allowedSingleIdent) {
  let obj;

  if (t().isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, file, scope);
  }

  let ref, uid;

  if (t().isIdentifier(node)) {
    ref = t().cloneNode(node);
    uid = obj;
  } else {
    const prop = getPropRef(node, nodes, file, scope);
    const computed = node.computed || t().isLiteral(prop);
    uid = t().memberExpression(t().cloneNode(obj), t().cloneNode(prop), computed);
    ref = t().memberExpression(t().cloneNode(obj), t().cloneNode(prop), computed);
  }

  return {
    uid: uid,
    ref: ref
  };
}