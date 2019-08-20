'use strict';

exports.__esModule = true;
exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = undefined;

var _attribute = require('./attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _className = require('./className');

var _className2 = _interopRequireDefault(_className);

var _combinator = require('./combinator');

var _combinator2 = _interopRequireDefault(_combinator);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _id = require('./id');

var _id2 = _interopRequireDefault(_id);

var _nesting = require('./nesting');

var _nesting2 = _interopRequireDefault(_nesting);

var _pseudo = require('./pseudo');

var _pseudo2 = _interopRequireDefault(_pseudo);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _universal = require('./universal');

var _universal2 = _interopRequireDefault(_universal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attribute = exports.attribute = function attribute(opts) {
  return new _attribute2.default(opts);
};
var className = exports.className = function className(opts) {
  return new _className2.default(opts);
};
var combinator = exports.combinator = function combinator(opts) {
  return new _combinator2.default(opts);
};
var comment = exports.comment = function comment(opts) {
  return new _comment2.default(opts);
};
var id = exports.id = function id(opts) {
  return new _id2.default(opts);
};
var nesting = exports.nesting = function nesting(opts) {
  return new _nesting2.default(opts);
};
var pseudo = exports.pseudo = function pseudo(opts) {
  return new _pseudo2.default(opts);
};
var root = exports.root = function root(opts) {
  return new _root2.default(opts);
};
var selector = exports.selector = function selector(opts) {
  return new _selector2.default(opts);
};
var string = exports.string = function string(opts) {
  return new _string2.default(opts);
};
var tag = exports.tag = function tag(opts) {
  return new _tag2.default(opts);
};
var universal = exports.universal = function universal(opts) {
  return new _universal2.default(opts);
};