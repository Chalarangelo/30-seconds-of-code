'use strict';

exports.__esModule = true;

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var scss = {};
scss.tokenize = function (css) {
    var input = new _input2.default(css);
    return (0, _tokenize2.default)(input);
};

exports.default = scss;