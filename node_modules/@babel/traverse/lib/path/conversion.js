"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toComputedKey = toComputedKey;
exports.ensureBlock = ensureBlock;
exports.arrowFunctionToShadowed = arrowFunctionToShadowed;
exports.unwrapFunctionEnvironment = unwrapFunctionEnvironment;
exports.arrowFunctionToExpression = arrowFunctionToExpression;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _helperFunctionName() {
  const data = _interopRequireDefault(require("@babel/helper-function-name"));

  _helperFunctionName = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function toComputedKey() {
  const node = this.node;
  let key;

  if (this.isMemberExpression()) {
    key = node.property;
  } else if (this.isProperty() || this.isMethod()) {
    key = node.key;
  } else {
    throw new ReferenceError("todo");
  }

  if (!node.computed) {
    if (t().isIdentifier(key)) key = t().stringLiteral(key.name);
  }

  return key;
}

function ensureBlock() {
  const body = this.get("body");
  const bodyNode = body.node;

  if (Array.isArray(body)) {
    throw new Error("Can't convert array path to a block statement");
  }

  if (!bodyNode) {
    throw new Error("Can't convert node without a body");
  }

  if (body.isBlockStatement()) {
    return bodyNode;
  }

  const statements = [];
  let stringPath = "body";
  let key;
  let listKey;

  if (body.isStatement()) {
    listKey = "body";
    key = 0;
    statements.push(body.node);
  } else {
    stringPath += ".body.0";

    if (this.isFunction()) {
      key = "argument";
      statements.push(t().returnStatement(body.node));
    } else {
      key = "expression";
      statements.push(t().expressionStatement(body.node));
    }
  }

  this.node.body = t().blockStatement(statements);
  const parentPath = this.get(stringPath);
  body.setup(parentPath, listKey ? parentPath.node[listKey] : parentPath.node, listKey, key);
  return this.node;
}

function arrowFunctionToShadowed() {
  if (!this.isArrowFunctionExpression()) return;
  this.arrowFunctionToExpression();
}

function unwrapFunctionEnvironment() {
  if (!this.isArrowFunctionExpression() && !this.isFunctionExpression() && !this.isFunctionDeclaration()) {
    throw this.buildCodeFrameError("Can only unwrap the environment of a function.");
  }

  hoistFunctionEnvironment(this);
}

function arrowFunctionToExpression({
  allowInsertArrow = true,
  specCompliant = false
} = {}) {
  if (!this.isArrowFunctionExpression()) {
    throw this.buildCodeFrameError("Cannot convert non-arrow function to a function expression.");
  }

  const thisBinding = hoistFunctionEnvironment(this, specCompliant, allowInsertArrow);
  this.ensureBlock();
  this.node.type = "FunctionExpression";

  if (specCompliant) {
    const checkBinding = thisBinding ? null : this.parentPath.scope.generateUidIdentifier("arrowCheckId");

    if (checkBinding) {
      this.parentPath.scope.push({
        id: checkBinding,
        init: t().objectExpression([])
      });
    }

    this.get("body").unshiftContainer("body", t().expressionStatement(t().callExpression(this.hub.addHelper("newArrowCheck"), [t().thisExpression(), checkBinding ? t().identifier(checkBinding.name) : t().identifier(thisBinding)])));
    this.replaceWith(t().callExpression(t().memberExpression((0, _helperFunctionName().default)(this, true) || this.node, t().identifier("bind")), [checkBinding ? t().identifier(checkBinding.name) : t().thisExpression()]));
  }
}

function hoistFunctionEnvironment(fnPath, specCompliant = false, allowInsertArrow = true) {
  const thisEnvFn = fnPath.findParent(p => {
    return p.isFunction() && !p.isArrowFunctionExpression() || p.isProgram() || p.isClassProperty({
      static: false
    });
  });
  const inConstructor = thisEnvFn && thisEnvFn.node.kind === "constructor";

  if (thisEnvFn.isClassProperty()) {
    throw fnPath.buildCodeFrameError("Unable to transform arrow inside class property");
  }

  const {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  } = getScopeInformation(fnPath);

  if (inConstructor && superCalls.length > 0) {
    if (!allowInsertArrow) {
      throw superCalls[0].buildCodeFrameError("Unable to handle nested super() usage in arrow");
    }

    const allSuperCalls = [];
    thisEnvFn.traverse({
      Function(child) {
        if (child.isArrowFunctionExpression()) return;
        child.skip();
      },

      ClassProperty(child) {
        child.skip();
      },

      CallExpression(child) {
        if (!child.get("callee").isSuper()) return;
        allSuperCalls.push(child);
      }

    });
    const superBinding = getSuperBinding(thisEnvFn);
    allSuperCalls.forEach(superCall => {
      const callee = t().identifier(superBinding);
      callee.loc = superCall.node.callee.loc;
      superCall.get("callee").replaceWith(callee);
    });
  }

  let thisBinding;

  if (thisPaths.length > 0 || specCompliant) {
    thisBinding = getThisBinding(thisEnvFn, inConstructor);

    if (!specCompliant || inConstructor && hasSuperClass(thisEnvFn)) {
      thisPaths.forEach(thisChild => {
        const thisRef = thisChild.isJSX() ? t().jsxIdentifier(thisBinding) : t().identifier(thisBinding);
        thisRef.loc = thisChild.node.loc;
        thisChild.replaceWith(thisRef);
      });
      if (specCompliant) thisBinding = null;
    }
  }

  if (argumentsPaths.length > 0) {
    const argumentsBinding = getBinding(thisEnvFn, "arguments", () => t().identifier("arguments"));
    argumentsPaths.forEach(argumentsChild => {
      const argsRef = t().identifier(argumentsBinding);
      argsRef.loc = argumentsChild.node.loc;
      argumentsChild.replaceWith(argsRef);
    });
  }

  if (newTargetPaths.length > 0) {
    const newTargetBinding = getBinding(thisEnvFn, "newtarget", () => t().metaProperty(t().identifier("new"), t().identifier("target")));
    newTargetPaths.forEach(targetChild => {
      const targetRef = t().identifier(newTargetBinding);
      targetRef.loc = targetChild.node.loc;
      targetChild.replaceWith(targetRef);
    });
  }

  if (superProps.length > 0) {
    if (!allowInsertArrow) {
      throw superProps[0].buildCodeFrameError("Unable to handle nested super.prop usage");
    }

    const flatSuperProps = superProps.reduce((acc, superProp) => acc.concat(standardizeSuperProperty(superProp)), []);
    flatSuperProps.forEach(superProp => {
      const key = superProp.node.computed ? "" : superProp.get("property").node.name;

      if (superProp.parentPath.isCallExpression({
        callee: superProp.node
      })) {
        const superBinding = getSuperPropCallBinding(thisEnvFn, key);

        if (superProp.node.computed) {
          const prop = superProp.get("property").node;
          superProp.replaceWith(t().identifier(superBinding));
          superProp.parentPath.node.arguments.unshift(prop);
        } else {
          superProp.replaceWith(t().identifier(superBinding));
        }
      } else {
        const isAssignment = superProp.parentPath.isAssignmentExpression({
          left: superProp.node
        });
        const superBinding = getSuperPropBinding(thisEnvFn, isAssignment, key);
        const args = [];

        if (superProp.node.computed) {
          args.push(superProp.get("property").node);
        }

        if (isAssignment) {
          const value = superProp.parentPath.node.right;
          args.push(value);
          superProp.parentPath.replaceWith(t().callExpression(t().identifier(superBinding), args));
        } else {
          superProp.replaceWith(t().callExpression(t().identifier(superBinding), args));
        }
      }
    });
  }

  return thisBinding;
}

function standardizeSuperProperty(superProp) {
  if (superProp.parentPath.isAssignmentExpression() && superProp.parentPath.node.operator !== "=") {
    const assignmentPath = superProp.parentPath;
    const op = assignmentPath.node.operator.slice(0, -1);
    const value = assignmentPath.node.right;
    assignmentPath.node.operator = "=";

    if (superProp.node.computed) {
      const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
      assignmentPath.get("left").replaceWith(t().memberExpression(superProp.node.object, t().assignmentExpression("=", tmp, superProp.node.property), true));
      assignmentPath.get("right").replaceWith(t().binaryExpression(op, t().memberExpression(superProp.node.object, t().identifier(tmp.name), true), value));
    } else {
      assignmentPath.get("left").replaceWith(t().memberExpression(superProp.node.object, superProp.node.property));
      assignmentPath.get("right").replaceWith(t().binaryExpression(op, t().memberExpression(superProp.node.object, t().identifier(superProp.node.property.name)), value));
    }

    return [assignmentPath.get("left"), assignmentPath.get("right").get("left")];
  } else if (superProp.parentPath.isUpdateExpression()) {
    const updateExpr = superProp.parentPath;
    const tmp = superProp.scope.generateDeclaredUidIdentifier("tmp");
    const computedKey = superProp.node.computed ? superProp.scope.generateDeclaredUidIdentifier("prop") : null;
    const parts = [t().assignmentExpression("=", tmp, t().memberExpression(superProp.node.object, computedKey ? t().assignmentExpression("=", computedKey, superProp.node.property) : superProp.node.property, superProp.node.computed)), t().assignmentExpression("=", t().memberExpression(superProp.node.object, computedKey ? t().identifier(computedKey.name) : superProp.node.property, superProp.node.computed), t().binaryExpression("+", t().identifier(tmp.name), t().numericLiteral(1)))];

    if (!superProp.parentPath.node.prefix) {
      parts.push(t().identifier(tmp.name));
    }

    updateExpr.replaceWith(t().sequenceExpression(parts));
    const left = updateExpr.get("expressions.0.right");
    const right = updateExpr.get("expressions.1.left");
    return [left, right];
  }

  return [superProp];
}

function hasSuperClass(thisEnvFn) {
  return thisEnvFn.isClassMethod() && !!thisEnvFn.parentPath.parentPath.node.superClass;
}

function getThisBinding(thisEnvFn, inConstructor) {
  return getBinding(thisEnvFn, "this", thisBinding => {
    if (!inConstructor || !hasSuperClass(thisEnvFn)) return t().thisExpression();
    const supers = new WeakSet();
    thisEnvFn.traverse({
      Function(child) {
        if (child.isArrowFunctionExpression()) return;
        child.skip();
      },

      ClassProperty(child) {
        child.skip();
      },

      CallExpression(child) {
        if (!child.get("callee").isSuper()) return;
        if (supers.has(child.node)) return;
        supers.add(child.node);
        child.replaceWithMultiple([child.node, t().assignmentExpression("=", t().identifier(thisBinding), t().identifier("this"))]);
      }

    });
  });
}

function getSuperBinding(thisEnvFn) {
  return getBinding(thisEnvFn, "supercall", () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    return t().arrowFunctionExpression([t().restElement(argsBinding)], t().callExpression(t().super(), [t().spreadElement(t().identifier(argsBinding.name))]));
  });
}

