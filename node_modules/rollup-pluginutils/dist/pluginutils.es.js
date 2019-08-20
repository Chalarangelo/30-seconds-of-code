import path, { extname, sep, resolve } from 'path';
import { walk } from 'estree-walker';
import util from 'util';

const addExtension = function addExtension(filename, ext = '.js') {
    if (!extname(filename))
        filename += ext;
    return filename;
};

const extractors = {
    ArrayPattern(names, param) {
        for (const element of param.elements) {
            if (element)
                extractors[element.type](names, element);
        }
    },
    AssignmentPattern(names, param) {
        extractors[param.left.type](names, param.left);
    },
    Identifier(names, param) {
        names.push(param.name);
    },
    MemberExpression() { },
    ObjectPattern(names, param) {
        for (const prop of param.properties) {
            if (prop.type === 'RestElement') {
                extractors.RestElement(names, prop);
            }
            else {
                extractors[prop.value.type](names, prop.value);
            }
        }
    },
    RestElement(names, param) {
        extractors[param.argument.type](names, param.argument);
    }
};
const extractAssignedNames = function extractAssignedNames(param) {
    const names = [];
    extractors[param.type](names, param);
    return names;
};

const blockDeclarations = {
    const: true,
    let: true
};
class Scope {
    constructor(options = {}) {
        this.parent = options.parent;
        this.isBlockScope = !!options.block;
        this.declarations = Object.create(null);
        if (options.params) {
            options.params.forEach(param => {
                extractAssignedNames(param).forEach(name => {
                    this.declarations[name] = true;
                });
            });
        }
    }
    addDeclaration(node, isBlockDeclaration, isVar) {
        if (!isBlockDeclaration && this.isBlockScope) {
            // it's a `var` or function node, and this
            // is a block scope, so we need to go up
            this.parent.addDeclaration(node, isBlockDeclaration, isVar);
        }
        else if (node.id) {
            extractAssignedNames(node.id).forEach(name => {
                this.declarations[name] = true;
            });
        }
    }
    contains(name) {
        return this.declarations[name] || (this.parent ? this.parent.contains(name) : false);
    }
}
const attachScopes = function attachScopes(ast, propertyName = 'scope') {
    let scope = new Scope();
    walk(ast, {
        enter(node, parent) {
            // function foo () {...}
            // class Foo {...}
            if (/(Function|Class)Declaration/.test(node.type)) {
                scope.addDeclaration(node, false, false);
            }
            // var foo = 1
            if (node.type === 'VariableDeclaration') {
                const kind = node.kind;
                const isBlockDeclaration = blockDeclarations[kind];
                node.declarations.forEach((declaration) => {
                    scope.addDeclaration(declaration, isBlockDeclaration, true);
                });
            }
            let newScope;
            // create new function scope
            if (/Function/.test(node.type)) {
                newScope = new Scope({
                    parent: scope,
                    block: false,
                    params: node.params
                });
                // named function expressions - the name is considered
                // part of the function's scope
                if (node.type === 'FunctionExpression' && node.id) {
                    newScope.addDeclaration(node, false, false);
                }
            }
            // create new block scope
            if (node.type === 'BlockStatement' && !/Function/.test(parent.type)) {
                newScope = new Scope({
                    parent: scope,
                    block: true
                });
            }
            // catch clause has its own block scope
            if (node.type === 'CatchClause') {
                newScope = new Scope({
                    parent: scope,
                    params: [node.param],
                    block: true
                });
            }
            if (newScope) {
                Object.defineProperty(node, propertyName, {
                    value: newScope,
                    configurable: true
                });
                scope = newScope;
            }
        },
        leave(node) {
            if (node[propertyName])
                scope = scope.parent;
        }
    });
    return scope;
};

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var utils = createCommonjsModule(function (module, exports) {
    exports.isInteger = num => {
        if (typeof num === 'number') {
            return Number.isInteger(num);
        }
        if (typeof num === 'string' && num.trim() !== '') {
            return Number.isInteger(Number(num));
        }
        return false;
    };
    /**
     * Find a node of the given type
     */
    exports.find = (node, type) => node.nodes.find(node => node.type === type);
    /**
     * Find a node of the given type
     */
    exports.exceedsLimit = (min, max, step = 1, limit) => {
        if (limit === false)
            return false;
        if (!exports.isInteger(min) || !exports.isInteger(max))
            return false;
        return ((Number(max) - Number(min)) / Number(step)) >= limit;
    };
    /**
     * Escape the given node with '\\' before node.value
     */
    exports.escapeNode = (block, n = 0, type) => {
        let node = block.nodes[n];
        if (!node)
            return;
        if ((type && node.type === type) || node.type === 'open' || node.type === 'close') {
            if (node.escaped !== true) {
                node.value = '\\' + node.value;
                node.escaped = true;
            }
        }
    };
    /**
     * Returns true if the given brace node should be enclosed in literal braces
     */
    exports.encloseBrace = node => {
        if (node.type !== 'brace')
            return false;
        if ((node.commas >> 0 + node.ranges >> 0) === 0) {
            node.invalid = true;
            return true;
        }
        return false;
    };
    /**
     * Returns true if a brace node is invalid.
     */
    exports.isInvalidBrace = block => {
        if (block.type !== 'brace')
            return false;
        if (block.invalid === true || block.dollar)
            return true;
        if ((block.commas >> 0 + block.ranges >> 0) === 0) {
            block.invalid = true;
            return true;
        }
        if (block.open !== true || block.close !== true) {
            block.invalid = true;
            return true;
        }
        return false;
    };
    /**
     * Returns true if a node is an open or close node
     */
    exports.isOpenOrClose = node => {
        if (node.type === 'open' || node.type === 'close') {
            return true;
        }
        return node.open === true || node.close === true;
    };
    /**
     * Reduce an array of text nodes.
     */
    exports.reduce = nodes => nodes.reduce((acc, node) => {
        if (node.type === 'text')
            acc.push(node.value);
        if (node.type === 'range')
            node.type = 'text';
        return acc;
    }, []);
    /**
     * Flatten an array
     */
    exports.flatten = (...args) => {
        const result = [];
        const flat = arr => {
            for (let i = 0; i < arr.length; i++) {
                let ele = arr[i];
                Array.isArray(ele) ? flat(ele, result) : ele !== void 0 && result.push(ele);
            }
            return result;
        };
        flat(args);
        return result;
    };
});
var utils_1 = utils.isInteger;
var utils_2 = utils.find;
var utils_3 = utils.exceedsLimit;
var utils_4 = utils.escapeNode;
var utils_5 = utils.encloseBrace;
var utils_6 = utils.isInvalidBrace;
var utils_7 = utils.isOpenOrClose;
var utils_8 = utils.reduce;
var utils_9 = utils.flatten;

var stringify = (ast, options = {}) => {
    let stringify = (node, parent = {}) => {
        let invalidBlock = options.escapeInvalid && utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let output = '';
        if (node.value) {
            if ((invalidBlock || invalidNode) && utils.isOpenOrClose(node)) {
                return '\\' + node.value;
            }
            return node.value;
        }
        if (node.value) {
            return node.value;
        }
        if (node.nodes) {
            for (let child of node.nodes) {
                output += stringify(child);
            }
        }
        return output;
    };
    return stringify(ast);
};

/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var isNumber = function (num) {
    if (typeof num === 'number') {
        return num - num === 0;
    }
    if (typeof num === 'string' && num.trim() !== '') {
        return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
    }
    return false;
};

const toRegexRange = (min, max, options) => {
    if (isNumber(min) === false) {
        throw new TypeError('toRegexRange: expected the first argument to be a number');
    }
    if (max === void 0 || min === max) {
        return String(min);
    }
    if (isNumber(max) === false) {
        throw new TypeError('toRegexRange: expected the second argument to be a number.');
    }
    let opts = Object.assign({ relaxZeros: true }, options);
    if (typeof opts.strictZeros === 'boolean') {
        opts.relaxZeros = opts.strictZeros === false;
    }
    let relax = String(opts.relaxZeros);
    let shorthand = String(opts.shorthand);
    let capture = String(opts.capture);
    let wrap = String(opts.wrap);
    let cacheKey = min + ':' + max + '=' + relax + shorthand + capture + wrap;
    if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
        return toRegexRange.cache[cacheKey].result;
    }
    let a = Math.min(min, max);
    let b = Math.max(min, max);
    if (Math.abs(a - b) === 1) {
        let result = min + '|' + max;
        if (opts.capture) {
            return `(${result})`;
        }
        if (opts.wrap === false) {
            return result;
        }
        return `(?:${result})`;
    }
    let isPadded = hasPadding(min) || hasPadding(max);
    let state = { min, max, a, b };
    let positives = [];
    let negatives = [];
    if (isPadded) {
        state.isPadded = isPadded;
        state.maxLen = String(state.max).length;
    }
    if (a < 0) {
        let newMin = b < 0 ? Math.abs(b) : 1;
        negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
        a = state.a = 0;
    }
    if (b >= 0) {
        positives = splitToPatterns(a, b, state, opts);
    }
    state.negatives = negatives;
    state.positives = positives;
    state.result = collatePatterns(negatives, positives, opts);
    if (opts.capture === true) {
        state.result = `(${state.result})`;
    }
    else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
        state.result = `(?:${state.result})`;
    }
    toRegexRange.cache[cacheKey] = state;
    return state.result;
};
function collatePatterns(neg, pos, options) {
    let onlyNegative = filterPatterns(neg, pos, '-', false, options) || [];
    let onlyPositive = filterPatterns(pos, neg, '', false, options) || [];
    let intersected = filterPatterns(neg, pos, '-?', true, options) || [];
    let subpatterns = onlyNegative.concat(intersected).concat(onlyPositive);
    return subpatterns.join('|');
}
function splitToRanges(min, max) {
    let nines = 1;
    let zeros = 1;
    let stop = countNines(min, nines);
    let stops = new Set([max]);
    while (min <= stop && stop <= max) {
        stops.add(stop);
        nines += 1;
        stop = countNines(min, nines);
    }
    stop = countZeros(max + 1, zeros) - 1;
    while (min < stop && stop <= max) {
        stops.add(stop);
        zeros += 1;
        stop = countZeros(max + 1, zeros) - 1;
    }
    stops = [...stops];
    stops.sort(compare);
    return stops;
}
/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */
function rangeToPattern(start, stop, options) {
    if (start === stop) {
        return { pattern: start, count: [], digits: 0 };
    }
    let zipped = zip(start, stop);
    let digits = zipped.length;
    let pattern = '';
    let count = 0;
    for (let i = 0; i < digits; i++) {
        let [startDigit, stopDigit] = zipped[i];
        if (startDigit === stopDigit) {
            pattern += startDigit;
        }
        else if (startDigit !== '0' || stopDigit !== '9') {
            pattern += toCharacterClass(startDigit, stopDigit, options);
        }
        else {
            count++;
        }
    }
    if (count) {
        pattern += options.shorthand === true ? '\\d' : '[0-9]';
    }
    return { pattern, count: [count], digits };
}
function splitToPatterns(min, max, tok, options) {
    let ranges = splitToRanges(min, max);
    let tokens = [];
    let start = min;
    let prev;
    for (let i = 0; i < ranges.length; i++) {
        let max = ranges[i];
        let obj = rangeToPattern(String(start), String(max), options);
        let zeros = '';
        if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
            if (prev.count.length > 1) {
                prev.count.pop();
            }
            prev.count.push(obj.count[0]);
            prev.string = prev.pattern + toQuantifier(prev.count);
            start = max + 1;
            continue;
        }
        if (tok.isPadded) {
            zeros = padZeros(max, tok, options);
        }
        obj.string = zeros + obj.pattern + toQuantifier(obj.count);
        tokens.push(obj);
        start = max + 1;
        prev = obj;
    }
    return tokens;
}
function filterPatterns(arr, comparison, prefix, intersection, options) {
    let result = [];
    for (let ele of arr) {
        let { string } = ele;
        // only push if _both_ are negative...
        if (!intersection && !contains(comparison, 'string', string)) {
            result.push(prefix + string);
        }
        // or _both_ are positive
        if (intersection && contains(comparison, 'string', string)) {
            result.push(prefix + string);
        }
    }
    return result;
}
/**
 * Zip strings
 */
