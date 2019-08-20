"use strict";

exports.__esModule = true;

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _create = require("babel-runtime/core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _getIterator2 = require("babel-runtime/core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _symbol = require("babel-runtime/core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

exports.default = function () {
  var REASSIGN_REMAP_SKIP = (0, _symbol2.default)();

  var reassignmentVisitor = {
    ReferencedIdentifier: function ReferencedIdentifier(path) {
      var name = path.node.name;
      var remap = this.remaps[name];
      if (!remap) return;

      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      var replacement = t.cloneDeep(remap);

      replacement.loc = path.node.loc;

      if (path.parentPath.isCallExpression({ callee: path.node })) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), replacement]));
      } else if (path.isJSXIdentifier() && t.isMemberExpression(replacement)) {
        var object = replacement.object,
            property = replacement.property;

        path.replaceWith(t.JSXMemberExpression(t.JSXIdentifier(object.name), t.JSXIdentifier(property.name)));
      } else {
        path.replaceWith(replacement);
      }
      this.requeueInParent(path);
    },
    AssignmentExpression: function AssignmentExpression(path) {
      var node = path.node;
      if (node[REASSIGN_REMAP_SKIP]) return;

      var left = path.get("left");
      if (left.isIdentifier()) {
        var name = left.node.name;
        var exports = this.exports[name];
        if (!exports) return;

        if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

        node[REASSIGN_REMAP_SKIP] = true;

        for (var _iterator = exports, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : (0, _getIterator3.default)(_iterator);;) {
          var _ref;

          if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
          } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
          }

          var reid = _ref;

          node = buildExportsAssignment(reid, node).expression;
        }

        path.replaceWith(node);
        this.requeueInParent(path);
      } else if (left.isObjectPattern()) {
        for (var _iterator2 = left.node.properties, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : (0, _getIterator3.default)(_iterator2);;) {
          var _ref2;

          if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
          } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
          }

          var property = _ref2;

          var _name = property.value.name;

          var _exports = this.exports[_name];
          if (!_exports) continue;

          if (this.scope.getBinding(_name) !== path.scope.getBinding(_name)) return;

          node[REASSIGN_REMAP_SKIP] = true;

          path.insertAfter(buildExportsAssignment(t.identifier(_name), t.identifier(_name)));
        }
      } else if (left.isArrayPattern()) {
        for (var _iterator3 = left.node.elements, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : (0, _getIterator3.default)(_iterator3);;) {
          var _ref3;

          if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
          } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
          }

          var element = _ref3;

          if (!element) continue;
          var _name2 = element.name;

          var _exports2 = this.exports[_name2];
          if (!_exports2) continue;

          if (this.scope.getBinding(_name2) !== path.scope.getBinding(_name2)) return;

          node[REASSIGN_REMAP_SKIP] = true;

          path.insertAfter(buildExportsAssignment(t.identifier(_name2), t.identifier(_name2)));
        }
      }
    },
    UpdateExpression: function UpdateExpression(path) {
      var arg = path.get("argument");
      if (!arg.isIdentifier()) return;

      var name = arg.node.name;
      var exports = this.exports[name];
      if (!exports) return;

      if (this.scope.getBinding(name) !== path.scope.getBinding(name)) return;

      var node = t.assignmentExpression(path.node.operator[0] + "=", arg.node, t.numericLiteral(1));

      if (path.parentPath.isExpressionStatement() && !path.isCompletionRecord() || path.node.prefix) {
        path.replaceWith(node);
        this.requeueInParent(path);
        return;
      }

      var nodes = [];
      nodes.push(node);

      var operator = void 0;
      if (path.node.operator === "--") {
        operator = "+";
      } else {
        operator = "-";
      }
      nodes.push(t.binaryExpression(operator, arg.node, t.numericLiteral(1)));

      path.replaceWithMultiple(t.sequenceExpression(nodes));
    }
  };

  return {
    inherits: _babelPluginTransformStrictMode2.default,

    visitor: {
      ThisExpression: function ThisExpression(path, state) {
        if (this.ranCommonJS) return;

        if (state.opts.allowTopLevelThis !== true && !path.findParent(function (path) {
          return !path.is("shadow") && THIS_BREAK_KEYS.indexOf(path.type) >= 0;
        })) {
          path.replaceWith(t.identifier("undefined"));
        }
      },


      Program: {
        exit: function exit(path) {
          this.ranCommonJS = true;

          var strict = !!this.opts.strict;
          var noInterop = !!this.opts.noInterop;

          var scope = path.scope;

          scope.rename("module");
          scope.rename("exports");
          scope.rename("require");

          var hasExports = false;
          var hasImports = false;

          var body = path.get("body");
          var imports = (0, _create2.default)(null);
          var exports = (0, _create2.default)(null);

          var nonHoistedExportNames = (0, _create2.default)(null);

          var topNodes = [];
          var remaps = (0, _create2.default)(null);

          var requires = (0, _create2.default)(null);

          function addRequire(source, blockHoist) {
            var cached = requires[source];
            if (cached) return cached;

            var ref = path.scope.generateUidIdentifier((0, _path2.basename)(source, (0, _path2.extname)(source)));

            var varDecl = t.variableDeclaration("var", [t.variableDeclarator(ref, buildRequire(t.stringLiteral(source)).expression)]);

            if (imports[source]) {
              varDecl.loc = imports[source].loc;
            }

            if (typeof blockHoist === "number" && blockHoist > 0) {
              varDecl._blockHoist = blockHoist;
            }

            topNodes.push(varDecl);

            return requires[source] = ref;
          }

          function addTo(obj, key, arr) {
            var existing = obj[key] || [];
            obj[key] = existing.concat(arr);
          }

          for (var _iterator4 = body, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : (0, _getIterator3.default)(_iterator4);;) {
            var _ref4;

            if (_isArray4) {
              if (_i4 >= _iterator4.length) break;
              _ref4 = _iterator4[_i4++];
            } else {
              _i4 = _iterator4.next();
              if (_i4.done) break;
              _ref4 = _i4.value;
            }

            var _path = _ref4;

            if (_path.isExportDeclaration()) {
              hasExports = true;

              var specifiers = [].concat(_path.get("declaration"), _path.get("specifiers"));
              for (var _iterator6 = specifiers, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : (0, _getIterator3.default)(_iterator6);;) {
                var _ref6;

                if (_isArray6) {
                  if (_i6 >= _iterator6.length) break;
                  _ref6 = _iterator6[_i6++];
                } else {
                  _i6 = _iterator6.next();
                  if (_i6.done) break;
                  _ref6 = _i6.value;
                }

                var _specifier2 = _ref6;

                var ids = _specifier2.getBindingIdentifiers();
                if (ids.__esModule) {
                  throw _specifier2.buildCodeFrameError("Illegal export \"__esModule\"");
                }
              }
            }

            if (_path.isImportDeclaration()) {
              var _importsEntry$specifi;

              hasImports = true;

              var key = _path.node.source.value;
              var importsEntry = imports[key] || {
                specifiers: [],
                maxBlockHoist: 0,
                loc: _path.node.loc
              };

              (_importsEntry$specifi = importsEntry.specifiers).push.apply(_importsEntry$specifi, _path.node.specifiers);

              if (typeof _path.node._blockHoist === "number") {
                importsEntry.maxBlockHoist = Math.max(_path.node._blockHoist, importsEntry.maxBlockHoist);
              }

              imports[key] = importsEntry;

              _path.remove();
            } else if (_path.isExportDefaultDeclaration()) {
              var declaration = _path.get("declaration");
              if (declaration.isFunctionDeclaration()) {
                var id = declaration.node.id;
                var defNode = t.identifier("default");
                if (id) {
                  addTo(exports, id.name, defNode);
                  topNodes.push(buildExportsAssignment(defNode, id));
                  _path.replaceWith(declaration.node);
                } else {
                  topNodes.push(buildExportsAssignment(defNode, t.toExpression(declaration.node)));
                  _path.remove();
                }
              } else if (declaration.isClassDeclaration()) {
                var _id = declaration.node.id;
                var _defNode = t.identifier("default");
                if (_id) {
                  addTo(exports, _id.name, _defNode);
                  _path.replaceWithMultiple([declaration.node, buildExportsAssignment(_defNode, _id)]);
                } else {
                  _path.replaceWith(buildExportsAssignment(_defNode, t.toExpression(declaration.node)));

                  _path.parentPath.requeue(_path.get("expression.left"));
                }
              } else {
                _path.replaceWith(buildExportsAssignment(t.identifier("default"), declaration.node));

                _path.parentPath.requeue(_path.get("expression.left"));
              }
            } else if (_path.isExportNamedDeclaration()) {
              var _declaration = _path.get("declaration");
              if (_declaration.node) {
                if (_declaration.isFunctionDeclaration()) {
                  var _id2 = _declaration.node.id;
                  addTo(exports, _id2.name, _id2);
                  topNodes.push(buildExportsAssignment(_id2, _id2));
                  _path.replaceWith(_declaration.node);
                } else if (_declaration.isClassDeclaration()) {
                  var _id3 = _declaration.node.id;
                  addTo(exports, _id3.name, _id3);
                  _path.replaceWithMultiple([_declaration.node, buildExportsAssignment(_id3, _id3)]);
                  nonHoistedExportNames[_id3.name] = true;
                } else if (_declaration.isVariableDeclaration()) {
                  var declarators = _declaration.get("declarations");
                  for (var _iterator7 = declarators, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : (0, _getIterator3.default)(_iterator7);;) {
                    var _ref7;

                    if (_isArray7) {
                      if (_i7 >= _iterator7.length) break;
                      _ref7 = _iterator7[_i7++];
                    } else {
                      _i7 = _iterator7.next();
                      if (_i7.done) break;
                      _ref7 = _i7.value;
                    }

                    var decl = _ref7;

                    var _id4 = decl.get("id");

                    var init = decl.get("init");
                    var exportsToInsert = [];
                    if (!init.node) init.replaceWith(t.identifier("undefined"));

                    if (_id4.isIdentifier()) {
                      addTo(exports, _id4.node.name, _id4.node);
                      init.replaceWith(buildExportsAssignment(_id4.node, init.node).expression);
                      nonHoistedExportNames[_id4.node.name] = true;
                    } else if (_id4.isObjectPattern()) {
                      for (var _i8 = 0; _i8 < _id4.node.properties.length; _i8++) {
                        var prop = _id4.node.properties[_i8];
                        var propValue = prop.value;
                        if (t.isAssignmentPattern(propValue)) {
                          propValue = propValue.left;
                        } else if (t.isRestProperty(prop)) {
                          propValue = prop.argument;
                        }
                        addTo(exports, propValue.name, propValue);
                        exportsToInsert.push(buildExportsAssignment(propValue, propValue));
                        nonHoistedExportNames[propValue.name] = true;
                      }
                    } else if (_id4.isArrayPattern() && _id4.node.elements) {
                      for (var _i9 = 0; _i9 < _id4.node.elements.length; _i9++) {
                        var elem = _id4.node.elements[_i9];
                        if (!elem) continue;
                        if (t.isAssignmentPattern(elem)) {
                          elem = elem.left;
                        } else if (t.isRestElement(elem)) {
                          elem = elem.argument;
                        }
                        var name = elem.name;
                        addTo(exports, name, elem);
                        exportsToInsert.push(buildExportsAssignment(elem, elem));
                        nonHoistedExportNames[name] = true;
                      }
                    }
                    _path.insertAfter(exportsToInsert);
                  }
                  _path.replaceWith(_declaration.node);
                }
                continue;
              }

              var _specifiers = _path.get("specifiers");
              var nodes = [];
              var _source = _path.node.source;
              if (_source) {
                var ref = addRequire(_source.value, _path.node._blockHoist);

                for (var _iterator8 = _specifiers, _isArray8 = Array.isArray(_iterator8), _i10 = 0, _iterator8 = _isArray8 ? _iterator8 : (0, _getIterator3.default)(_iterator8);;) {
                  var _ref8;

                  if (_isArray8) {
                    if (_i10 >= _iterator8.length) break;
                    _ref8 = _iterator8[_i10++];
                  } else {
                    _i10 = _iterator8.next();
                    if (_i10.done) break;
                    _ref8 = _i10.value;
                  }

                  var _specifier3 = _ref8;

                  if (_specifier3.isExportNamespaceSpecifier()) {} else if (_specifier3.isExportDefaultSpecifier()) {} else if (_specifier3.isExportSpecifier()) {
                    if (!noInterop && _specifier3.node.local.name === "default") {
                      topNodes.push(buildExportsFrom(t.stringLiteral(_specifier3.node.exported.name), t.memberExpression(t.callExpression(this.addHelper("interopRequireDefault"), [ref]), _specifier3.node.local)));
                    } else {
                      topNodes.push(buildExportsFrom(t.stringLiteral(_specifier3.node.exported.name), t.memberExpression(ref, _specifier3.node.local)));
                    }
                    nonHoistedExportNames[_specifier3.node.exported.name] = true;
                  }
                }
              } else {
                for (var _iterator9 = _specifiers, _isArray9 = Array.isArray(_iterator9), _i11 = 0, _iterator9 = _isArray9 ? _iterator9 : (0, _getIterator3.default)(_iterator9);;) {
                  var _ref9;

                  if (_isArray9) {
                    if (_i11 >= _iterator9.length) break;
                    _ref9 = _iterator9[_i11++];
                  } else {
                    _i11 = _iterator9.next();
                    if (_i11.done) break;
                    _ref9 = _i11.value;
                  }

                  var _specifier4 = _ref9;

                  if (_specifier4.isExportSpecifier()) {
                    addTo(exports, _specifier4.node.local.name, _specifier4.node.exported);
                    nonHoistedExportNames[_specifier4.node.exported.name] = true;
                    nodes.push(buildExportsAssignment(_specifier4.node.exported, _specifier4.node.local));
                  }
                }
              }
              _path.replaceWithMultiple(nodes);
            } else if (_path.isExportAllDeclaration()) {
              var exportNode = buildExportAll({
                OBJECT: addRequire(_path.node.source.value, _path.node._blockHoist)
              });
              exportNode.loc = _path.node.loc;
              topNodes.push(exportNode);
              _path.remove();
            }
          }

          for (var source in imports) {
            var _imports$source = imports[source],
                specifiers = _imports$source.specifiers,
                maxBlockHoist = _imports$source.maxBlockHoist;

            if (specifiers.length) {
              var uid = addRequire(source, maxBlockHoist);

              var wildcard = void 0;

              for (var i = 0; i < specifiers.length; i++) {
                var specifier = specifiers[i];
                if (t.isImportNamespaceSpecifier(specifier)) {
                  if (strict || noInterop) {
                    remaps[specifier.local.name] = uid;
                  } else {
                    var varDecl = t.variableDeclaration("var", [t.variableDeclarator(specifier.local, t.callExpression(this.addHelper("interopRequireWildcard"), [uid]))]);

                    if (maxBlockHoist > 0) {
                      varDecl._blockHoist = maxBlockHoist;
                    }

                    topNodes.push(varDecl);
                  }
                  wildcard = specifier.local;
                } else if (t.isImportDefaultSpecifier(specifier)) {
                  specifiers[i] = t.importSpecifier(specifier.local, t.identifier("default"));
                }
              }

              for (var _iterator5 = specifiers, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : (0, _getIterator3.default)(_iterator5);;) {
                var _ref5;

                if (_isArray5) {
                  if (_i5 >= _iterator5.length) break;
                  _ref5 = _iterator5[_i5++];
                } else {
                  _i5 = _iterator5.next();
                  if (_i5.done) break;
                  _ref5 = _i5.value;
                }

                var _specifier = _ref5;

                if (t.isImportSpecifier(_specifier)) {
                  var target = uid;
                  if (_specifier.imported.name === "default") {
                    if (wildcard) {
                      target = wildcard;
                    } else if (!noInterop) {
                      target = wildcard = path.scope.generateUidIdentifier(uid.name);
                      var _varDecl = t.variableDeclaration("var", [t.variableDeclarator(target, t.callExpression(this.addHelper("interopRequireDefault"), [uid]))]);

                      if (maxBlockHoist > 0) {
                        _varDecl._blockHoist = maxBlockHoist;
                      }

                      topNodes.push(_varDecl);
                    }
                  }
                  remaps[_specifier.local.name] = t.memberExpression(t.cloneWithoutLoc(target), t.cloneWithoutLoc(_specifier.imported));
                }
              }
            } else {
              var requireNode = buildRequire(t.stringLiteral(source));
              requireNode.loc = imports[source].loc;
              topNodes.push(requireNode);
            }
          }

          if (hasImports && (0, _keys2.default)(nonHoistedExportNames).length) {
            var maxHoistedExportsNodeAssignmentLength = 100;
            var nonHoistedExportNamesArr = (0, _keys2.default)(nonHoistedExportNames);

            var _loop = function _loop(currentExportsNodeAssignmentLength) {
              var nonHoistedExportNamesChunk = nonHoistedExportNamesArr.slice(currentExportsNodeAssignmentLength, currentExportsNodeAssignmentLength + maxHoistedExportsNodeAssignmentLength);

              var hoistedExportsNode = t.identifier("undefined");

              nonHoistedExportNamesChunk.forEach(function (name) {
                hoistedExportsNode = buildExportsAssignment(t.identifier(name), hoistedExportsNode).expression;
              });

              var node = t.expressionStatement(hoistedExportsNode);
              node._blockHoist = 3;

              topNodes.unshift(node);
            };

            for (var currentExportsNodeAssignmentLength = 0; currentExportsNodeAssignmentLength < nonHoistedExportNamesArr.length; currentExportsNodeAssignmentLength += maxHoistedExportsNodeAssignmentLength) {
              _loop(currentExportsNodeAssignmentLength);
            }
          }

          if (hasExports && !strict) {
            var buildTemplate = buildExportsModuleDeclaration;
            if (this.opts.loose) buildTemplate = buildLooseExportsModuleDeclaration;

            var declar = buildTemplate();
            declar._blockHoist = 3;

            topNodes.unshift(declar);
          }

          path.unshiftContainer("body", topNodes);
          path.traverse(reassignmentVisitor, {
            remaps: remaps,
            scope: scope,
            exports: exports,
            requeueInParent: function requeueInParent(newPath) {
              return path.requeue(newPath);
            }
          });
        }
      }
    }
  };
};

