"use strict";

// this fixes a bug where converting let to var
// doesn't change the binding's scope to function scope
// https://github.com/babel/babel/issues/4818
module.exports = function (mangler) {
  mangler.program.traverse({
    VariableDeclaration(path) {
      if (path.node.kind !== "var") {
        return;
      }
      var fnScope = path.scope.getFunctionParent() || path.scope.getProgramParent();
      var bindingIds = path.getOuterBindingIdentifierPaths();

      for (var name in bindingIds) {
        var binding = path.scope.getBinding(name);

        // var isn't hoisted to fnScope
        if (binding.scope !== fnScope) {
          var existingBinding = fnScope.bindings[name];
          // make sure we are clear that the fnScope doesn't already have
          // an existing binding
          if (!existingBinding) {
            // move binding to the function scope

            // update our scopeTracker first before
            // we mutate the scope
            mangler.scopeTracker.moveBinding(binding, fnScope);

            fnScope.bindings[name] = binding;
            binding.scope = fnScope;
            delete binding.scope.bindings[name];
          } else {
            // we need a new binding that's valid in both the scopes
            // binding.scope and fnScope
            var newName = fnScope.generateUid(binding.scope.generateUid(name));

            // rename binding in the original scope
            mangler.rename(binding.scope, binding, name, newName);

            // move binding to fnScope as newName

            // update our scopeTracker first before
            // we mutate the scope
            mangler.scopeTracker.moveBinding(binding, fnScope);

            fnScope.bindings[newName] = binding;
            binding.scope = fnScope;
            delete binding.scope.bindings[newName];
          }
        }
      }
    }
  });
};