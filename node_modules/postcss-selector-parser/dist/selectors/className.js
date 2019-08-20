'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssesc = require('cssesc');

var _cssesc2 = _interopRequireDefault(_cssesc);

var _util = require('../util');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassName = function (_Node) {
    _inherits(ClassName, _Node);

    function ClassName(opts) {
        _classCallCheck(this, ClassName);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        _this.type = _types.CLASS;
        _this._constructed = true;
        return _this;
    }

    ClassName.prototype.toString = function toString() {
        return [this.rawSpaceBefore, String('.' + this.stringifyProperty("value")), this.rawSpaceAfter].join('');
    };

    _createClass(ClassName, [{
        key: 'value',
        set: function set(v) {
            if (this._constructed) {
                var escaped = (0, _cssesc2.default)(v, { isIdentifier: true });
                if (escaped !== v) {
                    (0, _util.ensureObject)(this, "raws");
                    this.raws.value = escaped;
                } else if (this.raws) {
                    delete this.raws.value;
                }
            }
            this._value = v;
        },
        get: function get() {
            return this._value;
        }
    }]);

    return ClassName;
}(_node2.default);

exports.default = ClassName;
module.exports = exports['default'];