"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createClassFeaturePlugin = createClassFeaturePlugin;
Object.defineProperty(exports, "injectInitialization", {
  enumerable: true,
  get: function () {
    return _misc.injectInitialization;
  }
});
Object.defineProperty(exports, "FEATURES", {
  enumerable: true,
  get: function () {
    return _features.FEATURES;
  }
});

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _helperSplitExportDeclaration() {
  const data = _interopRequireDefault(require("@babel/helper-split-export-declaration"));

  _helperSplitExportDeclaration = function () {
    return data;
  };

  return data;
}

var _fields = require("./fields");

var _decorators = require("./decorators");

var _misc = require("./misc");

var _features = require("./features");

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const version = _package.default.version.split(".").reduce((v, x) => v * 1e5 + +x, 0);

const versionKey = "@babel/plugin-class-features/version";

function createClassFeaturePlugin({
  name,
  feature,
  loose,
  manipulateOptions
}) {
  return {
    name,
    manipulateOptions,

    pre() {
      (0, _features.enableFeature)(this.file, feature, loose);

      if (!this.file.get(versionKey) || this.file.get(versionKey) < version) {
        this.file.set(versionKey, version);
      }
    },

    visitor: {
      Class(path, state) {
        if (this.file.get(versionKey) !== version) return;
        (0, _features.verifyUsedFeatures)(path, this.file);
        const loose = (0, _features.isLoose)(this.file, feature);
        let constructor;
        let isDecorated = (0, _decorators.hasOwnDecorators)(path.node);
        const props = [];
        const elements = [];
        const computedPaths = [];
        const privateNames = new Set();
        const body = path.get("body");

        for (const path of body.get("body")) {
          (0, _features.verifyUsedFeatures)(path, this.file);

          if (path.node.computed) {
            computedPaths.push(path);
          }

          if (path.isPrivate()) {
            const {
              name
            } = path.node.key.id;
            const getName = `get ${name}`;
            const setName = `set ${name}`;

            if (path.node.kind === "get") {
              if (privateNames.has(getName) || privateNames.has(name) && !privateNames.has(setName)) {
                throw path.buildCodeFrameError("Duplicate private field");
              }

              privateNames.add(getName).add(name);
            } else if (path.node.kind === "set") {
              if (privateNames.has(setName) || privateNames.has(name) && !privateNames.has(getName)) {
                throw path.buildCodeFrameError("Duplicate private field");
              }

              privateNames.add(setName).add(name);
            } else {
              if (privateNames.has(name) && !privateNames.has(getName) && !privateNames.has(setName) || privateNames.has(name) && (privateNames.has(getName) || privateNames.has(setName))) {
                throw path.buildCodeFrameError("Duplicate private field");
              }

              privateNames.add(name);
            }
          }

          if (path.isClassMethod({
            kind: "constructor"
          })) {
            constructor = path;
          } else {
            elements.push(path);

            if (path.isProperty() || path.isPrivate()) {
              props.push(path);
            }
          }

          if (!isDecorated) isDecorated = (0, _decorators.hasOwnDecorators)(path.node);
        }

        if (!props.length && !isDecorated) return;
        let ref;

        if (path.isClassExpression() || !path.node.id) {
          (0, _helperFunctionName().default)(path);
          ref = path.scope.generateUidIdentifier("class");
        } else {
          ref = path.node.id;
        }

        const privateNamesMap = (0, _fields.buildPrivateNamesMap)(props);
        const privateNamesNodes = (0, _fields.buildPrivateNamesNodes)(privateNamesMap, loose, state);
        (0, _fields.transformPrivateNamesUsage)(ref, path, privateNamesMap, loose, state);
        let keysNodes, staticNodes, instanceNodes, wrapClass;

        if (isDecorated) {
          staticNodes = keysNodes = [];
          ({
            instanceNodes,
            wrapClass
          } = (0, _decorators.buildDecoratedClass)(ref, path, elements, this.file));
        } else {
          keysNodes = (0, _misc.extractComputedKeys)(ref, path, computedPaths, this.file);
          ({
            staticNodes,
            instanceNodes,
            wrapClass
          } = (0, _fields.buildFieldsInitNodes)(ref, path.node.superClass, props, privateNamesMap, state, loose));
        }

        if (instanceNodes.length > 0) {
          (0, _misc.injectInitialization)(path, constructor, instanceNodes, (referenceVisitor, state) => {
            if (isDecorated) return;

            for (const prop of props) {
              if (prop.node.static) continue;
              prop.traverse(referenceVisitor, state);
            }
          });
        }

        path = wrapClass(path);
        path.insertBefore(keysNodes);
        path.insertAfter([...privateNamesNodes, ...staticNodes]);
      },

      PrivateName(path) {
        if (this.file.get(versionKey) !== version) return;
        throw path.buildCodeFrameError(`Unknown PrivateName "${path}"`);
      },

      ExportDefaultDeclaration(path) {
        if (this.file.get(versionKey) !== version) return;
        const decl = path.get("declaration");

        if (decl.isClassDeclaration() && (0, _decorators.hasDecorators)(decl.node)) {
          if (decl.node.id) {
            (0, _helperSplitExportDeclaration().default)(path);
          } else {
            decl.node.type = "ClassExpression";
          }
        }
      }

    }
  };
}