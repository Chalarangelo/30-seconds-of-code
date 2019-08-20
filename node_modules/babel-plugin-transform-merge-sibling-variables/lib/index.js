"use strict";

module.exports = function ({
  types: t
}) {
  function liftDeclaration(path, body, kind) {
    if (body[0] && body[0].isVariableDeclaration({
      kind: kind
    })) {
      if (body[0].node.declarations.length > 1) {
        return;
      }

      if (body[1] && body[1].isVariableDeclaration({
        kind: kind
      })) {
        return;
      }

      const firstNode = body[0].node.declarations[0];

      if (!t.isIdentifier(firstNode.id) || !firstNode.init) {
        return;
      }

      const init = path.get("init");

      if (!init.isVariableDeclaration({
        kind: kind
      })) {
        return;
      }

      init.pushContainer("declarations", t.variableDeclarator(firstNode.id));
      body[0].replaceWith(t.assignmentExpression("=", t.clone(firstNode.id), t.clone(firstNode.init)));
    }
  }

  return {
    name: "transform-merge-sibling-variables",
    visitor: {
      ForStatement(path) {
        // Lift declarations to the loop initializer
        let body = path.get("body");
        body = body.isBlockStatement() ? body.get("body") : [body];
        liftDeclaration(path, body, "var");
        liftDeclaration(path, body, "let");
      },

      VariableDeclaration: {
        enter: [// concat variables of the same kind with their siblings
        function (path) {
          if (!path.inList) {
            return;
          }

          const node = path.node;
          let sibling = path.getSibling(path.key + 1);
          let declarations = [];

          while (sibling.isVariableDeclaration({
            kind: node.kind
          })) {
            declarations = declarations.concat(sibling.node.declarations);
            sibling.remove();
            sibling = path.getSibling(path.key + 1);
          }

          if (declarations.length > 0) {
            path.replaceWith(t.variableDeclaration(node.kind, [...node.declarations, ...declarations]));
          }
        }, // concat `var` declarations next to for loops with it's initialisers.
        // block-scoped `let` and `const` are not moved because the for loop
        // is a different block scope.
        function (path) {
          if (!path.inList) {
            return;
          }

          const node = path.node;

          if (node.kind !== "var") {
            return;
          }

          const next = path.getSibling(path.key + 1);

          if (!next.isForStatement()) {
            return;
          }

          const init = next.get("init");

          if (!init.isVariableDeclaration({
            kind: node.kind
          })) {
            return;
          }

          const declarations = node.declarations.concat(init.node.declarations); // temporary workaround to forces babel recalculate scope,
          // references and binding until babel/babel#4818 resolved

          path.remove();
          init.replaceWith(t.variableDeclaration("var", declarations));
        }]
      }
    }
  };
};