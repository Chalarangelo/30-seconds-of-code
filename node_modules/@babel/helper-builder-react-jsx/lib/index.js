"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _esutils() {
  const data = _interopRequireDefault(require("esutils"));

  _esutils = function () {
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

function _default(opts) {
  const visitor = {};

  visitor.JSXNamespacedName = function (path) {
    if (opts.throwIfNamespace) {
      throw path.buildCodeFrameError(`Namespace tags are not supported by default. React's JSX doesn't support namespace tags. \
You can turn on the 'throwIfNamespace' flag to bypass this warning.`);
    }
  };

  visitor.JSXSpreadChild = function (path) {
    throw path.buildCodeFrameError("Spread children are not supported in React.");
  };

  visitor.JSXElement = {
    exit(path, file) {
      const callExpr = buildElementCall(path, file);

      if (callExpr) {
        path.replaceWith(t().inherits(callExpr, path.node));
      }
    }

  };
  visitor.JSXFragment = {
    exit(path, file) {
      if (opts.compat) {
        throw path.buildCodeFrameError("Fragment tags are only supported in React 16 and up.");
      }

      const callExpr = buildFragmentCall(path, file);

      if (callExpr) {
        path.replaceWith(t().inherits(callExpr, path.node));
      }
    }

  };
  return visitor;

  function convertJSXIdentifier(node, parent) {
    if (t().isJSXIdentifier(node)) {
      if (node.name === "this" && t().isReferenced(node, parent)) {
        return t().thisExpression();
      } else if (_esutils().default.keyword.isIdentifierNameES6(node.name)) {
        node.type = "Identifier";
      } else {
        return t().stringLiteral(node.name);
      }
    } else if (t().isJSXMemberExpression(node)) {
      return t().memberExpression(convertJSXIdentifier(node.object, node), convertJSXIdentifier(node.property, node));
    } else if (t().isJSXNamespacedName(node)) {
      return t().stringLiteral(`${node.namespace.name}:${node.name.name}`);
    }

    return node;
  }

  function convertAttributeValue(node) {
    if (t().isJSXExpressionContainer(node)) {
      return node.expression;
    } else {
      return node;
    }
  }

  function convertAttribute(node) {
    const value = convertAttributeValue(node.value || t().booleanLiteral(true));

    if (t().isStringLiteral(value) && !t().isJSXExpressionContainer(node.value)) {
      value.value = value.value.replace(/\n\s+/g, " ");

      if (value.extra && value.extra.raw) {
        delete value.extra.raw;
      }
    }

    if (t().isJSXNamespacedName(node.name)) {
      node.name = t().stringLiteral(node.name.namespace.name + ":" + node.name.name.name);
    } else if (_esutils().default.keyword.isIdentifierNameES6(node.name.name)) {
      node.name.type = "Identifier";
    } else {
      node.name = t().stringLiteral(node.name.name);
    }

    return t().inherits(t().objectProperty(node.name, value), node);
  }

  function buildElementCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;
    const openingPath = path.get("openingElement");
    openingPath.parent.children = t().react.buildChildren(openingPath.parent);
    const tagExpr = convertJSXIdentifier(openingPath.node.name, openingPath.node);
    const args = [];
    let tagName;

    if (t().isIdentifier(tagExpr)) {
      tagName = tagExpr.name;
    } else if (t().isLiteral(tagExpr)) {
      tagName = tagExpr.value;
    }

    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args
    };

    if (opts.pre) {
      opts.pre(state, file);
    }

    let attribs = openingPath.node.attributes;

    if (attribs.length) {
      attribs = buildOpeningElementAttributes(attribs, file);
    } else {
      attribs = t().nullLiteral();
    }

    args.push(attribs, ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    return state.call || t().callExpression(state.callee, args);
  }

  function pushProps(_props, objs) {
    if (!_props.length) return _props;
    objs.push(t().objectExpression(_props));
    return [];
  }

  function buildOpeningElementAttributes(attribs, file) {
    let _props = [];
    const objs = [];
    const useBuiltIns = file.opts.useBuiltIns || false;

    if (typeof useBuiltIns !== "boolean") {
      throw new Error("transform-react-jsx currently only accepts a boolean option for " + "useBuiltIns (defaults to false)");
    }

    while (attribs.length) {
      const prop = attribs.shift();

      if (t().isJSXSpreadAttribute(prop)) {
        _props = pushProps(_props, objs);
        objs.push(prop.argument);
      } else {
        _props.push(convertAttribute(prop));
      }
    }

    pushProps(_props, objs);

    if (objs.length === 1) {
      attribs = objs[0];
    } else {
      if (!t().isObjectExpression(objs[0])) {
        objs.unshift(t().objectExpression([]));
      }

      const helper = useBuiltIns ? t().memberExpression(t().identifier("Object"), t().identifier("assign")) : file.addHelper("extends");
      attribs = t().callExpression(helper, objs);
    }

    return attribs;
  }

  function buildFragmentCall(path, file) {
    if (opts.filter && !opts.filter(path.node, file)) return;
    const openingPath = path.get("openingElement");
    openingPath.parent.children = t().react.buildChildren(openingPath.parent);
    const args = [];
    const tagName = null;
    const tagExpr = file.get("jsxFragIdentifier")();
    const state = {
      tagExpr: tagExpr,
      tagName: tagName,
      args: args
    };

    if (opts.pre) {
      opts.pre(state, file);
    }

    args.push(t().nullLiteral(), ...path.node.children);

    if (opts.post) {
      opts.post(state, file);
    }

    file.set("usedFragment", true);
    return state.call || t().callExpression(state.callee, args);
  }
}