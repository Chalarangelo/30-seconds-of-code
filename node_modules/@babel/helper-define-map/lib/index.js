"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.push = push;
exports.hasComputed = hasComputed;
exports.toComputedObjectFromClass = toComputedObjectFromClass;
exports.toClassObject = toClassObject;
exports.toDefineObject = toDefineObject;

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _has() {
  const data = _interopRequireDefault(require("lodash/has"));

  _has = function () {
    return data;
  };

  return data;
}

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function toKind(node) {
  if (t().isClassMethod(node) || t().isObjectMethod(node)) {
    if (node.kind === "get" || node.kind === "set") {
      return node.kind;
    }
  }

  return "value";
}

function push(mutatorMap, node, kind, file, scope) {
  const alias = t().toKeyAlias(node);
  let map = {};
  if ((0, _has().default)(mutatorMap, alias)) map = mutatorMap[alias];
  mutatorMap[alias] = map;
  map._inherits = map._inherits || [];

  map._inherits.push(node);

  map._key = node.key;

  if (node.computed) {
    map._computed = true;
  }

  if (node.decorators) {
    const decorators = map.decorators = map.decorators || t().arrayExpression([]);
    decorators.elements = decorators.elements.concat(node.decorators.map(dec => dec.expression).reverse());
  }

  if (map.value || map.initializer) {
    throw file.buildCodeFrameError(node, "Key conflict with sibling node");
  }

  let key, value;

  if (t().isObjectProperty(node) || t().isObjectMethod(node) || t().isClassMethod(node)) {
    key = t().toComputedKey(node, node.key);
  }

  if (t().isProperty(node)) {
    value = node.value;
  } else if (t().isObjectMethod(node) || t().isClassMethod(node)) {
    value = t().functionExpression(null, node.params, node.body, node.generator, node.async);
    value.returnType = node.returnType;
  }

  const inheritedKind = toKind(node);

  if (!kind || inheritedKind !== "value") {
    kind = inheritedKind;
  }

  if (scope && t().isStringLiteral(key) && (kind === "value" || kind === "initializer") && t().isFunctionExpression(value)) {
    value = (0, _helperFunctionName().default)({
      id: key,
      node: value,
      scope
    });
  }

  if (value) {
    t().inheritsComments(value, node);
    map[kind] = value;
  }

  return map;
}

function hasComputed(mutatorMap) {
  for (const key of Object.keys(mutatorMap)) {
    if (mutatorMap[key]._computed) {
      return true;
    }
  }

  return false;
}

function toComputedObjectFromClass(obj) {
  const objExpr = t().arrayExpression([]);

  for (let i = 0; i < obj.properties.length; i++) {
    const prop = obj.properties[i];
    const val = prop.value;
    val.properties.unshift(t().objectProperty(t().identifier("key"), t().toComputedKey(prop)));
    objExpr.elements.push(val);
  }

  return objExpr;
}

function toClassObject(mutatorMap) {
  const objExpr = t().objectExpression([]);
  Object.keys(mutatorMap).forEach(function (mutatorMapKey) {
    const map = mutatorMap[mutatorMapKey];
    const mapNode = t().objectExpression([]);
    const propNode = t().objectProperty(map._key, mapNode, map._computed);
    Object.keys(map).forEach(function (key) {
      const node = map[key];
      if (key[0] === "_") return;
      const prop = t().objectProperty(t().identifier(key), node);
      t().inheritsComments(prop, node);
      t().removeComments(node);
      mapNode.properties.push(prop);
    });
    objExpr.properties.push(propNode);
  });
  return objExpr;
}

function toDefineObject(mutatorMap) {
  Object.keys(mutatorMap).forEach(function (key) {
    const map = mutatorMap[key];
    if (map.value) map.writable = t().booleanLiteral(true);
    map.configurable = t().booleanLiteral(true);
    map.enumerable = t().booleanLiteral(true);
  });
  return toClassObject(mutatorMap);
}