'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * Constants (parser usage)
 */

const SINGLE_QUOTE = '\''.charCodeAt(0);
const DOUBLE_QUOTE = '"'.charCodeAt(0);
const BACKSLASH = '\\'.charCodeAt(0);
const NEWLINE = '\n'.charCodeAt(0);
const SPACE = ' '.charCodeAt(0);
const FEED = '\f'.charCodeAt(0);
const TAB = '\t'.charCodeAt(0);
const CR = '\r'.charCodeAt(0);

const WORD_END = /[ \n\t\r\f'"\\]/g;

/*
 * Constants (node type strings)
 */

const C_STRING = 'string';
const C_ESCAPED_SINGLE_QUOTE = 'escapedSingleQuote';
const C_ESCAPED_DOUBLE_QUOTE = 'escapedDoubleQuote';
const C_SINGLE_QUOTE = 'singleQuote';
const C_DOUBLE_QUOTE = 'doubleQuote';
const C_NEWLINE = 'newline';
const C_SINGLE = 'single';

/*
 * Literals
 */

const L_SINGLE_QUOTE = `'`;
const L_DOUBLE_QUOTE = `"`;
const L_NEWLINE = `\\\n`;

/*
 * Parser nodes
 */

const T_ESCAPED_SINGLE_QUOTE = { type: C_ESCAPED_SINGLE_QUOTE, value: `\\'` };
const T_ESCAPED_DOUBLE_QUOTE = { type: C_ESCAPED_DOUBLE_QUOTE, value: `\\"` };
const T_SINGLE_QUOTE = { type: C_SINGLE_QUOTE, value: L_SINGLE_QUOTE };
const T_DOUBLE_QUOTE = { type: C_DOUBLE_QUOTE, value: L_DOUBLE_QUOTE };
const T_NEWLINE = { type: C_NEWLINE, value: L_NEWLINE };

function stringify(ast) {
    return ast.nodes.reduce((str, { value }) => {
        // Collapse multiple line strings automatically
        if (value === L_NEWLINE) {
            return str;
        }

        return str + value;
    }, '');
}

function parse(str) {
    let code, next, value;
    let pos = 0;
    let len = str.length;

    const ast = {
        nodes: [],
        types: {
            escapedSingleQuote: 0,
            escapedDoubleQuote: 0,
            singleQuote: 0,
            doubleQuote: 0
        },
        quotes: false
    };

    while (pos < len) {
        code = str.charCodeAt(pos);

        switch (code) {
            case SPACE:
            case TAB:
            case CR:
            case FEED:
                next = pos;

                do {
                    next += 1;
                    code = str.charCodeAt(next);
                } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

                ast.nodes.push({
                    type: 'space',
                    value: str.slice(pos, next)
                });
                pos = next - 1;
                break;
            case SINGLE_QUOTE:
                ast.nodes.push(T_SINGLE_QUOTE);
                ast.types[C_SINGLE_QUOTE]++;
                ast.quotes = true;
                break;
            case DOUBLE_QUOTE:
                ast.nodes.push(T_DOUBLE_QUOTE);
                ast.types[C_DOUBLE_QUOTE]++;
                ast.quotes = true;
                break;
            case BACKSLASH:
                next = pos + 1;

                if (str.charCodeAt(next) === SINGLE_QUOTE) {
                    ast.nodes.push(T_ESCAPED_SINGLE_QUOTE);
                    ast.types[C_ESCAPED_SINGLE_QUOTE]++;
                    ast.quotes = true;
                    pos = next;
                    break;
                } else if (str.charCodeAt(next) === DOUBLE_QUOTE) {
                    ast.nodes.push(T_ESCAPED_DOUBLE_QUOTE);
                    ast.types[C_ESCAPED_DOUBLE_QUOTE]++;
                    ast.quotes = true;
                    pos = next;
                    break;
                } else if (str.charCodeAt(next) === NEWLINE) {
                    ast.nodes.push(T_NEWLINE);
                    pos = next;
                    break;
                }
            /*
             * We need to fall through here to handle the token as
             * a whole word. The missing 'break' is intentional.
             */
            default:
                WORD_END.lastIndex = pos + 1;
                WORD_END.test(str);

                if (WORD_END.lastIndex === 0) {
                    next = len - 1;
                } else {
                    next = WORD_END.lastIndex - 2;
                }

                value = str.slice(pos, next + 1);

                ast.nodes.push({
                    type: C_STRING,
                    value
                });

                pos = next;
        }
        pos++;
    }

    return ast;
}

function changeWrappingQuotes(node, ast) {
    const { types } = ast;

    if (types[C_SINGLE_QUOTE] || types[C_DOUBLE_QUOTE]) {
        return;
    }

    if (node.quote === L_SINGLE_QUOTE && types[C_ESCAPED_SINGLE_QUOTE] > 0 && !types[C_ESCAPED_DOUBLE_QUOTE]) {
        node.quote = L_DOUBLE_QUOTE;
    }

    if (node.quote === L_DOUBLE_QUOTE && types[C_ESCAPED_DOUBLE_QUOTE] > 0 && !types[C_ESCAPED_SINGLE_QUOTE]) {
        node.quote = L_SINGLE_QUOTE;
    }

    ast.nodes = ast.nodes.reduce((newAst, child) => {
        if (child.type === C_ESCAPED_DOUBLE_QUOTE && node.quote === L_SINGLE_QUOTE) {
            return [...newAst, T_DOUBLE_QUOTE];
        }

        if (child.type === C_ESCAPED_SINGLE_QUOTE && node.quote === L_DOUBLE_QUOTE) {
            return [...newAst, T_SINGLE_QUOTE];
        }

        return [...newAst, child];
    }, []);
}

function normalize(value, preferredQuote) {
    if (!value || !value.length) {
        return value;
    }

    return (0, _postcssValueParser2.default)(value).walk(child => {
        if (child.type !== C_STRING) {
            return;
        }

        const ast = parse(child.value);

        if (ast.quotes) {
            changeWrappingQuotes(child, ast);
        } else if (preferredQuote === C_SINGLE) {
            child.quote = L_SINGLE_QUOTE;
        } else {
            child.quote = L_DOUBLE_QUOTE;
        }

        child.value = stringify(ast);
    }).toString();
}

const params = {
    rule: 'selector',
    decl: 'value',
    atrule: 'params'
};

exports.default = _postcss2.default.plugin('postcss-normalize-string', opts => {
    const { preferredQuote } = Object.assign({}, {
        preferredQuote: 'double'
    }, opts);

    return css => {
        const cache = {};

        css.walk(node => {
            const { type } = node;

            if ((0, _has2.default)(params, type)) {
                const param = params[type];
                const key = node[param] + '|' + preferredQuote;

                if (cache[key]) {
                    node[param] = cache[key];

                    return;
                }

                const result = normalize(node[param], preferredQuote);

                node[param] = result;
                cache[key] = result;
            }
        });
    };
});
module.exports = exports['default'];