"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
    return data;
  };

  return data;
}

var _shippedProposals = _interopRequireDefault(require("./shipped-proposals"));

function _getModulesListForTargetVersion() {
  const data = _interopRequireDefault(require("core-js-compat/get-modules-list-for-target-version"));

  _getModulesListForTargetVersion = function () {
    return data;
  };

  return data;
}

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _builtInDefinitions = require("./built-in-definitions");

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the direct import of \`core-js\` or use \`useBuiltIns: 'entry'\` instead.`;
const corejs3PolyfillsWithoutProposals = Object.keys(_data().default).filter(name => !name.startsWith("esnext.")).reduce((memo, key) => {
  memo[key] = _data().default[key];
  return memo;
}, {});

const corejs3PolyfillsWithShippedProposals = _shippedProposals.default.reduce((memo, key) => {
  memo[key] = _data().default[key];
  return memo;
}, Object.assign({}, corejs3PolyfillsWithoutProposals));

function _default(_, {
  corejs,
  include,
  exclude,
  polyfillTargets,
  proposals,
  shippedProposals,
  debug
}) {
  const polyfills = (0, _filterItems.default)(proposals ? _data().default : shippedProposals ? corejs3PolyfillsWithShippedProposals : corejs3PolyfillsWithoutProposals, include, exclude, polyfillTargets, null);
  const available = new Set((0, _getModulesListForTargetVersion().default)(corejs.version));

  function resolveKey(path, computed) {
    const {
      node,
      parent,
      scope
    } = path;
    if (path.isStringLiteral()) return node.value;
    const {
      name
    } = node;
    const isIdentifier = path.isIdentifier();
    if (isIdentifier && !(computed || parent.computed)) return name;

    if (!isIdentifier || scope.getBindingIdentifier(name)) {
      const {
        value
      } = path.evaluate();
      if (typeof value === "string") return value;
    }
  }

  function resolveSource(path) {
    const {
      node,
      scope
    } = path;
    let builtIn, instanceType;

    if (node) {
      builtIn = node.name;

      if (!path.isIdentifier() || scope.getBindingIdentifier(builtIn)) {
        const {
          deopt,
          value
        } = path.evaluate();

        if (value !== undefined) {
          instanceType = (0, _utils.getType)(value);
        } else if (deopt && deopt.isIdentifier()) {
          builtIn = deopt.node.name;
        }
      }
    }

    return {
      builtIn,
      instanceType
    };
  }

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if ((0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path))) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if ((0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath))) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    Import() {
      this.addUnsupported(_builtInDefinitions.PromiseDependencies);
    },

    Function({
      node
    }) {
      if (node.async) {
        this.addUnsupported(_builtInDefinitions.PromiseDependencies);
      }
    },

    "ForOfStatement|ArrayPattern"() {
      this.addUnsupported(_builtInDefinitions.CommonIterators);
    },

    SpreadElement({
      parentPath
    }) {
      if (!parentPath.isObjectExpression()) {
        this.addUnsupported(_builtInDefinitions.CommonIterators);
      }
    },

    YieldExpression({
      node
    }) {
      if (node.delegate) {
        this.addUnsupported(_builtInDefinitions.CommonIterators);
      }
    },

    ReferencedIdentifier({
      node: {
        name
      },
      scope
    }) {
      if (scope.getBindingIdentifier(name)) return;
      this.addBuiltInDependencies(name);
    },

    MemberExpression(path) {
      const source = resolveSource(path.get("object"));
      const key = resolveKey(path.get("property"));
      this.addPropertyDependencies(source, key);
    },

    ObjectPattern(path) {
      const {
        parentPath,
        parent,
        key
      } = path;
      let source;

      if (parentPath.isVariableDeclarator()) {
        source = resolveSource(parentPath.get("init"));
      } else if (parentPath.isAssignmentExpression()) {
        source = resolveSource(parentPath.get("right"));
      } else if (parentPath.isFunctionExpression()) {
        const grand = parentPath.parentPath;

        if (grand.isCallExpression() || grand.isNewExpression()) {
          if (grand.node.callee === parent) {
            source = resolveSource(grand.get("arguments")[key]);
          }
        }
      }

      for (const property of path.get("properties")) {
        if (property.isObjectProperty()) {
          const key = resolveKey(property.get("key"));
          this.addPropertyDependencies(source, key);
        }
      }
    },

    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      const source = resolveSource(path.get("right"));
      const key = resolveKey(path.get("left"), true);
      this.addPropertyDependencies(source, key);
    }

  };
  return {
    name: "corejs3-usage",

    pre() {
      this.polyfillsSet = new Set();

      this.addUnsupported = function (builtIn) {
        const modules = Array.isArray(builtIn) ? builtIn : [builtIn];

        for (const module of modules) {
          this.polyfillsSet.add(module);
        }
      };

      this.addBuiltInDependencies = function (builtIn) {
        if ((0, _utils.has)(_builtInDefinitions.BuiltIns, builtIn)) {
          const BuiltInDependencies = _builtInDefinitions.BuiltIns[builtIn];
          this.addUnsupported(BuiltInDependencies);
        }
      };

      this.addPropertyDependencies = function (source = {}, key) {
        const {
          builtIn,
          instanceType
        } = source;

        if (_builtInDefinitions.PossibleGlobalObjects.has(builtIn)) {
          this.addBuiltInDependencies(key);
        } else if ((0, _utils.has)(_builtInDefinitions.StaticProperties, builtIn)) {
          const BuiltInProperties = _builtInDefinitions.StaticProperties[builtIn];

          if ((0, _utils.has)(BuiltInProperties, key)) {
            const StaticPropertyDependencies = BuiltInProperties[key];
            return this.addUnsupported(StaticPropertyDependencies);
          }
        }

        if (!(0, _utils.has)(_builtInDefinitions.InstanceProperties, key)) return;
        let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key];

        if (instanceType) {
          InstancePropertyDependencies = InstancePropertyDependencies.filter(m => m.includes(instanceType) || _builtInDefinitions.CommonInstanceDependencies.has(m));
        }

        this.addUnsupported(InstancePropertyDependencies);
      };
    },

    post({
      path
    }) {
      const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        (0, _utils.createImport)(path, module);
      }

      if (debug) {
        (0, _debug.logUsagePolyfills)(filtered, this.file.opts.filename, polyfillTargets, _data().default);
      }
    },

    visitor: addAndRemovePolyfillImports
  };
}