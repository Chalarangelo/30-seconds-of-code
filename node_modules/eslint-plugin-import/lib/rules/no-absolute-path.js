'use strict';

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _importType = require('../core/importType');

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-absolute-path')
    },
    schema: [(0, _moduleVisitor.makeOptionsSchema)()]
  },

  create: function (context) {
    function reportIfAbsolute(source) {
      if ((0, _importType.isAbsolute)(source.value)) {
        context.report(source, 'Do not import modules using an absolute path');
      }
    }

    const options = Object.assign({ esmodule: true, commonjs: true }, context.options[0]);
    return (0, _moduleVisitor2.default)(reportIfAbsolute, options);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1hYnNvbHV0ZS1wYXRoLmpzIl0sIm5hbWVzIjpbIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwidHlwZSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJjcmVhdGUiLCJjb250ZXh0IiwicmVwb3J0SWZBYnNvbHV0ZSIsInNvdXJjZSIsInZhbHVlIiwicmVwb3J0Iiwib3B0aW9ucyIsIk9iamVjdCIsImFzc2lnbiIsImVzbW9kdWxlIiwiY29tbW9uanMiXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7QUFDQTs7QUFDQTs7Ozs7O0FBRUFBLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKQyxVQUFNLFlBREY7QUFFSkMsVUFBTTtBQUNKQyxXQUFLLHVCQUFRLGtCQUFSO0FBREQsS0FGRjtBQUtKQyxZQUFRLENBQUUsdUNBQUY7QUFMSixHQURTOztBQVNmQyxVQUFRLFVBQVVDLE9BQVYsRUFBbUI7QUFDekIsYUFBU0MsZ0JBQVQsQ0FBMEJDLE1BQTFCLEVBQWtDO0FBQ2hDLFVBQUksNEJBQVdBLE9BQU9DLEtBQWxCLENBQUosRUFBOEI7QUFDNUJILGdCQUFRSSxNQUFSLENBQWVGLE1BQWYsRUFBdUIsOENBQXZCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFNRyxVQUFVQyxPQUFPQyxNQUFQLENBQWMsRUFBRUMsVUFBVSxJQUFaLEVBQWtCQyxVQUFVLElBQTVCLEVBQWQsRUFBa0RULFFBQVFLLE9BQVIsQ0FBZ0IsQ0FBaEIsQ0FBbEQsQ0FBaEI7QUFDQSxXQUFPLDZCQUFjSixnQkFBZCxFQUFnQ0ksT0FBaEMsQ0FBUDtBQUNEO0FBbEJjLENBQWpCIiwiZmlsZSI6Im5vLWFic29sdXRlLXBhdGguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9kdWxlVmlzaXRvciwgeyBtYWtlT3B0aW9uc1NjaGVtYSB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCB7IGlzQWJzb2x1dGUgfSBmcm9tICcuLi9jb3JlL2ltcG9ydFR5cGUnXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLWFic29sdXRlLXBhdGgnKSxcbiAgICB9LFxuICAgIHNjaGVtYTogWyBtYWtlT3B0aW9uc1NjaGVtYSgpIF0sXG4gIH0sXG5cbiAgY3JlYXRlOiBmdW5jdGlvbiAoY29udGV4dCkge1xuICAgIGZ1bmN0aW9uIHJlcG9ydElmQWJzb2x1dGUoc291cmNlKSB7XG4gICAgICBpZiAoaXNBYnNvbHV0ZShzb3VyY2UudmFsdWUpKSB7XG4gICAgICAgIGNvbnRleHQucmVwb3J0KHNvdXJjZSwgJ0RvIG5vdCBpbXBvcnQgbW9kdWxlcyB1c2luZyBhbiBhYnNvbHV0ZSBwYXRoJylcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7IGVzbW9kdWxlOiB0cnVlLCBjb21tb25qczogdHJ1ZSB9LCBjb250ZXh0Lm9wdGlvbnNbMF0pXG4gICAgcmV0dXJuIG1vZHVsZVZpc2l0b3IocmVwb3J0SWZBYnNvbHV0ZSwgb3B0aW9ucylcbiAgfSxcbn1cbiJdfQ==