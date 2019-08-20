"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImportSource = getImportSource;
exports.createDynamicImportTransform = createDynamicImportTransform;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function getImportSource(t, callNode) {
  var importArguments = callNode.arguments;

  var _importArguments = _slicedToArray(importArguments, 1),
      importPath = _importArguments[0];

  var isString = t.isStringLiteral(importPath) || t.isTemplateLiteral(importPath);

  if (isString) {
    t.removeComments(importPath);
    return importPath;
  }

  return t.templateLiteral([t.templateElement({
    raw: '',
    cooked: ''
  }), t.templateElement({
    raw: '',
    cooked: ''
  }, true)], importArguments);
}

function createDynamicImportTransform(_ref) {
  var template = _ref.template,
      t = _ref.types;
  var buildImport = template('Promise.resolve().then(() => MODULE)');
  return function (context, path) {
    var requireCall = t.callExpression(t.identifier('require'), [getImportSource(t, path.parent)]);
    var _context$opts$noInter = context.opts.noInterop,
        noInterop = _context$opts$noInter === undefined ? false : _context$opts$noInter;
    var MODULE = noInterop === true ? requireCall : t.callExpression(context.addHelper('interopRequireWildcard'), [requireCall]);
    var newImport = buildImport({
      MODULE: MODULE
    });
    path.parentPath.replaceWith(newImport);
  };
}