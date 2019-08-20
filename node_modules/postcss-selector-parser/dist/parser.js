'use strict';

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _WHITESPACE_TOKENS, _extends2;

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

var _util = require('./util');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var WHITESPACE_TOKENS = (_WHITESPACE_TOKENS = {}, _WHITESPACE_TOKENS[tokens.space] = true, _WHITESPACE_TOKENS[tokens.cr] = true, _WHITESPACE_TOKENS[tokens.feed] = true, _WHITESPACE_TOKENS[tokens.newline] = true, _WHITESPACE_TOKENS[tokens.tab] = true, _WHITESPACE_TOKENS);

var WHITESPACE_EQUIV_TOKENS = _extends({}, WHITESPACE_TOKENS, (_extends2 = {}, _extends2[tokens.comment] = true, _extends2));

function tokenStart(token) {
    return {
        line: token[_tokenize.FIELDS.START_LINE],
        column: token[_tokenize.FIELDS.START_COL]
    };
}

function tokenEnd(token) {
    return {
        line: token[_tokenize.FIELDS.END_LINE],
        column: token[_tokenize.FIELDS.END_COL]
    };
}

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

function getTokenSource(token) {
    return getSource(token[_tokenize.FIELDS.START_LINE], token[_tokenize.FIELDS.START_COL], token[_tokenize.FIELDS.END_LINE], token[_tokenize.FIELDS.END_COL]);
}

function getTokenSourceSpan(startToken, endToken) {
    if (!startToken) {
        return undefined;
    }
    return getSource(startToken[_tokenize.FIELDS.START_LINE], startToken[_tokenize.FIELDS.START_COL], endToken[_tokenize.FIELDS.END_LINE], endToken[_tokenize.FIELDS.END_COL]);
}

function unescapeProp(node, prop) {
    var value = node[prop];
    if (typeof value !== "string") {
        return;
    }
    if (value.indexOf("\\") !== -1) {
        (0, _util.ensureObject)(node, 'raws');
        node[prop] = (0, _util.unesc)(value);
        if (node.raws[prop] === undefined) {
            node.raws[prop] = value;
        }
    }
    return node;
}