function zip(a, b) {
    let arr = [];
    for (let i = 0; i < a.length; i++)
        arr.push([a[i], b[i]]);
    return arr;
}
function compare(a, b) {
    return a > b ? 1 : b > a ? -1 : 0;
}
function contains(arr, key, val) {
    return arr.some(ele => ele[key] === val);
}
function countNines(min, len) {
    return Number(String(min).slice(0, -len) + '9'.repeat(len));
}
function countZeros(integer, zeros) {
    return integer - (integer % Math.pow(10, zeros));
}
function toQuantifier(digits) {
    let [start = 0, stop = ''] = digits;
    if (stop || start > 1) {
        return `{${start + (stop ? ',' + stop : '')}}`;
    }
    return '';
}
function toCharacterClass(a, b, options) {
    return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}
function hasPadding(str) {
    return /^-?(0+)\d/.test(str);
}
function padZeros(value, tok, options) {
    if (!tok.isPadded) {
        return value;
    }
    let diff = Math.abs(tok.maxLen - String(value).length);
    let relax = options.relaxZeros !== false;
    switch (diff) {
        case 0:
            return '';
        case 1:
            return relax ? '0?' : '0';
        case 2:
            return relax ? '0{0,2}' : '00';
        default: {
            return relax ? `0{0,${diff}}` : `0{${diff}}`;
        }
    }
}
/**
 * Cache
 */
toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});
/**
 * Expose `toRegexRange`
 */
var toRegexRange_1 = toRegexRange;

const isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
const transform = toNumber => {
    return value => toNumber === true ? Number(value) : String(value);
};
const isValidValue = value => {
    return typeof value === 'number' || (typeof value === 'string' && value !== '');
};
const isNumber$1 = num => Number.isInteger(+num);
const zeros = input => {
    let value = `${input}`;
    let index = -1;
    if (value[0] === '-')
        value = value.slice(1);
    if (value === '0')
        return false;
    while (value[++index] === '0')
        ;
    return index > 0;
};
const stringify$1 = (start, end, options) => {
    if (typeof start === 'string' || typeof end === 'string') {
        return true;
    }
    return options.stringify === true;
};
const pad = (input, maxLength, toNumber) => {
    if (maxLength > 0) {
        let dash = input[0] === '-' ? '-' : '';
        if (dash)
            input = input.slice(1);
        input = (dash + input.padStart(dash ? maxLength - 1 : maxLength, '0'));
    }
    if (toNumber === false) {
        return String(input);
    }
    return input;
};
const toMaxLen = (input, maxLength) => {
    let negative = input[0] === '-' ? '-' : '';
    if (negative) {
        input = input.slice(1);
        maxLength--;
    }
    while (input.length < maxLength)
        input = '0' + input;
    return negative ? ('-' + input) : input;
};
const toSequence = (parts, options) => {
    parts.negatives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    parts.positives.sort((a, b) => a < b ? -1 : a > b ? 1 : 0);
    let prefix = options.capture ? '' : '?:';
    let positives = '';
    let negatives = '';
    let result;
    if (parts.positives.length) {
        positives = parts.positives.join('|');
    }
    if (parts.negatives.length) {
        negatives = `-(${prefix}${parts.negatives.join('|')})`;
    }
    if (positives && negatives) {
        result = `${positives}|${negatives}`;
    }
    else {
        result = positives || negatives;
    }
    if (options.wrap) {
        return `(${prefix}${result})`;
    }
    return result;
};
const toRange = (a, b, isNumbers, options) => {
    if (isNumbers) {
        return toRegexRange_1(a, b, Object.assign({ wrap: false }, options));
    }
    let start = String.fromCharCode(a);
    if (a === b)
        return start;
    let stop = String.fromCharCode(b);
    return `[${start}-${stop}]`;
};
const toRegex = (start, end, options) => {
    if (Array.isArray(start)) {
        let wrap = options.wrap === true;
        let prefix = options.capture ? '' : '?:';
        return wrap ? `(${prefix}${start.join('|')})` : start.join('|');
    }
    return toRegexRange_1(start, end, options);
};
const rangeError = (...args) => {
    return new RangeError('Invalid range arguments: ' + util.inspect(...args));
};
const invalidRange = (start, end, options) => {
    if (options.strictRanges === true)
        throw rangeError([start, end]);
    return [];
};
const invalidStep = (step, options) => {
    if (options.strictRanges === true) {
        throw new TypeError(`Expected step "${step}" to be a number`);
    }
    return [];
};
const fillNumbers = (start, end, step = 1, options = {}) => {
    let a = Number(start);
    let b = Number(end);
    if (!Number.isInteger(a) || !Number.isInteger(b)) {
        if (options.strictRanges === true)
            throw rangeError([start, end]);
        return [];
    }
    // fix negative zero
    if (a === 0)
        a = 0;
    if (b === 0)
        b = 0;
    let descending = a > b;
    let startString = String(start);
    let endString = String(end);
    let stepString = String(step);
    step = Math.max(Math.abs(step), 1);
    let padded = zeros(startString) || zeros(endString) || zeros(stepString);
    let maxLen = padded ? Math.max(startString.length, endString.length, stepString.length) : 0;
    let toNumber = padded === false && stringify$1(start, end, options) === false;
    let format = options.transform || transform(toNumber);
    if (options.toRegex && step === 1) {
        return toRange(toMaxLen(start, maxLen), toMaxLen(end, maxLen), true, options);
    }
    let parts = { negatives: [], positives: [] };
    let push = num => parts[num < 0 ? 'negatives' : 'positives'].push(Math.abs(num));
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
        if (options.toRegex === true && step > 1) {
            push(a);
        }
        else {
            range.push(pad(format(a, index), maxLen, toNumber));
        }
        a = descending ? a - step : a + step;
        index++;
    }
    if (options.toRegex === true) {
        return step > 1
            ? toSequence(parts, options)
            : toRegex(range, null, Object.assign({ wrap: false }, options));
    }
    return range;
};
const fillLetters = (start, end, step = 1, options = {}) => {
    if ((!isNumber$1(start) && start.length > 1) || (!isNumber$1(end) && end.length > 1)) {
        return invalidRange(start, end, options);
    }
    let format = options.transform || (val => String.fromCharCode(val));
    let a = `${start}`.charCodeAt(0);
    let b = `${end}`.charCodeAt(0);
    let descending = a > b;
    let min = Math.min(a, b);
    let max = Math.max(a, b);
    if (options.toRegex && step === 1) {
        return toRange(min, max, false, options);
    }
    let range = [];
    let index = 0;
    while (descending ? a >= b : a <= b) {
        range.push(format(a, index));
        a = descending ? a - step : a + step;
        index++;
    }
    if (options.toRegex === true) {
        return toRegex(range, null, { wrap: false, options });
    }
    return range;
};
const fill = (start, end, step, options = {}) => {
    if (end == null && isValidValue(start)) {
        return [start];
    }
    if (!isValidValue(start) || !isValidValue(end)) {
        return invalidRange(start, end, options);
    }
    if (typeof step === 'function') {
        return fill(start, end, 1, { transform: step });
    }
    if (isObject(step)) {
        return fill(start, end, 0, step);
    }
    let opts = Object.assign({}, options);
    if (opts.capture === true)
        opts.wrap = true;
    step = step || opts.step || 1;
    if (!isNumber$1(step)) {
        if (step != null && !isObject(step))
            return invalidStep(step, opts);
        return fill(start, end, 1, step);
    }
    if (isNumber$1(start) && isNumber$1(end)) {
        return fillNumbers(start, end, step, opts);
    }
    return fillLetters(start, end, Math.max(Math.abs(step), 1), opts);
};
var fillRange = fill;

const compile = (ast, options = {}) => {
    let walk = (node, parent = {}) => {
        let invalidBlock = utils.isInvalidBrace(parent);
        let invalidNode = node.invalid === true && options.escapeInvalid === true;
        let invalid = invalidBlock === true || invalidNode === true;
        let prefix = options.escapeInvalid === true ? '\\' : '';
        let output = '';
        if (node.isOpen === true) {
            return prefix + node.value;
        }
        if (node.isClose === true) {
            return prefix + node.value;
        }
        if (node.type === 'open') {
            return invalid ? (prefix + node.value) : '(';
        }
        if (node.type === 'close') {
            return invalid ? (prefix + node.value) : ')';
        }
        if (node.type === 'comma') {
            return node.prev.type === 'comma' ? '' : (invalid ? node.value : '|');
        }
        if (node.value) {
            return node.value;
        }
        if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes);
            let range = fillRange(...args, Object.assign({}, options, { wrap: false, toRegex: true }));
            if (range.length !== 0) {
                return args.length > 1 && range.length > 1 ? `(${range})` : range;
            }
        }
        if (node.nodes) {
            for (let child of node.nodes) {
                output += walk(child, node);
            }
        }
        return output;
    };
    return walk(ast);
};
var compile_1 = compile;

const append = (queue = '', stash = '', enclose = false) => {
    let result = [];
    queue = [].concat(queue);
    stash = [].concat(stash);
    if (!stash.length)
        return queue;
    if (!queue.length) {
        return enclose ? utils.flatten(stash).map(ele => `{${ele}}`) : stash;
    }
    for (let item of queue) {
        if (Array.isArray(item)) {
            for (let value of item) {
                result.push(append(value, stash, enclose));
            }
        }
        else {
            for (let ele of stash) {
                if (enclose === true && typeof ele === 'string')
                    ele = `{${ele}}`;
                result.push(Array.isArray(ele) ? append(item, ele, enclose) : (item + ele));
            }
        }
    }
    return utils.flatten(result);
};
const expand = (ast, options = {}) => {
    let rangeLimit = options.rangeLimit === void 0 ? 1000 : options.rangeLimit;
    let walk = (node, parent = {}) => {
        node.queue = [];
        let p = parent;
        let q = parent.queue;
        while (p.type !== 'brace' && p.type !== 'root' && p.parent) {
            p = p.parent;
            q = p.queue;
        }
        if (node.invalid || node.dollar) {
            q.push(append(q.pop(), stringify(node, options)));
            return;
        }
        if (node.type === 'brace' && node.invalid !== true && node.nodes.length === 2) {
            q.push(append(q.pop(), ['{}']));
            return;
        }
        if (node.nodes && node.ranges > 0) {
            let args = utils.reduce(node.nodes);
            if (utils.exceedsLimit(...args, options.step, rangeLimit)) {
                throw new RangeError('expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.');
            }
            let range = fillRange(...args, options);
            if (range.length === 0) {
                range = stringify(node, options);
            }
            q.push(append(q.pop(), range));
            node.nodes = [];
            return;
        }
        let enclose = utils.encloseBrace(node);
        let queue = node.queue;
        let block = node;
        while (block.type !== 'brace' && block.type !== 'root' && block.parent) {
            block = block.parent;
            queue = block.queue;
        }
        for (let i = 0; i < node.nodes.length; i++) {
            let child = node.nodes[i];
            if (child.type === 'comma' && node.type === 'brace') {
                if (i === 1)
                    queue.push('');
                queue.push('');
                continue;
            }
            if (child.type === 'close') {
                q.push(append(q.pop(), queue, enclose));
                continue;
            }
            if (child.value && child.type !== 'open') {
                queue.push(append(queue.pop(), child.value));
                continue;
            }
            if (child.nodes) {
                walk(child, node);
            }
        }
        return queue;
    };
    return utils.flatten(walk(ast));
};
var expand_1 = expand;

