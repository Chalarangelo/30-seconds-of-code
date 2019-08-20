"use strict";

exports.__esModule = true;
exports.default = void 0;

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if (decl.important) {
 *   decl.warn(result, 'Avoid !important', { word: '!important' })
 * }
 */
var Warning =
/*#__PURE__*/
function () {
  /**
   * @param {string} text        Warning message.
   * @param {Object} [opts]      Warning options.
   * @param {Node}   opts.node   CSS node that caused the warning.
   * @param {string} opts.word   Word in CSS source that caused the warning.
   * @param {number} opts.index  Index in CSS node string that caused
   *                             the warning.
   * @param {string} opts.plugin Name of the plugin that created
   *                             this warning. {@link Result#warn} fills
   *                             this property automatically.
   */
  function Warning(text, opts) {
    if (opts === void 0) {
      opts = {};
    }

    /**
     * Type to filter warnings from {@link Result#messages}.
     * Always equal to `"warning"`.
     *
     * @type {string}
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * The warning message.
     *
     * @type {string}
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */

    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * Line in the input file with this warning’s source.
       * @type {number}
       *
       * @example
       * warning.line //=> 5
       */

      this.line = pos.line;
      /**
       * Column in the input file with this warning’s source.
       *
       * @type {number}
       *
       * @example
       * warning.column //=> 6
       */

      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }
  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} Warning position and message.
   */


  var _proto = Warning.prototype;

  _proto.toString = function toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message;
    }

    if (this.plugin) {
      return this.plugin + ': ' + this.text;
    }

    return this.text;
  }
  /**
   * @memberof Warning#
   * @member {string} plugin The name of the plugin that created
   *                         it will fill this property automatically.
   *                         this warning. When you call {@link Node#warn}
   *
   * @example
   * warning.plugin //=> 'postcss-important'
   */

  /**
   * @memberof Warning#
   * @member {Node} node Contains the CSS node that caused the warning.
   *
   * @example
   * warning.node.toString() //=> 'color: white !important'
   */
  ;

  return Warning;
}();

