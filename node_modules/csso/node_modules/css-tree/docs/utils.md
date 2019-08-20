# Utils to work with AST

<!-- MarkdownTOC -->

- [property\(name\)](#propertyname)
- [keyword\(name\)](#keywordname)
- [clone\(ast\)](#cloneast)
- [fromPlainObject\(object\)](#fromplainobjectobject)
- [toPlainObject\(ast\)](#toplainobjectast)

<!-- /MarkdownTOC -->

## property(name)

Returns details for a property name, such as vendor prefix, used hack etc. Using for safe test of declaration property names, i.e. `Declaration.property`.

```js
var csstree = require('css-tree');

csstree.property('*-vendor-property');
// {
//     basename: 'property',
//     name: '-vendor-property',
//     hack: '*',
//     vendor: '-vendor-',
//     prefix: '*-vendor-',
//     custom: false
// }

csstree.property('--test-var');
// {
//     basename: '--test-var',
//     name: '--test-var',
//     hack: '',
//     vendor: '',
//     prefix: '',
//     custom: true
// };
```

`property()` function normalizes a name to lower case, except custom property names since they are case sensitive. It returns the same immutable (freezed) object for the same input (input after normalization).

```js
csstree.property('name') === csstree.property('NAME')         // true
csstree.property('NAME').name === 'name'                      // true
csstree.property('--custom') === csstree.property('--Custom') // false

var info = csstree.property('NAME');
info.name === 'name'; // 
info.name = 'foo';    // have no effect
info.name === 'name'; // true
```

Supported hacks:

- `_` in the beginning
- `+` in the beginning
- `#` in the beginning
- `*` in the beginning
- `$` in the beginning
- `/` in the beginning
- `//` in the beginning

## keyword(name)

Mostly the same as `property()` function, but without hack detection. Using for any identifier except declaration property name.

```js
var csstree = require('css-tree');

csstree.keyword('-vendor-keyword');
// {
//     basename: 'keyword',
//     name: '-vendor-keyword',
//     vendor: '-vendor-',
//     prefix: '-vendor-',
//     custom: false
// };
```

## clone(ast)

Make AST deep copy.

```js
var orig = csstree.parse('.test { color: red }');
var copy = csstree.clone(orig);

csstree.walk(copy, function(node) {
    if (node.type === 'Class') {
        node.name = 'replaced';
    }
});

console.log(csstree.generate(orig));
// .test{color:red}
console.log(csstree.generate(copy));
// .replaced{color:red}
```

## fromPlainObject(object)

`fromPlainObject()` walks through AST and coverts each `children` value into a `List` instance when value is an array.

```js
var csstree = require('css-tree');
var ast = {
    type: 'SelectorList',
    children: []
};

console.log(Array.isArray(ast.children));          // true
console.log(ast.children instanceof csstree.List); // false

ast = csstree.fromPlainObject(ast);

console.log(Array.isArray(ast.children));          // false
console.log(ast.children instanceof csstree.List); // true
```

Function mutates the passed AST. Use `clone()` function before passing AST to `fromPlainObject()` in case you want to avoid original tree mutation.

```js
astClone = csstree.fromPlainObject(csstree.clone(ast));
```

## toPlainObject(ast)

`fromPlainObject()` walks through AST and coverts each `children` value to regular array when value is a `List` instance.

```js
var csstree = require('css-tree');
var ast = {
    type: 'SelectorList',
    children: new List()
};

console.log(Array.isArray(ast.children));          // false
console.log(ast.children instanceof csstree.List); // true

ast = csstree.toPlainObject(ast);

console.log(Array.isArray(ast.children));          // true
console.log(ast.children instanceof csstree.List); // false
```

Function mutates the passed AST. Use `clone()` function before passing AST to `toPlainObject()` in case you want to avoid original tree mutation.

```js
ast = csstree.toPlainObject(csstree.clone(ast));
```