var constants = {
    MAX_LENGTH: 1024 * 64,
    // Digits
    CHAR_0: '0',
    CHAR_9: '9',
    // Alphabet chars.
    CHAR_UPPERCASE_A: 'A',
    CHAR_LOWERCASE_A: 'a',
    CHAR_UPPERCASE_Z: 'Z',
    CHAR_LOWERCASE_Z: 'z',
    CHAR_LEFT_PARENTHESES: '(',
    CHAR_RIGHT_PARENTHESES: ')',
    CHAR_ASTERISK: '*',
    // Non-alphabetic chars.
    CHAR_AMPERSAND: '&',
    CHAR_AT: '@',
    CHAR_BACKSLASH: '\\',
    CHAR_BACKTICK: '`',
    CHAR_CARRIAGE_RETURN: '\r',
    CHAR_CIRCUMFLEX_ACCENT: '^',
    CHAR_COLON: ':',
    CHAR_COMMA: ',',
    CHAR_DOLLAR: '$',
    CHAR_DOT: '.',
    CHAR_DOUBLE_QUOTE: '"',
    CHAR_EQUAL: '=',
    CHAR_EXCLAMATION_MARK: '!',
    CHAR_FORM_FEED: '\f',
    CHAR_FORWARD_SLASH: '/',
    CHAR_HASH: '#',
    CHAR_HYPHEN_MINUS: '-',
    CHAR_LEFT_ANGLE_BRACKET: '<',
    CHAR_LEFT_CURLY_BRACE: '{',
    CHAR_LEFT_SQUARE_BRACKET: '[',
    CHAR_LINE_FEED: '\n',
    CHAR_NO_BREAK_SPACE: '\u00A0',
    CHAR_PERCENT: '%',
    CHAR_PLUS: '+',
    CHAR_QUESTION_MARK: '?',
    CHAR_RIGHT_ANGLE_BRACKET: '>',
    CHAR_RIGHT_CURLY_BRACE: '}',
    CHAR_RIGHT_SQUARE_BRACKET: ']',
    CHAR_SEMICOLON: ';',
    CHAR_SINGLE_QUOTE: '\'',
    CHAR_SPACE: ' ',
    CHAR_TAB: '\t',
    CHAR_UNDERSCORE: '_',
    CHAR_VERTICAL_LINE: '|',
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: '\uFEFF' /* \uFEFF */
};

/**
 * Constants
 */
const { MAX_LENGTH, CHAR_BACKSLASH, /* \ */ CHAR_BACKTICK, /* ` */ CHAR_COMMA, /* , */ CHAR_DOT, /* . */ CHAR_LEFT_PARENTHESES, /* ( */ CHAR_RIGHT_PARENTHESES, /* ) */ CHAR_LEFT_CURLY_BRACE, /* { */ CHAR_RIGHT_CURLY_BRACE, /* } */ CHAR_LEFT_SQUARE_BRACKET, /* [ */ CHAR_RIGHT_SQUARE_BRACKET, /* ] */ CHAR_DOUBLE_QUOTE, /* " */ CHAR_SINGLE_QUOTE, /* ' */ CHAR_NO_BREAK_SPACE, CHAR_ZERO_WIDTH_NOBREAK_SPACE } = constants;
/**
 * parse
 */
const parse = (input, options = {}) => {
    if (typeof input !== 'string') {
        throw new TypeError('Expected a string');
    }
    let opts = options || {};
    let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
    if (input.length > max) {
        throw new SyntaxError(`Input length (${input.length}), exceeds max characters (${max})`);
    }
    let ast = { type: 'root', input, nodes: [] };
    let stack = [ast];
    let block = ast;
    let prev = ast;
    let brackets = 0;
    let length = input.length;
    let index = 0;
    let depth = 0;
    let value;
    /**
     * Helpers
     */
    const advance = () => input[index++];
    const push = node => {
        if (node.type === 'text' && prev.type === 'dot') {
            prev.type = 'text';
        }
        if (prev && prev.type === 'text' && node.type === 'text') {
            prev.value += node.value;
            return;
        }
        block.nodes.push(node);
        node.parent = block;
        node.prev = prev;
        prev = node;
        return node;
    };
    push({ type: 'bos' });
    while (index < length) {
        block = stack[stack.length - 1];
        value = advance();
        /**
         * Invalid chars
         */
        if (value === CHAR_ZERO_WIDTH_NOBREAK_SPACE || value === CHAR_NO_BREAK_SPACE) {
            continue;
        }
        /**
         * Escaped chars
         */
        if (value === CHAR_BACKSLASH) {
            push({ type: 'text', value: (options.keepEscaping ? value : '') + advance() });
            continue;
        }
        /**
         * Right square bracket (literal): ']'
         */
        if (value === CHAR_RIGHT_SQUARE_BRACKET) {
            push({ type: 'text', value: '\\' + value });
            continue;
        }
        /**
         * Left square bracket: '['
         */
        if (value === CHAR_LEFT_SQUARE_BRACKET) {
            brackets++;
            let next;
            while (index < length && (next = advance())) {
                value += next;
                if (next === CHAR_LEFT_SQUARE_BRACKET) {
                    brackets++;
                    continue;
                }
                if (next === CHAR_BACKSLASH) {
                    value += advance();
                    continue;
                }
                if (next === CHAR_RIGHT_SQUARE_BRACKET) {
                    brackets--;
                    if (brackets === 0) {
                        break;
                    }
                }
            }
            push({ type: 'text', value });
            continue;
        }
        /**
         * Parentheses
         */
        if (value === CHAR_LEFT_PARENTHESES) {
            block = push({ type: 'paren', nodes: [] });
            stack.push(block);
            push({ type: 'text', value });
            continue;
        }
        if (value === CHAR_RIGHT_PARENTHESES) {
            if (block.type !== 'paren') {
                push({ type: 'text', value });
                continue;
            }
            block = stack.pop();
            push({ type: 'text', value });
            block = stack[stack.length - 1];
            continue;
        }
        /**
         * Quotes: '|"|`
         */
        if (value === CHAR_DOUBLE_QUOTE || value === CHAR_SINGLE_QUOTE || value === CHAR_BACKTICK) {
            let open = value;
            let next;
            if (options.keepQuotes !== true) {
                value = '';
            }
            while (index < length && (next = advance())) {
                if (next === CHAR_BACKSLASH) {
                    value += next + advance();
                    continue;
                }
                if (next === open) {
                    if (options.keepQuotes === true)
                        value += next;
                    break;
                }
                value += next;
            }
            push({ type: 'text', value });
            continue;
        }
        /**
         * Left curly brace: '{'
         */
        if (value === CHAR_LEFT_CURLY_BRACE) {
            depth++;
            let dollar = prev.value && prev.value.slice(-1) === '$' || block.dollar === true;
            let brace = {
                type: 'brace',
                open: true,
                close: false,
                dollar,
                depth,
                commas: 0,
                ranges: 0,
                nodes: []
            };
            block = push(brace);
            stack.push(block);
            push({ type: 'open', value });
            continue;
        }
        /**
         * Right curly brace: '}'
         */
        if (value === CHAR_RIGHT_CURLY_BRACE) {
            if (block.type !== 'brace') {
                push({ type: 'text', value });
                continue;
            }
            let type = 'close';
            block = stack.pop();
            block.close = true;
            push({ type, value });
            depth--;
            block = stack[stack.length - 1];
            continue;
        }
        /**
         * Comma: ','
         */
        if (value === CHAR_COMMA && depth > 0) {
            if (block.ranges > 0) {
                block.ranges = 0;
                let open = block.nodes.shift();
                block.nodes = [open, { type: 'text', value: stringify(block) }];
            }
            push({ type: 'comma', value });
            block.commas++;
            continue;
        }
        /**
         * Dot: '.'
         */
        if (value === CHAR_DOT && depth > 0 && block.commas === 0) {
            let siblings = block.nodes;
            if (depth === 0 || siblings.length === 0) {
                push({ type: 'text', value });
                continue;
            }
            if (prev.type === 'dot') {
                block.range = [];
                prev.value += value;
                prev.type = 'range';
                if (block.nodes.length !== 3 && block.nodes.length !== 5) {
                    block.invalid = true;
                    block.ranges = 0;
                    prev.type = 'text';
                    continue;
                }
                block.ranges++;
                block.args = [];
                continue;
            }
            if (prev.type === 'range') {
                siblings.pop();
                let before = siblings[siblings.length - 1];
                before.value += prev.value + value;
                prev = before;
                block.ranges--;
                continue;
            }
            push({ type: 'dot', value });
            continue;
        }
        /**
         * Text
         */
        push({ type: 'text', value });
    }
    // Mark imbalanced braces and brackets as invalid
    do {
        block = stack.pop();
        if (block.type !== 'root') {
            block.nodes.forEach(node => {
                if (!node.nodes) {
                    if (node.type === 'open')
                        node.isOpen = true;
                    if (node.type === 'close')
                        node.isClose = true;
                    if (!node.nodes)
                        node.type = 'text';
                    node.invalid = true;
                }
            });
            // get the location of the block on parent.nodes (block's siblings)
            let parent = stack[stack.length - 1];
            let index = parent.nodes.indexOf(block);
            // replace the (invalid) block with it's nodes
            parent.nodes.splice(index, 1, ...block.nodes);
        }
    } while (stack.length > 0);
    push({ type: 'eos' });
    return ast;
};
var parse_1 = parse;

/**
 * Expand the given pattern or create a regex-compatible string.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces('{a,b,c}', { compile: true })); //=> ['(a|b|c)']
 * console.log(braces('{a,b,c}')); //=> ['a', 'b', 'c']
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {String}
 * @api public
 */
const braces = (input, options = {}) => {
    let output = [];
    if (Array.isArray(input)) {
        for (let pattern of input) {
            let result = braces.create(pattern, options);
            if (Array.isArray(result)) {
                output.push(...result);
            }
            else {
                output.push(result);
            }
        }
    }
    else {
        output = [].concat(braces.create(input, options));
    }
    if (options && options.expand === true && options.nodupes === true) {
        output = [...new Set(output)];
    }
    return output;
};
/**
 * Parse the given `str` with the given `options`.
 *
 * ```js
 * // braces.parse(pattern, [, options]);
 * const ast = braces.parse('a/{b,c}/d');
 * console.log(ast);
 * ```
 * @param {String} pattern Brace pattern to parse
 * @param {Object} options
 * @return {Object} Returns an AST
 * @api public
 */
braces.parse = (input, options = {}) => parse_1(input, options);
/**
 * Creates a braces string from an AST, or an AST node.
 *
 * ```js
 * const braces = require('braces');
 * let ast = braces.parse('foo/{a,b}/bar');
 * console.log(stringify(ast.nodes[2])); //=> '{a,b}'
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */
braces.stringify = (input, options = {}) => {
    if (typeof input === 'string') {
        return stringify(braces.parse(input, options), options);
    }
    return stringify(input, options);
};
/**
 * Compiles a brace pattern into a regex-compatible, optimized string.
 * This method is called by the main [braces](#braces) function by default.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.compile('a/{b,c}/d'));
 * //=> ['a/(b|c)/d']
 * ```
 * @param {String} `input` Brace pattern or AST.
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */
braces.compile = (input, options = {}) => {
    if (typeof input === 'string') {
        input = braces.parse(input, options);
    }
    return compile_1(input, options);
};
/**
 * Expands a brace pattern into an array. This method is called by the
 * main [braces](#braces) function when `options.expand` is true. Before
 * using this method it's recommended that you read the [performance notes](#performance))
 * and advantages of using [.compile](#compile) instead.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.expand('a/{b,c}/d'));
 * //=> ['a/b/d', 'a/c/d'];
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */
braces.expand = (input, options = {}) => {
    if (typeof input === 'string') {
        input = braces.parse(input, options);
    }
    let result = expand_1(input, options);
    // filter out empty strings if specified
    if (options.noempty === true) {
        result = result.filter(Boolean);
    }
    // filter out duplicates if specified
    if (options.nodupes === true) {
        result = [...new Set(result)];
    }
    return result;
};
/**
 * Processes a brace pattern and returns either an expanded array
 * (if `options.expand` is true), a highly optimized regex-compatible string.
 * This method is called by the main [braces](#braces) function.
 *
 * ```js
 * const braces = require('braces');
 * console.log(braces.create('user-{200..300}/project-{a,b,c}-{1..10}'))
 * //=> 'user-(20[0-9]|2[1-9][0-9]|300)/project-(a|b|c)-([1-9]|10)'
 * ```
 * @param {String} `pattern` Brace pattern
 * @param {Object} `options`
 * @return {Array} Returns an array of expanded values.
 * @api public
 */
