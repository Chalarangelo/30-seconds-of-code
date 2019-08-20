"use strict";

exports.__esModule = true;

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

exports.default = function (_ref) {
  var t = _ref.types;

  function hasRestProperty(path) {
    var foundRestProperty = false;
    path.traverse({
      RestProperty: function RestProperty() {
        foundRestProperty = true;
        path.stop();
      }
    });
    return foundRestProperty;
  }

  function hasSpread(node) {
    for (var _iterator = node.properties, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var prop = _ref2;

      if (t.isSpreadProperty(prop)) {
        return true;
      }
    }
    return false;
  }

  function createObjectSpread(file, props, objRef) {
    var restProperty = props.pop();

    var keys = [];
    for (var _iterator2 = props, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
      var _ref3;

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break;
        _ref3 = _iterator2[_i2++];
      } else {
        _i2 = _iterator2.next();
        if (_i2.done) break;
        _ref3 = _i2.value;
      }

      var prop = _ref3;

      var key = prop.key;
      if (t.isIdentifier(key) && !prop.computed) {
        key = t.stringLiteral(prop.key.name);
      }
      keys.push(key);
    }

    return [restProperty.argument, t.callExpression(file.addHelper("objectWithoutProperties"), [objRef, t.arrayExpression(keys)])];
  }

  function replaceRestProperty(parentPath, paramPath, i, numParams) {
    if (paramPath.isAssignmentPattern()) {
      replaceRestProperty(parentPath, paramPath.get("left"), i, numParams);
      return;
    }

    if (paramPath.isObjectPattern() && hasRestProperty(paramPath)) {
      var uid = parentPath.scope.generateUidIdentifier("ref");

      var declar = t.variableDeclaration("let", [t.variableDeclarator(paramPath.node, uid)]);
      declar._blockHoist = i ? numParams - i : 1;

      parentPath.ensureBlock();
      parentPath.get("body").unshiftContainer("body", declar);
      paramPath.replaceWith(uid);
    }
  }

  return {
    inherits: require("babel-plugin-syntax-object-rest-spread"),

    visitor: {
      Function: function Function(path) {
        var params = path.get("params");
        for (var i = 0; i < params.length; i++) {
          replaceRestProperty(params[i].parentPath, params[i], i, params.length);
        }
      },
      VariableDeclarator: function VariableDeclarator(path, file) {
        if (!path.get("id").isObjectPattern()) {
          return;
        }

        var insertionPath = path;

        path.get("id").traverse({
          RestProperty: function RestProperty(path) {
            if (this.originalPath.node.id.properties.length > 1 && !t.isIdentifier(this.originalPath.node.init)) {
              var initRef = path.scope.generateUidIdentifierBasedOnNode(this.originalPath.node.init, "ref");

              this.originalPath.insertBefore(t.variableDeclarator(initRef, this.originalPath.node.init));

              this.originalPath.replaceWith(t.variableDeclarator(this.originalPath.node.id, initRef));

              return;
            }

            var ref = this.originalPath.node.init;
            var refPropertyPath = [];

            path.findParent(function (path) {
              if (path.isObjectProperty()) {
                refPropertyPath.unshift(path.node.key.name);
              } else if (path.isVariableDeclarator()) {
                return true;
              }
            });

            if (refPropertyPath.length) {
              refPropertyPath.forEach(function (prop) {
                ref = t.memberExpression(ref, t.identifier(prop));
              });
            }

            var _createObjectSpread = createObjectSpread(file, path.parentPath.node.properties, ref),
                argument = _createObjectSpread[0],
                callExpression = _createObjectSpread[1];

            insertionPath.insertAfter(t.variableDeclarator(argument, callExpression));

            insertionPath = insertionPath.getSibling(insertionPath.key + 1);

            if (path.parentPath.node.properties.length === 0) {
              path.findParent(function (path) {
                return path.isObjectProperty() || path.isVariableDeclarator();
              }).remove();
            }
          }
        }, {
          originalPath: path
        });
      },
      ExportNamedDeclaration: function ExportNamedDeclaration(path) {
        var declaration = path.get("declaration");
        if (!declaration.isVariableDeclaration()) return;
        if (!hasRestProperty(declaration)) return;

        var specifiers = [];

        for (var name in path.getOuterBindingIdentifiers(path)) {
          var id = t.identifier(name);
          specifiers.push(t.exportSpecifier(id, id));
        }

        path.replaceWith(declaration.node);
        path.insertAfter(t.exportNamedDeclaration(null, specifiers));
      },
      CatchClause: function CatchClause(path) {
        var paramPath = path.get("param");
        replaceRestProperty(paramPath.parentPath, paramPath);
      },
      AssignmentExpression: function AssignmentExpression(path, file) {
        var leftPath = path.get("left");
        if (leftPath.isObjectPattern() && hasRestProperty(leftPath)) {
          var nodes = [];

          var ref = void 0;
          if (path.isCompletionRecord() || path.parentPath.isExpressionStatement()) {
            ref = path.scope.generateUidIdentifierBasedOnNode(path.node.right, "ref");

            nodes.push(t.variableDeclaration("var", [t.variableDeclarator(ref, path.node.right)]));
          }

          var _createObjectSpread2 = createObjectSpread(file, path.node.left.properties, ref),
              argument = _createObjectSpread2[0],
              callExpression = _createObjectSpread2[1];

          var nodeWithoutSpread = t.clone(path.node);
          nodeWithoutSpread.right = ref;
          nodes.push(t.expressionStatement(nodeWithoutSpread));
          nodes.push(t.toStatement(t.assignmentExpression("=", argument, callExpression)));

          if (ref) {
            nodes.push(t.expressionStatement(ref));
          }

          path.replaceWithMultiple(nodes);
        }
      },
      ForXStatement: function ForXStatement(path) {
        var node = path.node,
            scope = path.scope;

        var leftPath = path.get("left");
        var left = node.left;

        if (t.isObjectPattern(left) && hasRestProperty(leftPath)) {
          var temp = scope.generateUidIdentifier("ref");

          node.left = t.variableDeclaration("var", [t.variableDeclarator(temp)]);

          path.ensureBlock();

          node.body.body.unshift(t.variableDeclaration("var", [t.variableDeclarator(left, temp)]));

          return;
        }

        if (!t.isVariableDeclaration(left)) return;

        var pattern = left.declarations[0].id;
        if (!t.isObjectPattern(pattern)) return;

        var key = scope.generateUidIdentifier("ref");
        node.left = t.variableDeclaration(left.kind, [t.variableDeclarator(key, null)]);

        path.ensureBlock();

        node.body.body.unshift(t.variableDeclaration(node.left.kind, [t.variableDeclarator(pattern, key)]));
      },
      ObjectExpression: function ObjectExpression(path, file) {
        if (!hasSpread(path.node)) return;

        var useBuiltIns = file.opts.useBuiltIns || false;
        if (typeof useBuiltIns !== "boolean") {
          throw new Error("transform-object-rest-spread currently only accepts a boolean " + "option for useBuiltIns (defaults to false)");
        }

        var args = [];
        var props = [];

        function push() {
          if (!props.length) return;
          args.push(t.objectExpression(props));
          props = [];
        }

        for (var _iterator3 = path.node.properties, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
          var _ref4;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref4 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref4 = _i3.value;
          }

          var prop = _ref4;

          if (t.isSpreadProperty(prop)) {
            push();
            args.push(prop.argument);
          } else {
            props.push(prop);
          }
        }

        push();

        if (!t.isObjectExpression(args[0])) {
          args.unshift(t.objectExpression([]));
        }

        var helper = useBuiltIns ? t.memberExpression(t.identifier("Object"), t.identifier("assign")) : file.addHelper("extends");

        path.replaceWith(t.callExpression(helper, args));
      }
    }
  };
};

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports["default"];