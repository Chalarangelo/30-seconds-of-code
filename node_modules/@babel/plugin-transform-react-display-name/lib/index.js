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

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
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

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);

  function addDisplayName(id, call) {
    const props = call.arguments[0].properties;
    let safe = true;

    for (let i = 0; i < props.length; i++) {
      const prop = props[i];

      const key = _core().types.toComputedKey(prop);

      if (_core().types.isLiteral(key, {
        value: "displayName"
      })) {
        safe = false;
        break;
      }
    }

    if (safe) {
      props.unshift(_core().types.objectProperty(_core().types.identifier("displayName"), _core().types.stringLiteral(id)));
    }
  }

  const isCreateClassCallExpression = _core().types.buildMatchMemberExpression("React.createClass");

  const isCreateClassAddon = callee => callee.name === "createReactClass";

  function isCreateClass(node) {
    if (!node || !_core().types.isCallExpression(node)) return false;

    if (!isCreateClassCallExpression(node.callee) && !isCreateClassAddon(node.callee)) {
      return false;
    }

    const args = node.arguments;
    if (args.length !== 1) return false;
    const first = args[0];
    if (!_core().types.isObjectExpression(first)) return false;
    return true;
  }

  return {
    name: "transform-react-display-name",
    visitor: {
      ExportDefaultDeclaration({
        node
      }, state) {
        if (isCreateClass(node.declaration)) {
          const filename = state.filename || "unknown";

          let displayName = _path().default.basename(filename, _path().default.extname(filename));

          if (displayName === "index") {
            displayName = _path().default.basename(_path().default.dirname(filename));
          }

          addDisplayName(displayName, node.declaration);
        }
      },

      CallExpression(path) {
        const {
          node
        } = path;
        if (!isCreateClass(node)) return;
        let id;
        path.find(function (path) {
          if (path.isAssignmentExpression()) {
            id = path.node.left;
          } else if (path.isObjectProperty()) {
            id = path.node.key;
          } else if (path.isVariableDeclarator()) {
            id = path.node.id;
          } else if (path.isStatement()) {
            return true;
          }

          if (id) return true;
        });
        if (!id) return;

        if (_core().types.isMemberExpression(id)) {
          id = id.property;
        }

        if (_core().types.isIdentifier(id)) {
          addDisplayName(id.name, node);
        }
      }

    }
  };
});

exports.default = _default;