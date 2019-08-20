'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotProp = require('dot-prop');

var _dotProp2 = _interopRequireDefault(_dotProp);

var _indexesOf = require('indexes-of');

var _indexesOf2 = _interopRequireDefault(_indexesOf);

var _uniq = require('uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _root = require('./selectors/root');

var _root2 = _interopRequireDefault(_root);

var _selector = require('./selectors/selector');

var _selector2 = _interopRequireDefault(_selector);

var _className = require('./selectors/className');

var _className2 = _interopRequireDefault(_className);

var _comment = require('./selectors/comment');

var _comment2 = _interopRequireDefault(_comment);

var _id = require('./selectors/id');

var _id2 = _interopRequireDefault(_id);

var _tag = require('./selectors/tag');

var _tag2 = _interopRequireDefault(_tag);

var _string = require('./selectors/string');

var _string2 = _interopRequireDefault(_string);

var _pseudo = require('./selectors/pseudo');

var _pseudo2 = _interopRequireDefault(_pseudo);

var _attribute = require('./selectors/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _universal = require('./selectors/universal');

var _universal2 = _interopRequireDefault(_universal);

var _combinator = require('./selectors/combinator');

var _combinator2 = _interopRequireDefault(_combinator);

var _nesting = require('./selectors/nesting');

var _nesting2 = _interopRequireDefault(_nesting);

var _sortAscending = require('./sortAscending');

var _sortAscending2 = _interopRequireDefault(_sortAscending);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _tokenTypes = require('./tokenTypes');

var tokens = _interopRequireWildcard(_tokenTypes);

var _types = require('./selectors/types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getSource(startLine, startColumn, endLine, endColumn) {
    return {
        start: {
            line: startLine,
            column: startColumn
        },
        end: {
            line: endLine,
            column: endColumn
        }
    };
}

var Parser = function () {
    function Parser(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Parser);

        this.rule = rule;
        this.options = Object.assign({ lossy: false, safe: false }, options);
        this.position = 0;
        this.root = new _root2.default();
        this.root.errorGenerator = this._errorGenerator();

        var selector = new _selector2.default();
        this.root.append(selector);
        this.current = selector;

        this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;

        if (this.options.lossy) {
            this.css = this.css.trim();
        }
        this.tokens = (0, _tokenize2.default)({
            css: this.css,
            error: this._errorGenerator(),
            safe: this.options.safe
        });

        this.loop();
    }

    Parser.prototype._errorGenerator = function _errorGenerator() {
        var _this = this;

        return function (message, errorOptions) {
            if (typeof _this.rule === 'string') {
                return new Error(message);
            }
            return _this.rule.error(message, errorOptions);
        };
    };

    Parser.prototype.attribute = function attribute() {
        var attr = [];
        var startingToken = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[0] !== tokens.closeSquare) {
            attr.push(this.currToken);
            this.position++;
        }
        if (this.currToken[0] !== tokens.closeSquare) {
            return this.expected('closing square bracket', this.currToken[5]);
        }

        var len = attr.length;
        var node = {
            source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
            sourceIndex: startingToken[5]
        };

        if (len === 1 && !~[tokens.word].indexOf(attr[0][0])) {
            return this.expected('attribute', attr[0][5]);
        }

        var pos = 0;
        var spaceBefore = '';
        var commentBefore = '';
        var lastAdded = null;
        var spaceAfterMeaningfulToken = false;

        while (pos < len) {
            var token = attr[pos];
            var content = this.content(token);
            var next = attr[pos + 1];

            switch (token[0]) {
                case tokens.space:
                    if (len === 1 || pos === 0 && this.content(next) === '|') {
                        return this.expected('attribute', token[5], content);
                    }
                    spaceAfterMeaningfulToken = true;
                    if (this.options.lossy) {
                        break;
                    }
                    if (lastAdded) {
                        var spaceProp = 'spaces.' + lastAdded + '.after';
                        _dotProp2.default.set(node, spaceProp, _dotProp2.default.get(node, spaceProp, '') + content);
                        var commentProp = 'raws.spaces.' + lastAdded + '.after';
                        var existingComment = _dotProp2.default.get(node, commentProp);
                        if (existingComment) {
                            _dotProp2.default.set(node, commentProp, existingComment + content);
                        }
                    } else {
                        spaceBefore = spaceBefore + content;
                        commentBefore = commentBefore + content;
                    }
                    break;
                case tokens.asterisk:
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                        if (spaceBefore) {
                            _dotProp2.default.set(node, 'spaces.attribute.before', spaceBefore);
                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            _dotProp2.default.set(node, 'raws.spaces.attribute.before', spaceBefore);
                            commentBefore = '';
                        }
                        node.namespace = (node.namespace || "") + content;
                        var rawValue = _dotProp2.default.get(node, "raws.namespace");
                        if (rawValue) {
                            node.raws.namespace += content;
                        }
                        lastAdded = 'namespace';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.dollar:
                case tokens.caret:
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.combinator:
                    if (content === '~' && next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    if (content !== '|') {
                        spaceAfterMeaningfulToken = false;
                        break;
                    }
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if (!node.namespace && !node.attribute) {
                        node.namespace = true;
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.word:
                    if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][0] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
                    !node.operator && !node.namespace) {
                        node.namespace = content;
                        lastAdded = 'namespace';
                    } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                        if (spaceBefore) {
                            _dotProp2.default.set(node, 'spaces.attribute.before', spaceBefore);
                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            _dotProp2.default.set(node, 'raws.spaces.attribute.before', commentBefore);
                            commentBefore = '';
                        }
                        node.attribute = (node.attribute || "") + content;
                        var _rawValue = _dotProp2.default.get(node, "raws.attribute");
                        if (_rawValue) {
                            node.raws.attribute += content;
                        }
                        lastAdded = 'attribute';
                    } else if (!node.value || lastAdded === "value" && !spaceAfterMeaningfulToken) {
                        node.value = (node.value || "") + content;
                        var _rawValue2 = _dotProp2.default.get(node, "raws.value");
                        if (_rawValue2) {
                            node.raws.value += content;
                        }
                        lastAdded = 'value';
                        _dotProp2.default.set(node, 'raws.unquoted', _dotProp2.default.get(node, 'raws.unquoted', '') + content);
                    } else if (content === 'i') {
                        if (node.value && (node.quoted || spaceAfterMeaningfulToken)) {
                            node.insensitive = true;
                            lastAdded = 'insensitive';
                            if (spaceBefore) {
                                _dotProp2.default.set(node, 'spaces.insensitive.before', spaceBefore);
                                spaceBefore = '';
                            }
                            if (commentBefore) {
                                _dotProp2.default.set(node, 'raws.spaces.insensitive.before', commentBefore);
                                commentBefore = '';
                            }
                        } else if (node.value) {
                            lastAdded = 'value';
                            node.value += 'i';
                            if (node.raws.value) {
                                node.raws.value += 'i';
                            }
                        }
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.str:
                    if (!node.attribute || !node.operator) {
                        return this.error('Expected an attribute followed by an operator preceding the string.', {
                            index: token[5]
                        });
                    }
                    node.value = content;
                    node.quoted = true;
                    lastAdded = 'value';
                    _dotProp2.default.set(node, 'raws.unquoted', content.slice(1, -1));
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.equals:
                    if (!node.attribute) {
                        return this.expected('attribute', token[5], content);
                    }
                    if (node.value) {
                        return this.error('Unexpected "=" found; an operator was already defined.', { index: token[5] });
                    }
                    node.operator = node.operator ? node.operator + content : content;
                    lastAdded = 'operator';
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.comment:
                    if (lastAdded) {
                        if (spaceAfterMeaningfulToken || next && next[0] === tokens.space) {
                            var lastComment = _dotProp2.default.get(node, 'raws.spaces.' + lastAdded + '.after', _dotProp2.default.get(node, 'spaces.' + lastAdded + '.after', ''));
                            _dotProp2.default.set(node, 'raws.spaces.' + lastAdded + '.after', lastComment + content);
                        } else {
                            var lastValue = _dotProp2.default.get(node, 'raws.' + lastAdded, _dotProp2.default.get(node, lastAdded, ''));
                            _dotProp2.default.set(node, 'raws.' + lastAdded, lastValue + content);
                        }
                    } else {
                        commentBefore = commentBefore + content;
                    }
                    break;
                default:
                    return this.error('Unexpected "' + content + '" found.', { index: token[5] });
            }
            pos++;
        }

        this.newNode(new _attribute2.default(node));
        this.position++;
    };

    Parser.prototype.combinator = function combinator() {
        var current = this.currToken;
        if (this.content() === '|') {
            return this.namespace();
        }
        var node = new _combinator2.default({
            value: '',
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        });
        while (this.position < this.tokens.length && this.currToken && (this.currToken[0] === tokens.space || this.currToken[0] === tokens.combinator)) {
            var content = this.content();
            if (this.nextToken && this.nextToken[0] === tokens.combinator) {
                node.spaces.before = this.parseSpace(content);
                node.source = getSource(this.nextToken[1], this.nextToken[2], this.nextToken[3], this.nextToken[4]);
                node.sourceIndex = this.nextToken[5];
            } else if (this.prevToken && this.prevToken[0] === tokens.combinator) {
                node.spaces.after = this.parseSpace(content);
            } else if (this.currToken[0] === tokens.combinator) {
                node.value = content;
            } else if (this.currToken[0] === tokens.space) {
                node.value = this.parseSpace(content, ' ');
            }
            this.position++;
        }
        return this.newNode(node);
    };

    Parser.prototype.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
            this.root.trailingComma = true;
            this.position++;
            return;
        }
        var selector = new _selector2.default();
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
    };

    Parser.prototype.comment = function comment() {
        var current = this.currToken;
        this.newNode(new _comment2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.error = function error(message, opts) {
        throw this.root.error(message, opts);
    };

    Parser.prototype.missingBackslash = function missingBackslash() {
        return this.error('Expected a backslash preceding the semicolon.', {
            index: this.currToken[5]
        });
    };

    Parser.prototype.missingParenthesis = function missingParenthesis() {
        return this.expected('opening parenthesis', this.currToken[5]);
    };

    Parser.prototype.missingSquareBracket = function missingSquareBracket() {
        return this.expected('opening square bracket', this.currToken[5]);
    };

    Parser.prototype.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;
        if (this.nextToken[0] === tokens.word) {
            this.position++;
            return this.word(before);
        } else if (this.nextToken[0] === tokens.asterisk) {
            this.position++;
            return this.universal(before);
        }
    };

    Parser.prototype.nesting = function nesting() {
        var current = this.currToken;
        this.newNode(new _nesting2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.parentheses = function parentheses() {
        var last = this.current.last;
        var balanced = 1;
        this.position++;
        if (last && last.type === types.PSEUDO) {
            var selector = new _selector2.default();
            var cache = this.current;
            last.append(selector);
            this.current = selector;
            while (this.position < this.tokens.length && balanced) {
                if (this.currToken[0] === tokens.openParenthesis) {
                    balanced++;
                }
                if (this.currToken[0] === tokens.closeParenthesis) {
                    balanced--;
                }
                if (balanced) {
                    this.parse();
                } else {
                    selector.parent.source.end.line = this.currToken[3];
                    selector.parent.source.end.column = this.currToken[4];
                    this.position++;
                }
            }
            this.current = cache;
        } else {
            last.value += '(';
            while (this.position < this.tokens.length && balanced) {
                if (this.currToken[0] === tokens.openParenthesis) {
                    balanced++;
                }
                if (this.currToken[0] === tokens.closeParenthesis) {
                    balanced--;
                }
                last.value += this.parseParenthesisToken(this.currToken);
                this.position++;
            }
        }
        if (balanced) {
            return this.expected('closing parenthesis', this.currToken[5]);
        }
    };

    Parser.prototype.pseudo = function pseudo() {
        var _this2 = this;

        var pseudoStr = '';
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[0] === tokens.colon) {
            pseudoStr += this.content();
            this.position++;
        }
        if (!this.currToken) {
            return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
        }
        if (this.currToken[0] === tokens.word) {
            this.splitWord(false, function (first, length) {
                pseudoStr += first;
                _this2.newNode(new _pseudo2.default({
                    value: pseudoStr,
                    source: getSource(startingToken[1], startingToken[2], _this2.currToken[3], _this2.currToken[4]),
                    sourceIndex: startingToken[5]
                }));
                if (length > 1 && _this2.nextToken && _this2.nextToken[0] === tokens.openParenthesis) {
                    _this2.error('Misplaced parenthesis.', {
                        index: _this2.nextToken[5]
                    });
                }
            });
        } else {
            return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[5]);
        }
    };

    Parser.prototype.space = function space() {
        var content = this.content();
        // Handle space before and after the selector
        if (this.position === 0 || this.prevToken[0] === tokens.comma || this.prevToken[0] === tokens.openParenthesis) {
            this.spaces = this.parseSpace(content);
            this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[0] === tokens.comma || this.nextToken[0] === tokens.closeParenthesis) {
            this.current.last.spaces.after = this.parseSpace(content);
            this.position++;
        } else {
            this.combinator();
        }
    };

    Parser.prototype.string = function string() {
        var current = this.currToken;
        this.newNode(new _string2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.universal = function universal(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === '|') {
            this.position++;
            return this.namespace();
        }
        var current = this.currToken;
        this.newNode(new _universal2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }), namespace);
        this.position++;
    };

    Parser.prototype.splitWord = function splitWord(namespace, firstCallback) {
        var _this3 = this;

        var nextToken = this.nextToken;
        var word = this.content();
        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[0])) {
            this.position++;
            var current = this.content();
            word += current;
            if (current.lastIndexOf('\\') === current.length - 1) {
                var next = this.nextToken;
                if (next && next[0] === tokens.space) {
                    word += this.parseSpace(this.content(next), ' ');
                    this.position++;
                }
            }
            nextToken = this.nextToken;
        }
        var hasClass = (0, _indexesOf2.default)(word, '.');
        var hasId = (0, _indexesOf2.default)(word, '#');
        // Eliminate Sass interpolations from the list of id indexes
        var interpolations = (0, _indexesOf2.default)(word, '#{');
        if (interpolations.length) {
            hasId = hasId.filter(function (hashIndex) {
                return !~interpolations.indexOf(hashIndex);
            });
        }
        var indices = (0, _sortAscending2.default)((0, _uniq2.default)([0].concat(hasClass, hasId)));
        indices.forEach(function (ind, i) {
            var index = indices[i + 1] || word.length;
            var value = word.slice(ind, index);
            if (i === 0 && firstCallback) {
                return firstCallback.call(_this3, value, indices.length);
            }
            var node = void 0;
            var current = _this3.currToken;
            var sourceIndex = current[5] + indices[i];
            var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
            if (~hasClass.indexOf(ind)) {
                node = new _className2.default({
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                });
            } else if (~hasId.indexOf(ind)) {
                node = new _id2.default({
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                });
            } else {
                node = new _tag2.default({
                    value: value,
                    source: source,
                    sourceIndex: sourceIndex
                });
            }
            _this3.newNode(node, namespace);
            // Ensure that the namespace is used only once
            namespace = null;
        });
        this.position++;
    };

    Parser.prototype.word = function word(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === '|') {
            this.position++;
            return this.namespace();
        }
        return this.splitWord(namespace);
    };

    Parser.prototype.loop = function loop() {
        while (this.position < this.tokens.length) {
            this.parse(true);
        }
        return this.root;
    };

    Parser.prototype.parse = function parse(throwOnParenthesis) {
        switch (this.currToken[0]) {
            case tokens.space:
                this.space();
                break;
            case tokens.comment:
                this.comment();
                break;
            case tokens.openParenthesis:
                this.parentheses();
                break;
            case tokens.closeParenthesis:
                if (throwOnParenthesis) {
                    this.missingParenthesis();
                }
                break;
            case tokens.openSquare:
                this.attribute();
                break;
            case tokens.dollar:
            case tokens.caret:
            case tokens.equals:
            case tokens.word:
                this.word();
                break;
            case tokens.colon:
                this.pseudo();
                break;
            case tokens.comma:
                this.comma();
                break;
            case tokens.asterisk:
                this.universal();
                break;
            case tokens.ampersand:
                this.nesting();
                break;
            case tokens.combinator:
                this.combinator();
                break;
            case tokens.str:
                this.string();
                break;
            // These cases throw; no break needed.
            case tokens.closeSquare:
                this.missingSquareBracket();
            case tokens.semicolon:
                this.missingBackslash();
        }
    };

    /**
     * Helpers
     */

    Parser.prototype.expected = function expected(description, index, found) {
        if (Array.isArray(description)) {
            var last = description.pop();
            description = description.join(', ') + ' or ' + last;
        }
        var an = /^[aeiou]/.test(description[0]) ? 'an' : 'a';
        if (!found) {
            return this.error('Expected ' + an + ' ' + description + '.', { index: index });
        }
        return this.error('Expected ' + an + ' ' + description + ', found "' + found + '" instead.', { index: index });
    };

    Parser.prototype.parseNamespace = function parseNamespace(namespace) {
        if (this.options.lossy && typeof namespace === 'string') {
            var trimmed = namespace.trim();
            if (!trimmed.length) {
                return true;
            }

            return trimmed;
        }

        return namespace;
    };

    Parser.prototype.parseSpace = function parseSpace(space) {
        var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return this.options.lossy ? replacement : space;
    };

    Parser.prototype.parseValue = function parseValue(value) {
        if (!this.options.lossy || !value || typeof value !== 'string') {
            return value;
        }
        return value.trim();
    };

    Parser.prototype.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);
        if (!this.options.lossy) {
            return content;
        }

        if (token[0] === tokens.space) {
            return this.parseSpace(content, ' ');
        }

        return this.parseValue(content);
    };

    Parser.prototype.newNode = function newNode(node, namespace) {
        if (namespace) {
            node.namespace = this.parseNamespace(namespace);
        }
        if (this.spaces) {
            node.spaces.before = this.spaces;
            this.spaces = '';
        }
        return this.current.append(node);
    };

    Parser.prototype.content = function content() {
        var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currToken;

        return this.css.slice(token[5], token[6]);
    };

    _createClass(Parser, [{
        key: 'currToken',
        get: function get() {
            return this.tokens[this.position];
        }
    }, {
        key: 'nextToken',
        get: function get() {
            return this.tokens[this.position + 1];
        }
    }, {
        key: 'prevToken',
        get: function get() {
            return this.tokens[this.position - 1];
        }
    }]);

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];