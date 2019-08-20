'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const rules = exports.rules = {
  'no-unresolved': require('./rules/no-unresolved'),
  'named': require('./rules/named'),
  'default': require('./rules/default'),
  'namespace': require('./rules/namespace'),
  'no-namespace': require('./rules/no-namespace'),
  'export': require('./rules/export'),
  'no-mutable-exports': require('./rules/no-mutable-exports'),
  'extensions': require('./rules/extensions'),
  'no-restricted-paths': require('./rules/no-restricted-paths'),
  'no-internal-modules': require('./rules/no-internal-modules'),
  'group-exports': require('./rules/group-exports'),
  'no-relative-parent-imports': require('./rules/no-relative-parent-imports'),

  'no-self-import': require('./rules/no-self-import'),
  'no-cycle': require('./rules/no-cycle'),
  'no-named-default': require('./rules/no-named-default'),
  'no-named-as-default': require('./rules/no-named-as-default'),
  'no-named-as-default-member': require('./rules/no-named-as-default-member'),
  'no-anonymous-default-export': require('./rules/no-anonymous-default-export'),
  'no-unused-modules': require('./rules/no-unused-modules'),

  'no-commonjs': require('./rules/no-commonjs'),
  'no-amd': require('./rules/no-amd'),
  'no-duplicates': require('./rules/no-duplicates'),
  'first': require('./rules/first'),
  'max-dependencies': require('./rules/max-dependencies'),
  'no-extraneous-dependencies': require('./rules/no-extraneous-dependencies'),
  'no-absolute-path': require('./rules/no-absolute-path'),
  'no-nodejs-modules': require('./rules/no-nodejs-modules'),
  'no-webpack-loader-syntax': require('./rules/no-webpack-loader-syntax'),
  'order': require('./rules/order'),
  'newline-after-import': require('./rules/newline-after-import'),
  'prefer-default-export': require('./rules/prefer-default-export'),
  'no-default-export': require('./rules/no-default-export'),
  'no-named-export': require('./rules/no-named-export'),
  'no-dynamic-require': require('./rules/no-dynamic-require'),
  'unambiguous': require('./rules/unambiguous'),
  'no-unassigned-import': require('./rules/no-unassigned-import'),
  'no-useless-path-segments': require('./rules/no-useless-path-segments'),
  'dynamic-import-chunkname': require('./rules/dynamic-import-chunkname'),

  // export
  'exports-last': require('./rules/exports-last'),

  // metadata-based
  'no-deprecated': require('./rules/no-deprecated'),

  // deprecated aliases to rules
  'imports-first': require('./rules/imports-first')
};