braces.create = (input, options = {}) => {
    if (input === '' || input.length < 3) {
        return [input];
    }
    return options.expand !== true
        ? braces.compile(input, options)
        : braces.expand(input, options);
};
/**
 * Expose "braces"
 */
var braces_1 = braces;

const WIN_SLASH = '\\\\/';
const WIN_NO_SLASH = `[^${WIN_SLASH}]`;
/**
 * Posix glob regex
 */
const DOT_LITERAL = '\\.';
const PLUS_LITERAL = '\\+';
const QMARK_LITERAL = '\\?';
const SLASH_LITERAL = '\\/';
const ONE_CHAR = '(?=.)';
const QMARK = '[^/]';
const END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
const START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
const DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
const NO_DOT = `(?!${DOT_LITERAL})`;
const NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
const NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
const NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
const QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
const STAR = `${QMARK}*?`;
const POSIX_CHARS = {
    DOT_LITERAL,
    PLUS_LITERAL,
    QMARK_LITERAL,
    SLASH_LITERAL,
    ONE_CHAR,
    QMARK,
    END_ANCHOR,
    DOTS_SLASH,
    NO_DOT,
    NO_DOTS,
    NO_DOT_SLASH,
    NO_DOTS_SLASH,
    QMARK_NO_DOT,
    STAR,
    START_ANCHOR
};
/**
 * Windows glob regex
 */
const WINDOWS_CHARS = Object.assign({}, POSIX_CHARS, { SLASH_LITERAL: `[${WIN_SLASH}]`, QMARK: WIN_NO_SLASH, STAR: `${WIN_NO_SLASH}*?`, DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`, NO_DOT: `(?!${DOT_LITERAL})`, NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`, NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`, NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`, QMARK_NO_DOT: `[^.${WIN_SLASH}]`, START_ANCHOR: `(?:^|[${WIN_SLASH}])`, END_ANCHOR: `(?:[${WIN_SLASH}]|$)` });
/**
 * POSIX Bracket Regex
 */
const POSIX_REGEX_SOURCE = {
    alnum: 'a-zA-Z0-9',
    alpha: 'a-zA-Z',
    ascii: '\\x00-\\x7F',
    blank: ' \\t',
    cntrl: '\\x00-\\x1F\\x7F',
    digit: '0-9',
    graph: '\\x21-\\x7E',
    lower: 'a-z',
    print: '\\x20-\\x7E ',
    punct: '\\-!"#$%&\'()\\*+,./:;<=>?@[\\]^_`{|}~',
    space: ' \\t\\r\\n\\v\\f',
    upper: 'A-Z',
    word: 'A-Za-z0-9_',
    xdigit: 'A-Fa-f0-9'
};
var constants$1 = {
    MAX_LENGTH: 1024 * 64,
    POSIX_REGEX_SOURCE,
    // regular expressions
    REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
    REGEX_NON_SPECIAL_CHAR: /^[^@![\].,$*+?^{}()|\\/]+/,
    REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
    REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
    REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
    REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
    // Replace globs with equivalent patterns to reduce parsing time.
    REPLACEMENTS: {
        '***': '*',
        '**/**': '**',
        '**/**/**': '**'
    },
    // Digits
    CHAR_0: 48,
    CHAR_9: 57,
    // Alphabet chars.
    CHAR_UPPERCASE_A: 65,
    CHAR_LOWERCASE_A: 97,
    CHAR_UPPERCASE_Z: 90,
    CHAR_LOWERCASE_Z: 122,
    CHAR_LEFT_PARENTHESES: 40,
    CHAR_RIGHT_PARENTHESES: 41,
    CHAR_ASTERISK: 42,
    // Non-alphabetic chars.
    CHAR_AMPERSAND: 38,
    CHAR_AT: 64,
    CHAR_BACKWARD_SLASH: 92,
    CHAR_CARRIAGE_RETURN: 13,
    CHAR_CIRCUMFLEX_ACCENT: 94,
    CHAR_COLON: 58,
    CHAR_COMMA: 44,
    CHAR_DOT: 46,
    CHAR_DOUBLE_QUOTE: 34,
    CHAR_EQUAL: 61,
    CHAR_EXCLAMATION_MARK: 33,
    CHAR_FORM_FEED: 12,
    CHAR_FORWARD_SLASH: 47,
    CHAR_GRAVE_ACCENT: 96,
    CHAR_HASH: 35,
    CHAR_HYPHEN_MINUS: 45,
    CHAR_LEFT_ANGLE_BRACKET: 60,
    CHAR_LEFT_CURLY_BRACE: 123,
    CHAR_LEFT_SQUARE_BRACKET: 91,
    CHAR_LINE_FEED: 10,
    CHAR_NO_BREAK_SPACE: 160,
    CHAR_PERCENT: 37,
    CHAR_PLUS: 43,
    CHAR_QUESTION_MARK: 63,
    CHAR_RIGHT_ANGLE_BRACKET: 62,
    CHAR_RIGHT_CURLY_BRACE: 125,
    CHAR_RIGHT_SQUARE_BRACKET: 93,
    CHAR_SEMICOLON: 59,
    CHAR_SINGLE_QUOTE: 39,
    CHAR_SPACE: 32,
    CHAR_TAB: 9,
    CHAR_UNDERSCORE: 95,
    CHAR_VERTICAL_LINE: 124,
    CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
    SEP: path.sep,
    /**
     * Create EXTGLOB_CHARS
     */
    extglobChars(chars) {
        return {
            '!': { type: 'negate', open: '(?:(?!(?:', close: `))${chars.STAR})` },
            '?': { type: 'qmark', open: '(?:', close: ')?' },
            '+': { type: 'plus', open: '(?:', close: ')+' },
            '*': { type: 'star', open: '(?:', close: ')*' },
            '@': { type: 'at', open: '(?:', close: ')' }
        };
    },
    /**
     * Create GLOB_CHARS
     */
    globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
    }
};

var utils$1 = createCommonjsModule(function (module, exports) {
    const win32 = process.platform === 'win32';
    const { REGEX_SPECIAL_CHARS, REGEX_SPECIAL_CHARS_GLOBAL, REGEX_REMOVE_BACKSLASH } = constants$1;
    exports.isObject = val => val !== null && typeof val === 'object' && !Array.isArray(val);
    exports.hasRegexChars = str => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = str => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = str => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, '\\$1');
    exports.toPosixSlashes = str => str.replace(/\\/g, '/');
    exports.removeBackslashes = str => {
        return str.replace(REGEX_REMOVE_BACKSLASH, match => {
            return match === '\\' ? '' : match;
        });
    };
    exports.supportsLookbehinds = () => {
        let segs = process.version.slice(1).split('.');
        if (segs.length === 3 && +segs[0] >= 9 || (+segs[0] === 8 && +segs[1] >= 10)) {
            return true;
        }
        return false;
    };
    exports.isWindows = options => {
        if (options && typeof options.windows === 'boolean') {
            return options.windows;
        }
        return win32 === true || path.sep === '\\';
    };
    exports.escapeLast = (input, char, lastIdx) => {
        let idx = input.lastIndexOf(char, lastIdx);
        if (idx === -1)
            return input;
        if (input[idx - 1] === '\\')
            return exports.escapeLast(input, char, idx - 1);
        return input.slice(0, idx) + '\\' + input.slice(idx);
    };
});
var utils_1$1 = utils$1.isObject;
var utils_2$1 = utils$1.hasRegexChars;
var utils_3$1 = utils$1.isRegexChar;
var utils_4$1 = utils$1.escapeRegex;
var utils_5$1 = utils$1.toPosixSlashes;
var utils_6$1 = utils$1.removeBackslashes;
var utils_7$1 = utils$1.supportsLookbehinds;
var utils_8$1 = utils$1.isWindows;
var utils_9$1 = utils$1.escapeLast;

const { CHAR_ASTERISK, /* * */ CHAR_AT, /* @ */ CHAR_BACKWARD_SLASH, /* \ */ CHAR_COMMA: CHAR_COMMA$1, /* , */ CHAR_DOT: CHAR_DOT$1, /* . */ CHAR_EXCLAMATION_MARK, /* ! */ CHAR_FORWARD_SLASH, /* / */ CHAR_LEFT_CURLY_BRACE: CHAR_LEFT_CURLY_BRACE$1, /* { */ CHAR_LEFT_PARENTHESES: CHAR_LEFT_PARENTHESES$1, /* ( */ CHAR_LEFT_SQUARE_BRACKET: CHAR_LEFT_SQUARE_BRACKET$1, /* [ */ CHAR_PLUS, /* + */ CHAR_QUESTION_MARK, /* ? */ CHAR_RIGHT_CURLY_BRACE: CHAR_RIGHT_CURLY_BRACE$1, /* } */ CHAR_RIGHT_PARENTHESES: CHAR_RIGHT_PARENTHESES$1, /* ) */ CHAR_RIGHT_SQUARE_BRACKET: CHAR_RIGHT_SQUARE_BRACKET$1 /* ] */ } = constants$1;
const isPathSeparator = code => {
    return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
};
/**
 * Quickly scans a glob pattern and returns an object with a handful of
 * useful properties, like `isGlob`, `path` (the leading non-glob, if it exists),
 * `glob` (the actual pattern), and `negated` (true if the path starts with `!`).
 *
 * ```js
 * const pm = require('picomatch');
 * console.log(pm.scan('foo/bar/*.js'));
 * { isGlob: true, input: 'foo/bar/*.js', base: 'foo/bar', glob: '*.js' }
 * ```
 * @param {String} `str`
 * @param {Object} `options`
 * @return {Object} Returns an object with tokens and regex source string.
 * @api public
 */
var scan = (input, options) => {
    let opts = options || {};
    let length = input.length - 1;
    let index = -1;
    let start = 0;
    let lastIndex = 0;
    let isGlob = false;
    let backslashes = false;
    let negated = false;
    let braces = 0;
    let prev;
    let code;
    let braceEscaped = false;
    let eos = () => index >= length;
    let advance = () => {
        prev = code;
        return input.charCodeAt(++index);
    };
    while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
            backslashes = true;
            next = advance();
            if (next === CHAR_LEFT_CURLY_BRACE$1) {
                braceEscaped = true;
            }
            continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE$1) {
            braces++;
            while (!eos() && (next = advance())) {
                if (next === CHAR_BACKWARD_SLASH) {
                    backslashes = true;
                    next = advance();
                    continue;
                }
                if (next === CHAR_LEFT_CURLY_BRACE$1) {
                    braces++;
                    continue;
                }
                if (!braceEscaped && next === CHAR_DOT$1 && (next = advance()) === CHAR_DOT$1) {
                    isGlob = true;
                    break;
                }
                if (!braceEscaped && next === CHAR_COMMA$1) {
                    isGlob = true;
                    break;
                }
                if (next === CHAR_RIGHT_CURLY_BRACE$1) {
                    braces--;
                    if (braces === 0) {
                        braceEscaped = false;
                        break;
                    }
                }
            }
        }
        if (code === CHAR_FORWARD_SLASH) {
            if (prev === CHAR_DOT$1 && index === (start + 1)) {
                start += 2;
                continue;
            }
            lastIndex = index + 1;
            continue;
        }
        if (code === CHAR_ASTERISK) {
            isGlob = true;
            break;
        }
        if (code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK) {
            isGlob = true;
            break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET$1) {
            while (!eos() && (next = advance())) {
                if (next === CHAR_BACKWARD_SLASH) {
                    backslashes = true;
                    next = advance();
                    continue;
                }
                if (next === CHAR_RIGHT_SQUARE_BRACKET$1) {
                    isGlob = true;
                    break;
                }
            }
        }
        let isExtglobChar = code === CHAR_PLUS
            || code === CHAR_AT
            || code === CHAR_EXCLAMATION_MARK;
        if (isExtglobChar && input.charCodeAt(index + 1) === CHAR_LEFT_PARENTHESES$1) {
            isGlob = true;
            break;
        }
        if (code === CHAR_EXCLAMATION_MARK && index === start) {
            negated = true;
            start++;
            continue;
        }
        if (code === CHAR_LEFT_PARENTHESES$1) {
            while (!eos() && (next = advance())) {
                if (next === CHAR_BACKWARD_SLASH) {
                    backslashes = true;
                    next = advance();
                    continue;
                }
                if (next === CHAR_RIGHT_PARENTHESES$1) {
                    isGlob = true;
                    break;
                }
            }
        }
        if (isGlob) {
            break;
        }
    }
    let prefix = '';
    let orig = input;
    let base = input;
    let glob = '';
    if (start > 0) {
        prefix = input.slice(0, start);
        input = input.slice(start);
        lastIndex -= start;
    }
    if (base && isGlob === true && lastIndex > 0) {
        base = input.slice(0, lastIndex);
        glob = input.slice(lastIndex);
    }
    else if (isGlob === true) {
        base = '';
        glob = input;
    }
    else {
        base = input;
    }
    if (base && base !== '' && base !== '/' && base !== input) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
            base = base.slice(0, -1);
        }
    }
    if (opts.unescape === true) {
        if (glob)
            glob = utils$1.removeBackslashes(glob);
        if (base && backslashes === true) {
            base = utils$1.removeBackslashes(base);
        }
    }
    return { prefix, input: orig, base, glob, negated, isGlob };
};

