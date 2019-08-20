"use strict";

exports.__esModule = true;
exports.default = void 0;

var _cssSyntaxError = _interopRequireDefault(require("./css-syntax-error"));

var _stringifier = _interopRequireDefault(require("./stringifier"));

var _stringify = _interopRequireDefault(require("./stringify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function cloneNode(obj, parent) {
  var cloned = new obj.constructor();

  for (var i in obj) {
    if (!obj.hasOwnProperty(i)) continue;
    var value = obj[i];
    var type = typeof value;

    if (i === 'parent' && type === 'object') {
      if (parent) cloned[i] = parent;
    } else if (i === 'source') {
      cloned[i] = value;
    } else if (value instanceof Array) {
      cloned[i] = value.map(function (j) {
        return cloneNode(j, cloned);
      });
    } else {
      if (type === 'object' && value !== null) value = cloneNode(value);
      cloned[i] = value;
    }
  }

  return cloned;
}
/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */


var Node =
/*#__PURE__*/
function () {
  /**
   * @param {object} [defaults] Value for node properties.
   */
  function Node(defaults) {
    if (defaults === void 0) {
      defaults = {};
    }

    this.raws = {};

    if (process.env.NODE_ENV !== 'production') {
      if (typeof defaults !== 'object' && typeof defaults !== 'undefined') {
        throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
      }
    }

    for (var name in defaults) {
      this[name] = defaults[name];
    }
  }
  /**
   * Returns a `CssSyntaxError` instance containing the original position
   * of the node in the source, showing line and column numbers and also
   * a small excerpt to facilitate debugging.
   *
   * If present, an input source map will be used to get the original position
   * of the source, even from a previous compilation step
   * (e.g., from Sass compilation).
   *
   * This method produces very useful error messages.
   *
   * @param {string} message     Error description.
   * @param {object} [opts]      Options.
   * @param {string} opts.plugin Plugin name that created this error.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the error.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the error.
   *
   * @return {CssSyntaxError} Error object to throw it.
   *
   * @example
   * if (!variables[name]) {
   *   throw decl.error('Unknown variable ' + name, { word: name })
   *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
   *   //   color: $black
   *   // a
   *   //          ^
   *   //   background: white
   * }
   */


  var _proto = Node.prototype;

  _proto.error = function error(message, opts) {
    if (opts === void 0) {
      opts = {};
    }

    if (this.source) {
      var pos = this.positionBy(opts);
      return this.source.input.error(message, pos.line, pos.column, opts);
    }

    return new _cssSyntaxError.default(message);
  }
  /**
   * This method is provided as a convenience wrapper for {@link Result#warn}.
   *
   * @param {Result} result      The {@link Result} instance
   *                             that will receive the warning.
   * @param {string} text        Warning message.
   * @param {object} [opts]      Options
   * @param {string} opts.plugin Plugin name that created this warning.
   *                             PostCSS will set it automatically.
   * @param {string} opts.word   A word inside a node’s string that should
   *                             be highlighted as the source of the warning.
   * @param {number} opts.index  An index inside a node’s string that should
   *                             be highlighted as the source of the warning.
   *
   * @return {Warning} Created warning object.
   *
   * @example
   * const plugin = postcss.plugin('postcss-deprecated', () => {
   *   return (root, result) => {
   *     root.walkDecls('bad', decl => {
   *       decl.warn(result, 'Deprecated property bad')
   *     })
   *   }
   * })
   */
  ;

  _proto.warn = function warn(result, text, opts) {
    var data = {
      node: this
    };

    for (var i in opts) {
      data[i] = opts[i];
    }

    return result.warn(text, data);
  }
  /**
   * Removes the node from its parent and cleans the parent properties
   * from the node and its children.
   *
   * @example
   * if (decl.prop.match(/^-webkit-/)) {
   *   decl.remove()
   * }
   *
   * @return {Node} Node to make calls chain.
   */
  ;

  _proto.remove = function remove() {
    if (this.parent) {
      this.parent.removeChild(this);
    }

    this.parent = undefined;
    return this;
  }
  /**
   * Returns a CSS string representing the node.
   *
   * @param {stringifier|syntax} [stringifier] A syntax to use
   *                                           in string generation.
   *
   * @return {string} CSS string of this node.
   *
   * @example
   * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
   */
  ;

  _proto.toString = function toString(stringifier) {
    if (stringifier === void 0) {
      stringifier = _stringify.default;
    }

    if (stringifier.stringify) stringifier = stringifier.stringify;
    var result = '';
    stringifier(this, function (i) {
      result += i;
    });
    return result;
  }
  /**
   * Returns an exact clone of the node.
   *
   * The resulting cloned node and its (cloned) children will retain
   * code style properties.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @example
   * decl.raws.before    //=> "\n  "
   * const cloned = decl.clone({ prop: '-moz-' + decl.prop })
   * cloned.raws.before  //=> "\n  "
   * cloned.toString()   //=> -moz-transform: scale(0)
   *
   * @return {Node} Clone of the node.
   */
  ;

  _proto.clone = function clone(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = cloneNode(this);

    for (var name in overrides) {
      cloned[name] = overrides[name];
    }

    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * before the current node.
   *
   * @param {object} [overrides] Mew properties to override in the clone.
   *
   * @example
   * decl.cloneBefore({ prop: '-moz-' + decl.prop })
   *
   * @return {Node} New node
   */
  ;

  _proto.cloneBefore = function cloneBefore(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertBefore(this, cloned);
    return cloned;
  }
  /**
   * Shortcut to clone the node and insert the resulting cloned node
   * after the current node.
   *
   * @param {object} [overrides] New properties to override in the clone.
   *
   * @return {Node} New node.
   */
  ;

  _proto.cloneAfter = function cloneAfter(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }

    var cloned = this.clone(overrides);
    this.parent.insertAfter(this, cloned);
    return cloned;
  }
  /**
   * Inserts node(s) before the current node and removes the current node.
   *
   * @param {...Node} nodes Mode(s) to replace current one.
   *
   * @example
   * if (atrule.name === 'mixin') {
   *   atrule.replaceWith(mixinRules[atrule.params])
   * }
   *
   * @return {Node} Current node to methods chain.
   */
  ;

  _proto.replaceWith = function replaceWith() {
    if (this.parent) {
      for (var _len = arguments.length, nodes = new Array(_len), _key = 0; _key < _len; _key++) {
        nodes[_key] = arguments[_key];
      }

      for (var _i = 0, _nodes = nodes; _i < _nodes.length; _i++) {
        var node = _nodes[_i];
        this.parent.insertBefore(this, node);
      }

      this.remove();
    }

    return this;
  }
  /**
   * Returns the next child of the node’s parent.
   * Returns `undefined` if the current node is the last child.
   *
   * @return {Node|undefined} Next node.
   *
   * @example
   * if (comment.text === 'delete next') {
   *   const next = comment.next()
   *   if (next) {
   *     next.remove()
   *   }
   * }
   */
  ;

  _proto.next = function next() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index + 1];
  }
  /**
   * Returns the previous child of the node’s parent.
   * Returns `undefined` if the current node is the first child.
   *
   * @return {Node|undefined} Previous node.
   *
   * @example
   * const annotation = decl.prev()
   * if (annotation.type === 'comment') {
   *   readAnnotation(annotation.text)
   * }
   */
  ;

  _proto.prev = function prev() {
    if (!this.parent) return undefined;
    var index = this.parent.index(this);
    return this.parent.nodes[index - 1];
  }
  /**
   * Insert new node before current node to current node’s parent.
   *
   * Just alias for `node.parent.insertBefore(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.before('content: ""')
   */
  ;

  _proto.before = function before(add) {
    this.parent.insertBefore(this, add);
    return this;
  }
  /**
   * Insert new node after current node to current node’s parent.
   *
   * Just alias for `node.parent.insertAfter(node, add)`.
   *
   * @param {Node|object|string|Node[]} add New node.
   *
   * @return {Node} This node for methods chain.
   *
   * @example
   * decl.after('color: black')
   */
  ;

  _proto.after = function after(add) {
    this.parent.insertAfter(this, add);
    return this;
  };

  _proto.toJSON = function toJSON() {
    var fixed = {};

    for (var name in this) {
      if (!this.hasOwnProperty(name)) continue;
      if (name === 'parent') continue;
      var value = this[name];

      if (value instanceof Array) {
        fixed[name] = value.map(function (i) {
          if (typeof i === 'object' && i.toJSON) {
            return i.toJSON();
          } else {
            return i;
          }
        });
      } else if (typeof value === 'object' && value.toJSON) {
        fixed[name] = value.toJSON();
      } else {
        fixed[name] = value;
      }
    }

    return fixed;
  }
  /**
   * Returns a {@link Node#raws} value. If the node is missing
   * the code style property (because the node was manually built or cloned),
   * PostCSS will try to autodetect the code style property by looking
   * at other nodes in the tree.
   *
   * @param {string} prop          Name of code style property.
   * @param {string} [defaultType] Name of default value, it can be missed
   *                               if the value is the same as prop.
   *
   * @example
   * const root = postcss.parse('a { background: white }')
   * root.nodes[0].append({ prop: 'color', value: 'black' })
   * root.nodes[0].nodes[1].raws.before   //=> undefined
   * root.nodes[0].nodes[1].raw('before') //=> ' '
   *
   * @return {string} Code style value.
   */
  ;

  _proto.raw = function raw(prop, defaultType) {
    var str = new _stringifier.default();
    return str.raw(this, prop, defaultType);
  }
  /**
   * Finds the Root instance of the node’s tree.
   *
   * @example
   * root.nodes[0].nodes[0].root() === root
   *
   * @return {Root} Root parent.
   */
  ;

  _proto.root = function root() {
    var result = this;

    while (result.parent) {
      result = result.parent;
    }

    return result;
  }
  /**
   * Clear the code style properties for the node and its children.
   *
   * @param {boolean} [keepBetween] Keep the raws.between symbols.
   *
   * @return {undefined}
   *
   * @example
   * node.raws.before  //=> ' '
   * node.cleanRaws()
   * node.raws.before  //=> undefined
   */
  ;

  _proto.cleanRaws = function cleanRaws(keepBetween) {
    delete this.raws.before;
    delete this.raws.after;
    if (!keepBetween) delete this.raws.between;
  };

  _proto.positionInside = function positionInside(index) {
    var string = this.toString();
    var column = this.source.start.column;
    var line = this.source.start.line;

    for (var i = 0; i < index; i++) {
      if (string[i] === '\n') {
        column = 1;
        line += 1;
      } else {
        column += 1;
      }
    }

    return {
      line: line,
      column: column
    };
  };

  _proto.positionBy = function positionBy(opts) {
    var pos = this.source.start;

    if (opts.index) {
      pos = this.positionInside(opts.index);
    } else if (opts.word) {
      var index = this.toString().indexOf(opts.word);
      if (index !== -1) pos = this.positionInside(index);
    }

    return pos;
  }
  /**
   * @memberof Node#
   * @member {string} type String representing the node’s type.
   *                       Possible values are `root`, `atrule`, `rule`,
   *                       `decl`, or `comment`.
   *
   * @example
   * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
   */

  /**
   * @memberof Node#
   * @member {Container} parent The node’s parent node.
   *
   * @example
   * root.nodes[0].parent === root
   */

  /**
   * @memberof Node#
   * @member {source} source The input source of the node.
   *
   * The property is used in source map generation.
   *
   * If you create a node manually (e.g., with `postcss.decl()`),
   * that node will not have a `source` property and will be absent
   * from the source map. For this reason, the plugin developer should
   * consider cloning nodes to create new ones (in which case the new node’s
   * source will reference the original, cloned node) or setting
   * the `source` property manually.
   *
   * ```js
   * // Bad
   * const prefixed = postcss.decl({
   *   prop: '-moz-' + decl.prop,
   *   value: decl.value
   * })
   *
   * // Good
   * const prefixed = decl.clone({ prop: '-moz-' + decl.prop })
   * ```
   *
   * ```js
   * if (atrule.name === 'add-link') {
   *   const rule = postcss.rule({ selector: 'a', source: atrule.source })
   *   atrule.parent.insertBefore(atrule, rule)
   * }
   * ```
   *
   * @example
   * decl.source.input.from //=> '/home/ai/a.sass'
   * decl.source.start      //=> { line: 10, column: 2 }
   * decl.source.end        //=> { line: 10, column: 12 }
   */

  /**
   * @memberof Node#
   * @member {object} raws Information to generate byte-to-byte equal
   *                       node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text
   *   and <code>*&#47;</code>.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans selectors, declaration values and at-rule parameters
   * from comments and extra spaces, but it stores origin content in raws
   * properties. As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */
  ;

  return Node;
}();

