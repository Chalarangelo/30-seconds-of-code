'use strict';

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _ModuleCache = require('eslint-module-utils/ModuleCache');

var _ModuleCache2 = _interopRequireDefault(_ModuleCache);

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileOverview Ensures that an imported path exists, given resolution rules.
 * @author Ben Mosher
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      url: (0, _docsUrl2.default)('no-unresolved')
    },

    schema: [(0, _moduleVisitor.makeOptionsSchema)({
      caseSensitive: { type: 'boolean', default: true }
    })]
  },

  create: function (context) {

    function checkSourceValue(source) {
      const shouldCheckCase = !_resolve.CASE_SENSITIVE_FS && (!context.options[0] || context.options[0].caseSensitive !== false);

      const resolvedPath = (0, _resolve2.default)(source.value, context);

      if (resolvedPath === undefined) {
        context.report(source, `Unable to resolve path to module '${source.value}'.`);
      } else if (shouldCheckCase) {
        const cacheSettings = _ModuleCache2.default.getSettings(context.settings);
        if (!(0, _resolve.fileExistsWithCaseSync)(resolvedPath, cacheSettings)) {
          context.report(source, `Casing of ${source.value} does not match the underlying filesystem.`);
        }
      }
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, context.options[0]);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby11bnJlc29sdmVkLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwidHlwZSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJjYXNlU2Vuc2l0aXZlIiwiZGVmYXVsdCIsImNyZWF0ZSIsImNvbnRleHQiLCJjaGVja1NvdXJjZVZhbHVlIiwic291cmNlIiwic2hvdWxkQ2hlY2tDYXNlIiwiQ0FTRV9TRU5TSVRJVkVfRlMiLCJvcHRpb25zIiwicmVzb2x2ZWRQYXRoIiwidmFsdWUiLCJ1bmRlZmluZWQiLCJyZXBvcnQiLCJjYWNoZVNldHRpbmdzIiwiTW9kdWxlQ2FjaGUiLCJnZXRTZXR0aW5ncyIsInNldHRpbmdzIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFSQTs7Ozs7QUFVQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU0sU0FERjtBQUVKQyxVQUFNO0FBQ0pDLFdBQUssdUJBQVEsZUFBUjtBQURELEtBRkY7O0FBTUpDLFlBQVEsQ0FBRSxzQ0FBa0I7QUFDMUJDLHFCQUFlLEVBQUVKLE1BQU0sU0FBUixFQUFtQkssU0FBUyxJQUE1QjtBQURXLEtBQWxCLENBQUY7QUFOSixHQURTOztBQVlmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7O0FBRXpCLGFBQVNDLGdCQUFULENBQTBCQyxNQUExQixFQUFrQztBQUNoQyxZQUFNQyxrQkFBa0IsQ0FBQ0MsMEJBQUQsS0FDckIsQ0FBQ0osUUFBUUssT0FBUixDQUFnQixDQUFoQixDQUFELElBQXVCTCxRQUFRSyxPQUFSLENBQWdCLENBQWhCLEVBQW1CUixhQUFuQixLQUFxQyxLQUR2QyxDQUF4Qjs7QUFHQSxZQUFNUyxlQUFlLHVCQUFRSixPQUFPSyxLQUFmLEVBQXNCUCxPQUF0QixDQUFyQjs7QUFFQSxVQUFJTSxpQkFBaUJFLFNBQXJCLEVBQWdDO0FBQzlCUixnQkFBUVMsTUFBUixDQUFlUCxNQUFmLEVBQ0cscUNBQW9DQSxPQUFPSyxLQUFNLElBRHBEO0FBRUQsT0FIRCxNQUtLLElBQUlKLGVBQUosRUFBcUI7QUFDeEIsY0FBTU8sZ0JBQWdCQyxzQkFBWUMsV0FBWixDQUF3QlosUUFBUWEsUUFBaEMsQ0FBdEI7QUFDQSxZQUFJLENBQUMscUNBQXVCUCxZQUF2QixFQUFxQ0ksYUFBckMsQ0FBTCxFQUEwRDtBQUN4RFYsa0JBQVFTLE1BQVIsQ0FBZVAsTUFBZixFQUNHLGFBQVlBLE9BQU9LLEtBQU0sNENBRDVCO0FBRUQ7QUFFRjtBQUNGOztBQUVELFdBQU8sNkJBQWNOLGdCQUFkLEVBQWdDRCxRQUFRSyxPQUFSLENBQWdCLENBQWhCLENBQWhDLENBQVA7QUFFRDtBQXJDYyxDQUFqQiIsImZpbGUiOiJuby11bnJlc29sdmVkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IEVuc3VyZXMgdGhhdCBhbiBpbXBvcnRlZCBwYXRoIGV4aXN0cywgZ2l2ZW4gcmVzb2x1dGlvbiBydWxlcy5cbiAqIEBhdXRob3IgQmVuIE1vc2hlclxuICovXG5cbmltcG9ydCByZXNvbHZlLCB7IENBU0VfU0VOU0lUSVZFX0ZTLCBmaWxlRXhpc3RzV2l0aENhc2VTeW5jIH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9yZXNvbHZlJ1xuaW1wb3J0IE1vZHVsZUNhY2hlIGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvTW9kdWxlQ2FjaGUnXG5pbXBvcnQgbW9kdWxlVmlzaXRvciwgeyBtYWtlT3B0aW9uc1NjaGVtYSB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBtZXRhOiB7XG4gICAgdHlwZTogJ3Byb2JsZW0nLFxuICAgIGRvY3M6IHtcbiAgICAgIHVybDogZG9jc1VybCgnbm8tdW5yZXNvbHZlZCcpLFxuICAgIH0sXG5cbiAgICBzY2hlbWE6IFsgbWFrZU9wdGlvbnNTY2hlbWEoe1xuICAgICAgY2FzZVNlbnNpdGl2ZTogeyB0eXBlOiAnYm9vbGVhbicsIGRlZmF1bHQ6IHRydWUgfSxcbiAgICB9KV0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuXG4gICAgZnVuY3Rpb24gY2hlY2tTb3VyY2VWYWx1ZShzb3VyY2UpIHtcbiAgICAgIGNvbnN0IHNob3VsZENoZWNrQ2FzZSA9ICFDQVNFX1NFTlNJVElWRV9GUyAmJlxuICAgICAgICAoIWNvbnRleHQub3B0aW9uc1swXSB8fCBjb250ZXh0Lm9wdGlvbnNbMF0uY2FzZVNlbnNpdGl2ZSAhPT0gZmFsc2UpXG5cbiAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHJlc29sdmUoc291cmNlLnZhbHVlLCBjb250ZXh0KVxuXG4gICAgICBpZiAocmVzb2x2ZWRQYXRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQoc291cmNlLFxuICAgICAgICAgIGBVbmFibGUgdG8gcmVzb2x2ZSBwYXRoIHRvIG1vZHVsZSAnJHtzb3VyY2UudmFsdWV9Jy5gKVxuICAgICAgfVxuXG4gICAgICBlbHNlIGlmIChzaG91bGRDaGVja0Nhc2UpIHtcbiAgICAgICAgY29uc3QgY2FjaGVTZXR0aW5ncyA9IE1vZHVsZUNhY2hlLmdldFNldHRpbmdzKGNvbnRleHQuc2V0dGluZ3MpXG4gICAgICAgIGlmICghZmlsZUV4aXN0c1dpdGhDYXNlU3luYyhyZXNvbHZlZFBhdGgsIGNhY2hlU2V0dGluZ3MpKSB7XG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoc291cmNlLFxuICAgICAgICAgICAgYENhc2luZyBvZiAke3NvdXJjZS52YWx1ZX0gZG9lcyBub3QgbWF0Y2ggdGhlIHVuZGVybHlpbmcgZmlsZXN5c3RlbS5gKVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbW9kdWxlVmlzaXRvcihjaGVja1NvdXJjZVZhbHVlLCBjb250ZXh0Lm9wdGlvbnNbMF0pXG5cbiAgfSxcbn1cbiJdfQ==