/**
 * @fileoverview HTML special characters should be escaped.
 * @author Patrick Hayes
 */

'use strict';

const docsUrl = require('../util/docsUrl');
const jsxUtil = require('../util/jsx');

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

// NOTE: '<' and '{' are also problematic characters, but they do not need
// to be included here because it is a syntax error when these characters are
// included accidentally.
const DEFAULTS = [{
  char: '>',
  alternatives: ['&gt;']
}, {
  char: '"',
  alternatives: ['&quot;', '&ldquo;', '&#34;', '&rdquo;']
}, {
  char: '\'',
  alternatives: ['&apos;', '&lsquo;', '&#39;', '&rsquo;']
}, {
  char: '}',
  alternatives: ['&#125;']
}];

module.exports = {
  meta: {
    docs: {
      description: 'Detect unescaped HTML entities, which might represent malformed tags',
      category: 'Possible Errors',
      recommended: true,
      url: docsUrl('no-unescaped-entities')
    },
    schema: [{
      type: 'object',
      properties: {
        forbid: {
          type: 'array',
          items: {
            oneOf: [{
              type: 'string'
            }, {
              type: 'object',
              properties: {
                char: {
                  type: 'string'
                },
                alternatives: {
                  type: 'array',
                  uniqueItems: true,
                  items: {
                    type: 'string'
                  }
                }
              }
            }]
          }
        }
      },
      additionalProperties: false
    }]
  },

  create(context) {
    function reportInvalidEntity(node) {
      const configuration = context.options[0] || {};
      const entities = configuration.forbid || DEFAULTS;

      // HTML entites are already escaped in node.value (as well as node.raw),
      // so pull the raw text from context.getSourceCode()
      for (let i = node.loc.start.line; i <= node.loc.end.line; i++) {
        let rawLine = context.getSourceCode().lines[i - 1];
        let start = 0;
        let end = rawLine.length;
        if (i === node.loc.start.line) {
          start = node.loc.start.column;
        }
        if (i === node.loc.end.line) {
          end = node.loc.end.column;
        }
        rawLine = rawLine.substring(start, end);
        for (let j = 0; j < entities.length; j++) {
          for (let index = 0; index < rawLine.length; index++) {
            const c = rawLine[index];
            if (typeof entities[j] === 'string') {
              if (c === entities[j]) {
                context.report({
                  loc: {line: i, column: start + index},
                  message: `HTML entity, \`${entities[j]}\` , must be escaped.`,
                  node
                });
              }
            } else if (c === entities[j].char) {
              context.report({
                loc: {line: i, column: start + index},
                message: `\`${entities[j].char}\` can be escaped with ${entities[j].alternatives.map(alt => `\`${alt}\``).join(', ')}.`,
                node
              });
            }
          }
        }
      }
    }

    return {
      'Literal, JSXText': function (node) {
        if (jsxUtil.isJSX(node.parent)) {
          reportInvalidEntity(node);
        }
      }
    };
  }
};