var _default = Node;
/**
 * @typedef {object} position
 * @property {number} line   Source line in file.
 * @property {number} column Source column in file.
 */

/**
 * @typedef {object} source
 * @property {Input} input    {@link Input} with input file
 * @property {position} start The starting position of the node’s source.
 * @property {position} end   The ending position of the node’s source.
 */

exports.default = _default;
module.exports = exports.default;
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGUuZXM2Il0sIm5hbWVzIjpbImNsb25lTm9kZSIsIm9iaiIsInBhcmVudCIsImNsb25lZCIsImNvbnN0cnVjdG9yIiwiaSIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiQXJyYXkiLCJtYXAiLCJqIiwiTm9kZSIsImRlZmF1bHRzIiwicmF3cyIsInByb2Nlc3MiLCJlbnYiLCJOT0RFX0VOViIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvcHRzIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImlucHV0IiwibGluZSIsImNvbHVtbiIsIkNzc1N5bnRheEVycm9yIiwid2FybiIsInJlc3VsdCIsInRleHQiLCJkYXRhIiwibm9kZSIsInJlbW92ZSIsInJlbW92ZUNoaWxkIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJzdHJpbmdpZmllciIsImNsb25lIiwib3ZlcnJpZGVzIiwiY2xvbmVCZWZvcmUiLCJpbnNlcnRCZWZvcmUiLCJjbG9uZUFmdGVyIiwiaW5zZXJ0QWZ0ZXIiLCJyZXBsYWNlV2l0aCIsIm5vZGVzIiwibmV4dCIsImluZGV4IiwicHJldiIsImJlZm9yZSIsImFkZCIsImFmdGVyIiwidG9KU09OIiwiZml4ZWQiLCJyYXciLCJwcm9wIiwiZGVmYXVsdFR5cGUiLCJzdHIiLCJTdHJpbmdpZmllciIsInJvb3QiLCJjbGVhblJhd3MiLCJrZWVwQmV0d2VlbiIsImJldHdlZW4iLCJwb3NpdGlvbkluc2lkZSIsInN0cmluZyIsInN0YXJ0Iiwid29yZCIsImluZGV4T2YiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW9CQyxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDL0IsTUFBSUMsTUFBTSxHQUFHLElBQUlGLEdBQUcsQ0FBQ0csV0FBUixFQUFiOztBQUVBLE9BQUssSUFBSUMsQ0FBVCxJQUFjSixHQUFkLEVBQW1C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Li9jc3Mtc3ludGF4LWVycm9yJ1xuaW1wb3J0IFN0cmluZ2lmaWVyIGZyb20gJy4vc3RyaW5naWZpZXInXG5pbXBvcnQgc3RyaW5naWZ5IGZyb20gJy4vc3RyaW5naWZ5J1xuXG5mdW5jdGlvbiBjbG9uZU5vZGUgKG9iaiwgcGFyZW50KSB7XG4gIGxldCBjbG9uZWQgPSBuZXcgb2JqLmNvbnN0cnVjdG9yKClcblxuICBmb3IgKGxldCBpIGluIG9iaikge1xuICAgIGlmICghb2JqLmhhc093blByb3BlcnR5KGkpKSBjb250aW51ZVxuICAgIGxldCB2YWx1ZSA9IG9ialtpXVxuICAgIGxldCB0eXBlID0gdHlwZW9mIHZhbHVlXG5cbiAgICBpZiAoaSA9PT0gJ3BhcmVudCcgJiYgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGlmIChwYXJlbnQpIGNsb25lZFtpXSA9IHBhcmVudFxuICAgIH0gZWxzZSBpZiAoaSA9PT0gJ3NvdXJjZScpIHtcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICBjbG9uZWRbaV0gPSB2YWx1ZS5tYXAoaiA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHR5cGUgPT09ICdvYmplY3QnICYmIHZhbHVlICE9PSBudWxsKSB2YWx1ZSA9IGNsb25lTm9kZSh2YWx1ZSlcbiAgICAgIGNsb25lZFtpXSA9IHZhbHVlXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNsb25lZFxufVxuXG4vKipcbiAqIEFsbCBub2RlIGNsYXNzZXMgaW5oZXJpdCB0aGUgZm9sbG93aW5nIGNvbW1vbiBtZXRob2RzLlxuICpcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBOb2RlIHtcbiAgLyoqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIFZhbHVlIGZvciBub2RlIHByb3BlcnRpZXMuXG4gICAqL1xuICBjb25zdHJ1Y3RvciAoZGVmYXVsdHMgPSB7IH0pIHtcbiAgICB0aGlzLnJhd3MgPSB7IH1cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0cyAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGRlZmF1bHRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ1Bvc3RDU1Mgbm9kZXMgY29uc3RydWN0b3IgYWNjZXB0cyBvYmplY3QsIG5vdCAnICtcbiAgICAgICAgICBKU09OLnN0cmluZ2lmeShkZWZhdWx0cylcbiAgICAgICAgKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBuYW1lIGluIGRlZmF1bHRzKSB7XG4gICAgICB0aGlzW25hbWVdID0gZGVmYXVsdHNbbmFtZV1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIGBDc3NTeW50YXhFcnJvcmAgaW5zdGFuY2UgY29udGFpbmluZyB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICogb2YgdGhlIG5vZGUgaW4gdGhlIHNvdXJjZSwgc2hvd2luZyBsaW5lIGFuZCBjb2x1bW4gbnVtYmVycyBhbmQgYWxzb1xuICAgKiBhIHNtYWxsIGV4Y2VycHQgdG8gZmFjaWxpdGF0ZSBkZWJ1Z2dpbmcuXG4gICAqXG4gICAqIElmIHByZXNlbnQsIGFuIGlucHV0IHNvdXJjZSBtYXAgd2lsbCBiZSB1c2VkIHRvIGdldCB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICogb2YgdGhlIHNvdXJjZSwgZXZlbiBmcm9tIGEgcHJldmlvdXMgY29tcGlsYXRpb24gc3RlcFxuICAgKiAoZS5nLiwgZnJvbSBTYXNzIGNvbXBpbGF0aW9uKS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgcHJvZHVjZXMgdmVyeSB1c2VmdWwgZXJyb3IgbWVzc2FnZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlICAgICBFcnJvciBkZXNjcmlwdGlvbi5cbiAgICogQHBhcmFtIHtvYmplY3R9IFtvcHRzXSAgICAgIE9wdGlvbnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnBsdWdpbiBQbHVnaW4gbmFtZSB0aGF0IGNyZWF0ZWQgdGhpcyBlcnJvci5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCBzZXQgaXQgYXV0b21hdGljYWxseS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIEEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5pbmRleCAgQW4gaW5kZXggaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvci5cbiAgICpcbiAgICogQHJldHVybiB7Q3NzU3ludGF4RXJyb3J9IEVycm9yIG9iamVjdCB0byB0aHJvdyBpdC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaWYgKCF2YXJpYWJsZXNbbmFtZV0pIHtcbiAgICogICB0aHJvdyBkZWNsLmVycm9yKCdVbmtub3duIHZhcmlhYmxlICcgKyBuYW1lLCB7IHdvcmQ6IG5hbWUgfSlcbiAgICogICAvLyBDc3NTeW50YXhFcnJvcjogcG9zdGNzcy12YXJzOmEuc2Fzczo0OjM6IFVua25vd24gdmFyaWFibGUgJGJsYWNrXG4gICAqICAgLy8gICBjb2xvcjogJGJsYWNrXG4gICAqICAgLy8gYVxuICAgKiAgIC8vICAgICAgICAgIF5cbiAgICogICAvLyAgIGJhY2tncm91bmQ6IHdoaXRlXG4gICAqIH1cbiAgICovXG4gIGVycm9yIChtZXNzYWdlLCBvcHRzID0geyB9KSB7XG4gICAgaWYgKHRoaXMuc291cmNlKSB7XG4gICAgICBsZXQgcG9zID0gdGhpcy5wb3NpdGlvbkJ5KG9wdHMpXG4gICAgICByZXR1cm4gdGhpcy5zb3VyY2UuaW5wdXQuZXJyb3IobWVzc2FnZSwgcG9zLmxpbmUsIHBvcy5jb2x1bW4sIG9wdHMpXG4gICAgfVxuICAgIHJldHVybiBuZXcgQ3NzU3ludGF4RXJyb3IobWVzc2FnZSlcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBwcm92aWRlZCBhcyBhIGNvbnZlbmllbmNlIHdyYXBwZXIgZm9yIHtAbGluayBSZXN1bHQjd2Fybn0uXG4gICAqXG4gICAqIEBwYXJhbSB7UmVzdWx0fSByZXN1bHQgICAgICBUaGUge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXQgd2lsbCByZWNlaXZlIHRoZSB3YXJuaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgV2FybmluZyBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gW29wdHNdICAgICAgT3B0aW9uc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gUGx1Z2luIG5hbWUgdGhhdCBjcmVhdGVkIHRoaXMgd2FybmluZy5cbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCBzZXQgaXQgYXV0b21hdGljYWxseS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMud29yZCAgIEEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIHdhcm5pbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICBBbiBpbmRleCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIHdhcm5pbmcuXG4gICAqXG4gICAqIEByZXR1cm4ge1dhcm5pbmd9IENyZWF0ZWQgd2FybmluZyBvYmplY3QuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHBsdWdpbiA9IHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWRlcHJlY2F0ZWQnLCAoKSA9PiB7XG4gICAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICogICAgIHJvb3Qud2Fsa0RlY2xzKCdiYWQnLCBkZWNsID0+IHtcbiAgICogICAgICAgZGVjbC53YXJuKHJlc3VsdCwgJ0RlcHJlY2F0ZWQgcHJvcGVydHkgYmFkJylcbiAgICogICAgIH0pXG4gICAqICAgfVxuICAgKiB9KVxuICAgKi9cbiAgd2FybiAocmVzdWx0LCB0ZXh0LCBvcHRzKSB7XG4gICAgbGV0IGRhdGEgPSB7IG5vZGU6IHRoaXMgfVxuICAgIGZvciAobGV0IGkgaW4gb3B0cykgZGF0YVtpXSA9IG9wdHNbaV1cbiAgICByZXR1cm4gcmVzdWx0Lndhcm4odGV4dCwgZGF0YSlcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW1vdmVzIHRoZSBub2RlIGZyb20gaXRzIHBhcmVudCBhbmQgY2xlYW5zIHRoZSBwYXJlbnQgcHJvcGVydGllc1xuICAgKiBmcm9tIHRoZSBub2RlIGFuZCBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmIChkZWNsLnByb3AubWF0Y2goL14td2Via2l0LS8pKSB7XG4gICAqICAgZGVjbC5yZW1vdmUoKVxuICAgKiB9XG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IE5vZGUgdG8gbWFrZSBjYWxscyBjaGFpbi5cbiAgICovXG4gIHJlbW92ZSAoKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICB0aGlzLnBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKVxuICAgIH1cbiAgICB0aGlzLnBhcmVudCA9IHVuZGVmaW5lZFxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIENTUyBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ2lmaWVyfHN5bnRheH0gW3N0cmluZ2lmaWVyXSBBIHN5bnRheCB0byB1c2VcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gc3RyaW5nIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ30gQ1NTIHN0cmluZyBvZiB0aGlzIG5vZGUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHBvc3Rjc3MucnVsZSh7IHNlbGVjdG9yOiAnYScgfSkudG9TdHJpbmcoKSAvLz0+IFwiYSB7fVwiXG4gICAqL1xuICB0b1N0cmluZyAoc3RyaW5naWZpZXIgPSBzdHJpbmdpZnkpIHtcbiAgICBpZiAoc3RyaW5naWZpZXIuc3RyaW5naWZ5KSBzdHJpbmdpZmllciA9IHN0cmluZ2lmaWVyLnN0cmluZ2lmeVxuICAgIGxldCByZXN1bHQgPSAnJ1xuICAgIHN0cmluZ2lmaWVyKHRoaXMsIGkgPT4ge1xuICAgICAgcmVzdWx0ICs9IGlcbiAgICB9KVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIGFuIGV4YWN0IGNsb25lIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBUaGUgcmVzdWx0aW5nIGNsb25lZCBub2RlIGFuZCBpdHMgKGNsb25lZCkgY2hpbGRyZW4gd2lsbCByZXRhaW5cbiAgICogY29kZSBzdHlsZSBwcm9wZXJ0aWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW292ZXJyaWRlc10gTmV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLnJhd3MuYmVmb3JlICAgIC8vPT4gXCJcXG4gIFwiXG4gICAqIGNvbnN0IGNsb25lZCA9IGRlY2wuY2xvbmUoeyBwcm9wOiAnLW1vei0nICsgZGVjbC5wcm9wIH0pXG4gICAqIGNsb25lZC5yYXdzLmJlZm9yZSAgLy89PiBcIlxcbiAgXCJcbiAgICogY2xvbmVkLnRvU3RyaW5nKCkgICAvLz0+IC1tb3otdHJhbnNmb3JtOiBzY2FsZSgwKVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBDbG9uZSBvZiB0aGUgbm9kZS5cbiAgICovXG4gIGNsb25lIChvdmVycmlkZXMgPSB7IH0pIHtcbiAgICBsZXQgY2xvbmVkID0gY2xvbmVOb2RlKHRoaXMpXG4gICAgZm9yIChsZXQgbmFtZSBpbiBvdmVycmlkZXMpIHtcbiAgICAgIGNsb25lZFtuYW1lXSA9IG92ZXJyaWRlc1tuYW1lXVxuICAgIH1cbiAgICByZXR1cm4gY2xvbmVkXG4gIH1cblxuICAvKipcbiAgICogU2hvcnRjdXQgdG8gY2xvbmUgdGhlIG5vZGUgYW5kIGluc2VydCB0aGUgcmVzdWx0aW5nIGNsb25lZCBub2RlXG4gICAqIGJlZm9yZSB0aGUgY3VycmVudCBub2RlLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gW292ZXJyaWRlc10gTWV3IHByb3BlcnRpZXMgdG8gb3ZlcnJpZGUgaW4gdGhlIGNsb25lLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLmNsb25lQmVmb3JlKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KVxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBOZXcgbm9kZVxuICAgKi9cbiAgY2xvbmVCZWZvcmUgKG92ZXJyaWRlcyA9IHsgfSkge1xuICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcylcbiAgICB0aGlzLnBhcmVudC5pbnNlcnRCZWZvcmUodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBTaG9ydGN1dCB0byBjbG9uZSB0aGUgbm9kZSBhbmQgaW5zZXJ0IHRoZSByZXN1bHRpbmcgY2xvbmVkIG5vZGVcbiAgICogYWZ0ZXIgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IFtvdmVycmlkZXNdIE5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gTmV3IG5vZGUuXG4gICAqL1xuICBjbG9uZUFmdGVyIChvdmVycmlkZXMgPSB7IH0pIHtcbiAgICBsZXQgY2xvbmVkID0gdGhpcy5jbG9uZShvdmVycmlkZXMpXG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgY2xvbmVkKVxuICAgIHJldHVybiBjbG9uZWRcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnRzIG5vZGUocykgYmVmb3JlIHRoZSBjdXJyZW50IG5vZGUgYW5kIHJlbW92ZXMgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICpcbiAgICogQHBhcmFtIHsuLi5Ob2RlfSBub2RlcyBNb2RlKHMpIHRvIHJlcGxhY2UgY3VycmVudCBvbmUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGlmIChhdHJ1bGUubmFtZSA9PT0gJ21peGluJykge1xuICAgKiAgIGF0cnVsZS5yZXBsYWNlV2l0aChtaXhpblJ1bGVzW2F0cnVsZS5wYXJhbXNdKVxuICAgKiB9XG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV9IEN1cnJlbnQgbm9kZSB0byBtZXRob2RzIGNoYWluLlxuICAgKi9cbiAgcmVwbGFjZVdpdGggKC4uLm5vZGVzKSB7XG4gICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBub2RlKVxuICAgICAgfVxuXG4gICAgICB0aGlzLnJlbW92ZSgpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHRoZSBuZXh0IGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyB0aGUgbGFzdCBjaGlsZC5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZXx1bmRlZmluZWR9IE5leHQgbm9kZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogaWYgKGNvbW1lbnQudGV4dCA9PT0gJ2RlbGV0ZSBuZXh0Jykge1xuICAgKiAgIGNvbnN0IG5leHQgPSBjb21tZW50Lm5leHQoKVxuICAgKiAgIGlmIChuZXh0KSB7XG4gICAqICAgICBuZXh0LnJlbW92ZSgpXG4gICAqICAgfVxuICAgKiB9XG4gICAqL1xuICBuZXh0ICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggKyAxXVxuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIHByZXZpb3VzIGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAqIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGN1cnJlbnQgbm9kZSBpcyB0aGUgZmlyc3QgY2hpbGQuXG4gICAqXG4gICAqIEByZXR1cm4ge05vZGV8dW5kZWZpbmVkfSBQcmV2aW91cyBub2RlLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBhbm5vdGF0aW9uID0gZGVjbC5wcmV2KClcbiAgICogaWYgKGFubm90YXRpb24udHlwZSA9PT0gJ2NvbW1lbnQnKSB7XG4gICAqICAgcmVhZEFubm90YXRpb24oYW5ub3RhdGlvbi50ZXh0KVxuICAgKiB9XG4gICAqL1xuICBwcmV2ICgpIHtcbiAgICBpZiAoIXRoaXMucGFyZW50KSByZXR1cm4gdW5kZWZpbmVkXG4gICAgbGV0IGluZGV4ID0gdGhpcy5wYXJlbnQuaW5kZXgodGhpcylcbiAgICByZXR1cm4gdGhpcy5wYXJlbnQubm9kZXNbaW5kZXggLSAxXVxuICB9XG5cbiAgLyoqXG4gICAqIEluc2VydCBuZXcgbm9kZSBiZWZvcmUgY3VycmVudCBub2RlIHRvIGN1cnJlbnQgbm9kZeKAmXMgcGFyZW50LlxuICAgKlxuICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFkZClgLlxuICAgKlxuICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCBOZXcgbm9kZS5cbiAgICpcbiAgICogQHJldHVybiB7Tm9kZX0gVGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBkZWNsLmJlZm9yZSgnY29udGVudDogXCJcIicpXG4gICAqL1xuICBiZWZvcmUgKGFkZCkge1xuICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBhZGQpXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnNlcnQgbmV3IG5vZGUgYWZ0ZXIgY3VycmVudCBub2RlIHRvIGN1cnJlbnQgbm9kZeKAmXMgcGFyZW50LlxuICAgKlxuICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QWZ0ZXIobm9kZSwgYWRkKWAuXG4gICAqXG4gICAqIEBwYXJhbSB7Tm9kZXxvYmplY3R8c3RyaW5nfE5vZGVbXX0gYWRkIE5ldyBub2RlLlxuICAgKlxuICAgKiBAcmV0dXJuIHtOb2RlfSBUaGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGRlY2wuYWZ0ZXIoJ2NvbG9yOiBibGFjaycpXG4gICAqL1xuICBhZnRlciAoYWRkKSB7XG4gICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgYWRkKVxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICB0b0pTT04gKCkge1xuICAgIGxldCBmaXhlZCA9IHsgfVxuXG4gICAgZm9yIChsZXQgbmFtZSBpbiB0aGlzKSB7XG4gICAgICBpZiAoIXRoaXMuaGFzT3duUHJvcGVydHkobmFtZSkpIGNvbnRpbnVlXG4gICAgICBpZiAobmFtZSA9PT0gJ3BhcmVudCcpIGNvbnRpbnVlXG4gICAgICBsZXQgdmFsdWUgPSB0aGlzW25hbWVdXG5cbiAgICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUubWFwKGkgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS50b0pTT04pIHtcbiAgICAgICAgICAgIHJldHVybiBpLnRvSlNPTigpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnRvSlNPTikge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLnRvSlNPTigpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpeGVkXG4gIH1cblxuICAvKipcbiAgICogUmV0dXJucyBhIHtAbGluayBOb2RlI3Jhd3N9IHZhbHVlLiBJZiB0aGUgbm9kZSBpcyBtaXNzaW5nXG4gICAqIHRoZSBjb2RlIHN0eWxlIHByb3BlcnR5IChiZWNhdXNlIHRoZSBub2RlIHdhcyBtYW51YWxseSBidWlsdCBvciBjbG9uZWQpLFxuICAgKiBQb3N0Q1NTIHdpbGwgdHJ5IHRvIGF1dG9kZXRlY3QgdGhlIGNvZGUgc3R5bGUgcHJvcGVydHkgYnkgbG9va2luZ1xuICAgKiBhdCBvdGhlciBub2RlcyBpbiB0aGUgdHJlZS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgICAgICAgICAgTmFtZSBvZiBjb2RlIHN0eWxlIHByb3BlcnR5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW2RlZmF1bHRUeXBlXSBOYW1lIG9mIGRlZmF1bHQgdmFsdWUsIGl0IGNhbiBiZSBtaXNzZWRcbiAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhlIHZhbHVlIGlzIHRoZSBzYW1lIGFzIHByb3AuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgYmFja2dyb3VuZDogd2hpdGUgfScpXG4gICAqIHJvb3Qubm9kZXNbMF0uYXBwZW5kKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSlcbiAgICogcm9vdC5ub2Rlc1swXS5ub2Rlc1sxXS5yYXdzLmJlZm9yZSAgIC8vPT4gdW5kZWZpbmVkXG4gICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3KCdiZWZvcmUnKSAvLz0+ICcgJ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9IENvZGUgc3R5bGUgdmFsdWUuXG4gICAqL1xuICByYXcgKHByb3AsIGRlZmF1bHRUeXBlKSB7XG4gICAgbGV0IHN0ciA9IG5ldyBTdHJpbmdpZmllcigpXG4gICAgcmV0dXJuIHN0ci5yYXcodGhpcywgcHJvcCwgZGVmYXVsdFR5cGUpXG4gIH1cblxuICAvKipcbiAgICogRmluZHMgdGhlIFJvb3QgaW5zdGFuY2Ugb2YgdGhlIG5vZGXigJlzIHRyZWUuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMF0ucm9vdCgpID09PSByb290XG4gICAqXG4gICAqIEByZXR1cm4ge1Jvb3R9IFJvb3QgcGFyZW50LlxuICAgKi9cbiAgcm9vdCAoKSB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXNcbiAgICB3aGlsZSAocmVzdWx0LnBhcmVudCkgcmVzdWx0ID0gcmVzdWx0LnBhcmVudFxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciB0aGUgY29kZSBzdHlsZSBwcm9wZXJ0aWVzIGZvciB0aGUgbm9kZSBhbmQgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtrZWVwQmV0d2Vlbl0gS2VlcCB0aGUgcmF3cy5iZXR3ZWVuIHN5bWJvbHMuXG4gICAqXG4gICAqIEByZXR1cm4ge3VuZGVmaW5lZH1cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogbm9kZS5yYXdzLmJlZm9yZSAgLy89PiAnICdcbiAgICogbm9kZS5jbGVhblJhd3MoKVxuICAgKiBub2RlLnJhd3MuYmVmb3JlICAvLz0+IHVuZGVmaW5lZFxuICAgKi9cbiAgY2xlYW5SYXdzIChrZWVwQmV0d2Vlbikge1xuICAgIGRlbGV0ZSB0aGlzLnJhd3MuYmVmb3JlXG4gICAgZGVsZXRlIHRoaXMucmF3cy5hZnRlclxuICAgIGlmICgha2VlcEJldHdlZW4pIGRlbGV0ZSB0aGlzLnJhd3MuYmV0d2VlblxuICB9XG5cbiAgcG9zaXRpb25JbnNpZGUgKGluZGV4KSB7XG4gICAgbGV0IHN0cmluZyA9IHRoaXMudG9TdHJpbmcoKVxuICAgIGxldCBjb2x1bW4gPSB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW5cbiAgICBsZXQgbGluZSA9IHRoaXMuc291cmNlLnN0YXJ0LmxpbmVcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXg7IGkrKykge1xuICAgICAgaWYgKHN0cmluZ1tpXSA9PT0gJ1xcbicpIHtcbiAgICAgICAgY29sdW1uID0gMVxuICAgICAgICBsaW5lICs9IDFcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbHVtbiArPSAxXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHsgbGluZSwgY29sdW1uIH1cbiAgfVxuXG4gIHBvc2l0aW9uQnkgKG9wdHMpIHtcbiAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnRcbiAgICBpZiAob3B0cy5pbmRleCkge1xuICAgICAgcG9zID0gdGhpcy5wb3NpdGlvbkluc2lkZShvcHRzLmluZGV4KVxuICAgIH0gZWxzZSBpZiAob3B0cy53b3JkKSB7XG4gICAgICBsZXQgaW5kZXggPSB0aGlzLnRvU3RyaW5nKCkuaW5kZXhPZihvcHRzLndvcmQpXG4gICAgICBpZiAoaW5kZXggIT09IC0xKSBwb3MgPSB0aGlzLnBvc2l0aW9uSW5zaWRlKGluZGV4KVxuICAgIH1cbiAgICByZXR1cm4gcG9zXG4gIH1cblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAqIEBtZW1iZXIge3N0cmluZ30gdHlwZSBTdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBub2Rl4oCZcyB0eXBlLlxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgUG9zc2libGUgdmFsdWVzIGFyZSBgcm9vdGAsIGBhdHJ1bGVgLCBgcnVsZWAsXG4gICAqICAgICAgICAgICAgICAgICAgICAgICBgZGVjbGAsIG9yIGBjb21tZW50YC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkudHlwZSAvLz0+ICdkZWNsJ1xuICAgKi9cblxuICAvKipcbiAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAqIEBtZW1iZXIge0NvbnRhaW5lcn0gcGFyZW50IFRoZSBub2Rl4oCZcyBwYXJlbnQgbm9kZS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogcm9vdC5ub2Rlc1swXS5wYXJlbnQgPT09IHJvb3RcbiAgICovXG5cbiAgLyoqXG4gICAqIEBtZW1iZXJvZiBOb2RlI1xuICAgKiBAbWVtYmVyIHtzb3VyY2V9IHNvdXJjZSBUaGUgaW5wdXQgc291cmNlIG9mIHRoZSBub2RlLlxuICAgKlxuICAgKiBUaGUgcHJvcGVydHkgaXMgdXNlZCBpbiBzb3VyY2UgbWFwIGdlbmVyYXRpb24uXG4gICAqXG4gICAqIElmIHlvdSBjcmVhdGUgYSBub2RlIG1hbnVhbGx5IChlLmcuLCB3aXRoIGBwb3N0Y3NzLmRlY2woKWApLFxuICAgKiB0aGF0IG5vZGUgd2lsbCBub3QgaGF2ZSBhIGBzb3VyY2VgIHByb3BlcnR5IGFuZCB3aWxsIGJlIGFic2VudFxuICAgKiBmcm9tIHRoZSBzb3VyY2UgbWFwLiBGb3IgdGhpcyByZWFzb24sIHRoZSBwbHVnaW4gZGV2ZWxvcGVyIHNob3VsZFxuICAgKiBjb25zaWRlciBjbG9uaW5nIG5vZGVzIHRvIGNyZWF0ZSBuZXcgb25lcyAoaW4gd2hpY2ggY2FzZSB0aGUgbmV3IG5vZGXigJlzXG4gICAqIHNvdXJjZSB3aWxsIHJlZmVyZW5jZSB0aGUgb3JpZ2luYWwsIGNsb25lZCBub2RlKSBvciBzZXR0aW5nXG4gICAqIHRoZSBgc291cmNlYCBwcm9wZXJ0eSBtYW51YWxseS5cbiAgICpcbiAgICogYGBganNcbiAgICogLy8gQmFkXG4gICAqIGNvbnN0IHByZWZpeGVkID0gcG9zdGNzcy5kZWNsKHtcbiAgICogICBwcm9wOiAnLW1vei0nICsgZGVjbC5wcm9wLFxuICAgKiAgIHZhbHVlOiBkZWNsLnZhbHVlXG4gICAqIH0pXG4gICAqXG4gICAqIC8vIEdvb2RcbiAgICogY29uc3QgcHJlZml4ZWQgPSBkZWNsLmNsb25lKHsgcHJvcDogJy1tb3otJyArIGRlY2wucHJvcCB9KVxuICAgKiBgYGBcbiAgICpcbiAgICogYGBganNcbiAgICogaWYgKGF0cnVsZS5uYW1lID09PSAnYWRkLWxpbmsnKSB7XG4gICAqICAgY29uc3QgcnVsZSA9IHBvc3Rjc3MucnVsZSh7IHNlbGVjdG9yOiAnYScsIHNvdXJjZTogYXRydWxlLnNvdXJjZSB9KVxuICAgKiAgIGF0cnVsZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKGF0cnVsZSwgcnVsZSlcbiAgICogfVxuICAgKiBgYGBcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogZGVjbC5zb3VyY2UuaW5wdXQuZnJvbSAvLz0+ICcvaG9tZS9haS9hLnNhc3MnXG4gICAqIGRlY2wuc291cmNlLnN0YXJ0ICAgICAgLy89PiB7IGxpbmU6IDEwLCBjb2x1bW46IDIgfVxuICAgKiBkZWNsLnNvdXJjZS5lbmQgICAgICAgIC8vPT4geyBsaW5lOiAxMCwgY29sdW1uOiAxMiB9XG4gICAqL1xuXG4gIC8qKlxuICAgKiBAbWVtYmVyb2YgTm9kZSNcbiAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgKiAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAqXG4gICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAqXG4gICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBub2RlXG4gICAqICAgdG8gdGhlIGVuZCBvZiB0aGUgbm9kZS5cbiAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgKiAgIGZvciBkZWNsYXJhdGlvbnMsIHNlbGVjdG9yIGFuZCBge2AgZm9yIHJ1bGVzLCBvciBsYXN0IHBhcmFtZXRlclxuICAgKiAgIGFuZCBge2AgZm9yIGF0LXJ1bGVzLlxuICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyB0cnVlIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgKiAqIGBhZnRlck5hbWVgOiB0aGUgc3BhY2UgYmV0d2VlbiB0aGUgYXQtcnVsZSBuYW1lIGFuZCBpdHMgcGFyYW1ldGVycy5cbiAgICogKiBgbGVmdGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gYC8qYCBhbmQgdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAqICogYHJpZ2h0YDogdGhlIHNwYWNlIHN5bWJvbHMgYmV0d2VlbiB0aGUgY29tbWVudOKAmXMgdGV4dFxuICAgKiAgIGFuZCA8Y29kZT4qJiM0Nzs8L2NvZGU+LlxuICAgKiAqIGBpbXBvcnRhbnRgOiB0aGUgY29udGVudCBvZiB0aGUgaW1wb3J0YW50IHN0YXRlbWVudCxcbiAgICogICBpZiBpdCBpcyBub3QganVzdCBgIWltcG9ydGFudGAuXG4gICAqXG4gICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycywgZGVjbGFyYXRpb24gdmFsdWVzIGFuZCBhdC1ydWxlIHBhcmFtZXRlcnNcbiAgICogZnJvbSBjb21tZW50cyBhbmQgZXh0cmEgc3BhY2VzLCBidXQgaXQgc3RvcmVzIG9yaWdpbiBjb250ZW50IGluIHJhd3NcbiAgICogcHJvcGVydGllcy4gQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICogcm9vdC5maXJzdC5maXJzdC5yYXdzIC8vPT4geyBiZWZvcmU6ICdcXG4gICcsIGJldHdlZW46ICc6JyB9XG4gICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gcG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lICAgU291cmNlIGxpbmUgaW4gZmlsZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb2x1bW4gU291cmNlIGNvbHVtbiBpbiBmaWxlLlxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gc291cmNlXG4gKiBAcHJvcGVydHkge0lucHV0fSBpbnB1dCAgICB7QGxpbmsgSW5wdXR9IHdpdGggaW5wdXQgZmlsZVxuICogQHByb3BlcnR5IHtwb3NpdGlvbn0gc3RhcnQgVGhlIHN0YXJ0aW5nIHBvc2l0aW9uIG9mIHRoZSBub2Rl4oCZcyBzb3VyY2UuXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBlbmQgICBUaGUgZW5kaW5nIHBvc2l0aW9uIG9mIHRoZSBub2Rl4oCZcyBzb3VyY2UuXG4gKi9cbiJdLCJmaWxlIjoibm9kZS5qcyJ9