var _default = Warning;
exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmcuZXM2Il0sIm5hbWVzIjpbIldhcm5pbmciLCJ0ZXh0Iiwib3B0cyIsInR5cGUiLCJub2RlIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImxpbmUiLCJjb2x1bW4iLCJvcHQiLCJ0b1N0cmluZyIsImVycm9yIiwicGx1Z2luIiwiaW5kZXgiLCJ3b3JkIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7Ozs7Ozs7SUFRTUEsTzs7O0FBQ0o7Ozs7Ozs7Ozs7O0FBV0EsbUJBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQStCO0FBQUEsUUFBWkEsSUFBWTtBQUFaQSxNQUFBQSxJQUFZLEdBQUwsRUFBSztBQUFBOztBQUM3Qjs7Ozs7Ozs7O0FBU0EsU0FBS0MsSUFBTCxHQUFZLFNBQVo7QUFDQTs7Ozs7Ozs7O0FBUUEsU0FBS0YsSUFBTCxHQUFZQSxJQUFaOztBQUVBLFFBQUlDLElBQUksQ0FBQ0UsSUFBTCxJQUFhRixJQUFJLENBQUNFLElBQUwsQ0FBVUMsTUFBM0IsRUFBbUM7QUFDakMsVUFBSUMsR0FBRyxHQUFHSixJQUFJLENBQUNFLElBQUwsQ0FBVUcsVUFBVixDQUFxQkwsSUFBckIsQ0FBVjtBQUNBOzs7Ozs7OztBQU9BLFdBQUtNLElBQUwsR0FBWUYsR0FBRyxDQUFDRSxJQUFoQjtBQUNBOzs7Ozs7Ozs7QUFRQSxXQUFLQyxNQUFMLEdBQWNILEdBQUcsQ0FBQ0csTUFBbEI7QUFDRDs7QUFFRCxTQUFLLElBQUlDLEdBQVQsSUFBZ0JSLElBQWhCO0FBQXNCLFdBQUtRLEdBQUwsSUFBWVIsSUFBSSxDQUFDUSxHQUFELENBQWhCO0FBQXRCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7O1NBUUFDLFEsR0FBQSxvQkFBWTtBQUNWLFFBQUksS0FBS1AsSUFBVCxFQUFlO0FBQ2IsYUFBTyxLQUFLQSxJQUFMLENBQVVRLEtBQVYsQ0FBZ0IsS0FBS1gsSUFBckIsRUFBMkI7QUFDaENZLFFBQUFBLE1BQU0sRUFBRSxLQUFLQSxNQURtQjtBQUVoQ0MsUUFBQUEsS0FBSyxFQUFFLEtBQUtBLEtBRm9CO0FBR2hDQyxRQUFBQSxJQUFJLEVBQUUsS0FBS0E7QUFIcUIsT0FBM0IsRUFJSkMsT0FKSDtBQUtEOztBQUVELFFBQUksS0FBS0gsTUFBVCxFQUFpQjtBQUNmLGFBQU8sS0FBS0EsTUFBTCxHQUFjLElBQWQsR0FBcUIsS0FBS1osSUFBakM7QUFDRDs7QUFFRCxXQUFPLEtBQUtBLElBQVo7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7OztlQVNhRCxPIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBSZXByZXNlbnRzIGEgcGx1Z2lu4oCZcyB3YXJuaW5nLiBJdCBjYW4gYmUgY3JlYXRlZCB1c2luZyB7QGxpbmsgTm9kZSN3YXJufS5cbiAqXG4gKiBAZXhhbXBsZVxuICogaWYgKGRlY2wuaW1wb3J0YW50KSB7XG4gKiAgIGRlY2wud2FybihyZXN1bHQsICdBdm9pZCAhaW1wb3J0YW50JywgeyB3b3JkOiAnIWltcG9ydGFudCcgfSlcbiAqIH1cbiAqL1xuY2xhc3MgV2FybmluZyB7XG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgV2FybmluZyBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdICAgICAgV2FybmluZyBvcHRpb25zLlxuICAgKiBAcGFyYW0ge05vZGV9ICAgb3B0cy5ub2RlICAgQ1NTIG5vZGUgdGhhdCBjYXVzZWQgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICBXb3JkIGluIENTUyBzb3VyY2UgdGhhdCBjYXVzZWQgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICBJbmRleCBpbiBDU1Mgbm9kZSBzdHJpbmcgdGhhdCBjYXVzZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gTmFtZSBvZiB0aGUgcGx1Z2luIHRoYXQgY3JlYXRlZFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3YXJuaW5nLiB7QGxpbmsgUmVzdWx0I3dhcm59IGZpbGxzXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzIHByb3BlcnR5IGF1dG9tYXRpY2FsbHkuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAodGV4dCwgb3B0cyA9IHsgfSkge1xuICAgIC8qKlxuICAgICAqIFR5cGUgdG8gZmlsdGVyIHdhcm5pbmdzIGZyb20ge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAgICogQWx3YXlzIGVxdWFsIHRvIGBcIndhcm5pbmdcImAuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBub25XYXJuaW5nID0gcmVzdWx0Lm1lc3NhZ2VzLmZpbHRlcihpID0+IGkudHlwZSAhPT0gJ3dhcm5pbmcnKVxuICAgICAqL1xuICAgIHRoaXMudHlwZSA9ICd3YXJuaW5nJ1xuICAgIC8qKlxuICAgICAqIFRoZSB3YXJuaW5nIG1lc3NhZ2UuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiB3YXJuaW5nLnRleHQgLy89PiAnVHJ5IHRvIGF2b2lkICFpbXBvcnRhbnQnXG4gICAgICovXG4gICAgdGhpcy50ZXh0ID0gdGV4dFxuXG4gICAgaWYgKG9wdHMubm9kZSAmJiBvcHRzLm5vZGUuc291cmNlKSB7XG4gICAgICBsZXQgcG9zID0gb3B0cy5ub2RlLnBvc2l0aW9uQnkob3B0cylcbiAgICAgIC8qKlxuICAgICAgICogTGluZSBpbiB0aGUgaW5wdXQgZmlsZSB3aXRoIHRoaXMgd2FybmluZ+KAmXMgc291cmNlLlxuICAgICAgICogQHR5cGUge251bWJlcn1cbiAgICAgICAqXG4gICAgICAgKiBAZXhhbXBsZVxuICAgICAgICogd2FybmluZy5saW5lIC8vPT4gNVxuICAgICAgICovXG4gICAgICB0aGlzLmxpbmUgPSBwb3MubGluZVxuICAgICAgLyoqXG4gICAgICAgKiBDb2x1bW4gaW4gdGhlIGlucHV0IGZpbGUgd2l0aCB0aGlzIHdhcm5pbmfigJlzIHNvdXJjZS5cbiAgICAgICAqXG4gICAgICAgKiBAdHlwZSB7bnVtYmVyfVxuICAgICAgICpcbiAgICAgICAqIEBleGFtcGxlXG4gICAgICAgKiB3YXJuaW5nLmNvbHVtbiAvLz0+IDZcbiAgICAgICAqL1xuICAgICAgdGhpcy5jb2x1bW4gPSBwb3MuY29sdW1uXG4gICAgfVxuXG4gICAgZm9yIChsZXQgb3B0IGluIG9wdHMpIHRoaXNbb3B0XSA9IG9wdHNbb3B0XVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgYSB3YXJuaW5nIHBvc2l0aW9uIGFuZCBtZXNzYWdlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB3YXJuaW5nLnRvU3RyaW5nKCkgLy89PiAncG9zdGNzcy1saW50OmEuY3NzOjEwOjE0OiBBdm9pZCAhaW1wb3J0YW50J1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IFdhcm5pbmcgcG9zaXRpb24gYW5kIG1lc3NhZ2UuXG4gICAqL1xuICB0b1N0cmluZyAoKSB7XG4gICAgaWYgKHRoaXMubm9kZSkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZS5lcnJvcih0aGlzLnRleHQsIHtcbiAgICAgICAgcGx1Z2luOiB0aGlzLnBsdWdpbixcbiAgICAgICAgaW5kZXg6IHRoaXMuaW5kZXgsXG4gICAgICAgIHdvcmQ6IHRoaXMud29yZFxuICAgICAgfSkubWVzc2FnZVxuICAgIH1cblxuICAgIGlmICh0aGlzLnBsdWdpbikge1xuICAgICAgcmV0dXJuIHRoaXMucGx1Z2luICsgJzogJyArIHRoaXMudGV4dFxuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnRleHRcbiAgfVxuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgV2FybmluZyNcbiAgICogQG1lbWJlciB7c3RyaW5nfSBwbHVnaW4gVGhlIG5hbWUgb2YgdGhlIHBsdWdpbiB0aGF0IGNyZWF0ZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgaXQgd2lsbCBmaWxsIHRoaXMgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3YXJuaW5nLiBXaGVuIHlvdSBjYWxsIHtAbGluayBOb2RlI3dhcm59XG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHdhcm5pbmcucGx1Z2luIC8vPT4gJ3Bvc3Rjc3MtaW1wb3J0YW50J1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIFdhcm5pbmcjXG4gICAqIEBtZW1iZXIge05vZGV9IG5vZGUgQ29udGFpbnMgdGhlIENTUyBub2RlIHRoYXQgY2F1c2VkIHRoZSB3YXJuaW5nLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiB3YXJuaW5nLm5vZGUudG9TdHJpbmcoKSAvLz0+ICdjb2xvcjogd2hpdGUgIWltcG9ydGFudCdcbiAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IFdhcm5pbmdcbiJdLCJmaWxlIjoid2FybmluZy5qcyJ9