var _path2 = require("path");

var _babelTemplate = require("babel-template");

var _babelTemplate2 = _interopRequireDefault(_babelTemplate);

var _babelPluginTransformStrictMode = require("babel-plugin-transform-strict-mode");

var _babelPluginTransformStrictMode2 = _interopRequireDefault(_babelPluginTransformStrictMode);

var _babelTypes = require("babel-types");

var t = _interopRequireWildcard(_babelTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildRequire = (0, _babelTemplate2.default)("\n  require($0);\n");

var buildExportsModuleDeclaration = (0, _babelTemplate2.default)("\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n");

var buildExportsFrom = (0, _babelTemplate2.default)("\n  Object.defineProperty(exports, $0, {\n    enumerable: true,\n    get: function () {\n      return $1;\n    }\n  });\n");

var buildLooseExportsModuleDeclaration = (0, _babelTemplate2.default)("\n  exports.__esModule = true;\n");

var buildExportsAssignment = (0, _babelTemplate2.default)("\n  exports.$0 = $1;\n");

var buildExportAll = (0, _babelTemplate2.default)("\n  Object.keys(OBJECT).forEach(function (key) {\n    if (key === \"default\" || key === \"__esModule\") return;\n    Object.defineProperty(exports, key, {\n      enumerable: true,\n      get: function () {\n        return OBJECT[key];\n      }\n    });\n  });\n");

var THIS_BREAK_KEYS = ["FunctionExpression", "FunctionDeclaration", "ClassProperty", "ClassMethod", "ObjectMethod"];

module.exports = exports["default"];