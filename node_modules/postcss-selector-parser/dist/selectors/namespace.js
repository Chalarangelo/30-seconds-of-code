'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssesc = require('cssesc');

var _cssesc2 = _interopRequireDefault(_cssesc);

var _util = require('../util');

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Namespace = function (_Node) {
    _inherits(Namespace, _Node);

    function Namespace() {
        _classCallCheck(this, Namespace);

        return _possibleConstructorReturn(this, _Node.apply(this, arguments));
    }

    Namespace.prototype.qualifiedName = function qualifiedName(value) {
        if (this.namespace) {
            return this.namespaceString + '|' + value;
        } else {
            return value;
        }
    };

    Namespace.prototype.toString = function toString() {
        return [this.rawSpaceBefore, this.qualifiedName(this.stringifyProperty("value")), this.rawSpaceAfter].join('');
    };

    _createClass(Namespace, [{
        key: 'namespace',
        get: function get() {
            return this._namespace;
        },
        set: function set(namespace) {
            if (namespace === true || namespace === "*" || namespace === "&") {
                this._namespace = namespace;
                if (this.raws) {
                    delete this.raws.namespace;
                }
                return;
            }

            var escaped = (0, _cssesc2.default)(namespace, { isIdentifier: true });
            this._namespace = namespace;
            if (escaped !== namespace) {
                (0, _util.ensureObject)(this, "raws");
                this.raws.namespace = escaped;
            } else if (this.raws) {
                delete this.raws.namespace;
            }
        }
    }, {
        key: 'ns',
        get: function get() {
            return this._namespace;
        },
        set: function set(namespace) {
            this.namespace = namespace;
        }
    }, {
        key: 'namespaceString',
        get: function get() {
            if (this.namespace) {
                var ns = this.stringifyProperty("namespace");
                if (ns === true) {
                    return '';
                } else {
                    return ns;
                }
            } else {
                return '';
            }
        }
    }]);

    return Namespace;
}(_node2.default);

exports.default = Namespace;
;
module.exports = exports['default'];