# Translate AST to string

## generate(ast[, options])

Generates a CSS string for given AST.

```js
// generate with default settings
csstree.generate(ast);

// generate with options
csstree.generate(ast, {
    sourceMap: true
});
```

Options (optional):

<!-- MarkdownTOC -->

- [sourceMap](#sourcemap)
- [decorator](#decorator)

<!-- /MarkdownTOC -->

### sourceMap

Type: `boolean`  
Default: `false`

Generates a source map (nodes should contain positions in `loc` property). Note, that an object instead of string is returned in that case.

```js
var ast = csstree.parse('.test { color: red }', {
    filename: 'my.css',
    positions: true
});

var result = csstree.generate(ast, { sourceMap: true });
// { css: '.test{color:red}', map: SourceMapGenerator {} }
```

### decorator

Type: `function`  
Default: none

A function that a handlers used by a generator. TBD
