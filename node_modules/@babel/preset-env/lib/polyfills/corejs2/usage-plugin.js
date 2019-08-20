"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _corejs2BuiltIns = _interopRequireDefault(require("../../../data/corejs2-built-ins.json"));

var _getPlatformSpecificDefault = _interopRequireDefault(require("./get-platform-specific-default"));

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _builtInDefinitions = require("./built-in-definitions");

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`import '@babel/polyfill'\` call or use \`useBuiltIns: 'entry'\` instead.`;

function _default({
  types: t
}, {
  include,
  exclude,
  polyfillTargets,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, _getPlatformSpecificDefault.default)(polyfillTargets));
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

    ReferencedIdentifier({
      node: {
        name
      },
      parent,
      scope
    }) {
      if (t.isMemberExpression(parent)) return;
      if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
      if (scope.getBindingIdentifier(name)) return;
      const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
      this.addUnsupported(BuiltInDependencies);
    },

    CallExpression(path) {
      if (path.node.arguments.length) return;
      const callee = path.node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!callee.computed) return;

      if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
        return;
      }

      this.addImport("web.dom.iterable");
    },

    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      if (!path.get("left").matchesPattern("Symbol.iterator")) return;
      this.addImport("web.dom.iterable");
    },

    YieldExpression(path) {
      if (path.node.delegate) {
        this.addImport("web.dom.iterable");
      }
    },

    MemberExpression: {
      enter(path) {
        const {
          node
        } = path;
        const {
          object,
          property
        } = node;
        let evaluatedPropType = object.name;
        let propertyName = property.name;
        let instanceType = "";

        if (node.computed) {
          if (t.isStringLiteral(property)) {
            propertyName = property.value;
          } else {
            const result = path.get("property").evaluate();

            if (result.confident && result.value) {
              propertyName = result.value;
            }
          }
        }

        if (path.scope.getBindingIdentifier(object.name)) {
          const result = path.get("object").evaluate();

          if (result.value) {
            instanceType = (0, _utils.getType)(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }

        if ((0, _utils.has)(_builtInDefinitions.StaticProperties, evaluatedPropType)) {
          const BuiltInProperties = _builtInDefinitions.StaticProperties[evaluatedPropType];

          if ((0, _utils.has)(BuiltInProperties, propertyName)) {
            const StaticPropertyDependencies = BuiltInProperties[propertyName];
            this.addUnsupported(StaticPropertyDependencies);
          }
        }

        if ((0, _utils.has)(_builtInDefinitions.InstanceProperties, propertyName)) {
          let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[propertyName];

          if (instanceType) {
            InstancePropertyDependencies = InstancePropertyDependencies.filter(module => module.includes(instanceType));
          }

          this.addUnsupported(InstancePropertyDependencies);
        }
      },

      exit(path) {
        const {
          name
        } = path.node.object;
        if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
        if (path.scope.getBindingIdentifier(name)) return;
        const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
        this.addUnsupported(BuiltInDependencies);
      }

    },

    VariableDeclarator(path) {
      const {
        node
      } = path;
      const {
        id,
        init
      } = node;
      if (!t.isObjectPattern(id)) return;
      if (init && path.scope.getBindingIdentifier(init.name)) return;

      for (const _ref of id.properties) {
        const {
          key
        } = _ref;

        if (!node.computed && t.isIdentifier(key) && (0, _utils.has)(_builtInDefinitions.InstanceProperties, key.name)) {
          const InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key.name];
          this.addUnsupported(InstancePropertyDependencies);
        }
      }
    }

  };
  return {
    name: "corejs2-usage",

    pre({
      path
    }) {
      this.polyfillsSet = new Set();

      this.addImport = function (builtIn) {
        if (!this.polyfillsSet.has(builtIn)) {
          this.polyfillsSet.add(builtIn);
          (0, _utils.createImport)(path, builtIn);
        }
      };

      this.addUnsupported = function (builtIn) {
        const modules = Array.isArray(builtIn) ? builtIn : [builtIn];

        for (const module of modules) {
          if (polyfills.has(module)) {
            this.addImport(module);
          }
        }
      };
    },

    post() {
      if (debug) {
        (0, _debug.logUsagePolyfills)(this.polyfillsSet, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      }
    },

    visitor: addAndRemovePolyfillImports
  };
}