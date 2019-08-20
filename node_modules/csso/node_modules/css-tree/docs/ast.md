# AST format

CSSTree's AST consists of nodes (leafs). Each node is an object with a set of properties that depends on node's type. Nodes can refers to other nodes and contain a list of nested nodes.

Interactively explore the AST with [AST Explorer](https://astexplorer.net/#/gist/244e2fb4da940df52bf0f4b94277db44/e79aff44611020b22cfd9708f3a99ce09b7d67a8).

<!-- MarkdownTOC -->

- [Example](#example)
- [Common node's properties](#common-nodes-properties)
    - [type](#type)
    - [loc](#loc)
    - [children](#children)
- [Node types](#node-types)
    - [AnPlusB](#anplusb)
    - [Atrule](#atrule)
    - [AtrulePrelude](#atruleprelude)
    - [AttributeSelector](#attributeselector)
    - [Block](#block)
    - [Brackets](#brackets)
    - [CDC](#cdc)
    - [CDO](#cdo)
    - [ClassSelector](#classselector)
    - [Combinator](#combinator)
    - [Comment](#comment)
    - [Declaration](#declaration)
    - [DeclarationList](#declarationlist)
    - [Dimension](#dimension)
    - [Function](#function)
    - [HexColor](#hexcolor)
    - [IdSelector](#idselector)
    - [Identifier](#identifier)
    - [MediaFeature](#mediafeature)
    - [MediaQuery](#mediaquery)
    - [MediaQueryList](#mediaquerylist)
    - [Nth](#nth)
    - [Number](#number)
    - [Operator](#operator)
    - [Parentheses](#parentheses)
    - [Percentage](#percentage)
    - [PseudoClassSelector](#pseudoclassselector)
    - [PseudoElementSelector](#pseudoelementselector)
    - [Ratio](#ratio)
    - [Raw](#raw)
    - [Rule](#rule)
    - [Selector](#selector)
    - [SelectorList](#selectorlist)
    - [String](#string)
    - [StyleSheet](#stylesheet)
    - [TypeSelector](#typeselector)
    - [UnicodeRange](#unicoderange)
    - [Url](#url)
    - [Value](#value)
    - [WhiteSpace](#whitespace)

<!-- /MarkdownTOC -->

## Example

Assume we have a CSS:

```css
body {
    color: red;
}
```

An AST for this CSS might look like:

```js
{
    type: 'StyleSheet',
    loc: null,
    children: [
        {
            type: 'Rule',
            loc: null,
            prelude: {
                type: 'SelectorList',
                loc: null,
                children: [
                    {
                        type: 'Selector',
                        loc: null,
                        children: [
                            {
                                type: 'TypeSelector',
                                loc: null,
                                name: 'body'
                            }
                        ]
                    }
                ]
            },
            block: {
                type: 'Block',
                loc: null,
                children: [
                    {
                        type: 'Declaration',
                        loc: null,
                        important: false,
                        property: 'color',
                        value: {
                            type: 'Value',
                            loc: null,
                            children: [
                                {
                                    type: 'Identifier',
                                    loc: null,
                                    name: 'red'
                                }
                            ]
                        }
                    }
                ]
            }
        }
    ]
}
```

> NOTE: The example uses arrays for the values of the property `children`. In fact, the values of this property are instances of the [`List`](List.md) class.

An AST structure (i.e. details level, include positions or not) is depend on options passed to parser. See [Parsing CSS into AST](parsing.md) for details.

## Common node's properties

All nodes have the following properties.

### type

Type: `String`

Indicates the type of a node. The possible values are the ones listed in the [Node types](#node-types) below.

### loc

Type: `Object` or `null`

Information about the position in the source string that corresponds to the node. It has the following structure:

```js
{
    source: String,
    start: {
        offset: Number,
        line: Number,
        column: Number
    },
    end: {
        offset: Number,
        line: Number,
        column: Number
    }
}
```

The `source` property contains value of `options.filename` if passed to `csstree.parse()`, otherwise `"<unknown>"`.

The `offset` number is zero-based, indicates the index in a source string passed to the parser.

The `line` and `column` numbers are 1-based: the first line is `1` and the first column of a line is `1`.

The `loc` property lets you know from which source file the node comes from (if available) and what part of that file was parsed into the node. By default parser doesn't include `loc` data into the AST (sets `null` for this property), you should pass `options.positions` equal to `true` to make `loc` filled.

### children

Type: `List` or `null`  

Only certain types of nodes can contain this property, such as [`StyleSheet`](#stylesheet) or [`Block`](#block). However, this is the only property that can store a list of nested nodes.

Most node types always store an instance of the `List` in this property, even if there is no nested nodes (the list is empty). Only some node types, such as `PseudoClassSelector` and `PseudoElementSelector`, can store a `null` instead of a list. This is due to the fact that in the absence of a list such node types is represent a pseudo-selector, and in the presence of a list, a functional pseudo-selector. See definition of each node type for details.

## Node types

> NOTE: Despite every node has a `loc` property, this property is excluded from definitions to reduce a noise.

<!-- node types -->

### AnPlusB

Used for [the An+B microsyntax](https://drafts.csswg.org/css-syntax/#anb-microsyntax).

```js
{
    type: "AnPlusB",
    a: String | null,
    b: String | null
}
```

`a` or `b` fields may have no value (equals to `null`) but not both at the same time. Parser normalizes `a` value to store a valid integer, i.e. parser will store `-1` for `-n` and `1` for `n`.

### Atrule

```js
{
    type: "Atrule",
    name: String,
    prelude: <AtrulePrelude> | <Raw> | null,
    block: <Block> | null
}
```

### AtrulePrelude

```js
{
    type: "AtrulePrelude",
    children: List
}
```

### AttributeSelector

```js
{
    type: "AttributeSelector",
    name: <Identifier>,
    matcher: String | null,
    value: <String> | <Identifier> | null,
    flags: String | null
}
```

### Block

```js
{
    type: "Block",
    children: List
}
```

### Brackets

```js
{
    type: "Brackets",
    children: List
}
```

### CDC

```js
{
    type: "CDC"
}
```

### CDO

```js
{
    type: "CDO"
}
```

### ClassSelector

```js
{
    type: "ClassSelector",
    name: String
}
```

### Combinator

```js
{
    type: "Combinator",
    name: String
}
```

### Comment

```js
{
    type: "Comment",
    value: String
}
```

### Declaration

```js
{
    type: "Declaration",
    important: Boolean | String,
    property: String,
    value: <Value> | <Raw>
}
```

### DeclarationList

```js
{
    type: "DeclarationList",
    children: List
}
```

### Dimension

```js
{
    type: "Dimension",
    value: String,
    unit: String
}
```

### Function

```js
{
    type: "Function",
    name: String,
    children: List
}
```

### HexColor

```js
{
    type: "HexColor",
    value: String
}
```

### IdSelector

```js
{
    type: "IdSelector",
    name: String
}
```

### Identifier

```js
{
    type: "Identifier",
    name: String
}
```

### MediaFeature

```js
{
    type: "MediaFeature",
    name: String,
    value: <Identifier> | <Number> | <Dimension> | <Ratio> | null
}
```

### MediaQuery

```js
{
    type: "MediaQuery",
    children: List
}
```

### MediaQueryList

```js
{
    type: "MediaQueryList",
    children: List
}
```

### Nth

```js
{
    type: "Nth",
    nth: <AnPlusB> | <Identifier>,
    selector: <SelectorList> | null
}
```

### Number

```js
{
    type: "Number",
    value: String
}
```

### Operator

```js
{
    type: "Operator",
    value: String
}
```

### Parentheses

```js
{
    type: "Parentheses",
    children: List
}
```

### Percentage

```js
{
    type: "Percentage",
    value: String
}
```

### PseudoClassSelector

```js
{
    type: "PseudoClassSelector",
    name: String,
    children: List | null
}
```

### PseudoElementSelector

```js
{
    type: "PseudoElementSelector",
    name: String,
    children: List | null
}
```

### Ratio

```js
{
    type: "Ratio",
    left: String,
    right: String
}
```

### Raw

A sequence of any characters. This node type is used for unparsed fragments of CSS, e.g. due to parse error or parser settings, and for quirk parts like content of some functions, such as `url()` or `expression()`.

```js
{
    type: "Raw",
    value: String
}
```

### Rule

```js
{
    type: "Rule",
    prelude: <SelectorList> | <Raw>,
    block: <Block>
}
```

### Selector

```js
{
    type: "Selector",
    children: List
}
```

### SelectorList

```js
{
    type: "SelectorList",
    children: List
}
```

### String

A sequence of characters enclosed in double quotes or single quotes.

```js
{
    type: "String",
    value: String
}
```

### StyleSheet

```js
{
    type: "StyleSheet",
    children: List
}
```

### TypeSelector

```js
{
    type: "TypeSelector",
    name: String
}
```

### UnicodeRange

Used for [the Unicode-Range microsyntax](https://drafts.csswg.org/css-syntax/#urange).

```js
{
    type: "UnicodeRange",
    value: String
}
```

### Url

```js
{
    type: "Url",
    value: <String> | <Raw>
}
```

### Value

```js
{
    type: "Value",
    children: List
}
```

### WhiteSpace

A sequence of one or more white spaces, i.e. ` ` (space), `\t`, `\r`, `\n` and `\f`.

```js
{
    type: "WhiteSpace",
    value: String
}
```

<!-- /node types -->