function getSuperPropCallBinding(thisEnvFn, propName) {
  return getBinding(thisEnvFn, `superprop_call:${propName || ""}`, () => {
    const argsBinding = thisEnvFn.scope.generateUidIdentifier("args");
    const argsList = [t().restElement(argsBinding)];
    let fnBody;

    if (propName) {
      fnBody = t().callExpression(t().memberExpression(t().super(), t().identifier(propName)), [t().spreadElement(t().identifier(argsBinding.name))]);
    } else {
      const method = thisEnvFn.scope.generateUidIdentifier("prop");
      argsList.unshift(method);
      fnBody = t().callExpression(t().memberExpression(t().super(), t().identifier(method.name), true), [t().spreadElement(t().identifier(argsBinding.name))]);
    }

    return t().arrowFunctionExpression(argsList, fnBody);
  });
}

function getSuperPropBinding(thisEnvFn, isAssignment, propName) {
  const op = isAssignment ? "set" : "get";
  return getBinding(thisEnvFn, `superprop_${op}:${propName || ""}`, () => {
    const argsList = [];
    let fnBody;

    if (propName) {
      fnBody = t().memberExpression(t().super(), t().identifier(propName));
    } else {
      const method = thisEnvFn.scope.generateUidIdentifier("prop");
      argsList.unshift(method);
      fnBody = t().memberExpression(t().super(), t().identifier(method.name), true);
    }

    if (isAssignment) {
      const valueIdent = thisEnvFn.scope.generateUidIdentifier("value");
      argsList.push(valueIdent);
      fnBody = t().assignmentExpression("=", fnBody, t().identifier(valueIdent.name));
    }

    return t().arrowFunctionExpression(argsList, fnBody);
  });
}

