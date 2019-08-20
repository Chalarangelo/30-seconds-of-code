'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _vendors = require('vendors');

var _vendors2 = _interopRequireDefault(_vendors);

var _cssnanoUtilSameParent = require('cssnano-util-same-parent');

var _cssnanoUtilSameParent2 = _interopRequireDefault(_cssnanoUtilSameParent);

var _ensureCompatibility = require('./lib/ensureCompatibility');

var _ensureCompatibility2 = _interopRequireDefault(_ensureCompatibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefixes = _vendors2.default.map(v => `-${v}-`);

function intersect(a, b, not) {
    return a.filter(c => {
        const index = ~b.indexOf(c);
        return not ? !index : index;
    });
}

// Internet Explorer use :-ms-input-placeholder.
// Microsoft Edge use ::-ms-input-placeholder.
const findMsInputPlaceholder = selector => ~selector.search(/-ms-input-placeholder/i);
const different = (a, b) => intersect(a, b, true).concat(intersect(b, a, true));
const filterPrefixes = selector => intersect(prefixes, selector);

function sameVendor(selectorsA, selectorsB) {
    let same = selectors => selectors.map(filterPrefixes).join();
    let findMsVendor = selectors => selectors.find(findMsInputPlaceholder);
    return same(selectorsA) === same(selectorsB) && !(findMsVendor(selectorsA) && findMsVendor(selectorsB));
}

const noVendor = selector => !filterPrefixes(selector).length;

function canMerge(ruleA, ruleB, browsers, compatibilityCache) {
    const a = ruleA.selectors;
    const b = ruleB.selectors;

    const selectors = a.concat(b);

    if (!(0, _ensureCompatibility2.default)(selectors, browsers, compatibilityCache)) {
        return false;
    }

    const parent = (0, _cssnanoUtilSameParent2.default)(ruleA, ruleB);
    const { name } = ruleA.parent;
    if (parent && name && ~name.indexOf('keyframes')) {
        return false;
    }
    return parent && (selectors.every(noVendor) || sameVendor(a, b));
}

const getDecls = rule => rule.nodes && rule.nodes.map(String);
const joinSelectors = (...rules) => rules.map(s => s.selector).join();

function ruleLength(...rules) {
    return rules.map(r => r.nodes.length ? String(r) : '').join('').length;
}

function splitProp(prop) {
    const parts = prop.split('-');
    let base, rest;
    // Treat vendor prefixed properties as if they were unprefixed;
    // moving them when combined with non-prefixed properties can
    // cause issues. e.g. moving -webkit-background-clip when there
    // is a background shorthand definition.
    if (prop[0] === '-') {
        base = parts[2];
        rest = parts.slice(3);
    } else {
        base = parts[0];
        rest = parts.slice(1);
    }
    return [base, rest];
}

function isConflictingProp(propA, propB) {
    if (propA === propB) {
        return true;
    }
    const a = splitProp(propA);
    const b = splitProp(propB);
    return a[0] === b[0] && a[1].length !== b[1].length;
}

function hasConflicts(declProp, notMoved) {
    return notMoved.some(prop => isConflictingProp(prop, declProp));
}

function partialMerge(first, second) {
    let intersection = intersect(getDecls(first), getDecls(second));
    if (!intersection.length) {
        return second;
    }
    let nextRule = second.next();
    if (nextRule && nextRule.type === 'rule' && canMerge(second, nextRule)) {
        let nextIntersection = intersect(getDecls(second), getDecls(nextRule));
        if (nextIntersection.length > intersection.length) {
            first = second;second = nextRule;intersection = nextIntersection;
        }
    }
    const recievingBlock = second.clone();
    recievingBlock.selector = joinSelectors(first, second);
    recievingBlock.nodes = [];
    const difference = different(getDecls(first), getDecls(second));
    const filterConflicts = (decls, intersectn) => {
        let willNotMove = [];
        return decls.reduce((willMove, decl) => {
            let intersects = ~intersectn.indexOf(decl);
            let prop = decl.split(':')[0];
            let base = prop.split('-')[0];
            let canMove = difference.every(d => d.split(':')[0] !== base);
            if (intersects && canMove && !hasConflicts(prop, willNotMove)) {
                willMove.push(decl);
            } else {
                willNotMove.push(prop);
            }
            return willMove;
        }, []);
    };
    const containsAllDeclaration = intersectionList => {
        return intersectionList.some(declaration => {
            return declaration.split(':')[0].toLowerCase() === 'all';
        });
    };
    intersection = filterConflicts(getDecls(first).reverse(), intersection);
    intersection = filterConflicts(getDecls(second), intersection);

    // Rules with "all" declarations must be on top
    if (containsAllDeclaration(intersection)) {
        second.parent.insertBefore(first, recievingBlock);
    } else {
        second.parent.insertBefore(second, recievingBlock);
    }

    const firstClone = first.clone();
    const secondClone = second.clone();
    const moveDecl = callback => {
        return decl => {
            if (~intersection.indexOf(String(decl))) {
                callback.call(this, decl);
            }
        };
    };
    firstClone.walkDecls(moveDecl(decl => {
        decl.remove();
        recievingBlock.append(decl);
    }));
    secondClone.walkDecls(moveDecl(decl => decl.remove()));
    const merged = ruleLength(firstClone, recievingBlock, secondClone);
    const original = ruleLength(first, second);
    if (merged < original) {
        first.replaceWith(firstClone);
        second.replaceWith(secondClone);
        [firstClone, recievingBlock, secondClone].forEach(r => {
            if (!r.nodes.length) {
                r.remove();
            }
        });
        if (!secondClone.parent) {
            return recievingBlock;
        }
        return secondClone;
    } else {
        recievingBlock.remove();
        return second;
    }
}

function selectorMerger(browsers, compatibilityCache) {
    let cache = null;
    return function (rule) {
        // Prime the cache with the first rule, or alternately ensure that it is
        // safe to merge both declarations before continuing
        if (!cache || !canMerge(rule, cache, browsers, compatibilityCache)) {
            cache = rule;
            return;
        }
        // Ensure that we don't deduplicate the same rule; this is sometimes
        // caused by a partial merge
        if (cache === rule) {
            cache = rule;
            return;
        }
        // Merge when declarations are exactly equal
        // e.g. h1 { color: red } h2 { color: red }
        if (getDecls(rule).join(';') === getDecls(cache).join(';')) {
            rule.selector = joinSelectors(cache, rule);
            cache.remove();
            cache = rule;
            return;
        }
        // Merge when both selectors are exactly equal
        // e.g. a { color: blue } a { font-weight: bold }
        if (cache.selector === rule.selector) {
            const cached = getDecls(cache);
            rule.walk(decl => {
                if (~cached.indexOf(String(decl))) {
                    return decl.remove();
                }
                cache.append(decl);
            });
            rule.remove();
            return;
        }
        // Partial merge: check if the rule contains a subset of the last; if
        // so create a joined selector with the subset, if smaller.
        cache = partialMerge(cache, rule);
    };
}

exports.default = _postcss2.default.plugin('postcss-merge-rules', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        const compatibilityCache = {};
        css.walkRules(selectorMerger(browsers, compatibilityCache));
    };
});
module.exports = exports['default'];