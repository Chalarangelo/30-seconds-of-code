'use strict';

var _ignore = require('eslint-module-utils/ignore');

var _moduleVisitor = require('eslint-module-utils/moduleVisitor');

var _moduleVisitor2 = _interopRequireDefault(_moduleVisitor);

var _resolve = require('eslint-module-utils/resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _docsUrl = require('../docsUrl');

var _docsUrl2 = _interopRequireDefault(_docsUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * convert a potentially relative path from node utils into a true
 * relative path.
 *
 * ../ -> ..
 * ./ -> .
 * .foo/bar -> ./.foo/bar
 * ..foo/bar -> ./..foo/bar
 * foo/bar -> ./foo/bar
 *
 * @param relativePath {string} relative posix path potentially missing leading './'
 * @returns {string} relative posix path that always starts with a ./
 **/
function toRelativePath(relativePath) {
  const stripped = relativePath.replace(/\/$/g, ''); // Remove trailing /

  return (/^((\.\.)|(\.))($|\/)/.test(stripped) ? stripped : `./${stripped}`
  );
} /**
   * @fileOverview Ensures that there are no useless path segments
   * @author Thomas Grainger
   */

function normalize(fn) {
  return toRelativePath(_path2.default.posix.normalize(fn));
}

function countRelativeParents(pathSegments) {
  return pathSegments.reduce((sum, pathSegment) => pathSegment === '..' ? sum + 1 : sum, 0);
}

module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      url: (0, _docsUrl2.default)('no-useless-path-segments')
    },

    schema: [{
      type: 'object',
      properties: {
        commonjs: { type: 'boolean' },
        noUselessIndex: { type: 'boolean' }
      },
      additionalProperties: false
    }],

    fixable: 'code'
  },

  create(context) {
    const currentDir = _path2.default.dirname(context.getFilename());
    const options = context.options[0];

    function checkSourceValue(source) {
      const importPath = source.value;


      function reportWithProposedPath(proposedPath) {
        context.report({
          node: source,
          // Note: Using messageIds is not possible due to the support for ESLint 2 and 3
          message: `Useless path segments for "${importPath}", should be "${proposedPath}"`,
          fix: fixer => proposedPath && fixer.replaceText(source, JSON.stringify(proposedPath))
        });
      }

      // Only relative imports are relevant for this rule --> Skip checking
      if (!importPath.startsWith('.')) {
        return;
      }

      // Report rule violation if path is not the shortest possible
      const resolvedPath = (0, _resolve2.default)(importPath, context);
      const normedPath = normalize(importPath);
      const resolvedNormedPath = (0, _resolve2.default)(normedPath, context);
      if (normedPath !== importPath && resolvedPath === resolvedNormedPath) {
        return reportWithProposedPath(normedPath);
      }

      const fileExtensions = (0, _ignore.getFileExtensions)(context.settings);
      const regexUnnecessaryIndex = new RegExp(`.*\\/index(\\${Array.from(fileExtensions).join('|\\')})?$`);

      // Check if path contains unnecessary index (including a configured extension)
      if (options && options.noUselessIndex && regexUnnecessaryIndex.test(importPath)) {
        const parentDirectory = _path2.default.dirname(importPath);

        // Try to find ambiguous imports
        if (parentDirectory !== '.' && parentDirectory !== '..') {
          for (let fileExtension of fileExtensions) {
            if ((0, _resolve2.default)(`${parentDirectory}${fileExtension}`, context)) {
              return reportWithProposedPath(`${parentDirectory}/`);
            }
          }
        }

        return reportWithProposedPath(parentDirectory);
      }

      // Path is shortest possible + starts from the current directory --> Return directly
      if (importPath.startsWith('./')) {
        return;
      }

      // Path is not existing --> Return directly (following code requires path to be defined)
      if (resolvedPath === undefined) {
        return;
      }

      const expected = _path2.default.relative(currentDir, resolvedPath); // Expected import path
      const expectedSplit = expected.split(_path2.default.sep); // Split by / or \ (depending on OS)
      const importPathSplit = importPath.replace(/^\.\//, '').split('/');
      const countImportPathRelativeParents = countRelativeParents(importPathSplit);
      const countExpectedRelativeParents = countRelativeParents(expectedSplit);
      const diff = countImportPathRelativeParents - countExpectedRelativeParents;

      // Same number of relative parents --> Paths are the same --> Return directly
      if (diff <= 0) {
        return;
      }

      // Report and propose minimal number of required relative parents
      return reportWithProposedPath(toRelativePath(importPathSplit.slice(0, countExpectedRelativeParents).concat(importPathSplit.slice(countImportPathRelativeParents + diff)).join('/')));
    }

    return (0, _moduleVisitor2.default)(checkSourceValue, options);
  }
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9ydWxlcy9uby11c2VsZXNzLXBhdGgtc2VnbWVudHMuanMiXSwibmFtZXMiOlsidG9SZWxhdGl2ZVBhdGgiLCJyZWxhdGl2ZVBhdGgiLCJzdHJpcHBlZCIsInJlcGxhY2UiLCJ0ZXN0Iiwibm9ybWFsaXplIiwiZm4iLCJwYXRoIiwicG9zaXgiLCJjb3VudFJlbGF0aXZlUGFyZW50cyIsInBhdGhTZWdtZW50cyIsInJlZHVjZSIsInN1bSIsInBhdGhTZWdtZW50IiwibW9kdWxlIiwiZXhwb3J0cyIsIm1ldGEiLCJ0eXBlIiwiZG9jcyIsInVybCIsInNjaGVtYSIsInByb3BlcnRpZXMiLCJjb21tb25qcyIsIm5vVXNlbGVzc0luZGV4IiwiYWRkaXRpb25hbFByb3BlcnRpZXMiLCJmaXhhYmxlIiwiY3JlYXRlIiwiY29udGV4dCIsImN1cnJlbnREaXIiLCJkaXJuYW1lIiwiZ2V0RmlsZW5hbWUiLCJvcHRpb25zIiwiY2hlY2tTb3VyY2VWYWx1ZSIsInNvdXJjZSIsImltcG9ydFBhdGgiLCJ2YWx1ZSIsInJlcG9ydFdpdGhQcm9wb3NlZFBhdGgiLCJwcm9wb3NlZFBhdGgiLCJyZXBvcnQiLCJub2RlIiwibWVzc2FnZSIsImZpeCIsImZpeGVyIiwicmVwbGFjZVRleHQiLCJKU09OIiwic3RyaW5naWZ5Iiwic3RhcnRzV2l0aCIsInJlc29sdmVkUGF0aCIsIm5vcm1lZFBhdGgiLCJyZXNvbHZlZE5vcm1lZFBhdGgiLCJmaWxlRXh0ZW5zaW9ucyIsInNldHRpbmdzIiwicmVnZXhVbm5lY2Vzc2FyeUluZGV4IiwiUmVnRXhwIiwiQXJyYXkiLCJmcm9tIiwiam9pbiIsInBhcmVudERpcmVjdG9yeSIsImZpbGVFeHRlbnNpb24iLCJ1bmRlZmluZWQiLCJleHBlY3RlZCIsInJlbGF0aXZlIiwiZXhwZWN0ZWRTcGxpdCIsInNwbGl0Iiwic2VwIiwiaW1wb3J0UGF0aFNwbGl0IiwiY291bnRJbXBvcnRQYXRoUmVsYXRpdmVQYXJlbnRzIiwiY291bnRFeHBl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QURaLEVBRUdHLE1BRkgsQ0FFVUwsZ0JBQWdCSSxLQUFoQixDQUFzQkgsaUNBQWlDRSxJQUF2RCxDQUZWLEVBR0daLElBSEgsQ0FHUSxHQUhSLENBREYsQ0FESyxDQUFQO0FBUUQ7O0FBRUQsV0FBTyw2QkFBY3hCLGdCQUFkLEVBQWdDRCxPQUFoQyxDQUFQO0FBQ0Q7QUF6R2MsQ0FBakIiLCJmaWxlIjoibm8tdXNlbGVzcy1wYXRoLXNlZ21lbnRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAZmlsZU92ZXJ2aWV3IEVuc3VyZXMgdGhhdCB0aGVyZSBhcmUgbm8gdXNlbGVzcyBwYXRoIHNlZ21lbnRzXG4gKiBAYXV0aG9yIFRob21hcyBHcmFpbmdlclxuICovXG5cbmltcG9ydCB7IGdldEZpbGVFeHRlbnNpb25zIH0gZnJvbSAnZXNsaW50LW1vZHVsZS11dGlscy9pZ25vcmUnXG5pbXBvcnQgbW9kdWxlVmlzaXRvciBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL21vZHVsZVZpc2l0b3InXG5pbXBvcnQgcmVzb2x2ZSBmcm9tICdlc2xpbnQtbW9kdWxlLXV0aWxzL3Jlc29sdmUnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IGRvY3NVcmwgZnJvbSAnLi4vZG9jc1VybCdcblxuLyoqXG4gKiBjb252ZXJ0IGEgcG90ZW50aWFsbHkgcmVsYXRpdmUgcGF0aCBmcm9tIG5vZGUgdXRpbHMgaW50byBhIHRydWVcbiAqIHJlbGF0aXZlIHBhdGguXG4gKlxuICogLi4vIC0+IC4uXG4gKiAuLyAtPiAuXG4gKiAuZm9vL2JhciAtPiAuLy5mb28vYmFyXG4gKiAuLmZvby9iYXIgLT4gLi8uLmZvby9iYXJcbiAqIGZvby9iYXIgLT4gLi9mb28vYmFyXG4gKlxuICogQHBhcmFtIHJlbGF0aXZlUGF0aCB7c3RyaW5nfSByZWxhdGl2ZSBwb3NpeCBwYXRoIHBvdGVudGlhbGx5IG1pc3NpbmcgbGVhZGluZyAnLi8nXG4gKiBAcmV0dXJucyB7c3RyaW5nfSByZWxhdGl2ZSBwb3NpeCBwYXRoIHRoYXQgYWx3YXlzIHN0YXJ0cyB3aXRoIGEgLi9cbiAqKi9cbmZ1bmN0aW9uIHRvUmVsYXRpdmVQYXRoKHJlbGF0aXZlUGF0aCkge1xuICBjb25zdCBzdHJpcHBlZCA9IHJlbGF0aXZlUGF0aC5yZXBsYWNlKC9cXC8kL2csICcnKSAvLyBSZW1vdmUgdHJhaWxpbmcgL1xuXG4gIHJldHVybiAvXigoXFwuXFwuKXwoXFwuKSkoJHxcXC8pLy50ZXN0KHN0cmlwcGVkKSA/IHN0cmlwcGVkIDogYC4vJHtzdHJpcHBlZH1gXG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShmbikge1xuICByZXR1cm4gdG9SZWxhdGl2ZVBhdGgocGF0aC5wb3NpeC5ub3JtYWxpemUoZm4pKVxufVxuXG5mdW5jdGlvbiBjb3VudFJlbGF0aXZlUGFyZW50cyhwYXRoU2VnbWVudHMpIHtcbiAgcmV0dXJuIHBhdGhTZWdtZW50cy5yZWR1Y2UoKHN1bSwgcGF0aFNlZ21lbnQpID0+IHBhdGhTZWdtZW50ID09PSAnLi4nID8gc3VtICsgMSA6IHN1bSwgMClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIG1ldGE6IHtcbiAgICB0eXBlOiAnc3VnZ2VzdGlvbicsXG4gICAgZG9jczoge1xuICAgICAgdXJsOiBkb2NzVXJsKCduby11c2VsZXNzLXBhdGgtc2VnbWVudHMnKSxcbiAgICB9LFxuXG4gICAgc2NoZW1hOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdvYmplY3QnLFxuICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgY29tbW9uanM6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgICAgbm9Vc2VsZXNzSW5kZXg6IHsgdHlwZTogJ2Jvb2xlYW4nIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGFkZGl0aW9uYWxQcm9wZXJ0aWVzOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcblxuICAgIGZpeGFibGU6ICdjb2RlJyxcbiAgfSxcblxuICBjcmVhdGUoY29udGV4dCkge1xuICAgIGNvbnN0IGN1cnJlbnREaXIgPSBwYXRoLmRpcm5hbWUoY29udGV4dC5nZXRGaWxlbmFtZSgpKVxuICAgIGNvbnN0IG9wdGlvbnMgPSBjb250ZXh0Lm9wdGlvbnNbMF1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU291cmNlVmFsdWUoc291cmNlKSB7XG4gICAgICBjb25zdCB7IHZhbHVlOiBpbXBvcnRQYXRoIH0gPSBzb3VyY2VcblxuICAgICAgZnVuY3Rpb24gcmVwb3J0V2l0aFByb3Bvc2VkUGF0aChwcm9wb3NlZFBhdGgpIHtcbiAgICAgICAgY29udGV4dC5yZXBvcnQoe1xuICAgICAgICAgIG5vZGU6IHNvdXJjZSxcbiAgICAgICAgICAvLyBOb3RlOiBVc2luZyBtZXNzYWdlSWRzIGlzIG5vdCBwb3NzaWJsZSBkdWUgdG8gdGhlIHN1cHBvcnQgZm9yIEVTTGludCAyIGFuZCAzXG4gICAgICAgICAgbWVzc2FnZTogYFVzZWxlc3MgcGF0aCBzZWdtZW50cyBmb3IgXCIke2ltcG9ydFBhdGh9XCIsIHNob3VsZCBiZSBcIiR7cHJvcG9zZWRQYXRofVwiYCxcbiAgICAgICAgICBmaXg6IGZpeGVyID0+IHByb3Bvc2VkUGF0aCAmJiBmaXhlci5yZXBsYWNlVGV4dChzb3VyY2UsIEpTT04uc3RyaW5naWZ5KHByb3Bvc2VkUGF0aCkpLFxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICAvLyBPbmx5IHJlbGF0aXZlIGltcG9ydHMgYXJlIHJlbGV2YW50IGZvciB0aGlzIHJ1bGUgLS0+IFNraXAgY2hlY2tpbmdcbiAgICAgIGlmICghaW1wb3J0UGF0aC5zdGFydHNXaXRoKCcuJykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFJlcG9ydCBydWxlIHZpb2xhdGlvbiBpZiBwYXRoIGlzIG5vdCB0aGUgc2hvcnRlc3QgcG9zc2libGVcbiAgICAgIGNvbnN0IHJlc29sdmVkUGF0aCA9IHJlc29sdmUoaW1wb3J0UGF0aCwgY29udGV4dClcbiAgICAgIGNvbnN0IG5vcm1lZFBhdGggPSBub3JtYWxpemUoaW1wb3J0UGF0aClcbiAgICAgIGNvbnN0IHJlc29sdmVkTm9ybWVkUGF0aCA9IHJlc29sdmUobm9ybWVkUGF0aCwgY29udGV4dClcbiAgICAgIGlmIChub3JtZWRQYXRoICE9PSBpbXBvcnRQYXRoICYmIHJlc29sdmVkUGF0aCA9PT0gcmVzb2x2ZWROb3JtZWRQYXRoKSB7XG4gICAgICAgIHJldHVybiByZXBvcnRXaXRoUHJvcG9zZWRQYXRoKG5vcm1lZFBhdGgpXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGZpbGVFeHRlbnNpb25zID0gZ2V0RmlsZUV4dGVuc2lvbnMoY29udGV4dC5zZXR0aW5ncylcbiAgICAgIGNvbnN0IHJlZ2V4VW5uZWNlc3NhcnlJbmRleCA9IG5ldyBSZWdFeHAoXG4gICAgICAgIGAuKlxcXFwvaW5kZXgoXFxcXCR7QXJyYXkuZnJvbShmaWxlRXh0ZW5zaW9ucykuam9pbignfFxcXFwnKX0pPyRgXG4gICAgICApXG5cbiAgICAgIC8vIENoZWNrIGlmIHBhdGggY29udGFpbnMgdW5uZWNlc3NhcnkgaW5kZXggKGluY2x1ZGluZyBhIGNvbmZpZ3VyZWQgZXh0ZW5zaW9uKVxuICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5ub1VzZWxlc3NJbmRleCAmJiByZWdleFVubmVjZXNzYXJ5SW5kZXgudGVzdChpbXBvcnRQYXRoKSkge1xuICAgICAgICBjb25zdCBwYXJlbnREaXJlY3RvcnkgPSBwYXRoLmRpcm5hbWUoaW1wb3J0UGF0aClcblxuICAgICAgICAvLyBUcnkgdG8gZmluZCBhbWJpZ3VvdXMgaW1wb3J0c1xuICAgICAgICBpZiAocGFyZW50RGlyZWN0b3J5ICE9PSAnLicgJiYgcGFyZW50RGlyZWN0b3J5ICE9PSAnLi4nKSB7XG4gICAgICAgICAgZm9yIChsZXQgZmlsZUV4dGVuc2lvbiBvZiBmaWxlRXh0ZW5zaW9ucykge1xuICAgICAgICAgICAgaWYgKHJlc29sdmUoYCR7cGFyZW50RGlyZWN0b3J5fSR7ZmlsZUV4dGVuc2lvbn1gLCBjb250ZXh0KSkge1xuICAgICAgICAgICAgICByZXR1cm4gcmVwb3J0V2l0aFByb3Bvc2VkUGF0aChgJHtwYXJlbnREaXJlY3Rvcnl9L2ApXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlcG9ydFdpdGhQcm9wb3NlZFBhdGgocGFyZW50RGlyZWN0b3J5KVxuICAgICAgfVxuXG4gICAgICAvLyBQYXRoIGlzIHNob3J0ZXN0IHBvc3NpYmxlICsgc3RhcnRzIGZyb20gdGhlIGN1cnJlbnQgZGlyZWN0b3J5IC0tPiBSZXR1cm4gZGlyZWN0bHlcbiAgICAgIGlmIChpbXBvcnRQYXRoLnN0YXJ0c1dpdGgoJy4vJykpIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFBhdGggaXMgbm90IGV4aXN0aW5nIC0tPiBSZXR1cm4gZGlyZWN0bHkgKGZvbGxvd2luZyBjb2RlIHJlcXVpcmVzIHBhdGggdG8gYmUgZGVmaW5lZClcbiAgICAgIGlmIChyZXNvbHZlZFBhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBwYXRoLnJlbGF0aXZlKGN1cnJlbnREaXIsIHJlc29sdmVkUGF0aCkgLy8gRXhwZWN0ZWQgaW1wb3J0IHBhdGhcbiAgICAgIGNvbnN0IGV4cGVjdGVkU3BsaXQgPSBleHBlY3RlZC5zcGxpdChwYXRoLnNlcCkgLy8gU3BsaXQgYnkgLyBvciBcXCAoZGVwZW5kaW5nIG9uIE9TKVxuICAgICAgY29uc3QgaW1wb3J0UGF0aFNwbGl0ID0gaW1wb3J0UGF0aC5yZXBsYWNlKC9eXFwuXFwvLywgJycpLnNwbGl0KCcvJylcbiAgICAgIGNvbnN0IGNvdW50SW1wb3J0UGF0aFJlbGF0aXZlUGFyZW50cyA9IGNvdW50UmVsYXRpdmVQYXJlbnRzKGltcG9ydFBhdGhTcGxpdClcbiAgICAgIGNvbnN0IGNvdW50RXhwZWN0ZWRSZWxhdGl2ZVBhcmVudHMgPSBjb3VudFJlbGF0aXZlUGFyZW50cyhleHBlY3RlZFNwbGl0KVxuICAgICAgY29uc3QgZGlmZiA9IGNvdW50SW1wb3J0UGF0aFJlbGF0aXZlUGFyZW50cyAtIGNvdW50RXhwZWN0ZWRSZWxhdGl2ZVBhcmVudHNcblxuICAgICAgLy8gU2FtZSBudW1iZXIgb2YgcmVsYXRpdmUgcGFyZW50cyAtLT4gUGF0aHMgYXJlIHRoZSBzYW1lIC0tPiBSZXR1cm4gZGlyZWN0bHlcbiAgICAgIGlmIChkaWZmIDw9IDApIHtcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIC8vIFJlcG9ydCBhbmQgcHJvcG9zZSBtaW5pbWFsIG51bWJlciBvZiByZXF1aXJlZCByZWxhdGl2ZSBwYXJlbnRzXG4gICAgICByZXR1cm4gcmVwb3J0V2l0aFByb3Bvc2VkUGF0aChcbiAgICAgICAgdG9SZWxhdGl2ZVBhdGgoXG4gICAgICAgICAgaW1wb3J0UGF0aFNwbGl0XG4gICAgICAgICAgICAuc2xpY2UoMCwgY291bnRFeHBlY3RlZFJlbGF0aXZlUGFyZW50cylcbiAgICAgICAgICAgIC5jb25jYXQoaW1wb3J0UGF0aFNwbGl0LnNsaWNlKGNvdW50SW1wb3J0UGF0aFJlbGF0aXZlUGFyZW50cyArIGRpZmYpKVxuICAgICAgICAgICAgLmpvaW4oJy8nKVxuICAgICAgICApXG4gICAgICApXG4gICAgfVxuXG4gICAgcmV0dXJuIG1vZHVsZVZpc2l0b3IoY2hlY2tTb3VyY2VWYWx1ZSwgb3B0aW9ucylcbiAgfSxcbn1cbiJdfQ==