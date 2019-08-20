/**
 * @fileoverview Prevent JSX prop spreading
 * @author Ashish Gambhir
 */

'use strict';

const docsUrl = require('../util/docsUrl');

// ------------------------------------------------------------------------------
// Constants
// ------------------------------------------------------------------------------

const OPTIONS = {ignore: 'ignore', enforce: 'enforce'};
const DEFAULTS = {html: OPTIONS.enforce, custom: OPTIONS.enforce, exceptions: []};

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: 'Prevent JSX prop spreading',
      category: 'Best Practices',
      recommended: false,
      url: docsUrl('jsx-props-no-spreading')
    },
    schema: [{
      allOf: [{
        type: 'object',
        properties: {
          html: {
            enum: [OPTIONS.enforce, OPTIONS.ignore]
          },
          custom: {
            enum: [OPTIONS.enforce, OPTIONS.ignore]
          },
          exceptions: {
            type: 'array',
            items: {
              type: 'string',
              uniqueItems: true
            }
          }
        }
      }, {
        not: {
          type: 'object',
          required: ['html', 'custom'],
          properties: {
            html: {
              enum: [OPTIONS.ignore]
            },
            custom: {
              enum: [OPTIONS.ignore]
            },
            exceptions: {
              type: 'array',
              minItems: 0,
              maxItems: 0
            }
          }
        }
      }]
    }]
  },

  create(context) {
    const configuration = context.options[0] || {};
    const ignoreHtmlTags = (configuration.html || DEFAULTS.html) === OPTIONS.ignore;
    const ignoreCustomTags = (configuration.custom || DEFAULTS.custom) === OPTIONS.ignore;
    const exceptions = configuration.exceptions || DEFAULTS.exceptions;
    const isException = (tag, allExceptions) => allExceptions.indexOf(tag) !== -1;
    return {
      JSXSpreadAttribute(node) {
        const tagName = node.parent.name.name;
        const isHTMLTag = tagName && tagName[0] !== tagName[0].toUpperCase();
        const isCustomTag = tagName && tagName[0] === tagName[0].toUpperCase();
        if (isHTMLTag &&
          ((ignoreHtmlTags && !isException(tagName, exceptions)) ||
          (!ignoreHtmlTags && isException(tagName, exceptions)))) {
          return;
        }
        if (isCustomTag &&
          ((ignoreCustomTags && !isException(tagName, exceptions)) ||
          (!ignoreCustomTags && isException(tagName, exceptions)))) {
          return;
        }
        context.report({
          node,
          message: 'Prop spreading is forbidden'
        });
      }
    };
  }
};
