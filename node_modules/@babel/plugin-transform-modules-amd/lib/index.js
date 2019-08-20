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

const buildWrapper = (0, _core().template)(`
  define(MODULE_NAME, AMD_ARGUMENTS, function(IMPORT_NAMES) {
  })
`);
const buildAnonymousWrapper = (0, _core().template)(`
  define(["require"], function(REQUIRE) {
  })
`);

function injectWrapper(path, wrapper) {
  const {
    body,
    directives
  } = path.node;
  path.node.directives = [];
  path.node.body = [];
  const amdWrapper = path.pushContainer("body", wrapper)[0];
  const amdFactory = amdWrapper.get("expression.arguments").filter(arg => arg.isFunctionExpression())[0].get("body");
  amdFactory.pushContainer("directives", directives);
  amdFactory.pushContainer("body", body);
}

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    loose,
    allowTopLevelThis,
    strict,
    strictMode,
    noInterop
  } = options;
  return {
    name: "transform-modules-amd",

    pre() {
      this.file.set("@babel/plugin-transform-modules-*", "amd");
    },

    visitor: {
      CallExpression(path, state) {
        if (!this.file.has("@babel/plugin-proposal-dynamic-import")) return;
        if (!path.get("callee").isImport()) return;
        let {
          requireId,
          resolveId,
          rejectId
        } = state;

        if (!requireId) {
          requireId = path.scope.generateUidIdentifier("require");
          state.requireId = requireId;
        }

        if (!resolveId || !rejectId) {
          resolveId = path.scope.generateUidIdentifier("resolve");
          rejectId = path.scope.generateUidIdentifier("reject");
          state.resolveId = resolveId;
          state.rejectId = rejectId;
        }

        let result = _core().types.identifier("imported");

        if (!noInterop) result = (0, _helperModuleTransforms().wrapInterop)(path, result, "namespace");
        path.replaceWith(_core().template.expression.ast`
            new Promise((${resolveId}, ${rejectId}) =>
              ${requireId}(
                [${(0, _utils().getImportSource)(_core().types, path.node)}],
                imported => ${resolveId}(${result}),
                ${rejectId}
              )
            )`);
      },

      Program: {
        exit(path, {
          requireId
        }) {
          if (!(0, _helperModuleTransforms().isModule)(path)) {
            if (requireId) {
              injectWrapper(path, buildAnonymousWrapper({
                REQUIRE: requireId
              }));
            }

            return;
          }

          const amdArgs = [];
          const importNames = [];

          if (requireId) {
            amdArgs.push(_core().types.stringLiteral("require"));
            importNames.push(requireId);
          }

          let moduleName = this.getModuleName();
          if (moduleName) moduleName = _core().types.stringLiteral(moduleName);
          const {
            meta,
            headers
          } = (0, _helperModuleTransforms().rewriteModuleStatementsAndPrepareHeader)(path, {
            loose,
            strict,
            strictMode,
            allowTopLevelThis,
            noInterop
          });

          if ((0, _helperModuleTransforms().hasExports)(meta)) {
            amdArgs.push(_core().types.stringLiteral("exports"));
            importNames.push(_core().types.identifier(meta.exportName));
          }

          for (const [source, metadata] of meta.source) {
            amdArgs.push(_core().types.stringLiteral(source));
            importNames.push(_core().types.identifier(metadata.name));

            if (!(0, _helperModuleTransforms().isSideEffectImport)(metadata)) {
              const interop = (0, _helperModuleTransforms().wrapInterop)(path, _core().types.identifier(metadata.name), metadata.interop);

              if (interop) {
                const header = _core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.identifier(metadata.name), interop));

                header.loc = metadata.loc;
                headers.push(header);
              }
            }

            headers.push(...(0, _helperModuleTransforms().buildNamespaceInitStatements)(meta, metadata, loose));
          }

          (0, _helperModuleTransforms().ensureStatementsHoisted)(headers);
          path.unshiftContainer("body", headers);
          injectWrapper(path, buildWrapper({
            MODULE_NAME: moduleName,
            AMD_ARGUMENTS: _core().types.arrayExpression(amdArgs),
            IMPORT_NAMES: importNames
          }));
        }

      }
    }
  };
});

exports.default = _default;