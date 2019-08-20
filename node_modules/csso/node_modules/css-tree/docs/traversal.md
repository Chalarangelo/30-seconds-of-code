# AST traversal

AST traversal API is provided by `walk()` method.

```js
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; }');

csstree.walk(ast, function(node) {
    console.log(node.type);
});
// StyleSheet
// Rule
// SelectorList
// Selector
// ClassSelector
// Block
// Declaration
// Value
// Identifier
```

The facts you should know about `walk()` internals:

- Method uses `structure` field value of every node type to define the way how to iterate the nodes:
    - A function-iterator is generating for every node type.
    - Node's properties iterates in the order it defined in `structure` ([reverse](#reverse) option can invert an order).
    - Properties that are not defined in `structure` are ignoring (doesn't interate).
    - An exception is possible when a tree is not following to expected structure (it may happen if AST was built outside the CSSTree parser or transformed in a wrong way). In case you are not sure about correctness of a tree structure, you can use `try/catch` or check the tree with `csstree.lexer.validateStructure(ast)` before iterate it.
- Only `children` fields can contain a list of nodes. A list of nodes should be represented as a `List` instances. But for certain cases, `children` can be an array. Since `List` provides a similar to `Array` API, traversal can work in most cases, but without any guarantee. Therefore usings arrays in AST is not recomended, use them on your own risk.

## walk(ast, options)

Method visits each node of passed tree in a natural way and calls a handler for each one. It takes two arguments: a root node (`ast`) and an object (`options`). In simple case, it can take a function (handler) instead of `options` (`walk(ast, fn)` is equivalent to `walk(ast, { enter: fn })`).

Options:

<!-- MarkdownTOC -->

- [enter](#enter)
- [leave](#leave)
- [visit](#visit)
- [reverse](#reverse)

<!-- /MarkdownTOC -->

### enter

Type: `function` or `undefined`  
Default: `undefined`

Handler on node entrance, i.e. before any nested node is processed.

```js
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; }');

csstree.walk(ast, {
    enter: function(node) {
        console.log(node.type);
    }
});
// StyleSheet
// Rule
// SelectorList
// Selector
// ClassSelector
// Block
// Declaration
// Value
// Identifier
```

In case `options` has a single `enter` field, it can replaced for the handler passed as a value for `enter`, i.e. `walk(ast, { enter: fn })` → `walk(ast, fn)`.

Handler receives a three arguments:
- `node` – the AST node a walker entering to
- `item` – node wrapper, that contains references to `prev` and `next` nodes in a list, and `data` reference for the node
- `list` – is a reference for the list; it's useful for list operations like `remove()` or `insert()`

> NOTE: If `children` is an array, the last two arguments are `index` and `array`, like for `Array#forEach()` or `Array#map()` methods.

```js
const csstree = require('css-tree');
const ast = csstree.parse(`
    .a { foo: 1; bar: 2; }
    .b { bar: 3; baz: 4; }
`);

// remove declarations with `bar` property from the tree
csstree.walk(ast, function(node, item, list) {
    if (node.type === 'Declaration' && node.property === 'bar' && list) {
        // remove a declaration from a list it
        list.remove(item);
    }
});

console.log(csstree.generate(ast));
// .a{foo:1}.b{baz:4}
```

> NOTE:
> - `item` and `list` are not defined for nodes that are not in a list. Even `Declaration` can be outside of any list in case it is a root of tree or a part of `@supports` prelude, e.g. `@supports (bar: 123) { ... }`. Therefore, it's recomended to check `item` or `list` are defined before using of it (those values both are defined or both are undefined, so it's enough to test one of them)
> - Only `List` instances are safe for tree transformations such as node removal. In case you perform such operations, you can ensure that all `children` in a tree is a `List` instances by calling `csstree.fromPlainObject(ast)` before traversal.
> - It's better to use `visit` option when possible to reach better performance

Context (`this`) for a handler is an object with a references to the closest ancestor nodes:

- `root` – refers to AST root node (actually it's a node passed to `walk()` method)
- `stylesheet` – refers to `StyleSheet` node, usually it's a root node
- `atrule` – refers to closest `Atrule` node if any
- `atrulePrelude` – refers to `AtrulePrelude` node if any
- `rule` – refers to closest `Rule` node if any
- `selector` – refers to `SelectorList` node if any
- `block` - refers to closest `Block` node if any
- `declaration` – refers to `Declaration` node if any
- `function` – refers to closest `Function`, `PseudoClassSelector` or `PseudoElementSelector` node if current node inside one of them

```js
const csstree = require('css-tree');
const ast = csstree.parse(`
    @import url(import.css);
    .foo { background: url('foo.jpg'); }
    .bar { background-image: url(bar.png); }
`);

// collect all urls in declarations
const urls = [];
csstree.walk(ast, function(node) {
    if (this.declaration !== null && node.type === 'Url') {
        const value = node.value;

        if (value.type === 'Raw') {
            urls.push(value.value);
        } else {
            urls.push(value.value.substr(1, value.value.length - 2));
        }
    }
});

console.log(urls);
// [ 'foo.jpg', 'bar.png' ]
```

### leave

Type: `function` or `undefined`  
Default: `undefined`

The same as `enter` handler but invokes on node exit, i.e. after all nested nodes are processed.

```js
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; }');

csstree.walk(ast, {
    leave: function(node) {
        console.log(node.type);
    }
});
// ClassSelector
// Selector
// SelectorList
// Identifier
// Value
// Declaration
// Block
// Rule
// StyleSheet
```

### visit

Type: `string` or `null`  
Default: `null`

Invokes a handler for a specified node type only.

```js
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; } .b { color: green; }');

csstree.walk(ast, {
    visit: 'ClassSelector',
    enter: function(node) {
        console.log(node.name);
    }
});

// example above is equal to
csstree.walk(ast, {
    enter: function(node) {
        if (node.type === 'ClassSelector') {
            console.log(node.name);
        }
    }
});
```

The traveral for some node types can performs faster (10-15 times depending on the CSS structure), because some subtrees may to be skipped since they can't contain a node of specified type (e.g. `Rule` can't be used inside of `Declaration`, so declaration's subtree can be exclude from traversal path). Fast traversal is supported for node types:

- `Atrule`
- `Rule`
- `Declaration`

> NOTE: When fast traversal is applied, some nodes may not be reached in case of an incorrect location in the tree. That's may happen if AST was built outside the CSSTree parser or transformed in a wrong way. If you need to be 100% sure that every node of type will be visited (even in wrong position), don't use `visit` option and test node type by your own.

### reverse

Type: `boolean`  
Default: `false`

Inverts a natural order of traversal of nodes. To achieve this, the following actions are performed:
- children nodes are iterated in reverse order (from last to first)
- properties are iterated in reverse order (according to `structure` definition of node)
- `enter` and `leave` handlers are swapped

```js
var assert = require('assert');
var csstree = require('css-tree');
var ast = csstree.parse('.a { color: red; }');

var natural = [];
csstree.walk(ast, {
    enter: function(node) {
        natural.push('enter ' + node.type);
    },
    leave: function(node) {
        natural.push('leave ' + node.type);
    }
});

var reverse = [];
csstree.walk(ast, {
    reverse: true,
    enter: function(node) {
        reverse.push('enter ' + node.type);
    },
    leave: function(node) {
        reverse.push('leave ' + node.type);
    }
});

// will be truthy
assert.deepEqual(
    reverse,
    natural.reverse()
);
```
