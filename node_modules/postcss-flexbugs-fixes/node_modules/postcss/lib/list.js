'use strict';

exports.__esModule = true;
/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list;
 *
 * @namespace list
 */
var list = {
    split: function split(string, separators, last) {
        var array = [];
        var current = '';
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter === '\\') {
                    escape = true;
                } else if (letter === quote) {
                    quote = false;
                }
            } else if (letter === '"' || letter === '\'') {
                quote = letter;
            } else if (letter === '(') {
                func += 1;
            } else if (letter === ')') {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                if (separators.indexOf(letter) !== -1) split = true;
            }

            if (split) {
                if (current !== '') array.push(current.trim());
                current = '';
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== '') array.push(current.trim());
        return array;
    },


    /**
     * Safely splits space-separated values (such as those for `background`,
     * `border-radius`, and other shorthand properties).
     *
     * @param {string} string - space-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
     */
    space: function space(string) {
        var spaces = [' ', '\n', '\t'];
        return list.split(string, spaces);
    },


    /**
     * Safely splits comma-separated values (such as those for `transition-*`
     * and `background` properties).
     *
     * @param {string} string - comma-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.comma('black, linear-gradient(white, black)')
     * //=> ['black', 'linear-gradient(white, black)']
     */
    comma: function comma(string) {
        var comma = ',';
        return list.split(string, [comma], true);
    }
};

exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuZXM2Il0sIm5hbWVzIjpbImxpc3QiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvcnMiLCJsYXN0IiwiYXJyYXkiLCJjdXJyZW50IiwiZnVuYyIsInF1b3RlIiwiZXNjYXBlIiwiaSIsImxlbmd0aCIsImxldHRlciIsImluZGV4T2YiLCJwdXNoIiwidHJpbSIsInNwYWNlIiwic3BhY2VzIiwiY29tbWEiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7QUFTQSxJQUFJQSxPQUFPO0FBRVBDLFNBRk8saUJBRURDLE1BRkMsRUFFT0MsVUFGUCxFQUVtQkMsSUFGbkIsRUFFeUI7QUFDNUIsWUFBSUMsUUFBVSxFQUFkO0FBQ0EsWUFBSUMsVUFBVSxFQUFkO0FBQ0EsWUFBSUwsUUFBVSxLQUFkOztBQUVBLFlBQUlNLE9BQVUsQ0FBZDtBQUNBLFlBQUlDLFFBQVUsS0FBZDtBQUNBLFlBQUlDLFNBQVUsS0FBZDs7QUFFQSxhQUFNLElBQUlDLElBQUksQ0FBZCxFQUFpQkEsSUFBSVIsT0FBT1MsTUFBNUIsRUFBb0NELEdBQXBDLEVBQTBDO0FBQ3RDLGdCQUFJRSxTQUFTVixPQUFPUSxDQUFQLENBQWI7O0FBRUEsZ0JBQUtGLEtBQUwsRUFBYTtBQUNULG9CQUFLQyxNQUFMLEVBQWM7QUFDVkEsNkJBQVMsS0FBVDtBQUNILGlCQUZELE1BRU8sSUFBS0csV0FBVyxJQUFoQixFQUF1QjtBQUMxQkgsNkJBQVMsSUFBVDtBQUNILGlCQUZNLE1BRUEsSUFBS0csV0FBV0osS0FBaEIsRUFBd0I7QUFDM0JBLDRCQUFRLEtBQVI7QUFDSDtBQUNKLGFBUkQsTUFRTyxJQUFLSSxXQUFXLEdBQVgsSUFBa0JBLFdBQVcsSUFBbEMsRUFBeUM7QUFDNUNKLHdCQUFRSSxNQUFSO0FBQ0gsYUFGTSxNQUVBLElBQUtBLFdBQVcsR0FBaEIsRUFBc0I7QUFDekJMLHdCQUFRLENBQVI7QUFDSCxhQUZNLE1BRUEsSUFBS0ssV0FBVyxHQUFoQixFQUFzQjtBQUN6QixvQkFBS0wsT0FBTyxDQUFaLEVBQWdCQSxRQUFRLENBQVI7QUFDbkIsYUFGTSxNQUVBLElBQUtBLFNBQVMsQ0FBZCxFQUFrQjtBQUNyQixvQkFBS0osV0FBV1UsT0FBWCxDQUFtQkQsTUFBbkIsTUFBK0IsQ0FBQyxDQUFyQyxFQUF5Q1gsUUFBUSxJQUFSO0FBQzVDOztBQUVELGdCQUFLQSxLQUFMLEVBQWE7QUFDVCxvQkFBS0ssWUFBWSxFQUFqQixFQUFzQkQsTUFBTVMsSUFBTixDQUFXUixRQUFRUyxJQUFSLEVBQVg7QUFDdEJULDBCQUFVLEVBQVY7QUFDQUwsd0JBQVUsS0FBVjtBQUNILGFBSkQsTUFJTztBQUNISywyQkFBV00sTUFBWDtBQUNIO0FBQ0o7O0FBRUQsWUFBS1IsUUFBUUUsWUFBWSxFQUF6QixFQUE4QkQsTUFBTVMsSUFBTixDQUFXUixRQUFRUyxJQUFSLEVBQVg7QUFDOUIsZUFBT1YsS0FBUDtBQUNILEtBM0NNOzs7QUE2Q1A7Ozs7Ozs7Ozs7O0FBV0FXLFNBeERPLGlCQXdERGQsTUF4REMsRUF3RE87QUFDVixZQUFJZSxTQUFTLENBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxJQUFaLENBQWI7QUFDQSxlQUFPakIsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLEVBQW1CZSxNQUFuQixDQUFQO0FBQ0gsS0EzRE07OztBQTZEUDs7Ozs7Ozs7Ozs7O0FBWUFDLFNBekVPLGlCQXlFRGhCLE1BekVDLEVBeUVPO0FBQ1YsWUFBSWdCLFFBQVEsR0FBWjtBQUNBLGVBQU9sQixLQUFLQyxLQUFMLENBQVdDLE1BQVgsRUFBbUIsQ0FBQ2dCLEtBQUQsQ0FBbkIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNIO0FBNUVNLENBQVg7O2tCQWdGZWxCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udGFpbnMgaGVscGVycyBmb3Igc2FmZWx5IHNwbGl0dGluZyBsaXN0cyBvZiBDU1MgdmFsdWVzLFxuICogcHJlc2VydmluZyBwYXJlbnRoZXNlcyBhbmQgcXVvdGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBsaXN0ID0gcG9zdGNzcy5saXN0O1xuICpcbiAqIEBuYW1lc3BhY2UgbGlzdFxuICovXG5sZXQgbGlzdCA9IHtcblxuICAgIHNwbGl0KHN0cmluZywgc2VwYXJhdG9ycywgbGFzdCkge1xuICAgICAgICBsZXQgYXJyYXkgICA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudCA9ICcnO1xuICAgICAgICBsZXQgc3BsaXQgICA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBmdW5jICAgID0gMDtcbiAgICAgICAgbGV0IHF1b3RlICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IGVzY2FwZSAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBsZXQgbGV0dGVyID0gc3RyaW5nW2ldO1xuXG4gICAgICAgICAgICBpZiAoIHF1b3RlICkge1xuICAgICAgICAgICAgICAgIGlmICggZXNjYXBlICkge1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBsZXR0ZXIgPT09ICdcXFxcJyApIHtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBsZXR0ZXIgPT09IHF1b3RlICkge1xuICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGxldHRlciA9PT0gJ1wiJyB8fCBsZXR0ZXIgPT09ICdcXCcnICkge1xuICAgICAgICAgICAgICAgIHF1b3RlID0gbGV0dGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggbGV0dGVyID09PSAnKCcgKSB7XG4gICAgICAgICAgICAgICAgZnVuYyArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggbGV0dGVyID09PSAnKScgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBmdW5jID4gMCApIGZ1bmMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGZ1bmMgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBzZXBhcmF0b3JzLmluZGV4T2YobGV0dGVyKSAhPT0gLTEgKSBzcGxpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc3BsaXQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBjdXJyZW50ICE9PSAnJyApIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAnJztcbiAgICAgICAgICAgICAgICBzcGxpdCAgID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBsYXN0IHx8IGN1cnJlbnQgIT09ICcnICkgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSk7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2FmZWx5IHNwbGl0cyBzcGFjZS1zZXBhcmF0ZWQgdmFsdWVzIChzdWNoIGFzIHRob3NlIGZvciBgYmFja2dyb3VuZGAsXG4gICAgICogYGJvcmRlci1yYWRpdXNgLCBhbmQgb3RoZXIgc2hvcnRoYW5kIHByb3BlcnRpZXMpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIHNwYWNlLXNlcGFyYXRlZCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ1tdfSBzcGxpdCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy5saXN0LnNwYWNlKCcxcHggY2FsYygxMCUgKyAxcHgpJykgLy89PiBbJzFweCcsICdjYWxjKDEwJSArIDFweCknXVxuICAgICAqL1xuICAgIHNwYWNlKHN0cmluZykge1xuICAgICAgICBsZXQgc3BhY2VzID0gWycgJywgJ1xcbicsICdcXHQnXTtcbiAgICAgICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgc3BsaXRzIGNvbW1hLXNlcGFyYXRlZCB2YWx1ZXMgKHN1Y2ggYXMgdGhvc2UgZm9yIGB0cmFuc2l0aW9uLSpgXG4gICAgICogYW5kIGBiYWNrZ3JvdW5kYCBwcm9wZXJ0aWVzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBjb21tYS1zZXBhcmF0ZWQgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0gc3BsaXQgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MubGlzdC5jb21tYSgnYmxhY2ssIGxpbmVhci1ncmFkaWVudCh3aGl0ZSwgYmxhY2spJylcbiAgICAgKiAvLz0+IFsnYmxhY2snLCAnbGluZWFyLWdyYWRpZW50KHdoaXRlLCBibGFjayknXVxuICAgICAqL1xuICAgIGNvbW1hKHN0cmluZykge1xuICAgICAgICBsZXQgY29tbWEgPSAnLCc7XG4gICAgICAgIHJldHVybiBsaXN0LnNwbGl0KHN0cmluZywgW2NvbW1hXSwgdHJ1ZSk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsaXN0O1xuIl19
