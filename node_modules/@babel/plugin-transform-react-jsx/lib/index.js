"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _pluginSyntaxJsx() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-jsx"));

  _pluginSyntaxJsx = function () {
    return data;
  };

  return data;
}

function _helperBuilderReactJsx() {
  const data = _interopRequireDefault(require("@babel/helper-builder-react-jsx"));

  _helperBuilderReactJsx = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const THROW_IF_NAMESPACE = options.throwIfNamespace === undefined ? true : !!options.throwIfNamespace;
  const PRAGMA_DEFAULT = options.pragma || "React.createElement";
  const PRAGMA_FRAG_DEFAULT = options.pragmaFrag || "React.Fragment";
  const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/;
  const JSX_FRAG_ANNOTATION_REGEX = /\*?\s*@jsxFrag\s+([^\s]+)/;

  const createIdentifierParser = id => () => {
    return id.split(".").map(name => _core().types.identifier(name)).reduce((object, property) => _core().types.memberExpression(object, property));
  };

  const visitor = (0, _helperBuilderReactJsx().default)({
    pre(state) {
      const tagName = state.tagName;
      const args = state.args;

      if (_core().types.react.isCompatTag(tagName)) {
        args.push(_core().types.stringLiteral(tagName));
      } else {
        args.push(state.tagExpr);
      }
    },

    post(state, pass) {
      state.callee = pass.get("jsxIdentifier")();
    },

    throwIfNamespace: THROW_IF_NAMESPACE
  });
  visitor.Program = {
    enter(path, state) {
      const {
        file
      } = state;
      let pragma = PRAGMA_DEFAULT;
      let pragmaFrag = PRAGMA_FRAG_DEFAULT;
      let pragmaSet = !!options.pragma;
      let pragmaFragSet = !!options.pragmaFrag;

      if (file.ast.comments) {
        for (const comment of file.ast.comments) {
          const jsxMatches = JSX_ANNOTATION_REGEX.exec(comment.value);

          if (jsxMatches) {
            pragma = jsxMatches[1];
            pragmaSet = true;
          }

          const jsxFragMatches = JSX_FRAG_ANNOTATION_REGEX.exec(comment.value);

          if (jsxFragMatches) {
            pragmaFrag = jsxFragMatches[1];
            pragmaFragSet = true;
          }
        }
      }

      state.set("jsxIdentifier", createIdentifierParser(pragma));
      state.set("jsxFragIdentifier", createIdentifierParser(pragmaFrag));
      state.set("usedFragment", false);
      state.set("pragmaSet", pragmaSet);
      state.set("pragmaFragSet", pragmaFragSet);
    },

    exit(path, state) {
      if (state.get("pragmaSet") && state.get("usedFragment") && !state.get("pragmaFragSet")) {
        throw new Error("transform-react-jsx: pragma has been set but " + "pragmafrag has not been set");
      }
    }

  };

  visitor.JSXAttribute = function (path) {
    if (_core().types.isJSXElement(path.node.value)) {
      path.node.value = _core().types.jsxExpressionContainer(path.node.value);
    }
  };

  return {
    name: "transform-react-jsx",
    inherits: _pluginSyntaxJsx().default,
    visitor
  };
});

exports.default = _default;