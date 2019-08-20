"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list
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
   * @param {string} string Space-separated values.
   *
   * @return {string[]} Split values.
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
   * @param {string} string Comma-separated values.
   *
   * @return {string[]} Split values.
   *
   * @example
   * postcss.list.comma('black, linear-gradient(white, black)')
   * //=> ['black', 'linear-gradient(white, black)']
   */
  comma: function comma(string) {
    return list.split(string, [','], true);
  }
};
var _default = list;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuZXM2Il0sIm5hbWVzIjpbImxpc3QiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvcnMiLCJsYXN0IiwiYXJyYXkiLCJjdXJyZW50IiwiZnVuYyIsInF1b3RlIiwiZXNjYXBlIiwiaSIsImxlbmd0aCIsImxldHRlciIsImluZGV4T2YiLCJwdXNoIiwidHJpbSIsInNwYWNlIiwic3BhY2VzIiwiY29tbWEiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7Ozs7Ozs7OztBQVNBLElBQUlBLElBQUksR0FBRztBQUVUQyxFQUFBQSxLQUZTLGlCQUVGQyxNQUZFLEVBRU1DLFVBRk4sRUFFa0JDLElBRmxCLEVBRXdCO0FBQy9CLFFBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsUUFBSUMsT0FBTyxHQUFHLEVBQWQ7QUFDQSxRQUFJTCxLQUFLLEdBQUcsS0FBWjtBQUVBLFFBQUlNLElBQUksR0FBRyxDQUFYO0FBQ0EsUUFBSUMsS0FBSyxHQUFHLEtBQVo7QUFDQSxRQUFJQyxNQUFNLEdBQUcsS0FBYjs7QUFFQSxTQUFLLElBQUlDLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdSLE1BQU0sQ0FBQ1MsTUFBM0IsRUFBbUNELENBQUMsRUFBcEMsRUFBd0M7QUFDdEMsVUFBSUUsTUFBTSxHQUFHVixNQUFNLENBQUNRLENBQUQsQ0FBbkI7O0FBRUEsVUFBSUYsS0FBSixFQUFXO0FBQ1QsWUFBSUMsTUFBSixFQUFZO0FBQ1ZBLFVBQUFBLE1BQU0sR0FBRyxLQUFUO0FBQ0QsU0FGRCxNQUVPLElBQUlHLE1BQU0sS0FBSyxJQUFmLEVBQXFCO0FBQzFCSCxVQUFBQSxNQUFNLEdBQUcsSUFBVDtBQUNELFNBRk0sTUFFQSxJQUFJRyxNQUFNLEtBQUtKLEtBQWYsRUFBc0I7QUFDM0JBLFVBQUFBLEtBQUssR0FBRyxLQUFSO0FBQ0Q7QUFDRixPQVJELE1BUU8sSUFBSUksTUFBTSxLQUFLLEdBQVgsSUFBa0JBLE1BQU0sS0FBSyxJQUFqQyxFQUF1QztBQUM1Q0osUUFBQUEsS0FBSyxHQUFHSSxNQUFSO0FBQ0QsT0FGTSxNQUVBLElBQUlBLE1BQU0sS0FBSyxHQUFmLEVBQW9CO0FBQ3pCTCxRQUFBQSxJQUFJLElBQUksQ0FBUjtBQUNELE9BRk0sTUFFQSxJQUFJSyxNQUFNLEtBQUssR0FBZixFQUFvQjtBQUN6QixZQUFJTCxJQUFJLEdBQUcsQ0FBWCxFQUFjQSxJQUFJLElBQUksQ0FBUjtBQUNmLE9BRk0sTUFFQSxJQUFJQSxJQUFJLEtBQUssQ0FBYixFQUFnQjtBQUNyQixZQUFJSixVQUFVLENBQUNVLE9BQVgsQ0FBbUJELE1BQW5CLE1BQStCLENBQUMsQ0FBcEMsRUFBdUNYLEtBQUssR0FBRyxJQUFSO0FBQ3hDOztBQUVELFVBQUlBLEtBQUosRUFBVztBQUNULFlBQUlLLE9BQU8sS0FBSyxFQUFoQixFQUFvQkQsS0FBSyxDQUFDUyxJQUFOLENBQVdSLE9BQU8sQ0FBQ1MsSUFBUixFQUFYO0FBQ3BCVCxRQUFBQSxPQUFPLEdBQUcsRUFBVjtBQUNBTCxRQUFBQSxLQUFLLEdBQUcsS0FBUjtBQUNELE9BSkQsTUFJTztBQUNMSyxRQUFBQSxPQUFPLElBQUlNLE1BQVg7QUFDRDtBQUNGOztBQUVELFFBQUlSLElBQUksSUFBSUUsT0FBTyxLQUFLLEVBQXhCLEVBQTRCRCxLQUFLLENBQUNTLElBQU4sQ0FBV1IsT0FBTyxDQUFDUyxJQUFSLEVBQVg7QUFDNUIsV0FBT1YsS0FBUDtBQUNELEdBM0NROztBQTZDVDs7Ozs7Ozs7Ozs7QUFXQVcsRUFBQUEsS0F4RFMsaUJBd0RGZCxNQXhERSxFQXdETTtBQUNiLFFBQUllLE1BQU0sR0FBRyxDQUFDLEdBQUQsRUFBTSxJQUFOLEVBQVksSUFBWixDQUFiO0FBQ0EsV0FBT2pCLElBQUksQ0FBQ0MsS0FBTCxDQUFXQyxNQUFYLEVBQW1CZSxNQUFuQixDQUFQO0FBQ0QsR0EzRFE7O0FBNkRUOzs7Ozs7Ozs7Ozs7QUFZQUMsRUFBQUEsS0F6RVMsaUJBeUVGaEIsTUF6RUUsRUF5RU07QUFDYixXQUFPRixJQUFJLENBQUNDLEtBQUwsQ0FBV0MsTUFBWCxFQUFtQixDQUFDLEdBQUQsQ0FBbkIsRUFBMEIsSUFBMUIsQ0FBUDtBQUNEO0FBM0VRLENBQVg7ZUErRWVGLEkiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbnRhaW5zIGhlbHBlcnMgZm9yIHNhZmVseSBzcGxpdHRpbmcgbGlzdHMgb2YgQ1NTIHZhbHVlcyxcbiAqIHByZXNlcnZpbmcgcGFyZW50aGVzZXMgYW5kIHF1b3Rlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbGlzdCA9IHBvc3Rjc3MubGlzdFxuICpcbiAqIEBuYW1lc3BhY2UgbGlzdFxuICovXG5sZXQgbGlzdCA9IHtcblxuICBzcGxpdCAoc3RyaW5nLCBzZXBhcmF0b3JzLCBsYXN0KSB7XG4gICAgbGV0IGFycmF5ID0gW11cbiAgICBsZXQgY3VycmVudCA9ICcnXG4gICAgbGV0IHNwbGl0ID0gZmFsc2VcblxuICAgIGxldCBmdW5jID0gMFxuICAgIGxldCBxdW90ZSA9IGZhbHNlXG4gICAgbGV0IGVzY2FwZSA9IGZhbHNlXG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgbGV0IGxldHRlciA9IHN0cmluZ1tpXVxuXG4gICAgICBpZiAocXVvdGUpIHtcbiAgICAgICAgaWYgKGVzY2FwZSkge1xuICAgICAgICAgIGVzY2FwZSA9IGZhbHNlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnXFxcXCcpIHtcbiAgICAgICAgICBlc2NhcGUgPSB0cnVlXG4gICAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSBxdW90ZSkge1xuICAgICAgICAgIHF1b3RlID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICdcIicgfHwgbGV0dGVyID09PSAnXFwnJykge1xuICAgICAgICBxdW90ZSA9IGxldHRlclxuICAgICAgfSBlbHNlIGlmIChsZXR0ZXIgPT09ICcoJykge1xuICAgICAgICBmdW5jICs9IDFcbiAgICAgIH0gZWxzZSBpZiAobGV0dGVyID09PSAnKScpIHtcbiAgICAgICAgaWYgKGZ1bmMgPiAwKSBmdW5jIC09IDFcbiAgICAgIH0gZWxzZSBpZiAoZnVuYyA9PT0gMCkge1xuICAgICAgICBpZiAoc2VwYXJhdG9ycy5pbmRleE9mKGxldHRlcikgIT09IC0xKSBzcGxpdCA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKHNwbGl0KSB7XG4gICAgICAgIGlmIChjdXJyZW50ICE9PSAnJykgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSlcbiAgICAgICAgY3VycmVudCA9ICcnXG4gICAgICAgIHNwbGl0ID0gZmFsc2VcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyXG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGxhc3QgfHwgY3VycmVudCAhPT0gJycpIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpXG4gICAgcmV0dXJuIGFycmF5XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgc3BhY2Utc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYGJhY2tncm91bmRgLFxuICAgKiBgYm9yZGVyLXJhZGl1c2AsIGFuZCBvdGhlciBzaG9ydGhhbmQgcHJvcGVydGllcykuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgU3BhY2Utc2VwYXJhdGVkIHZhbHVlcy5cbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nW119IFNwbGl0IHZhbHVlcy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5saXN0LnNwYWNlKCcxcHggY2FsYygxMCUgKyAxcHgpJykgLy89PiBbJzFweCcsICdjYWxjKDEwJSArIDFweCknXVxuICAgKi9cbiAgc3BhY2UgKHN0cmluZykge1xuICAgIGxldCBzcGFjZXMgPSBbJyAnLCAnXFxuJywgJ1xcdCddXG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpXG4gIH0sXG5cbiAgLyoqXG4gICAqIFNhZmVseSBzcGxpdHMgY29tbWEtc2VwYXJhdGVkIHZhbHVlcyAoc3VjaCBhcyB0aG9zZSBmb3IgYHRyYW5zaXRpb24tKmBcbiAgICogYW5kIGBiYWNrZ3JvdW5kYCBwcm9wZXJ0aWVzKS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBDb21tYS1zZXBhcmF0ZWQgdmFsdWVzLlxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0gU3BsaXQgdmFsdWVzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBwb3N0Y3NzLmxpc3QuY29tbWEoJ2JsYWNrLCBsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKScpXG4gICAqIC8vPT4gWydibGFjaycsICdsaW5lYXItZ3JhZGllbnQod2hpdGUsIGJsYWNrKSddXG4gICAqL1xuICBjb21tYSAoc3RyaW5nKSB7XG4gICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBbJywnXSwgdHJ1ZSlcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IGxpc3RcbiJdLCJmaWxlIjoibGlzdC5qcyJ9
