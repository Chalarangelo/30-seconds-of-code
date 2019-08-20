'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @fileOverview Ensures that no imported module imports the linted module.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * @author Ben Mosher
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */

var _ExportMap = require('../ExportMap');

var _ExportMap2 = _interopRequireDefault(_ExportMap);

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// todo: cache cycles / deep relationships for faster repeat evaluation
module.exports = {
  meta: {
    type: 'suggestion',
    docs: { url: (0, _docsUrl2.default)('no-cycle') },
    schema: [(0, _moduleVisitor.makeOptionsSchema)({
      maxDepth: {
        description: 'maximum dependency depth to traverse',
        type: 'integer',
        minimum: 1
      }
    })]
  },

  create: function (context) {
    const myPath = context.getFilename();
    if (myPath === '<text>') return {}; // can't cycle-check a non-file

    const options = context.options[0] || {};
    const maxDepth = options.maxDepth || Infinity;

    function checkSourceValue(sourceNode, importer) {
      const imported = _ExportMap2.default.get(sourceNode.value, context);

      if (importer.importKind === 'type') {
        return; // no Flow import resolution
      }

      if (imported == null) {
        return; // no-unresolved territory
      }

      if (imported.path === myPath) {
        return; // no-self-import territory
      }

      const untraversed = [{ mget: () => imported, route: [] }];
      const traversed = new Set();
      function detectCycle(_ref) {
        let mget = _ref.mget,
            route = _ref.route;

        const m = mget();
        if (m == null) return;
        if (traversed.has(m.path)) return;
        traversed.add(m.path);

        for (let _ref2 of m.imports) {
          var _ref3 = _slicedToArray(_ref2, 2);

          let path = _ref3[0];
          var _ref3$ = _ref3[1];
          let getter = _ref3$.getter;
          let source = _ref3$.source;

          if (path === myPath) return true;
          if (traversed.has(path)) continue;
          if (route.length + 1 < maxDepth) {
            untraversed.push({
              mget: getter,
              route: route.concat(source)
            });
          }
        }
      }

      while (untraversed.length > 0) {
        const next = untraversed.shift(); // bfs!
        if (detectCycle(next)) {
          const message = next.route.length > 0 ? `Dependency cycle via ${routeString(next.route)}` : 'Dependency cycle detected.';
          context.report(importer, message);
          return;
        }
      }
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, context.options[0]);
  }
};

