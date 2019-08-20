'use strict';

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @fileoverview Rule to disallow anonymous default exports.
 * @author Duncan Beevers
 */

const defs = {
  ArrayExpression: {
    option: 'allowArray',
    description: 'If `false`, will report default export of an array',
    message: 'Assign array to a variable before exporting as module default'
  },
  ArrowFunctionExpression: {
    option: 'allowArrowFunction',
    description: 'If `false`, will report default export of an arrow function',
    message: 'Assign arrow function to a variable before exporting as module default'
  },
  CallExpression: {
    option: 'allowCallExpression',
    description: 'If `false`, will report default export of a function call',
    message: 'Assign call result to a variable before exporting as module default',
    default: true
  },
  ClassDeclaration: {
    option: 'allowAnonymousClass',
    description: 'If `false`, will report default export of an anonymous class',
    message: 'Unexpected default export of anonymous class',
    forbid: node => !node.declaration.id
  },
  FunctionDeclaration: {
    option: 'allowAnonymousFunction',
    description: 'If `false`, will report default export of an anonymous function',
    message: 'Unexpected default export of anonymous function',
    forbid: node => !node.declaration.id
  },
  Literal: {
    option: 'allowLiteral',
    description: 'If `false`, will report default export of a literal',
    message: 'Assign literal to a variable before exporting as module default'
  },
  ObjectExpression: {
    option: 'allowObject',
    description: 'If `false`, will report default export of an object expression',
    message: 'Assign object to a variable before exporting as module default'
  },
  TemplateLiteral: {
    option: 'allowLiteral',
    description: 'If `false`, will report default export of a literal',
    message: 'Assign literal to a variable before exporting as module default'
  }
};

const schemaProperties = Object.keys(defs).map(key => defs[key]).reduce((acc, def) => {
  acc[def.option] = {
    description: def.description,
    type: 'boolean'
  };

  return acc;
}, {});

