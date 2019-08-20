'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sourceMap = require('source-map');

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fromBase64(str) {
    if (Buffer) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(str, 'base64').toString();
        } else {
            return new Buffer(str, 'base64').toString();
        }
    } else {
        return window.atob(str);
    }
}

/**
 * Source map information from input CSS.
 * For example, source map after Sass compiler.
 *
 * This class will automatically find source map in input CSS or in file system
 * near input file (according `from` option).
 *
 * @example
 * const root = postcss.parse(css, { from: 'a.sass.css' });
 * root.input.map //=> PreviousMap
 */

var PreviousMap = function () {

    /**
     * @param {string}         css    - input CSS source
     * @param {processOptions} [opts] - {@link Processor#process} options
     */
    function PreviousMap(css, opts) {
        _classCallCheck(this, PreviousMap);

        this.loadAnnotation(css);
        /**
         * @member {boolean} - Was source map inlined by data-uri to input CSS.
         */
        this.inline = this.startWith(this.annotation, 'data:');

        var prev = opts.map ? opts.map.prev : undefined;
        var text = this.loadMap(opts.from, prev);
        if (text) this.text = text;
    }

    /**
     * Create a instance of `SourceMapGenerator` class
     * from the `source-map` library to work with source map information.
     *
     * It is lazy method, so it will create object only on first call
     * and then it will use cache.
     *
     * @return {SourceMapGenerator} object with source map information
     */


    PreviousMap.prototype.consumer = function consumer() {
        if (!this.consumerCache) {
            this.consumerCache = new _sourceMap2.default.SourceMapConsumer(this.text);
        }
        return this.consumerCache;
    };

    /**
     * Does source map contains `sourcesContent` with input source text.
     *
     * @return {boolean} Is `sourcesContent` present
     */


    PreviousMap.prototype.withContent = function withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    };

    PreviousMap.prototype.startWith = function startWith(string, start) {
        if (!string) return false;
        return string.substr(0, start.length) === start;
    };

    PreviousMap.prototype.loadAnnotation = function loadAnnotation(css) {
        var match = css.match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//);
        if (match) this.annotation = match[1].trim();
    };

    PreviousMap.prototype.decodeInline = function decodeInline(text) {
        // data:application/json;charset=utf-8;base64,
        // data:application/json;charset=utf8;base64,
        // data:application/json;base64,
        var baseUri = /^data:application\/json;(?:charset=utf-?8;)?base64,/;
        var uri = 'data:application/json,';

        if (this.startWith(text, uri)) {
            return decodeURIComponent(text.substr(uri.length));
        } else if (baseUri.test(text)) {
            return fromBase64(text.substr(RegExp.lastMatch.length));
        } else {
            var encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error('Unsupported source map encoding ' + encoding);
        }
    };

    PreviousMap.prototype.loadMap = function loadMap(file, prev) {
        if (prev === false) return false;

        if (prev) {
            if (typeof prev === 'string') {
                return prev;
            } else if (typeof prev === 'function') {
                var prevPath = prev(file);
                if (prevPath && _fs2.default.existsSync && _fs2.default.existsSync(prevPath)) {
                    return _fs2.default.readFileSync(prevPath, 'utf-8').toString().trim();
                } else {
                    throw new Error('Unable to load previous source map: ' + prevPath.toString());
                }
            } else if (prev instanceof _sourceMap2.default.SourceMapConsumer) {
                return _sourceMap2.default.SourceMapGenerator.fromSourceMap(prev).toString();
            } else if (prev instanceof _sourceMap2.default.SourceMapGenerator) {
                return prev.toString();
            } else if (this.isMap(prev)) {
                return JSON.stringify(prev);
            } else {
                throw new Error('Unsupported previous source map format: ' + prev.toString());
            }
        } else if (this.inline) {
            return this.decodeInline(this.annotation);
        } else if (this.annotation) {
            var map = this.annotation;
            if (file) map = _path2.default.join(_path2.default.dirname(file), map);

            this.root = _path2.default.dirname(map);
            if (_fs2.default.existsSync && _fs2.default.existsSync(map)) {
                return _fs2.default.readFileSync(map, 'utf-8').toString().trim();
            } else {
                return false;
            }
        }
    };

    PreviousMap.prototype.isMap = function isMap(map) {
        if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) !== 'object') return false;
        return typeof map.mappings === 'string' || typeof map._mappings === 'string';
    };

    return PreviousMap;
}();

