'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

var _arrayIncludes = require('array-includes');

var _arrayIncludes2 = _interopRequireDefault(_arrayIncludes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
Notes on Typescript namespaces aka TSModuleDeclaration:

There are two forms:
- active namespaces: namespace Foo {} / module Foo {}
- ambient modules; declare module "eslint-plugin-import" {}

active namespaces:
- cannot contain a default export
- cannot contain an export all
- cannot contain a multi name export (export { a, b })
- can have active namespaces nested within them

ambient namespaces:
- can only be defined in .d.ts files
- cannot be nested within active namespaces
- have no other restrictions
*/

const rootProgram = 'root';
const tsTypePrefix = 'type:';

/**
 * Detect function overloads like:
 * ```ts
 * export function foo(a: number);
 * export function foo(a: string);
 * export function foo(a: number|string) { return a; }
 * ```
 * @param {Set<Object>} nodes
 * @returns {boolean}
 */
function isTypescriptFunctionOverloads(nodes) {
  const types = new Set(Array.from(nodes, node => node.parent.type));
  return types.size === 2 && types.has('TSDeclareFunction') && types.has('FunctionDeclaration');
}

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: (0, _docsUrl2.default)('export')
    }
  },

  create: function (context) {
    const namespace = new Map([[rootProgram, new Map()]]);

    function addNamed(name, node, parent, isType) {
      if (!namespace.has(parent)) {
        namespace.set(parent, new Map());
      }
      const named = namespace.get(parent);

      const key = isType ? `${tsTypePrefix}${name}` : name;
      let nodes = named.get(key);

      if (nodes == null) {
        nodes = new Set();
        named.set(key, nodes);
      }

      nodes.add(node);
    }

    function getParent(node) {
      if (node.parent && node.parent.type === 'TSModuleBlock') {
        return node.parent.parent;
      }

      // just in case somehow a non-ts namespace export declaration isn't directly
      // parented to the root Program node
      return rootProgram;
    }

    return {
      'ExportDefaultDeclaration': node => addNamed('default', node, getParent(node)),

      'ExportSpecifier': node => addNamed(node.exported.name, node.exported, getParent(node)),

      'ExportNamedDeclaration': function (node) {
        if (node.declaration == null) return;

        const parent = getParent(node);
        // support for old typescript versions
        const isTypeVariableDecl = node.declaration.kind === 'type';

        if (node.declaration.id != null) {
          if ((0, _arrayIncludes2.default)(['TSTypeAliasDeclaration', 'TSInterfaceDeclaration'], node.declaration.type)) {
            addNamed(node.declaration.id.name, node.declaration.id, parent, true);
          } else {
            addNamed(node.declaration.id.name, node.declaration.id, parent, isTypeVariableDecl);
          }
        }

        if (node.declaration.declarations != null) {
          for (let declaration of node.declaration.declarations) {
            (0, _ExportMap.recursivePatternCapture)(declaration.id, v => addNamed(v.name, v, parent, isTypeVariableDecl));
          }
        }
      },

      'ExportAllDeclaration': function (node) {
        if (node.source == null) return; // not sure if this is ever true

        const remoteExports = _ExportMap2.default.get(node.source.value, context);
        if (remoteExports == null) return;

        if (remoteExports.errors.length) {
          remoteExports.reportErrors(context, node);
          return;
        }

        const parent = getParent(node);

        let any = false;
        remoteExports.forEach((v, name) => name !== 'default' && (any = true) && // poor man's filter
        addNamed(name, node, parent));

        if (!any) {
          context.report(node.source, `No named exports found in module '${node.source.value}'.`);
        }
      },

      'Program:exit': function () {
        for (let _ref of namespace) {
          var _ref2 = _slicedToArray(_ref, 2);

          let named = _ref2[1];

          for (let _ref3 of named) {
            var _ref4 = _slicedToArray(_ref3, 2);

            let name = _ref4[0];
            let nodes = _ref4[1];

            if (nodes.size <= 1) continue;

            if (isTypescriptFunctionOverloads(nodes)) continue;

            for (let node of nodes) {
              if (name === 'default') {
                context.report(node, 'Multiple default exports.');
              } else {
                context.report(node, `Multiple exports of name '${name.replace(tsTypePrefix, '')}'.`);
              }
            }
          }
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9leHBvcnQuanMiXSwibmFtZXMiOlsicm9vdFByb2dyYW0iLCJ0c1R5cGVQcmVmaXgiLCJpc1R5cGVzY3JpcHRGdW5jdGlvbk92ZXJsb2FkcyIsIm5vZGVzIiwidHlwZXMiLCJTZXQiLCJBcnJheSIsImZyb20iLCJub2RlIiwicGFyZW50IiwidHlwZSIsInNpemUiLCJoYXMiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJjcmVhdGUiLCJjb250ZXh0IiwibmFtZXNwYWNlIiwiTWFwIiwiYWRkTmFtZWQiLCJuYW1lIiwiaXNUeXBlIiwic2V0IiwibmFtZWQiLCJnZXQiLCJrZXkiLCJhZGQiLCJnZXRQYXJlbnQiLCJleHBvcnRlZCIsImRlY2xhcmF0aW9uIiwiaXNUeXBlVmFyaWFibGVEZWNsIiwia2luZCIsImlkIiwiZGVjbGFyYXRpb25zIiwidiIsInNvdXJjZSIsInJlbW90ZUV4cG9ydHMiLCJFeHBvcnRNYXAiLCJ2YWx1ZSIsImVycm9ycyIsImxlbmd0aCIsInJlcG9ydEVycm9ycyIsImFueSIsImZvckVhY2giLCJyZXBvcnQiLCJyZXBsYWNlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQW1CQSxNQUFNQSxjQUFjLE1BQXBCO0FBQ0EsTUFBTUMsZUFBZSxPQUFyQjs7QUFFQTs7Ozs7Ozs7OztBQVVBLFNBQVNDLDZCQUFULENBQXVDQyxLQUF2QyxFQUE4QztBQUM1QyxRQUFNQyxRQUFRLElBQUlDLEdBQUosQ0FBUUMsTUFBTUMsSUFBTixDQUFXSixLQUFYLEVBQWtCSyxRQUFRQSxLQUFLQyxNQUFMLENBQVlDLElBQXRDLENBQVIsQ0FBZDtBQUNBLFNBQU9OLE1BQU1PLElBQU4sS0FBZSxDQUFmLElBQW9CUCxNQUFNUSxHQUFOLENBQVUsbUJBQVYsQ0FBcEIsSUFBc0RSLE1BQU1RLEdBQU4sQ0FBVSxxQkFBVixDQUE3RDtBQUNEOztBQUVEQyxPQUFPQyxPQUFQLEdBQWlCO0FBQ2ZDLFFBQU07QUFDSkwsVUFBTSxTQURGO0FBRUpNLFVBQU07QUFDSkMsV0FBSyx1QkFBUSxRQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsVUFBTUMsWUFBWSxJQUFJQyxHQUFKLENBQVEsQ0FBQyxDQUFDckIsV0FBRCxFQUFjLElBQUlxQixHQUFKLEVBQWQsQ0FBRCxDQUFSLENBQWxCOztBQUVBLGFBQVNDLFFBQVQsQ0FBa0JDLElBQWxCLEVBQXdCZixJQUF4QixFQUE4QkMsTUFBOUIsRUFBc0NlLE1BQXRDLEVBQThDO0FBQzVDLFVBQUksQ0FBQ0osVUFBVVIsR0FBVixDQUFjSCxNQUFkLENBQUwsRUFBNEI7QUFDMUJXLGtCQUFVSyxHQUFWLENBQWNoQixNQUFkLEVBQXNCLElBQUlZLEdBQUosRUFBdEI7QUFDRDtBQUNELFlBQU1LLFFBQVFOLFVBQVVPLEdBQVYsQ0FBY2xCLE1BQWQsQ0FBZDs7QUFFQSxZQUFNbUIsTUFBTUosU0FBVSxHQUFFdkIsWUFBYSxHQUFFc0IsSUFBSyxFQUFoQyxHQUFvQ0EsSUFBaEQ7QUFDQSxVQUFJcEIsUUFBUXVCLE1BQU1DLEdBQU4sQ0FBVUMsR0FBVixDQUFaOztBQUVBLFVBQUl6QixTQUFTLElBQWIsRUFBbUI7QUFDakJBLGdCQUFRLElBQUlFLEdBQUosRUFBUjtBQUNBcUIsY0FBTUQsR0FBTixDQUFVRyxHQUFWLEVBQWV6QixLQUFmO0FBQ0Q7O0FBRURBLFlBQU0wQixHQUFOLENBQVVyQixJQUFWO0FBQ0Q7O0FBRUQsYUFBU3NCLFNBQVQsQ0FBbUJ0QixJQUFuQixFQUF5QjtBQUN2QixVQUFJQSxLQUFLQyxNQUFMLElBQWVELEtBQUtDLE1BQUwsQ0FBWUMsSUFBWixLQUFxQixlQUF4QyxFQUF5RDtBQUN2RCxlQUFPRixLQUFLQyxNQUFMLENBQVlBLE1BQW5CO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLGFBQU9ULFdBQVA7QUFDRDs7QUFFRCxXQUFPO0FBQ0wsa0NBQTZCUSxJQUFELElBQVVjLFNBQVMsU0FBVCxFQUFvQmQsSUFBcEIsRUFBMEJzQixVQUFVdEIsSUFBVixDQUExQixDQURqQzs7QUFHTCx5QkFBb0JBLElBQUQsSUFBVWMsU0FBU2QsS0FBS3VCLFFBQUwsQ0FBY1IsSUFBdkIsRUFBNkJmLEtBQUt1QixRQUFsQyxFQUE0Q0QsVUFBVXRCLElBQVYsQ0FBNUMsQ0FIeEI7O0FBS0wsZ0NBQTBCLFVBQVVBLElBQVYsRUFBZ0I7QUFDeEMsWUFBSUEsS0FBS3dCLFdBQUwsSUFBb0IsSUFBeEIsRUFBOEI7O0FBRTlCLGNBQU12QixTQUFTcUIsVUFBVXRCLElBQVYsQ0FBZjtBQUNBO0FBQ0EsY0FBTXlCLHFCQUFxQnpCLEtBQUt3QixXQUFMLENBQWlCRSxJQUFqQixLQUEwQixNQUFyRDs7QUFFQSxZQUFJMUIsS0FBS3dCLFdBQUwsQ0FBaUJHLEVBQWpCLElBQXVCLElBQTNCLEVBQWlDO0FBQy9CLGNBQUksNkJBQVMsQ0FDWCx3QkFEVyxFQUVYLHdCQUZXLENBQVQsRUFHRDNCLEtBQUt3QixXQUFMLENBQWlCdEIsSUFIaEIsQ0FBSixFQUcyQjtBQUN6QlkscUJBQVNkLEtBQUt3QixXQUFMLENBQWlCRyxFQUFqQixDQUFvQlosSUFBN0IsRUFBbUNmLEtBQUt3QixXQUFMLENBQWlCRyxFQUFwRCxFQUF3RDFCLE1BQXhELEVBQWdFLElBQWhFO0FBQ0QsV0FMRCxNQUtPO0FBQ0xhLHFCQUFTZCxLQUFLd0IsV0FBTCxDQUFpQkcsRUFBakIsQ0FBb0JaLElBQTdCLEVBQW1DZixLQUFLd0IsV0FBTCxDQUFpQkcsRUFBcEQsRUFBd0QxQixNQUF4RCxFQUFnRXdCLGtCQUFoRTtBQUNEO0FBQ0Y7O0FBRUQsWUFBSXpCLEtBQUt3QixXQUFMLENBQWlCSSxZQUFqQixJQUFpQyxJQUFyQyxFQUEyQztBQUN6QyxlQUFLLElBQUlKLFdBQVQsSUFBd0J4QixLQUFLd0IsV0FBTCxDQUFpQkksWUFBekMsRUFBdUQ7QUFDckQsb0RBQXdCSixZQUFZRyxFQUFwQyxFQUF3Q0UsS0FDdENmLFNBQVNlLEVBQUVkLElBQVgsRUFBaUJjLENBQWpCLEVBQW9CNUIsTUFBcEIsRUFBNEJ3QixrQkFBNUIsQ0FERjtBQUVEO0FBQ0Y7QUFDRixPQTdCSTs7QUErQkwsOEJBQXdCLFVBQVV6QixJQUFWLEVBQWdCO0FBQ3RDLFlBQUlBLEtBQUs4QixNQUFMLElBQWUsSUFBbkIsRUFBeUIsT0FEYSxDQUNOOztBQUVoQyxjQUFNQyxnQkFBZ0JDLG9CQUFVYixHQUFWLENBQWNuQixLQUFLOEIsTUFBTCxDQUFZRyxLQUExQixFQUFpQ3RCLE9BQWpDLENBQXRCO0FBQ0EsWUFBSW9CLGlCQUFpQixJQUFyQixFQUEyQjs7QUFFM0IsWUFBSUEsY0FBY0csTUFBZCxDQUFxQkMsTUFBekIsRUFBaUM7QUFDL0JKLHdCQUFjSyxZQUFkLENBQTJCekIsT0FBM0IsRUFBb0NYLElBQXBDO0FBQ0E7QUFDRDs7QUFFRCxjQUFNQyxTQUFTcUIsVUFBVXRCLElBQVYsQ0FBZjs7QUFFQSxZQUFJcUMsTUFBTSxLQUFWO0FBQ0FOLHNCQUFjTyxPQUFkLENBQXNCLENBQUNULENBQUQsRUFBSWQsSUFBSixLQUNwQkEsU0FBUyxTQUFULEtBQ0NzQixNQUFNLElBRFAsS0FDZ0I7QUFDaEJ2QixpQkFBU0MsSUFBVCxFQUFlZixJQUFmLEVBQXFCQyxNQUFyQixDQUhGOztBQUtBLFlBQUksQ0FBQ29DLEdBQUwsRUFBVTtBQUNSMUIsa0JBQVE0QixNQUFSLENBQWV2QyxLQUFLOEIsTUFBcEIsRUFDRyxxQ0FBb0M5QixLQUFLOEIsTUFBTCxDQUFZRyxLQUFNLElBRHpEO0FBRUQ7QUFDRixPQXRESTs7QUF3REwsc0JBQWdCLFlBQVk7QUFDMUIseUJBQXNCckIsU0FBdEIsRUFBaUM7QUFBQTs7QUFBQSxjQUFyQk0sS0FBcUI7O0FBQy9CLDRCQUEwQkEsS0FBMUIsRUFBaUM7QUFBQTs7QUFBQSxnQkFBdkJILElBQXVCO0FBQUEsZ0JBQWpCcEIsS0FBaUI7O0FBQy9CLGdCQUFJQSxNQUFNUSxJQUFOLElBQWMsQ0FBbEIsRUFBcUI7O0FBRXJCLGdCQUFJVCw4QkFBOEJDLEtBQTlCLENBQUosRUFBMEM7O0FBRTFDLGlCQUFLLElBQUlLLElBQVQsSUFBaUJMLEtBQWpCLEVBQXdCO0FBQ3RCLGtCQUFJb0IsU0FBUyxTQUFiLEVBQXdCO0FBQ3RCSix3QkFBUTRCLE1BQVIsQ0FBZXZDLElBQWYsRUFBcUIsMkJBQXJCO0FBQ0QsZUFGRCxNQUVPO0FBQ0xXLHdCQUFRNEIsTUFBUixDQUNFdkMsSUFERixFQUVHLDZCQUE0QmUsS0FBS3lCLE9BQUwsQ0FBYS9DLFlBQWIsRUFBMkIsRUFBM0IsQ0FBK0IsSUFGOUQ7QUFJRDtBQUNGO0FBQ0Y7QUFDRjtBQUNGO0FBM0VJLEtBQVA7QUE2RUQ7QUFuSGMsQ0FBakIiLCJmaWxlIjoiZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEV4cG9ydE1hcCwgeyByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZSB9IGZyb20gJy4uL0V4cG9ydE1hcCdcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5pbXBvcnQgaW5jbHVkZXMgZnJvbSAnYXJyYXktaW5jbHVkZXMnXG5cbi8qXG5Ob3RlcyBvbiBUeXBlc2NyaXB0IG5hbWVzcGFjZXMgYWthIFRTTW9kdWxlRGVjbGFyYXRpb246XG5cblRoZXJlIGFyZSB0d28gZm9ybXM6XG4tIGFjdGl2ZSBuYW1lc3BhY2VzOiBuYW1lc3BhY2UgRm9vIHt9IC8gbW9kdWxlIEZvbyB7fVxuLSBhbWJpZW50IG1vZHVsZXM7IGRlY2xhcmUgbW9kdWxlIFwiZXNsaW50LXBsdWdpbi1pbXBvcnRcIiB7fVxuXG5hY3RpdmUgbmFtZXNwYWNlczpcbi0gY2Fubm90IGNvbnRhaW4gYSBkZWZhdWx0IGV4cG9ydFxuLSBjYW5ub3QgY29udGFpbiBhbiBleHBvcnQgYWxsXG4tIGNhbm5vdCBjb250YWluIGEgbXVsdGkgbmFtZSBleHBvcnQgKGV4cG9ydCB7IGEsIGIgfSlcbi0gY2FuIGhhdmUgYWN0aXZlIG5hbWVzcGFjZXMgbmVzdGVkIHdpdGhpbiB0aGVtXG5cbmFtYmllbnQgbmFtZXNwYWNlczpcbi0gY2FuIG9ubHkgYmUgZGVmaW5lZCBpbiAuZC50cyBmaWxlc1xuLSBjYW5ub3QgYmUgbmVzdGVkIHdpdGhpbiBhY3RpdmUgbmFtZXNwYWNlc1xuLSBoYXZlIG5vIG90aGVyIHJlc3RyaWN0aW9uc1xuKi9cblxuY29uc3Qgcm9vdFByb2dyYW0gPSAncm9vdCdcbmNvbnN0IHRzVHlwZVByZWZpeCA9ICd0eXBlOidcblxuLyoqXG4gKiBEZXRlY3QgZnVuY3Rpb24gb3ZlcmxvYWRzIGxpa2U6XG4gKiBgYGB0c1xuICogZXhwb3J0IGZ1bmN0aW9uIGZvbyhhOiBudW1iZXIpO1xuICogZXhwb3J0IGZ1bmN0aW9uIGZvbyhhOiBzdHJpbmcpO1xuICogZXhwb3J0IGZ1bmN0aW9uIGZvbyhhOiBudW1iZXJ8c3RyaW5nKSB7IHJldHVybiBhOyB9XG4gKiBgYGBcbiAqIEBwYXJhbSB7U2V0PE9iamVjdD59IG5vZGVzXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNUeXBlc2NyaXB0RnVuY3Rpb25PdmVybG9hZHMobm9kZXMpIHtcbiAgY29uc3QgdHlwZXMgPSBuZXcgU2V0KEFycmF5LmZyb20obm9kZXMsIG5vZGUgPT4gbm9kZS5wYXJlbnQudHlwZSkpXG4gIHJldHVybiB0eXBlcy5zaXplID09PSAyICYmIHR5cGVzLmhhcygnVFNEZWNsYXJlRnVuY3Rpb24nKSAmJiB0eXBlcy5oYXMoJ0Z1bmN0aW9uRGVjbGFyYXRpb24nKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdwcm9ibGVtJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ2V4cG9ydCcpLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGNvbnN0IG5hbWVzcGFjZSA9IG5ldyBNYXAoW1tyb290UHJvZ3JhbSwgbmV3IE1hcCgpXV0pXG5cbiAgICBmdW5jdGlvbiBhZGROYW1lZChuYW1lLCBub2RlLCBwYXJlbnQsIGlzVHlwZSkge1xuICAgICAgaWYgKCFuYW1lc3BhY2UuaGFzKHBhcmVudCkpIHtcbiAgICAgICAgbmFtZXNwYWNlLnNldChwYXJlbnQsIG5ldyBNYXAoKSlcbiAgICAgIH1cbiAgICAgIGNvbnN0IG5hbWVkID0gbmFtZXNwYWNlLmdldChwYXJlbnQpXG5cbiAgICAgIGNvbnN0IGtleSA9IGlzVHlwZSA/IGAke3RzVHlwZVByZWZpeH0ke25hbWV9YCA6IG5hbWVcbiAgICAgIGxldCBub2RlcyA9IG5hbWVkLmdldChrZXkpXG5cbiAgICAgIGlmIChub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIG5vZGVzID0gbmV3IFNldCgpXG4gICAgICAgIG5hbWVkLnNldChrZXksIG5vZGVzKVxuICAgICAgfVxuXG4gICAgICBub2Rlcy5hZGQobm9kZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRQYXJlbnQobm9kZSkge1xuICAgICAgaWYgKG5vZGUucGFyZW50ICYmIG5vZGUucGFyZW50LnR5cGUgPT09ICdUU01vZHVsZUJsb2NrJykge1xuICAgICAgICByZXR1cm4gbm9kZS5wYXJlbnQucGFyZW50XG4gICAgICB9XG5cbiAgICAgIC8vIGp1c3QgaW4gY2FzZSBzb21laG93IGEgbm9uLXRzIG5hbWVzcGFjZSBleHBvcnQgZGVjbGFyYXRpb24gaXNuJ3QgZGlyZWN0bHlcbiAgICAgIC8vIHBhcmVudGVkIHRvIHRoZSByb290IFByb2dyYW0gbm9kZVxuICAgICAgcmV0dXJuIHJvb3RQcm9ncmFtXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdFeHBvcnREZWZhdWx0RGVjbGFyYXRpb24nOiAobm9kZSkgPT4gYWRkTmFtZWQoJ2RlZmF1bHQnLCBub2RlLCBnZXRQYXJlbnQobm9kZSkpLFxuXG4gICAgICAnRXhwb3J0U3BlY2lmaWVyJzogKG5vZGUpID0+IGFkZE5hbWVkKG5vZGUuZXhwb3J0ZWQubmFtZSwgbm9kZS5leHBvcnRlZCwgZ2V0UGFyZW50KG5vZGUpKSxcblxuICAgICAgJ0V4cG9ydE5hbWVkRGVjbGFyYXRpb24nOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbiA9PSBudWxsKSByZXR1cm5cblxuICAgICAgICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnQobm9kZSlcbiAgICAgICAgLy8gc3VwcG9ydCBmb3Igb2xkIHR5cGVzY3JpcHQgdmVyc2lvbnNcbiAgICAgICAgY29uc3QgaXNUeXBlVmFyaWFibGVEZWNsID0gbm9kZS5kZWNsYXJhdGlvbi5raW5kID09PSAndHlwZSdcblxuICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi5pZCAhPSBudWxsKSB7XG4gICAgICAgICAgaWYgKGluY2x1ZGVzKFtcbiAgICAgICAgICAgICdUU1R5cGVBbGlhc0RlY2xhcmF0aW9uJyxcbiAgICAgICAgICAgICdUU0ludGVyZmFjZURlY2xhcmF0aW9uJyxcbiAgICAgICAgICBdLCBub2RlLmRlY2xhcmF0aW9uLnR5cGUpKSB7XG4gICAgICAgICAgICBhZGROYW1lZChub2RlLmRlY2xhcmF0aW9uLmlkLm5hbWUsIG5vZGUuZGVjbGFyYXRpb24uaWQsIHBhcmVudCwgdHJ1ZSlcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkTmFtZWQobm9kZS5kZWNsYXJhdGlvbi5pZC5uYW1lLCBub2RlLmRlY2xhcmF0aW9uLmlkLCBwYXJlbnQsIGlzVHlwZVZhcmlhYmxlRGVjbClcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobm9kZS5kZWNsYXJhdGlvbi5kZWNsYXJhdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIGZvciAobGV0IGRlY2xhcmF0aW9uIG9mIG5vZGUuZGVjbGFyYXRpb24uZGVjbGFyYXRpb25zKSB7XG4gICAgICAgICAgICByZWN1cnNpdmVQYXR0ZXJuQ2FwdHVyZShkZWNsYXJhdGlvbi5pZCwgdiA9PlxuICAgICAgICAgICAgICBhZGROYW1lZCh2Lm5hbWUsIHYsIHBhcmVudCwgaXNUeXBlVmFyaWFibGVEZWNsKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgICdFeHBvcnRBbGxEZWNsYXJhdGlvbic6IGZ1bmN0aW9uIChub2RlKSB7XG4gICAgICAgIGlmIChub2RlLnNvdXJjZSA9PSBudWxsKSByZXR1cm4gLy8gbm90IHN1cmUgaWYgdGhpcyBpcyBldmVyIHRydWVcblxuICAgICAgICBjb25zdCByZW1vdGVFeHBvcnRzID0gRXhwb3J0TWFwLmdldChub2RlLnNvdXJjZS52YWx1ZSwgY29udGV4dClcbiAgICAgICAgaWYgKHJlbW90ZUV4cG9ydHMgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgaWYgKHJlbW90ZUV4cG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHJlbW90ZUV4cG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIG5vZGUpXG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBwYXJlbnQgPSBnZXRQYXJlbnQobm9kZSlcblxuICAgICAgICBsZXQgYW55ID0gZmFsc2VcbiAgICAgICAgcmVtb3RlRXhwb3J0cy5mb3JFYWNoKCh2LCBuYW1lKSA9PlxuICAgICAgICAgIG5hbWUgIT09ICdkZWZhdWx0JyAmJlxuICAgICAgICAgIChhbnkgPSB0cnVlKSAmJiAvLyBwb29yIG1hbidzIGZpbHRlclxuICAgICAgICAgIGFkZE5hbWVkKG5hbWUsIG5vZGUsIHBhcmVudCkpXG5cbiAgICAgICAgaWYgKCFhbnkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLnNvdXJjZSxcbiAgICAgICAgICAgIGBObyBuYW1lZCBleHBvcnRzIGZvdW5kIGluIG1vZHVsZSAnJHtub2RlLnNvdXJjZS52YWx1ZX0nLmApXG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgICdQcm9ncmFtOmV4aXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZvciAobGV0IFssIG5hbWVkXSBvZiBuYW1lc3BhY2UpIHtcbiAgICAgICAgICBmb3IgKGxldCBbbmFtZSwgbm9kZXNdIG9mIG5hbWVkKSB7XG4gICAgICAgICAgICBpZiAobm9kZXMuc2l6ZSA8PSAxKSBjb250aW51ZVxuXG4gICAgICAgICAgICBpZiAoaXNUeXBlc2NyaXB0RnVuY3Rpb25PdmVybG9hZHMobm9kZXMpKSBjb250aW51ZVxuXG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICAgIGlmIChuYW1lID09PSAnZGVmYXVsdCcpIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydChub2RlLCAnTXVsdGlwbGUgZGVmYXVsdCBleHBvcnRzLicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoXG4gICAgICAgICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgICAgICAgYE11bHRpcGxlIGV4cG9ydHMgb2YgbmFtZSAnJHtuYW1lLnJlcGxhY2UodHNUeXBlUHJlZml4LCAnJyl9Jy5gXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==