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

function _helperModuleTransforms() {
  const data = require("@babel/helper-module-transforms");

  _helperModuleTransforms = function () {
    return data;
  };

  return data;
}

function _helperSimpleAccess() {
  const data = _interopRequireDefault(require("@babel/helper-simple-access"));

  _helperSimpleAccess = function () {
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

function _utils() {
  const data = require("babel-plugin-dynamic-import-node/utils");

  _utils = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const transformImportCall = (0, _utils().createDynamicImportTransform)(api);
  const {
    loose,
    strictNamespace = false,
    mjsStrictNamespace = true,
    allowTopLevelThis,
    strict,
    strictMode,
    noInterop,
    lazy = false,
    allowCommonJSExports = true
  } = options;

  if (typeof lazy !== "boolean" && typeof lazy !== "function" && (!Array.isArray(lazy) || !lazy.every(item => typeof item === "string"))) {
    throw new Error(`.lazy must be a boolean, array of strings, or a function`);
  }

  if (typeof strictNamespace !== "boolean") {
    throw new Error(`.strictNamespace must be a boolean, or undefined`);
  }

  if (typeof mjsStrictNamespace !== "boolean") {
    throw new Error(`.mjsStrictNamespace must be a boolean, or undefined`);
  }

  const getAssertion = localName => _core().template.expression.ast`
    (function(){
      throw new Error(
        "The CommonJS '" + "${localName}" + "' variable is not available in ES6 modules." +
        "Consider setting setting sourceType:script or sourceType:unambiguous in your " +
        "Babel config for this file.");
    })()
  `;

  const moduleExportsVisitor = {
    ReferencedIdentifier(path) {
      const localName = path.node.name;
      if (localName !== "module" && localName !== "exports") return;
      const localBinding = path.scope.getBinding(localName);
      const rootBinding = this.scope.getBinding(localName);

      if (rootBinding !== localBinding || path.parentPath.isObjectProperty({
        value: path.node
      }) && path.parentPath.parentPath.isObjectPattern() || path.parentPath.isAssignmentExpression({
        left: path.node
      }) || path.isAssignmentExpression({
        left: path.node
      })) {
        return;
      }

      path.replaceWith(getAssertion(localName));
    },

    AssignmentExpression(path) {
      const left = path.get("left");

      if (left.isIdentifier()) {
        const localName = path.node.name;
        if (localName !== "module" && localName !== "exports") return;
        const localBinding = path.scope.getBinding(localName);
        const rootBinding = this.scope.getBinding(localName);
        if (rootBinding !== localBinding) return;
        const right = path.get("right");
        right.replaceWith(_core().types.sequenceExpression([right.node, getAssertion(localName)]));
      } else if (left.isPattern()) {
        const ids = left.getOuterBindingIdentifiers();
        const localName = Object.keys(ids).filter(localName => {
          if (localName !== "module" && localName !== "exports") return false;
          return this.scope.getBinding(localName) === path.scope.getBinding(localName);
        })[0];

        if (localName) {
          const right = path.get("right");
          right.replaceWith(_core().types.sequenceExpression([right.node, getAssertion(localName)]));
        }
      }
    }

  };
  return {
    name: "transform-modules-commonjs",

    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "commonjs");
    },

    visitor: {
      CallExpression(path) {
        if (!this.file.has("@babel/plugin-proposal-dynamic-import")) return;
        if (!path.get("callee").isImport()) return;
        let {
          scope
        } = path;

        do {
          scope.rename("require");
        } while (scope = scope.parent);

        transformImportCall(this, path.get("callee"));
      },

      Program: {
        exit(path, state) {
          if (!(0, _helperModuleTransforms().isModule)(path)) return;
          path.scope.rename("exports");
          path.scope.rename("module");
          path.scope.rename("require");
          path.scope.rename("__filename");
          path.scope.rename("__dirname");

          if (!allowCommonJSExports) {
            (0, _helperSimpleAccess().default)(path, new Set(["module", "exports"]));
            path.traverse(moduleExportsVisitor, {
              scope: path.scope
            });
          }

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = _core().types.stringLiteral(moduleName);
          const {
            meta,
            headers
          } = (0, _helperModuleTransforms().rewriteModuleStatementsAndPrepareHeader)(path, {
            exportName: "exports",
            loose,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop,
            lazy,
            esNamespaceOnly: typeof state.filename === "string" && /\.mjs$/.test(state.filename) ? mjsStrictNamespace : strictNamespace
          });

          for (const [source, metadata] of meta.source) {
            const loadExpr = _core().types.callExpression(_core().types.identifier("require"), [_core().types.stringLiteral(source)]);

            let header;

            if ((0, _helperModuleTransforms().isSideEffectImport)(metadata)) {
              if (metadata.lazy) throw new Error("Assertion failure");
              header = _core().types.expressionStatement(loadExpr);
            } else {
              const init = (0, _helperModuleTransforms().wrapInterop)(path, loadExpr, metadata.interop) || loadExpr;

              if (metadata.lazy) {
                header = _core().template.ast`
                  function ${metadata.name}() {
                    const data = ${init};
                    ${metadata.name} = function(){ return data; };
                    return data;
                  }
                `;
              } else {
                header = _core().template.ast`
                  var ${metadata.name} = ${init};
                `;
              }
            }

            header.loc = metadata.loc;
            headers.push(header);
            headers.push(...(0, _helperModuleTransforms().buildNamespaceInitStatements)(meta, metadata, loose));
          }

          (0, _helperModuleTransforms().ensureStatementsHoisted)(headers);
          path.unshiftContainer("body", headers);
        }

      }
    }
  };
});

exports.default = _default;