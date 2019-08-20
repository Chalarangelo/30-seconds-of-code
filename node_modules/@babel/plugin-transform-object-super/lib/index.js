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

function _helperReplaceSupers() {
  const data = _interopRequireDefault(require("@babel/helper-replace-supers"));

  _helperReplaceSupers = function () {
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

function replacePropertySuper(path, getObjectRef, file) {
  const replaceSupers = new (_helperReplaceSupers().default)({
    getObjectRef: getObjectRef,
    methodPath: path,
    file: file
  });
  replaceSupers.replace();
}

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-object-super",
    visitor: {
      ObjectExpression(path, state) {
        let objectRef;

        const getObjectRef = () => objectRef = objectRef || path.scope.generateUidIdentifier("obj");

        path.get("properties").forEach(propPath => {
          if (!propPath.isMethod()) return;
          replacePropertySuper(propPath, getObjectRef, state);
        });

        if (objectRef) {
          path.scope.push({
            id: _core().types.cloneNode(objectRef)
          });
          path.replaceWith(_core().types.assignmentExpression("=", _core().types.cloneNode(objectRef), path.node));
        }
      }

    }
  };
});

exports.default = _default;