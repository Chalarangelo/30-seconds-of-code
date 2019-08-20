"use strict";

module.exports = function (_ref) {
  var t = _ref.types;

  var NO_MEMBER = Symbol("no member");

  var replaceVisitor = {
    ReferencedIdentifier(path) {
      var _path = path,
          node = _path.node;

      var optionsMap = this.replacements[node.name];
      if (!optionsMap) {
        return;
      }

      var options = void 0;
      if (path.parentPath.isMemberExpression({ object: node })) {
        var property = path.parent.property;

        var key = t.isIdentifier(property) && property.name;
        if (typeof key === "string") {
          options = optionsMap[key];
          path = path.parentPath;
        }
      }

      if (!options) {
        options = optionsMap[NO_MEMBER];
      }

      if (!options) {
        return;
      }

      path.replaceWith(options.node);
    }
  };

  return {
    name: "minify-replace",
    visitor: {
      Program(path) {
        /**
           Replacements is an array of objects like this:
           {
             identifierName: 'console',
             member: 'log', // optional
             replacement: {
               type: 'identifier',
               value: '',
             },
           }
        **/

        if (!this.opts.replacements) {
          // No replacements. Bail.
          return;
        }

        var map = Object.create(null);
        this.opts.replacements.forEach(function (_ref2) {
          var identifierName = _ref2.identifierName,
              replacement = _ref2.replacement,
              member = _ref2.member;

          if (path.scope.globals[identifierName]) {
            // Convert to a node, we only allow identifiers and literals as replacements
            if (!replacement.type.match(/literal|identifier/i)) {
              throw new Error("Only literals and identifier are supported as replacements");
            }

            var node = t[replacement.type](replacement.value);
            var options = {
              identifierName,
              node,
              member
            };

            if (!map[identifierName]) {
              map[identifierName] = {};
            }

            if (member && map[identifierName][member]) {
              throw new Error(`Replacement collision ${identifierName}.${member}`);
            }
            map[identifierName][member || NO_MEMBER] = options;
          }
        });

        path.traverse(replaceVisitor, { replacements: map });
      }
    }
  };
};