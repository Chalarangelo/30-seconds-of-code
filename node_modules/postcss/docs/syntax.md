# How to Write Custom Syntax

PostCSS can transform styles in any syntax, and is not limited to just CSS.
By writing a custom syntax, you can transform styles in any desired format.

Writing a custom syntax is much harder than writing a PostCSS plugin, but
it is an awesome adventure.

There are 3 types of PostCSS syntax packages:

* **Parser** to parse input string to node’s tree.
* **Stringifier** to generate output string by node’s tree.
* **Syntax** contains both parser and stringifier.

## Syntax

A good example of a custom syntax is [SCSS]. Some users may want to transform
SCSS sources with PostCSS plugins, for example if they need to add vendor
prefixes or change the property order. So this syntax should output SCSS from
an SCSS input.

The syntax API is a very simple plain object, with `parse` & `stringify`
functions:

```js
module.exports = {
  parse:     require('./parse'),
  stringify: require('./stringify')
}
```

[SCSS]: https://github.com/postcss/postcss-scss

## Parser

A good example of a parser is [Safe Parser], which parses malformed/broken CSS.
Because there is no point to generate broken output, this package only provides
a parser.

The parser API is a function which receives a string & returns a [`Root`] node.
The second argument is a function which receives an object with PostCSS options.

```js
const postcss = require('postcss')

module.exports = function parse (css, opts) {
  const root = postcss.root()
  // Add other nodes to root
  return root
}
```

[Safe Parser]: https://github.com/postcss/postcss-safe-parser
[`Root`]:      http://api.postcss.org/Root.html

### Main Theory

There are many books about parsers; but do not worry because CSS syntax is
very easy, and so the parser will be much simpler than a programming language
parser.

The default PostCSS parser contains two steps:

1. [Tokenizer] which reads input string character by character and builds a
  tokens array. For example, it joins space symbols to a `['space', '\n  ']`
  token, and detects strings to a `['string', '"\"{"']` token.
2. [Parser] which reads the tokens array, creates node instances and
  builds a tree.

[Tokenizer]: https://github.com/postcss/postcss/blob/master/lib/tokenize.es6
[Parser]:    https://github.com/postcss/postcss/blob/master/lib/parser.es6

### Performance

Parsing input is often the most time consuming task in CSS processors. So it
is very important to have a fast parser.

The main rule of optimization is that there is no performance without a
benchmark. You can look at [PostCSS benchmarks] to build your own.

Of parsing tasks, the tokenize step will often take the most time, so its
performance should be prioritized. Unfortunately, classes, functions and
high level structures can slow down your tokenizer. Be ready to write dirty
code with repeated statements. This is why it is difficult to extend the
default [PostCSS tokenizer]; copy & paste will be a necessary evil.

Second optimization is using character codes instead of strings.

```js
// Slow
string[i] === '{'

// Fast
const OPEN_CURLY = 123 // `{'
string.charCodeAt(i) === OPEN_CURLY
```

Third optimization is “fast jumps”. If you find open quotes, you can find
next closing quote much faster by `indexOf`:

```js
// Simple jump
next = string.indexOf('"', currentPosition + 1)

// Jump by RegExp
regexp.lastIndex = currentPosion + 1
regexp.test(string)
next = regexp.lastIndex
```

The parser can be a well written class. There is no need in copy-paste and
hardcore optimization there. You can extend the default [PostCSS parser].

[PostCSS benchmarks]: https://github.com/postcss/benchmark
[PostCSS tokenizer]:  https://github.com/postcss/postcss/blob/master/lib/tokenize.es6
[PostCSS parser]:     https://github.com/postcss/postcss/blob/master/lib/parser.es6

### Node Source

Every node should have `source` property to generate correct source map.
This property contains `start` and `end` properties with `{ line, column }`,
and `input` property with an [`Input`] instance.

Your tokenizer should save the original position so that you can propagate
the values to the parser, to ensure that the source map is correctly updated.

[`Input`]: https://github.com/postcss/postcss/blob/master/lib/input.es6

### Raw Values

A good PostCSS parser should provide all information (including spaces symbols)
to generate byte-to-byte equal output. It is not so difficult, but respectful
for user input and allow integration smoke tests.

A parser should save all additional symbols to `node.raws` object.
It is an open structure for you, you can add additional keys.
For example, [SCSS parser] saves comment types (`/* */` or `//`)
in `node.raws.inline`.

The default parser cleans CSS values from comments and spaces.
It saves the original value with comments to `node.raws.value.raw` and uses it,
if the node value was not changed.

[SCSS parser]: https://github.com/postcss/postcss-scss

### Tests

Of course, all parsers in the PostCSS ecosystem must have tests.

If your parser just extends CSS syntax (like [SCSS] or [Safe Parser]),
you can use the [PostCSS Parser Tests]. It contains unit & integration tests.

[PostCSS Parser Tests]: https://github.com/postcss/postcss-parser-tests

## Stringifier

A style guide generator is a good example of a stringifier. It generates output
HTML which contains CSS components. For this use case, a parser isn't necessary,
so the package should just contain a stringifier.

The Stringifier API is little bit more complicated, than the parser API.
PostCSS generates a source map, so a stringifier can’t just return a string.
It must link every substring with its source node.

A Stringifier is a function which receives [`Root`] node and builder callback.
Then it calls builder with every node’s string and node instance.

```js
module.exports = function stringify (root, builder) {
  // Some magic
  const string = decl.prop + ':' + decl.value + ';'
  builder(string, decl)
  // Some science
};
```

### Main Theory

PostCSS [default stringifier] is just a class with a method for each node type
and many methods to detect raw properties.

In most cases it will be enough just to extend this class,
like in [SCSS stringifier].

[default stringifier]: https://github.com/postcss/postcss/blob/master/lib/stringifier.es6
[SCSS stringifier]:    https://github.com/postcss/postcss-scss/blob/master/lib/scss-stringifier.es6

### Builder Function

A builder function will be passed to `stringify` function as second argument.
For example, the default PostCSS stringifier class saves it
to `this.builder` property.

Builder receives output substring and source node to append this substring
to the final output.

Some nodes contain other nodes in the middle. For example, a rule has a `{`
at the beginning, many declarations inside and a closing `}`.

For these cases, you should pass a third argument to builder function:
`'start'` or `'end'` string:

```js
this.builder(rule.selector + '{', rule, 'start')
// Stringify declarations inside
this.builder('}', rule, 'end')
```

### Raw Values

A good PostCSS custom syntax saves all symbols and provide byte-to-byte equal
output if there were no changes.

This is why every node has `node.raws` object to store space symbol, etc.

Be careful, because sometimes these raw properties will not be present; some
nodes may be built manually, or may lose their indentation when they are moved
to another parent node.

This is why the default stringifier has a `raw()` method to autodetect raw
properties by other nodes. For example, it will look at other nodes to detect
indent size and them multiply it with the current node depth.

### Tests

A stringifier must have tests too.

You can use unit and integration test cases from [PostCSS Parser Tests].
Just compare input CSS with CSS after your parser and stringifier.

[PostCSS Parser Tests]: https://github.com/postcss/postcss-parser-tests