exports.default = PreviousMap;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpb3VzLW1hcC5lczYiXSwibmFtZXMiOlsiZnJvbUJhc2U2NCIsInN0ciIsIkJ1ZmZlciIsImZyb20iLCJVaW50OEFycmF5IiwidG9TdHJpbmciLCJ3aW5kb3ciLCJhdG9iIiwiUHJldmlvdXNNYXAiLCJjc3MiLCJvcHRzIiwibG9hZEFubm90YXRpb24iLCJpbmxpbmUiLCJzdGFydFdpdGgiLCJhbm5vdGF0aW9uIiwicHJldiIsIm1hcCIsInVuZGVmaW5lZCIsInRleHQiLCJsb2FkTWFwIiwiY29uc3VtZXIiLCJjb25zdW1lckNhY2hlIiwibW96aWxsYSIsIlNvdXJjZU1hcENvbnN1bWVyIiwid2l0aENvbnRlbnQiLCJzb3VyY2VzQ29udGVudCIsImxlbmd0aCIsInN0cmluZyIsInN0YXJ0Iiwic3Vic3RyIiwibWF0Y2giLCJ0cmltIiwiZGVjb2RlSW5saW5lIiwiYmFzZVVyaSIsInVyaSIsImRlY29kZVVSSUNvbXBvbmVudCIsInRlc3QiLCJSZWdFeHAiLCJsYXN0TWF0Y2giLCJlbmNvZGluZyIsIkVycm9yIiwiZmlsZSIsInByZXZQYXRoIiwiZnMiLCJleGlzdHNTeW5jIiwicmVhZEZpbGVTeW5jIiwiU291cmNlTWFwR2VuZXJhdG9yIiwiZnJvbVNvdXJjZU1hcCIsImlzTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGgiLCJqb2luIiwiZGlybmFtZSIsInJvb3QiLCJtYXBwaW5ncyIsIl9tYXBwaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCLFFBQUtDLE1BQUwsRUFBYztBQUNWLFlBQUtBLE9BQU9DLElBQVAsSUFBZUQsT0FBT0MsSUFBUCxLQUFnQkMsV0FBV0QsSUFBL0MsRUFBc0Q7QUFDbEQsbUJBQU9ELE9BQU9DLElBQVAsQ0FBWUYsR0FBWixFQUFpQixRQUFqQixFQUEyQkksUUFBM0IsRUFBUDtBQUNILFNBRkQsTUFF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LGFBQUdDLFVBQUgsSUFBaUJELGFBQUdDLFVBQUgsQ0FBYzVCLEdBQWQsQ0FBdEIsRUFBMkM7QUFDdkMsdUJBQU8yQixhQUFHRSxZQUFILENBQWdCN0IsR0FBaEIsRUFBcUIsT0FBckIsRUFBOEJYLFFBQTlCLEdBQXlDMEIsSUFBekMsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osSzs7MEJBRURpQixLLGtCQUFNaEMsRyxFQUFLO0FBQ1AsWUFBSyxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBcEIsRUFBK0IsT0FBTyxLQUFQO0FBQy9CLGVBQU8sT0FBT0EsSUFBSXVDLFFBQVgsS0FBd0IsUUFBeEIsSUFDQSxPQUFPdkMsSUFBSXdDLFNBQVgsS0FBeUIsUUFEaEM7QUFFSCxLOzs7OztrQkFHVWhELFciLCJmaWxlIjoicHJldmlvdXMtbWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vemlsbGEgIGZyb20gJ3NvdXJjZS1tYXAnO1xuaW1wb3J0IHBhdGggICAgIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzICAgICAgIGZyb20gJ2ZzJztcblxuZnVuY3Rpb24gZnJvbUJhc2U2NChzdHIpIHtcbiAgICBpZiAoIEJ1ZmZlciApIHtcbiAgICAgICAgaWYgKCBCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICkge1xuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdHIsICdiYXNlNjQnKS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5hdG9iKHN0cik7XG4gICAgfVxufVxuXG4vKipcbiAqIFNvdXJjZSBtYXAgaW5mb3JtYXRpb24gZnJvbSBpbnB1dCBDU1MuXG4gKiBGb3IgZXhhbXBsZSwgc291cmNlIG1hcCBhZnRlciBTYXNzIGNvbXBpbGVyLlxuICpcbiAqIFRoaXMgY2xhc3Mgd2lsbCBhdXRvbWF0aWNhbGx5IGZpbmQgc291cmNlIG1hcCBpbiBpbnB1dCBDU1Mgb3IgaW4gZmlsZSBzeXN0ZW1cbiAqIG5lYXIgaW5wdXQgZmlsZSAoYWNjb3JkaW5nIGBmcm9tYCBvcHRpb24pLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MsIHsgZnJvbTogJ2Euc2Fzcy5jc3MnIH0pO1xuICogcm9vdC5pbnB1dC5tYXAgLy89PiBQcmV2aW91c01hcFxuICovXG5jbGFzcyBQcmV2aW91c01hcCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICBjc3MgICAgLSBpbnB1dCBDU1Mgc291cmNlXG4gICAgICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdIC0ge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3NzLCBvcHRzKSB7XG4gICAgICAgIHRoaXMubG9hZEFubm90YXRpb24oY3NzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gV2FzIHNvdXJjZSBtYXAgaW5saW5lZCBieSBkYXRhLXVyaSB0byBpbnB1dCBDU1MuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlubGluZSA9IHRoaXMuc3RhcnRXaXRoKHRoaXMuYW5ub3RhdGlvbiwgJ2RhdGE6Jyk7XG5cbiAgICAgICAgbGV0IHByZXYgPSBvcHRzLm1hcCA/IG9wdHMubWFwLnByZXYgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy5sb2FkTWFwKG9wdHMuZnJvbSwgcHJldik7XG4gICAgICAgIGlmICggdGV4dCApIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgaW5zdGFuY2Ugb2YgYFNvdXJjZU1hcEdlbmVyYXRvcmAgY2xhc3NcbiAgICAgKiBmcm9tIHRoZSBgc291cmNlLW1hcGAgbGlicmFyeSB0byB3b3JrIHdpdGggc291cmNlIG1hcCBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEl0IGlzIGxhenkgbWV0aG9kLCBzbyBpdCB3aWxsIGNyZWF0ZSBvYmplY3Qgb25seSBvbiBmaXJzdCBjYWxsXG4gICAgICogYW5kIHRoZW4gaXQgd2lsbCB1c2UgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb3VyY2VNYXBHZW5lcmF0b3J9IG9iamVjdCB3aXRoIHNvdXJjZSBtYXAgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBjb25zdW1lcigpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5jb25zdW1lckNhY2hlICkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lckNhY2hlID0gbmV3IG1vemlsbGEuU291cmNlTWFwQ29uc3VtZXIodGhpcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb25zdW1lckNhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgc291cmNlIG1hcCBjb250YWlucyBgc291cmNlc0NvbnRlbnRgIHdpdGggaW5wdXQgc291cmNlIHRleHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBgc291cmNlc0NvbnRlbnRgIHByZXNlbnRcbiAgICAgKi9cbiAgICB3aXRoQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudCAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lcigpLnNvdXJjZXNDb250ZW50Lmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIHN0YXJ0V2l0aChzdHJpbmcsIHN0YXJ0KSB7XG4gICAgICAgIGlmICggIXN0cmluZyApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdHIoMCwgc3RhcnQubGVuZ3RoKSA9PT0gc3RhcnQ7XG4gICAgfVxuXG4gICAgbG9hZEFubm90YXRpb24oY3NzKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IGNzcy5tYXRjaCgvXFwvXFwqXFxzKiMgc291cmNlTWFwcGluZ1VSTD0oLiopXFxzKlxcKlxcLy8pO1xuICAgICAgICBpZiAoIG1hdGNoICkgdGhpcy5hbm5vdGF0aW9uID0gbWF0Y2hbMV0udHJpbSgpO1xuICAgIH1cblxuICAgIGRlY29kZUlubGluZSh0ZXh0KSB7XG4gICAgICAgIC8vIGRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcbiAgICAgICAgLy8gZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmODtiYXNlNjQsXG4gICAgICAgIC8vIGRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXG4gICAgICAgIGxldCBiYXNlVXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjsoPzpjaGFyc2V0PXV0Zi0/ODspP2Jhc2U2NCwvO1xuICAgICAgICBsZXQgdXJpICAgICA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJztcblxuICAgICAgICBpZiAoIHRoaXMuc3RhcnRXaXRoKHRleHQsIHVyaSkgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCB0ZXh0LnN1YnN0cih1cmkubGVuZ3RoKSApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGJhc2VVcmkudGVzdCh0ZXh0KSApIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQmFzZTY0KHRleHQuc3Vic3RyKFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBlbmNvZGluZyA9IHRleHQubWF0Y2goL2RhdGE6YXBwbGljYXRpb25cXC9qc29uOyhbXixdKyksLylbMV07XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHNvdXJjZSBtYXAgZW5jb2RpbmcgJyArIGVuY29kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNYXAoZmlsZSwgcHJldikge1xuICAgICAgICBpZiAoIHByZXYgPT09IGZhbHNlICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICggcHJldiApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHByZXYgPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHByZXYgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZQYXRoID0gcHJldihmaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAoIHByZXZQYXRoICYmIGZzLmV4aXN0c1N5bmMgJiYgZnMuZXhpc3RzU3luYyhwcmV2UGF0aCkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocHJldlBhdGgsICd1dGYtOCcpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvYWQgcHJldmlvdXMgc291cmNlIG1hcDogJyArXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYXRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHByZXYgaW5zdGFuY2VvZiBtb3ppbGxhLlNvdXJjZU1hcENvbnN1bWVyICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3ppbGxhLlNvdXJjZU1hcEdlbmVyYXRvclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVNvdXJjZU1hcChwcmV2KS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggcHJldiBpbnN0YW5jZW9mIG1vemlsbGEuU291cmNlTWFwR2VuZXJhdG9yICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmlzTWFwKHByZXYpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwcmV2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBwcmV2aW91cyBzb3VyY2UgbWFwIGZvcm1hdDogJyArXG4gICAgICAgICAgICAgICAgICAgIHByZXYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5pbmxpbmUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVJbmxpbmUodGhpcy5hbm5vdGF0aW9uKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmFubm90YXRpb24gKSB7XG4gICAgICAgICAgICBsZXQgbWFwID0gdGhpcy5hbm5vdGF0aW9uO1xuICAgICAgICAgICAgaWYgKCBmaWxlICkgbWFwID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShmaWxlKSwgbWFwKTtcblxuICAgICAgICAgICAgdGhpcy5yb290ID0gcGF0aC5kaXJuYW1lKG1hcCk7XG4gICAgICAgICAgICBpZiAoIGZzLmV4aXN0c1N5bmMgJiYgZnMuZXhpc3RzU3luYyhtYXApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMobWFwLCAndXRmLTgnKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNYXAobWFwKSB7XG4gICAgICAgIGlmICggdHlwZW9mIG1hcCAhPT0gJ29iamVjdCcgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbWFwLm1hcHBpbmdzID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgICAgICAgdHlwZW9mIG1hcC5fbWFwcGluZ3MgPT09ICdzdHJpbmcnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJldmlvdXNNYXA7XG4iXX0=