/**
 * Constants
 */
const { MAX_LENGTH: MAX_LENGTH$1, POSIX_REGEX_SOURCE: POSIX_REGEX_SOURCE$1, REGEX_NON_SPECIAL_CHAR, REGEX_SPECIAL_CHARS_BACKREF, REPLACEMENTS } = constants$1;
/**
 * Helpers
 */
const expandRange = (args, options) => {
    if (typeof options.expandRange === 'function') {
        return options.expandRange(...args, options);
    }
    args.sort();
    let value = `[${args.join('-')}]`;
    try {
    }
    catch (ex) {
        return args.map(v => utils$1.escapeRegex(v)).join('..');
    }
    return value;
};
const negate = state => {
    let count = 1;
    while (state.peek() === '!' && (state.peek(2) !== '(' || state.peek(3) === '?')) {
        state.advance();
        state.start++;
        count++;
    }
    if (count % 2 === 0) {
        return false;
    }
    state.negated = true;
    state.start++;
    return true;
};
/**
 * Create the message for a syntax error
 */
const syntaxError = (type, char) => {
    return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
};
/**
 * Parse the given input string.
 * @param {String} input
 * @param {Object} options
 * @return {Object}
 */
const parse$1 = (input, options) => {
    if (typeof input !== 'string') {
        throw new TypeError('Expected a string');
    }
    input = REPLACEMENTS[input] || input;
    let opts = Object.assign({}, options);
    let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
    let len = input.length;
    if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    let bos = { type: 'bos', value: '', output: opts.prepend || '' };
    let tokens = [bos];
    let capture = opts.capture ? '' : '?:';
    let win32 = utils$1.isWindows(options);
    // create constants based on platform, for windows or posix
    const PLATFORM_CHARS = constants$1.globChars(win32);
    const EXTGLOB_CHARS = constants$1.extglobChars(PLATFORM_CHARS);
    const { DOT_LITERAL, PLUS_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOT_SLASH, NO_DOTS_SLASH, QMARK, QMARK_NO_DOT, STAR, START_ANCHOR } = PLATFORM_CHARS;
    const globstar = (opts) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    let nodot = opts.dot ? '' : NO_DOT;
    let star = opts.bash === true ? globstar(opts) : STAR;
    let qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
    if (opts.capture) {
        star = `(${star})`;
    }
    // minimatch options support
    if (typeof opts.noext === 'boolean') {
        opts.noextglob = opts.noext;
    }
    let state = {
        index: -1,
        start: 0,
        consumed: '',
        output: '',
        backtrack: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        tokens
    };
    let extglobs = [];
    let stack = [];
    let prev = bos;
    let value;
    /**
     * Tokenizing helpers
     */
    const eos = () => state.index === len - 1;
    const peek = state.peek = (n = 1) => input[state.index + n];
    const advance = state.advance = () => input[++state.index];
    const append = token => {
        state.output += token.output != null ? token.output : token.value;
        state.consumed += token.value || '';
    };
    const increment = type => {
        state[type]++;
        stack.push(type);
    };
    const decrement = type => {
        state[type]--;
        stack.pop();
    };
    /**
     * Push tokens onto the tokens array. This helper speeds up
     * tokenizing by 1) helping us avoid backtracking as much as possible,
     * and 2) helping us avoid creating extra tokens when consecutive
     * characters are plain text. This improves performance and simplifies
     * lookbehinds.
     */
    const push = tok => {
        if (prev.type === 'globstar') {
            let isBrace = state.braces > 0 && (tok.type === 'comma' || tok.type === 'brace');
            let isExtglob = extglobs.length && (tok.type === 'pipe' || tok.type === 'paren');
            if (tok.type !== 'slash' && tok.type !== 'paren' && !isBrace && !isExtglob) {
                state.output = state.output.slice(0, -prev.output.length);
                prev.type = 'star';
                prev.value = '*';
                prev.output = star;
                state.output += prev.output;
            }
        }
        if (extglobs.length && tok.type !== 'paren' && !EXTGLOB_CHARS[tok.value]) {
            extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output)
            append(tok);
        if (prev && prev.type === 'text' && tok.type === 'text') {
            prev.value += tok.value;
            return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
    };
    const extglobOpen = (type, value) => {
        let token = Object.assign({}, EXTGLOB_CHARS[value], { conditions: 1, inner: '' });
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        let output = (opts.capture ? '(' : '') + token.open;
        push({ type, value, output: state.output ? '' : ONE_CHAR });
        push({ type: 'paren', extglob: true, value: advance(), output });
        increment('parens');
        extglobs.push(token);
    };
    const extglobClose = token => {
        let output = token.close + (opts.capture ? ')' : '');
        if (token.type === 'negate') {
            let extglobStar = star;
            if (token.inner && token.inner.length > 1 && token.inner.includes('/')) {
                extglobStar = globstar(opts);
            }
            if (extglobStar !== star || eos() || /^\)+$/.test(input.slice(state.index + 1))) {
                output = token.close = ')$))' + extglobStar;
            }
            if (token.prev.type === 'bos' && eos()) {
                state.negatedExtglob = true;
            }
        }
        push({ type: 'paren', extglob: true, value, output });
        decrement('parens');
    };
    if (opts.fastpaths !== false && !/(^[*!]|[/{[()\]}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
            if (first === '\\') {
                backslashes = true;
                return m;
            }
            if (first === '?') {
                if (esc) {
                    return esc + first + (rest ? QMARK.repeat(rest.length) : '');
                }
                if (index === 0) {
                    return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : '');
                }
                return QMARK.repeat(chars.length);
            }
            if (first === '.') {
                return DOT_LITERAL.repeat(chars.length);
            }
            if (first === '*') {
                if (esc) {
                    return esc + first + (rest ? star : '');
                }
                return star;
            }
            return esc ? m : '\\' + m;
        });
        if (backslashes === true) {
            if (opts.unescape === true) {
                output = output.replace(/\\/g, '');
            }
            else {
                output = output.replace(/\\+/g, m => {
                    return m.length % 2 === 0 ? '\\\\' : (m ? '\\' : '');
                });
            }
        }
        state.output = output;
        return state;
    }
    /**
     * Tokenize input until we reach end-of-string
     */
    while (!eos()) {
        value = advance();
        if (value === '\u0000') {
            continue;
        }
        /**
         * Escaped characters
         */
        if (value === '\\') {
            let next = peek();
            if (next === '/' && opts.bash !== true) {
                continue;
            }
            if (next === '.' || next === ';') {
                continue;
            }
            if (!next) {
                value += '\\';
                push({ type: 'text', value });
                continue;
            }
            // collapse slashes to reduce potential for exploits
            let match = /^\\+/.exec(input.slice(state.index + 1));
            let slashes = 0;
            if (match && match[0].length > 2) {
                slashes = match[0].length;
                state.index += slashes;
                if (slashes % 2 !== 0) {
                    value += '\\';
                }
            }
            if (opts.unescape === true) {
                value = advance() || '';
            }
            else {
                value += advance() || '';
            }
            if (state.brackets === 0) {
                push({ type: 'text', value });
                continue;
            }
        }
        /**
         * If we're inside a regex character class, continue
         * until we reach the closing bracket.
         */
        if (state.brackets > 0 && (value !== ']' || prev.value === '[' || prev.value === '[^')) {
            if (opts.posix !== false && value === ':') {
                let inner = prev.value.slice(1);
                if (inner.includes('[')) {
                    prev.posix = true;
                    if (inner.includes(':')) {
                        let idx = prev.value.lastIndexOf('[');
                        let pre = prev.value.slice(0, idx);
                        let rest = prev.value.slice(idx + 2);
                        let posix = POSIX_REGEX_SOURCE$1[rest];
                        if (posix) {
                            prev.value = pre + posix;
                            state.backtrack = true;
                            advance();
                            if (!bos.output && tokens.indexOf(prev) === 1) {
                                bos.output = ONE_CHAR;
                            }
                            continue;
                        }
                    }
                }
            }
            if ((value === '[' && peek() !== ':') || (value === '-' && peek() === ']')) {
                value = '\\' + value;
            }
            if (value === ']' && (prev.value === '[' || prev.value === '[^')) {
                value = '\\' + value;
            }
            if (opts.posix === true && value === '!' && prev.value === '[') {
                value = '^';
            }
            prev.value += value;
            append({ value });
            continue;
        }
        /**
         * If we're inside a quoted string, continue
         * until we reach the closing double quote.
         */
        if (state.quotes === 1 && value !== '"') {
            value = utils$1.escapeRegex(value);
            prev.value += value;
            append({ value });
            continue;
        }
        /**
         * Double quotes
         */
        if (value === '"') {
            state.quotes = state.quotes === 1 ? 0 : 1;
            if (opts.keepQuotes === true) {
                push({ type: 'text', value });
            }
            continue;
        }
        /**
         * Parentheses
         */
        if (value === '(') {
            push({ type: 'paren', value });
            increment('parens');
            continue;
        }
        if (value === ')') {
            if (state.parens === 0 && opts.strictBrackets === true) {
                throw new SyntaxError(syntaxError('opening', '('));
            }
            let extglob = extglobs[extglobs.length - 1];
            if (extglob && state.parens === extglob.parens + 1) {
                extglobClose(extglobs.pop());
                continue;
            }
            push({ type: 'paren', value, output: state.parens ? ')' : '\\)' });
            decrement('parens');
            continue;
        }
        /**
         * Brackets
         */
        if (value === '[') {
            if (opts.nobracket === true || !input.slice(state.index + 1).includes(']')) {
                if (opts.nobracket !== true && opts.strictBrackets === true) {
                    throw new SyntaxError(syntaxError('closing', ']'));
                }
                value = '\\' + value;
            }
            else {
                increment('brackets');
            }
            push({ type: 'bracket', value });
            continue;
        }
        if (value === ']') {
            if (opts.nobracket === true || (prev && prev.type === 'bracket' && prev.value.length === 1)) {
                push({ type: 'text', value, output: '\\' + value });
                continue;
            }
            if (state.brackets === 0) {
                if (opts.strictBrackets === true) {
                    throw new SyntaxError(syntaxError('opening', '['));
                }
                push({ type: 'text', value, output: '\\' + value });
                continue;
            }
            decrement('brackets');
            let prevValue = prev.value.slice(1);
            if (prev.posix !== true && prevValue[0] === '^' && !prevValue.includes('/')) {
                value = '/' + value;
            }
            prev.value += value;
            append({ value });
            // when literal brackets are explicitly disabled
            // assume we should match with a regex character class
            if (opts.literalBrackets === false || utils$1.hasRegexChars(prevValue)) {
                continue;
            }
            let escaped = utils$1.escapeRegex(prev.value);
            state.output = state.output.slice(0, -prev.value.length);
            // when literal brackets are explicitly enabled
            // assume we should escape the brackets to match literal characters
            if (opts.literalBrackets === true) {
                state.output += escaped;
                prev.value = escaped;
                continue;
            }
            // when the user specifies nothing, try to match both
            prev.value = `(${capture}${escaped}|${prev.value})`;
            state.output += prev.value;
            continue;
        }
        /**
         * Braces
         */
        if (value === '{' && opts.nobrace !== true) {
            push({ type: 'brace', value, output: '(' });
            increment('braces');
            continue;
        }
        if (value === '}') {
            if (opts.nobrace === true || state.braces === 0) {
                push({ type: 'text', value, output: '\\' + value });
                continue;
            }
            let output = ')';
            if (state.dots === true) {
                let arr = tokens.slice();
                let range = [];
                for (let i = arr.length - 1; i >= 0; i--) {
                    tokens.pop();
                    if (arr[i].type === 'brace') {
                        break;
                    }
                    if (arr[i].type !== 'dots') {
                        range.unshift(arr[i].value);
                    }
                }
                output = expandRange(range, opts);
                state.backtrack = true;
            }
            push({ type: 'brace', value, output });
            decrement('braces');
            continue;
        }
        /**
         * Pipes
         */
        if (value === '|') {
            if (extglobs.length > 0) {
                extglobs[extglobs.length - 1].conditions++;
            }
            push({ type: 'text', value });
            continue;
        }
        /**
         * Commas
         */
        if (value === ',') {
            let output = value;
            if (state.braces > 0 && stack[stack.length - 1] === 'braces') {
                output = '|';
            }
            push({ type: 'comma', value, output });
            continue;
        }
        /**
         * Slashes
         */
        if (value === '/') {
            // if the beginning of the glob is "./", advance the start
            // to the current index, and don't add the "./" characters
            // to the state. This greatly simplifies lookbehinds when
            // checking for BOS characters like "!" and "." (not "./")
            if (prev.type === 'dot' && state.index === 1) {
                state.start = state.index + 1;
                state.consumed = '';
                state.output = '';
                tokens.pop();
                prev = bos; // reset "prev" to the first token
                continue;
            }
            push({ type: 'slash', value, output: SLASH_LITERAL });
            continue;
        }
        /**
         * Dots
         */
        if (value === '.') {
            if (state.braces > 0 && prev.type === 'dot') {
                if (prev.value === '.')
                    prev.output = DOT_LITERAL;
                prev.type = 'dots';
                prev.output += value;
                prev.value += value;
                state.dots = true;
                continue;
            }
            push({ type: 'dot', value, output: DOT_LITERAL });
            continue;
        }
        /**
         * Question marks
         */
        if (value === '?') {
            if (prev && prev.type === 'paren') {
                let next = peek();
                let output = value;
                if (next === '<' && !utils$1.supportsLookbehinds()) {
                    throw new Error('Node.js v10 or higher is required for regex lookbehinds');
                }
                if (prev.value === '(' && !/[!=<:]/.test(next) || (next === '<' && !/[!=]/.test(peek(2)))) {
                    output = '\\' + value;
                }
                push({ type: 'text', value, output });
                continue;
            }
            if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
                extglobOpen('qmark', value);
                continue;
            }
            if (opts.dot !== true && (prev.type === 'slash' || prev.type === 'bos')) {
                push({ type: 'qmark', value, output: QMARK_NO_DOT });
                continue;
            }
            push({ type: 'qmark', value, output: QMARK });
            continue;
        }
        /**
         * Exclamation
         */
        if (value === '!') {
            if (opts.noextglob !== true && peek() === '(') {
                if (peek(2) !== '?' || !/[!=<:]/.test(peek(3))) {
                    extglobOpen('negate', value);
                    continue;
                }
            }
            if (opts.nonegate !== true && state.index === 0) {
                negate(state);
                continue;
            }
        }
        /**
         * Plus
         */
        if (value === '+') {
            if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
                extglobOpen('plus', value);
                continue;
            }
            if (prev && (prev.type === 'bracket' || prev.type === 'paren' || prev.type === 'brace')) {
                let output = prev.extglob === true ? '\\' + value : value;
                push({ type: 'plus', value, output });
                continue;
            }
            // use regex behavior inside parens
            if (state.parens > 0 && opts.regex !== false) {
                push({ type: 'plus', value });
                continue;
            }
            push({ type: 'plus', value: PLUS_LITERAL });
            continue;
        }
        /**
         * Plain text
         */
        if (value === '@') {
            if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
                push({ type: 'at', value, output: '' });
                continue;
            }
            push({ type: 'text', value });
            continue;
        }
        /**
         * Plain text
         */
        if (value !== '*') {
            if (value === '$' || value === '^') {
                value = '\\' + value;
            }
            let match = REGEX_NON_SPECIAL_CHAR.exec(input.slice(state.index + 1));
            if (match) {
                value += match[0];
                state.index += match[0].length;
            }
            push({ type: 'text', value });
            continue;
        }
        /**
         * Stars
         */
        if (prev && (prev.type === 'globstar' || prev.star === true)) {
            prev.type = 'star';
            prev.star = true;
            prev.value += value;
            prev.output = star;
            state.backtrack = true;
            state.consumed += value;
            continue;
        }
        if (opts.noextglob !== true && peek() === '(' && peek(2) !== '?') {
            extglobOpen('star', value);
            continue;
        }
        if (prev.type === 'star') {
            if (opts.noglobstar === true) {
                state.consumed += value;
                continue;
            }
            let prior = prev.prev;
            let before = prior.prev;
            let isStart = prior.type === 'slash' || prior.type === 'bos';
            let afterStar = before && (before.type === 'star' || before.type === 'globstar');
            if (opts.bash === true && (!isStart || (!eos() && peek() !== '/'))) {
                push({ type: 'star', value, output: '' });
                continue;
            }
            let isBrace = state.braces > 0 && (prior.type === 'comma' || prior.type === 'brace');
            let isExtglob = extglobs.length && (prior.type === 'pipe' || prior.type === 'paren');
            if (!isStart && prior.type !== 'paren' && !isBrace && !isExtglob) {
                push({ type: 'star', value, output: '' });
                continue;
            }
            // strip consecutive `/**/`
            while (input.slice(state.index + 1, state.index + 4) === '/**') {
                let after = input[state.index + 4];
                if (after && after !== '/') {
                    break;
                }
                state.consumed += '/**';
                state.index += 3;
            }
            if (prior.type === 'bos' && eos()) {
                prev.type = 'globstar';
                prev.value += value;
                prev.output = globstar(opts);
                state.output = prev.output;
                state.consumed += value;
                continue;
            }
            if (prior.type === 'slash' && prior.prev.type !== 'bos' && !afterStar && eos()) {
                state.output = state.output.slice(0, -(prior.output + prev.output).length);
                prior.output = '(?:' + prior.output;
                prev.type = 'globstar';
                prev.output = globstar(opts) + '|$)';
                prev.value += value;
                state.output += prior.output + prev.output;
                state.consumed += value;
                continue;
            }
            let next = peek();
            if (prior.type === 'slash' && prior.prev.type !== 'bos' && next === '/') {
                let end = peek(2) !== void 0 ? '|$' : '';
                state.output = state.output.slice(0, -(prior.output + prev.output).length);
                prior.output = '(?:' + prior.output;
                prev.type = 'globstar';
                prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
                prev.value += value;
                state.output += prior.output + prev.output;
                state.consumed += value + advance();
                push({ type: 'slash', value, output: '' });
                continue;
            }
            if (prior.type === 'bos' && next === '/') {
                prev.type = 'globstar';
                prev.value += value;
                prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
                state.output = prev.output;
                state.consumed += value + advance();
                push({ type: 'slash', value, output: '' });
                continue;
            }
            // remove single star from output
            state.output = state.output.slice(0, -prev.output.length);
            // reset previous token to globstar
            prev.type = 'globstar';
            prev.output = globstar(opts);
            prev.value += value;
            // reset output with globstar
            state.output += prev.output;
            state.consumed += value;
            continue;
        }
        let token = { type: 'star', value, output: star };
        if (opts.bash === true) {
            token.output = '.*?';
            if (prev.type === 'bos' || prev.type === 'slash') {
                token.output = nodot + token.output;
            }
            push(token);
            continue;
        }
        if (prev && (prev.type === 'bracket' || prev.type === 'paren') && opts.regex === true) {
            token.output = value;
            push(token);
            continue;
        }
        if (state.index === state.start || prev.type === 'slash' || prev.type === 'dot') {
            if (prev.type === 'dot') {
                state.output += NO_DOT_SLASH;
                prev.output += NO_DOT_SLASH;
            }
            else if (opts.dot === true) {
                state.output += NO_DOTS_SLASH;
                prev.output += NO_DOTS_SLASH;
            }
            else {
                state.output += nodot;
                prev.output += nodot;
            }
            if (peek() !== '*') {
                state.output += ONE_CHAR;
                prev.output += ONE_CHAR;
            }
        }
        push(token);
    }
    while (state.brackets > 0) {
        if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ']'));
        state.output = utils$1.escapeLast(state.output, '[');
        decrement('brackets');
    }
    while (state.parens > 0) {
        if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', ')'));
        state.output = utils$1.escapeLast(state.output, '(');
        decrement('parens');
    }
    while (state.braces > 0) {
        if (opts.strictBrackets === true)
            throw new SyntaxError(syntaxError('closing', '}'));
        state.output = utils$1.escapeLast(state.output, '{');
        decrement('braces');
    }
    if (opts.strictSlashes !== true && (prev.type === 'star' || prev.type === 'bracket')) {
        push({ type: 'maybe_slash', value: '', output: `${SLASH_LITERAL}?` });
    }
    // rebuild the output if we had to backtrack at any point
    if (state.backtrack === true) {
        state.output = '';
        for (let token of state.tokens) {
            state.output += token.output != null ? token.output : token.value;
            if (token.suffix) {
                state.output += token.suffix;
            }
        }
    }
    return state;
};
/**
 * Fast paths for creating regular expressions for common glob patterns.
 * This can significantly speed up processing and has very little downside
 * impact when none of the fast paths match.
 */
