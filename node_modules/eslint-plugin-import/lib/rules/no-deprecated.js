'use strict';

var _declaredScope = require('eslint-module-utils/declaredScope');

var _declaredScope2 = _interopRequireDefault(_declaredScope);

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function message(deprecation) {
  return 'Deprecated' + (deprecation.description ? ': ' + deprecation.description : '.');
}

function getDeprecation(metadata) {
  if (!metadata || !metadata.doc) return;

  let deprecation;
  if (metadata.doc.tags.some(t => t.title === 'deprecated' && (deprecation = t))) {
    return deprecation;
  }
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-deprecated')
    }
  },

  create: function (context) {
    const deprecated = new Map(),
          namespaces = new Map();

    function checkSpecifiers(node) {
      if (node.type !== 'ImportDeclaration') return;
      if (node.source == null) return; // local export, ignore

      const imports = _ExportMap2.default.get(node.source.value, context);
      if (imports == null) return;

      let moduleDeprecation;
      if (imports.doc && imports.doc.tags.some(t => t.title === 'deprecated' && (moduleDeprecation = t))) {
        context.report({ node, message: message(moduleDeprecation) });
      }

      if (imports.errors.length) {
        imports.reportErrors(context, node);
        return;
      }

      node.specifiers.forEach(function (im) {
        let imported, local;
        switch (im.type) {

          case 'ImportNamespaceSpecifier':
            {
              if (!imports.size) return;
              namespaces.set(im.local.name, imports);
              return;
            }

          case 'ImportDefaultSpecifier':
            imported = 'default';
            local = im.local.name;
            break;

          case 'ImportSpecifier':
            imported = im.imported.name;
            local = im.local.name;
            break;

          default:
            return; // can't handle this one
        }

        // unknown thing can't be deprecated
        const exported = imports.get(imported);
        if (exported == null) return;

        // capture import of deep namespace
        if (exported.namespace) namespaces.set(local, exported.namespace);

        const deprecation = getDeprecation(imports.get(imported));
        if (!deprecation) return;

        context.report({ node: im, message: message(deprecation) });

        deprecated.set(local, deprecation);
      });
    }

    return {
      'Program': (_ref) => {
        let body = _ref.body;
        return body.forEach(checkSpecifiers);
      },

      'Identifier': function (node) {
        if (node.parent.type === 'MemberExpression' && node.parent.property === node) {
          return; // handled by MemberExpression
        }

        // ignore specifier identifiers
        if (node.parent.type.slice(0, 6) === 'Import') return;

        if (!deprecated.has(node.name)) return;

        if ((0, _declaredScope2.default)(context, node.name) !== 'module') return;
        context.report({
          node,
          message: message(deprecated.get(node.name))
        });
      },

      'MemberExpression': function (dereference) {
        if (dereference.object.type !== 'Identifier') return;
        if (!namespaces.has(dereference.object.name)) return;

        if ((0, _declaredScope2.default)(context, dereference.object.name) !== 'module') return;

        // go deep
        var namespace = namespaces.get(dereference.object.name);
        var namepath = [dereference.object.name];
        // while property is namespace and parent is member expression, keep validating
        while (namespace instanceof _ExportMap2.default && dereference.type === 'MemberExpression') {

          // ignore computed parts for now
          if (dereference.computed) return;

          const metadata = namespace.get(dereference.property.name);

          if (!metadata) break;
          const deprecation = getDeprecation(metadata);

          if (deprecation) {
            context.report({ node: dereference.property, message: message(deprecation) });
          }

          // stash and pop
          namepath.push(dereference.property.name);
          namespace = metadata.namespace;
          dereference = dereference.parent;
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1kZXByZWNhdGVkLmpzIl0sIm5hbWVzIjpbIm1lc3NhZ2UiLCJkZXByZWNhdGlvbiIsImRlc2NyaXB0aW9uIiwiZ2V0RGVwcmVjYXRpb24iLCJtZXRhZGF0YSIsImRvYyIsInRhZ3MiLCJzb21lIiwidCIsInRpdGxlIiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsImNyZWF0ZSIsImNvbnRleHQiLCJkZXByZWNhdGVkIiwiTWFwIiwibmFtZXNwYWNlcyIsImNoZWNrU3BlY2lmaWVycyIsIm5vZGUiLCJzb3VyY2UiLCJpbXBvcnRzIiwiRXhwb3J0cyIsImdldCIsInZhbHVlIiwibW9kdWxlRGVwcmVjYXRpb24iLCJyZXBvcnQiLCJlcnJvcnMiLCJsZW5ndGgiLCJyZXBvcnRFcnJvcnMiLCJzcGVjaWZpZXJzIiwiZm9yRWFjaCIsImltIiwiaW1wb3J0ZWQiLCJsb2NhbCIsInNpemUiLCJzZXQiLCJuYW1lIiwiZXhwb3J0ZWQiLCJuYW1lc3BhY2UiLCJib2R5IiwicGFyZW50IiwicHJvcGVydHkiLCJzbGljZSIsImhhcyIsImRlcmVmZXJlbmNlIiwib2JqZWN0IiwibmFtZXBhdGgiLCJjb21wdXRlZCIsInB1c2giXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSxTQUFTQSxPQUFULENBQWlCQyxXQUFqQixFQUE4QjtBQUM1QixTQUFPLGdCQUFnQkEsWUFBWUMsV0FBWixHQUEwQixPQUFPRCxZQUFZQyxXQUE3QyxHQUEyRCxHQUEzRSxDQUFQO0FBQ0Q7O0FBRUQsU0FBU0MsY0FBVCxDQUF3QkMsUUFBeEIsRUFBa0M7QUFDaEMsTUFBSSxDQUFDQSxRQUFELElBQWEsQ0FBQ0EsU0FBU0MsR0FBM0IsRUFBZ0M7O0FBRWhDLE1BQUlKLFdBQUo7QUFDQSxNQUFJRyxTQUFTQyxHQUFULENBQWFDLElBQWIsQ0FBa0JDLElBQWxCLENBQXVCQyxLQUFLQSxFQUFFQyxL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QUFoQixFQUEwQjs7QUFFMUIsZ0JBQU0vQyxXQUFXc0MsVUFBVWhCLEdBQVYsQ0FBY3NCLFlBQVlILFFBQVosQ0FBcUJMLElBQW5DLENBQWpCOztBQUVBLGNBQUksQ0FBQ3BDLFFBQUwsRUFBZTtBQUNmLGdCQUFNSCxjQUFjRSxlQUFlQyxRQUFmLENBQXBCOztBQUVBLGNBQUlILFdBQUosRUFBaUI7QUFDZmdCLG9CQUFRWSxNQUFSLENBQWUsRUFBRVAsTUFBTTBCLFlBQVlILFFBQXBCLEVBQThCN0MsU0FBU0EsUUFBUUMsV0FBUixDQUF2QyxFQUFmO0FBQ0Q7O0FBRUQ7QUFDQWlELG1CQUFTRSxJQUFULENBQWNKLFlBQVlILFFBQVosQ0FBcUJMLElBQW5DO0FBQ0FFLHNCQUFZdEMsU0FBU3NDLFNBQXJCO0FBQ0FNLHdCQUFjQSxZQUFZSixNQUExQjtBQUNEO0FBQ0Y7QUFsREksS0FBUDtBQW9ERDtBQTNIYyxDQUFqQiIsImZpbGUiOiJuby1kZXByZWNhdGVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGRlY2xhcmVkU2NvcGUgZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9kZWNsYXJlZFNjb3BlJ1xuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuZnVuY3Rpb24gbWVzc2FnZShkZXByZWNhdGlvbikge1xuICByZXR1cm4gJ0RlcHJlY2F0ZWQnICsgKGRlcHJlY2F0aW9uLmRlc2NyaXB0aW9uID8gJzogJyArIGRlcHJlY2F0aW9uLmRlc2NyaXB0aW9uIDogJy4nKVxufVxuXG5mdW5jdGlvbiBnZXREZXByZWNhdGlvbihtZXRhZGF0YSkge1xuICBpZiAoIW1ldGFkYXRhIHx8ICFtZXRhZGF0YS5kb2MpIHJldHVyblxuXG4gIGxldCBkZXByZWNhdGlvblxuICBpZiAobWV0YWRhdGEuZG9jLnRhZ3Muc29tZSh0ID0+IHQudGl0bGUgPT09ICdkZXByZWNhdGVkJyAmJiAoZGVwcmVjYXRpb24gPSB0KSkpIHtcbiAgICByZXR1cm4gZGVwcmVjYXRpb25cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLWRlcHJlY2F0ZWQnKSxcbiAgICB9LFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBkZXByZWNhdGVkID0gbmV3IE1hcCgpXG4gICAgICAgICwgbmFtZXNwYWNlcyA9IG5ldyBNYXAoKVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTcGVjaWZpZXJzKG5vZGUpIHtcbiAgICAgIGlmIChub2RlLnR5cGUgIT09ICdJbXBvcnREZWNsYXJhdGlvbicpIHJldHVyblxuICAgICAgaWYgKG5vZGUuc291cmNlID09IG51bGwpIHJldHVybiAvLyBsb2NhbCBleHBvcnQsIGlnbm9yZVxuXG4gICAgICBjb25zdCBpbXBvcnRzID0gRXhwb3J0cy5nZXQobm9kZS5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICBpZiAoaW1wb3J0cyA9PSBudWxsKSByZXR1cm5cblxuICAgICAgbGV0IG1vZHVsZURlcHJlY2F0aW9uXG4gICAgICBpZiAoaW1wb3J0cy5kb2MgJiZcbiAgICAgICAgICBpbXBvcnRzLmRvYy50YWdzLnNvbWUodCA9PiB0LnRpdGxlID09PSAnZGVwcmVjYXRlZCcgJiYgKG1vZHVsZURlcHJlY2F0aW9uID0gdCkpKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHsgbm9kZSwgbWVzc2FnZTogbWVzc2FnZShtb2R1bGVEZXByZWNhdGlvbikgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKGltcG9ydHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICBpbXBvcnRzLnJlcG9ydEVycm9ycyhjb250ZXh0LCBub2RlKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgbm9kZS5zcGVjaWZpZXJzLmZvckVhY2goZnVuY3Rpb24gKGltKSB7XG4gICAgICAgIGxldCBpbXBvcnRlZCwgbG9jYWxcbiAgICAgICAgc3dpdGNoIChpbS50eXBlKSB7XG5cblxuICAgICAgICAgIGNhc2UgJ0ltcG9ydE5hbWVzcGFjZVNwZWNpZmllcic6e1xuICAgICAgICAgICAgaWYgKCFpbXBvcnRzLnNpemUpIHJldHVyblxuICAgICAgICAgICAgbmFtZXNwYWNlcy5zZXQoaW0ubG9jYWwubmFtZSwgaW1wb3J0cylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIGNhc2UgJ0ltcG9ydERlZmF1bHRTcGVjaWZpZXInOlxuICAgICAgICAgICAgaW1wb3J0ZWQgPSAnZGVmYXVsdCdcbiAgICAgICAgICAgIGxvY2FsID0gaW0ubG9jYWwubmFtZVxuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGNhc2UgJ0ltcG9ydFNwZWNpZmllcic6XG4gICAgICAgICAgICBpbXBvcnRlZCA9IGltLmltcG9ydGVkLm5hbWVcbiAgICAgICAgICAgIGxvY2FsID0gaW0ubG9jYWwubmFtZVxuICAgICAgICAgICAgYnJlYWtcblxuICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAvLyBjYW4ndCBoYW5kbGUgdGhpcyBvbmVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHVua25vd24gdGhpbmcgY2FuJ3QgYmUgZGVwcmVjYXRlZFxuICAgICAgICBjb25zdCBleHBvcnRlZCA9IGltcG9ydHMuZ2V0KGltcG9ydGVkKVxuICAgICAgICBpZiAoZXhwb3J0ZWQgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgLy8gY2FwdHVyZSBpbXBvcnQgb2YgZGVlcCBuYW1lc3BhY2VcbiAgICAgICAgaWYgKGV4cG9ydGVkLm5hbWVzcGFjZSkgbmFtZXNwYWNlcy5zZXQobG9jYWwsIGV4cG9ydGVkLm5hbWVzcGFjZSlcblxuICAgICAgICBjb25zdCBkZXByZWNhdGlvbiA9IGdldERlcHJlY2F0aW9uKGltcG9ydHMuZ2V0KGltcG9ydGVkKSlcbiAgICAgICAgaWYgKCFkZXByZWNhdGlvbikgcmV0dXJuXG5cbiAgICAgICAgY29udGV4dC5yZXBvcnQoeyBub2RlOiBpbSwgbWVzc2FnZTogbWVzc2FnZShkZXByZWNhdGlvbikgfSlcblxuICAgICAgICBkZXByZWNhdGVkLnNldChsb2NhbCwgZGVwcmVjYXRpb24pXG5cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdQcm9ncmFtJzogKHsgYm9keSB9KSA9PiBib2R5LmZvckVhY2goY2hlY2tTcGVjaWZpZXJzKSxcblxuICAgICAgJ0lkZW50aWZpZXInOiBmdW5jdGlvbiAobm9kZSkge1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nICYmIG5vZGUucGFyZW50LnByb3BlcnR5ID09PSBub2RlKSB7XG4gICAgICAgICAgcmV0dXJuIC8vIGhhbmRsZWQgYnkgTWVtYmVyRXhwcmVzc2lvblxuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWdub3JlIHNwZWNpZmllciBpZGVudGlmaWVyc1xuICAgICAgICBpZiAobm9kZS5wYXJlbnQudHlwZS5zbGljZSgwLCA2KSA9PT0gJ0ltcG9ydCcpIHJldHVyblxuXG4gICAgICAgIGlmICghZGVwcmVjYXRlZC5oYXMobm9kZS5uYW1lKSkgcmV0dXJuXG5cbiAgICAgICAgaWYgKGRlY2xhcmVkU2NvcGUoY29udGV4dCwgbm9kZS5uYW1lKSAhPT0gJ21vZHVsZScpIHJldHVyblxuICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgbm9kZSxcbiAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlKGRlcHJlY2F0ZWQuZ2V0KG5vZGUubmFtZSkpLFxuICAgICAgICB9KVxuICAgICAgfSxcblxuICAgICAgJ01lbWJlckV4cHJlc3Npb24nOiBmdW5jdGlvbiAoZGVyZWZlcmVuY2UpIHtcbiAgICAgICAgaWYgKGRlcmVmZXJlbmNlLm9iamVjdC50eXBlICE9PSAnSWRlbnRpZmllcicpIHJldHVyblxuICAgICAgICBpZiAoIW5hbWVzcGFjZXMuaGFzKGRlcmVmZXJlbmNlLm9iamVjdC5uYW1lKSkgcmV0dXJuXG5cbiAgICAgICAgaWYgKGRlY2xhcmVkU2NvcGUoY29udGV4dCwgZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpICE9PSAnbW9kdWxlJykgcmV0dXJuXG5cbiAgICAgICAgLy8gZ28gZGVlcFxuICAgICAgICB2YXIgbmFtZXNwYWNlID0gbmFtZXNwYWNlcy5nZXQoZGVyZWZlcmVuY2Uub2JqZWN0Lm5hbWUpXG4gICAgICAgIHZhciBuYW1lcGF0aCA9IFtkZXJlZmVyZW5jZS5vYmplY3QubmFtZV1cbiAgICAgICAgLy8gd2hpbGUgcHJvcGVydHkgaXMgbmFtZXNwYWNlIGFuZCBwYXJlbnQgaXMgbWVtYmVyIGV4cHJlc3Npb24sIGtlZXAgdmFsaWRhdGluZ1xuICAgICAgICB3aGlsZSAobmFtZXNwYWNlIGluc3RhbmNlb2YgRXhwb3J0cyAmJlxuICAgICAgICAgICAgICAgZGVyZWZlcmVuY2UudHlwZSA9PT0gJ01lbWJlckV4cHJlc3Npb24nKSB7XG5cbiAgICAgICAgICAvLyBpZ25vcmUgY29tcHV0ZWQgcGFydHMgZm9yIG5vd1xuICAgICAgICAgIGlmIChkZXJlZmVyZW5jZS5jb21wdXRlZCkgcmV0dXJuXG5cbiAgICAgICAgICBjb25zdCBtZXRhZGF0YSA9IG5hbWVzcGFjZS5nZXQoZGVyZWZlcmVuY2UucHJvcGVydHkubmFtZSlcblxuICAgICAgICAgIGlmICghbWV0YWRhdGEpIGJyZWFrXG4gICAgICAgICAgY29uc3QgZGVwcmVjYXRpb24gPSBnZXREZXByZWNhdGlvbihtZXRhZGF0YSlcblxuICAgICAgICAgIGlmIChkZXByZWNhdGlvbikge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoeyBub2RlOiBkZXJlZmVyZW5jZS5wcm9wZXJ0eSwgbWVzc2FnZTogbWVzc2FnZShkZXByZWNhdGlvbikgfSlcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBzdGFzaCBhbmQgcG9wXG4gICAgICAgICAgbmFtZXBhdGgucHVzaChkZXJlZmVyZW5jZS5wcm9wZXJ0eS5uYW1lKVxuICAgICAgICAgIG5hbWVzcGFjZSA9IG1ldGFkYXRhLm5hbWVzcGFjZVxuICAgICAgICAgIGRlcmVmZXJlbmNlID0gZGVyZWZlcmVuY2UucGFyZW50XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19