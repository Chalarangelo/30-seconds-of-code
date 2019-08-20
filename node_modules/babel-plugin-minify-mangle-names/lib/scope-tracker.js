"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var CountedSet = require("./counted-set");
var isLabelIdentifier = require("./is-label-identifier");

var newIssueUrl = "https://github.com/babel/minify/issues/new";

/**
 * ScopeTracker
 *   references: Map<Scope, CountedSet<String> >
 *   bindings: Map<Scope, Map<String, Binding> >
 */
module.exports = function () {
  function ScopeTracker() {
    _classCallCheck(this, ScopeTracker);

    this.references = new Map();
    this.bindings = new Map();
  }

  /**
   * Register a new Scope and initiliaze it with empty sets
   * @param {Scope} scope
   */


  _createClass(ScopeTracker, [{
    key: "addScope",
    value: function addScope(scope) {
      if (!this.references.has(scope)) {
        this.references.set(scope, new CountedSet());
      }
      if (!this.bindings.has(scope)) {
        this.bindings.set(scope, new Map());
      }
    }

    /**
     * Add reference to all Scopes between and including the ReferencedScope
     * and Binding's Scope
     * @param {Scope} scope
     * @param {Binding} binding
     * @param {String} name
     */

  }, {
    key: "addReference",
    value: function addReference(scope, binding, name) {
      var parent = scope;
      do {
        this.references.get(parent).add(name);
        if (!binding) {
          throw new Error(`Binding Not Found for ${name} during scopeTracker.addRefernce. ` + `Please report at ${newIssueUrl}`);
        }
        if (binding.scope === parent) break;
      } while (parent = parent.parent);
    }

    /**
     * has a Reference in the given {Scope} or a child Scope
     *
     * Refer {addReference} to know why the following call will be valid
     * for detecting references in child Scopes
     *
     * @param {Scope} scope
     * @param {String} name
     */

  }, {
    key: "hasReference",
    value: function hasReference(scope, name) {
      return this.references.get(scope).has(name);
    }

    /**
     * Update reference count in all scopes between and including the
     * Referenced Scope and the Binding's Scope
     *
     * @param {Scope} scope
     * @param {Binding} binding
     * @param {String} oldName
     * @param {String} newName
     */

  }, {
    key: "updateReference",
    value: function updateReference(scope, binding, oldName, newName) {
      var parent = scope;
      do {
        var ref = this.references.get(parent);

        ref.delete(oldName);
        ref.add(newName);

        if (!binding) {
          // Something went wrong - panic
          throw new Error("Binding Not Found during scopeTracker.updateRefernce " + `while updating "${oldName}" to "${newName}". ` + `Please report at ${newIssueUrl}`);
        }

        if (binding.scope === parent) break;
      } while (parent = parent.parent);
    }

    /**
     * has either a Binding or a Reference
     * @param {Scope} scope
     * @param {Binding} binding
     * @param {String} name
     */

  }, {
    key: "hasBindingOrReference",
    value: function hasBindingOrReference(scope, binding, name) {
      return this.hasReference(scope, name) || this.hasBinding(scope, name);
    }

    /**
     * For a Binding visit all places where the Binding is used and detect
     * if the newName {next} can be used in all these places
     *
     * 1. binding's own scope
     * 2. constant violations' scopes
     * 3. referencePaths' scopes
     *
     * @param {Binding} binding
     * @param {String} next
     */

  }, {
    key: "canUseInReferencedScopes",
    value: function canUseInReferencedScopes(binding, next) {
      var tracker = this;

      if (tracker.hasBindingOrReference(binding.scope, binding, next)) {
        return false;
      }

      // Safari raises a syntax error for a `let` or `const` declaration in a
      // `for` loop initialization that shadows a parent function's parameter.
      // https://github.com/babel/minify/issues/559
      // https://bugs.webkit.org/show_bug.cgi?id=171041
      // https://trac.webkit.org/changeset/217200/webkit/trunk/Source
      var maybeDecl = binding.path.parentPath;
      var isBlockScoped = maybeDecl.isVariableDeclaration({ kind: "let" }) || maybeDecl.isVariableDeclaration({ kind: "const" });
      if (isBlockScoped) {
        var maybeFor = maybeDecl.parentPath;
        var isForLoopBinding = maybeFor.isForStatement({ init: maybeDecl.node }) || maybeFor.isForXStatement({ left: maybeDecl.node });
        if (isForLoopBinding) {
          var fnParent = maybeFor.getFunctionParent();
          if (fnParent.isFunction({ body: maybeFor.parent })) {
            var parentFunctionBinding = this.bindings.get(fnParent.scope).get(next);
            if (parentFunctionBinding) {
              var parentFunctionHasParamBinding = parentFunctionBinding.kind === "param";
              if (parentFunctionHasParamBinding) {
                return false;
              }
            }
          }
        }
      }

      for (var i = 0; i < binding.constantViolations.length; i++) {
        var violation = binding.constantViolations[i];
        if (tracker.hasBindingOrReference(violation.scope, binding, next)) {
          return false;
        }
      }

      for (var _i = 0; _i < binding.referencePaths.length; _i++) {
        var ref = binding.referencePaths[_i];
        if (!ref.isIdentifier()) {
          var canUse = true;
          ref.traverse({
            ReferencedIdentifier(path) {
              if (path.node.name !== next) return;
              if (tracker.hasBindingOrReference(path.scope, binding, next)) {
                canUse = false;
              }
            }
          });
          if (!canUse) {
            return canUse;
          }
        } else if (!isLabelIdentifier(ref)) {
          if (tracker.hasBindingOrReference(ref.scope, binding, next)) {
            return false;
          }
        }
      }

      return true;
    }

    /**
     * Add a binding to Tracker in binding's own Scope
     * @param {Binding} binding
     */

  }, {
    key: "addBinding",
    value: function addBinding(binding) {
      if (!binding) {
        return;
      }

      var bindings = this.bindings.get(binding.scope);
      var existingBinding = bindings.get(binding.identifier.name);

      if (existingBinding && existingBinding !== binding) {
        throw new Error(`scopeTracker.addBinding: ` + `Binding "${existingBinding.identifier.name}" already exists. ` + `Trying to add "${binding.identifier.name}" again.`);
      }

      bindings.set(binding.identifier.name, binding);
    }

    /**
     * Moves Binding from it's own Scope to {toScope}
     *
     * required for fixup-var-scope
     *
     * @param {Binding} binding
     * @param {Scope} toScope
     */

  }, {
    key: "moveBinding",
    value: function moveBinding(binding, toScope) {
      this.bindings.get(binding.scope).delete(binding.identifier.name);
      this.bindings.get(toScope).set(binding.identifier.name, binding);
    }

    /**
     * has a Binding in the current {Scope}
     * @param {Scope} scope
     * @param {String} name
     */

  }, {
    key: "hasBinding",
    value: function hasBinding(scope, name) {
      return this.bindings.get(scope).has(name);
    }

    /**
     * Update the ScopeTracker on rename
     * @param {Scope} scope
     * @param {String} oldName
     * @param {String} newName
     */

  }, {
    key: "renameBinding",
    value: function renameBinding(scope, oldName, newName) {
      var bindings = this.bindings.get(scope);
      bindings.set(newName, bindings.get(oldName));
      bindings.delete(oldName);
    }
  }]);

  return ScopeTracker;
}();