function getBinding(thisEnvFn, key, init) {
  const cacheKey = "binding:" + key;
  let data = thisEnvFn.getData(cacheKey);

  if (!data) {
    const id = thisEnvFn.scope.generateUidIdentifier(key);
    data = id.name;
    thisEnvFn.setData(cacheKey, data);
    thisEnvFn.scope.push({
      id: id,
      init: init(data)
    });
  }

  return data;
}

function getScopeInformation(fnPath) {
  const thisPaths = [];
  const argumentsPaths = [];
  const newTargetPaths = [];
  const superProps = [];
  const superCalls = [];
  fnPath.traverse({
    ClassProperty(child) {
      child.skip();
    },

    Function(child) {
      if (child.isArrowFunctionExpression()) return;
      child.skip();
    },

    ThisExpression(child) {
      thisPaths.push(child);
    },

    JSXIdentifier(child) {
      if (child.node.name !== "this") return;

      if (!child.parentPath.isJSXMemberExpression({
        object: child.node
      }) && !child.parentPath.isJSXOpeningElement({
        name: child.node
      })) {
        return;
      }

      thisPaths.push(child);
    },

    CallExpression(child) {
      if (child.get("callee").isSuper()) superCalls.push(child);
    },

    MemberExpression(child) {
      if (child.get("object").isSuper()) superProps.push(child);
    },

    ReferencedIdentifier(child) {
      if (child.node.name !== "arguments") return;
      argumentsPaths.push(child);
    },

    MetaProperty(child) {
      if (!child.get("meta").isIdentifier({
        name: "new"
      })) return;
      if (!child.get("property").isIdentifier({
        name: "target"
      })) return;
      newTargetPaths.push(child);
    }

  });
  return {
    thisPaths,
    argumentsPaths,
    newTargetPaths,
    superProps,
    superCalls
  };
}