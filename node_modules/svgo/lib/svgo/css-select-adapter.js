'use strict';

var baseCssAdapter = require('css-select-base-adapter');

/**
 * DOMUtils API for SVGO AST (used by css-select)
 */
var svgoCssSelectAdapterMin = {

    // is the node a tag?
    // isTag: ( node:Node ) => isTag:Boolean
    isTag: function(node) {
        return node.isElem();
    },

    // get the parent of the node
    // getParent: ( node:Node ) => parentNode:Node
    // returns null when no parent exists
    getParent: function(node) {
        return node.parentNode || null;
    },

    // get the node's children
    // getChildren: ( node:Node ) => children:[Node]
    getChildren: function(node) {
        return node.content || [];
    },

    // get the name of the tag
    // getName: ( elem:ElementNode ) => tagName:String
    getName: function(elemAst) {
        return elemAst.elem;
    },

    // get the text content of the node, and its children if it has any
    // getText: ( node:Node ) => text:String
    // returns empty string when there is no text
    getText: function(node) {
        return node.content[0].text || node.content[0].cdata || '';
    },

    // get the attribute value
    // getAttributeValue: ( elem:ElementNode, name:String ) => value:String
    // returns null when attribute doesn't exist
    getAttributeValue: function(elem, name) {
        return elem.hasAttr(name) ? elem.attr(name).value : null;
    }
};

// use base adapter for default implementation
var svgoCssSelectAdapter = baseCssAdapter(svgoCssSelectAdapterMin);

module.exports = svgoCssSelectAdapter;
