'use strict';

const docsUrl = require('../util/docsUrl');

// This list is taken from https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements
const INLINE_ELEMENTS = new Set([
  'a',
  'abbr',
  'acronym',
  'b',
  'bdo',
  'big',
  'br',
  'button',
  'cite',
  'code',
  'dfn',
  'em',
  'i',
  'img',
  'input',
  'kbd',
  'label',
  'map',
  'object',
  'q',
  'samp',
  'script',
  'select',
  'small',
  'span',
  'strong',
  'sub',
  'sup',
  'textarea',
  'tt',
  'var'
]);

module.exports = {
  meta: {
    docs: {
      description: 'Ensures inline tags are not rendered without spaces between them',
      category: 'Stylistic Issues',
      recommended: false,
      url: docsUrl('jsx-child-element-spacing')
    },
    fixable: false,
    schema: [
      {
        type: 'object',
        properties: {},
        default: {},
        additionalProperties: false
      }
    ]
  },
  create(context) {
    const TEXT_FOLLOWING_ELEMENT_PATTERN = /^\s*\n\s*\S/;
    const TEXT_PRECEDING_ELEMENT_PATTERN = /\S\s*\n\s*$/;

    const elementName = node => (
      node.openingElement &&
      node.openingElement.name &&
      node.openingElement.name.type === 'JSXIdentifier' &&
      node.openingElement.name.name
    );

    const isInlineElement = node => (
      node.type === 'JSXElement' &&
      INLINE_ELEMENTS.has(elementName(node))
    );

    const handleJSX = (node) => {
      let lastChild = null;
      let child = null;
      (node.children.concat([null])).forEach((nextChild) => {
        if (
          (lastChild || nextChild) &&
          (!lastChild || isInlineElement(lastChild)) &&
          (child && (child.type === 'Literal' || child.type === 'JSXText')) &&
          (!nextChild || isInlineElement(nextChild)) &&
          true
        ) {
          if (lastChild && child.value.match(TEXT_FOLLOWING_ELEMENT_PATTERN)) {
            context.report({
              node: lastChild,
              loc: lastChild.loc.end,
              message: `Ambiguous spacing after previous element ${elementName(lastChild)}`
            });
          } else if (nextChild && child.value.match(TEXT_PRECEDING_ELEMENT_PATTERN)) {
            context.report({
              node: nextChild,
              loc: nextChild.loc.start,
              message: `Ambiguous spacing before next element ${elementName(nextChild)}`
            });
          }
        }
        lastChild = child;
        child = nextChild;
      });
    };

    return {
      JSXElement: handleJSX,
      JSXFragment: handleJSX
    };
  }
};