const defaults = Object.keys(defs).map(key => defs[key]).reduce((acc, def) => {
  acc[def.option] = (0, _has2.default)(def, 'default') ? def.default : false;
  return acc;
}, {});

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-anonymous-default-export')
    },

    schema: [{
      type: 'object',
      properties: schemaProperties,
      'additionalProperties': false
    }]
  },

  create: function (context) {
    const options = Object.assign({}, defaults, context.options[0]);

    return {
      'ExportDefaultDeclaration': node => {
        const def = defs[node.declaration.type];

        // Recognized node type and allowed by configuration,
        //   and has no forbid check, or forbid check return value is truthy
        if (def && !options[def.option] && (!def.forbid || def.forbid(node))) {
          context.report({ node, message: def.message });
        }
      }
    };
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1hbm9ueW1vdXMtZGVmYXVsdC1leHBvcnQuanMiXSwibmFtZXMiOlsiZGVmcyIsIkFycmF5RXhwcmVzc2lvbiIsIm9wdGlvbiIsImRlc2NyaXB0aW9uIiwibWVzc2FnZSIsIkFycm93RnVuY3Rpb25FeHByZXNzaW9uIiwiQ2FsbEV4cHJlc3Npb24iLCJkZWZhdWx0IiwiQ2xhc3NEZWNsYXJhdGlvbiIsImZvcmJpZCIsIm5vZGUiLCJkZWNsYXJhdGlvbiIsImlkIiwiRnVuY3Rpb25EZWNsYXJhdGlvbiIsIkxpdGVyYWwiLCJPYmplY3RFeHByZXNzaW9uIiwiVGVtcGxhdGVMaXRlcmFsIiwic2NoZW1hUHJvcGVydGllcyIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJrZXkiLCJyZWR1Y2UiLCJhY2MiLCJkZWYiLCJ0eXBlIiwiZGVmYXVsdHMiLCJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsImRvY3MiLCJ1cmwiLCJzY2hlbWEiLCJwcm9wZXJ0aWVzIiwiY3JlYXRlIiwiY29udGV4dCIsIm9wdGlvbnMiLCJhc3NpZ24iLCJyZXBvcnQiXSwibWFwcGluZ3MiOiI7O0FBS0E7Ozs7QUFDQTs7Ozs7O0FBTkE7Ozs7O0FBUUEsTUFBTUEsT0FBTztBQUNYQyxtQkFBaUI7QUFDZkMsWUFBUSxZQURPO0FBRWZDLGlCQUFhLG9EQUZFO0FBR2ZDLGFBQVM7QUFITSxHQUROO0FBTVhDLDJCQUF5QjtBQUN2QkgsWUFBUSxvQkFEZTtBQUV2QkMsaUJBQWEsNkRBRlU7QUFHdkJDLGFBQVM7QUFIYyxHQU5kO0FBV1hFLGtCQUFnQjtBQUNkSixZQUFRLHFCQURNO0FBRWRDLGlCQUFhLDJEQUZDO0FBR2RDLGFBQVMscUVBSEs7QUFJZEcsYUFBUztBQUpLLEdBWEw7QUFpQlhDLG9CQUFrQjtBQUNoQk4sWUFBUSxxQkFEUTtBQUVoQkMsaUJBQWEsOERBRkc7QUFHaEJDLGFBQVMsOENBSE87QUFJaEJLLFlBQVNDLElBQUQsSUFBVSxDQUFDQSxLQUFLQyxXQUFMLENBQWlCQztBQUpwQixHQWpCUDtBQXVCWEMsdUJBQXFCO0FBQ25CWCxZQUFRLHdCQURXO0FBRW5CQyxpQkFBYSxpRUFGTTtBQUduQkMsYUFBUyxpREFIVTtBQUluQkssWUFBU0MsSUFBRCxJQUFVLENBQUNBLEtBQUtDLFdBQUwsQ0FBaUJDO0FBSmpCLEdBdkJWO0FBNkJYRSxXQUFTO0FBQ1BaLFlBQVEsY0FERDtBQUVQQyxpQkFBYSxxREFGTjtBQUdQQyxhQUFTO0FBSEYsR0E3QkU7QUFrQ1hXLG9CQUFrQjtBQUNoQmIsWUFBUSxhQURRO0FBRWhCQyxpQkFBYSxnRUFGRztBQUdoQkMsYUFBUztBQUhPLEdBbENQO0FBdUNYWSxtQkFBaUI7QUFDZmQsWUFBUSxjQURPO0FBRWZDLGlCQUFhLHFEQUZFO0FBR2ZDLGFBQVM7QUFITTtBQXZDTixDQUFiOztBQThDQSxNQUFNYSxtQkFBbUJDLE9BQU9DLElBQVAsQ0FBWW5CLElBQVosRUFDdEJvQixHQURzQixDQUNqQkMsR0FBRCxJQUFTckIsS0FBS3FCLEdBQUwsQ0FEUyxFQUV0QkMsTUFGc0IsQ0FFZixDQUFDQyxHQUFELEVBQU1DLEdBQU4sS0FBYztBQUNwQkQsTUFBSUMsSUFBSXRCLE1BQVIsSUFBa0I7QUFDaEJDLGlCQUFhcUIsSUFBSXJCLFdBREQ7QUFFaEJzQixVQUFNO0FBRlUsR0FBbEI7O0FBS0EsU0FBT0YsR0FBUDtBQUNELENBVHNCLEVBU3BCLEVBVG9CLENBQXpCOztBQVdBLE1BQU1HLFdBQVdSLE9BQU9DLElBQVAsQ0FBWW5CLElBQVosRUFDZG9CLEdBRGMsQ0FDVEMsR0FBRCxJQUFTckIsS0FBS3FCLEdBQUwsQ0FEQyxFQUVkQyxNQUZjLENBRVAsQ0FBQ0MsR0FBRCxFQUFNQyxHQUFOLEtBQWM7QUFDcEJELE1BQUlDLElBQUl0QixNQUFSLElBQWtCLG1CQUFJc0IsR0FBSixFQUFTLFNBQVQsSUFBc0JBLElBQUlqQixPQUExQixHQUFvQyxLQUF0RDtBQUNBLFNBQU9nQixHQUFQO0FBQ0QsQ0FMYyxFQUtaLEVBTFksQ0FBakI7O0FBT0FJLE9BQU9DLE9BQVAsR0FBaUI7QUFDZkMsUUFBTTtBQUNKSixVQUFNLFlBREY7QUFFSkssVUFBTTtBQUNKQyxXQUFLLHVCQUFRLDZCQUFSO0FBREQsS0FGRjs7QUFNSkMsWUFBUSxDQUNOO0FBQ0VQLFlBQU0sUUFEUjtBQUVFUSxrQkFBWWhCLGdCQUZkO0FBR0UsOEJBQXdCO0FBSDFCLEtBRE07QUFOSixHQURTOztBQWdCZmlCLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixVQUFNQyxVQUFVbEIsT0FBT21CLE1BQVAsQ0FBYyxFQUFkLEVBQWtCWCxRQUFsQixFQUE0QlMsUUFBUUMsT0FBUixDQUFnQixDQUFoQixDQUE1QixDQUFoQjs7QUFFQSxXQUFPO0FBQ0wsa0NBQTZCMUIsSUFBRCxJQUFVO0FBQ3BDLGNBQU1jLE1BQU14QixLQUFLVSxLQUFLQyxXQUFMLENBQWlCYyxJQUF0QixDQUFaOztBQUVBO0FBQ0E7QUFDQSxZQUFJRCxPQUFPLENBQUNZLFFBQVFaLElBQUl0QixNQUFaLENBQVIsS0FBZ0MsQ0FBQ3NCLElBQUlmLE1BQUwsSUFBZWUsSUFBSWYsTUFBSixDQUFXQyxJQUFYLENBQS9DLENBQUosRUFBc0U7QUFDcEV5QixrQkFBUUcsTUFBUixDQUFlLEVBQUU1QixJQUFGLEVBQVFOLFNBQVNvQixJQUFJcEIsT0FBckIsRUFBZjtBQUNEO0FBQ0Y7QUFUSSxLQUFQO0FBV0Q7QUE5QmMsQ0FBakIiLCJmaWxlIjoibm8tYW5vbnltb3VzLWRlZmF1bHQtZXhwb3J0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFJ1bGUgdG8gZGlzYWxsb3cgYW5vbnltb3VzIGRlZmF1bHQgZXhwb3J0cy5cbiAqIEBhdXRob3IgRHVuY2FuIEJlZXZlcnNcbiAqL1xuXG5pbXBvcnQgZG9jc1VybCBmcm9tICcuLi9kb2NzVXJsJ1xuaW1wb3J0IGhhcyBmcm9tICdoYXMnXG5cbmNvbnN0IGRlZnMgPSB7XG4gIEFycmF5RXhwcmVzc2lvbjoge1xuICAgIG9wdGlvbjogJ2FsbG93QXJyYXknLFxuICAgIGRlc2NyaXB0aW9uOiAnSWYgYGZhbHNlYCwgd2lsbCByZXBvcnQgZGVmYXVsdCBleHBvcnQgb2YgYW4gYXJyYXknLFxuICAgIG1lc3NhZ2U6ICdBc3NpZ24gYXJyYXkgdG8gYSB2YXJpYWJsZSBiZWZvcmUgZXhwb3J0aW5nIGFzIG1vZHVsZSBkZWZhdWx0JyxcbiAgfSxcbiAgQXJyb3dGdW5jdGlvbkV4cHJlc3Npb246IHtcbiAgICBvcHRpb246ICdhbGxvd0Fycm93RnVuY3Rpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnSWYgYGZhbHNlYCwgd2lsbCByZXBvcnQgZGVmYXVsdCBleHBvcnQgb2YgYW4gYXJyb3cgZnVuY3Rpb24nLFxuICAgIG1lc3NhZ2U6ICdBc3NpZ24gYXJyb3cgZnVuY3Rpb24gdG8gYSB2YXJpYWJsZSBiZWZvcmUgZXhwb3J0aW5nIGFzIG1vZHVsZSBkZWZhdWx0JyxcbiAgfSxcbiAgQ2FsbEV4cHJlc3Npb246IHtcbiAgICBvcHRpb246ICdhbGxvd0NhbGxFeHByZXNzaW9uJyxcbiAgICBkZXNjcmlwdGlvbjogJ0lmIGBmYWxzZWAsIHdpbGwgcmVwb3J0IGRlZmF1bHQgZXhwb3J0IG9mIGEgZnVuY3Rpb24gY2FsbCcsXG4gICAgbWVzc2FnZTogJ0Fzc2lnbiBjYWxsIHJlc3VsdCB0byBhIHZhcmlhYmxlIGJlZm9yZSBleHBvcnRpbmcgYXMgbW9kdWxlIGRlZmF1bHQnLFxuICAgIGRlZmF1bHQ6IHRydWUsXG4gIH0sXG4gIENsYXNzRGVjbGFyYXRpb246IHtcbiAgICBvcHRpb246ICdhbGxvd0Fub255bW91c0NsYXNzJyxcbiAgICBkZXNjcmlwdGlvbjogJ0lmIGBmYWxzZWAsIHdpbGwgcmVwb3J0IGRlZmF1bHQgZXhwb3J0IG9mIGFuIGFub255bW91cyBjbGFzcycsXG4gICAgbWVzc2FnZTogJ1VuZXhwZWN0ZWQgZGVmYXVsdCBleHBvcnQgb2YgYW5vbnltb3VzIGNsYXNzJyxcbiAgICBmb3JiaWQ6IChub2RlKSA9PiAhbm9kZS5kZWNsYXJhdGlvbi5pZCxcbiAgfSxcbiAgRnVuY3Rpb25EZWNsYXJhdGlvbjoge1xuICAgIG9wdGlvbjogJ2FsbG93QW5vbnltb3VzRnVuY3Rpb24nLFxuICAgIGRlc2NyaXB0aW9uOiAnSWYgYGZhbHNlYCwgd2lsbCByZXBvcnQgZGVmYXVsdCBleHBvcnQgb2YgYW4gYW5vbnltb3VzIGZ1bmN0aW9uJyxcbiAgICBtZXNzYWdlOiAnVW5leHBlY3RlZCBkZWZhdWx0IGV4cG9ydCBvZiBhbm9ueW1vdXMgZnVuY3Rpb24nLFxuICAgIGZvcmJpZDogKG5vZGUpID0+ICFub2RlLmRlY2xhcmF0aW9uLmlkLFxuICB9LFxuICBMaXRlcmFsOiB7XG4gICAgb3B0aW9uOiAnYWxsb3dMaXRlcmFsJyxcbiAgICBkZXNjcmlwdGlvbjogJ0lmIGBmYWxzZWAsIHdpbGwgcmVwb3J0IGRlZmF1bHQgZXhwb3J0IG9mIGEgbGl0ZXJhbCcsXG4gICAgbWVzc2FnZTogJ0Fzc2lnbiBsaXRlcmFsIHRvIGEgdmFyaWFibGUgYmVmb3JlIGV4cG9ydGluZyBhcyBtb2R1bGUgZGVmYXVsdCcsXG4gIH0sXG4gIE9iamVjdEV4cHJlc3Npb246IHtcbiAgICBvcHRpb246ICdhbGxvd09iamVjdCcsXG4gICAgZGVzY3JpcHRpb246ICdJZiBgZmFsc2VgLCB3aWxsIHJlcG9ydCBkZWZhdWx0IGV4cG9ydCBvZiBhbiBvYmplY3QgZXhwcmVzc2lvbicsXG4gICAgbWVzc2FnZTogJ0Fzc2lnbiBvYmplY3QgdG8gYSB2YXJpYWJsZSBiZWZvcmUgZXhwb3J0aW5nIGFzIG1vZHVsZSBkZWZhdWx0JyxcbiAgfSxcbiAgVGVtcGxhdGVMaXRlcmFsOiB7XG4gICAgb3B0aW9uOiAnYWxsb3dMaXRlcmFsJyxcbiAgICBkZXNjcmlwdGlvbjogJ0lmIGBmYWxzZWAsIHdpbGwgcmVwb3J0IGRlZmF1bHQgZXhwb3J0IG9mIGEgbGl0ZXJhbCcsXG4gICAgbWVzc2FnZTogJ0Fzc2lnbiBsaXRlcmFsIHRvIGEgdmFyaWFibGUgYmVmb3JlIGV4cG9ydGluZyBhcyBtb2R1bGUgZGVmYXVsdCcsXG4gIH0sXG59XG5cbmNvbnN0IHNjaGVtYVByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhkZWZzKVxuICAubWFwKChrZXkpID0+IGRlZnNba2V5XSlcbiAgLnJlZHVjZSgoYWNjLCBkZWYpID0+IHtcbiAgICBhY2NbZGVmLm9wdGlvbl0gPSB7XG4gICAgICBkZXNjcmlwdGlvbjogZGVmLmRlc2NyaXB0aW9uLFxuICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxuICAgIH1cblxuICAgIHJldHVybiBhY2NcbiAgfSwge30pXG5cbmNvbnN0IGRlZmF1bHRzID0gT2JqZWN0LmtleXMoZGVmcylcbiAgLm1hcCgoa2V5KSA9PiBkZWZzW2tleV0pXG4gIC5yZWR1Y2UoKGFjYywgZGVmKSA9PiB7XG4gICAgYWNjW2RlZi5vcHRpb25dID0gaGFzKGRlZiwgJ2RlZmF1bHQnKSA/IGRlZi5kZWZhdWx0IDogZmFsc2VcbiAgICByZXR1cm4gYWNjXG4gIH0sIHt9KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7XG4gICAgICB1cmw6IGRvY3NVcmwoJ25vLWFub255bW91cy1kZWZhdWx0LWV4cG9ydCcpLFxuICAgIH0sXG5cbiAgICBzY2hlbWE6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgIHByb3BlcnRpZXM6IHNjaGVtYVByb3BlcnRpZXMsXG4gICAgICAgICdhZGRpdGlvbmFsUHJvcGVydGllcyc6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXG4gIGNyZWF0ZTogZnVuY3Rpb24gKGNvbnRleHQpIHtcbiAgICBjb25zdCBvcHRpb25zID0gT2JqZWN0LmFzc2lnbih7fSwgZGVmYXVsdHMsIGNvbnRleHQub3B0aW9uc1swXSlcblxuICAgIHJldHVybiB7XG4gICAgICAnRXhwb3J0RGVmYXVsdERlY2xhcmF0aW9uJzogKG5vZGUpID0+IHtcbiAgICAgICAgY29uc3QgZGVmID0gZGVmc1tub2RlLmRlY2xhcmF0aW9uLnR5cGVdXG5cbiAgICAgICAgLy8gUmVjb2duaXplZCBub2RlIHR5cGUgYW5kIGFsbG93ZWQgYnkgY29uZmlndXJhdGlvbixcbiAgICAgICAgLy8gICBhbmQgaGFzIG5vIGZvcmJpZCBjaGVjaywgb3IgZm9yYmlkIGNoZWNrIHJldHVybiB2YWx1ZSBpcyB0cnV0aHlcbiAgICAgICAgaWYgKGRlZiAmJiAhb3B0aW9uc1tkZWYub3B0aW9uXSAmJiAoIWRlZi5mb3JiaWQgfHwgZGVmLmZvcmJpZChub2RlKSkpIHtcbiAgICAgICAgICBjb250ZXh0LnJlcG9ydCh7IG5vZGUsIG1lc3NhZ2U6IGRlZi5tZXNzYWdlIH0pXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfVxuICB9LFxufVxuIl19