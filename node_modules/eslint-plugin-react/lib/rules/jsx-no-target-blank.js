/**
 * @fileoverview Forbid target='_blank' attribute
 * @author Kevin Miller
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const linkComponentsUtil = require('../util/linkComponents');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

function isTargetBlank(attr) {
  return attr.name &&
    attr.name.name === 'target' &&
    attr.value &&
    attr.value.type === 'Literal' &&
    attr.value.value.toLowerCase() === '_blank';
}

function hasExternalLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
      attr.name.name === linkAttribute &&
      attr.value.type === 'Literal' &&
      /^(?:\w+:|\/\/)/.test(attr.value.value));
}

function hasDynamicLink(element, linkAttribute) {
  return element.attributes.some(attr => attr.name &&
    attr.name.name === linkAttribute &&
    attr.value.type === 'JSXExpressionContainer');
}

function hasSecureRel(element) {
  return element.attributes.find((attr) => {
    if (attr.type === 'JSXAttribute' && attr.name.name === 'rel') {
      const tags = attr.value && attr.value.type === 'Literal' && attr.value.value.toLowerCase().split(' ');
      return tags && (tags.indexOf('noopener') >= 0 && tags.indexOf('noreferrer') >= 0);
    }
    return false;
  });
}

module.exports = {
  meta: {
    docs: {
      description: 'Forbid target="_blank" attribute without rel="noopener noreferrer"',
      category: 'Best Practices',
      recommended: true,
      url: docsUrl('jsx-no-target-blank')
    },
    schema: [{
      type: 'object',
      properties: {
        enforceDynamicLinks: {
          enum: ['always', 'never']
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const enforceDynamicLinks = configuration.enforceDynamicLinks || 'always';
    const components = linkComponentsUtil.getLinkComponents(context);

    return {
      JSXAttribute(node) {
        if (!components.has(node.parent.name.name) || !isTargetBlank(node) || hasSecureRel(node.parent)) {
          return;
        }

        const linkAttribute = components.get(node.parent.name.name);

        if (hasExternalLink(node.parent, linkAttribute) || (enforceDynamicLinks === 'always' && hasDynamicLink(node.parent, linkAttribute))) {
          context.report({
            node,
            message: 'Using target="_blank" without rel="noopener noreferrer" ' +
              'is a security risk: see https://mathiasbynens.github.io/rel-noopener'
          });
        }
      }
    };
  }
};
