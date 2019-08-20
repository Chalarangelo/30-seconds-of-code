"use strict";

function replaceArray(t, path) {
  var node = path.node;
  // arguments is taken :(

  var constructorArgs = path.get("arguments");
  if (t.isIdentifier(node.callee, { name: "Array" }) && !path.scope.getBinding("Array")) {
    if (constructorArgs.length === 0) {
      // Array() -> []
      path.replaceWith(t.arrayExpression([]));
    } else if (constructorArgs.length === 1) {
      var arg = constructorArgs[0];
      var result = arg.evaluate();

      if (result.confident) {
        if (typeof result.value === "number") {
          if (result.value >= 0 && result.value <= 6 && result.value % 1 === 0) {
            // "Array(7)" is shorter than "[,,,,,,,]"
            path.replaceWith(t.arrayExpression(Array(result.value).fill(null)));
          } else {
            dropNewIfPresent();
          }
        } else {
          // Array("Asdf"), Array(true), Array(false)
          path.replaceWith(t.arrayExpression([t.valueToNode(result.value)]));
        }
      } else {
        var transformables = ["ArrayExpression", "ObjectExpression", "FunctionExpression", "ArrowFunctionExpression", "ClassExpression"];
        if (transformables.indexOf(arg.node.type) !== -1) {
          // Array([]), Array({})
          // Array(()=>{}), Array(class{}), Array(function(){})
          path.replaceWith(t.arrayExpression([arg.node]));
        } else {
          // Array(x); Array(a.b);
          dropNewIfPresent();
        }
      }
    } else {
      // Array(2,3), Array(a,b) => [2,3], [a,b]
      path.replaceWith(t.arrayExpression(node.arguments));
    }
    return true;
  }

  function dropNewIfPresent() {
    if (path.isNewExpression()) {
      path.replaceWith(t.callExpression(node.callee, node.arguments));
    }
  }
}

function replaceObject(t, path) {
  var node = path.node;

  if (t.isIdentifier(node.callee, { name: "Object" }) && !path.scope.getBinding("Object")) {
    var isVoid0 = require("babel-helper-is-void-0")(t);
    var arg = node.arguments[0];
    var binding = arg && t.isIdentifier(arg) && path.scope.getBinding(arg.name);

    // Object() -> {}
    if (node.arguments.length === 0) {
      path.replaceWith(t.objectExpression([]));

      // Object([]) -> []
    } else if (arg.type === "ArrayExpression" || t.isFunctionExpression(arg)) {
      path.replaceWith(arg);

      // Object(null) -> {}
    } else if (isVoid0(arg) || arg.name === "undefined" || arg.type === "NullLiteral" || arg.type === "ObjectExpression" && arg.properties.length === 0) {
      path.replaceWith(t.objectExpression([]));

      // Object(localFn) -> localFn
    } else if (binding && binding.path.isFunction()) {
      path.replaceWith(arg);

      // Object({a:b}) -> {a:b}
    } else if (arg.type === "ObjectExpression") {
      path.replaceWith(arg);

      // new Object(a) -> Object(a)
    } else if (node.type === "NewExpression") {
      path.replaceWith(t.callExpression(node.callee, node.arguments));
    }
    return true;
  }
}

function defaults() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$boolean = _ref.boolean,
      boolean = _ref$boolean === undefined ? true : _ref$boolean,
      _ref$number = _ref.number,
      number = _ref$number === undefined ? true : _ref$number,
      _ref$string = _ref.string,
      string = _ref$string === undefined ? true : _ref$string,
      _ref$array = _ref.array,
      array = _ref$array === undefined ? true : _ref$array,
      _ref$object = _ref.object,
      object = _ref$object === undefined ? true : _ref$object;

  return {
    boolean,
    number,
    string,
    array,
    object
  };
}

module.exports = function (_ref2) {
  var t = _ref2.types;

  return {
    name: "minify-type-constructors",
    visitor: {
      CallExpression(path) {
        var node = path.node;

        var opts = defaults(this.opts);

        // Boolean(foo) -> !!foo
        if (opts.boolean && t.isIdentifier(node.callee, { name: "Boolean" }) && node.arguments.length === 1 && !path.scope.getBinding("Boolean")) {
          path.replaceWith(t.unaryExpression("!", t.unaryExpression("!", node.arguments[0], true), true));
          return;
        }

        // Number(foo) -> +foo
        if (opts.number && t.isIdentifier(node.callee, { name: "Number" }) && node.arguments.length === 1 && !path.scope.getBinding("Number")) {
          path.replaceWith(t.unaryExpression("+", node.arguments[0], true));
          return;
        }

        // String(foo) -> foo + ''
        if (opts.string && t.isIdentifier(node.callee, { name: "String" }) && node.arguments.length === 1 && !path.scope.getBinding("String")) {
          path.replaceWith(t.binaryExpression("+", node.arguments[0], t.stringLiteral("")));
          return;
        }

        // Array() -> []
        if (opts.array && replaceArray(t, path)) {
          return;
        }

        // Object() -> {}
        if (opts.object && replaceObject(t, path)) {
          return;
        }
      },
      NewExpression(path) {
        var opts = defaults(this.opts);

        // new Array() -> []
        if (opts.array && replaceArray(t, path)) {
          return;
        }

        // new Object() -> {}
        if (opts.object && replaceObject(t, path)) {
          return;
        }
      }
    }
  };
};