parse$1.fastpaths = (input, options) => {
    let opts = Object.assign({}, options);
    let max = typeof opts.maxLength === 'number' ? Math.min(MAX_LENGTH$1, opts.maxLength) : MAX_LENGTH$1;
    let len = input.length;
    if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
    }
    input = REPLACEMENTS[input] || input;
    let win32 = utils$1.isWindows(options);
    // create constants based on platform, for windows or posix
    const { DOT_LITERAL, SLASH_LITERAL, ONE_CHAR, DOTS_SLASH, NO_DOT, NO_DOTS, NO_DOTS_SLASH, STAR, START_ANCHOR } = constants$1.globChars(win32);
    let capture = opts.capture ? '' : '?:';
    let star = opts.bash === true ? '.*?' : STAR;
    let nodot = opts.dot ? NO_DOTS : NO_DOT;
    let slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
    if (opts.capture) {
        star = `(${star})`;
    }
    const globstar = (opts) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
    };
    const create = str => {
        switch (str) {
            case '*':
                return `${nodot}${ONE_CHAR}${star}`;
            case '.*':
                return `${DOT_LITERAL}${ONE_CHAR}${star}`;
            case '*.*':
                return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
            case '*/*':
                return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
            case '**':
                return nodot + globstar(opts);
            case '**/*':
                return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
            case '**/*.*':
                return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
            case '**/.*':
                return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
            default: {
                let match = /^(.*?)\.(\w+)$/.exec(str);
                if (!match)
                    return;
                let source = create(match[1], options);
                if (!source)
                    return;
                return source + DOT_LITERAL + match[2];
            }
        }
    };
    let output = create(input);
    if (output && opts.strictSlashes !== true) {
        output += `${SLASH_LITERAL}?`;
    }
    return output;
};
var parse_1$1 = parse$1;

