"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _path() {
  const data = _interopRequireDefault(require("path"));

  _path = function () {
    return data;
  };

  return data;
}

function _resolve() {
  const data = _interopRequireDefault(require("resolve"));

  _resolve = function () {
    return data;
  };

  return data;
}

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _helperModuleImports() {
  const data = require("@babel/helper-module-imports");

  _helperModuleImports = function () {
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

var _runtimeCorejs2Definitions = _interopRequireDefault(require("./runtime-corejs2-definitions"));

var _runtimeCorejs3Definitions = _interopRequireDefault(require("./runtime-corejs3-definitions"));

var _helpers = require("./helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveAbsoluteRuntime(moduleName, dirname) {
  try {
    return _path().default.dirname(_resolve().default.sync(`${moduleName}/package.json`, {
      basedir: dirname
    }));
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") throw err;
    throw Object.assign(new Error(`Failed to resolve "${moduleName}" relative to "${dirname}"`), {
      code: "BABEL_RUNTIME_NOT_FOUND",
      runtime: moduleName,
      dirname
    });
  }
}

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

var _default = (0, _helperPluginUtils().declare)((api, options, dirname) => {
  api.assertVersion(7);
  const {
    corejs,
    helpers: useRuntimeHelpers = true,
    regenerator: useRuntimeRegenerator = true,
    useESModules = false,
    version: runtimeVersion = "7.0.0-beta.0",
    absoluteRuntime = false
  } = options;
  let proposals = false;
  let rawVersion;

  if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const corejsVersion = rawVersion ? Number(rawVersion) : false;

  if (![false, 2, 3].includes(corejsVersion)) {
    throw new Error(`The \`core-js\` version must be false, 2 or 3, but got ${JSON.stringify(rawVersion)}.`);
  }

  if (proposals && (!corejsVersion || corejsVersion < 3)) {
    throw new Error("The 'proposals' option is only supported when using 'corejs: 3'");
  }

  if (typeof useRuntimeRegenerator !== "boolean") {
    throw new Error("The 'regenerator' option must be undefined, or a boolean.");
  }

  if (typeof useRuntimeHelpers !== "boolean") {
    throw new Error("The 'helpers' option must be undefined, or a boolean.");
  }

  if (typeof useESModules !== "boolean" && useESModules !== "auto") {
    throw new Error("The 'useESModules' option must be undefined, or a boolean, or 'auto'.");
  }

  if (typeof absoluteRuntime !== "boolean" && typeof absoluteRuntime !== "string") {
    throw new Error("The 'absoluteRuntime' option must be undefined, a boolean, or a string.");
  }

  if (typeof runtimeVersion !== "string") {
    throw new Error(`The 'version' option must be a version string.`);
  }

  function has(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
  }

  function hasMapping(methods, name) {
    return has(methods, name) && (proposals || methods[name].stable);
  }

  function hasStaticMapping(object, method) {
    return has(StaticProperties, object) && hasMapping(StaticProperties[object], method);
  }

  function maybeNeedsPolyfill(path, methods, name) {
    if (!methods[name].types) return true;
    const typeAnnotation = path.get("object").getTypeAnnotation();
    const type = (0, _helpers.typeAnnotationToString)(typeAnnotation);
    if (!type) return true;
    return methods[name].types.some(name => name === type);
  }

  if (has(options, "useBuiltIns")) {
    if (options.useBuiltIns) {
      throw new Error("The 'useBuiltIns' option has been removed. The @babel/runtime " + "module now uses builtins by default.");
    } else {
      throw new Error("The 'useBuiltIns' option has been removed. Use the 'corejs'" + "option to polyfill with `core-js` via @babel/runtime.");
    }
  }

  if (has(options, "polyfill")) {
    if (options.polyfill === false) {
      throw new Error("The 'polyfill' option has been removed. The @babel/runtime " + "module now skips polyfilling by default.");
    } else {
      throw new Error("The 'polyfill' option has been removed. Use the 'corejs'" + "option to polyfill with `core-js` via @babel/runtime.");
    }
  }

  if (has(options, "moduleName")) {
    throw new Error("The 'moduleName' option has been removed. @babel/transform-runtime " + "no longer supports arbitrary runtimes. If you were using this to " + "set an absolute path for Babel's standard runtimes, please use the " + "'absoluteRuntime' option.");
  }

  const esModules = useESModules === "auto" ? api.caller(supportsStaticESM) : useESModules;
  const injectCoreJS2 = corejsVersion === 2;
  const injectCoreJS3 = corejsVersion === 3;
  const injectCoreJS = corejsVersion !== false;
  const moduleName = injectCoreJS3 ? "@babel/runtime-corejs3" : injectCoreJS2 ? "@babel/runtime-corejs2" : "@babel/runtime";
  const corejsRoot = injectCoreJS3 && !proposals ? "core-js-stable" : "core-js";
  const {
    BuiltIns,
    StaticProperties,
    InstanceProperties
  } = (injectCoreJS2 ? _runtimeCorejs2Definitions.default : _runtimeCorejs3Definitions.default)(runtimeVersion);
  const HEADER_HELPERS = ["interopRequireWildcard", "interopRequireDefault"];
  let modulePath = moduleName;

  if (absoluteRuntime !== false) {
    modulePath = resolveAbsoluteRuntime(moduleName, _path().default.resolve(dirname, absoluteRuntime === true ? "." : absoluteRuntime));
  }

  return {
    name: "transform-runtime",

    pre(file) {
      if (useRuntimeHelpers) {
        file.set("helperGenerator", name => {
          if (file.availableHelper && !file.availableHelper(name, runtimeVersion)) {
            return;
          }

          const isInteropHelper = HEADER_HELPERS.indexOf(name) !== -1;
          const blockHoist = isInteropHelper && !(0, _helperModuleImports().isModule)(file.path) ? 4 : undefined;
          const helpersDir = esModules && file.path.node.sourceType === "module" ? "helpers/esm" : "helpers";
          return this.addDefaultImport(`${modulePath}/${helpersDir}/${name}`, name, blockHoist);
        });
      }

      const cache = new Map();

      this.addDefaultImport = (source, nameHint, blockHoist) => {
        const cacheKey = (0, _helperModuleImports().isModule)(file.path);
        const key = `${source}:${nameHint}:${cacheKey || ""}`;
        let cached = cache.get(key);

        if (cached) {
          cached = _core().types.cloneNode(cached);
        } else {
          cached = (0, _helperModuleImports().addDefault)(file.path, source, {
            importedInterop: "uncompiled",
            nameHint,
            blockHoist
          });
          cache.set(key, cached);
        }

        return cached;
      };
    },

    visitor: {
      ReferencedIdentifier(path) {
        const {
          node,
          parent,
          scope
        } = path;
        const {
          name
        } = node;

        if (name === "regeneratorRuntime" && useRuntimeRegenerator) {
          path.replaceWith(this.addDefaultImport(`${modulePath}/regenerator`, "regeneratorRuntime"));
          return;
        }

        if (!injectCoreJS) return;
        if (_core().types.isMemberExpression(parent)) return;
        if (!hasMapping(BuiltIns, name)) return;
        if (scope.getBindingIdentifier(name)) return;
        path.replaceWith(this.addDefaultImport(`${modulePath}/${corejsRoot}/${BuiltIns[name].path}`, name));
      },

      CallExpression(path) {
        if (!injectCoreJS) return;
        const {
          node
        } = path;
        const {
          callee
        } = node;
        if (!_core().types.isMemberExpression(callee)) return;
        const {
          object,
          property
        } = callee;
        const propertyName = property.name;

        if (injectCoreJS3 && !hasStaticMapping(object.name, propertyName)) {
          if (hasMapping(InstanceProperties, propertyName) && maybeNeedsPolyfill(path.get("callee"), InstanceProperties, propertyName)) {
            let context1, context2;

            if (_core().types.isIdentifier(object)) {
              context1 = object;
              context2 = _core().types.cloneNode(object);
            } else {
              context1 = path.scope.generateDeclaredUidIdentifier("context");
              context2 = _core().types.assignmentExpression("=", context1, object);
            }

            node.callee = _core().types.memberExpression(_core().types.callExpression(this.addDefaultImport(`${moduleName}/${corejsRoot}/instance/${InstanceProperties[propertyName].path}`, `${propertyName}InstanceProperty`), [context2]), _core().types.identifier("call"));
            node.arguments.unshift(context1);
            return;
          }
        }

        if (node.arguments.length) return;
        if (!callee.computed) return;

        if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
          return;
        }

        path.replaceWith(_core().types.callExpression(this.addDefaultImport(`${modulePath}/core-js/get-iterator`, "getIterator"), [object]));
      },

      BinaryExpression(path) {
        if (!injectCoreJS) return;
        if (path.node.operator !== "in") return;
        if (!path.get("left").matchesPattern("Symbol.iterator")) return;
        path.replaceWith(_core().types.callExpression(this.addDefaultImport(`${modulePath}/core-js/is-iterable`, "isIterable"), [path.node.right]));
      },

      MemberExpression: {
        enter(path) {
          if (!injectCoreJS) return;
          if (!path.isReferenced()) return;
          const {
            node
          } = path;
          const {
            object,
            property
          } = node;
          if (!_core().types.isReferenced(object, node)) return;

          if (node.computed) {
            if (injectCoreJS2) return;

            if (path.get("property").matchesPattern("Symbol.iterator")) {
              path.replaceWith(_core().types.callExpression(this.addDefaultImport(`${moduleName}/core-js/get-iterator-method`, "getIteratorMethod"), [object]));
            }

            return;
          }

          const objectName = object.name;
          const propertyName = property.name;

          if (path.scope.getBindingIdentifier(objectName) || !hasStaticMapping(objectName, propertyName)) {
            if (injectCoreJS3 && hasMapping(InstanceProperties, propertyName) && maybeNeedsPolyfill(path, InstanceProperties, propertyName)) {
              path.replaceWith(_core().types.callExpression(this.addDefaultImport(`${moduleName}/${corejsRoot}/instance/${InstanceProperties[propertyName].path}`, `${propertyName}InstanceProperty`), [object]));
            }

            return;
          }

          path.replaceWith(this.addDefaultImport(`${modulePath}/${corejsRoot}/${StaticProperties[objectName][propertyName].path}`, `${objectName}$${propertyName}`));
        },

        exit(path) {
          if (!injectCoreJS) return;
          if (!path.isReferenced()) return;
          if (path.node.computed) return;
          const {
            node
          } = path;
          const {
            object
          } = node;
          const {
            name
          } = object;
          if (!hasMapping(BuiltIns, name)) return;
          if (path.scope.getBindingIdentifier(name)) return;
          path.replaceWith(_core().types.memberExpression(this.addDefaultImport(`${modulePath}/${corejsRoot}/${BuiltIns[name].path}`, name), node.property));
        }

      }
    }
  };
});

exports.default = _default;