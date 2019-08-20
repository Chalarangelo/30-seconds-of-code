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

function _helperRemapAsyncToGenerator() {
  const data = _interopRequireDefault(require("@babel/helper-remap-async-to-generator"));

  _helperRemapAsyncToGenerator = function () {
    return data;
  };

  return data;
}

function _pluginSyntaxAsyncGenerators() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-async-generators"));

  _pluginSyntaxAsyncGenerators = function () {
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

var _forAwait = _interopRequireDefault(require("./for-await"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);
  const yieldStarVisitor = {
    Function(path) {
      path.skip();
    },

    YieldExpression({
      node
    }, state) {
      if (!node.delegate) return;
      const callee = state.addHelper("asyncGeneratorDelegate");
      node.argument = _core().types.callExpression(callee, [_core().types.callExpression(state.addHelper("asyncIterator"), [node.argument]), state.addHelper("awaitAsyncGenerator")]);
    }

  };
  const forAwaitVisitor = {
    Function(path) {
      path.skip();
    },

    ForOfStatement(path, {
      file
    }) {
      const {
        node
      } = path;
      if (!node.await) return;
      const build = (0, _forAwait.default)(path, {
        getAsyncIterator: file.addHelper("asyncIterator")
      });
      const {
        declar,
        loop
      } = build;
      const block = loop.body;
      path.ensureBlock();

      if (declar) {
        block.body.push(declar);
      }

      block.body = block.body.concat(node.body.body);

      _core().types.inherits(loop, node);

      _core().types.inherits(loop.body, node.body);

      if (build.replaceParent) {
        path.parentPath.replaceWithMultiple(build.node);
      } else {
        path.replaceWithMultiple(build.node);
      }
    }

  };
  const visitor = {
    Function(path, state) {
      if (!path.node.async) return;
      path.traverse(forAwaitVisitor, state);
      if (!path.node.generator) return;
      path.traverse(yieldStarVisitor, state);
      (0, _helperRemapAsyncToGenerator().default)(path, {
        wrapAsync: state.addHelper("wrapAsyncGenerator"),
        wrapAwait: state.addHelper("awaitAsyncGenerator")
      });
    }

  };
  return {
    name: "proposal-async-generator-functions",
    inherits: _pluginSyntaxAsyncGenerators().default,
    visitor: {
      Program(path, state) {
        path.traverse(visitor, state);
      }

    }
  };
});

exports.default = _default;