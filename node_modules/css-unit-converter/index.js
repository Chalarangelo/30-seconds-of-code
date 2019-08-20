var conversions = {
    // length
    'px': {
        'px': 1,
        'cm': 96.0/2.54,
        'mm': 96.0/25.4,
        'in': 96,
        'pt': 96.0/72.0,
        'pc': 16
    },
    'cm': {
        'px': 2.54/96.0,
        'cm': 1,
        'mm': 0.1,
        'in': 2.54,
        'pt': 2.54/72.0,
        'pc': 2.54/6.0
    },
    'mm': {
        'px': 25.4/96.0,
        'cm': 10,
        'mm': 1,
        'in': 25.4,
        'pt': 25.4/72.0,
        'pc': 25.4/6.0
    },
    'in': {
        'px': 1.0/96.0,
        'cm': 1.0/2.54,
        'mm': 1.0/25.4,
        'in': 1,
        'pt': 1.0/72.0,
        'pc': 1.0/6.0
    },
    'pt': {
        'px': 0.75,
        'cm': 72.0/2.54,
        'mm': 72.0/25.4,
        'in': 72,
        'pt': 1,
        'pc': 12
    },
    'pc': {
        'px': 6.0/96.0,
        'cm': 6.0/2.54,
        'mm': 6.0/25.4,
        'in': 6,
        'pt': 6.0/72.0,
        'pc': 1
    },
    // angle
    'deg': {
        'deg': 1,
        'grad': 0.9,
        'rad': 180/Math.PI,
        'turn': 360
    },
    'grad': {
        'deg': 400/360,
        'grad': 1,
        'rad': 200/Math.PI,
        'turn': 400
    },
    'rad': {
        'deg': Math.PI/180,
        'grad': Math.PI/200,
        'rad': 1,
        'turn': Math.PI*2
    },
    'turn': {
        'deg': 1/360,
        'grad': 1/400,
        'rad': 0.5/Math.PI,
        'turn': 1
    },
    // time
    's': {
        's': 1,
        'ms': 1/1000
    },
    'ms': {
        's': 1000,
        'ms': 1
    },
    // frequency
    'Hz': {
        'Hz': 1,
        'kHz': 1000
    },
    'kHz': {
        'Hz': 1/1000,
        'kHz': 1
    },
    // resolution
    'dpi': {
        'dpi': 1,
        'dpcm': 1.0/2.54,
        'dppx': 1/96
    },
    'dpcm': {
        'dpi': 2.54,
        'dpcm': 1,
        'dppx': 2.54/96.0
    },
    'dppx': {
        'dpi': 96,
        'dpcm': 96.0/2.54,
        'dppx': 1
    }
};

module.exports = function (value, sourceUnit, targetUnit, precision) {
    if (!conversions.hasOwnProperty(targetUnit))
        throw new Error("Cannot convert to " + targetUnit);

    if (!conversions[targetUnit].hasOwnProperty(sourceUnit))
        throw new Error("Cannot convert from " + sourceUnit + " to " + targetUnit);

    precision = Math.pow(10, parseInt(precision) || 5);
    return Math.round((conversions[targetUnit][sourceUnit] * value) * precision) / precision;
};
