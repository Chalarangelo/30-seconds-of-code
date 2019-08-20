'use strict';

var csstree     = require('css-tree'),
    List        = csstree.List,
    stable      = require('stable'),
    specificity = require('csso/lib/restructure/prepare/specificity');


/**
 * Flatten a CSS AST to a selectors list.
 *
 * @param {Object} cssAst css-tree AST to flatten
 * @return {Array} selectors
 */
function flattenToSelectors(cssAst) {
    var selectors = [];

    csstree.walk(cssAst, {visit: 'Rule', enter: function(node) {
        if (node.type !== 'Rule') {
            return;
        }

        var atrule = this.atrule;
        var rule = node;

        node.prelude.children.each(function(selectorNode, selectorItem) {
            var selector = {
                item: selectorItem,
                atrule: atrule,
                rule: rule,
                pseudos: []
            };

            selectorNode.children.each(function(selectorChildNode, selectorChildItem, selectorChildList) {
                if (selectorChildNode.type === 'PseudoClassSelector' ||
                    selectorChildNode.type === 'PseudoElementSelector') {
                    selector.pseudos.push({
                        item: selectorChildItem,
                        list: selectorChildList
                    });
                }
            });

            selectors.push(selector);
        });
    }});

    return selectors;
}

/**
 * Filter selectors by Media Query.
 *
 * @param {Array} selectors to filter
 * @param {Array} useMqs Array with strings of media queries that should pass (<name> <expression>)
 * @return {Array} Filtered selectors that match the passed media queries
 */
function filterByMqs(selectors, useMqs) {
    return selectors.filter(function(selector) {
        if (selector.atrule === null) {
            return ~useMqs.indexOf('');
        }

        var mqName = selector.atrule.name;
        var mqStr = mqName;
        if (selector.atrule.expression &&
            selector.atrule.expression.children.first().type === 'MediaQueryList') {
            var mqExpr = csstree.generate(selector.atrule.expression);
            mqStr = [mqName, mqExpr].join(' ');
        }

        return ~useMqs.indexOf(mqStr);
    });
}

/**
 * Filter selectors by the pseudo-elements and/or -classes they contain.
 *
 * @param {Array} selectors to filter
 * @param {Array} usePseudos Array with strings of single or sequence of pseudo-elements and/or -classes that should pass
 * @return {Array} Filtered selectors that match the passed pseudo-elements and/or -classes
 */
function filterByPseudos(selectors, usePseudos) {
    return selectors.filter(function(selector) {
        var pseudoSelectorsStr = csstree.generate({
            type: 'Selector',
            children: new List().fromArray(selector.pseudos.map(function(pseudo) {
                return pseudo.item.data;
            }))
        });
        return ~usePseudos.indexOf(pseudoSelectorsStr);
    });
}

/**
 * Remove pseudo-elements and/or -classes from the selectors for proper matching.
 *
 * @param {Array} selectors to clean
 * @return {Array} Selectors without pseudo-elements and/or -classes
 */
function cleanPseudos(selectors) {
    selectors.forEach(function(selector) {
        selector.pseudos.forEach(function(pseudo) {
            pseudo.list.remove(pseudo.item);
        });
    });
}


/**
 * Compares two selector specificities.
 * extracted from https://github.com/keeganstreet/specificity/blob/master/specificity.js#L211
 *
 * @param {Array} aSpecificity Specificity of selector A
 * @param {Array} bSpecificity Specificity of selector B
 * @return {Number} Score of selector specificity A compared to selector specificity B
 */
function compareSpecificity(aSpecificity, bSpecificity) {
    for (var i = 0; i < 4; i += 1) {
        if (aSpecificity[i] < bSpecificity[i]) {
            return -1;
        } else if (aSpecificity[i] > bSpecificity[i]) {
            return 1;
        }
    }

    return 0;
}


/**
 * Compare two simple selectors.
 *
 * @param {Object} aSimpleSelectorNode Simple selector A
 * @param {Object} bSimpleSelectorNode Simple selector B
 * @return {Number} Score of selector A compared to selector B
 */
function compareSimpleSelectorNode(aSimpleSelectorNode, bSimpleSelectorNode) {
    var aSpecificity = specificity(aSimpleSelectorNode),
        bSpecificity = specificity(bSimpleSelectorNode);
    return compareSpecificity(aSpecificity, bSpecificity);
}

function _bySelectorSpecificity(selectorA, selectorB) {
    return compareSimpleSelectorNode(selectorA.item.data, selectorB.item.data);
}


/**
 * Sort selectors stably by their specificity.
 *
 * @param {Array} selectors to be sorted
 * @return {Array} Stable sorted selectors
 */
function sortSelectors(selectors) {
    return stable(selectors, _bySelectorSpecificity);
}


/**
 * Convert a css-tree AST style declaration to CSSStyleDeclaration property.
 *
 * @param {Object} declaration css-tree style declaration
 * @return {Object} CSSStyleDeclaration property
 */
function csstreeToStyleDeclaration(declaration) {
    var propertyName = declaration.property,
        propertyValue = csstree.generate(declaration.value),
        propertyPriority = (declaration.important ? 'important' : '');
    return {
        name: propertyName,
        value: propertyValue,
        priority: propertyPriority
    };
}


/**
 * Gets the CSS string of a style element
 *
 * @param {Object} element style element
 * @return {String|Array} CSS string or empty array if no styles are set
 */
function getCssStr(elem) {
    return elem.content[0].text || elem.content[0].cdata || [];
}

/**
 * Sets the CSS string of a style element
 *
 * @param {Object} element style element
 * @param {String} CSS string to be set
 * @return {Object} reference to field with CSS
 */
function setCssStr(elem, css) {
    // in case of cdata field
    if(elem.content[0].cdata) {
        elem.content[0].cdata = css;
        return elem.content[0].cdata;
    }

    // in case of text field + if nothing was set yet
    elem.content[0].text  = css;
    return elem.content[0].text;
}


module.exports.flattenToSelectors = flattenToSelectors;

module.exports.filterByMqs = filterByMqs;
module.exports.filterByPseudos = filterByPseudos;
module.exports.cleanPseudos = cleanPseudos;

module.exports.compareSpecificity = compareSpecificity;
module.exports.compareSimpleSelectorNode = compareSimpleSelectorNode;

module.exports.sortSelectors = sortSelectors;

module.exports.csstreeToStyleDeclaration = csstreeToStyleDeclaration;

module.exports.getCssStr = getCssStr;
module.exports.setCssStr = setCssStr;