/**
 * Creates a matcher function from one or more glob patterns. The
 * returned function takes a string to match as its first argument,
 * and returns true if the string is a match. The returned matcher
 * function also takes a boolean as the second argument that, when true,
 * returns an object with additional information.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch(glob[, options]);
 *
 * const isMatch = picomatch('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @name picomatch
 * @param {String|Array} `globs` One or more glob patterns.
 * @param {Object=} `options`
 * @return {Function=} Returns a matcher function.
 * @api public
 */
const picomatch = (glob, options, returnState = false) => {
    if (Array.isArray(glob)) {
        let fns = glob.map(input => picomatch(input, options, returnState));
        return str => {
            for (let isMatch of fns) {
                let state = isMatch(str);
                if (state)
                    return state;
            }
            return false;
        };
    }
    if (typeof glob !== 'string' || glob === '') {
        throw new TypeError('Expected pattern to be a non-empty string');
    }
    let opts = options || {};
    let posix = utils$1.isWindows(options);
    let regex = picomatch.makeRe(glob, options, false, true);
    let state = regex.state;
    delete regex.state;
    let isIgnored = () => false;
    if (opts.ignore) {
        let ignoreOpts = Object.assign({}, options, { ignore: null, onMatch: null, onResult: null });
        isIgnored = picomatch(opts.ignore, ignoreOpts, returnState);
    }
    const matcher = (input, returnObject = false) => {
        let { isMatch, match, output } = picomatch.test(input, regex, options, { glob, posix });
        let result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === 'function') {
            opts.onResult(result);
        }
        if (isMatch === false) {
            result.isMatch = false;
            return returnObject ? result : false;
        }
        if (isIgnored(input)) {
            if (typeof opts.onIgnore === 'function') {
                opts.onIgnore(result);
            }
            result.isMatch = false;
            return returnObject ? result : false;
        }
        if (typeof opts.onMatch === 'function') {
            opts.onMatch(result);
        }
        return returnObject ? result : true;
    };
    if (returnState) {
        matcher.state = state;
    }
    return matcher;
};
/**
 * Test `input` with the given `regex`. This is used by the main
 * `picomatch()` function to test the input string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.test(input, regex[, options]);
 *
 * console.log(picomatch.test('foo/bar', /^(?:([^/]*?)\/([^/]*?))$/));
 * // { isMatch: true, match: [ 'foo/', 'foo', 'bar' ], output: 'foo/bar' }
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp} `regex`
 * @return {Object} Returns an object with matching info.
 * @api public
 */
picomatch.test = (input, regex, options, { glob, posix } = {}) => {
    if (typeof input !== 'string') {
        throw new TypeError('Expected input to be a string');
    }
    if (input === '') {
        return { isMatch: false, output: '' };
    }
    let opts = options || {};
    let format = opts.format || (posix ? utils$1.toPosixSlashes : null);
    let match = input === glob;
    let output = (match && format) ? format(input) : input;
    if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
    }
    if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
            match = picomatch.matchBase(input, regex, options, posix);
        }
        else {
            match = regex.exec(output);
        }
    }
    return { isMatch: !!match, match, output };
};
/**
 * Match the basename of a filepath.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.matchBase(input, glob[, options]);
 * console.log(picomatch.matchBase('foo/bar.js', '*.js'); // true
 * ```
 * @param {String} `input` String to test.
 * @param {RegExp|String} `glob` Glob pattern or regex created by [.makeRe](#makeRe).
 * @return {Boolean}
 * @api public
 */
picomatch.matchBase = (input, glob, options, posix = utils$1.isWindows(options)) => {
    let regex = glob instanceof RegExp ? glob : picomatch.makeRe(glob, options);
    return regex.test(path.basename(input));
};
/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.isMatch(string, patterns[, options]);
 *
 * console.log(picomatch.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(picomatch.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String|Array} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */
picomatch.isMatch = (str, patterns, options) => picomatch(patterns, options)(str);
/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const picomatch = require('picomatch');
 * const result = picomatch.parse(glob[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as a regex source string.
 * @api public
 */
picomatch.parse = (glob, options) => parse_1$1(glob, options);
/**
 * Scan a glob pattern to separate the pattern into segments.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.scan(input[, options]);
 *
 * const result = picomatch.scan('!./foo/*.js');
 * console.log(result);
 * // { prefix: '!./',
 * //   input: '!./foo/*.js',
 * //   base: 'foo',
 * //   glob: '*.js',
 * //   negated: true,
 * //   isGlob: true }
 * ```
 * @param {String} `input` Glob pattern to scan.
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */
picomatch.scan = (input, options) => scan(input, options);
/**
 * Create a regular expression from a glob pattern.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.makeRe(input[, options]);
 *
 * console.log(picomatch.makeRe('*.js'));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `input` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */
picomatch.makeRe = (input, options, returnOutput = false, returnState = false) => {
    if (!input || typeof input !== 'string') {
        throw new TypeError('Expected a non-empty string');
    }
    let opts = options || {};
    let prepend = opts.contains ? '' : '^';
    let append = opts.contains ? '' : '$';
    let state = { negated: false, fastpaths: true };
    let prefix = '';
    let output;
    if (input.startsWith('./')) {
        input = input.slice(2);
        prefix = state.prefix = './';
    }
    if (opts.fastpaths !== false && (input[0] === '.' || input[0] === '*')) {
        output = parse_1$1.fastpaths(input, options);
    }
    if (output === void 0) {
        state = picomatch.parse(input, options);
        state.prefix = prefix + (state.prefix || '');
        output = state.output;
    }
    if (returnOutput === true) {
        return output;
    }
    let source = `${prepend}(?:${output})${append}`;
    if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
    }
    let regex = picomatch.toRegex(source, options);
    if (returnState === true) {
        regex.state = state;
    }
    return regex;
};
/**
 * Create a regular expression from the given regex source string.
 *
 * ```js
 * const picomatch = require('picomatch');
 * // picomatch.toRegex(source[, options]);
 *
 * const { output } = picomatch.parse('*.js');
 * console.log(picomatch.toRegex(output));
 * //=> /^(?:(?!\.)(?=.)[^/]*?\.js)$/
 * ```
 * @param {String} `source` Regular expression source string.
 * @param {Object} `options`
 * @return {RegExp}
 * @api public
 */
picomatch.toRegex = (source, options) => {
    try {
        let opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? 'i' : ''));
    }
    catch (err) {
        if (options && options.debug === true)
            throw err;
        return /$^/;
    }
};
/**
 * Picomatch constants.
 * @return {Object}
 */
picomatch.constants = constants$1;
/**
 * Expose "picomatch"
 */
var picomatch_1 = picomatch;

var picomatch$1 = picomatch_1;

const isEmptyString = val => typeof val === 'string' && (val === '' || val === './');
/**
 * Returns an array of strings that match one or more glob patterns.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm(list, patterns[, options]);
 *
 * console.log(mm(['a.js', 'a.txt'], ['*.js']));
 * //=> [ 'a.js' ]
 * ```
 * @param {String|Array<string>} list List of strings to match.
 * @param {String|Array<string>} patterns One or more glob patterns to use for matching.
 * @param {Object} options See available [options](#options)
 * @return {Array} Returns an array of matches
 * @summary false
 * @api public
 */
const micromatch = (list, patterns, options) => {
    patterns = [].concat(patterns);
    list = [].concat(list);
    let omit = new Set();
    let keep = new Set();
    let items = new Set();
    let negatives = 0;
    let onResult = state => {
        items.add(state.output);
        if (options && options.onResult) {
            options.onResult(state);
        }
    };
    for (let i = 0; i < patterns.length; i++) {
        let isMatch = picomatch$1(String(patterns[i]), Object.assign({}, options, { onResult }), true);
        let negated = isMatch.state.negated || isMatch.state.negatedExtglob;
        if (negated)
            negatives++;
        for (let item of list) {
            let matched = isMatch(item, true);
            let match = negated ? !matched.isMatch : matched.isMatch;
            if (!match)
                continue;
            if (negated) {
                omit.add(matched.output);
            }
            else {
                omit.delete(matched.output);
                keep.add(matched.output);
            }
        }
    }
    let result = negatives === patterns.length ? [...items] : [...keep];
    let matches = result.filter(item => !omit.has(item));
    if (options && matches.length === 0) {
        if (options.failglob === true) {
            throw new Error(`No matches found for "${patterns.join(', ')}"`);
        }
        if (options.nonull === true || options.nullglob === true) {
            return options.unescape ? patterns.map(p => p.replace(/\\/g, '')) : patterns;
        }
    }
    return matches;
};
/**
 * Backwards compatibility
 */
micromatch.match = micromatch;
/**
 * Returns a matcher function from the given glob `pattern` and `options`.
 * The returned function takes a string to match as its only argument and returns
 * true if the string is a match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matcher(pattern[, options]);
 *
 * const isMatch = mm.matcher('*.!(*a)');
 * console.log(isMatch('a.a')); //=> false
 * console.log(isMatch('a.b')); //=> true
 * ```
 * @param {String} `pattern` Glob pattern
 * @param {Object} `options`
 * @return {Function} Returns a matcher function.
 * @api public
 */
micromatch.matcher = (pattern, options) => picomatch$1(pattern, options);
/**
 * Returns true if **any** of the given glob `patterns` match the specified `string`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.isMatch(string, patterns[, options]);
 *
 * console.log(mm.isMatch('a.a', ['b.*', '*.a'])); //=> true
 * console.log(mm.isMatch('a.a', 'b.*')); //=> false
 * ```
 * @param {String} str The string to test.
 * @param {String|Array} patterns One or more glob patterns to use for matching.
 * @param {Object} [options] See available [options](#options).
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */
micromatch.isMatch = (str, patterns, options) => picomatch$1(patterns, options)(str);
/**
 * Backwards compatibility
 */
micromatch.any = micromatch.isMatch;
/**
 * Returns a list of strings that _**do not match any**_ of the given `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.not(list, patterns[, options]);
 *
 * console.log(mm.not(['a.a', 'b.b', 'c.c'], '*.a'));
 * //=> ['b.b', 'c.c']
 * ```
 * @param {Array} `list` Array of strings to match.
 * @param {String|Array} `patterns` One or more glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Array} Returns an array of strings that **do not match** the given patterns.
 * @api public
 */
micromatch.not = (list, patterns, options = {}) => {
    patterns = [].concat(patterns).map(String);
    let result = new Set();
    let items = [];
    let onResult = state => {
        if (options.onResult)
            options.onResult(state);
        items.push(state.output);
    };
    let matches = micromatch(list, patterns, Object.assign({}, options, { onResult }));
    for (let item of items) {
        if (!matches.includes(item)) {
            result.add(item);
        }
    }
    return [...result];
};
/**
 * Returns true if the given `string` contains the given pattern. Similar
 * to [.isMatch](#isMatch) but the pattern can match any part of the string.
 *
 * ```js
 * var mm = require('micromatch');
 * // mm.contains(string, pattern[, options]);
 *
 * console.log(mm.contains('aa/bb/cc', '*b'));
 * //=> true
 * console.log(mm.contains('aa/bb/cc', '*d'));
 * //=> false
 * ```
 * @param {String} `str` The string to match.
 * @param {String|Array} `patterns` Glob pattern to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if the patter matches any part of `str`.
 * @api public
 */
micromatch.contains = (str, pattern, options) => {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    if (Array.isArray(pattern)) {
        return pattern.some(p => micromatch.contains(str, p, options));
    }
    if (typeof pattern === 'string') {
        if (isEmptyString(str) || isEmptyString(pattern)) {
            return false;
        }
        if (str.includes(pattern) || (str.startsWith('./') && str.slice(2).includes(pattern))) {
            return true;
        }
    }
    return micromatch.isMatch(str, pattern, Object.assign({}, options, { contains: true }));
};
/**
 * Filter the keys of the given object with the given `glob` pattern
 * and `options`. Does not attempt to match nested keys. If you need this feature,
 * use [glob-object][] instead.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.matchKeys(object, patterns[, options]);
 *
 * const obj = { aa: 'a', ab: 'b', ac: 'c' };
 * console.log(mm.matchKeys(obj, '*b'));
 * //=> { ab: 'b' }
 * ```
 * @param {Object} `object` The object with keys to filter.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Object} Returns an object with only keys that match the given patterns.
 * @api public
 */
