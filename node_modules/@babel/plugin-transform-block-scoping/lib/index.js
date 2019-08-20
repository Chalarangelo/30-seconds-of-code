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

var _tdz = require("./tdz");

function _values() {
  const data = _interopRequireDefault(require("lodash/values"));

  _values = function () {
    return data;
  };

  return data;
}

function _extend() {
  const data = _interopRequireDefault(require("lodash/extend"));

  _extend = function () {
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

const DONE = new WeakSet();

var _default = (0, _helperPluginUtils().declare)((api, opts) => {
  api.assertVersion(7);
  const {
    throwIfClosureRequired = false,
    tdz: tdzEnabled = false
  } = opts;

  if (typeof throwIfClosureRequired !== "boolean") {
    throw new Error(`.throwIfClosureRequired must be a boolean, or undefined`);
  }

  if (typeof tdzEnabled !== "boolean") {
    throw new Error(`.throwIfClosureRequired must be a boolean, or undefined`);
  }

  return {
    name: "transform-block-scoping",
    visitor: {
      VariableDeclaration(path) {
        const {
          node,
          parent,
          scope
        } = path;
        if (!isBlockScoped(node)) return;
        convertBlockScopedToVar(path, null, parent, scope, true);

        if (node._tdzThis) {
          const nodes = [node];

          for (let i = 0; i < node.declarations.length; i++) {
            const decl = node.declarations[i];

            if (decl.init) {
              const assign = _core().types.assignmentExpression("=", decl.id, decl.init);

              assign._ignoreBlockScopingTDZ = true;
              nodes.push(_core().types.expressionStatement(assign));
            }

            decl.init = this.addHelper("temporalUndefined");
          }

          node._blockHoist = 2;

          if (path.isCompletionRecord()) {
            nodes.push(_core().types.expressionStatement(scope.buildUndefinedNode()));
          }

          path.replaceWithMultiple(nodes);
        }
      },

      Loop(path, state) {
        const {
          parent,
          scope
        } = path;
        path.ensureBlock();
        const blockScoping = new BlockScoping(path, path.get("body"), parent, scope, throwIfClosureRequired, tdzEnabled, state);
        const replace = blockScoping.run();
        if (replace) path.replaceWith(replace);
      },

      CatchClause(path, state) {
        const {
          parent,
          scope
        } = path;
        const blockScoping = new BlockScoping(null, path.get("body"), parent, scope, throwIfClosureRequired, tdzEnabled, state);
        blockScoping.run();
      },

      "BlockStatement|SwitchStatement|Program"(path, state) {
        if (!ignoreBlock(path)) {
          const blockScoping = new BlockScoping(null, path, path.parent, path.scope, throwIfClosureRequired, tdzEnabled, state);
          blockScoping.run();
        }
      }

    }
  };
});

exports.default = _default;

function ignoreBlock(path) {
  return _core().types.isLoop(path.parent) || _core().types.isCatchClause(path.parent);
}

const buildRetCheck = (0, _core().template)(`
  if (typeof RETURN === "object") return RETURN.v;
`);

function isBlockScoped(node) {
  if (!_core().types.isVariableDeclaration(node)) return false;
  if (node[_core().types.BLOCK_SCOPED_SYMBOL]) return true;
  if (node.kind !== "let" && node.kind !== "const") return false;
  return true;
}

function isInLoop(path) {
  const loopOrFunctionParent = path.find(path => path.isLoop() || path.isFunction());
  return loopOrFunctionParent && loopOrFunctionParent.isLoop();
}

function convertBlockScopedToVar(path, node, parent, scope, moveBindingsToParent = false) {
  if (!node) {
    node = path.node;
  }

  if (isInLoop(path) && !_core().types.isFor(parent)) {
    for (let i = 0; i < node.declarations.length; i++) {
      const declar = node.declarations[i];
      declar.init = declar.init || scope.buildUndefinedNode();
    }
  }

  node[_core().types.BLOCK_SCOPED_SYMBOL] = true;
  node.kind = "var";

  if (moveBindingsToParent) {
    const parentScope = scope.getFunctionParent() || scope.getProgramParent();

    for (const name of Object.keys(path.getBindingIdentifiers())) {
      const binding = scope.getOwnBinding(name);
      if (binding) binding.kind = "var";
      scope.moveBindingTo(name, parentScope);
    }
  }
}

function isVar(node) {
  return _core().types.isVariableDeclaration(node, {
    kind: "var"
  }) && !isBlockScoped(node);
}

const letReferenceBlockVisitor = _core().traverse.visitors.merge([{
  Loop: {
    enter(path, state) {
      state.loopDepth++;
    },

    exit(path, state) {
      state.loopDepth--;
    }

  },

  Function(path, state) {
    if (state.loopDepth > 0) {
      path.traverse(letReferenceFunctionVisitor, state);
    }

    return path.skip();
  }

}, _tdz.visitor]);

const letReferenceFunctionVisitor = _core().traverse.visitors.merge([{
  ReferencedIdentifier(path, state) {
    const ref = state.letReferences[path.node.name];
    if (!ref) return;
    const localBinding = path.scope.getBindingIdentifier(path.node.name);
    if (localBinding && localBinding !== ref) return;
    state.closurify = true;
  }

}, _tdz.visitor]);

const hoistVarDeclarationsVisitor = {
  enter(path, self) {
    const {
      node,
      parent
    } = path;

    if (path.isForStatement()) {
      if (isVar(node.init, node)) {
        const nodes = self.pushDeclar(node.init);

        if (nodes.length === 1) {
          node.init = nodes[0];
        } else {
          node.init = _core().types.sequenceExpression(nodes);
        }
      }
    } else if (path.isFor()) {
      if (isVar(node.left, node)) {
        self.pushDeclar(node.left);
        node.left = node.left.declarations[0].id;
      }
    } else if (isVar(node, parent)) {
      path.replaceWithMultiple(self.pushDeclar(node).map(expr => _core().types.expressionStatement(expr)));
    } else if (path.isFunction()) {
      return path.skip();
    }
  }

};
const loopLabelVisitor = {
  LabeledStatement({
    node
  }, state) {
    state.innerLabels.push(node.label.name);
  }

};
const continuationVisitor = {
  enter(path, state) {
    if (path.isAssignmentExpression() || path.isUpdateExpression()) {
      for (const name of Object.keys(path.getBindingIdentifiers())) {
        if (state.outsideReferences[name] !== path.scope.getBindingIdentifier(name)) {
          continue;
        }

        state.reassignments[name] = true;
      }
    } else if (path.isReturnStatement()) {
      state.returnStatements.push(path);
    }
  }

};

function loopNodeTo(node) {
  if (_core().types.isBreakStatement(node)) {
    return "break";
  } else if (_core().types.isContinueStatement(node)) {
    return "continue";
  }
}

const loopVisitor = {
  Loop(path, state) {
    const oldIgnoreLabeless = state.ignoreLabeless;
    state.ignoreLabeless = true;
    path.traverse(loopVisitor, state);
    state.ignoreLabeless = oldIgnoreLabeless;
    path.skip();
  },

  Function(path) {
    path.skip();
  },

  SwitchCase(path, state) {
    const oldInSwitchCase = state.inSwitchCase;
    state.inSwitchCase = true;
    path.traverse(loopVisitor, state);
    state.inSwitchCase = oldInSwitchCase;
    path.skip();
  },

  "BreakStatement|ContinueStatement|ReturnStatement"(path, state) {
    const {
      node,
      scope
    } = path;
    if (node[this.LOOP_IGNORE]) return;
    let replace;
    let loopText = loopNodeTo(node);

    if (loopText) {
      if (node.label) {
        if (state.innerLabels.indexOf(node.label.name) >= 0) {
          return;
        }

        loopText = `${loopText}|${node.label.name}`;
      } else {
        if (state.ignoreLabeless) return;
        if (_core().types.isBreakStatement(node) && state.inSwitchCase) return;
      }

      state.hasBreakContinue = true;
      state.map[loopText] = node;
      replace = _core().types.stringLiteral(loopText);
    }

    if (path.isReturnStatement()) {
      state.hasReturn = true;
      replace = _core().types.objectExpression([_core().types.objectProperty(_core().types.identifier("v"), node.argument || scope.buildUndefinedNode())]);
    }

    if (replace) {
      replace = _core().types.returnStatement(replace);
      replace[this.LOOP_IGNORE] = true;
      path.skip();
      path.replaceWith(_core().types.inherits(replace, node));
    }
  }

};

class BlockScoping {
  constructor(loopPath, blockPath, parent, scope, throwIfClosureRequired, tdzEnabled, state) {
    this.parent = parent;
    this.scope = scope;
    this.state = state;
    this.throwIfClosureRequired = throwIfClosureRequired;
    this.tdzEnabled = tdzEnabled;
    this.blockPath = blockPath;
    this.block = blockPath.node;
    this.outsideLetReferences = Object.create(null);
    this.hasLetReferences = false;
    this.letReferences = Object.create(null);
    this.body = [];

    if (loopPath) {
      this.loopParent = loopPath.parent;
      this.loopLabel = _core().types.isLabeledStatement(this.loopParent) && this.loopParent.label;
      this.loopPath = loopPath;
      this.loop = loopPath.node;
    }
  }

  run() {
    const block = this.block;
    if (DONE.has(block)) return;
    DONE.add(block);
    const needsClosure = this.getLetReferences();
    this.checkConstants();

    if (_core().types.isFunction(this.parent) || _core().types.isProgram(this.block)) {
      this.updateScopeInfo();
      return;
    }

    if (!this.hasLetReferences) return;

    if (needsClosure) {
      this.wrapClosure();
    } else {
      this.remap();
    }

    this.updateScopeInfo(needsClosure);

    if (this.loopLabel && !_core().types.isLabeledStatement(this.loopParent)) {
      return _core().types.labeledStatement(this.loopLabel, this.loop);
    }
  }

  checkConstants() {
    const scope = this.scope;
    const state = this.state;

    for (const name of Object.keys(scope.bindings)) {
      const binding = scope.bindings[name];
      if (binding.kind !== "const") continue;

      for (const violation of binding.constantViolations) {
        const readOnlyError = state.addHelper("readOnlyError");

        const throwNode = _core().types.callExpression(readOnlyError, [_core().types.stringLiteral(name)]);

        if (violation.isAssignmentExpression()) {
          violation.get("right").replaceWith(_core().types.sequenceExpression([throwNode, violation.get("right").node]));
        } else if (violation.isUpdateExpression()) {
          violation.replaceWith(_core().types.sequenceExpression([throwNode, violation.node]));
        } else if (violation.isForXStatement()) {
          violation.ensureBlock();
          violation.node.body.body.unshift(_core().types.expressionStatement(throwNode));
        }
      }
    }
  }

  updateScopeInfo(wrappedInClosure) {
    const scope = this.scope;
    const parentScope = scope.getFunctionParent() || scope.getProgramParent();
    const letRefs = this.letReferences;

    for (const key of Object.keys(letRefs)) {
      const ref = letRefs[key];
      const binding = scope.getBinding(ref.name);
      if (!binding) continue;

      if (binding.kind === "let" || binding.kind === "const") {
        binding.kind = "var";

        if (wrappedInClosure) {
          scope.removeBinding(ref.name);
        } else {
          scope.moveBindingTo(ref.name, parentScope);
        }
      }
    }
  }

  remap() {
    const letRefs = this.letReferences;
    const outsideLetRefs = this.outsideLetReferences;
    const scope = this.scope;
    const blockPathScope = this.blockPath.scope;

    for (const key of Object.keys(letRefs)) {
      const ref = letRefs[key];

      if (scope.parentHasBinding(key) || scope.hasGlobal(key)) {
        if (scope.hasOwnBinding(key)) {
          scope.rename(ref.name);
        }

        if (blockPathScope.hasOwnBinding(key)) {
          blockPathScope.rename(ref.name);
        }
      }
    }

    for (const key of Object.keys(outsideLetRefs)) {
      const ref = letRefs[key];

      if (isInLoop(this.blockPath) && blockPathScope.hasOwnBinding(key)) {
        blockPathScope.rename(ref.name);
      }
    }
  }

  wrapClosure() {
    if (this.throwIfClosureRequired) {
      throw this.blockPath.buildCodeFrameError("Compiling let/const in this block would add a closure " + "(throwIfClosureRequired).");
    }

    const block = this.block;
    const outsideRefs = this.outsideLetReferences;

    if (this.loop) {
      for (const name of Object.keys(outsideRefs)) {
        const id = outsideRefs[name];

        if (this.scope.hasGlobal(id.name) || this.scope.parentHasBinding(id.name)) {
          delete outsideRefs[id.name];
          delete this.letReferences[id.name];
          this.scope.rename(id.name);
          this.letReferences[id.name] = id;
          outsideRefs[id.name] = id;
        }
      }
    }

    this.has = this.checkLoop();
    this.hoistVarDeclarations();
    const args = (0, _values().default)(outsideRefs).map(id => _core().types.cloneNode(id));
    const params = args.map(id => _core().types.cloneNode(id));
    const isSwitch = this.blockPath.isSwitchStatement();

    const fn = _core().types.functionExpression(null, params, _core().types.blockStatement(isSwitch ? [block] : block.body));

    this.addContinuations(fn);

    let call = _core().types.callExpression(_core().types.nullLiteral(), args);

    let basePath = ".callee";

    const hasYield = _core().traverse.hasType(fn.body, "YieldExpression", _core().types.FUNCTION_TYPES);

    if (hasYield) {
      fn.generator = true;
      call = _core().types.yieldExpression(call, true);
      basePath = ".argument" + basePath;
    }

    const hasAsync = _core().traverse.hasType(fn.body, "AwaitExpression", _core().types.FUNCTION_TYPES);

    if (hasAsync) {
      fn.async = true;
      call = _core().types.awaitExpression(call);
      basePath = ".argument" + basePath;
    }

    let placeholderPath;
    let index;

    if (this.has.hasReturn || this.has.hasBreakContinue) {
      const ret = this.scope.generateUid("ret");
      this.body.push(_core().types.variableDeclaration("var", [_core().types.variableDeclarator(_core().types.identifier(ret), call)]));
      placeholderPath = "declarations.0.init" + basePath;
      index = this.body.length - 1;
      this.buildHas(ret);
    } else {
      this.body.push(_core().types.expressionStatement(call));
      placeholderPath = "expression" + basePath;
      index = this.body.length - 1;
    }

    let callPath;

    if (isSwitch) {
      const {
        parentPath,
        listKey,
        key
      } = this.blockPath;
      this.blockPath.replaceWithMultiple(this.body);
      callPath = parentPath.get(listKey)[key + index];
    } else {
      block.body = this.body;
      callPath = this.blockPath.get("body")[index];
    }

    const placeholder = callPath.get(placeholderPath);
    let fnPath;

    if (this.loop) {
      const loopId = this.scope.generateUid("loop");
      const p = this.loopPath.insertBefore(_core().types.variableDeclaration("var", [_core().types.variableDeclarator(_core().types.identifier(loopId), fn)]));
      placeholder.replaceWith(_core().types.identifier(loopId));
      fnPath = p[0].get("declarations.0.init");
    } else {
      placeholder.replaceWith(fn);
      fnPath = placeholder;
    }

    fnPath.unwrapFunctionEnvironment();
  }

  addContinuations(fn) {
    const state = {
      reassignments: {},
      returnStatements: [],
      outsideReferences: this.outsideLetReferences
    };
    this.scope.traverse(fn, continuationVisitor, state);

    for (let i = 0; i < fn.params.length; i++) {
      const param = fn.params[i];
      if (!state.reassignments[param.name]) continue;
      const paramName = param.name;
      const newParamName = this.scope.generateUid(param.name);
      fn.params[i] = _core().types.identifier(newParamName);
      this.scope.rename(paramName, newParamName, fn);
      state.returnStatements.forEach(returnStatement => {
        returnStatement.insertBefore(_core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.identifier(paramName), _core().types.identifier(newParamName))));
      });
      fn.body.body.push(_core().types.expressionStatement(_core().types.assignmentExpression("=", _core().types.identifier(paramName), _core().types.identifier(newParamName))));
    }
  }

  getLetReferences() {
    const block = this.block;
    let declarators = [];

    if (this.loop) {
      const init = this.loop.left || this.loop.init;

      if (isBlockScoped(init)) {
        declarators.push(init);
        (0, _extend().default)(this.outsideLetReferences, _core().types.getBindingIdentifiers(init));
      }
    }

    const addDeclarationsFromChild = (path, node) => {
      node = node || path.node;

      if (_core().types.isClassDeclaration(node) || _core().types.isFunctionDeclaration(node) || isBlockScoped(node)) {
        if (isBlockScoped(node)) {
          convertBlockScopedToVar(path, node, block, this.scope);
        }

        declarators = declarators.concat(node.declarations || node);
      }

      if (_core().types.isLabeledStatement(node)) {
        addDeclarationsFromChild(path.get("body"), node.body);
      }
    };

    if (block.body) {
      const declarPaths = this.blockPath.get("body");

      for (let i = 0; i < block.body.length; i++) {
        addDeclarationsFromChild(declarPaths[i]);
      }
    }

    if (block.cases) {
      const declarPaths = this.blockPath.get("cases");

      for (let i = 0; i < block.cases.length; i++) {
        const consequents = block.cases[i].consequent;

        for (let j = 0; j < consequents.length; j++) {
          const declar = consequents[j];
          addDeclarationsFromChild(declarPaths[i], declar);
        }
      }
    }

    for (let i = 0; i < declarators.length; i++) {
      const declar = declarators[i];

      const keys = _core().types.getBindingIdentifiers(declar, false, true);

      (0, _extend().default)(this.letReferences, keys);
      this.hasLetReferences = true;
    }

    if (!this.hasLetReferences) return;
    const state = {
      letReferences: this.letReferences,
      closurify: false,
      loopDepth: 0,
      tdzEnabled: this.tdzEnabled,
      addHelper: name => this.addHelper(name)
    };

    if (isInLoop(this.blockPath)) {
      state.loopDepth++;
    }

    this.blockPath.traverse(letReferenceBlockVisitor, state);
    return state.closurify;
  }

  checkLoop() {
    const state = {
      hasBreakContinue: false,
      ignoreLabeless: false,
      inSwitchCase: false,
      innerLabels: [],
      hasReturn: false,
      isLoop: !!this.loop,
      map: {},
      LOOP_IGNORE: Symbol()
    };
    this.blockPath.traverse(loopLabelVisitor, state);
    this.blockPath.traverse(loopVisitor, state);
    return state;
  }

  hoistVarDeclarations() {
    this.blockPath.traverse(hoistVarDeclarationsVisitor, this);
  }

  pushDeclar(node) {
    const declars = [];

    const names = _core().types.getBindingIdentifiers(node);

    for (const name of Object.keys(names)) {
      declars.push(_core().types.variableDeclarator(names[name]));
    }

    this.body.push(_core().types.variableDeclaration(node.kind, declars));
    const replace = [];

    for (let i = 0; i < node.declarations.length; i++) {
      const declar = node.declarations[i];
      if (!declar.init) continue;

      const expr = _core().types.assignmentExpression("=", _core().types.cloneNode(declar.id), _core().types.cloneNode(declar.init));

      replace.push(_core().types.inherits(expr, declar));
    }

    return replace;
  }

  buildHas(ret) {
    const body = this.body;
    let retCheck;
    const has = this.has;
    const cases = [];

    if (has.hasReturn) {
      retCheck = buildRetCheck({
        RETURN: _core().types.identifier(ret)
      });
    }

    if (has.hasBreakContinue) {
      for (const key of Object.keys(has.map)) {
        cases.push(_core().types.switchCase(_core().types.stringLiteral(key), [has.map[key]]));
      }

      if (has.hasReturn) {
        cases.push(_core().types.switchCase(null, [retCheck]));
      }

      if (cases.length === 1) {
        const single = cases[0];
        body.push(_core().types.ifStatement(_core().types.binaryExpression("===", _core().types.identifier(ret), single.test), single.consequent[0]));
      } else {
        if (this.loop) {
          for (let i = 0; i < cases.length; i++) {
            const caseConsequent = cases[i].consequent[0];

            if (_core().types.isBreakStatement(caseConsequent) && !caseConsequent.label) {
              if (!this.loopLabel) {
                this.loopLabel = this.scope.generateUidIdentifier("loop");
              }

              caseConsequent.label = _core().types.cloneNode(this.loopLabel);
            }
          }
        }

        body.push(_core().types.switchStatement(_core().types.identifier(ret), cases));
      }
    } else {
      if (has.hasReturn) {
        body.push(retCheck);
      }
    }
  }

}