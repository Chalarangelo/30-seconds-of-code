"use strict";

exports.__esModule = true;

var _CSSESC_QUOTE_OPTIONS;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.unescapeValue = unescapeValue;

var _cssesc = require("cssesc");

var _cssesc2 = _interopRequireDefault(_cssesc);

var _unesc = require("../util/unesc");

var _unesc2 = _interopRequireDefault(_unesc);

var _namespace = require("./namespace");

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require("./types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _require = require("util"),
    deprecate = _require.deprecate;

var WRAPPED_IN_QUOTES = /^('|")(.*)\1$/;

var warnOfDeprecatedValueAssignment = deprecate(function () {}, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. " + "Call attribute.setValue() instead.");

var warnOfDeprecatedQuotedAssignment = deprecate(function () {}, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead.");

var warnOfDeprecatedConstructor = deprecate(function () {}, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");

function unescapeValue(value) {
    var deprecatedUsage = false;
    var quoteMark = null;
    var unescaped = value;
    var m = unescaped.match(WRAPPED_IN_QUOTES);
    if (m) {
        quoteMark = m[1];
        unescaped = m[2];
    }
    unescaped = (0, _unesc2.default)(unescaped);
    if (unescaped !== value) {
        deprecatedUsage = true;
    }
    return {
        deprecatedUsage: deprecatedUsage,
        unescaped: unescaped,
        quoteMark: quoteMark
    };
}

function handleDeprecatedContructorOpts(opts) {
    if (opts.quoteMark !== undefined) {
        return opts;
    }
    if (opts.value === undefined) {
        return opts;
    }
    warnOfDeprecatedConstructor();

    var _unescapeValue = unescapeValue(opts.value),
        quoteMark = _unescapeValue.quoteMark,
        unescaped = _unescapeValue.unescaped;

    if (!opts.raws) {
        opts.raws = {};
    }
    if (opts.raws.value === undefined) {
        opts.raws.value = opts.value;
    }
    opts.value = unescaped;
    opts.quoteMark = quoteMark;
    return opts;
}

var Attribute = function (_Namespace) {
    _inherits(Attribute, _Namespace);

    function Attribute() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Attribute);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, handleDeprecatedContructorOpts(opts)));

        _this.type = _types.ATTRIBUTE;
        _this.raws = _this.raws || {};
        Object.defineProperty(_this.raws, 'unquoted', {
            get: deprecate(function () {
                return _this.value;
            }, "attr.raws.unquoted is deprecated. Call attr.value instead."),
            set: deprecate(function () {
                return _this.value;
            }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.")
        });
        _this._constructed = true;
        return _this;
    }

    /**
     * Returns the Attribute's value quoted such that it would be legal to use
     * in the value of a css file. The original value's quotation setting
     * used for stringification is left unchanged. See `setValue(value, options)`
     * if you want to control the quote settings of a new value for the attribute.
     *
     * You can also change the quotation used for the current value by setting quoteMark.
     *
     * Options:
     *   * quoteMark {'"' | "'" | null} - Use this value to quote the value. If this
     *     option is not set, the original value for quoteMark will be used. If
     *     indeterminate, a double quote is used. The legal values are:
     *     * `null` - the value will be unquoted and characters will be escaped as necessary.
     *     * `'` - the value will be quoted with a single quote and single quotes are escaped.
     *     * `"` - the value will be quoted with a double quote and double quotes are escaped.
     *   * preferCurrentQuoteMark {boolean} - if true, prefer the source quote mark
     *     over the quoteMark option value.
     *   * smart {boolean} - if true, will select a quote mark based on the value
     *     and the other options specified here. See the `smartQuoteMark()`
     *     method.
     **/


    Attribute.prototype.getQuotedValue = function getQuotedValue() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var quoteMark = this._determineQuoteMark(options);
        var cssescopts = CSSESC_QUOTE_OPTIONS[quoteMark];
        var escaped = (0, _cssesc2.default)(this._value, cssescopts);
        return escaped;
    };

    Attribute.prototype._determineQuoteMark = function _determineQuoteMark(options) {
        return options.smart ? this.smartQuoteMark(options) : this.preferredQuoteMark(options);
    };

    /**
     * Set the unescaped value with the specified quotation options. The value
     * provided must not include any wrapping quote marks -- those quotes will
     * be interpreted as part of the value and escaped accordingly.
     */


    Attribute.prototype.setValue = function setValue(value) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        this._value = value;
        this._quoteMark = this._determineQuoteMark(options);
        this._syncRawValue();
    };

    /**
     * Intelligently select a quoteMark value based on the value's contents. If
     * the value is a legal CSS ident, it will not be quoted. Otherwise a quote
     * mark will be picked that minimizes the number of escapes.
     *
     * If there's no clear winner, the quote mark from these options is used,
     * then the source quote mark (this is inverted if `preferCurrentQuoteMark` is
     * true). If the quoteMark is unspecified, a double quote is used.
     *
     * @param options This takes the quoteMark and preferCurrentQuoteMark options
     * from the quoteValue method.
     */


    Attribute.prototype.smartQuoteMark = function smartQuoteMark(options) {
        var v = this.value;
        var numSingleQuotes = v.replace(/[^']/g, '').length;
        var numDoubleQuotes = v.replace(/[^"]/g, '').length;
        if (numSingleQuotes + numDoubleQuotes === 0) {
            var escaped = (0, _cssesc2.default)(v, { isIdentifier: true });
            if (escaped === v) {
                return Attribute.NO_QUOTE;
            } else {
                var pref = this.preferredQuoteMark(options);
                if (pref === Attribute.NO_QUOTE) {
                    // pick a quote mark that isn't none and see if it's smaller
                    var quote = this.quoteMark || options.quoteMark || Attribute.DOUBLE_QUOTE;
                    var opts = CSSESC_QUOTE_OPTIONS[quote];
                    var quoteValue = (0, _cssesc2.default)(v, opts);
                    if (quoteValue.length < escaped.length) {
                        return quote;
                    }
                }
                return pref;
            }
        } else if (numDoubleQuotes === numSingleQuotes) {
            return this.preferredQuoteMark(options);
        } else if (numDoubleQuotes < numSingleQuotes) {
            return Attribute.DOUBLE_QUOTE;
        } else {
            return Attribute.SINGLE_QUOTE;
        }
    };

    /**
     * Selects the preferred quote mark based on the options and the current quote mark value.
     * If you want the quote mark to depend on the attribute value, call `smartQuoteMark(opts)`
     * instead.
     */


    Attribute.prototype.preferredQuoteMark = function preferredQuoteMark(options) {
        var quoteMark = options.preferCurrentQuoteMark ? this.quoteMark : options.quoteMark;

        if (quoteMark === undefined) {
            quoteMark = options.preferCurrentQuoteMark ? options.quoteMark : this.quoteMark;
        }

        if (quoteMark === undefined) {
            quoteMark = Attribute.DOUBLE_QUOTE;
        }

        return quoteMark;
    };

    Attribute.prototype._syncRawValue = function _syncRawValue() {
        var rawValue = (0, _cssesc2.default)(this._value, CSSESC_QUOTE_OPTIONS[this.quoteMark]);
        if (rawValue === this._value) {
            if (this.raws) {
                delete this.raws.value;
            }
        } else {
            this.raws.value = rawValue;
        }
    };

    Attribute.prototype._handleEscapes = function _handleEscapes(prop, value) {
        if (this._constructed) {
            var escaped = (0, _cssesc2.default)(value, { isIdentifier: true });
            if (escaped !== value) {
                this.raws[prop] = escaped;
            } else {
                delete this.raws[prop];
            }
        }
    };

    Attribute.prototype._spacesFor = function _spacesFor(name) {
        var attrSpaces = { before: '', after: '' };
        var spaces = this.spaces[name] || {};
        var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
        return Object.assign(attrSpaces, spaces, rawSpaces);
    };

    Attribute.prototype._stringFor = function _stringFor(name) {
        var spaceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;
        var concat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultAttrConcat;

        var attrSpaces = this._spacesFor(spaceName);
        return concat(this.stringifyProperty(name), attrSpaces);
    };

    /**
     * returns the offset of the attribute part specified relative to the
     * start of the node of the output string.
     *
     * * "ns" - alias for "namespace"
     * * "namespace" - the namespace if it exists.
     * * "attribute" - the attribute name
     * * "attributeNS" - the start of the attribute or its namespace
     * * "operator" - the match operator of the attribute
     * * "value" - The value (string or identifier)
     * * "insensitive" - the case insensitivity flag;
     * @param part One of the possible values inside an attribute.
     * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
     */


    Attribute.prototype.offsetOf = function offsetOf(name) {
        var count = 1;
        var attributeSpaces = this._spacesFor("attribute");
        count += attributeSpaces.before.length;
        if (name === "namespace" || name === "ns") {
            return this.namespace ? count : -1;
        }
        if (name === "attributeNS") {
            return count;
        }

        count += this.namespaceString.length;
        if (this.namespace) {
            count += 1;
        }
        if (name === "attribute") {
            return count;
        }

        count += this.stringifyProperty("attribute").length;
        count += attributeSpaces.after.length;
        var operatorSpaces = this._spacesFor("operator");
        count += operatorSpaces.before.length;
        var operator = this.stringifyProperty("operator");
        if (name === "operator") {
            return operator ? count : -1;
        }

        count += operator.length;
        count += operatorSpaces.after.length;
        var valueSpaces = this._spacesFor("value");
        count += valueSpaces.before.length;
        var value = this.stringifyProperty("value");
        if (name === "value") {
            return value ? count : -1;
        }

        count += value.length;
        count += valueSpaces.after.length;
        var insensitiveSpaces = this._spacesFor("insensitive");
        count += insensitiveSpaces.before.length;
        if (name === "insensitive") {
            return this.insensitive ? count : -1;
        }
        return -1;
    };

    Attribute.prototype.toString = function toString() {
        var _this2 = this;

        var selector = [this.rawSpaceBefore, '['];

        selector.push(this._stringFor('qualifiedAttribute', 'attribute'));

        if (this.operator && this.value) {
            selector.push(this._stringFor('operator'));
            selector.push(this._stringFor('value'));
            selector.push(this._stringFor('insensitiveFlag', 'insensitive', function (attrValue, attrSpaces) {
                if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
                    attrSpaces.before = " ";
                }
                return defaultAttrConcat(attrValue, attrSpaces);
            }));
        }

        selector.push(']');
        selector.push(this.rawSpaceAfter);
        return selector.join('');
    };

    _createClass(Attribute, [{
        key: "quoted",
        get: function get() {
            var qm = this.quoteMark;
            return qm === "'" || qm === '"';
        },
        set: function set(value) {
            warnOfDeprecatedQuotedAssignment();
        }

        /**
         * returns a single (`'`) or double (`"`) quote character if the value is quoted.
         * returns `null` if the value is not quoted.
         * returns `undefined` if the quotation state is unknown (this can happen when
         * the attribute is constructed without specifying a quote mark.)
         */

    }, {
        key: "quoteMark",
        get: function get() {
            return this._quoteMark;
        }

        /**
         * Set the quote mark to be used by this attribute's value.
         * If the quote mark changes, the raw (escaped) value at `attr.raws.value` of the attribute
         * value is updated accordingly.
         *
         * @param {"'" | '"' | null} quoteMark The quote mark or `null` if the value should be unquoted.
         */
        ,
        set: function set(quoteMark) {
            if (!this._constructed) {
                this._quoteMark = quoteMark;
                return;
            }
            if (this._quoteMark !== quoteMark) {
                this._quoteMark = quoteMark;
                this._syncRawValue();
            }
        }
    }, {
        key: "qualifiedAttribute",
        get: function get() {
            return this.qualifiedName(this.raws.attribute || this.attribute);
        }
    }, {
        key: "insensitiveFlag",
        get: function get() {
            return this.insensitive ? 'i' : '';
        }
    }, {
        key: "value",
        get: function get() {
            return this._value;
        }

        /**
         * Before 3.0, the value had to be set to an escaped value including any wrapped
         * quote marks. In 3.0, the semantics of `Attribute.value` changed so that the value
         * is unescaped during parsing and any quote marks are removed.
         *
         * Because the ambiguity of this semantic change, if you set `attr.value = newValue`,
         * a deprecation warning is raised when the new value contains any characters that would
         * require escaping (including if it contains wrapped quotes).
         *
         * Instead, you should call `attr.setValue(newValue, opts)` and pass options that describe
         * how the new value is quoted.
         */
        ,
        set: function set(v) {
            if (this._constructed) {
                var _unescapeValue2 = unescapeValue(v),
                    deprecatedUsage = _unescapeValue2.deprecatedUsage,
                    unescaped = _unescapeValue2.unescaped,
                    quoteMark = _unescapeValue2.quoteMark;

                if (deprecatedUsage) {
                    warnOfDeprecatedValueAssignment();
                }
                if (unescaped === this._value && quoteMark === this._quoteMark) {
                    return;
                }
                this._value = unescaped;
                this._quoteMark = quoteMark;
                this._syncRawValue();
            } else {
                this._value = v;
            }
        }
    }, {
        key: "attribute",
        get: function get() {
            return this._attribute;
        },
        set: function set(name) {
            this._handleEscapes("attribute", name);
            this._attribute = name;
        }
    }]);

    return Attribute;
}(_namespace2.default);

Attribute.NO_QUOTE = null;
Attribute.SINGLE_QUOTE = "'";
Attribute.DOUBLE_QUOTE = '"';
exports.default = Attribute;


var CSSESC_QUOTE_OPTIONS = (_CSSESC_QUOTE_OPTIONS = {
    "'": { quotes: 'single', wrap: true },
    '"': { quotes: 'double', wrap: true }
}, _CSSESC_QUOTE_OPTIONS[null] = { isIdentifier: true }, _CSSESC_QUOTE_OPTIONS);

function defaultAttrConcat(attrValue, attrSpaces) {
    return "" + attrSpaces.before + attrValue + attrSpaces.after;
}