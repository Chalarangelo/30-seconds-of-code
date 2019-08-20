'use strict';

exports.__esModule = true;
exports.default = tokenize;

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

var _tokenizeString = require('./tokenize-string');

var _tokenizeString2 = _interopRequireDefault(_tokenizeString);

var _tokenizeInterpolant2 = require('./tokenize-interpolant');

var _tokenizeInterpolant3 = _interopRequireDefault(_tokenizeInterpolant2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var singleQuote = "'".charCodeAt(0),
    doubleQuote = '"'.charCodeAt(0),
    newline = '\n'.charCodeAt(0),
    space = ' '.charCodeAt(0),
    feed = '\f'.charCodeAt(0),
    tab = '\t'.charCodeAt(0),
    cr = '\r'.charCodeAt(0),
    hash = '#'.charCodeAt(0),
    backslash = '\\'.charCodeAt(0),
    slash = '/'.charCodeAt(0),
    openCurly = '{'.charCodeAt(0),
    closeCurly = '}'.charCodeAt(0),
    interpolantEnd = /([.\s]*?)[^\\](?=(}))/gm,
    sQuoteEnd = /([.\s]*?)[^\\](?=((#{)|'))/gm,
    dQuoteEnd = /([.\s]*?)[^\\](?=((#{)|"))/gm;

function tokenize(input, l, p, quote) {
    var tokens = [];
    var css = input.css.valueOf();

    var code = void 0,
        next = void 0,
        lines = void 0,
        last = void 0,
        content = void 0,
        escape = void 0,
        nextLine = void 0,
        nextOffset = void 0,
        escaped = void 0,
        escapePos = void 0,
        inInterpolant = void 0,
        inComment = void 0,
        inString = void 0;

    var length = css.length;
    var offset = -1;
    var line = l || 1;
    var pos = p || 0;

    var quoteEnd = quote === "'" ? sQuoteEnd : dQuoteEnd;
    var quoteChar = quote.charCodeAt(0);

    loop: while (pos < length) {
        code = css.charCodeAt(pos);

        if (code === newline) {
            offset = pos;
            line += 1;
        }

        switch (code) {

            case closeCurly:
                tokens.push(['endInterpolant', '}', line, pos - offset]);
                break;

            case quoteChar:
                tokens.push([quote, quote, line, pos - offset]);
                break loop;

            case backslash:
                next = pos;
                escape = true;
                while (css.charCodeAt(next + 1) === backslash) {
                    next += 1;
                    escape = !escape;
                }
                code = css.charCodeAt(next + 1);
                if (escape && code !== slash && code !== space && code !== newline && code !== tab && code !== cr && code !== feed) {
                    next += 1;
                }
                tokens.push(['string', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);
                pos = next;
                break;

            default:
                if (code === hash && css.charCodeAt(pos + 1) === openCurly) {
                    tokens.push(['startInterpolant', '#{', line, pos + 1 - offset]);
                    next = pos + 1;

                    var _tokenizeInterpolant = (0, _tokenizeInterpolant3.default)(input, line, next + 1),
                        t = _tokenizeInterpolant.tokens,
                        _p = _tokenizeInterpolant.pos;

                    tokens = tokens.concat(t);
                    next = _p;

                    pos = next;
                } else {
                    quoteEnd.lastIndex = pos;
                    quoteEnd.test(css);

                    if (quoteEnd.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = quoteEnd.lastIndex - 1;
                    }

                    tokens.push(['string', css.slice(pos, next + 1), line, pos - offset, line, next - offset]);

                    pos = next;
                }

                break;
        }

        pos++;
    }

    return { tokens: tokens, pos: pos };
}