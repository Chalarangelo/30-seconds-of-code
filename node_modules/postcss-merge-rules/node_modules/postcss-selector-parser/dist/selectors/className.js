'use strict';

exports.__esModule = true;

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassName = function (_Namespace) {
    _inherits(ClassName, _Namespace);

    function ClassName(opts) {
        _classCallCheck(this, ClassName);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.CLASS;
        return _this;
    }

    ClassName.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String('.' + this.value), this.spaces.after].join('');
    };

    return ClassName;
}(_namespace2.default);

exports.default = ClassName;
module.exports = exports['default'];