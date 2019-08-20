Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (_ref) {
  var template = _ref.template,
      t = _ref.types;

  var buildImport = template('\n    Promise.resolve().then(() => require(SOURCE))\n  ');

  return {
    inherits: _babelPluginSyntaxDynamicImport2['default'],

    visitor: {
      Import: function () {
        function Import(path) {
          var importArguments = path.parentPath.node.arguments;
          var isString = t.isStringLiteral(importArguments[0]) || t.isTemplateLiteral(importArguments[0]);
          if (isString) {
            t.removeComments(importArguments[0]);
          }
          var newImport = buildImport({
            SOURCE: isString ? importArguments : t.templateLiteral([t.templateElement({ raw: '', cooked: '' }), t.templateElement({ raw: '', cooked: '' }, true)], importArguments)
          });
          path.parentPath.replaceWith(newImport);
        }

        return Import;
      }()
    }
  };
};

var _babelPluginSyntaxDynamicImport = require('babel-plugin-syntax-dynamic-import');

var _babelPluginSyntaxDynamicImport2 = _interopRequireDefault(_babelPluginSyntaxDynamicImport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }