/**
 * @fileoverview Prevent void elements (e.g. <img />, <br />) from receiving
 *   children
 * @author Joe Lencioni
 */

'use strict';

const has = require('has');

const Components = require('../util/Components');
const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

// Using an object here to avoid array scan. We should switch to Set once
// support is good enough.
const VOID_DOM_ELEMENTS = {
  area: true,
  base: true,
  br: true,
  col: true,
  embed: true,
  hr: true,
  img: true,
  input: true,
  keygen: true,
  link: true,
  menuitem: true,
  meta: true,
  param: true,
  source: true,
  track: true,
  wbr: true
};

function isVoidDOMElement(elementName) {
  return has(VOID_DOM_ELEMENTS, elementName);
}

function errorMessage(elementName) {
  return `Void DOM element <${elementName} /> cannot receive children.`;
}

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent passing of children to void DOM elements (e.g. <br />).',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('void-dom-elements-no-children')
    },
    schema: []
  },

  create: Components.detect((context, components, utils) => ({
    JSXElement(node) {
      const elementName = node.openingElement.name.name;

      if (!isVoidDOMElement(elementName)) {
        // e.g. <div />
        return;
      }

      if (node.children.length > 0) {
        // e.g. <br>Foo</br>
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }

      const attributes = node.openingElement.attributes;

      const hasChildrenAttributeOrDanger = attributes.some((attribute) => {
        if (!attribute.name) {
          return false;
        }

        return attribute.name.name === 'children' || attribute.name.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenAttributeOrDanger) {
        // e.g. <br children="Foo" />
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }
    },

    CallExpression(node) {
      if (node.callee.type !== 'MemberExpression' && node.callee.type !== 'Identifier') {
        return;
      }

      if (!utils.isCreateElement(node)) {
        return;
      }

      const args = node.arguments;

      if (args.length < 1) {
        // React.createElement() should not crash linter
        return;
      }

      const elementName = args[0].value;

      if (!isVoidDOMElement(elementName)) {
        // e.g. React.createElement('div');
        return;
      }

      if (args.length < 2 || args[1].type !== 'ObjectExpression') {
        return;
      }

      const firstChild = args[2];
      if (firstChild) {
        // e.g. React.createElement('br', undefined, 'Foo')
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }

      const props = args[1].properties;

      const hasChildrenPropOrDanger = props.some((prop) => {
        if (!prop.key) {
          return false;
        }

        return prop.key.name === 'children' || prop.key.name === 'dangerouslySetInnerHTML';
      });

      if (hasChildrenPropOrDanger) {
        // e.g. React.createElement('br', { children: 'Foo' })
        context.report({
          node,
          message: errorMessage(elementName)
        });
      }
    }
  }))
};
