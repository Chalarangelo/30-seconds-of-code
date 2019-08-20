'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const EXPORT_MESSAGE = 'Expected "export" or "export default"',
      IMPORT_MESSAGE = 'Expected "import" instead of "require()"'; /**
                                                                    * @fileoverview Rule to prefer ES6 to CJS
                                                                    * @author Jamund Ferguson
                                                                    */

function normalizeLegacyOptions(options) {
  if (options.indexOf('allow-primitive-modules') >= 0) {
    return { allowPrimitiveModules: true };
  }
  return options[0] || {};
}

function allowPrimitive(node, options) {
  if (!options.allowPrimitiveModules) return false;
  if (node.parent.type !== 'AssignmentExpression') return false;
  return node.parent.right.type !== 'ObjectExpression';
}

function allowRequire(node, options) {
  return options.allowRequire;
}

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const schemaString = { enum: ['allow-primitive-modules'] };
const schemaObject = {
  type: 'object',
  properties: {
    allowPrimitiveModules: { 'type': 'boolean' },
    allowRequire: { 'type': 'boolean' }
  },
  additionalProperties: false
};

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-commonjs')
    },

    schema: {
      anyOf: [{
        type: 'array',
        items: [schemaString],
        additionalItems: false
      }, {
        type: 'array',
        items: [schemaObject],
        additionalItems: false
      }]
    }
  },

  create: function (context) {
    const options = normalizeLegacyOptions(context.options);

    return {

      'MemberExpression': function (node) {

        // module.exports
        if (node.object.name === 'module' && node.property.name === 'exports') {
          if (allowPrimitive(node, options)) return;
          context.report({ node, message: EXPORT_MESSAGE });
        }

        // exports.
        if (node.object.name === 'exports') {
          const isInScope = context.getScope().variables.some(variable => variable.name === 'exports');
          if (!isInScope) {
            context.report({ node, message: EXPORT_MESSAGE });
          }
        }
      },
      'CallExpression': function (call) {
        if (context.getScope().type !== 'module') return;
        if (call.parent.type !== 'ExpressionStatement' && call.parent.type !== 'VariableDeclarator' && call.parent.type !== 'AssignmentExpression') return;

        if (call.callee.type !== 'Identifier') return;
        if (call.callee.name !== 'require') return;

        if (call.arguments.length !== 1) return;
        var module = call.arguments[0];

        if (module.type !== 'Literal') return;
        if (typeof module.value !== 'string') return;

        if (allowRequire(call, options)) return;

        // keeping it simple: all 1-string-arg `require` calls are reported
        context.report({
          node: call.callee,
          message: IMPORT_MESSAGE
        });
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1jb21tb25qcy5qcyJdLCJuYW1lcyI6WyJFWFBPUlRfTUVTU0FHRSIsIklNUE9SVF9NRVNTQUdFIiwibm9ybWFsaXplTGVnYWN5T3B0aW9ucyIsIm9wdGlvbnMiLCJpbmRleE9mIiwiYWxsb3dQcmltaXRpdmVNb2R1bGVzIiwiYWxsb3dQcmltaXRpdmUiLCJub2RlIiwicGFyZW50IiwidHlwZSIsInJpZ2h0IiwiYWxsb3dSZXF1aXJlIiwic2NoZW1hU3RyaW5nIiwiZW51bSIsInNjaGVtYU9iamVjdCIsInByb3BlcnRpZXMiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsIm1vZHVsZSIsImV4cG9ydHMiLCJtZXRhIiwiZG9jcyIsInVybCIsInNjaGVtYSIsImFueU9mIiwiaXRlbXMiLCJhZGRpdGlvbmFsSXRlbXMiLCJjcmVhdGUiLCJjb250ZXh0Iiwib2JqZWN0IiwibmFtZSIsInByb3BlcnR5IiwicmVwb3J0IiwibWVzc2FnZSIsImlzSW5TY29wZSIsImdldFNjb3BlIiwidmFyaWFibGVzIiwic29tZSIsInZhcmlhYmxlIiwiY2FsbCIsImNhbGxlZSIsImFyZ3VtZW50cyIsImxlbmd0aCIsInZhbHVlIl0sIm1hcHBpbmdzIjoiOztBQUtBOzs7Ozs7QUFFQSxNQUFNQSxpQkFBaUIsdUNBQXZCO0FBQUEsTUFDTUMsaUJBQWlCLDBDQUR2QixDLENBUEE7Ozs7O0FBVUEsU0FBU0Msc0JBQVQsQ0FBZ0NDLE9BQWhDLEVBQXlDO0FBQ3ZDLE1BQUlBLFFBQVFDLE9BQVIsQ0FBZ0IseUJBQWhCLEtBQThDLENBQWxELEVBQXFEO0FBQ25ELFdBQU8sRUFBRUMsdUJBQXVCLElBQXpCLEVBQVA7QUFDRDtBQUNELFNBQU9GLFFBQVEsQ0FBUixLQUFjLEVBQXJCO0FBQ0Q7O0FBRUQsU0FBU0csY0FBVCxDQUF3QkMsSUFBeEIsRUFBOEJKLE9BQTlCLEVBQXVDO0FBQ3JDLE1BQUksQ0FBQ0EsUUFBUUUscUJBQWIsRUFBb0MsT0FBTyxLQUFQO0FB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OztBQUV0QyxZQUFJL0IsYUFBYTJCLElBQWIsRUFBbUJuQyxPQUFuQixDQUFKLEVBQWlDOztBQUVqQztBQUNBd0IsZ0JBQVFJLE1BQVIsQ0FBZTtBQUNieEIsZ0JBQU0rQixLQUFLQyxNQURFO0FBRWJQLG1CQUFTL0I7QUFGSSxTQUFmO0FBSUQ7QUE3Q0ksS0FBUDtBQWdERDtBQTFFYyxDQUFqQiIsImZpbGUiOiJuby1jb21tb25qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVvdmVydmlldyBSdWxlIHRvIHByZWZlciBFUzYgdG8gQ0pTXG4gKiBAYXV0aG9yIEphbXVuZCBGZXJndXNvblxuICovXG5cbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbmNvbnN0IEVYUE9SVF9NRVNTQUdFID0gJ0V4cGVjdGVkIFwiZXhwb3J0XCIgb3IgXCJleHBvcnQgZGVmYXVsdFwiJ1xuICAgICwgSU1QT1JUX01FU1NBR0UgPSAnRXhwZWN0ZWQgXCJpbXBvcnRcIiBpbnN0ZWFkIG9mIFwicmVxdWlyZSgpXCInXG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZUxlZ2FjeU9wdGlvbnMob3B0aW9ucykge1xuICBpZiAob3B0aW9ucy5pbmRleE9mKCdhbGxvdy1wcmltaXRpdmUtbW9kdWxlcycpID49IDApIHtcbiAgICByZXR1cm4geyBhbGxvd1ByaW1pdGl2ZU1vZHVsZXM6IHRydWUgfVxuICB9XG4gIHJldHVybiBvcHRpb25zWzBdIHx8IHt9XG59XG5cbmZ1bmN0aW9uIGFsbG93UHJpbWl0aXZlKG5vZGUsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zLmFsbG93UHJpbWl0aXZlTW9kdWxlcykgcmV0dXJuIGZhbHNlXG4gIGlmIChub2RlLnBhcmVudC50eXBlICE9PSAnQXNzaWdubWVudEV4cHJlc3Npb24nKSByZXR1cm4gZmFsc2VcbiAgcmV0dXJuIChub2RlLnBhcmVudC5yaWdodC50eXBlICE9PSAnT2JqZWN0RXhwcmVzc2lvbicpXG59XG5cbmZ1bmN0aW9uIGFsbG93UmVxdWlyZShub2RlLCBvcHRpb25zKSB7XG4gIHJldHVybiBvcHRpb25zLmFsbG93UmVxdWlyZVxufVxuXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gUnVsZSBEZWZpbml0aW9uXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5jb25zdCBzY2hlbWFTdHJpbmcgPSB7IGVudW06IFsnYWxsb3ctcHJpbWl0aXZlLW1vZHVsZXMnXSB9XG5jb25zdCBzY2hlbWFPYmplY3QgPSB7XG4gIHR5cGU6ICdvYmplY3QnLFxuICBwcm9wZXJ0aWVzOiB7XG4gICAgYWxsb3dQcmltaXRpdmVNb2R1bGVzOiB7ICd0eXBlJzogJ2Jvb2xlYW4nIH0sXG4gICAgYWxsb3dSZXF1aXJlOiB7ICd0eXBlJzogJ2Jvb2xlYW4nIH0sXG4gIH0sXG4gIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby1jb21tb25qcycpLFxuICAgIH0sXG5cbiAgICBzY2hlbWE6IHtcbiAgICAgIGFueU9mOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYXJyYXknLFxuICAgICAgICAgIGl0ZW1zOiBbc2NoZW1hU3RyaW5nXSxcbiAgICAgICAgICBhZGRpdGlvbmFsSXRlbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2FycmF5JyxcbiAgICAgICAgICBpdGVtczogW3NjaGVtYU9iamVjdF0sXG4gICAgICAgICAgYWRkaXRpb25hbEl0ZW1zOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IG5vcm1hbGl6ZUxlZ2FjeU9wdGlvbnMoY29udGV4dC5vcHRpb25zKVxuXG4gICAgcmV0dXJuIHtcblxuICAgICAgJ01lbWJlckV4cHJlc3Npb24nOiBmdW5jdGlvbiAobm9kZSkge1xuXG4gICAgICAgIC8vIG1vZHVsZS5leHBvcnRzXG4gICAgICAgIGlmIChub2RlLm9iamVjdC5uYW1lID09PSAnbW9kdWxlJyAmJiBub2RlLnByb3BlcnR5Lm5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICAgIGlmIChhbGxvd1ByaW1pdGl2ZShub2RlLCBvcHRpb25zKSkgcmV0dXJuXG4gICAgICAgICAgY29udGV4dC5yZXBvcnQoeyBub2RlLCBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZXhwb3J0cy5cbiAgICAgICAgaWYgKG5vZGUub2JqZWN0Lm5hbWUgPT09ICdleHBvcnRzJykge1xuICAgICAgICAgIGNvbnN0IGlzSW5TY29wZSA9IGNvbnRleHQuZ2V0U2NvcGUoKVxuICAgICAgICAgICAgLnZhcmlhYmxlc1xuICAgICAgICAgICAgLnNvbWUodmFyaWFibGUgPT4gdmFyaWFibGUubmFtZSA9PT0gJ2V4cG9ydHMnKVxuICAgICAgICAgIGlmICghIGlzSW5TY29wZSkge1xuICAgICAgICAgICAgY29udGV4dC5yZXBvcnQoeyBub2RlLCBtZXNzYWdlOiBFWFBPUlRfTUVTU0FHRSB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9LFxuICAgICAgJ0NhbGxFeHByZXNzaW9uJzogZnVuY3Rpb24gKGNhbGwpIHtcbiAgICAgICAgaWYgKGNvbnRleHQuZ2V0U2NvcGUoKS50eXBlICE9PSAnbW9kdWxlJykgcmV0dXJuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBjYWxsLnBhcmVudC50eXBlICE9PSAnRXhwcmVzc2lvblN0YXRlbWVudCdcbiAgICAgICAgICAmJiBjYWxsLnBhcmVudC50eXBlICE9PSAnVmFyaWFibGVEZWNsYXJhdG9yJ1xuICAgICAgICAgICYmIGNhbGwucGFyZW50LnR5cGUgIT09ICdBc3NpZ25tZW50RXhwcmVzc2lvbidcbiAgICAgICAgKSByZXR1cm5cblxuICAgICAgICBpZiAoY2FsbC5jYWxsZWUudHlwZSAhPT0gJ0lkZW50aWZpZXInKSByZXR1cm5cbiAgICAgICAgaWYgKGNhbGwuY2FsbGVlLm5hbWUgIT09ICdyZXF1aXJlJykgcmV0dXJuXG5cbiAgICAgICAgaWYgKGNhbGwuYXJndW1lbnRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuXG4gICAgICAgIHZhciBtb2R1bGUgPSBjYWxsLmFyZ3VtZW50c1swXVxuXG4gICAgICAgIGlmIChtb2R1bGUudHlwZSAhPT0gJ0xpdGVyYWwnKSByZXR1cm5cbiAgICAgICAgaWYgKHR5cGVvZiBtb2R1bGUudmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm5cblxuICAgICAgICBpZiAoYWxsb3dSZXF1aXJlKGNhbGwsIG9wdGlvbnMpKSByZXR1cm5cblxuICAgICAgICAvLyBrZWVwaW5nIGl0IHNpbXBsZTogYWxsIDEtc3RyaW5nLWFyZyBgcmVxdWlyZWAgY2FsbHMgYXJlIHJlcG9ydGVkXG4gICAgICAgIGNvbnRleHQucmVwb3J0KHtcbiAgICAgICAgICBub2RlOiBjYWxsLmNhbGxlZSxcbiAgICAgICAgICBtZXNzYWdlOiBJTVBPUlRfTUVTU0FHRSxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgfVxuXG4gIH0sXG59XG4iXX0=