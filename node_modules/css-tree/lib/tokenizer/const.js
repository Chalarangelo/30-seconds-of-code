const charCodeDef = require('./char-code-definitions');

function fillCodeTypes(array, check, type) {
    for (var i = 0; i < array.length; i++) {
        if (check(i)) {
            array[i] = type;
        }
    }
}

// CSS Syntax Module Level 3
// https://www.w3.org/TR/css-syntax-3/
var TYPE = {
    Ident: 1,               // <ident-token>
    Function: 2,            // <function-token>
    AtKeyword: 3,           // <at-keyword-token>
    Hash: 4,                // <hash-token>
    String: 5,              // <string-token>
    BadString: 6,           // <bad-string-token>
    Url: 7,                 // <url-token>
    BadUrl: 8,              // <bad-url-token>
    Delim: 9,               // <delim-token>
    Number: 10,             // <number-token>
    Percentage: 11,         // <percentage-token>
    Dimension: 12,          // <dimension-token>
    WhiteSpace: 13,         // <whitespace-token>
    CDO: 14,                // <CDO-token>
    CDC: 15,                // <CDC-token>
    Colon: 16,              // <colon-token>     :
    Semicolon: 17,          // <semicolon-token> ;
    Comma: 18,              // <comma-token>     ,
    LeftSquareBracket: 19,  // <[-token>
    RightSquareBracket: 20, // <]-token>
    LeftParenthesis: 21,    // <(-token>
    RightParenthesis: 22,   // <)-token>
    LeftCurlyBracket: 23,   // <{-token>
    RightCurlyBracket: 24,  // <}-token>
    Comment: 25
};

var NAME = Object.keys(TYPE).reduce(function(result, key) {
    result[TYPE[key]] = key;
    return result;
}, {});

var CHARCODE = {
    Tab:                   9,  // \t
    LineFeed:             10,  // \n
    FormFeed:             12,  // \f
    CarriageReturn:       13,  // \r
    Space:                32,
    ExclamationMark:      33,  // !
    QuotationMark:        34,  // "
    NumberSign:           35,  // #
    DollarSign:           36,  // $
    PercentSign:          37,  // %
    Ampersand:            38,  // &
    Apostrophe:           39,  // '
    LeftParenthesis:      40,  // (
    RightParenthesis:     41,  // )
    Asterisk:             42,  // *
    PlusSign:             43,  // +
    Comma:                44,  // ,
    HyphenMinus:          45,  // -
    FullStop:             46,  // .
    Solidus:              47,  // /
    Colon:                58,  // :
    Semicolon:            59,  // ;
    LessThanSign:         60,  // <
    EqualsSign:           61,  // =
    GreaterThanSign:      62,  // >
    QuestionMark:         63,  // ?
    CommercialAt:         64,  // @
    LeftSquareBracket:    91,  // [
    Backslash:            92,  // \
    RightSquareBracket:   93,  // ]
    CircumflexAccent:     94,  // ^
    LowLine:              95,  // _
    GraveAccent:          96,  // `
    LeftCurlyBracket:    123,  // {
    VerticalLine:        124,  // |
    RightCurlyBracket:   125,  // }
    Tilde:               126   // ~
};

var INPUT_STREAM_CODE_TYPE = {
    Eof: 0x80,
    Delim: 0x81,
    WhiteSpace: 0x82,
    Digit: 0x83,
    NameStart: 0x84,
    NonPrintable: 0x85,
    Newline: 0x86
};

// https://drafts.csswg.org/css-syntax/#tokenizer-definitions
// > non-ASCII code point
// >   A code point with a value equal to or greater than U+0080 <control>
// > name-start code point
// >   A letter, a non-ASCII code point, or U+005F LOW LINE (_).
// > name code point
// >   A name-start code point, a digit, or U+002D HYPHEN-MINUS (-)
// That means only ASCII code points has a special meaning and we define a maps for 0..127 codes only
var SafeUint32Array = typeof Uint32Array !== 'undefined' ? Uint32Array : Array; // fallback on Array when TypedArray is not supported
var INPUT_STREAM_CODE = new SafeUint32Array(0x80);
var INPUT_STREAM_CODE_STRING = new SafeUint32Array(0x80);
var INPUT_STREAM_CODE_URL = new SafeUint32Array(0x80);

for (var i = 0; i < INPUT_STREAM_CODE.length; i++) {
    INPUT_STREAM_CODE_STRING[i] =
    INPUT_STREAM_CODE_URL[i] =
    INPUT_STREAM_CODE[i] = i || INPUT_STREAM_CODE_TYPE.Eof;
}

fillCodeTypes(INPUT_STREAM_CODE, charCodeDef.isWhiteSpace, INPUT_STREAM_CODE_TYPE.WhiteSpace);
fillCodeTypes(INPUT_STREAM_CODE, charCodeDef.isDigit, INPUT_STREAM_CODE_TYPE.Digit);
fillCodeTypes(INPUT_STREAM_CODE, charCodeDef.isNameStart, INPUT_STREAM_CODE_TYPE.NameStart);

fillCodeTypes(INPUT_STREAM_CODE_STRING, charCodeDef.isNewline, INPUT_STREAM_CODE_TYPE.Newline);

fillCodeTypes(INPUT_STREAM_CODE_URL, charCodeDef.isWhiteSpace, INPUT_STREAM_CODE_TYPE.WhiteSpace);
fillCodeTypes(INPUT_STREAM_CODE_URL, charCodeDef.isNonPrintable, INPUT_STREAM_CODE_TYPE.NonPrintable);

module.exports = {
    TYPE: TYPE,
    NAME: NAME,

    CHARCODE: CHARCODE,

    INPUT_STREAM_CODE: INPUT_STREAM_CODE,
    INPUT_STREAM_CODE_STRING: INPUT_STREAM_CODE_STRING,
    INPUT_STREAM_CODE_URL: INPUT_STREAM_CODE_URL,
    INPUT_STREAM_CODE_TYPE: INPUT_STREAM_CODE_TYPE
};
