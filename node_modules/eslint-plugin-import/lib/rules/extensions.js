'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _importType = require('../core/importType');

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const enumValues = { enum: ['always', 'ignorePackages', 'never'] };
const patternProperties = {
  type: 'object',
  patternProperties: { '.*': enumValues }
};
const properties = {
  type: 'object',
  properties: {
    'pattern': patternProperties,
    'ignorePackages': { type: 'boolean' }
  }
};

function buildProperties(context) {

  const result = {
    defaultConfig: 'never',
    pattern: {},
    ignorePackages: false
  };

  context.options.forEach(obj => {

    // If this is a string, set defaultConfig to its value
    if (typeof obj === 'string') {
      result.defaultConfig = obj;
      return;
    }

    // If this is not the new structure, transfer all props to result.pattern
    if (obj.pattern === undefined && obj.ignorePackages === undefined) {
      Object.assign(result.pattern, obj);
      return;
    }

    // If pattern is provided, transfer all props
    if (obj.pattern !== undefined) {
      Object.assign(result.pattern, obj.pattern);
    }

    // If ignorePackages is provided, transfer it to result
    if (obj.ignorePackages !== undefined) {
      result.ignorePackages = obj.ignorePackages;
    }
  });

  return result;
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('extensions')
    },

    schema: {
      anyOf: [{
        type: 'array',
        items: [enumValues],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [properties],
        additionalItems: false
      }, {
        type: 'array',
        items: [patternProperties],
        additionalItems: false
      }, {
        type: 'array',
        items: [enumValues, patternProperties],
        additionalItems: false
      }]
    }
  },

  create: function (context) {

    const props = buildProperties(context);

    function getModifier(extension) {
      return props.pattern[extension] || props.defaultConfig;
    }

    function isUseOfExtensionRequired(extension, isPackageMain) {
      return getModifier(extension) === 'always' && (!props.ignorePackages || !isPackageMain);
    }

    function isUseOfExtensionForbidden(extension) {
      return getModifier(extension) === 'never';
    }

    function isResolvableWithoutExtension(file) {
      const extension = _path2.default.extname(file);
      const fileWithoutExtension = file.slice(0, -extension.length);
      const resolvedFileWithoutExtension = (0, _resolve2.default)(fileWithoutExtension, context);

      return resolvedFileWithoutExtension === (0, _resolve2.default)(file, context);
    }

    function checkFileExtension(node) {
      const source = node.source;

      // bail if the declaration doesn't have a source, e.g. "export { foo };"

      if (!source) return;

      const importPath = source.value;

      // don't enforce anything on builtins
      if ((0, _importType.isBuiltIn)(importPath, context.settings)) return;

      const resolvedPath = (0, _resolve2.default)(importPath, context);

      // get extension from resolved path, if possible.
      // for unresolved, use source value.
      const extension = _path2.default.extname(resolvedPath || importPath).substring(1);

      // determine if this is a module
      const isPackageMain = (0, _importType.isExternalModuleMain)(importPath, context.settings) || (0, _importType.isScopedMain)(importPath);

      if (!extension || !importPath.endsWith(`.${extension}`)) {
        const extensionRequired = isUseOfExtensionRequired(extension, isPackageMain);
        const extensionForbidden = isUseOfExtensionForbidden(extension);
        if (extensionRequired && !extensionForbidden) {
          context.report({
            node: source,
            message: `Missing file extension ${extension ? `"${extension}" ` : ''}for "${importPath}"`
          });
        }
      } else if (extension) {
        if (isUseOfExtensionForbidden(extension) && isResolvableWithoutExtension(importPath)) {
          context.report({
            node: source,
            message: `Unexpected use of file extension "${extension}" for "${importPath}"`
          });
        }
      }
    }

    return {
      ImportDeclaration: checkFileExtension,
      ExportNamedDeclaration: checkFileExtension
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9leHRlbnNpb25zLmpzIl0sIm5hbWVzIjpbImVudW1WYWx1ZXMiLCJlbnVtIiwicGF0dGVyblByb3BlcnRpZXMiLCJ0eXBlIiwicHJvcGVydGllcyIsImJ1aWxkUHJvcGVydGllcyIsImNvbnRleHQiLCJyZXN1bHQiLCJkZWZhdWx0Q29uZmlnIiwicGF0dGVybiIsImlnbm9yZVBhY2thZ2VzIiwib3B0aW9ucyIsImZvckVhY2giLCJvYmoiLCJ1bmRlZmluZWQiLCJPYmplY3QiLCJhc3NpZ24iLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJhbnlPZiIsIml0ZW1zIiwiYWRkaXRpb25hbEl0ZW1zIiwiY3JlYXRlIiwicHJvcHMiLCJnZXRNb2RpZmllciIsImV4dGVuc2lvbiIsImlzVXNlT2ZFeHRlbnNpb25SZXF1aXJlZCIsImlzUGFja2FnZU1haW4iLCJpc1VzZU9mRXh0ZW5zaW9uRm9yYmlkZGVuIiwiaXNSZXNvbHZhYmxlV2l0aG91dEV4dGVuc2lvbiIsImZpbGUiLCJwYXRoIiwiZXh0bmFtZSIsImZpbGVXaXRob3V0RXh0ZW5zaW9uIiwic2xpY2UiLCJsZW5ndGgiLCJyZXNvbHZlZEZpbGVXaXRob3V0RXh0ZW5zaW9uIiwiY2hlY2tGaWxlRXh0ZW5zaW9uIiwibm9kZSIsInNvdXJjZSIsImltcG9ydFBhdGgiLCJ2YWx1ZSIsInNldHRpbmdzIiwicmVzb2x2ZWRQYXRoIiwic3Vic3RyaW5nIiwiZW5kc1dpdGgiLCJleHRlbnNpb25SZXF1aXJlZCIsImV4dGVuc2lvbkZvcmJpZGRlbiIsInJlcG9ydCIsIm1lc3NhZ2UiLCJJbXBvcnREZWNsYXJhdGlvbiIsIkV4cG9ydE5hbWVkRGVjbGFyYXRpb24iXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOztBQUNBOzs7Ozs7QUFFQSxNQUFNQSxhQUFhLEVBQUVDLE1BQU0sQ0FBRSxRQUFGLEVBQVksZ0JBQVosRUFBOEIsT0FB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SUFBR0EsU0FBVSxJQUExQixHQUFnQyxFQUFHLFFBQU9lLFVBQVc7QUFIcEUsV0FBZjtBQUtEO0FBQ0YsT0FWRCxNQVVPLElBQUlmLFNBQUosRUFBZTtBQUNwQixZQUFJRywwQkFBMEJILFNBQTFCLEtBQXdDSSw2QkFBNkJXLFVBQTdCLENBQTVDLEVBQXNGO0FBQ3BGdEMsa0JBQVE4QyxNQUFSLENBQWU7QUFDYlYsa0JBQU1DLE1BRE87QUFFYlUscUJBQVUscUNBQW9DeEIsU0FBVSxVQUFTZSxVQUFXO0FBRi9ELFdBQWY7QUFJRDtBQUNGO0FBQ0Y7O0FBRUQsV0FBTztBQUNMVSx5QkFBbUJiLGtCQURkO0FBRUxjLDhCQUF3QmQ7QUFGbkIsS0FBUDtBQUlEO0FBakhjLENBQWpCIiwiZmlsZSI6ImV4dGVuc2lvbnMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuXG5pbXBvcnQgcmVzb2x2ZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3Jlc29sdmUnXG5pbXBvcnQgeyBpc0J1aWx0SW4sIGlzRXh0ZXJuYWxNb2R1bGVNYWluLCBpc1Njb3BlZE1haW4gfSBmcm9tICcuLi9jb3JlL2ltcG9ydFR5cGUnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5jb25zdCBlbnVtVmFsdWVzID0geyBlbnVtOiBbICdhbHdheXMnLCAnaWdub3JlUGFja2FnZXMnLCAnbmV2ZXInIF0gfVxuY29uc3QgcGF0dGVyblByb3BlcnRpZXMgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwYXR0ZXJuUHJvcGVydGllczogeyAnLionOiBlbnVtVmFsdWVzIH0sXG59XG5jb25zdCBwcm9wZXJ0aWVzID0ge1xuICB0eXBlOiAnb2JqZWN0JyxcbiAgcHJvcGVydGllczoge1xuICAgICdwYXR0ZXJuJzogcGF0dGVyblByb3BlcnRpZXMsXG4gICAgJ2lnbm9yZVBhY2thZ2VzJzogeyB0eXBlOiAnYm9vbGVhbicgfSxcbiAgfSxcbn1cblxuZnVuY3Rpb24gYnVpbGRQcm9wZXJ0aWVzKGNvbnRleHQpIHtcblxuICAgIGNvbnN0IHJlc3VsdCA9IHtcbiAgICAgIGRlZmF1bHRDb25maWc6ICduZXZlcicsXG4gICAgICBwYXR0ZXJuOiB7fSxcbiAgICAgIGlnbm9yZVBhY2thZ2VzOiBmYWxzZSxcbiAgICB9XG5cbiAgICBjb250ZXh0Lm9wdGlvbnMuZm9yRWFjaChvYmogPT4ge1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgc3RyaW5nLCBzZXQgZGVmYXVsdENvbmZpZyB0byBpdHMgdmFsdWVcbiAgICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQuZGVmYXVsdENvbmZpZyA9IG9ialxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gSWYgdGhpcyBpcyBub3QgdGhlIG5ldyBzdHJ1Y3R1cmUsIHRyYW5zZmVyIGFsbCBwcm9wcyB0byByZXN1bHQucGF0dGVyblxuICAgICAgaWYgKG9iai5wYXR0ZXJuID09PSB1bmRlZmluZWQgJiYgb2JqLmlnbm9yZVBhY2thZ2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQucGF0dGVybiwgb2JqKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgLy8gSWYgcGF0dGVybiBpcyBwcm92aWRlZCwgdHJhbnNmZXIgYWxsIHByb3BzXG4gICAgICBpZiAob2JqLnBhdHRlcm4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBPYmplY3QuYXNzaWduKHJlc3VsdC5wYXR0ZXJuLCBvYmoucGF0dGVybilcbiAgICAgIH1cblxuICAgICAgLy8gSWYgaWdub3JlUGFja2FnZXMgaXMgcHJvdmlkZWQsIHRyYW5zZmVyIGl0IHRvIHJlc3VsdFxuICAgICAgaWYgKG9iai5pZ25vcmVQYWNrYWdlcyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJlc3VsdC5pZ25vcmVQYWNrYWdlcyA9IG9iai5pZ25vcmVQYWNrYWdlc1xuICAgICAgfVxuICAgIH0pXG5cbiAgICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3N1Z2dlc3Rpb24nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnZXh0ZW5zaW9ucycpLFxuICAgIH0sXG5cbiAgICBzY2hlbWE6IHtcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbZW51bVZhbHVlc10sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIGVudW1WYWx1ZXMsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdhcnJheScsXG4gICAgICAgICAgaXRlbXM6IFtwcm9wZXJ0aWVzXSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW3BhdHRlcm5Qcm9wZXJ0aWVzXSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgZW51bVZhbHVlcyxcbiAgICAgICAgICAgIHBhdHRlcm5Qcm9wZXJ0aWVzLFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG5cbiAgICBjb25zdCBwcm9wcyA9IGJ1aWxkUHJvcGVydGllcyhjb250ZXh0KVxuXG4gICAgZnVuY3Rpb24gZ2V0TW9kaWZpZXIoZXh0ZW5zaW9uKSB7XG4gICAgICByZXR1cm4gcHJvcHMucGF0dGVybltleHRlbnNpb25dIHx8IHByb3BzLmRlZmF1bHRDb25maWdcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1VzZU9mRXh0ZW5zaW9uUmVxdWlyZWQoZXh0ZW5zaW9uLCBpc1BhY2thZ2VNYWluKSB7XG4gICAgICByZXR1cm4gZ2V0TW9kaWZpZXIoZXh0ZW5zaW9uKSA9PT0gJ2Fsd2F5cycgJiYgKCFwcm9wcy5pZ25vcmVQYWNrYWdlcyB8fCAhaXNQYWNrYWdlTWFpbilcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1VzZU9mRXh0ZW5zaW9uRm9yYmlkZGVuKGV4dGVuc2lvbikge1xuICAgICAgcmV0dXJuIGdldE1vZGlmaWVyKGV4dGVuc2lvbikgPT09ICduZXZlcidcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpc1Jlc29sdmFibGVXaXRob3V0RXh0ZW5zaW9uKGZpbGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuc2lvbiA9IHBhdGguZXh0bmFtZShmaWxlKVxuICAgICAgY29uc3QgZmlsZVdpdGhvdXRFeHRlbnNpb24gPSBmaWxlLnNsaWNlKDAsIC1leHRlbnNpb24ubGVuZ3RoKVxuICAgICAgY29uc3QgcmVzb2x2ZWRGaWxlV2l0aG91dEV4dGVuc2lvbiA9IHJlc29sdmUoZmlsZVdpdGhvdXRFeHRlbnNpb24sIGNvbnRleHQpXG5cbiAgICAgIHJldHVybiByZXNvbHZlZEZpbGVXaXRob3V0RXh0ZW5zaW9uID09PSByZXNvbHZlKGZpbGUsIGNvbnRleHQpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tGaWxlRXh0ZW5zaW9uKG5vZGUpIHtcbiAgICAgIGNvbnN0IHsgc291cmNlIH0gPSBub2RlXG5cbiAgICAgIC8vIGJhaWwgaWYgdGhlIGRlY2xhcmF0aW9uIGRvZXNuJ3QgaGF2ZSBhIHNvdXJjZSwgZS5nLiBcImV4cG9ydCB7IGZvbyB9O1wiXG4gICAgICBpZiAoIXNvdXJjZSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IGltcG9ydFBhdGggPSBzb3VyY2UudmFsdWVcblxuICAgICAgLy8gZG9uJ3QgZW5mb3JjZSBhbnl0aGluZyBvbiBidWlsdGluc1xuICAgICAgaWYgKGlzQnVpbHRJbihpbXBvcnRQYXRoLCBjb250ZXh0LnNldHRpbmdzKSkgcmV0dXJuXG5cbiAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHJlc29sdmUoaW1wb3J0UGF0aCwgY29udGV4dClcblxuICAgICAgLy8gZ2V0IGV4dGVuc2lvbiBmcm9tIHJlc29sdmVkIHBhdGgsIGlmIHBvc3NpYmxlLlxuICAgICAgLy8gZm9yIHVucmVzb2x2ZWQsIHVzZSBzb3VyY2UgdmFsdWUuXG4gICAgICBjb25zdCBleHRlbnNpb24gPSBwYXRoLmV4dG5hbWUocmVzb2x2ZWRQYXRoIHx8IGltcG9ydFBhdGgpLnN1YnN0cmluZygxKVxuXG4gICAgICAvLyBkZXRlcm1pbmUgaWYgdGhpcyBpcyBhIG1vZHVsZVxuICAgICAgY29uc3QgaXNQYWNrYWdlTWFpbiA9IGlzRXh0ZXJuYWxNb2R1bGVNYWluKGltcG9ydFBhdGgsIGNvbnRleHQuc2V0dGluZ3MpXG4gICAgICAgIHx8IGlzU2NvcGVkTWFpbihpbXBvcnRQYXRoKVxuXG4gICAgICBpZiAoIWV4dGVuc2lvbiB8fCAhaW1wb3J0UGF0aC5lbmRzV2l0aChgLiR7ZXh0ZW5zaW9ufWApKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuc2lvblJlcXVpcmVkID0gaXNVc2VPZkV4dGVuc2lvblJlcXVpcmVkKGV4dGVuc2lvbiwgaXNQYWNrYWdlTWFpbilcbiAgICAgICAgY29uc3QgZXh0ZW5zaW9uRm9yYmlkZGVuID0gaXNVc2VPZkV4dGVuc2lvbkZvcmJpZGRlbihleHRlbnNpb24pXG4gICAgICAgIGlmIChleHRlbnNpb25SZXF1aXJlZCAmJiAhZXh0ZW5zaW9uRm9yYmlkZGVuKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgICAgbm9kZTogc291cmNlLFxuICAgICAgICAgICAgbWVzc2FnZTpcbiAgICAgICAgICAgICAgYE1pc3NpbmcgZmlsZSBleHRlbnNpb24gJHtleHRlbnNpb24gPyBgXCIke2V4dGVuc2lvbn1cIiBgIDogJyd9Zm9yIFwiJHtpbXBvcnRQYXRofVwiYCxcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKGV4dGVuc2lvbikge1xuICAgICAgICBpZiAoaXNVc2VPZkV4dGVuc2lvbkZvcmJpZGRlbihleHRlbnNpb24pICYmIGlzUmVzb2x2YWJsZVdpdGhvdXRFeHRlbnNpb24oaW1wb3J0UGF0aCkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7XG4gICAgICAgICAgICBub2RlOiBzb3VyY2UsXG4gICAgICAgICAgICBtZXNzYWdlOiBgVW5leHBlY3RlZCB1c2Ugb2YgZmlsZSBleHRlbnNpb24gXCIke2V4dGVuc2lvbn1cIiBmb3IgXCIke2ltcG9ydFBhdGh9XCJgLFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgSW1wb3J0RGVjbGFyYXRpb246IGNoZWNrRmlsZUV4dGVuc2lvbixcbiAgICAgIEV4cG9ydE5hbWVkRGVjbGFyYXRpb246IGNoZWNrRmlsZUV4dGVuc2lvbixcbiAgICB9XG4gIH0sXG59XG4iXX0=