const configs = exports.configs = {
  'recommended': require('../config/recommended'),

  'errors': require('../config/errors'),
  'warnings': require('../config/warnings'),

  // shhhh... work in progress "secret" rules
  'stage-0': require('../config/stage-0'),

  // useful stuff for folks using various environments
  'react': require('../config/react'),
  'react-native': require('../config/react-native'),
  'electron': require('../config/electron'),
  'typescript': require('../config/typescript')
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJydWxlcyIsInJlcXVpcmUiLCJjb25maWdzIl0sIm1hcHBpbmdzIjoiOzs7OztBQUFPLE1BQU1BLHdCQUFRO0FBQ25CLG1CQUFpQkMsUUFBUSx1QkFBUixDQURFO0FBRW5CLFdBQVNBLFFBQVEsZUFBUixDQUZVO0FBR25CLGFBQVdBLFFBQVEsaUJBQVIsQ0FIUTtBQUluQixlQUFhQSxRQUFRLG1CQUFSLENBSk07QUFLbkIsa0JBQWdCQSxRQUFRLHNCQUFSLENBTEc7QUFNbkIsWUFBVUEsUUFBUSxnQkFBUixDQU5TO0FBT25CLHdCQUFzQkEsUUFBUSw0QkFBUixDQVBIO0FBUW5CLGdCQUFjQSxRQUFRLG9CQUFSLENBUks7QUFTbkIseUJBQXVCQSxRQUFRLDZCQUFSLENBVEo7QUFVbkIseUJBQXVCQSxRQUFRLDZCQUFSLENBVko7QUFXbkIsbUJBQWlCQSxRQUFRLHVCQUFSLENBWEU7QUFZbkIsZ0NBQThCQSxRQUFRLG9DQUFSLENBWlg7O0FBY25CLG9CQUFrQkEsUUFBUSx3QkFBUixDQWRDO0FBZW5CLGNBQVlBLFFBQVEsa0JBQVIsQ0FmTztBQWdCbkIsc0JBQW9CQSxRQUFRLDBCQUFSLENBaEJEO0FBaUJuQix5QkFBdUJBLFFBQVEsNkJBQVIsQ0FqQko7QUFrQm5CLGdDQUE4QkEsUUFBUSxvQ0FBUixDQWxCWDtBQW1CbkIsaUNBQStCQSxRQUFRLHFDQUFSLENBbkJaO0FBb0JuQix1QkFBcUJBLFFBQVEsMkJBQVIsQ0FwQkY7O0FBc0JuQixpQkFBZUEsUUFBUSxxQkFBUixDQXRCSTtBQXVCbkIsWUFBVUEsUUFBUSxnQkFBUixDQXZCUztBQXdCbkIsbUJBQWlCQSxRQUFRLHVCQUFSLENBeEJFO0FBeUJuQixXQUFTQSxRQUFRLGVBQVIsQ0F6QlU7QUEwQm5CLHNCQUFvQkEsUUFBUSwwQkFBUixDQTFCRDtBQTJCbkIsZ0NBQThCQSxRQUFRLG9DQUFSLENBM0JYO0FBNEJuQixzQkFBb0JBLFFBQVEsMEJBQVIsQ0E1QkQ7QUE2Qm5CLHVCQUFxQkEsUUFBUSwyQkFBUixDQTdCRjtBQThCbkIsOEJBQTRCQSxRQUFRLGtDQUFSLENBOUJUO0FBK0JuQixXQUFTQSxRQUFRLGVBQVIsQ0EvQlU7QUFnQ25CLDBCQUF3QkEsUUFBUSw4QkFBUixDQWhDTDtBQWlDbkIsMkJBQXlCQSxRQUFRLCtCQUFSLENBakNOO0FBa0NuQix1QkFBcUJBLFFBQVEsMkJBQVIsQ0FsQ0Y7QUFtQ25CLHFCQUFtQkEsUUFBUSx5QkFBUixDQW5DQTtBQW9DbkIsd0JBQXNCQSxRQUFRLDRCQUFSLENBcENIO0FBcUNuQixpQkFBZUEsUUFBUSxxQkFBUixDQXJDSTtBQXNDbkIsMEJBQXdCQSxRQUFRLDhCQUFSLENBdENMO0FBdUNuQiw4QkFBNEJBLFFBQVEsa0NBQVIsQ0F2Q1Q7QUF3Q25CLDhCQUE0QkEsUUFBUSxrQ0FBUixDQXhDVDs7QUEwQ25CO0FBQ0Esa0JBQWdCQSxRQUFRLHNCQUFSLENBM0NHOztBQTZDbkI7QUFDQSxtQkFBaUJBLFFBQVEsdUJBQVIsQ0E5Q0U7O0FBZ0RuQjtBQUNBLG1CQUFpQkEsUUFBUSx1QkFBUjtBQWpERSxDQUFkOztBQW9EQSxNQUFNQyw0QkFBVTtBQUNyQixpQkFBZUQsUUFBUSx1QkFBUixDQURNOztBQUdyQixZQUFVQSxRQUFRLGtCQUFSLENBSFc7QUFJckIsY0FBWUEsUUFBUSxvQkFBUixDQUpTOztBQU1yQjtBQUNBLGFBQVdBLFFBQVEsbUJBQVIsQ0FQVTs7QUFTckI7QUFDQSxXQUFTQSxRQUFRLGlCQUFSLENBVlk7QUFXckIsa0JBQWdCQSxRQUFRLHdCQUFSLENBWEs7QUFZckIsY0FBWUEsUUFBUSxvQkFBUixDQVpTO0FBYXJCLGdCQUFjQSxRQUFRLHNCQUFSO0FBYk8sQ0FBaEIiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3QgcnVsZXMgPSB7XG4gICduby11bnJlc29sdmVkJzogcmVxdWlyZSgnLi9ydWxlcy9uby11bnJlc29sdmVkJyksXG4gICduYW1lZCc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZWQnKSxcbiAgJ2RlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL2RlZmF1bHQnKSxcbiAgJ25hbWVzcGFjZSc6IHJlcXVpcmUoJy4vcnVsZXMvbmFtZXNwYWNlJyksXG4gICduby1uYW1lc3BhY2UnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVzcGFjZScpLFxuICAnZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9leHBvcnQnKSxcbiAgJ25vLW11dGFibGUtZXhwb3J0cyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbXV0YWJsZS1leHBvcnRzJyksXG4gICdleHRlbnNpb25zJzogcmVxdWlyZSgnLi9ydWxlcy9leHRlbnNpb25zJyksXG4gICduby1yZXN0cmljdGVkLXBhdGhzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1yZXN0cmljdGVkLXBhdGhzJyksXG4gICduby1pbnRlcm5hbC1tb2R1bGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1pbnRlcm5hbC1tb2R1bGVzJyksXG4gICdncm91cC1leHBvcnRzJzogcmVxdWlyZSgnLi9ydWxlcy9ncm91cC1leHBvcnRzJyksXG4gICduby1yZWxhdGl2ZS1wYXJlbnQtaW1wb3J0cyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tcmVsYXRpdmUtcGFyZW50LWltcG9ydHMnKSxcblxuICAnbm8tc2VsZi1pbXBvcnQnOiByZXF1aXJlKCcuL3J1bGVzL25vLXNlbGYtaW1wb3J0JyksXG4gICduby1jeWNsZSc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tY3ljbGUnKSxcbiAgJ25vLW5hbWVkLWRlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVkLWRlZmF1bHQnKSxcbiAgJ25vLW5hbWVkLWFzLWRlZmF1bHQnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5hbWVkLWFzLWRlZmF1bHQnKSxcbiAgJ25vLW5hbWVkLWFzLWRlZmF1bHQtbWVtYmVyJzogcmVxdWlyZSgnLi9ydWxlcy9uby1uYW1lZC1hcy1kZWZhdWx0LW1lbWJlcicpLFxuICAnbm8tYW5vbnltb3VzLWRlZmF1bHQtZXhwb3J0JzogcmVxdWlyZSgnLi9ydWxlcy9uby1hbm9ueW1vdXMtZGVmYXVsdC1leHBvcnQnKSxcbiAgJ25vLXVudXNlZC1tb2R1bGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby11bnVzZWQtbW9kdWxlcycpLFxuXG4gICduby1jb21tb25qcyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tY29tbW9uanMnKSxcbiAgJ25vLWFtZCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tYW1kJyksXG4gICduby1kdXBsaWNhdGVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1kdXBsaWNhdGVzJyksXG4gICdmaXJzdCc6IHJlcXVpcmUoJy4vcnVsZXMvZmlyc3QnKSxcbiAgJ21heC1kZXBlbmRlbmNpZXMnOiByZXF1aXJlKCcuL3J1bGVzL21heC1kZXBlbmRlbmNpZXMnKSxcbiAgJ25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzJzogcmVxdWlyZSgnLi9ydWxlcy9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llcycpLFxuICAnbm8tYWJzb2x1dGUtcGF0aCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tYWJzb2x1dGUtcGF0aCcpLFxuICAnbm8tbm9kZWpzLW1vZHVsZXMnOiByZXF1aXJlKCcuL3J1bGVzL25vLW5vZGVqcy1tb2R1bGVzJyksXG4gICduby13ZWJwYWNrLWxvYWRlci1zeW50YXgnOiByZXF1aXJlKCcuL3J1bGVzL25vLXdlYnBhY2stbG9hZGVyLXN5bnRheCcpLFxuICAnb3JkZXInOiByZXF1aXJlKCcuL3J1bGVzL29yZGVyJyksXG4gICduZXdsaW5lLWFmdGVyLWltcG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvbmV3bGluZS1hZnRlci1pbXBvcnQnKSxcbiAgJ3ByZWZlci1kZWZhdWx0LWV4cG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvcHJlZmVyLWRlZmF1bHQtZXhwb3J0JyksXG4gICduby1kZWZhdWx0LWV4cG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tZGVmYXVsdC1leHBvcnQnKSxcbiAgJ25vLW5hbWVkLWV4cG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tbmFtZWQtZXhwb3J0JyksXG4gICduby1keW5hbWljLXJlcXVpcmUnOiByZXF1aXJlKCcuL3J1bGVzL25vLWR5bmFtaWMtcmVxdWlyZScpLFxuICAndW5hbWJpZ3VvdXMnOiByZXF1aXJlKCcuL3J1bGVzL3VuYW1iaWd1b3VzJyksXG4gICduby11bmFzc2lnbmVkLWltcG9ydCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tdW5hc3NpZ25lZC1pbXBvcnQnKSxcbiAgJ25vLXVzZWxlc3MtcGF0aC1zZWdtZW50cyc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tdXNlbGVzcy1wYXRoLXNlZ21lbnRzJyksXG4gICdkeW5hbWljLWltcG9ydC1jaHVua25hbWUnOiByZXF1aXJlKCcuL3J1bGVzL2R5bmFtaWMtaW1wb3J0LWNodW5rbmFtZScpLFxuXG4gIC8vIGV4cG9ydFxuICAnZXhwb3J0cy1sYXN0JzogcmVxdWlyZSgnLi9ydWxlcy9leHBvcnRzLWxhc3QnKSxcblxuICAvLyBtZXRhZGF0YS1iYXNlZFxuICAnbm8tZGVwcmVjYXRlZCc6IHJlcXVpcmUoJy4vcnVsZXMvbm8tZGVwcmVjYXRlZCcpLFxuXG4gIC8vIGRlcHJlY2F0ZWQgYWxpYXNlcyB0byBydWxlc1xuICAnaW1wb3J0cy1maXJzdCc6IHJlcXVpcmUoJy4vcnVsZXMvaW1wb3J0cy1maXJzdCcpLFxufVxuXG5leHBvcnQgY29uc3QgY29uZmlncyA9IHtcbiAgJ3JlY29tbWVuZGVkJzogcmVxdWlyZSgnLi4vY29uZmlnL3JlY29tbWVuZGVkJyksXG5cbiAgJ2Vycm9ycyc6IHJlcXVpcmUoJy4uL2NvbmZpZy9lcnJvcnMnKSxcbiAgJ3dhcm5pbmdzJzogcmVxdWlyZSgnLi4vY29uZmlnL3dhcm5pbmdzJyksXG5cbiAgLy8gc2hoaGguLi4gd29yayBpbiBwcm9ncmVzcyBcInNlY3JldFwiIHJ1bGVzXG4gICdzdGFnZS0wJzogcmVxdWlyZSgnLi4vY29uZmlnL3N0YWdlLTAnKSxcblxuICAvLyB1c2VmdWwgc3R1ZmYgZm9yIGZvbGtzIHVzaW5nIHZhcmlvdXMgZW52aXJvbm1lbnRzXG4gICdyZWFjdCc6IHJlcXVpcmUoJy4uL2NvbmZpZy9yZWFjdCcpLFxuICAncmVhY3QtbmF0aXZlJzogcmVxdWlyZSgnLi4vY29uZmlnL3JlYWN0LW5hdGl2ZScpLFxuICAnZWxlY3Ryb24nOiByZXF1aXJlKCcuLi9jb25maWcvZWxlY3Ryb24nKSxcbiAgJ3R5cGVzY3JpcHQnOiByZXF1aXJlKCcuLi9jb25maWcvdHlwZXNjcmlwdCcpLFxufVxuIl19