var Parser = function () {
    function Parser(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Parser);

        this.rule = rule;
        this.options = Object.assign({ lossy: false, safe: false }, options);
        this.position = 0;

        this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;

        this.tokens = (0, _tokenize2.default)({
            css: this.css,
            error: this._errorGenerator(),
            safe: this.options.safe
        });

        var rootSource = getTokenSourceSpan(this.tokens[0], this.tokens[this.tokens.length - 1]);
        this.root = new _root2.default({ source: rootSource });
        this.root.errorGenerator = this._errorGenerator();

        var selector = new _selector2.default({ source: { start: { line: 1, column: 1 } } });
        this.root.append(selector);
        this.current = selector;

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
        while (this.position < this.tokens.length && this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
            attr.push(this.currToken);
            this.position++;
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] !== tokens.closeSquare) {
            return this.expected('closing square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
        }

        var len = attr.length;
        var node = {
            source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
            sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
        };

        if (len === 1 && !~[tokens.word].indexOf(attr[0][_tokenize.FIELDS.TYPE])) {
            return this.expected('attribute', attr[0][_tokenize.FIELDS.START_POS]);
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

            switch (token[_tokenize.FIELDS.TYPE]) {
                case tokens.space:
                    // if (
                    //     len === 1 ||
                    //     pos === 0 && this.content(next) === '|'
                    // ) {
                    //     return this.expected('attribute', token[TOKEN.START_POS], content);
                    // }
                    spaceAfterMeaningfulToken = true;
                    if (this.options.lossy) {
                        break;
                    }
                    if (lastAdded) {
                        (0, _util.ensureObject)(node, 'spaces', lastAdded);
                        var prevContent = node.spaces[lastAdded].after || '';
                        node.spaces[lastAdded].after = prevContent + content;

                        var existingComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || null;

                        if (existingComment) {
                            node.raws.spaces[lastAdded].after = existingComment + content;
                        }
                    } else {
                        spaceBefore = spaceBefore + content;
                        commentBefore = commentBefore + content;
                    }
                    break;
                case tokens.asterisk:
                    if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                        if (spaceBefore) {
                            (0, _util.ensureObject)(node, 'spaces', 'attribute');
                            node.spaces.attribute.before = spaceBefore;
                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
                            node.raws.spaces.attribute.before = spaceBefore;
                            commentBefore = '';
                        }
                        node.namespace = (node.namespace || "") + content;
                        var rawValue = (0, _util.getProp)(node, 'raws', 'namespace') || null;
                        if (rawValue) {
                            node.raws.namespace += content;
                        }
                        lastAdded = 'namespace';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.dollar:
                    if (lastAdded === "value") {
                        var oldRawValue = (0, _util.getProp)(node, 'raws', 'value');
                        node.value += "$";
                        if (oldRawValue) {
                            node.raws.value = oldRawValue + "$";
                        }
                        break;
                    }
                // Falls through
                case tokens.caret:
                    if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.combinator:
                    if (content === '~' && next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    if (content !== '|') {
                        spaceAfterMeaningfulToken = false;
                        break;
                    }
                    if (next[_tokenize.FIELDS.TYPE] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if (!node.namespace && !node.attribute) {
                        node.namespace = true;
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.word:
                    if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][_tokenize.FIELDS.TYPE] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
                    !node.operator && !node.namespace) {
                        node.namespace = content;
                        lastAdded = 'namespace';
                    } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                        if (spaceBefore) {
                            (0, _util.ensureObject)(node, 'spaces', 'attribute');
                            node.spaces.attribute.before = spaceBefore;

                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            (0, _util.ensureObject)(node, 'raws', 'spaces', 'attribute');
                            node.raws.spaces.attribute.before = commentBefore;
                            commentBefore = '';
                        }
                        node.attribute = (node.attribute || "") + content;
                        var _rawValue = (0, _util.getProp)(node, 'raws', 'attribute') || null;
                        if (_rawValue) {
                            node.raws.attribute += content;
                        }
                        lastAdded = 'attribute';
                    } else if (!node.value || lastAdded === "value" && !spaceAfterMeaningfulToken) {
                        var _unescaped = (0, _util.unesc)(content);
                        var _oldRawValue = (0, _util.getProp)(node, 'raws', 'value') || '';
                        var oldValue = node.value || '';
                        node.value = oldValue + _unescaped;
                        node.quoteMark = null;
                        if (_unescaped !== content || _oldRawValue) {
                            (0, _util.ensureObject)(node, 'raws');
                            node.raws.value = (_oldRawValue || oldValue) + content;
                        }
                        lastAdded = 'value';
                    } else {
                        var insensitive = content === 'i' || content === "I";
                        if (node.value && (node.quoteMark || spaceAfterMeaningfulToken)) {
                            node.insensitive = insensitive;
                            if (!insensitive || content === "I") {
                                (0, _util.ensureObject)(node, 'raws');
                                node.raws.insensitiveFlag = content;
                            }
                            lastAdded = 'insensitive';
                            if (spaceBefore) {
                                (0, _util.ensureObject)(node, 'spaces', 'insensitive');
                                node.spaces.insensitive.before = spaceBefore;

                                spaceBefore = '';
                            }
                            if (commentBefore) {
                                (0, _util.ensureObject)(node, 'raws', 'spaces', 'insensitive');
                                node.raws.spaces.insensitive.before = commentBefore;
                                commentBefore = '';
                            }
                        } else if (node.value) {
                            lastAdded = 'value';
                            node.value += content;
                            if (node.raws.value) {
                                node.raws.value += content;
                            }
                        }
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.str:
                    if (!node.attribute || !node.operator) {
                        return this.error('Expected an attribute followed by an operator preceding the string.', {
                            index: token[_tokenize.FIELDS.START_POS]
                        });
                    }

                    var _unescapeValue = (0, _attribute.unescapeValue)(content),
                        unescaped = _unescapeValue.unescaped,
                        quoteMark = _unescapeValue.quoteMark;

                    node.value = unescaped;
                    node.quoteMark = quoteMark;
                    lastAdded = 'value';

                    (0, _util.ensureObject)(node, 'raws');
                    node.raws.value = content;

                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.equals:
                    if (!node.attribute) {
                        return this.expected('attribute', token[_tokenize.FIELDS.START_POS], content);
                    }
                    if (node.value) {
                        return this.error('Unexpected "=" found; an operator was already defined.', { index: token[_tokenize.FIELDS.START_POS] });
                    }
                    node.operator = node.operator ? node.operator + content : content;
                    lastAdded = 'operator';
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.comment:
                    if (lastAdded) {
                        if (spaceAfterMeaningfulToken || next && next[_tokenize.FIELDS.TYPE] === tokens.space || lastAdded === 'insensitive') {
                            var lastComment = (0, _util.getProp)(node, 'spaces', lastAdded, 'after') || '';
                            var rawLastComment = (0, _util.getProp)(node, 'raws', 'spaces', lastAdded, 'after') || lastComment;

                            (0, _util.ensureObject)(node, 'raws', 'spaces', lastAdded);
                            node.raws.spaces[lastAdded].after = rawLastComment + content;
                        } else {
                            var lastValue = node[lastAdded] || '';
                            var rawLastValue = (0, _util.getProp)(node, 'raws', lastAdded) || lastValue;
                            (0, _util.ensureObject)(node, 'raws');
                            node.raws[lastAdded] = rawLastValue + content;
                        }
                    } else {
                        commentBefore = commentBefore + content;
                    }
                    break;
                default:
                    return this.error('Unexpected "' + content + '" found.', { index: token[_tokenize.FIELDS.START_POS] });
            }
            pos++;
        }
        unescapeProp(node, "attribute");
        unescapeProp(node, "namespace");
        this.newNode(new _attribute2.default(node));
        this.position++;
    };

    /**
     * return a node containing meaningless garbage up to (but not including) the specified token position.
     * if the token position is negative, all remaining tokens are consumed.
     *
     * This returns an array containing a single string node if all whitespace,
     * otherwise an array of comment nodes with space before and after.
     *
     * These tokens are not added to the current selector, the caller can add them or use them to amend
     * a previous node's space metadata.
     *
     * In lossy mode, this returns only comments.
     */


    Parser.prototype.parseWhitespaceEquivalentTokens = function parseWhitespaceEquivalentTokens(stopPosition) {
        if (stopPosition < 0) {
            stopPosition = this.tokens.length;
        }
        var startPosition = this.position;
        var nodes = [];
        var space = "";
        var lastComment = undefined;
        do {
            if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
                if (!this.options.lossy) {
                    space += this.content();
                }
            } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.comment) {
                var spaces = {};
                if (space) {
                    spaces.before = space;
                    space = "";
                }
                lastComment = new _comment2.default({
                    value: this.content(),
                    source: getTokenSource(this.currToken),
                    sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
                    spaces: spaces
                });
                nodes.push(lastComment);
            }
        } while (++this.position < stopPosition);

        if (space) {
            if (lastComment) {
                lastComment.spaces.after = space;
            } else if (!this.options.lossy) {
                var firstToken = this.tokens[startPosition];
                var lastToken = this.tokens[this.position - 1];
                nodes.push(new _string2.default({
                    value: '',
                    source: getSource(firstToken[_tokenize.FIELDS.START_LINE], firstToken[_tokenize.FIELDS.START_COL], lastToken[_tokenize.FIELDS.END_LINE], lastToken[_tokenize.FIELDS.END_COL]),
                    sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
                    spaces: { before: space, after: '' }
                }));
            }
        }
        return nodes;
    };

    /**
     * 
     * @param {*} nodes 
     */


    Parser.prototype.convertWhitespaceNodesToSpace = function convertWhitespaceNodesToSpace(nodes) {
        var _this2 = this;

        var requiredSpace = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        var space = "";
        var rawSpace = "";
        nodes.forEach(function (n) {
            var spaceBefore = _this2.lossySpace(n.spaces.before, requiredSpace);
            var rawSpaceBefore = _this2.lossySpace(n.rawSpaceBefore, requiredSpace);
            space += spaceBefore + _this2.lossySpace(n.spaces.after, requiredSpace && spaceBefore.length === 0);
            rawSpace += spaceBefore + n.value + _this2.lossySpace(n.rawSpaceAfter, requiredSpace && rawSpaceBefore.length === 0);
        });
        if (rawSpace === space) {
            rawSpace = undefined;
        }
        var result = { space: space, rawSpace: rawSpace };
        return result;
    };

    Parser.prototype.isNamedCombinator = function isNamedCombinator() {
        var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position;

        return this.tokens[position + 0] && this.tokens[position + 0][_tokenize.FIELDS.TYPE] === tokens.slash && this.tokens[position + 1] && this.tokens[position + 1][_tokenize.FIELDS.TYPE] === tokens.word && this.tokens[position + 2] && this.tokens[position + 2][_tokenize.FIELDS.TYPE] === tokens.slash;
    };

    Parser.prototype.namedCombinator = function namedCombinator() {
        if (this.isNamedCombinator()) {
            var nameRaw = this.content(this.tokens[this.position + 1]);
            var name = (0, _util.unesc)(nameRaw).toLowerCase();
            var raws = {};
            if (name !== nameRaw) {
                raws.value = '/' + nameRaw + '/';
            }
            var node = new _combinator2.default({
                value: '/' + name + '/',
                source: getSource(this.currToken[_tokenize.FIELDS.START_LINE], this.currToken[_tokenize.FIELDS.START_COL], this.tokens[this.position + 2][_tokenize.FIELDS.END_LINE], this.tokens[this.position + 2][_tokenize.FIELDS.END_COL]),
                sourceIndex: this.currToken[_tokenize.FIELDS.START_POS],
                raws: raws
            });
            this.position = this.position + 3;
            return node;
        } else {
            this.unexpected();
        }
    };

    Parser.prototype.combinator = function combinator() {
        var _this3 = this;

        if (this.content() === '|') {
            return this.namespace();
        }
        // We need to decide between a space that's a descendant combinator and meaningless whitespace at the end of a selector.
        var nextSigTokenPos = this.locateNextMeaningfulToken(this.position);

        if (nextSigTokenPos < 0 || this.tokens[nextSigTokenPos][_tokenize.FIELDS.TYPE] === tokens.comma) {
            var nodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
            if (nodes.length > 0) {
                var last = this.current.last;
                if (last) {
                    var _convertWhitespaceNod = this.convertWhitespaceNodesToSpace(nodes),
                        space = _convertWhitespaceNod.space,
                        rawSpace = _convertWhitespaceNod.rawSpace;

                    if (rawSpace !== undefined) {
                        last.rawSpaceAfter += rawSpace;
                    }
                    last.spaces.after += space;
                } else {
                    nodes.forEach(function (n) {
                        return _this3.newNode(n);
                    });
                }
            }
            return;
        }

        var firstToken = this.currToken;
        var spaceOrDescendantSelectorNodes = undefined;
        if (nextSigTokenPos > this.position) {
            spaceOrDescendantSelectorNodes = this.parseWhitespaceEquivalentTokens(nextSigTokenPos);
        }

        var node = void 0;
        if (this.isNamedCombinator()) {
            node = this.namedCombinator();
        } else if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.combinator) {
            node = new _combinator2.default({
                value: this.content(),
                source: getTokenSource(this.currToken),
                sourceIndex: this.currToken[_tokenize.FIELDS.START_POS]
            });
            this.position++;
        } else if (WHITESPACE_TOKENS[this.currToken[_tokenize.FIELDS.TYPE]]) {
            // pass
        } else if (!spaceOrDescendantSelectorNodes) {
            this.unexpected();
        }

        if (node) {
            if (spaceOrDescendantSelectorNodes) {
                var _convertWhitespaceNod2 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes),
                    _space = _convertWhitespaceNod2.space,
                    _rawSpace = _convertWhitespaceNod2.rawSpace;

                node.spaces.before = _space;
                node.rawSpaceBefore = _rawSpace;
            }
        } else {
            // descendant combinator
            var _convertWhitespaceNod3 = this.convertWhitespaceNodesToSpace(spaceOrDescendantSelectorNodes, true),
                _space2 = _convertWhitespaceNod3.space,
                _rawSpace2 = _convertWhitespaceNod3.rawSpace;

            if (!_rawSpace2) {
                _rawSpace2 = _space2;
            }
            var spaces = {};
            var raws = { spaces: {} };
            if (_space2.endsWith(' ') && _rawSpace2.endsWith(' ')) {
                spaces.before = _space2.slice(0, _space2.length - 1);
                raws.spaces.before = _rawSpace2.slice(0, _rawSpace2.length - 1);
            } else if (_space2.startsWith(' ') && _rawSpace2.startsWith(' ')) {
                spaces.after = _space2.slice(1);
                raws.spaces.after = _rawSpace2.slice(1);
            } else {
                raws.value = _rawSpace2;
            }
            node = new _combinator2.default({
                value: ' ',
                source: getTokenSourceSpan(firstToken, this.tokens[this.position - 1]),
                sourceIndex: firstToken[_tokenize.FIELDS.START_POS],
                spaces: spaces,
                raws: raws
            });
        }

        if (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.space) {
            node.spaces.after = this.optionalSpace(this.content());
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
        this.current._inferEndPosition();
        var selector = new _selector2.default({ source: { start: tokenStart(this.tokens[this.position + 1]) } });
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
    };

    Parser.prototype.comment = function comment() {
        var current = this.currToken;
        this.newNode(new _comment2.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
    };

    Parser.prototype.error = function error(message, opts) {
        throw this.root.error(message, opts);
    };

    Parser.prototype.missingBackslash = function missingBackslash() {
        return this.error('Expected a backslash preceding the semicolon.', {
            index: this.currToken[_tokenize.FIELDS.START_POS]
        });
    };

    Parser.prototype.missingParenthesis = function missingParenthesis() {
        return this.expected('opening parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
    };

    Parser.prototype.missingSquareBracket = function missingSquareBracket() {
        return this.expected('opening square bracket', this.currToken[_tokenize.FIELDS.START_POS]);
    };

    Parser.prototype.unexpected = function unexpected() {
        return this.error('Unexpected \'' + this.content() + '\'. Escaping special characters with \\ may help.', this.currToken[_tokenize.FIELDS.START_POS]);
    };

    Parser.prototype.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;
        if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.word) {
            this.position++;
            return this.word(before);
        } else if (this.nextToken[_tokenize.FIELDS.TYPE] === tokens.asterisk) {
            this.position++;
            return this.universal(before);
        }
    };

    Parser.prototype.nesting = function nesting() {
        if (this.nextToken) {
            var nextContent = this.content(this.nextToken);
            if (nextContent === "|") {
                this.position++;
                return;
            }
        }
        var current = this.currToken;
        this.newNode(new _nesting2.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[_tokenize.FIELDS.START_POS]
        }));
        this.position++;
    };

    Parser.prototype.parentheses = function parentheses() {
        var last = this.current.last;
        var unbalanced = 1;
        this.position++;
        if (last && last.type === types.PSEUDO) {
            var selector = new _selector2.default({ source: { start: tokenStart(this.tokens[this.position - 1]) } });
            var cache = this.current;
            last.append(selector);
            this.current = selector;
            while (this.position < this.tokens.length && unbalanced) {
                if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
                    unbalanced++;
                }
                if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
                    unbalanced--;
                }
                if (unbalanced) {
                    this.parse();
                } else {
                    this.current.source.end = tokenEnd(this.currToken);
                    this.current.parent.source.end = tokenEnd(this.currToken);
                    this.position++;
                }
            }
            this.current = cache;
        } else {
            // I think this case should be an error. It's used to implement a basic parse of media queries
            // but I don't think it's a good idea.
            var parenStart = this.currToken;
            var parenValue = "(";
            var parenEnd = void 0;
            while (this.position < this.tokens.length && unbalanced) {
                if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
                    unbalanced++;
                }
                if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
                    unbalanced--;
                }
                parenEnd = this.currToken;
                parenValue += this.parseParenthesisToken(this.currToken);
                this.position++;
            }
            if (last) {
                last.appendToPropertyAndEscape("value", parenValue, parenValue);
            } else {
                this.newNode(new _string2.default({
                    value: parenValue,
                    source: getSource(parenStart[_tokenize.FIELDS.START_LINE], parenStart[_tokenize.FIELDS.START_COL], parenEnd[_tokenize.FIELDS.END_LINE], parenEnd[_tokenize.FIELDS.END_COL]),
                    sourceIndex: parenStart[_tokenize.FIELDS.START_POS]
                }));
            }
        }
        if (unbalanced) {
            return this.expected('closing parenthesis', this.currToken[_tokenize.FIELDS.START_POS]);
        }
    };

    Parser.prototype.pseudo = function pseudo() {
        var _this4 = this;

        var pseudoStr = '';
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[_tokenize.FIELDS.TYPE] === tokens.colon) {
            pseudoStr += this.content();
            this.position++;
        }
        if (!this.currToken) {
            return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
        }
        if (this.currToken[_tokenize.FIELDS.TYPE] === tokens.word) {
            this.splitWord(false, function (first, length) {
                pseudoStr += first;
                _this4.newNode(new _pseudo2.default({
                    value: pseudoStr,
                    source: getTokenSourceSpan(startingToken, _this4.currToken),
                    sourceIndex: startingToken[_tokenize.FIELDS.START_POS]
                }));
                if (length > 1 && _this4.nextToken && _this4.nextToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
                    _this4.error('Misplaced parenthesis.', {
                        index: _this4.nextToken[_tokenize.FIELDS.START_POS]
                    });
                }
            });
        } else {
            return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[_tokenize.FIELDS.START_POS]);
        }
    };

    Parser.prototype.space = function space() {
        var content = this.content();
        // Handle space before and after the selector
        if (this.position === 0 || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.prevToken[_tokenize.FIELDS.TYPE] === tokens.openParenthesis) {
            this.spaces = this.optionalSpace(content);
            this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.comma || this.nextToken[_tokenize.FIELDS.TYPE] === tokens.closeParenthesis) {
            this.current.last.spaces.after = this.optionalSpace(content);
            this.position++;
        } else {
            this.combinator();
        }
    };

    Parser.prototype.string = function string() {
        var current = this.currToken;
        this.newNode(new _string2.default({
            value: this.content(),
            source: getTokenSource(current),
            sourceIndex: current[_tokenize.FIELDS.START_POS]
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
            source: getTokenSource(current),
            sourceIndex: current[_tokenize.FIELDS.START_POS]
        }), namespace);
        this.position++;
    };

    Parser.prototype.splitWord = function splitWord(namespace, firstCallback) {
        var _this5 = this;

        var nextToken = this.nextToken;
        var word = this.content();
        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[_tokenize.FIELDS.TYPE])) {
            this.position++;
            var current = this.content();
            word += current;
            if (current.lastIndexOf('\\') === current.length - 1) {
                var next = this.nextToken;
                if (next && next[_tokenize.FIELDS.TYPE] === tokens.space) {
                    word += this.requiredSpace(this.content(next));
                    this.position++;
                }
            }
            nextToken = this.nextToken;
        }
        var hasClass = (0, _indexesOf2.default)(word, '.').filter(function (i) {
            return word[i - 1] !== '\\';
        });
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
                return firstCallback.call(_this5, value, indices.length);
            }
            var node = void 0;
            var current = _this5.currToken;
            var sourceIndex = current[_tokenize.FIELDS.START_POS] + indices[i];
            var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
            if (~hasClass.indexOf(ind)) {
                var classNameOpts = {
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                };
                node = new _className2.default(unescapeProp(classNameOpts, "value"));
            } else if (~hasId.indexOf(ind)) {
                var idOpts = {
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                };
                node = new _id2.default(unescapeProp(idOpts, "value"));
            } else {
                var tagOpts = {
                    value: value,
                    source: source,
                    sourceIndex: sourceIndex
                };
                unescapeProp(tagOpts, "value");
                node = new _tag2.default(tagOpts);
            }
            _this5.newNode(node, namespace);
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
        this.current._inferEndPosition();
        return this.root;
    };

    Parser.prototype.parse = function parse(throwOnParenthesis) {
        switch (this.currToken[_tokenize.FIELDS.TYPE]) {
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
            case tokens.slash:
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
            default:
                this.unexpected();
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

    Parser.prototype.requiredSpace = function requiredSpace(space) {
        return this.options.lossy ? ' ' : space;
    };

    Parser.prototype.optionalSpace = function optionalSpace(space) {
        return this.options.lossy ? '' : space;
    };

    Parser.prototype.lossySpace = function lossySpace(space, required) {
        if (this.options.lossy) {
            return required ? ' ' : '';
        } else {
            return space;
        }
    };

    Parser.prototype.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);
        if (token[_tokenize.FIELDS.TYPE] === tokens.space) {
            return this.requiredSpace(content);
        } else {
            return content;
        }
    };

    Parser.prototype.newNode = function newNode(node, namespace) {
        if (namespace) {
            if (/^ +$/.test(namespace)) {
                if (!this.options.lossy) {
                    this.spaces = (this.spaces || '') + namespace;
                }
                namespace = true;
            }
            node.namespace = namespace;
            unescapeProp(node, "namespace");
        }
        if (this.spaces) {
            node.spaces.before = this.spaces;
            this.spaces = '';
        }
        return this.current.append(node);
    };

    Parser.prototype.content = function content() {
        var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currToken;

        return this.css.slice(token[_tokenize.FIELDS.START_POS], token[_tokenize.FIELDS.END_POS]);
    };

    /**
     * returns the index of the next non-whitespace, non-comment token.
     * returns -1 if no meaningful token is found.
     */
    Parser.prototype.locateNextMeaningfulToken = function locateNextMeaningfulToken() {
        var startPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.position + 1;

        var searchPosition = startPosition;
        while (searchPosition < this.tokens.length) {
            if (WHITESPACE_EQUIV_TOKENS[this.tokens[searchPosition][_tokenize.FIELDS.TYPE]]) {
                searchPosition++;
                continue;
            } else {
                return searchPosition;
            }
        }
        return -1;
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