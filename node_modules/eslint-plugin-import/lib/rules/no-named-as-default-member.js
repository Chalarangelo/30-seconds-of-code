'use strict';

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _importDeclaration = require('../importDeclaration');

var _importDeclaration2 = _interopRequireDefault(_importDeclaration);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-named-as-default-member')
    }
  },

  create: function (context) {

    const fileImports = new Map();
    const allPropertyLookups = new Map();

    function handleImportDefault(node) {
      const declaration = (0, _importDeclaration2.default)(context);
      const exportMap = _ExportMap2.default.get(declaration.source.value, context);
      if (exportMap == null) return;

      if (exportMap.errors.length) {
        exportMap.reportErrors(context, declaration);
        return;
      }

      fileImports.set(node.local.name, {
        exportMap,
        sourcePath: declaration.source.value
      });
    }

    function storePropertyLookup(objectName, propName, node) {
      const lookups = allPropertyLookups.get(objectName) || [];
      lookups.push({ node, propName });
      allPropertyLookups.set(objectName, lookups);
    }

    function handlePropLookup(node) {
      const objectName = node.object.name;
      const propName = node.property.name;
      storePropertyLookup(objectName, propName, node);
    }

    function handleDestructuringAssignment(node) {
      const isDestructure = node.id.type === 'ObjectPattern' && node.init != null && node.init.type === 'Identifier';
      if (!isDestructure) return;

      const objectName = node.init.name;
      for (const _ref of node.id.properties) {
        const key = _ref.key;

        if (key == null) continue; // true for rest properties
        storePropertyLookup(objectName, key.name, key);
      }
    }

    function handleProgramExit() {
      allPropertyLookups.forEach((lookups, objectName) => {
        const fileImport = fileImports.get(objectName);
        if (fileImport == null) return;

        for (const _ref2 of lookups) {
          const propName = _ref2.propName;
          const node = _ref2.node;

          // the default import can have a "default" property
          if (propName === 'default') continue;
          if (!fileImport.exportMap.namespace.has(propName)) continue;

          context.report({
            node,
            message: `Caution: \`${objectName}\` also has a named export ` + `\`${propName}\`. Check if you meant to write ` + `\`import {${propName}} from '${fileImport.sourcePath}'\` ` + 'instead.'
          });
        }
      });
    }

    return {
      'ImportDefaultSpecifier': handleImportDefault,
      'MemberExpression': handlePropLookup,
      'VariableDeclarator': handleDestructuringAssignment,
      'Program:exit': handleProgramExit
    };
  }
}; /**
    * @fileoverview Rule to warn about potentially confused use of name exports
    * @author Desmond Brand
    * @copyright 2016 Desmond Brand. All rights reserved.
    * See LICENSE in root directory for full license.
    */
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlci5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsInR5cGUiLCJkb2NzIiwidXJsIiwiY3JlYXRlIiwiY29udGV4dCIsImZpbGVJbXBvcnRzIiwiTWFwIiwiYWxsUHJvcGVydHlMb29rdXBzIiwiaGFuZGxlSW1wb3J0RGVmYXVsdCIsIm5vZGUiLCJkZWNsYXJhdGlvbiIsImV4cG9ydE1hcCIsIkV4cG9ydHMiLCJnZXQiLCJzb3VyY2UiLCJ2YWx1ZSIsImVycm9ycyIsImxlbmd0aCIsInJlcG9ydEVycm9ycyIsInNldCIsImxvY2FsIiwibmFtZSIsInNvdXJjZVBhdGgiLCJzdG9yZVByb3BlcnR5TG9va3VwIiwib2JqZWN0TmFtZSIsInByb3BOYW1lIiwibG9va3VwcyIsInB1c2giLCJoYW5kbGVQcm9wTG9va3VwIiwib2JqZWN0IiwicHJvcGVydHkiLCJoYW5kbGVEZXN0cnVjdHVyaW5nQXNzaWdubWVudCIsImlzRGVzdHJ1Y3R1cmUiLCJpZCIsImluaXQiLCJwcm9wZXJ0aWVzIiwia2V5IiwiaGFuZGxlUHJvZ3JhbUV4aXQiLCJmb3JFYWNoIiwiZmlsZUltcG9ydCIsIm5hbWVzcGFjZSIsImhhcyIsInJlcG9ydCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7O0FBTUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQTtBQUNBO0FBQ0E7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFlBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLDRCQUFSO0FBREQ7QUFGRixHQURTOztBQVFmQyxVQUFRLFVBQVNDLE9BQVQsRUFBa0I7O0FBRXhCLFVBQU1DLGNBQWMsSUFBSUMsR0FBSixFQUFwQjtBQUNBLFVBQU1DLHFCQUFxQixJQUFJRCxHQUFKLEVBQTNCOztBQUVBLGFBQVNFLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQztBQUNq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O0FBTUQ7QUFyRmMsQ0FBakIsQyxDQWRBIiwiZmlsZSI6Im5vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gd2FybiBhYm91dCBwb3RlbnRpYWxseSBjb25mdXNlZCB1c2Ugb2YgbmFtZSBleHBvcnRzXG4gKiBAYXV0aG9yIERlc21vbmQgQnJhbmRcbiAqIEBjb3B5cmlnaHQgMjAxNiBEZXNtb25kIEJyYW5kLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogU2VlIExJQ0VOU0UgaW4gcm9vdCBkaXJlY3RvcnkgZm9yIGZ1bGwgbGljZW5zZS5cbiAqL1xuaW1wb3J0IEV4cG9ydHMgZnJvbSAnLi4vRXhwb3J0TWFwJ1xuaW1wb3J0IGltcG9ydERlY2xhcmF0aW9uIGZyb20gJy4uL2ltcG9ydERlY2xhcmF0aW9uJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFJ1bGUgRGVmaW5pdGlvblxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlcicpLFxuICAgIH0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbihjb250ZXh0KSB7XG5cbiAgICBjb25zdCBmaWxlSW1wb3J0cyA9IG5ldyBNYXAoKVxuICAgIGNvbnN0IGFsbFByb3BlcnR5TG9va3VwcyA9IG5ldyBNYXAoKVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlSW1wb3J0RGVmYXVsdChub2RlKSB7XG4gICAgICBjb25zdCBkZWNsYXJhdGlvbiA9IGltcG9ydERlY2xhcmF0aW9uKGNvbnRleHQpXG4gICAgICBjb25zdCBleHBvcnRNYXAgPSBFeHBvcnRzLmdldChkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsIGNvbnRleHQpXG4gICAgICBpZiAoZXhwb3J0TWFwID09IG51bGwpIHJldHVyblxuXG4gICAgICBpZiAoZXhwb3J0TWFwLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgZXhwb3J0TWFwLnJlcG9ydEVycm9ycyhjb250ZXh0LCBkZWNsYXJhdGlvbilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGZpbGVJbXBvcnRzLnNldChub2RlLmxvY2FsLm5hbWUsIHtcbiAgICAgICAgZXhwb3J0TWFwLFxuICAgICAgICBzb3VyY2VQYXRoOiBkZWNsYXJhdGlvbi5zb3VyY2UudmFsdWUsXG4gICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0b3JlUHJvcGVydHlMb29rdXAob2JqZWN0TmFtZSwgcHJvcE5hbWUsIG5vZGUpIHtcbiAgICAgIGNvbnN0IGxvb2t1cHMgPSBhbGxQcm9wZXJ0eUxvb2t1cHMuZ2V0KG9iamVjdE5hbWUpIHx8IFtdXG4gICAgICBsb29rdXBzLnB1c2goe25vZGUsIHByb3BOYW1lfSlcbiAgICAgIGFsbFByb3BlcnR5TG9va3Vwcy5zZXQob2JqZWN0TmFtZSwgbG9va3VwcylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVQcm9wTG9va3VwKG5vZGUpIHtcbiAgICAgIGNvbnN0IG9iamVjdE5hbWUgPSBub2RlLm9iamVjdC5uYW1lXG4gICAgICBjb25zdCBwcm9wTmFtZSA9IG5vZGUucHJvcGVydHkubmFtZVxuICAgICAgc3RvcmVQcm9wZXJ0eUxvb2t1cChvYmplY3ROYW1lLCBwcm9wTmFtZSwgbm9kZSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVEZXN0cnVjdHVyaW5nQXNzaWdubWVudChub2RlKSB7XG4gICAgICBjb25zdCBpc0Rlc3RydWN0dXJlID0gKFxuICAgICAgICBub2RlLmlkLnR5cGUgPT09ICdPYmplY3RQYXR0ZXJuJyAmJlxuICAgICAgICBub2RlLmluaXQgIT0gbnVsbCAmJlxuICAgICAgICBub2RlLmluaXQudHlwZSA9PT0gJ0lkZW50aWZpZXInXG4gICAgICApXG4gICAgICBpZiAoIWlzRGVzdHJ1Y3R1cmUpIHJldHVyblxuXG4gICAgICBjb25zdCBvYmplY3ROYW1lID0gbm9kZS5pbml0Lm5hbWVcbiAgICAgIGZvciAoY29uc3QgeyBrZXkgfSBvZiBub2RlLmlkLnByb3BlcnRpZXMpIHtcbiAgICAgICAgaWYgKGtleSA9PSBudWxsKSBjb250aW51ZSAgLy8gdHJ1ZSBmb3IgcmVzdCBwcm9wZXJ0aWVzXG4gICAgICAgIHN0b3JlUHJvcGVydHlMb29rdXAob2JqZWN0TmFtZSwga2V5Lm5hbWUsIGtleSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVQcm9ncmFtRXhpdCgpIHtcbiAgICAgIGFsbFByb3BlcnR5TG9va3Vwcy5mb3JFYWNoKChsb29rdXBzLCBvYmplY3ROYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpbGVJbXBvcnQgPSBmaWxlSW1wb3J0cy5nZXQob2JqZWN0TmFtZSlcbiAgICAgICAgaWYgKGZpbGVJbXBvcnQgPT0gbnVsbCkgcmV0dXJuXG5cbiAgICAgICAgZm9yIChjb25zdCB7cHJvcE5hbWUsIG5vZGV9IG9mIGxvb2t1cHMpIHtcbiAgICAgICAgICAvLyB0aGUgZGVmYXVsdCBpbXBvcnQgY2FuIGhhdmUgYSBcImRlZmF1bHRcIiBwcm9wZXJ0eVxuICAgICAgICAgIGlmIChwcm9wTmFtZSA9PT0gJ2RlZmF1bHQnKSBjb250aW51ZVxuICAgICAgICAgIGlmICghZmlsZUltcG9ydC5leHBvcnRNYXAubmFtZXNwYWNlLmhhcyhwcm9wTmFtZSkpIGNvbnRpbnVlXG5cbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICBub2RlLFxuICAgICAgICAgICAgbWVzc2FnZTogKFxuICAgICAgICAgICAgICBgQ2F1dGlvbjogXFxgJHtvYmplY3ROYW1lfVxcYCBhbHNvIGhhcyBhIG5hbWVkIGV4cG9ydCBgICtcbiAgICAgICAgICAgICAgYFxcYCR7cHJvcE5hbWV9XFxgLiBDaGVjayBpZiB5b3UgbWVhbnQgdG8gd3JpdGUgYCArXG4gICAgICAgICAgICAgIGBcXGBpbXBvcnQgeyR7cHJvcE5hbWV9fSBmcm9tICcke2ZpbGVJbXBvcnQuc291cmNlUGF0aH0nXFxgIGAgK1xuICAgICAgICAgICAgICAnaW5zdGVhZC4nXG4gICAgICAgICAgICApLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICdJbXBvcnREZWZhdWx0U3BlY2lmaWVyJzogaGFuZGxlSW1wb3J0RGVmYXVsdCxcbiAgICAgICdNZW1iZXJFeHByZXNzaW9uJzogaGFuZGxlUHJvcExvb2t1cCxcbiAgICAgICdWYXJpYWJsZURlY2xhcmF0b3InOiBoYW5kbGVEZXN0cnVjdHVyaW5nQXNzaWdubWVudCxcbiAgICAgICdQcm9ncmFtOmV4aXQnOiBoYW5kbGVQcm9ncmFtRXhpdCxcbiAgICB9XG4gIH0sXG59XG4iXX0=