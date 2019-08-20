var tokenizerUtils = require('../tokenizer/utils');
var findIdentifierEnd = tokenizerUtils.findIdentifierEnd;
var findNumberEnd = tokenizerUtils.findNumberEnd;
var findDecimalNumberEnd = tokenizerUtils.findDecimalNumberEnd;
var isHex = tokenizerUtils.isHex;
var tokenizerConst = require('../tokenizer/const');
var SYMBOL_TYPE = tokenizerConst.SYMBOL_TYPE;
var IDENTIFIER = tokenizerConst.TYPE.Identifier;
var PLUSSIGN = tokenizerConst.TYPE.PlusSign;
var HYPHENMINUS = tokenizerConst.TYPE.HyphenMinus;
var NUMBERSIGN = tokenizerConst.TYPE.NumberSign;

var PERCENTAGE = {
    '%': true
};

// https://www.w3.org/TR/css-values-3/#lengths
var LENGTH = {
    // absolute length units
    'px': true,
    'mm': true,
    'cm': true,
    'in': true,
    'pt': true,
    'pc': true,
    'q': true,

    // relative length units
    'em': true,
    'ex': true,
    'ch': true,
    'rem': true,

    // viewport-percentage lengths
    'vh': true,
    'vw': true,
    'vmin': true,
    'vmax': true,
    'vm': true
};

var ANGLE = {
    'deg': true,
    'grad': true,
    'rad': true,
    'turn': true
};

var TIME = {
    's': true,
    'ms': true
};

var FREQUENCY = {
    'hz': true,
    'khz': true
};

// https://www.w3.org/TR/css-values-3/#resolution (https://drafts.csswg.org/css-values/#resolution)
var RESOLUTION = {
    'dpi': true,
    'dpcm': true,
    'dppx': true,
    'x': true      // https://github.com/w3c/csswg-drafts/issues/461
};

// https://drafts.csswg.org/css-grid/#fr-unit
var FLEX = {
    'fr': true
};

// https://www.w3.org/TR/css3-speech/#mixing-props-voice-volume
var DECIBEL = {
    'db': true
};

// https://www.w3.org/TR/css3-speech/#voice-props-voice-pitch
var SEMITONES = {
    'st': true
};

function consumeFunction(token, addTokenToMatch, getNextToken) {
    var length = 1;
    var cursor;

    do {
        cursor = getNextToken(length++);
    } while (cursor !== null && cursor.node !== token.node);

    if (cursor === null) {
        return false;
    }

    while (true) {
        // consume tokens until cursor
        if (addTokenToMatch() === cursor) {
            break;
        }
    }

    return true;
}