function routeString(route) {
  return route.map(s => `${s.value}:${s.loc.start.line}`).join('=>');
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby1jeWNsZS5qcyJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwibWV0YSIsInR5cGUiLCJkb2NzIiwidXJsIiwic2NoZW1hIiwibWF4RGVwdGgiLCJkZXNjcmlwdGlvbiIsIm1pbmltdW0iLCJjcmVhdGUiLCJjb250ZXh0IiwibXlQYXRoIiwiZ2V0RmlsZW5hbWUiLCJvcHRpb25zIiwiSW5maW5pdHkiLCJjaGVja1NvdXJjZVZhbHVlIiwic291cmNlTm9kZSIsImltcG9ydGVyIiwiaW1wb3J0ZWQiLCJFeHBvcnRzIiwiZ2V0IiwidmFsdWUiLCJpbXBvcnRLaW5kIiwicGF0aCIsInVudHJhdmVyc2VkIiwibWdldCIsInJvdXRlIiwidHJhdmVyc2VkIiwiU2V0IiwiZGV0ZWN0Q3ljbGUiLCJtIiwiaGFzIiwiYWRkIiwiaW1wb3J0cyIsImdldHRlciIsInNvdXJjZSIsImxlbmd0aCIsInB1c2giLCJjb25jYXQiLCJuZXh0Iiwic2hpZnQiLCJtZXNzYWdlIiwicm91dGVTdHJpbmciLCJyZXBvcnQiLCJtYXAiLCJzIiwibG9jIiwic3RhcnQiLCJsaW5lIiwiam9pbiJdLCJtYXBwaW5ncyI6Ijs7eXBCQUFBOzs7OztBQUtBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7QUFDQUEsT0FBT0MsT0FBUCxHQUFpQjtBQUNmQyxRQUFNO0FBQ0pDLFVBQU0sWUFERjtBQUVKQyxVQUFNLEVBQUVDLEtBQUssdUJBQVEsVUFBUixDQUFQLEVBRkY7QUFHSkMsWUFBUSxDQUFDLHNDQUFrQjtBQUN6QkMsZ0JBQVM7QUFDUEMscUJBQWEsc0NBRE47QUFFUEwsY0FBTSxTQUZDO0FBR1BNLGlCQUFTO0FBSEY7QUFEZ0IsS0FBbEIsQ0FBRDtBQUhKLEdBRFM7O0FBYWZDLFVBQVEsVUFBVUMsT0FBVixFQUFtQjtBQUN6QixVQUFNQyxTQUFTRCxRQUFRRSxXQUFSLEVBQWY7QUFDQSxRQUFJRCxXQUFXLFFBQWYsRUFBeUIsT0FBTyxFQUFQLENBRkEsQ0FFVTs7QUFFbkMsVUFBTUUsVUFBVUgsUUFBUUcsT0FBUixDQUFnQixDQUFoQixLQUFzQixFQUF0QztBQUNBLFVBQU1QLFdBQVdPLFFBQVFQLFFBQVIsSUFBb0JRLFFBQXJDOztBQUVBLGFBQVNDLGdCQUFULENBQTBCQyxVQUExQixFQUFzQ0MsUUFBdEMsRUFBZ0Q7QUFDOUMsWUFBTUMsV0FBV0Msb0JBQVFDLEdBQVIsQ0FBWUosV0FBV0ssS0FBdkIsRUFBOEJYLE9BQTlCLENBQWpCOztBQUVBLFVBQUlPLFNBQVNLLFVBQVQsS0FBd0IsTUFBNUIsRUFBb0M7QUFDbEMsZUFEa0MsQ0FDM0I7QUFDUjs7QUFFRCxVQUFJSixZQUFZLElBQWhCLEVBQXNCO0FBQ3BCLGVBRG9CLENBQ1o7QUFDVDs7QUFFRCxVQUFJQSxTQUFTSyxJQUFULEtBQWtCWixNQUF0QixFQUE4QjtBQUM1QixlQUQ0QixDQUNwQjtBQUNUOztBQUVELFlBQU1hLGNBQWMsQ0FBQyxFQUFDQyxNQUFNLE1BQU1QLFFBQWIsRUFBdUJRLE9BQU0sRUFBN0IsRUFBRCxDQUFwQjtBQUNBLFlBQU1DLFlBQVksSUFBSUMsR0FBSixFQUFsQjtBQUNBLGVBQVNDLFdBQVQsT0FBb0M7QUFBQSxZQUFkSixJQUFjLFFBQWRBLElBQWM7QUFBQSxZQUFSQyxLQUFRLFFBQVJBLEtBQVE7O0FBQ2xDLGNBQU1JLElBQUlMLE1BQVY7QUFDQSxZQUFJSyxLQUFLLElBQVQsRUFBZTtBQUNmLFlBQUlILFVBQVVJLEdBQVYsQ0FBY0QsRUFBRVAsSUFBaEIsQ0FBSixFQUEyQjtBQUMzQkksa0JBQVVLLEdBQVYsQ0FBY0YsRUFBRVAsSUFBaEI7O0FBRUEsMEJBQXVDTyxFQUFFRyxPQUF6QyxFQUFrRDtBQUFBOztBQUFBLGNBQXhDVixJQUF3QztBQUFBO0FBQUEsY0FBaENXLE1BQWdDLFVBQWhDQSxNQUFnQztBQUFBLGNBQXhCQyxNQUF3QixVQUF4QkEsTUFBd0I7O0FBQ2hELGNBQUlaLFNBQVNaLE1BQWIsRUFBcUIsT0FBTyxJQUFQO0FBQ3JCLGNBQUlnQixVQUFVSSxHQUFWLENBQWNSLElBQWQsQ0FBSixFQUF5QjtBQUN6QixjQUFJRyxNQUFNVSxNQUFOLEdBQWUsQ0FBZixHQUFtQjlCLFFBQXZCLEVBQWlDO0FBQy9Ca0Isd0JBQVlhLElBQVosQ0FBaUI7QUFDZlosb0JBQU1TLE1BRFM7QUFFZlIscUJBQU9BLE1BQU1ZLE1BQU4sQ0FBYUgsTUFBYjtBQUZRLGFBQWpCO0FBSUQ7QUFDRjtBQUNGOztBQUVELGFBQU9YLFlBQVlZLE1BQVosR0FBcUIsQ0FBNUIsRUFBK0I7QUFDN0IsY0FBTUcsT0FBT2YsWUFBWWdCLEtBQVosRUFBYixDQUQ2QixDQUNJO0FBQ2pDLFlBQUlYLFlBQVlVLElBQVosQ0FBSixFQUF1QjtBQUNyQixnQkFBTUUsVUFBV0YsS0FBS2IsS0FBTCxDQUFXVSxNQUFYLEdBQW9CLENBQXBCLEdBQ1osd0JBQXVCTSxZQUFZSCxLQUFLYixLQUFqQixDQUF3QixFQURuQyxHQUViLDRCQUZKO0FBR0FoQixrQkFBUWlDLE1BQVIsQ0FBZTFCLFFBQWYsRUFBeUJ3QixPQUF6QjtBQUNBO0FBQ0Q7QUFDRjtBQUNGOztBQUVELFdBQU8sNkJBQWMxQixnQkFBZCxFQUFnQ0wsUUFBUUcsT0FBUixDQUFnQixDQUFoQixDQUFoQyxDQUFQO0FBQ0Q7QUFwRWMsQ0FBakI7O0FBdUVBLFNBQVM2QixXQUFULENBQXFCaEIsS0FBckIsRUFBNEI7QUFDMUIsU0FBT0EsTUFBTWtCLEdBQU4sQ0FBVUMsS0FBTSxHQUFFQSxFQUFFeEIsS0FBTSxJQUFHd0IsRUFBRUMsR0FBRixDQUFNQyxLQUFOLENBQVlDLElBQUssRUFBOUMsRUFBaURDLElBQWpELENBQXNELElBQXRELENBQVA7QUFDRCIsImZpbGUiOiJuby1jeWNsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGZpbGVPdmVydmlldyBFbnN1cmVzIHRoYXQgbm8gaW1wb3J0ZWQgbW9kdWxlIGltcG9ydHMgdGhlIGxpbnRlZCBtb2R1bGUuXG4gKiBAYXV0aG9yIEJlbiBNb3NoZXJcbiAqL1xuXG5pbXBvcnQgRXhwb3J0cyBmcm9tICcuLi9FeHBvcnRNYXAnXG5pbXBvcnQgbW9kdWxlVmlzaXRvciwgeyBtYWtlT3B0aW9uc1NjaGVtYSB9IGZyb20gJ2VzbGludC1tb2R1bGUtdXRpbHMvbW9kdWxlVmlzaXRvcidcbmltcG9ydCBkb2NzVXJsIGZyb20gJy4uL2RvY3NVcmwnXG5cbi8vIHRvZG86IGNhY2hlIGN5Y2xlcyAvIGRlZXAgcmVsYXRpb25zaGlwcyBmb3IgZmFzdGVyIHJlcGVhdCBldmFsdWF0aW9uXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgbWV0YToge1xuICAgIHR5cGU6ICdzdWdnZXN0aW9uJyxcbiAgICBkb2NzOiB7IHVybDogZG9jc1VybCgnbm8tY3ljbGUnKSB9LFxuICAgIHNjaGVtYTogW21ha2VPcHRpb25zU2NoZW1hKHtcbiAgICAgIG1heERlcHRoOntcbiAgICAgICAgZGVzY3JpcHRpb246ICdtYXhpbXVtIGRlcGVuZGVuY3kgZGVwdGggdG8gdHJhdmVyc2UnLFxuICAgICAgICB0eXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbmltdW06IDEsXG4gICAgICB9LFxuICAgIH0pXSxcbiAgfSxcblxuICBjcmVhdGU6IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgY29uc3QgbXlQYXRoID0gY29udGV4dC5nZXRGaWxlbmFtZSgpXG4gICAgaWYgKG15UGF0aCA9PT0gJzx0ZXh0PicpIHJldHVybiB7fSAvLyBjYW4ndCBjeWNsZS1jaGVjayBhIG5vbi1maWxlXG5cbiAgICBjb25zdCBvcHRpb25zID0gY29udGV4dC5vcHRpb25zWzBdIHx8IHt9XG4gICAgY29uc3QgbWF4RGVwdGggPSBvcHRpb25zLm1heERlcHRoIHx8IEluZmluaXR5XG5cbiAgICBmdW5jdGlvbiBjaGVja1NvdXJjZVZhbHVlKHNvdXJjZU5vZGUsIGltcG9ydGVyKSB7XG4gICAgICBjb25zdCBpbXBvcnRlZCA9IEV4cG9ydHMuZ2V0KHNvdXJjZU5vZGUudmFsdWUsIGNvbnRleHQpXG5cbiAgICAgIGlmIChpbXBvcnRlci5pbXBvcnRLaW5kID09PSAndHlwZScpIHtcbiAgICAgICAgcmV0dXJuIC8vIG5vIEZsb3cgaW1wb3J0IHJlc29sdXRpb25cbiAgICAgIH1cblxuICAgICAgaWYgKGltcG9ydGVkID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICAvLyBuby11bnJlc29sdmVkIHRlcnJpdG9yeVxuICAgICAgfVxuXG4gICAgICBpZiAoaW1wb3J0ZWQucGF0aCA9PT0gbXlQYXRoKSB7XG4gICAgICAgIHJldHVybiAgLy8gbm8tc2VsZi1pbXBvcnQgdGVycml0b3J5XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHVudHJhdmVyc2VkID0gW3ttZ2V0OiAoKSA9PiBpbXBvcnRlZCwgcm91dGU6W119XVxuICAgICAgY29uc3QgdHJhdmVyc2VkID0gbmV3IFNldCgpXG4gICAgICBmdW5jdGlvbiBkZXRlY3RDeWNsZSh7bWdldCwgcm91dGV9KSB7XG4gICAgICAgIGNvbnN0IG0gPSBtZ2V0KClcbiAgICAgICAgaWYgKG0gPT0gbnVsbCkgcmV0dXJuXG4gICAgICAgIGlmICh0cmF2ZXJzZWQuaGFzKG0ucGF0aCkpIHJldHVyblxuICAgICAgICB0cmF2ZXJzZWQuYWRkKG0ucGF0aClcblxuICAgICAgICBmb3IgKGxldCBbcGF0aCwgeyBnZXR0ZXIsIHNvdXJjZSB9XSBvZiBtLmltcG9ydHMpIHtcbiAgICAgICAgICBpZiAocGF0aCA9PT0gbXlQYXRoKSByZXR1cm4gdHJ1ZVxuICAgICAgICAgIGlmICh0cmF2ZXJzZWQuaGFzKHBhdGgpKSBjb250aW51ZVxuICAgICAgICAgIGlmIChyb3V0ZS5sZW5ndGggKyAxIDwgbWF4RGVwdGgpIHtcbiAgICAgICAgICAgIHVudHJhdmVyc2VkLnB1c2goe1xuICAgICAgICAgICAgICBtZ2V0OiBnZXR0ZXIsXG4gICAgICAgICAgICAgIHJvdXRlOiByb3V0ZS5jb25jYXQoc291cmNlKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh1bnRyYXZlcnNlZC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IG5leHQgPSB1bnRyYXZlcnNlZC5zaGlmdCgpIC8vIGJmcyFcbiAgICAgICAgaWYgKGRldGVjdEN5Y2xlKG5leHQpKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IChuZXh0LnJvdXRlLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gYERlcGVuZGVuY3kgY3ljbGUgdmlhICR7cm91dGVTdHJpbmcobmV4dC5yb3V0ZSl9YFxuICAgICAgICAgICAgOiAnRGVwZW5kZW5jeSBjeWNsZSBkZXRlY3RlZC4nKVxuICAgICAgICAgIGNvbnRleHQucmVwb3J0KGltcG9ydGVyLCBtZXNzYWdlKVxuICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZVZpc2l0b3IoY2hlY2tTb3VyY2VWYWx1ZSwgY29udGV4dC5vcHRpb25zWzBdKVxuICB9LFxufVxuXG5mdW5jdGlvbiByb3V0ZVN0cmluZyhyb3V0ZSkge1xuICByZXR1cm4gcm91dGUubWFwKHMgPT4gYCR7cy52YWx1ZX06JHtzLmxvYy5zdGFydC5saW5lfWApLmpvaW4oJz0+Jylcbn1cbiJdfQ==