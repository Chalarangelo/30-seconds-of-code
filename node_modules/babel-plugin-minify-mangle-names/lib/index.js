"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Charset = require("./charset");
var ScopeTracker = require("./scope-tracker");
var isLabelIdentifier = require("./is-label-identifier");
var bfsTraverseCreator = require("./bfs-traverse");
var fixupVarScoping = require("./fixup-var-scoping");

var _require = require("babel-helper-mark-eval-scopes"),
    markEvalScopes = _require.markEvalScopes,
    isEvalScopesMarked = _require.isMarked,
    hasEval = _require.hasEval;

var newIssueUrl = "https://github.com/babel/minify/issues/new";

module.exports = function (babel) {
  var t = babel.types,
      traverse = babel.traverse;

  var bfsTraverse = bfsTraverseCreator(babel);
  var hop = Object.prototype.hasOwnProperty;

  var Mangler = function () {
    function Mangler(charset, program) {
      var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          _ref$exclude = _ref.exclude,
          exclude = _ref$exclude === undefined ? {} : _ref$exclude,
          _ref$keepFnName = _ref.keepFnName,
          keepFnName = _ref$keepFnName === undefined ? false : _ref$keepFnName,
          _ref$keepClassName = _ref.keepClassName,
          keepClassName = _ref$keepClassName === undefined ? false : _ref$keepClassName,
          _ref$eval = _ref.eval,
          _eval = _ref$eval === undefined ? false : _ref$eval,
          _ref$topLevel = _ref.topLevel,
          topLevel = _ref$topLevel === undefined ? false : _ref$topLevel;

      _classCallCheck(this, Mangler);

      this.charset = charset;
      this.program = program;

      // user passed options
      this.exclude = toObject(exclude);
      this.keepFnName = keepFnName;
      this.keepClassName = keepClassName;
      this.topLevel = topLevel;
      this.eval = _eval;

      // tracking
      this.visitedScopes = new Set();
      this.scopeTracker = new ScopeTracker();
      this.renamedNodes = new Set();
    }

    /**
     * Run the mangler
     */


    _createClass(Mangler, [{
      key: "run",
      value: function run() {
        this.crawlScope();
        this.collect();
        this.fixup();
        this.charset.sort();
        this.mangle();
      }

      /**
       * Tells if a variable name is excluded
       * @param {String} name
       */

    }, {
      key: "isExcluded",
      value: function isExcluded(name) {
        return hop.call(this.exclude, name) && this.exclude[name];
      }

      /**
       * Clears traverse cache and recrawls the AST
       *
       * to recompute the bindings, references, other scope information
       * and paths because the other transformations in the same pipeline
       * (other plugins and presets) changes the AST and does NOT update
       * the scope objects
       */

    }, {
      key: "crawlScope",
      value: function crawlScope() {
        (traverse.clearCache || traverse.cache.clear)();
        this.program.scope.crawl();
      }

      /**
       * Re-crawling comes with a side-effect that let->var conversion
       * reverts the update of the binding information (block to fn scope).
       * This function takes care of it by updating it again.
       *
       * TODO: This is unnecessary work and needs to be fixed in babel.
       * https://github.com/babel/babel/issues/4818
       *
       * When this is removed, remember to remove fixup's dependency in
       * ScopeTracker
       */

    }, {
      key: "fixup",
      value: function fixup() {
        fixupVarScoping(this);
      }

      /**
       * A single pass through the AST to collect info for
       *
       * 1. Scope Tracker
       * 2. Unsafe Scopes (direct eval scopes)
       * 3. Charset considerations for better gzip compression
       *
       * Traversed in the same fashion(BFS) the mangling is done
       */

    }, {
      key: "collect",
      value: function collect() {
        var mangler = this;
        var scopeTracker = mangler.scopeTracker;


        scopeTracker.addScope(this.program.scope);

        /**
         * Same usage as in DCE, whichever runs first
         */

        if (!isEvalScopesMarked(mangler.program)) {
          markEvalScopes(mangler.program);
        }

        /**
         * The visitors to be used in traversal.
         *
         * Note: BFS traversal supports only the `enter` handlers, `exit`
         * handlers are simply dropped without Errors
         *
         * Collects items defined in the ScopeTracker
         */
        var collectVisitor = {
          Scopable(_ref2) {
            var scope = _ref2.scope;

            scopeTracker.addScope(scope);

            // Collect bindings defined in the scope
            Object.keys(scope.bindings).forEach(function (name) {
              scopeTracker.addBinding(scope.bindings[name]);
            });
          },
          /**
           * This is necessary because, in Babel, the scope.references
           * does NOT contain the references in that scope. Only the program
           * scope (top most level) contains all the references.
           *
           * We collect the references in a fashion where all the scopes between
           * and including the referenced scope and scope where it is declared
           * is considered as scope referencing that identifier
           */
          ReferencedIdentifier(path) {
            if (isLabelIdentifier(path)) return;
            var scope = path.scope,
                name = path.node.name;

            var binding = scope.getBinding(name);
            if (!binding) {
              // Do not collect globals as they are already available via
              // babel's API
              if (scope.hasGlobal(name)) return;
              // This should NOT happen ultimately. Panic if this code block is
              // reached
              throw new Error(`Binding not found for ReferencedIdentifier "${name}" ` + `present in "${path.parentPath.type}". ` + `Please report this at ${newIssueUrl}`);
            } else {
              // Add it to our scope tracker if everything is fine
              scopeTracker.addReference(scope, binding, name);
            }
          },

          /**
           * This is useful to detect binding ids and add them to the
           * scopeTracker's bindings
           *
           * TODO:
           *
           * This visitor is probably unnecessary. It was added to capture the
           * bindings that was not present in scope.bindings. But, now, it looks
           * like the unit and smoke tests pass without this.
           */
          BindingIdentifier(path) {
            if (isLabelIdentifier(path)) return;

            var scope = path.scope,
                name = path.node.name;

            var binding = scope.getBinding(name);

            /**
             * We have already captured the bindings when traversing through
             * Scopables, if a binding identifier doesn't have a binding, it
             * probably means that another transformation created a new binding,
             * refer https://github.com/babel/minify/issues/549 for example -
             * binding created by plugin transform-es2015-function-name
             *
             * So we just don't care about bindings that do not exist
             *
             * TODO:
             *
             * this deopts in DCE as this name can be removed for this particular
             * case (es2015-function-name)
             */
            if (!binding) return;

            /**
             * Detect constant violations
             *
             * If it's a constant violation, then add the Identifier Path as
             * a Reference instead of Binding - This is because the ScopeTracker
             * tracks these Re-declaration and mutation of variables as References
             * as it is simple to rename them
             */
            if (binding.identifier === path.node) {
              scopeTracker.addBinding(binding);
            } else {
              // constant violation
              scopeTracker.addReference(scope, binding, name);
            }
          }
        };

        /**
         * These visitors are for collecting the Characters used in the program
         * to measure the frequency and generate variable names for mangling so
         * as to improve the gzip compression - as gzip likes repetition
         */
        if (this.charset.shouldConsider) {
          collectVisitor.Identifier = function Identifer(path) {
            var node = path.node;

            // We don't mangle properties, so we collect them as they contribute
            // to the frequency of characters

            if (path.parentPath.isMemberExpression({ property: node }) || path.parentPath.isObjectProperty({ key: node })) {
              mangler.charset.consider(node.name);
            }
          };
          collectVisitor.Literal = function Literal(_ref3) {
            var node = _ref3.node;

            mangler.charset.consider(String(node.value));
          };
        }

        // Traverse the AST
        bfsTraverse(mangler.program, collectVisitor);
      }

      /**
       * Tells if a binding is exported as a NamedExport - so as to NOT mangle
       *
       * Babel treats NamedExports as a binding referenced by this NamedExport decl
       * @param {Binding} binding
       */

    }, {
      key: "isExportedWithName",
      value: function isExportedWithName(binding) {
        // short circuit
        if (!this.topLevel) {
          return false;
        }

        var refs = binding.referencePaths;

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = refs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var ref = _step.value;

            if (ref.isExportNamedDeclaration()) {
              return true;
            }
          }

          // default
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return false;
      }

      /**
       * Mangle the scope
       * @param {Scope} scope
       */

    }, {
      key: "mangleScope",
      value: function mangleScope(scope) {
        var mangler = this;
        var scopeTracker = mangler.scopeTracker;

        // Unsafe Scope

        if (!mangler.eval && hasEval(scope)) return;

        // Already visited
        // This is because for a function, in Babel, the function and
        // the function body's BlockStatement has the same scope, and will
        // be visited twice by the Scopable handler, and we want to mangle
        // it only once
        if (mangler.visitedScopes.has(scope)) return;
        mangler.visitedScopes.add(scope);

        // Helpers to generate names
        var i = 0;
        function getNext() {
          return mangler.charset.getIdentifier(i++);
        }
        function resetNext() {
          i = 0;
        }

        var bindings = scopeTracker.bindings.get(scope);
        var names = [].concat(_toConsumableArray(bindings.keys()));

        /**
         * 1. Iterate through the list of BindingIdentifiers
         * 2. Rename each of them in-place
         * 3. Update the scope tree.
         */
        for (var _i = 0; _i < names.length; _i++) {
          var oldName = names[_i];
          var binding = bindings.get(oldName);

          // Names which should NOT be mangled
          if (
          // arguments - for non-strict mode
          oldName === "arguments" ||
          // labels
          binding.path.isLabeledStatement() ||
          // ClassDeclaration has binding in two scopes
          //   1. The scope in which it is declared
          //   2. The class's own scope
          binding.path.isClassDeclaration() && binding.path === scope.path ||
          // excluded
          mangler.isExcluded(oldName) || (
          // function names
          mangler.keepFnName ? isFunction(binding.path) : false) || (
          // class names
          mangler.keepClassName ? isClass(binding.path) : false) ||
          // named export
          mangler.isExportedWithName(binding)) {
            continue;
          }

          var next = void 0;
          do {
            next = getNext();
          } while (!t.isValidIdentifier(next) || scopeTracker.hasBinding(scope, next) || scope.hasGlobal(next) || scopeTracker.hasReference(scope, next) || !scopeTracker.canUseInReferencedScopes(binding, next));

          // Reset so variables which are removed can be reused
          resetNext();

          // Once we detected a valid `next` Identifier which could be used,
          // call the renamer
          mangler.rename(scope, binding, oldName, next);
        }
      }

      /**
       * The mangle function that traverses through all the Scopes in a BFS
       * fashion - calls mangleScope
       */

    }, {
      key: "mangle",
      value: function mangle() {
        var mangler = this;

        bfsTraverse(this.program, {
          Scopable(path) {
            if (!path.isProgram() || mangler.topLevel) mangler.mangleScope(path.scope);
          }
        });
      }

      /**
       * Given a NodePath, collects all the Identifiers which are BindingIdentifiers
       * and replaces them with the new name
       *
       * For example,
       *   var a = 1, { b } = c; // a and b are BindingIdentifiers
       *
       * @param {NodePath} path
       * @param {String} oldName
       * @param {String} newName
       * @param {Function} predicate
       */

    }, {
      key: "renameBindingIds",
      value: function renameBindingIds(path, oldName, newName) {
        var predicate = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : function () {
          return true;
        };

        var bindingIds = path.getBindingIdentifierPaths(true, false);
        for (var name in bindingIds) {
          if (name !== oldName) continue;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = bindingIds[name][Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var idPath = _step2.value;

              if (predicate(idPath)) {
                this.renamedNodes.add(idPath.node);
                idPath.replaceWith(t.identifier(newName));
                this.renamedNodes.add(idPath.node);
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2.return) {
                _iterator2.return();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }

      /**
       * The Renamer:
       * Renames the following for one Binding in a Scope
       *
       * 1. Binding in that Scope
       * 2. All the Binding's constant violations
       * 3. All its References
       * 4. Updates mangler.scopeTracker
       * 5. Updates Babel's Scope tracking
       *
       * @param {Scope} scope
       * @param {Binding} binding
       * @param {String} oldName
       * @param {String} newName
       */

    }, {
      key: "rename",
      value: function rename(scope, binding, oldName, newName) {
        var mangler = this;
        var scopeTracker = mangler.scopeTracker;

        // rename at the declaration level

        this.renameBindingIds(binding.path, oldName, newName, function (idPath) {
          return idPath.node === binding.identifier;
        });

        // update mangler's ScopeTracker
        scopeTracker.renameBinding(scope, oldName, newName);

        // update all constant violations
        var violations = binding.constantViolations;
        for (var i = 0; i < violations.length; i++) {
          if (violations[i].isLabeledStatement()) continue;

          this.renameBindingIds(violations[i], oldName, newName);
          scopeTracker.updateReference(violations[i].scope, binding, oldName, newName);
        }

        // update all referenced places
        var refs = binding.referencePaths;
        for (var _i2 = 0; _i2 < refs.length; _i2++) {
          var path = refs[_i2];

          var node = path.node;


          if (!path.isIdentifier()) {
            // Ideally, this should not happen
            // it happens in these places now -
            // case 1: Export Statements
            // This is a bug in babel
            // https://github.com/babel/babel/pull/3629
            // case 2: Replacements in other plugins
            // eg: https://github.com/babel/minify/issues/122
            // replacement in dce from `x` to `!x` gives referencePath as `!x`
            path.traverse({
              ReferencedIdentifier(refPath) {
                if (refPath.node.name !== oldName) {
                  return;
                }
                var actualBinding = refPath.scope.getBinding(oldName);
                if (actualBinding !== binding) {
                  return;
                }
                mangler.renamedNodes.add(refPath.node);
                refPath.replaceWith(t.identifier(newName));
                mangler.renamedNodes.add(refPath.node);

                scopeTracker.updateReference(refPath.scope, binding, oldName, newName);
              }
            });
          } else if (!isLabelIdentifier(path)) {
            if (path.node.name === oldName) {
              mangler.renamedNodes.add(path.node);
              path.replaceWith(t.identifier(newName));
              mangler.renamedNodes.add(path.node);
              scopeTracker.updateReference(path.scope, binding, oldName, newName);
            } else if (mangler.renamedNodes.has(path.node)) {
              // already renamed,
              // just update the references
              scopeTracker.updateReference(path.scope, binding, oldName, newName);
            } else {
              throw new Error(`Unexpected Rename Error: ` + `Trying to replace "${node.name}": from "${oldName}" to "${newName}". ` + `Please report it at ${newIssueUrl}`);
            }
          }
          // else label identifier - silently ignore
        }

        // update babel's scope tracking
        var bindings = scope.bindings;

        bindings[newName] = binding;
        delete bindings[oldName];
      }
    }]);

    return Mangler;
  }();

  return {
    name: "minify-mangle-names",
    visitor: {
      /**
       * Mangler is run as a single pass. It's the same pattern as used in DCE
       */
      Program: {
        exit(path) {
          // If the source code is small then we're going to assume that the user
          // is running on this on single files before bundling. Therefore we
          // need to achieve as much determinisim and we will not do any frequency
          // sorting on the character set. Currently the number is pretty arbitrary.
          var shouldConsiderSource = path.getSource().length > 70000;

          var charset = new Charset(shouldConsiderSource);

          var mangler = new Mangler(charset, path, this.opts);
          mangler.run();
        }
      }
    }
  };
};

// convert value to object
function toObject(value) {
  if (!Array.isArray(value)) {
    return value;
  }

  var map = {};
  for (var i = 0; i < value.length; i++) {
    map[value[i]] = true;
  }
  return map;
}

// for keepFnName
function isFunction(path) {
  return path.isFunctionExpression() || path.isFunctionDeclaration();
}

// for keepClassName
function isClass(path) {
  return path.isClassExpression() || path.isClassDeclaration();
}