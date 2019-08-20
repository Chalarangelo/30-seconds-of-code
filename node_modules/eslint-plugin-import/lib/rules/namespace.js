'use strict';

var _declaredScope = require('eslint-module-utils/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: (0, _docsUrl2.default)('namespace')
    },

    schema: [{
      'type': 'object',
      'properties': {
        'allowComputed': {
          'description': 'If `false`, will report computed (and thus, un-lintable) references ' + 'to namespace members.',
          'type': 'boolean',
          'default': false
        }
      },
      'additionalProperties': false
    }]
  },

  create: function namespaceRule(context) {

    // read options
    var _ref = context.options[0] || {},
        _ref$allowComputed = _ref.allowComputed;

    const allowComputed = _ref$allowComputed === undefined ? false : _ref$allowComputed;


    const namespaces = new Map();

    function makeMessage(last, namepath) {
      return `'${last.name}' not found in` + (namepath.length > 1 ? ' deeply ' : ' ') + `imported namespace '${namepath.join('.')}'.`;
    }

    return {

      // pick up all imports at body entry time, to properly respect hoisting
      Program: function (_ref2) {
        let body = _ref2.body;

        function processBodyStatement(declaration) {
          if (declaration.type !== 'ImportDeclaration') return;

          if (declaration.specifiers.length === 0) return;

          const imports = _ExportMap2.default.get(declaration.source.value, context);
          if (imports == null) return null;

          if (imports.errors.length) {
            imports.reportErrors(context, declaration);
            return;
          }

          for (const specifier of declaration.specifiers) {
            switch (specifier.type) {
              case 'ImportNamespaceSpecifier':
                if (!imports.size) {
                  context.report(specifier, `No exported names found in module '${declaration.source.value}'.`);
                }
                namespaces.set(specifier.local.name, imports);
                break;
              case 'ImportDefaultSpecifier':
              case 'ImportSpecifier':
                {
                  const meta = imports.get(
                  // default to 'default' for default http://i.imgur.com/nj6qAWy.jpg
                  specifier.imported ? specifier.imported.name : 'default');
                  if (!meta || !meta.namespace) break;
                  namespaces.set(specifier.local.name, meta.namespace);
                  break;
                }
            }
          }
        }
        body.forEach(processBodyStatement);
      },

      // same as above, but does not add names to local map
      ExportNamespaceSpecifier: function (namespace) {
        var declaration = (0, _importDeclaration2.default)(context);

        var imports = _ExportMap2.default.get(declaration.source.value, context);
        if (imports == null) return null;

        if (imports.errors.length) {
          imports.reportErrors(context, declaration);
          return;
        }

        if (!imports.size) {
          context.report(namespace, `No exported names found in module '${declaration.source.value}'.`);
        }
      },

      // todo: check for possible redefinition

      MemberExpression: function (dereference) {
        if (dereference.object.type !== 'Identifier') return;
        if (!namespaces.has(dereference.object.name)) return;

        if (dereference.parent.type === 'AssignmentExpression' && dereference.parent.left === dereference) {
          context.report(dereference.parent, `Assignment to member of namespace '${dereference.object.name}'.`);
        }

        // go deep
        var namespace = namespaces.get(dereference.object.name);
        var namepath = [dereference.object.name];
        // while property is namespace and parent is member expression, keep validating
        while (namespace instanceof _ExportMap2.default && dereference.type === 'MemberExpression') {

          if (dereference.computed) {
            if (!allowComputed) {
              context.report(dereference.property, 'Unable to validate computed reference to imported namespace \'' + dereference.object.name + '\'.');
            }
            return;
          }

          if (!namespace.has(dereference.property.name)) {
            context.report(dereference.property, makeMessage(dereference.property, namepath));
            break;
          }

          const exported = namespace.get(dereference.property.name);
          if (exported == null) return;

          // stash and pop
          namepath.push(dereference.property.name);
          namespace = exported.namespace;
          dereference = dereference.parent;
        }
      },

      VariableDeclarator: function (_ref3) {
        let id = _ref3.id,
            init = _ref3.init;

        if (init == null) return;
        if (init.type !== 'Identifier') return;
        if (!namespaces.has(init.name)) return;

        // check for redefinition in intermediate scopes
        if ((0, _declaredScope2.default)(context, init.name) !== 'module') return;

        // DFS traverse child namespaces
        function testKey(pattern, namespace) {
          let path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [init.name];

          if (!(namespace instanceof _ExportMap2.default)) return;

          if (pattern.type !== 'ObjectPattern') return;

          for (const property of pattern.properties) {
            if (property.type === 'ExperimentalRestProperty' || property.type === 'RestElement' || !property.key) {
              continue;
            }

            if (property.key.type !== 'Identifier') {
              context.report({
                node: property,
                message: 'Only destructure top-level names.'
              });
              continue;
            }

            if (!namespace.has(property.key.name)) {
              context.report({
                node: property,
                message: makeMessage(property.key, path)
              });
              continue;
            }

            path.push(property.key.name);
            const dependencyExportMap = namespace.get(property.key.name);
            // could be null when ignored or ambiguous
            if (dependencyExportMap !== null) {
              testKey(property.value, dependencyExportMap.namespace, path);
            }
            path.pop();
          }
        }

        testKey(id, namespaces.get(init.name));
      },

      JSXMemberExpression: function (_ref4) {
        let object = _ref4.object,
            property = _ref4.property;

        if (!namespaces.has(object.name)) return;
        var namespace = namespaces.get(object.name);
        if (!namespace.has(property.name)) {
          context.report({
            node: property,
            message: makeMessage(property, [object.name])
          });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uYW1lc3BhY2UuanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsInNjaGVtYSIsImNyZWF0ZSIsIm5hbWVzcGFjZVJ1bGUiLCJjb250ZXh0Iiwib3B0aW9ucyIsImFsbG93Q29tcHV0ZWQiLCJuYW1lc3BhY2VzIiwiTWFwIiwibWFrZU1lc3NhZ2UiLCJsYXN0IiwibmFtZXBhdGgiLCJuYW1lIiwibGVuZ3RoIiwiam9pbiIsIlByb2dyYW0iLCJib2R5IiwicHJvY2Vzc0JvZHlTdGF0ZW1lbnQiLCJkZWNsYXJhdGlvbiIsInNwZWNpZmllcnMiLCJpbXBvcnRzIiwiRXhwb3J0cyIsImdldCIsInNvdXJjZSIsInZhbHVlIiwiZXJyb3JzIiwicmVwb3J0RXJyb3JzIiwic3BlY2lmaWVyIiwic2l6ZSIsInJlcG9ydCIsInNldCIsImxvY2FsIiwiaW1wb3J0ZWQiLCJuYW1lc3BhY2UiLCJmb3JFYWNoIiwiRXhwb3J0TmFtZXNwYWNlU3BlY2lmaWVyIiwiTWVtYmVyRXhwcmVzc2lvbiIsImRlcmVmZXJlbmNlIiwib2JqZWN0IiwiaGFzIiwicGFyZW50IiwibGVmdCIsImNvbXB1dGVkIiwicHJvcGVydHkiLCJleHBvcnRlZCIsInB1c2giLCJWYXJpYWJsZURlY2xhcmF0b3IiLCJpZCIsImluaXQiLCJ0ZXN0S2V5IiwicGF0dGVybiIsInBhdGgiLCJwcm9wZXJ0aWVzIiwia2V5Iiwibm9kZSIsIm1lc3NhZ2UiLCJkZXBlbmRlbmN5RXhwb3J0TWFwIiwicG9wIiwiSlNYTWVtYmVyRXhwcmVzc2lvbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFNBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLFdBQVI7QUFERCxLQUZGOztBQU1KQyxZQUFRLENBQ047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QUF0QixDQUFoQjtBQUNBLFlBQUksQ0FBQ3FCLFVBQVVNLEdBQVYsQ0FBY0ksU0FBUy9CLElBQXZCLENBQUwsRUFBbUM7QUFDakNSLGtCQUFReUIsTUFBUixDQUFlO0FBQ2J5QixrQkFBTVgsUUFETztBQUViWSxxQkFBUzlDLFlBQVlrQyxRQUFaLEVBQXNCLENBQUNMLE9BQU8xQixJQUFSLENBQXRCO0FBRkksV0FBZjtBQUlEO0FBQ0g7QUF0S0ksS0FBUDtBQXdLRDtBQS9NYyxDQUFqQiIsImZpbGUiOiJuYW1lc3BhY2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgZGVjbGFyZWRTY29wZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL2RlY2xhcmVkU2NvcGUnXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgaW1wb3J0RGVjbGFyYXRpb24gZnJvbSAnLi4vaW1wb3J0RGVjbGFyYXRpb24nXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdwcm9ibGVtJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25hbWVzcGFjZScpLFxuICAgIH0sXG5cbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgJ3R5cGUnOiAnb2JqZWN0JyxcbiAgICAgICAgJ3Byb3BlcnRpZXMnOiB7XG4gICAgICAgICAgJ2FsbG93Q29tcHV0ZWQnOiB7XG4gICAgICAgICAgICAnZGVzY3JpcHRpb24nOlxuICAgICAgICAgICAgICAnSWYgYGZhbHNlYCwgd2lsbCByZXBvcnQgY29tcHV0ZWQgKGFuZCB0aHVzLCB1bi1saW50YWJsZSkgcmVmZXJlbmNlcyAnICtcbiAgICAgICAgICAgICAgJ3RvIG5hbWVzcGFjZSBtZW1iZXJzLicsXG4gICAgICAgICAgICAndHlwZSc6ICdib29sZWFuJyxcbiAgICAgICAgICAgICdkZWZhdWx0JzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgJ2FkZGl0aW9uYWxQcm9wZXJ0aWVzJzogZmFsc2UsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiBuYW1lc3BhY2VSdWxlKGNvbnRleHQpIHtcblxuICAgIC8vIHJlYWQgb3B0aW9uc1xuICAgIGNvbnN0IHtcbiAgICAgIGFsbG93Q29tcHV0ZWQgPSBmYWxzZSxcbiAgICB9ID0gY29udGV4dC5vcHRpb25zWzBdIHx8IHt9XG5cbiAgICBjb25zdCBuYW1lc3BhY2VzID0gbmV3IE1hcCgpXG5cbiAgICBmdW5jdGlvbiBtYWtlTWVzc2FnZShsYXN0LCBuYW1lcGF0aCkge1xuICAgICAgIHJldHVybiBgJyR7bGFzdC5uYW1lfScgbm90IGZvdW5kIGluYCArXG4gICAgICAgICAgICAgIChuYW1lcGF0aC5sZW5ndGggPiAxID8gJyBkZWVwbHkgJyA6ICcgJykgK1xuICAgICAgICAgICAgICBgaW1wb3J0ZWQgbmFtZXNwYWNlICcke25hbWVwYXRoLmpvaW4oJy4nKX0nLmBcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuXG4gICAgICAvLyBwaWNrIHVwIGFsbCBpbXBvcnRzIGF0IGJvZHkgZW50cnkgdGltZSwgdG8gcHJvcGVybHkgcmVzcGVjdCBob2lzdGluZ1xuICAgICAgUHJvZ3JhbTogZnVuY3Rpb24gKHsgYm9keSB9KSB7XG4gICAgICAgIGZ1bmN0aW9uIHByb2Nlc3NCb2R5U3RhdGVtZW50KGRlY2xhcmF0aW9uKSB7XG4gICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnR5cGUgIT09ICdJbXBvcnREZWNsYXJhdGlvbicpIHJldHVyblxuXG4gICAgICAgICAgaWYgKGRlY2xhcmF0aW9uLnNwZWNpZmllcnMubGVuZ3RoID09PSAwKSByZXR1cm5cblxuICAgICAgICAgIGNvbnN0IGltcG9ydHMgPSBFeHBvcnRzLmdldChkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICAgICAgaWYgKGltcG9ydHMgPT0gbnVsbCkgcmV0dXJuIG51bGxcblxuICAgICAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGltcG9ydHMucmVwb3J0RXJyb3JzKGNvbnRleHQsIGRlY2xhcmF0aW9uKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZm9yIChjb25zdCBzcGVjaWZpZXIgb2YgZGVjbGFyYXRpb24uc3BlY2lmaWVycykge1xuICAgICAgICAgICAgc3dpdGNoIChzcGVjaWZpZXIudHlwZSkge1xuICAgICAgICAgICAgICBjYXNlICdJbXBvcnROYW1lc3BhY2VTcGVjaWZpZXInOlxuICAgICAgICAgICAgICAgIGlmICghaW1wb3J0cy5zaXplKSB7XG4gICAgICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydChzcGVjaWZpZXIsXG4gICAgICAgICAgICAgICAgICAgIGBObyBleHBvcnRlZCBuYW1lcyBmb3VuZCBpbiBtb2R1bGUgJyR7ZGVjbGFyYXRpb24uc291cmNlLnZhbHVlfScuYClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcy5zZXQoc3BlY2lmaWVyLmxvY2FsLm5hbWUsIGltcG9ydHMpXG4gICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgY2FzZSAnSW1wb3J0RGVmYXVsdFNwZWNpZmllcic6XG4gICAgICAgICAgICAgIGNhc2UgJ0ltcG9ydFNwZWNpZmllcic6IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRhID0gaW1wb3J0cy5nZXQoXG4gICAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IHRvICdkZWZhdWx0JyBmb3IgZGVmYXVsdCBodHRwOi8vaS5pbWd1ci5jb20vbmo2cUFXeS5qcGdcbiAgICAgICAgICAgICAgICAgIHNwZWNpZmllci5pbXBvcnRlZCA/IHNwZWNpZmllci5pbXBvcnRlZC5uYW1lIDogJ2RlZmF1bHQnKVxuICAgICAgICAgICAgICAgIGlmICghbWV0YSB8fCAhbWV0YS5uYW1lc3BhY2UpIGJyZWFrXG4gICAgICAgICAgICAgICAgbmFtZXNwYWNlcy5zZXQoc3BlY2lmaWVyLmxvY2FsLm5hbWUsIG1ldGEubmFtZXNwYWNlKVxuICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgYm9keS5mb3JFYWNoKHByb2Nlc3NCb2R5U3RhdGVtZW50KVxuICAgICAgfSxcblxuICAgICAgLy8gc2FtZSBhcyBhYm92ZSwgYnV0IGRvZXMgbm90IGFkZCBuYW1lcyB0byBsb2NhbCBtYXBcbiAgICAgIEV4cG9ydE5hbWVzcGFjZVNwZWNpZmllcjogZnVuY3Rpb24gKG5hbWVzcGFjZSkge1xuICAgICAgICB2YXIgZGVjbGFyYXRpb24gPSBpbXBvcnREZWNsYXJhdGlvbihjb250ZXh0KVxuXG4gICAgICAgIHZhciBpbXBvcnRzID0gRXhwb3J0cy5nZXQoZGVjbGFyYXRpb24uc291cmNlLnZhbHVlLCBjb250ZXh0KVxuICAgICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIGlmIChpbXBvcnRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBkZWNsYXJhdGlvbilcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaW1wb3J0cy5zaXplKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQobmFtZXNwYWNlLFxuICAgICAgICAgICAgYE5vIGV4cG9ydGVkIG5hbWVzIGZvdW5kIGluIG1vZHVsZSAnJHtkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgICB9XG4gICAgICB9LFxuXG4gICAgICAvLyB0b2RvOiBjaGVjayBmb3IgcG9zc2libGUgcmVkZWZpbml0aW9uXG5cbiAgICAgIE1lbWJlckV4cHJlc3Npb246IGZ1bmN0aW9uIChkZXJlZmVyZW5jZSkge1xuICAgICAgICBpZiAoZGVyZWZlcmVuY2Uub2JqZWN0LnR5cGUgIT09ICdJZGVudGlmaWVyJykgcmV0dXJuXG4gICAgICAgIGlmICghbmFtZXNwYWNlcy5oYXMoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpKSByZXR1cm5cblxuICAgICAgICBpZiAoZGVyZWZlcmVuY2UucGFyZW50LnR5cGUgPT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbicgJiZcbiAgICAgICAgICAgIGRlcmVmZXJlbmNlLnBhcmVudC5sZWZ0ID09PSBkZXJlZmVyZW5jZSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoZGVyZWZlcmVuY2UucGFyZW50LFxuICAgICAgICAgICAgICAgIGBBc3NpZ25tZW50IHRvIG1lbWJlciBvZiBuYW1lc3BhY2UgJyR7ZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWV9Jy5gKVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ28gZGVlcFxuICAgICAgICB2YXIgbmFtZXNwYWNlID0gbmFtZXNwYWNlcy5nZXQoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpXG4gICAgICAgIHZhciBuYW1lcGF0aCA9IFtkZXJlZmVyZW5jZS5vYmplY3QubmFtZV1cbiAgICAgICAgLy8gd2hpbGUgcHJvcGVydHkgaXMgbmFtZXNwYWNlIGFuZCBwYXJlbnQgaXMgbWVtYmVyIGV4cHJlc3Npb24sIGtlZXAgdmFsaWRhdGluZ1xuICAgICAgICB3aGlsZSAobmFtZXNwYWNlIGluc3RhbmNlb2YgRXhwb3J0cyAmJlxuICAgICAgICAgICAgICAgZGVyZWZlcmVuY2UudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG5cbiAgICAgICAgICBpZiAoZGVyZWZlcmVuY2UuY29tcHV0ZWQpIHtcbiAgICAgICAgICAgIGlmICghYWxsb3dDb21wdXRlZCkge1xuICAgICAgICAgICAgICBjb250ZXh0LnJlcG9ydChkZXJlZmVyZW5jZS5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICAnVW5hYmxlIHRvIHZhbGlkYXRlIGNvbXB1dGVkIHJlZmVyZW5jZSB0byBpbXBvcnRlZCBuYW1lc3BhY2UgXFwnJyArXG4gICAgICAgICAgICAgICAgZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUgKyAnXFwnLicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoIW5hbWVzcGFjZS5oYXMoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KFxuICAgICAgICAgICAgICBkZXJlZmVyZW5jZS5wcm9wZXJ0eSxcbiAgICAgICAgICAgICAgbWFrZU1lc3NhZ2UoZGVyZWZlcmVuY2UucHJvcGVydHksIG5hbWVwYXRoKSlcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZXhwb3J0ZWQgPSBuYW1lc3BhY2UuZ2V0KGRlcmVmZXJlbmNlLnByb3BlcnR5Lm5hbWUpXG4gICAgICAgICAgaWYgKGV4cG9ydGVkID09IG51bGwpIHJldHVyblxuXG4gICAgICAgICAgLy8gc3Rhc2ggYW5kIHBvcFxuICAgICAgICAgIG5hbWVwYXRoLnB1c2goZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSlcbiAgICAgICAgICBuYW1lc3BhY2UgPSBleHBvcnRlZC5uYW1lc3BhY2VcbiAgICAgICAgICBkZXJlZmVyZW5jZSA9IGRlcmVmZXJlbmNlLnBhcmVudFxuICAgICAgICB9XG5cbiAgICAgIH0sXG5cbiAgICAgIFZhcmlhYmxlRGVjbGFyYXRvcjogZnVuY3Rpb24gKHsgaWQsIGluaXQgfSkge1xuICAgICAgICBpZiAoaW5pdCA9PSBudWxsKSByZXR1cm5cbiAgICAgICAgaWYgKGluaXQudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm5cbiAgICAgICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhpbml0Lm5hbWUpKSByZXR1cm5cblxuICAgICAgICAvLyBjaGVjayBmb3IgcmVkZWZpbml0aW9uIGluIGludGVybWVkaWF0ZSBzY29wZXNcbiAgICAgICAgaWYgKGRlY2xhcmVkU2NvcGUoY29udGV4dCwgaW5pdC5uYW1lKSAhPT0gJ21vZHVsZScpIHJldHVyblxuXG4gICAgICAgIC8vIERGUyB0cmF2ZXJzZSBjaGlsZCBuYW1lc3BhY2VzXG4gICAgICAgIGZ1bmN0aW9uIHRlc3RLZXkocGF0dGVybiwgbmFtZXNwYWNlLCBwYXRoID0gW2luaXQubmFtZV0pIHtcbiAgICAgICAgICBpZiAoIShuYW1lc3BhY2UgaW5zdGFuY2VvZiBFeHBvcnRzKSkgcmV0dXJuXG5cbiAgICAgICAgICBpZiAocGF0dGVybi50eXBlICE9PSAnT2JqZWN0UGF0dGVybicpIHJldHVyblxuXG4gICAgICAgICAgZm9yIChjb25zdCBwcm9wZXJ0eSBvZiBwYXR0ZXJuLnByb3BlcnRpZXMpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcHJvcGVydHkudHlwZSA9PT0gJ0V4cGVyaW1lbnRhbFJlc3RQcm9wZXJ0eSdcbiAgICAgICAgICAgICAgfHwgcHJvcGVydHkudHlwZSA9PT0gJ1Jlc3RFbGVtZW50J1xuICAgICAgICAgICAgICB8fCAhcHJvcGVydHkua2V5XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29udGludWVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHByb3BlcnR5LmtleS50eXBlICE9PSAnSWRlbnRpZmllcicpIHtcbiAgICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgICAgIG5vZGU6IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6ICdPbmx5IGRlc3RydWN0dXJlIHRvcC1sZXZlbCBuYW1lcy4nLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIW5hbWVzcGFjZS5oYXMocHJvcGVydHkua2V5Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgICAgICBub2RlOiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBtYWtlTWVzc2FnZShwcm9wZXJ0eS5rZXksIHBhdGgpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICBjb250aW51ZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBwYXRoLnB1c2gocHJvcGVydHkua2V5Lm5hbWUpXG4gICAgICAgICAgICBjb25zdCBkZXBlbmRlbmN5RXhwb3J0TWFwID0gbmFtZXNwYWNlLmdldChwcm9wZXJ0eS5rZXkubmFtZSlcbiAgICAgICAgICAgIC8vIGNvdWxkIGJlIG51bGwgd2hlbiBpZ25vcmVkIG9yIGFtYmlndW91c1xuICAgICAgICAgICAgaWYgKGRlcGVuZGVuY3lFeHBvcnRNYXAgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgdGVzdEtleShwcm9wZXJ0eS52YWx1ZSwgZGVwZW5kZW5jeUV4cG9ydE1hcC5uYW1lc3BhY2UsIHBhdGgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYXRoLnBvcCgpXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGVzdEtleShpZCwgbmFtZXNwYWNlcy5nZXQoaW5pdC5uYW1lKSlcbiAgICAgIH0sXG5cbiAgICAgIEpTWE1lbWJlckV4cHJlc3Npb246IGZ1bmN0aW9uKHtvYmplY3QsIHByb3BlcnR5fSkge1xuICAgICAgICAgaWYgKCFuYW1lc3BhY2VzLmhhcyhvYmplY3QubmFtZSkpIHJldHVyblxuICAgICAgICAgdmFyIG5hbWVzcGFjZSA9IG5hbWVzcGFjZXMuZ2V0KG9iamVjdC5uYW1lKVxuICAgICAgICAgaWYgKCFuYW1lc3BhY2UuaGFzKHByb3BlcnR5Lm5hbWUpKSB7XG4gICAgICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICAgICBub2RlOiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICBtZXNzYWdlOiBtYWtlTWVzc2FnZShwcm9wZXJ0eSwgW29iamVjdC5uYW1lXSksXG4gICAgICAgICAgIH0pXG4gICAgICAgICB9XG4gICAgICB9LFxuICAgIH1cbiAgfSxcbn1cbiJdfQ==