// TODO: implement
// can be used wherever <length>, <frequency>, <angle>, <time>, <percentage>, <number>, or <integer> values are allowed
// https://drafts.csswg.org/css-values/#calc-notation
function calc(token, addTokenToMatch, getNextToken) {
    if (token === null) {
        return false;
    }

    var name = token.value.toLowerCase();
    if (name !== 'calc(' &&
        name !== '-moz-calc(' &&
        name !== '-webkit-calc(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function attr(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'attr(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function expression(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'expression(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function url(token, addTokenToMatch, getNextToken) {
    if (token === null || token.value.toLowerCase() !== 'url(') {
        return false;
    }

    return consumeFunction(token, addTokenToMatch, getNextToken);
}

function idSelector(token, addTokenToMatch) {
    if (token === null) {
        return false;
    }

    if (token.value.charCodeAt(0) !== NUMBERSIGN) {
        return false;
    }

    if (consumeIdentifier(token.value, 1) !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function isNumber(str) {
    return /^[-+]?(\d+|\d*\.\d+)([eE][-+]?\d+)?$/.test(str);
}

function consumeNumber(str, allowFraction) {
    var code = str.charCodeAt(0);

    return findNumberEnd(str, code === PLUSSIGN || code === HYPHENMINUS ? 1 : 0, allowFraction);
}

function consumeIdentifier(str, offset) {
    var code = str.charCodeAt(offset);

    if (code < 0x80 && SYMBOL_TYPE[code] !== IDENTIFIER && code !== HYPHENMINUS) {
        return offset;
    }

    return findIdentifierEnd(str, offset + 1);
}

function astNode(type) {
    return function(token, addTokenToMatch) {
        if (token === null || token.node.type !== type) {
            return false;
        }

        addTokenToMatch();
        return true;
    };
}

function dimension(type) {
    return function(token, addTokenToMatch, getNextToken) {
        if (calc(token, addTokenToMatch, getNextToken)) {
            return true;
        }

        if (token === null) {
            return false;
        }

        var numberEnd = consumeNumber(token.value, true);
        if (numberEnd === 0) {
            return false;
        }

        if (type) {
            if (!type.hasOwnProperty(token.value.substr(numberEnd).toLowerCase())) {
                return false;
            }
        } else {
            var unitEnd = consumeIdentifier(token.value, numberEnd);
            if (unitEnd === numberEnd || unitEnd !== token.value.length) {
                return false;
            }
        }

        addTokenToMatch();
        return true;
    };
}

function zeroUnitlessDimension(type) {
    var isDimension = dimension(type);

    return function(token, addTokenToMatch, getNextToken) {
        if (isDimension(token, addTokenToMatch, getNextToken)) {
            return true;
        }

        if (token === null || Number(token.value) !== 0) {
            return false;
        }

        addTokenToMatch();
        return true;
    };
}

function number(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = consumeNumber(token.value, true);
    if (numberEnd !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function numberZeroOne(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null || !isNumber(token.value)) {
        return false;
    }

    var value = Number(token.value);
    if (value < 0 || value > 1) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function numberOneOrGreater(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null || !isNumber(token.value)) {
        return false;
    }

    var value = Number(token.value);
    if (value < 1) {
        return false;
    }

    addTokenToMatch();
    return true;
}

// TODO: fail on 10e-2
function integer(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = consumeNumber(token.value, false);
    if (numberEnd !== token.value.length) {
        return false;
    }

    addTokenToMatch();
    return true;
}

// TODO: fail on 10e-2
function positiveInteger(token, addTokenToMatch, getNextToken) {
    if (calc(token, addTokenToMatch, getNextToken)) {
        return true;
    }

    if (token === null) {
        return false;
    }

    var numberEnd = findDecimalNumberEnd(token.value, 0);
    if (numberEnd !== token.value.length || token.value.charCodeAt(0) === HYPHENMINUS) {
        return false;
    }

    addTokenToMatch();
    return true;
}

function hexColor(token, addTokenToMatch) {
    if (token === null || token.value.charCodeAt(0) !== NUMBERSIGN) {
        return false;
    }

    var length = token.value.length - 1;

    // valid length is 3, 4, 6 and 8 (+1 for #)
    if (length !== 3 && length !== 4 && length !== 6 && length !== 8) {
        return false;
    }

    for (var i = 1; i < length; i++) {
        if (!isHex(token.value.charCodeAt(i))) {
            return false;
        }
    }

    addTokenToMatch();
    return true;
}

// https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident
// https://drafts.csswg.org/css-values-4/#identifier-value
function customIdent(token, addTokenToMatch) {
    if (token === null) {
        return false;
    }

    var identEnd = consumeIdentifier(token.value, 0);
    if (identEnd !== token.value.length) {
        return false;
    }

    var name = token.value.toLowerCase();

    // § 3.2. Author-defined Identifiers: the <custom-ident> type
    // The CSS-wide keywords are not valid <custom-ident>s
    if (name === 'unset' || name === 'initial' || name === 'inherit') {
        return false;
    }

    // The default keyword is reserved and is also not a valid <custom-ident>
    if (name === 'default') {
        return false;
    }

    // TODO: ignore property specific keywords (as described https://developer.mozilla.org/en-US/docs/Web/CSS/custom-ident)

    addTokenToMatch();
    return true;
}

module.exports = {
    'angle': zeroUnitlessDimension(ANGLE),
    'attr()': attr,
    'custom-ident': customIdent,
    'decibel': dimension(DECIBEL),
    'dimension': dimension(),
    'frequency': dimension(FREQUENCY),
    'flex': dimension(FLEX),
    'hex-color': hexColor,
    'id-selector': idSelector, // element( <id-selector> )
    'ident': astNode('Identifier'),
    'integer': integer,
    'length': zeroUnitlessDimension(LENGTH),
    'number': number,
    'number-zero-one': numberZeroOne,
    'number-one-or-greater': numberOneOrGreater,
    'percentage': dimension(PERCENTAGE),
    'positive-integer': positiveInteger,
    'resolution': dimension(RESOLUTION),
    'semitones': dimension(SEMITONES),
    'string': astNode('String'),
    'time': dimension(TIME),
    'unicode-range': astNode('UnicodeRange'),
    'url': url,

    // old IE stuff
    'progid': astNode('Raw'),
    'expression': expression
};
