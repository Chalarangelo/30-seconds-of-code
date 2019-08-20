"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.evaluateTruthy = evaluateTruthy;
exports.evaluate = evaluate;
const VALID_CALLEES = ["String", "Number", "Math"];
const INVALID_METHODS = ["random"];

function evaluateTruthy() {
  const res = this.evaluate();
  if (res.confident) return !!res.value;
}

function deopt(path, state) {
  if (!state.confident) return;
  state.deoptPath = path;
  state.confident = false;
}

function evaluateCached(path, state) {
  const {
    node
  } = path;
  const {
    seen
  } = state;

  if (seen.has(node)) {
    const existing = seen.get(node);

    if (existing.resolved) {
      return existing.value;
    } else {
      deopt(path, state);
      return;
    }
  } else {
    const item = {
      resolved: false
    };
    seen.set(node, item);

    const val = _evaluate(path, state);

    if (state.confident) {
      item.resolved = true;
      item.value = val;
    }

    return val;
  }
}

function _evaluate(path, state) {
  if (!state.confident) return;
  const {
    node
  } = path;

  if (path.isSequenceExpression()) {
    const exprs = path.get("expressions");
    return evaluateCached(exprs[exprs.length - 1], state);
  }

  if (path.isStringLiteral() || path.isNumericLiteral() || path.isBooleanLiteral()) {
    return node.value;
  }

  if (path.isNullLiteral()) {
    return null;
  }

  if (path.isTemplateLiteral()) {
    return evaluateQuasis(path, node.quasis, state);
  }

  if (path.isTaggedTemplateExpression() && path.get("tag").isMemberExpression()) {
    const object = path.get("tag.object");
    const {
      node: {
        name
      }
    } = object;
    const property = path.get("tag.property");

    if (object.isIdentifier() && name === "String" && !path.scope.getBinding(name, true) && property.isIdentifier && property.node.name === "raw") {
      return evaluateQuasis(path, node.quasi.quasis, state, true);
    }
  }

  if (path.isConditionalExpression()) {
    const testResult = evaluateCached(path.get("test"), state);
    if (!state.confident) return;

    if (testResult) {
      return evaluateCached(path.get("consequent"), state);
    } else {
      return evaluateCached(path.get("alternate"), state);
    }
  }

  if (path.isExpressionWrapper()) {
    return evaluateCached(path.get("expression"), state);
  }

  if (path.isMemberExpression() && !path.parentPath.isCallExpression({
    callee: node
  })) {
    const property = path.get("property");
    const object = path.get("object");

    if (object.isLiteral() && property.isIdentifier()) {
      const value = object.node.value;
      const type = typeof value;

      if (type === "number" || type === "string") {
        return value[property.node.name];
      }
    }
  }

  if (path.isReferencedIdentifier()) {
    const binding = path.scope.getBinding(node.name);

    if (binding && binding.constantViolations.length > 0) {
      return deopt(binding.path, state);
    }

    if (binding && path.node.start < binding.path.node.end) {
      return deopt(binding.path, state);
    }

    if (binding && binding.hasValue) {
      return binding.value;
    } else {
      if (node.name === "undefined") {
        return binding ? deopt(binding.path, state) : undefined;
      } else if (node.name === "Infinity") {
        return binding ? deopt(binding.path, state) : Infinity;
      } else if (node.name === "NaN") {
        return binding ? deopt(binding.path, state) : NaN;
      }

      const resolved = path.resolve();

      if (resolved === path) {
        return deopt(path, state);
      } else {
        return evaluateCached(resolved, state);
      }
    }
  }

  if (path.isUnaryExpression({
    prefix: true
  })) {
    if (node.operator === "void") {
      return undefined;
    }

    const argument = path.get("argument");

    if (node.operator === "typeof" && (argument.isFunction() || argument.isClass())) {
      return "function";
    }

    const arg = evaluateCached(argument, state);
    if (!state.confident) return;

    switch (node.operator) {
      case "!":
        return !arg;

      case "+":
        return +arg;

      case "-":
        return -arg;

      case "~":
        return ~arg;

      case "typeof":
        return typeof arg;
    }
  }

  if (path.isArrayExpression()) {
    const arr = [];
    const elems = path.get("elements");

    for (const elem of elems) {
      const elemValue = elem.evaluate();

      if (elemValue.confident) {
        arr.push(elemValue.value);
      } else {
        return deopt(elem, state);
      }
    }

    return arr;
  }

  if (path.isObjectExpression()) {
    const obj = {};
    const props = path.get("properties");

    for (const prop of props) {
      if (prop.isObjectMethod() || prop.isSpreadElement()) {
        return deopt(prop, state);
      }

      const keyPath = prop.get("key");
      let key = keyPath;

      if (prop.node.computed) {
        key = key.evaluate();

        if (!key.confident) {
          return deopt(keyPath, state);
        }

        key = key.value;
      } else if (key.isIdentifier()) {
        key = key.node.name;
      } else {
        key = key.node.value;
      }

      const valuePath = prop.get("value");
      let value = valuePath.evaluate();

      if (!value.confident) {
        return deopt(valuePath, state);
      }

      value = value.value;
      obj[key] = value;
    }

    return obj;
  }

  if (path.isLogicalExpression()) {
    const wasConfident = state.confident;
    const left = evaluateCached(path.get("left"), state);
    const leftConfident = state.confident;
    state.confident = wasConfident;
    const right = evaluateCached(path.get("right"), state);
    const rightConfident = state.confident;

    switch (node.operator) {
      case "||":
        state.confident = leftConfident && (!!left || rightConfident);
        if (!state.confident) return;
        return left || right;

      case "&&":
        state.confident = leftConfident && (!left || rightConfident);
        if (!state.confident) return;
        return left && right;
    }
  }

  if (path.isBinaryExpression()) {
    const left = evaluateCached(path.get("left"), state);
    if (!state.confident) return;
    const right = evaluateCached(path.get("right"), state);
    if (!state.confident) return;

    switch (node.operator) {
      case "-":
        return left - right;

      case "+":
        return left + right;

      case "/":
        return left / right;

      case "*":
        return left * right;

      case "%":
        return left % right;

      case "**":
        return Math.pow(left, right);

      case "<":
        return left < right;

      case ">":
        return left > right;

      case "<=":
        return left <= right;

      case ">=":
        return left >= right;

      case "==":
        return left == right;

      case "!=":
        return left != right;

      case "===":
        return left === right;

      case "!==":
        return left !== right;

      case "|":
        return left | right;

      case "&":
        return left & right;

      case "^":
        return left ^ right;

      case "<<":
        return left << right;

      case ">>":
        return left >> right;

      case ">>>":
        return left >>> right;
    }
  }

  if (path.isCallExpression()) {
    const callee = path.get("callee");
    let context;
    let func;

    if (callee.isIdentifier() && !path.scope.getBinding(callee.node.name, true) && VALID_CALLEES.indexOf(callee.node.name) >= 0) {
      func = global[node.callee.name];
    }

    if (callee.isMemberExpression()) {
      const object = callee.get("object");
      const property = callee.get("property");

      if (object.isIdentifier() && property.isIdentifier() && VALID_CALLEES.indexOf(object.node.name) >= 0 && INVALID_METHODS.indexOf(property.node.name) < 0) {
        context = global[object.node.name];
        func = context[property.node.name];
      }

      if (object.isLiteral() && property.isIdentifier()) {
        const type = typeof object.node.value;

        if (type === "string" || type === "number") {
          context = object.node.value;
          func = context[property.node.name];
        }
      }
    }

    if (func) {
      const args = path.get("arguments").map(arg => evaluateCached(arg, state));
      if (!state.confident) return;
      return func.apply(context, args);
    }
  }

  deopt(path, state);
}

function evaluateQuasis(path, quasis, state, raw = false) {
  let str = "";
  let i = 0;
  const exprs = path.get("expressions");

  for (const elem of quasis) {
    if (!state.confident) break;
    str += raw ? elem.value.raw : elem.value.cooked;
    const expr = exprs[i++];
    if (expr) str += String(evaluateCached(expr, state));
  }

  if (!state.confident) return;
  return str;
}

function evaluate() {
  const state = {
    confident: true,
    deoptPath: null,
    seen: new Map()
  };
  let value = evaluateCached(this, state);
  if (!state.confident) value = undefined;
  return {
    confident: state.confident,
    deopt: state.deoptPath,
    value: value
  };
}