# Parsing CSS into AST

> NOTE: Currenly parser omits redundant separators, spaces and comments (except exclamation comments, i.e. `/*! comment */`) on AST build.

## parse(source[, options])

Parses CSS into AST.

```js
// simple parsing with no options
var ast = csstree.parse('.example { color: red }');

// parse with options
var ast = csstree.parse('.foo.bar', {
    context: 'selector',
    positions: true
});
```

Options (optional):

<!-- MarkdownTOC -->

- [context](#context)
- [atrule](#atrule)
- [positions](#positions)
- [onParseError](#onparseerror)
- [filename](#filename)
- [offset](#offset)
- [line](#line)
- [column](#column)
- [parseAtrulePrelude](#parseatruleprelude)
- [parseRulePrelude](#parseruleprelude)
- [parseValue](#parsevalue)
- [parseCustomProperty](#parsecustomproperty)

<!-- /MarkdownTOC -->

### context

Type: `string`  
Default: `'stylesheet'`

Defines what part of CSS is parsing.

Contexts:

- `stylesheet` (default) – regular stylesheet, should be suitable in most cases
- `atrule` – at-rule (e.g. `@media screen, print { ... }`)
- `atrulePrelude` – at-rule prelude (`screen, print` for example above)
- `mediaQueryList` – used to parse comma separated media query list
- `mediaQuery` – used to parse media query
- `rule` – rule (e.g. `.foo, .bar:hover { color: red; border: 1px solid black; }`)
- `selectorList` – selector group (`.foo, .bar:hover` for rule example)
- `selector` – selector (`.foo` or `.bar:hover` for rule example)
- `block` – block with curly braces (`{ color: red; border: 1px solid black; }` for rule example)
- `declarationList` – block content w/o curly braces (`color: red; border: 1px solid black;` for rule example), useful for parsing HTML `style` attribute value
- `declaration` – declaration (`color: red` or `border: 1px solid black` for rule example)
- `value` – declaration value (`red` or `1px solid black` for rule example)

### atrule

Type: `string` or `null`  
Default: `null`

Using for `atrulePrelude` context to apply atrule specific parse rules.

### positions

Type: `boolean`  
Default: `false`

Specify to store locations of node content in original source. Location is storing as `loc` field of nodes. `loc` property is always `null` when option is `false`. The structure of `loc`:

```
loc: {
    source: 'value of `filename` option or `<unknown>`',
    start: {
        offset: <number>,
        line: <number>,
        column: <number>
    },
    end: {
        offset: <number>,
        line: <number>,
        column: <number>
    }
}
```

### onParseError

Type: `function(error, fallbackNode)` or `null`  
Default: `null`

Parsing is tolerant by default, i.e. any text may to be parsed with no an raised exception. However, mistakes in CSS may make it imposible to parse some part, e.g. a selector or declaration. In that case bad content is wrapping into a `Raw` node and `onParseError` is invoking.

```js
csstree.parse('example { foo; bar: 1! }', {
    onParseError: function(error) {
        console.log(error.formattedMessage);
    }
});
// Parse error: Colon is expected
//     1 |example { foo; bar: 1! }
// --------------------^
// Parse error: Identifier is expected
//     1 |example { foo; bar: 1! }
// ------------------------------^
```

### filename

Type: `string`  
Default: `'<unknown>'`

Filename of source. This value adds to `loc` as `source` property when `positions` option is `true`. Using for source map generation.

### offset

Type: `number`  
Default: `0`

Start offset. Useful when parsing a fragment of CSS to store a correct positions for node's `loc` property.

### line

Type: `number`  
Default: `1`

Start line number. Useful when parsing fragment of CSS to store correct positions in node's `loc` property.

### column

Type: `number`  
Default: `1`

Start column number. Useful when parsing fragment of CSS to store correct positions in node's `loc` property.

### parseAtrulePrelude

Type: `boolean`  
Default: `true`

Defines to parse a at-rule prelude in details (represents as `AtruleExpresion`, `MediaQueryList` or `SelectorList` if any). Otherwise represents prelude as `Raw` node.

```js
csstree.parse('@example 1 2;');
// {
//     "type": "Atrule",
//     "prelude": {
//         "type": "AtrulePrelude",
//         "children": [
//             { "type": "Number", "value": "1" },
//             { "type": "WhiteSpace", "value": " " },
//             { "type": "Number", "value": "2" }
//         ]
//     },
//     "block": null
// }

csstree.parse('@example 1 2;', { parseAtrulePrelude: false });
// {
//     "type": "Atrule",
//     "prelude": {
//         "type": "Raw",
//         "value": "1 2"
//     },
//     "block": null
// }
```

### parseRulePrelude

Type: `boolean`  
Default: `true`

Defines to parse a rule prelude in details or left unparsed (represents as `Raw` node).

```js
csstree.parse('.foo {}');
// {
//     "type": "Rule",
//     "prelude": {
//         "type": "SelectorList",
//         "children": [
//             {
//                 "type": "Selector",
//                 "children": [
//                     { "type": "ClassSelector", "name": "foo" }
//                 ]
//             }
//         ]
//     },
//     "block": {
//         "type": "Block",
//         "children": []
//     }
// }

csstree.parse('.foo {}', { parseRulePrelude: false });
// {
//     "type": "Rule",
//     "prelude": {
//         "type": "Raw",
//         "value": ".foo"
//     },
//     "block": {
//         "type": "Block",
//         "children": []
//     }
// }
```

### parseValue

Type: `boolean`  
Default: `true`

Defines to parse a declaration value in details (represents as `Value`). Otherwise represents value as `Raw` node.

```js
csstree.parse('color: #aabbcc', { context: 'declaration' });
// {
//     "type": "Declaration",
//     "important": false,
//     "property": "color",
//     "value": {
//         "type": "Value",
//         "children": [
//             {
//                 "type": "HexColor",
//                 "value": "aabbcc"
//             }
//         ]
//     }
// }

csstree.parse('color: #aabbcc', { context: 'declaration', parseValue: false });
// {
//     "type": "Declaration",
//     "important": false,
//     "property": "color",
//     "value": {
//         "type": "Raw",
//         "value": " #aabbcc"
//     }
// }
```

### parseCustomProperty

Type: `boolean`  
Default: `false`

Defines to parse a custom property value and a `var()` fallback in details (represents as `Value`). Otherwise represents value as `Raw` node.

```js
csstree.parse('--custom: #aabbcc', { context: 'declaration' });
// {
//     "type": "Declaration",
//     "important": false,
//     "property": "--custom",
//     "value": {
//         "type": "Raw",
//         "value": " #aabbcc"
//     }
// }

csstree.parse('--custom: #aabbcc', { context: 'declaration', parseCustomProperty: true });
// {
//     "type": "Declaration",
//     "important": false,
//     "property": "--custom",
//     "value": {
//         "type": "Value",
//         "children": [
//             {
//                 "type": "HexColor",
//                 "value": "aabbcc"
//             }
//         ]
//     }
// }
```