micromatch.matchKeys = (obj, patterns, options) => {
    if (!utils$1.isObject(obj)) {
        throw new TypeError('Expected the first argument to be an object');
    }
    let keys = micromatch(Object.keys(obj), patterns, options);
    let res = {};
    for (let key of keys)
        res[key] = obj[key];
    return res;
};
/**
 * Returns true if some of the strings in the given `list` match any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.some(list, patterns[, options]);
 *
 * console.log(mm.some(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // true
 * console.log(mm.some(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test. Returns as soon as the first match is found.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */
micromatch.some = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch$1(String(pattern), options);
        if (items.some(item => isMatch(item))) {
            return true;
        }
    }
    return false;
};
/**
 * Returns true if every string in the given `list` matches
 * any of the given glob `patterns`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.every(list, patterns[, options]);
 *
 * console.log(mm.every('foo.js', ['foo.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js']));
 * // true
 * console.log(mm.every(['foo.js', 'bar.js'], ['*.js', '!foo.js']));
 * // false
 * console.log(mm.every(['foo.js'], ['*.js', '!foo.js']));
 * // false
 * ```
 * @param {String|Array} `list` The string or array of strings to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */
micromatch.every = (list, patterns, options) => {
    let items = [].concat(list);
    for (let pattern of [].concat(patterns)) {
        let isMatch = picomatch$1(String(pattern), options);
        if (!items.every(item => isMatch(item))) {
            return false;
        }
    }
    return true;
};
/**
 * Returns true if **all** of the given `patterns` match
 * the specified string.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.all(string, patterns[, options]);
 *
 * console.log(mm.all('foo.js', ['foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', '!foo.js']));
 * // false
 *
 * console.log(mm.all('foo.js', ['*.js', 'foo.js']));
 * // true
 *
 * console.log(mm.all('foo.js', ['*.js', 'f*', '*o*', '*o.js']));
 * // true
 * ```
 * @param {String|Array} `str` The string to test.
 * @param {String|Array} `patterns` One or more glob patterns to use for matching.
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns true if any patterns match `str`
 * @api public
 */
micromatch.all = (str, patterns, options) => {
    if (typeof str !== 'string') {
        throw new TypeError(`Expected a string: "${util.inspect(str)}"`);
    }
    return [].concat(patterns).every(p => picomatch$1(p, options)(str));
};
/**
 * Returns an array of matches captured by `pattern` in `string, or `null` if the pattern did not match.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.capture(pattern, string[, options]);
 *
 * console.log(mm.capture('test/*.js', 'test/foo.js'));
 * //=> ['foo']
 * console.log(mm.capture('test/*.js', 'foo/bar.css'));
 * //=> null
 * ```
 * @param {String} `glob` Glob pattern to use for matching.
 * @param {String} `input` String to match
 * @param {Object} `options` See available [options](#options) for changing how matches are performed
 * @return {Boolean} Returns an array of captures if the input matches the glob pattern, otherwise `null`.
 * @api public
 */
micromatch.capture = (glob, input, options) => {
    let posix = utils$1.isWindows(options);
    let regex = picomatch$1.makeRe(String(glob), Object.assign({}, options, { capture: true }));
    let match = regex.exec(posix ? utils$1.toPosixSlashes(input) : input);
    if (match) {
        return match.slice(1).map(v => v === void 0 ? '' : v);
    }
};
/**
 * Create a regular expression from the given glob `pattern`.
 *
 * ```js
 * const mm = require('micromatch');
 * // mm.makeRe(pattern[, options]);
 *
 * console.log(mm.makeRe('*.js'));
 * //=> /^(?:(\.[\\\/])?(?!\.)(?=.)[^\/]*?\.js)$/
 * ```
 * @param {String} `pattern` A glob pattern to convert to regex.
 * @param {Object} `options`
 * @return {RegExp} Returns a regex created from the given pattern.
 * @api public
 */
micromatch.makeRe = (...args) => picomatch$1.makeRe(...args);
/**
 * Scan a glob pattern to separate the pattern into segments. Used
 * by the [split](#split) method.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm.scan(pattern[, options]);
 * ```
 * @param {String} `pattern`
 * @param {Object} `options`
 * @return {Object} Returns an object with
 * @api public
 */
micromatch.scan = (...args) => picomatch$1.scan(...args);
/**
 * Parse a glob pattern to create the source string for a regular
 * expression.
 *
 * ```js
 * const mm = require('micromatch');
 * const state = mm(pattern[, options]);
 * ```
 * @param {String} `glob`
 * @param {Object} `options`
 * @return {Object} Returns an object with useful properties and output to be used as regex source string.
 * @api public
 */
micromatch.parse = (patterns, options) => {
    let res = [];
    for (let pattern of [].concat(patterns || [])) {
        for (let str of braces_1(String(pattern), options)) {
            res.push(picomatch$1.parse(str, options));
        }
    }
    return res;
};
/**
 * Process the given brace `pattern`.
 *
 * ```js
 * const { braces } = require('micromatch');
 * console.log(braces('foo/{a,b,c}/bar'));
 * //=> [ 'foo/(a|b|c)/bar' ]
 *
 * console.log(braces('foo/{a,b,c}/bar', { expand: true }));
 * //=> [ 'foo/a/bar', 'foo/b/bar', 'foo/c/bar' ]
 * ```
 * @param {String} `pattern` String with brace pattern to process.
 * @param {Object} `options` Any [options](#options) to change how expansion is performed. See the [braces][] library for all available options.
 * @return {Array}
 * @api public
 */
micromatch.braces = (pattern, options) => {
    if (typeof pattern !== 'string')
        throw new TypeError('Expected a string');
    if ((options && options.nobrace === true) || !/\{.*\}/.test(pattern)) {
        return [pattern];
    }
    return braces_1(pattern, options);
};
/**
 * Expand braces
 */
micromatch.braceExpand = (pattern, options) => {
    if (typeof pattern !== 'string')
        throw new TypeError('Expected a string');
    return micromatch.braces(pattern, Object.assign({}, options, { expand: true }));
};
/**
 * Expose micromatch
 */
var micromatch_1 = micromatch;

function ensureArray(thing) {
    if (Array.isArray(thing))
        return thing;
    if (thing == undefined)
        return [];
    return [thing];
}

function getMatcherString(id, resolutionBase) {
    if (resolutionBase === false) {
        return id;
    }
    return resolve(...(typeof resolutionBase === 'string' ? [resolutionBase, id] : [id]));
}
const createFilter = function createFilter(include, exclude, options) {
    const resolutionBase = options && options.resolve;
    const getMatcher = (id) => {
        return id instanceof RegExp
            ? id
            : {
                test: micromatch_1.matcher(getMatcherString(id, resolutionBase)
                    .split(sep)
                    .join('/'), { dot: true })
            };
    };
    const includeMatchers = ensureArray(include).map(getMatcher);
    const excludeMatchers = ensureArray(exclude).map(getMatcher);
    return function (id) {
        if (typeof id !== 'string')
            return false;
        if (/\0/.test(id))
            return false;
        id = id.split(sep).join('/');
        for (let i = 0; i < excludeMatchers.length; ++i) {
            const matcher = excludeMatchers[i];
            if (matcher.test(id))
                return false;
        }
        for (let i = 0; i < includeMatchers.length; ++i) {
            const matcher = includeMatchers[i];
            if (matcher.test(id))
                return true;
        }
        return !includeMatchers.length;
    };
};

const reservedWords = 'break case class catch const continue debugger default delete do else export extends finally for function if import in instanceof let new return super switch this throw try typeof var void while with yield enum await implements package protected static interface private public';
const builtins = 'arguments Infinity NaN undefined null true false eval uneval isFinite isNaN parseFloat parseInt decodeURI decodeURIComponent encodeURI encodeURIComponent escape unescape Object Function Boolean Symbol Error EvalError InternalError RangeError ReferenceError SyntaxError TypeError URIError Number Math Date String RegExp Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array Map Set WeakMap WeakSet SIMD ArrayBuffer DataView JSON Promise Generator GeneratorFunction Reflect Proxy Intl';
const forbiddenIdentifiers = new Set(`${reservedWords} ${builtins}`.split(' '));
forbiddenIdentifiers.add('');
const makeLegalIdentifier = function makeLegalIdentifier(str) {
    str = str.replace(/-(\w)/g, (_, letter) => letter.toUpperCase()).replace(/[^$_a-zA-Z0-9]/g, '_');
    if (/\d/.test(str[0]) || forbiddenIdentifiers.has(str)) {
        str = `_${str}`;
    }
    return str || '_';
};

function stringify$2(obj) {
    return (JSON.stringify(obj) || 'undefined').replace(/[\u2028\u2029]/g, char => `\\u${('000' + char.charCodeAt(0).toString(16)).slice(-4)}`);
}
function serializeArray(arr, indent, baseIndent) {
    let output = '[';
    const separator = indent ? '\n' + baseIndent + indent : '';
    for (let i = 0; i < arr.length; i++) {
        const key = arr[i];
        output += `${i > 0 ? ',' : ''}${separator}${serialize(key, indent, baseIndent + indent)}`;
    }
    return output + `${indent ? '\n' + baseIndent : ''}]`;
}
function serializeObject(obj, indent, baseIndent) {
    let output = '{';
    const separator = indent ? '\n' + baseIndent + indent : '';
    const keys = Object.keys(obj);
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const stringKey = makeLegalIdentifier(key) === key ? key : stringify$2(key);
        output += `${i > 0 ? ',' : ''}${separator}${stringKey}:${indent ? ' ' : ''}${serialize(obj[key], indent, baseIndent + indent)}`;
    }
    return output + `${indent ? '\n' + baseIndent : ''}}`;
}
function serialize(obj, indent, baseIndent) {
    if (obj === Infinity)
        return 'Infinity';
    if (obj === -Infinity)
        return '-Infinity';
    if (obj === 0 && 1 / obj === -Infinity)
        return '-0';
    if (obj instanceof Date)
        return 'new Date(' + obj.getTime() + ')';
    if (obj instanceof RegExp)
        return obj.toString();
    if (obj !== obj)
        return 'NaN';
    if (Array.isArray(obj))
        return serializeArray(obj, indent, baseIndent);
    if (obj === null)
        return 'null';
    if (typeof obj === 'object')
        return serializeObject(obj, indent, baseIndent);
    return stringify$2(obj);
}
const dataToEsm = function dataToEsm(data, options = {}) {
    const t = options.compact ? '' : 'indent' in options ? options.indent : '\t';
    const _ = options.compact ? '' : ' ';
    const n = options.compact ? '' : '\n';
    const declarationType = options.preferConst ? 'const' : 'var';
    if (options.namedExports === false ||
        typeof data !== 'object' ||
        Array.isArray(data) ||
        data instanceof Date ||
        data instanceof RegExp ||
        data === null) {
        const code = serialize(data, options.compact ? null : t, '');
        const __ = _ || (/^[{[\-\/]/.test(code) ? '' : ' ');
        return `export default${__}${code};`;
    }
    let namedExportCode = '';
    const defaultExportRows = [];
    const dataKeys = Object.keys(data);
    for (let i = 0; i < dataKeys.length; i++) {
        const key = dataKeys[i];
        if (key === makeLegalIdentifier(key)) {
            if (options.objectShorthand)
                defaultExportRows.push(key);
            else
                defaultExportRows.push(`${key}:${_}${key}`);
            namedExportCode += `export ${declarationType} ${key}${_}=${_}${serialize(data[key], options.compact ? null : t, '')};${n}`;
        }
        else {
            defaultExportRows.push(`${stringify$2(key)}:${_}${serialize(data[key], options.compact ? null : t, '')}`);
        }
    }
    return (namedExportCode + `export default${_}{${n}${t}${defaultExportRows.join(`,${n}${t}`)}${n}};${n}`);
};

export { addExtension, attachScopes, createFilter, dataToEsm, extractAssignedNames, makeLegalIdentifier };
