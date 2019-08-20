<a name="eslint-plugin-flowtype"></a>
# eslint-plugin-flowtype

[![NPM version](http://img.shields.io/npm/v/eslint-plugin-flowtype.svg?style=flat-square)](https://www.npmjs.org/package/eslint-plugin-flowtype)
[![Travis build status](http://img.shields.io/travis/gajus/eslint-plugin-flowtype/master.svg?style=flat-square)](https://travis-ci.org/gajus/eslint-plugin-flowtype)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

[Flow type](http://flowtype.org/) linting rules for ESLint.

* [eslint-plugin-flowtype](#eslint-plugin-flowtype)
    * [Installation](#eslint-plugin-flowtype-installation)
    * [Configuration](#eslint-plugin-flowtype-configuration)
        * [Shareable configurations](#eslint-plugin-flowtype-configuration-shareable-configurations)
        * [Community maintained configurations](#eslint-plugin-flowtype-configuration-community-maintained-configurations)
    * [Settings](#eslint-plugin-flowtype-settings)
        * [`onlyFilesWithFlowAnnotation`](#eslint-plugin-flowtype-settings-onlyfileswithflowannotation)
    * [Rules](#eslint-plugin-flowtype-rules)
        * [`array-style-complex-type`](#eslint-plugin-flowtype-rules-array-style-complex-type)
        * [`array-style-simple-type`](#eslint-plugin-flowtype-rules-array-style-simple-type)
        * [`boolean-style`](#eslint-plugin-flowtype-rules-boolean-style)
        * [`define-flow-type`](#eslint-plugin-flowtype-rules-define-flow-type)
        * [`delimiter-dangle`](#eslint-plugin-flowtype-rules-delimiter-dangle)
        * [`generic-spacing`](#eslint-plugin-flowtype-rules-generic-spacing)
        * [`newline-after-flow-annotation`](#eslint-plugin-flowtype-rules-newline-after-flow-annotation)
        * [`no-dupe-keys`](#eslint-plugin-flowtype-rules-no-dupe-keys)
        * [`no-existential-type`](#eslint-plugin-flowtype-rules-no-existential-type)
        * [`no-flow-fix-me-comments`](#eslint-plugin-flowtype-rules-no-flow-fix-me-comments)
        * [`no-mutable-array`](#eslint-plugin-flowtype-rules-no-mutable-array)
        * [`no-primitive-constructor-types`](#eslint-plugin-flowtype-rules-no-primitive-constructor-types)
        * [`no-types-missing-file-annotation`](#eslint-plugin-flowtype-rules-no-types-missing-file-annotation)
        * [`no-unused-expressions`](#eslint-plugin-flowtype-rules-no-unused-expressions)
        * [`no-weak-types`](#eslint-plugin-flowtype-rules-no-weak-types)
        * [`object-type-delimiter`](#eslint-plugin-flowtype-rules-object-type-delimiter)
        * [`require-exact-type`](#eslint-plugin-flowtype-rules-require-exact-type)
        * [`require-parameter-type`](#eslint-plugin-flowtype-rules-require-parameter-type)
        * [`require-return-type`](#eslint-plugin-flowtype-rules-require-return-type)
        * [`require-types-at-top`](#eslint-plugin-flowtype-rules-require-types-at-top)
        * [`require-valid-file-annotation`](#eslint-plugin-flowtype-rules-require-valid-file-annotation)
        * [`require-variable-type`](#eslint-plugin-flowtype-rules-require-variable-type)
        * [`semi`](#eslint-plugin-flowtype-rules-semi)
        * [`sort-keys`](#eslint-plugin-flowtype-rules-sort-keys)
        * [`space-after-type-colon`](#eslint-plugin-flowtype-rules-space-after-type-colon)
        * [`space-before-generic-bracket`](#eslint-plugin-flowtype-rules-space-before-generic-bracket)
        * [`space-before-type-colon`](#eslint-plugin-flowtype-rules-space-before-type-colon)
        * [`type-id-match`](#eslint-plugin-flowtype-rules-type-id-match)
        * [`type-import-style`](#eslint-plugin-flowtype-rules-type-import-style)
        * [`union-intersection-spacing`](#eslint-plugin-flowtype-rules-union-intersection-spacing)
        * [`use-flow-type`](#eslint-plugin-flowtype-rules-use-flow-type)
        * [`valid-syntax`](#eslint-plugin-flowtype-rules-valid-syntax)


<a name="eslint-plugin-flowtype-installation"></a>
## Installation

1. Install [ESLint](https://www.github.com/eslint/eslint).
1. Install [`babel-eslint`](https://github.com/babel/babel-eslint) parser (ESLint parser [does not support type annotations](https://github.com/eslint/eslint/issues/2157)).
1. Install [`eslint-plugin-flowtype`](https://github.com/gajus/eslint-plugin-flowtype) plugin.

<!-- -->

```sh
npm install eslint --save-dev
npm install babel-eslint --save-dev
npm install eslint-plugin-flowtype --save-dev
```

<a name="eslint-plugin-flowtype-configuration"></a>
## Configuration

1. Set `parser` property to `babel-eslint`.
1. Add `plugins` section and specify `eslint-plugin-flowtype` as a plugin.
1. Enable rules.

<!-- -->

```json
{
  "parser": "babel-eslint",
  "plugins": [
    "flowtype"
  ],
  "rules": {
    "flowtype/boolean-style": [
      2,
      "boolean"
    ],
    "flowtype/define-flow-type": 1,
    "flowtype/delimiter-dangle": [
      2,
      "never"
    ],
    "flowtype/generic-spacing": [
      2,
      "never"
    ],
    "flowtype/no-primitive-constructor-types": 2,
    "flowtype/no-types-missing-file-annotation": 2,
    "flowtype/no-weak-types": 2,
    "flowtype/object-type-delimiter": [
      2,
      "comma"
    ],
    "flowtype/require-parameter-type": 2,
    "flowtype/require-return-type": [
      2,
      "always",
      {
        "annotateUndefined": "never"
      }
    ],
    "flowtype/require-valid-file-annotation": 2,
    "flowtype/semi": [
      2,
      "always"
    ],
    "flowtype/space-after-type-colon": [
      2,
      "always"
    ],
    "flowtype/space-before-generic-bracket": [
      2,
      "never"
    ],
    "flowtype/space-before-type-colon": [
      2,
      "never"
    ],
    "flowtype/type-id-match": [
      2,
      "^([A-Z][a-z0-9]+)+Type$"
    ],
    "flowtype/union-intersection-spacing": [
      2,
      "always"
    ],
    "flowtype/use-flow-type": 1,
    "flowtype/valid-syntax": 1
  },
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": false
    }
  }
}
```

<a name="eslint-plugin-flowtype-configuration-shareable-configurations"></a>
### Shareable configurations

<a name="eslint-plugin-flowtype-configuration-shareable-configurations-recommended"></a>
#### Recommended

This plugin exports a [recommended configuration](./src/configs/recommended.json) that enforces Flow type good practices.

To enable this configuration use the extends property in your `.eslintrc` config file:

```json
{
  "extends": [
    "plugin:flowtype/recommended"
  ],
  "plugins": [
    "flowtype"
  ]
}
```

See [ESLint documentation](http://eslint.org/docs/user-guide/configuring#extending-configuration-files) for more information about extending configuration files.

<a name="eslint-plugin-flowtype-configuration-community-maintained-configurations"></a>
### Community maintained configurations

The following are third-party submitted/ maintained configurations of `eslint-plugin-flowtype`:

* https://github.com/wemake-services/eslint-config-flowtype-essential

<a name="eslint-plugin-flowtype-settings"></a>
## Settings

<a name="eslint-plugin-flowtype-settings-onlyfileswithflowannotation"></a>
### <code>onlyFilesWithFlowAnnotation</code>

When `true`, only checks files with a [`@flow` annotation](http://flowtype.org/docs/about-flow.html#gradual) in the first comment.

```js
{
  "settings": {
    "flowtype": {
      "onlyFilesWithFlowAnnotation": true
    }
  }
}
```

<a name="eslint-plugin-flowtype-rules"></a>
## Rules

<!-- Rules are sorted alphabetically. -->

<a name="eslint-plugin-flowtype-rules-array-style-complex-type"></a>
### <code>array-style-complex-type</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular annotation style of complex types.

Type is considered complex in these cases:

* [Maybe type](https://flow.org/en/docs/types/maybe/)
* [Function type](https://flow.org/en/docs/types/functions/)
* [Object type](https://flow.org/en/docs/types/objects/)
* [Tuple type](https://flow.org/en/docs/types/tuples/)
* [Union type](https://flow.org/en/docs/types/unions/)
* [Intersection type](https://flow.org/en/docs/types/intersections/)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'verbose'`.

The following patterns are considered problems:

```js
type X = (?string)[]
// Message: Use "Array<?string>", not "(?string)[]"

// Options: ["verbose"]
type X = (?string)[]
// Message: Use "Array<?string>", not "(?string)[]"

// Options: ["shorthand"]
type X = Array<?string>
// Message: Use "(?string)[]", not "Array<?string>"

// Options: ["shorthand"]
type X = Array<{foo: string}>
// Message: Use "{foo: string}[]", not "Array<{foo: string}>"

type X = (string | number)[]
// Message: Use "Array<string | number>", not "(string | number)[]"

type X = (string & number)[]
// Message: Use "Array<string & number>", not "(string & number)[]"

type X = [string, number][]
// Message: Use "Array<[string, number]>", not "[string, number][]"

type X = {foo: string}[]
// Message: Use "Array<{foo: string}>", not "{foo: string}[]"

type X = (string => number)[]
// Message: Use "Array<string => number>", not "(string => number)[]"

type X = {
    foo: string,
    bar: number
}[]
// Message: Use "Array<{ foo: string, bar: number }>", not "{ foo: string, bar: number }[]"

type X = {
    foo: string,
    bar: number,
    quo: boolean,
    hey: Date
}[]
// Message: Use "Array<Type>", not "Type[]"
```

The following patterns are not considered problems:

```js
type X = Array<?string>

// Options: ["verbose"]
type X = Array<?string>

// Options: ["shorthand"]
type X = (?string)[]

// Options: ["shorthand"]
type X = Array<string>

// Options: ["shorthand"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type X = Array<?string>
```



<a name="eslint-plugin-flowtype-rules-array-style-simple-type"></a>
### <code>array-style-simple-type</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular array type annotation style of simple types.

Type is considered simple in these cases:

* [Primitive types](https://flow.org/en/docs/types/primitives/)
* [Literal types](https://flow.org/en/docs/types/literals/)
* [Mixed type](https://flow.org/en/docs/types/mixed/)
* [Any type](https://flow.org/en/docs/types/any/)
* [Class type](https://flow.org/en/docs/types/classes/)
* [Generic type](https://flow.org/en/docs/types/generics/)
* Array type [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax)

This rule takes one argument.

If it is `'verbose'` then a problem is raised when using `Type[]` instead of `Array<Type>`.

If it is `'shorthand'` then a problem is raised when using `Array<Type>` instead of `Type[]`.

The default value is `'verbose'`.

The following patterns are considered problems:

```js
type X = string[]
// Message: Use "Array<string>", not "string[]"

// Options: ["verbose"]
type X = string[]
// Message: Use "Array<string>", not "string[]"

// Options: ["shorthand"]
type X = Array<string>
// Message: Use "string[]", not "Array<string>"

type X = Date[]
// Message: Use "Array<Date>", not "Date[]"

type X = Promise<string>[]
// Message: Use "Array<Promise<string>>", not "Promise<string>[]"

type X = $Keys<{foo: string}>[]
// Message: Use "Array<$Keys<{foo: string}>>", not "$Keys<{foo: string}>[]"

type X = any[]
// Message: Use "Array<any>", not "any[]"

type X = mixed[]
// Message: Use "Array<mixed>", not "mixed[]"

type X = void[]
// Message: Use "Array<void>", not "void[]"

type X = null[]
// Message: Use "Array<null>", not "null[]"

type X = string[][]
// Message: Use "Array<string[]>", not "string[][]"
// Message: Use "Array<string>", not "string[]"

type X = Promise<{
    foo: string,
    bar: number
}>[]
// Message: Use "Array<Promise<{ foo: string, bar: number }>>", not "Promise<{ foo: string, bar: number }>[]"

type X = Promise<{
    foo: string,
    bar: number,
    quo: boolean
}>[]
// Message: Use "Array<Type>", not "Type[]"
```

The following patterns are not considered problems:

```js
type X = Array<string>

// Options: ["verbose"]
type X = Array<string>

// Options: ["shorthand"]
type X = string[]

type X = Array<Array<string>>

// Options: ["verbose"]
type X = (?string)[]

// Options: ["verbose"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type X = string[]
```



<a name="eslint-plugin-flowtype-rules-boolean-style"></a>
### <code>boolean-style</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for boolean type annotations. This rule takes one argument.

If it is `'boolean'` then a problem is raised when using `bool` instead of `boolean`.

If it is `'bool'` then a problem is raised when using `boolean` instead of `bool`.

The default value is `'boolean'`.

The following patterns are considered problems:

```js
type X = bool
// Message: Use "boolean", not "bool"

// Options: ["boolean"]
type X = bool
// Message: Use "boolean", not "bool"

// Options: ["bool"]
type X = boolean
// Message: Use "bool", not "boolean"
```

The following patterns are not considered problems:

```js
type X = boolean

// Options: ["boolean"]
type X = boolean

// Options: ["bool"]
type X = bool

// Options: ["boolean"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type X = bool
```



<a name="eslint-plugin-flowtype-rules-define-flow-type"></a>
### <code>define-flow-type</code>

Marks Flow type identifiers as defined.

Used to suppress [`no-undef`](http://eslint.org/docs/rules/no-undef) reporting of type identifiers.

The following patterns are not considered problems:

```js
var a: AType
// Additional rules: {"no-undef":2}

var a: AType; var b: AType
// Additional rules: {"no-undef":2}

var a; (a: AType)
// Additional rules: {"no-undef":2}

var a: AType<BType>
// Additional rules: {"no-undef":2}

type A = AType
// Additional rules: {"no-undef":2}

declare type A = number
// Additional rules: {"no-undef":2}

opaque type A = AType
// Additional rules: {"no-undef":2}

function f(a: AType) {}
// Additional rules: {"no-undef":2}

function f(a: AType.a) {}
// Additional rules: {"no-undef":2}

function f(a: AType.a.b) {}
// Additional rules: {"no-undef":2}

function f(a): AType {}; var a: AType
// Additional rules: {"no-undef":2}

function f(a): AType {}
// Additional rules: {"no-undef":2}

class C { a: AType }
// Additional rules: {"no-undef":2}

class C { a: AType.a }
// Additional rules: {"no-undef":2}

class C { a: AType.a.b }
// Additional rules: {"no-undef":2}

class C implements AType {}
// Additional rules: {"no-undef":2}

interface AType {}
// Additional rules: {"no-undef":2}

declare interface A {}
// Additional rules: {"no-undef":2}

({ a: ({b() {}}: AType) })
// Additional rules: {"no-undef":2}

type X = {Y<AType>(): BType}
// Additional rules: {"no-undef":2}

interface AType<BType> {}
// Additional rules: {"no-undef":2}

var a: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a: AType; var b: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a; (a: AType)
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

var a: AType<BType>
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

type A = AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

declare type A = number
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

opaque type A = AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType.a) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a: AType.a.b) {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a): AType {}; var a: AType
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

function f(a): AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType.a }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C { a: AType.a.b }
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

class C implements AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

interface AType {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

declare interface A {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

({ a: ({b() {}}: AType) })
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

type X = {Y<AType>(): BType}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}

interface AType<BType> {}
// Additional rules: {"no-undef":2,"no-use-before-define":[2,"nofunc"]}
```



<a name="eslint-plugin-flowtype-rules-delimiter-dangle"></a>
### <code>delimiter-dangle</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of trailing commas in Object and Tuple annotations.

This rule takes one argument which mirrors ESLint's default `comma-dangle` rule.

If it is `'never'` then a problem is raised when there is a trailing comma.

If it is `'always'` then a problem is raised when there is no trailing comma.

If it is `'always-multiline'` then a problem is raised when there is no trailing comma on a multi-line definition, or there _is_ a trailing comma on a single-line definition.

If it is `'only-multiline'` then a problem is raised when there is a trailing comma on a single-line definition. It allows, but does not enforce, trailing commas on multi-line definitions.

The default value is `'never'`.

The following patterns are considered problems:

```js
type X = { foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = { foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = { foo: string; }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = {
foo: string,
}
// Message: Unexpected trailing delimiter

// Options: ["always"]
type X = { foo: string }
// Message: Missing trailing delimiter

// Options: ["always"]
type X = {
foo: string
}
// Message: Missing trailing delimiter

// Options: ["always-multiline"]
type X = { foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["always-multiline"]
type X = {
foo: string
}
// Message: Missing trailing delimiter

// Options: ["only-multiline"]
type X = { foo: string; }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = { [key: string]: number, }
// Message: Unexpected trailing delimiter

// Options: ["always"]
type X = { [key: string]: number }
// Message: Missing trailing delimiter

// Options: ["always-multiline"]
type X = { [key: string]: number, }
// Message: Unexpected trailing delimiter

// Options: ["always-multiline"]
type X = {
[key: string]: number
}
// Message: Missing trailing delimiter

// Options: ["only-multiline"]
type X = { [key: string]: number; }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = { [key: string]: number, foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = {
[key: string]: number,
foo: string,
}
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = {
[key: string]: number,
aReallyLongPropertyNameHere: string,
}
// Message: Unexpected trailing delimiter

// Options: ["always"]
type X = { [key: string]: number, foo: string }
// Message: Missing trailing delimiter

// Options: ["always"]
type X = {
[key: string]: number;
foo: string
}
// Message: Missing trailing delimiter

// Options: ["always-multiline"]
type X = { [key: string]: number, foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["always-multiline"]
type X = {
[key: string]: number,
foo: string
}
// Message: Missing trailing delimiter

// Options: ["only-multiline"]
type X = { [key: string]: number, foo: string, }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = { foo: string, [key: string]: number, }
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = {
foo: string,
[key: string]: number,
}
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = {
aReallyLongPropertyNameHere: string,
[key: string]: number,
}
// Message: Unexpected trailing delimiter

// Options: ["always"]
type X = { foo: string, [key: string]: number }
// Message: Missing trailing delimiter

// Options: ["always"]
type X = { foo: string; [key: string]: number }
// Message: Missing trailing delimiter

// Options: ["always-multiline"]
type X = { foo: string, [key: string]: number; }
// Message: Unexpected trailing delimiter

// Options: ["always-multiline"]
type X = {
foo: string,
[key: string]: number
}
// Message: Missing trailing delimiter

// Options: ["only-multiline"]
type X = { foo: string, [key: string]: number; }
// Message: Unexpected trailing delimiter

type X = [string, number,]
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = [string, number,]
// Message: Unexpected trailing delimiter

// Options: ["never"]
type X = [
string,
number,
]
// Message: Unexpected trailing delimiter

// Options: ["always"]
type X = [string, number]
// Message: Missing trailing delimiter

// Options: ["always"]
type X = [
string,
number
]
// Message: Missing trailing delimiter

// Options: ["always-multiline"]
type X = [string, number,]
// Message: Unexpected trailing delimiter

// Options: ["always-multiline"]
type X = [
foo, string
]
// Message: Missing trailing delimiter

// Options: ["only-multiline"]
type X = [ number, string, ]
// Message: Unexpected trailing delimiter
```

The following patterns are not considered problems:

```js
type X = { foo: string }

// Options: ["never"]
type X = { foo: string }

// Options: ["always"]
type X = { foo: string, }

// Options: ["always"]
type X = { foo: string; }

// Options: ["never"]
type X = {
foo: string
}

// Options: ["always"]
type X = {
foo: string,
}

// Options: ["always-multiline"]
type X = { foo: string }

// Options: ["always-multiline"]
type X = {
foo: string,
}

// Options: ["always-multiline"]
type X = {
foo: string;
}

// Options: ["only-multiline"]
type X = { foo: string }

// Options: ["only-multiline"]
type X = {
foo: string
}

// Options: ["only-multiline"]
type X = {
foo: string,
}

// Options: ["only-multiline"]
type X = {
foo: string;
}

// Options: ["never"]
type X = {}

// Options: ["always"]
type X = {}

// Options: ["always-multiline"]
type X = {}

// Options: ["only-multiline"]
type X = {}

// Options: ["never"]
type X = { [key: string]: number }

// Options: ["always"]
type X = { [key: string]: number, }

// Options: ["always"]
type X = { [key: string]: number; }

// Options: ["always-multiline"]
type X = { [key: string]: number }

// Options: ["always-multiline"]
type X = {
[key: string]: number,
}

// Options: ["only-multiline"]
type X = {
[key: string]: number,
}

// Options: ["only-multiline"]
type X = {
[key: string]: number
}

// Options: ["only-multiline"]
type X = { [key: string]: number }

// Options: ["never"]
type X = { [key: string]: number, foo: string }

// Options: ["always"]
type X = { [key: string]: number, foo: string, }

// Options: ["always"]
type X = { [key: string]: number; foo: string; }

// Options: ["always-multiline"]
type X = { [key: string]: number, foo: string }

// Options: ["always-multiline"]
type X = {
[key: string]: number,
foo: string,
}

// Options: ["only-multiline"]
type X = {
[key: string]: number,
foo: string,
}

// Options: ["only-multiline"]
type X = {
[key: string]: number;
foo: string
}

// Options: ["only-multiline"]
type X = { [key: string]: number, foo: string }

// Options: ["never"]
type X = { foo: string, [key: string]: number }

// Options: ["always"]
type X = { foo: string, [key: string]: number, }

// Options: ["always"]
type X = { foo: string; [key: string]: number; }

// Options: ["always-multiline"]
type X = { foo: string, [key: string]: number }

// Options: ["always-multiline"]
type X = {
foo: string,
[key: string]: number,
}

// Options: ["only-multiline"]
type X = {
foo: string,
[key: string]: number,
}

// Options: ["only-multiline"]
type X = {
foo: string;
[key: string]: number
}

// Options: ["only-multiline"]
type X = { foo: string, [key: string]: number }

type X = [string, number]

// Options: ["never"]
type X = [string, number]

// Options: ["never"]
type X = [
string,
number
]

// Options: ["always"]
type X = [string, number,]

// Options: ["always"]
type X = [
string,
number,
]

// Options: ["always-multiline"]
type X = [ foo, string ]

// Options: ["always-multiline"]
type X = [
foo, string,
]

// Options: ["only-multiline"]
type X = [ number, string ]

// Options: ["only-multiline"]
type X = [
number,
string
]

// Options: ["only-multiline"]
type X = [
number,
string,
]

// Options: ["never"]
type X = []

// Options: ["always"]
type X = []

// Options: ["always-multiline"]
type X = []

// Options: ["only-multiline"]
type X = []
```



<a name="eslint-plugin-flowtype-rules-generic-spacing"></a>
### <code>generic-spacing</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing within generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space surrounding the generic type parameters. If it is `'always'` then a problem is raised when there is no space surrounding the generic type parameters.

The default value is `'never'`.

The following patterns are considered problems:

```js
type X = Promise< string>
// Message: There must be no space at start of "Promise" generic type annotation

// Options: ["never"]
type X = Promise<  string>
// Message: There must be no space at start of "Promise" generic type annotation

type X = FooBar<string >
// Message: There must be no space at end of "FooBar" generic type annotation

type X = Promise< string >
// Message: There must be no space at start of "Promise" generic type annotation
// Message: There must be no space at end of "Promise" generic type annotation

type X = Promise< (foo), bar, (((baz))) >
// Message: There must be no space at start of "Promise" generic type annotation
// Message: There must be no space at end of "Promise" generic type annotation

// Options: ["always"]
type X = Promise<string >
// Message: There must be a space at start of "Promise" generic type annotation

// Options: ["always"]
type X = FooBar< string>
// Message: There must be a space at end of "FooBar" generic type annotation

// Options: ["always"]
type X = Promise<string>
// Message: There must be a space at start of "Promise" generic type annotation
// Message: There must be a space at end of "Promise" generic type annotation

// Options: ["always"]
type X = Promise<(foo), bar, (((baz)))>
// Message: There must be a space at start of "Promise" generic type annotation
// Message: There must be a space at end of "Promise" generic type annotation

// Options: ["always"]
type X = FooBar<  string >
// Message: There must be one space at start of "FooBar" generic type annotation

// Options: ["always"]
type X = FooBar< string  >
// Message: There must be one space at end of "FooBar" generic type annotation

// Options: ["always"]
type X = Promise<  (foo), bar, (((baz)))  >
// Message: There must be one space at start of "Promise" generic type annotation
// Message: There must be one space at end of "Promise" generic type annotation
```

The following patterns are not considered problems:

```js
type X = Promise<string>

type X = Promise<(string)>

type X = Promise<(foo), bar, (((baz)))>

// Options: ["always"]
type X = Promise< string >

// Options: ["always"]
type X = Promise< (string) >

// Options: ["always"]
type X = Promise< (foo), bar, (((baz))) >
```



<a name="eslint-plugin-flowtype-rules-newline-after-flow-annotation"></a>
### <code>newline-after-flow-annotation</code>

This rule requires an empty line after the Flow annotation.

<a name="eslint-plugin-flowtype-rules-newline-after-flow-annotation-options"></a>
#### Options

The rule has a string option:

* `"always"` (default): Enforces that `@flow` annotations be followed by an empty line, separated by newline (LF)
* `"always-windows"`: Identical to "always", but will use a CRLF when autofixing
* `"never"`: Enforces that `@flow` annotations are not followed by empty lines

```js
{
  "rules": {
    "flowtype/newline-after-flow-annotation": [
      2,
      "always"
    ]
  }
}
```


The following patterns are considered problems:

```js
// @flow
import Foo from './foo';
// Message: Expected newline after flow annotation

// Options: ["always"]
// @flow
import Foo from './foo';
// Message: Expected newline after flow annotation

// Options: ["always-windows"]
// @flow
import Foo from './foo';
// Message: Expected newline after flow annotation

// Options: ["never"]
// @flow


// Message: Expected no newline after flow annotation
```

The following patterns are not considered problems:

```js
// Options: ["always"]
// @flow

import Foo from './foo';

// Options: ["always-windows"]
// @flow

import Foo from './foo';

// Options: ["never"]
// @flow
import Foo from './foo';
```



<a name="eslint-plugin-flowtype-rules-no-dupe-keys"></a>
### <code>no-dupe-keys</code>

Checks for duplicate properties in Object annotations.

This rule mirrors ESLint's [no-dupe-keys](http://eslint.org/docs/rules/no-dupe-keys) rule.

```js
{
    "rules": {
        "flowtype/no-dupe-keys": 2
    }
}
```

The following patterns are considered problems:

```js
type f = { a: number, b: string, a: number }
// Message: Duplicate property.

type f = { a: number, b: string, a: string }
// Message: Duplicate property.

type f = { get(key: "a"): string, get(key: "a"): string }
// Message: Duplicate property.

type f = { get(key: 1): string, get(key: 1): string }
// Message: Duplicate property.

type f = { get(key: 1.1): string, get(key: 1.1): string }
// Message: Duplicate property.

type f = { get(key: true): string, get(key: true): string }
// Message: Duplicate property.

type f = { get(key: {a: 1}): string, get(key: {a: 1}):string }
// Message: Duplicate property.

var a = "a"; type f = { get(key: a): string, get(key: a): string }
// Message: Duplicate property.

var b = 1; type f = { get(key: b): string, get(key: b): string }
// Message: Duplicate property.

var c = true; type f = { get(key: c): string, get(key: c): string }
// Message: Duplicate property.

var d = {}; type f = { get(key: d): string, get(key: d): string }
// Message: Duplicate property.

var e = []; type f = { get(key: e): string, get(key: e): string }
// Message: Duplicate property.

var e = [1, "a"]; type f = { get(key: e): string, get(key: e): string }
// Message: Duplicate property.

function fn() {}; type f = { get(key: fn): string, get(key: fn): string }
// Message: Duplicate property.
```

The following patterns are not considered problems:

```js
type FooType = { a: number, b: string, c: number }

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type FooType = { a: number, b: string, a: number }

type f = { get(key: "a"): string, get(key: "b"): string }

type f = { get(key: 1): string, get(key: 2): string }

type f = { get(key: 1.1): string, get(key: 1.2): string }

type f = { get(key: true): string, get(key: false): string }

type f = { get(key: ["a", 1]): string, get(key: ["a", 2]): string }

type f = { get(key: ["a", ["b", 1]]): string, get(key: ["a", ["b", 2]]): string }

type f = { a: number, b: string, c: number }

type f = { get(key: "a"): string, get(key: "b"): string }

type f = { get(key: "a"): string, get(key: "a", key2: "b"): string }

type f = { get(key: "a"): string, get(key: 1): string }

type f = { get(key: { a: 1 }): string, get(key: { a: 2 }): string}

var a = {}; var b = {}; type f = { get(key: a): string, get(key: b): string }

var a = 1; var b = 1; type f = { get(key: a): string, get(key: b): string }
```



<a name="eslint-plugin-flowtype-rules-no-existential-type"></a>
### <code>no-existential-type</code>

Disallows use of the existential type (*). [See more](https://flow.org/en/docs/types/utilities/#toc-existential-type)

```js
{
  "rules": {
    "flowtype/no-existential-type": 2
  }
}
```


The following patterns are considered problems:

```js
type T = *;
// Message: Unexpected use of existential type (*).

type T = U<*, *>;
// Message: Unexpected use of existential type (*).
// Message: Unexpected use of existential type (*).

const f: (*) => null = () => null;
// Message: Unexpected use of existential type (*).
```

The following patterns are not considered problems:

```js
type T = string | null
```



<a name="eslint-plugin-flowtype-rules-no-flow-fix-me-comments"></a>
### <code>no-flow-fix-me-comments</code>

Disallows `$FlowFixMe` comment suppressions.

This is especially useful as a warning to ensure instances of `$FlowFixMe` in your codebase get fixed over time.

<a name="eslint-plugin-flowtype-rules-no-flow-fix-me-comments-options"></a>
#### Options

This rule takes an optional RegExp that comments a text RegExp that makes the supression valid.

```js
{
    "rules": {
        "flowtype/no-flow-fix-me-comments": [
            1,
            "TODO\s+[0-9]+"
        ]
    }
}
```

<!-- assertions no-flow-fix-me-comments -->

<a name="eslint-plugin-flowtype-rules-no-mutable-array"></a>
### <code>no-mutable-array</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Requires use of [`$ReadOnlyArray`](https://github.com/facebook/flow/blob/v0.46.0/lib/core.js#L185) instead of just `Array` or array [shorthand notation](https://flow.org/en/docs/types/arrays/#toc-array-type-shorthand-syntax). `$ReadOnlyArray` is immutable array collection type and the superclass of Array and tuple types in Flow. Use of `$ReadOnlyArray` instead of `Array` can solve some "problems" in typing with Flow (e.g., [1](https://github.com/facebook/flow/issues/3425), [2](https://github.com/facebook/flow/issues/4251)).

General reasons for using immutable data structures:

* They are simpler to construct, test, and use
* They help to avoid temporal coupling
* Their usage is side-effect free (no defensive copies)
* Identity mutability problem is avoided
* They always have failure atomicity
* They are much easier to cache

Note that initialization of a variable with an empty array is considered valid (e.g., `const values: Array<string> = [];`). This behavior resembles the behavior of Flow's [unsealed objects](https://flow.org/en/docs/types/objects/#toc-unsealed-objects), as it is assumed that empty array is intended to be mutated.

The following patterns are considered problems:

```js
type X = Array<string>
// Message: Use "$ReadOnlyArray" instead of "Array"

type X = string[]
// Message: Use "$ReadOnlyArray" instead of array shorthand notation

const values: Array<Array<string>> = [];
// Message: Use "$ReadOnlyArray" instead of "Array"

let values: Array<Array<string>>;
// Message: Use "$ReadOnlyArray" instead of "Array"
// Message: Use "$ReadOnlyArray" instead of "Array"
```

The following patterns are not considered problems:

```js
type X = $ReadOnlyArray<string>

const values: Array<$ReadOnlyArray<string>> = [];

const values: $ReadOnlyArray<string>[] = [];

const values: Array<$ReadOnlyArray<string>> = new Array();

const values: Array<$ReadOnlyArray<string>> = Array();
```



<a name="eslint-plugin-flowtype-rules-no-primitive-constructor-types"></a>
### <code>no-primitive-constructor-types</code>

Disallows use of primitive constructors as types, such as `Boolean`, `Number` and `String`. [See more](https://flowtype.org/docs/builtins.html).

```js
{
    "rules": {
        "flowtype/no-primitive-constructor-types": 2
    }
}
```

The following patterns are considered problems:

```js
type x = Number
// Message: Unexpected use of Number constructor type.

type x = String
// Message: Unexpected use of String constructor type.

type x = Boolean
// Message: Unexpected use of Boolean constructor type.

type x = { a: Number }
// Message: Unexpected use of Number constructor type.

type x = { a: String }
// Message: Unexpected use of String constructor type.

type x = { a: Boolean }
// Message: Unexpected use of Boolean constructor type.

(x: Number) => {}
// Message: Unexpected use of Number constructor type.

(x: String) => {}
// Message: Unexpected use of String constructor type.

(x: Boolean) => {}
// Message: Unexpected use of Boolean constructor type.
```

The following patterns are not considered problems:

```js
type x = number

type x = string

type x = boolean

type x = { a: number }

type x = { a: string }

type x = { a: boolean }

(x: number) => {}

(x: string) => {}

(x: boolean) => {}

type x = MyNumber

type x = MyString

type x = MyBoolean
```



<a name="eslint-plugin-flowtype-rules-no-types-missing-file-annotation"></a>
### <code>no-types-missing-file-annotation</code>

Disallows Flow type imports, aliases, and annotations in files missing a valid Flow file declaration (or a @noflow annotation).

```js
{
    "rules": {
        "flowtype/no-types-missing-file-annotation": 2
    }
}
```

The following patterns are considered problems:

```js
const x: number = 42;
// Message: Type annotations require valid Flow declaration.

type FooType = number;
// Message: Type aliases require valid Flow declaration.

import type A from "a"
// Message: Type imports require valid Flow declaration.

import type {A} from "a"
// Message: Type imports require valid Flow declaration.

import {type A} from "a"
// Message: Type imports require valid Flow declaration.

export type {A} from "a"
// Message: Type exports require valid Flow declaration.

function t<T>(): T{}
// Message: Type annotations require valid Flow declaration.

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
const x: number = 42;
// Message: Type annotations require valid Flow declaration.
```

The following patterns are not considered problems:

```js
// @flow
const x: number = 42;

/* @flow weak */
type FooType = number;

/* @noflow */
type FooType = number;

/* @noflow */
import type A from "a"

/* @noflow */
import {type A} from "a"

/* @noflow */
export type {A} from "a"

// an unrelated comment
// @flow
export type {A} from "a"
```



<a name="eslint-plugin-flowtype-rules-no-unused-expressions"></a>
### <code>no-unused-expressions</code>

An extension of [ESLint's `no-unused-expressions`](https://eslint.org/docs/rules/no-unused-expressions).
This rule ignores type cast expressions, but otherwise behaves the same as ESLint's
`no-unused-expressions`.

Bare type casts are useful, for example to assert the exhaustiveness of a `switch`:

```js
type Action
  = { type: 'FOO', doFoo: (_: number) => void }
  | { type: 'BAR', doBar: (_: string) => void };

type State = { foo: number, bar: string };

function runFooBar(action: Action, state: State): void {
  switch (action.type) {
    case 'FOO':
      doFoo(state.foo);
      break;
    case 'BAR':
      doBar(state.bar);
      break;
    default:
      (action: empty);  // type error when `Action` is extended with new types
      console.error(`Impossible action: ${action.toString()}`);
  }
}
```

This rule takes the same arguments as ESLint's `no-unused-expressions`. See
[that rule's documentation](https://eslint.org/docs/rules/no-unused-expressions) for details.

The following patterns are considered problems:

```js
foo + 1
// Message: Expected an assignment or function call and instead saw an expression.
```

The following patterns are not considered problems:

```js
(foo: number)
```



<a name="eslint-plugin-flowtype-rules-no-weak-types"></a>
### <code>no-weak-types</code>

Warns against weak type annotations *any*, *Object* and *Function*.
These types can cause flow to silently skip over portions of your code,
which would have otherwise caused type errors.

This rule optionally takes one argument, an object to configure which type warnings to enable. By default, all of the
warnings are enabled. e.g. to disable the `any` warning (allowing it to exist in your code), while continuing to warn
about `Object` and `Function`:

```js
{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false,
            "Object": true,
            "Function": true
        }]
    }
}

// or, the following is equivalent as default is true:

{
    "rules": {
        "flowtype/no-weak-types": [2, {
            "any": false
        }]
    }
}
```

The following patterns are considered problems:

```js
function foo(thing): any {}
// Message: Unexpected use of weak type "any"

function foo(thing): Promise<any> {}
// Message: Unexpected use of weak type "any"

function foo(thing): Promise<Promise<any>> {}
// Message: Unexpected use of weak type "any"

function foo(thing): Object {}
// Message: Unexpected use of weak type "Object"

function foo(thing): Promise<Object> {}
// Message: Unexpected use of weak type "Object"

function foo(thing): Promise<Promise<Object>> {}
// Message: Unexpected use of weak type "Object"

function foo(thing): Function {}
// Message: Unexpected use of weak type "Function"

function foo(thing): Promise<Function> {}
// Message: Unexpected use of weak type "Function"

function foo(thing): Promise<Promise<Function>> {}
// Message: Unexpected use of weak type "Function"

(foo: any) => {}
// Message: Unexpected use of weak type "any"

(foo: Function) => {}
// Message: Unexpected use of weak type "Function"

(foo?: any) => {}
// Message: Unexpected use of weak type "any"

(foo?: Function) => {}
// Message: Unexpected use of weak type "Function"

(foo: { a: any }) => {}
// Message: Unexpected use of weak type "any"

(foo: { a: Object }) => {}
// Message: Unexpected use of weak type "Object"

(foo: any[]) => {}
// Message: Unexpected use of weak type "any"

type Foo = any
// Message: Unexpected use of weak type "any"

type Foo = Function
// Message: Unexpected use of weak type "Function"

type Foo = { a: any }
// Message: Unexpected use of weak type "any"

type Foo = { a: Object }
// Message: Unexpected use of weak type "Object"

type Foo = { (a: Object): string }
// Message: Unexpected use of weak type "Object"

type Foo = { (a: string): Function }
// Message: Unexpected use of weak type "Function"

function foo(thing: any) {}
// Message: Unexpected use of weak type "any"

function foo(thing: Object) {}
// Message: Unexpected use of weak type "Object"

var foo: Function
// Message: Unexpected use of weak type "Function"

var foo: Object
// Message: Unexpected use of weak type "Object"

class Foo { props: any }
// Message: Unexpected use of weak type "any"

class Foo { props: Object }
// Message: Unexpected use of weak type "Object"

var foo: any
// Message: Unexpected use of weak type "any"

// Options: [{"Function":false}]
type X = any; type Y = Function; type Z = Object
// Message: Unexpected use of weak type "any"
// Message: Unexpected use of weak type "Object"

// Options: [{"Object":false,"any":false}]
type X = any; type Y = Function; type Z = Object
// Message: Unexpected use of weak type "Function"
```

The following patterns are not considered problems:

```js
function foo(thing): string {}

function foo(thing): Promise<string> {}

function foo(thing): Promise<Promise<string>> {}

(foo?: string) => {}

(foo: ?string) => {}

(foo: { a: string }) => {}

(foo: { a: ?string }) => {}

(foo: string[]) => {}

type Foo = string

type Foo = { a: string }

type Foo = { (a: string): string }

function foo(thing: string) {}

var foo: string

class Foo { props: string }

// Options: [{"Object":false,"any":false}]
type X = any; type Y = Object

// Options: [{"Function":false}]
type X = Function

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
function foo(thing): Function {}
```



<a name="eslint-plugin-flowtype-rules-object-type-delimiter"></a>
### <code>object-type-delimiter</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent separators between properties in Flow object types.

This rule takes one argument.

If it is `'comma'` then a problem is raised when using `;` as a separator.

If it is `'semicolon'` then a problem is raised when using `,` as a separator.

The default value is `'comma'`.

_This rule is ported from `babel/flow-object-type`, however the default option was changed._

The following patterns are considered problems:

```js
// Options: ["semicolon"]
type Foo = { a: Foo, b: Bar }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
type Foo = { a: Foo; b: Bar }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
type Foo = { [a: string]: Foo, [b: string]: Bar }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
type Foo = { [a: string]: Foo; [b: string]: Bar }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
type Foo = { (): Foo, (): Bar }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
type Foo = { (): Foo; (): Bar }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
declare class Foo { a: Foo, }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
declare class Foo { a: Foo; }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
declare class Foo { [a: string]: Foo, }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
declare class Foo { a: Foo; }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
declare class Foo { (): Foo, }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
declare class Foo { (): Foo; }
// Message: Prefer commas to semicolons in object and class types

// Options: ["semicolon"]
declare class Foo { static (): Foo, }
// Message: Prefer semicolons to commas in object and class types

// Options: ["comma"]
declare class Foo { static (): Foo; }
// Message: Prefer commas to semicolons in object and class types
```

The following patterns are not considered problems:

```js
// Options: ["semicolon"]
type Foo = { a: Foo; b: Bar }

// Options: ["comma"]
type Foo = { a: Foo, b: Bar }

// Options: ["semicolon"]
type Foo = { [a: string]: Foo; [b: string]: Bar }

// Options: ["comma"]
type Foo = { [a: string]: Foo, [b: string]: Bar }

// Options: ["semicolon"]
type Foo = { (): Foo; (): Bar }

// Options: ["comma"]
type Foo = { (): Foo, (): Bar }

type Foo = { a: Foo, b: Bar }

type Foo = { [a: string]: Foo, [b: string]: Bar }

type Foo = { (): Foo, (): Bar }

// Options: ["semicolon"]
declare class Foo { a: Foo; }

// Options: ["comma"]
declare class Foo { a: Foo, }

// Options: ["semicolon"]
declare class Foo { [a: string]: Foo; }

// Options: ["comma"]
declare class Foo { [a: string]: Foo, }

// Options: ["semicolon"]
declare class Foo { (): Foo; }

// Options: ["comma"]
declare class Foo { (): Foo, }

// Options: ["semicolon"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type Foo = { a: Foo, b: Bar }
```



<a name="eslint-plugin-flowtype-rules-require-exact-type"></a>
### <code>require-exact-type</code>

This rule enforces [exact object types](https://flow.org/en/docs/types/objects/#toc-exact-object-types).

<a name="eslint-plugin-flowtype-rules-require-exact-type-options"></a>
#### Options

The rule has one string option:

* `"always"` (default): Report all object type definitions that aren't exact.
* `"never"`: Report all object type definitions that are exact.

```js
{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-exact-type": [
      2,
      "never"
    ]
  }
}
```

The following patterns are considered problems:

```js
type foo = {};
// Message: Type identifier 'foo' must be exact.

type foo = { bar: string };
// Message: Type identifier 'foo' must be exact.

// Options: ["always"]
type foo = {};
// Message: Type identifier 'foo' must be exact.

// Options: ["always"]
type foo = { bar: string };
// Message: Type identifier 'foo' must be exact.

// Options: ["never"]
type foo = {| |};
// Message: Type identifier 'foo' must not be exact.

// Options: ["never"]
type foo = {| bar: string |};
// Message: Type identifier 'foo' must not be exact.
```

The following patterns are not considered problems:

```js
type foo = {| |};

type foo = {| bar: string |};

type foo = number;

// Options: ["always"]
type foo = {| |};

// Options: ["always"]
type foo = {| bar: string |};

// Options: ["always"]
type foo = number;

// Options: ["never"]
type foo = { };

// Options: ["never"]
type foo = { bar: string };

// Options: ["never"]
type foo = number;
```



<a name="eslint-plugin-flowtype-rules-require-parameter-type"></a>
### <code>require-parameter-type</code>

Requires that all function parameters have type annotations.

<a name="eslint-plugin-flowtype-rules-require-parameter-type-options"></a>
#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can want to exclude only concise arrow functions (e.g. `x => x * 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

You can exclude parameters that match a certain regex by using `excludeParameterMatch`.

```js
{
    "rules": {
        "flowtype/require-parameter-type": [
            2,
            {
              "excludeParameterMatch": "^_"
            }
        ]
    }
}
```

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

The following patterns are considered problems:

```js
(foo) => {}
// Message: Missing "foo" parameter type annotation.

function x(foo) {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeArrowFunctions":true}]
function x(foo) {}
// Message: Missing "foo" parameter type annotation.

(foo = 'FOO') => {}
// Message: Missing "foo" parameter type annotation.

(...foo) => {}
// Message: Missing "foo" parameter type annotation.

({foo}) => {}
// Message: Missing "{foo}" parameter type annotation.

([foo]) => {}
// Message: Missing "[foo]" parameter type annotation.

({foo = 1} = {}) => {}
// Message: Missing "{foo = 1}" parameter type annotation.

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
// @flow
(foo) => {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
(foo) => {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
function x(foo) {}
// Message: Missing "foo" parameter type annotation.

// Options: [{"excludeParameterMatch":"^_"}]
(_foo: number, bar) => {}
// Message: Missing "bar" parameter type annotation.

// Options: [{"excludeParameterMatch":"^_"}]
(_foo, bar) => {}
// Message: Missing "bar" parameter type annotation.
```

The following patterns are not considered problems:

```js
(foo: string) => {}

(foo: string = 'FOO') => {}

(...foo: string) => {}

({foo}: {foo: string}) => {}

([foo]: Array) => {}

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
(foo) => {}

// Options: [{"excludeArrowFunctions":true}]
(foo) => {}

// Options: [{"excludeArrowFunctions":"expressionsOnly"}]
(foo) => 3

// Options: [{"excludeParameterMatch":"^_"}]
(_foo, bar: string) => {}

// Options: [{"excludeParameterMatch":"^_"}]
(_foo: number, bar: string) => {}

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
(foo) => {}
```



<a name="eslint-plugin-flowtype-rules-require-return-type"></a>
### <code>require-return-type</code>

Requires that functions have return type annotation.

<a name="eslint-plugin-flowtype-rules-require-return-type-options"></a>
#### Options

You can skip all arrow functions by providing the `excludeArrowFunctions` option with `true`.

Alternatively, you can exclude a concise arrow function (e.g. `() => 2`). Provide `excludeArrowFunctions` with `expressionsOnly` for this.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": true
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeArrowFunctions": "expressionsOnly"
            }
        ]
    }
}
```

You can exclude or include specific tests with the `includeOnlyMatching` and `excludeMatching` rules.

```js
{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "includeOnlyMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
            }
        ]
    }
}

{
    "rules": {
        "flowtype/require-return-type": [
            2,
            "always",
            {
              "excludeMatching": [
                  "^F.*",
                  "Ba(r|z)"
              ]
            }
        ]
    }
}

```

Both rules take an array that can contain either strings or valid RegExp statements.

The following patterns are considered problems:

```js
(foo) => { return "foo"; }
// Message: Missing return type annotation.

// Options: ["always"]
(foo) => { return "foo"; }
// Message: Missing return type annotation.

// Options: ["always"]
(foo) => "foo"
// Message: Missing return type annotation.

(foo) => ({})
// Message: Missing return type annotation.

(foo): undefined => { return; }
// Message: Must not annotate undefined return type.

(foo): void => { return; }
// Message: Must not annotate undefined return type.

(foo): undefined => { return undefined; }
// Message: Must not annotate undefined return type.

(foo): void => { return void 0; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): undefined => { return; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): void => { return; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return; }
// Message: Must annotate undefined return type.

// Options: ["always",{"annotateUndefined":"never"}]
(foo): undefined => { return undefined; }
// Message: Must not annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return undefined; }
// Message: Must annotate undefined return type.

// Options: ["always",{"annotateUndefined":"always"}]
(foo) => { return void 0; }
// Message: Must annotate undefined return type.

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
// @flow
(foo) => { return 1; }
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
// @flow
 (foo) => { return undefined; }
// Message: Must annotate undefined return type.

// Options: ["always"]
async () => { return 2; }
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
async () => {}
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
async function x() {}
// Message: Missing return type annotation.

// Options: ["always",{"annotateUndefined":"always"}]
class Test { constructor() { } }
// Message: Must annotate undefined return type.

class Test { foo() { return 42; } }
// Message: Missing return type annotation.

class Test { foo = () => { return 42; } }
// Message: Missing return type annotation.

class Test { foo = () => 42; }
// Message: Missing return type annotation.

// Options: ["always"]
async () => { return; }
// Message: Missing return type annotation.

// Options: ["always"]
function* x() {}
// Message: Missing return type annotation.

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
() => { return 3; }
// Message: Missing return type annotation.

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
async () => { return 4; }
// Message: Missing return type annotation.

// Options: ["always",{"includeOnlyMatching":["bar"]}]
function foo() { return 42; }
function bar() { return 42; }
// Message: Missing return type annotation.

// Options: ["always",{"includeOnlyMatching":["bar"]}]
const foo = () => { return 42; };
const bar = () => { return 42; }
// Message: Missing return type annotation.
```

The following patterns are not considered problems:

```js
return;

(foo): string => {}

// Options: ["always"]
(foo): string => {}

(foo) => { return; }

(foo): Object => ( {} )

(foo) => { return undefined; }

(foo) => { return void 0; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): void => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return undefined; }

// Options: ["always",{"annotateUndefined":"never"}]
(foo) => { return void 0; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): undefined => { return undefined; }

// Options: ["always",{"annotateUndefined":"always"}]
(foo): void => { return void 0; }

// Options: ["always"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
(foo) => { return 1; }

// Options: ["always",{"annotateUndefined":"always"}]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
(foo) => { return undefined; }

// Options: ["always",{"annotateUndefined":"always"}]
async function doThing(): Promise<void> {}

// Options: ["always",{"annotateUndefined":"always"}]
function* doThing(): Generator<number, void, void> { yield 2; }

// Options: ["always",{"annotateUndefined":"always","excludeMatching":["constructor"]}]
class Test { constructor() { } }

class Test { constructor() { } }

// Options: ["always",{"excludeMatching":["foo"]}]
class Test { foo() { return 42; } }

// Options: ["always",{"excludeMatching":["foo"]}]
class Test { foo = () => { return 42; } }

// Options: ["always",{"excludeMatching":["foo"]}]
class Test { foo = () => 42; }

class Test { foo = (): number => { return 42; } }

class Test { foo = (): number => 42; }

async (foo): Promise<number> => { return 3; }

// Options: ["always",{"excludeArrowFunctions":true}]
() => 3

// Options: ["always",{"excludeArrowFunctions":true}]
() => { return 4; }

// Options: ["always",{"excludeArrowFunctions":true}]
() => undefined

// Options: ["always",{"annotateUndefined":"always","excludeArrowFunctions":true}]
() => undefined

// Options: ["always",{"annotateUndefined":"always","excludeArrowFunctions":true}]
() => { return undefined; }

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
() => 3

// Options: ["always",{"excludeArrowFunctions":"expressionsOnly"}]
async () => 3

// Options: ["always",{"excludeMatching":["foo"]}]
function foo() { return 42; }

// Options: ["always",{"includeOnlyMatching":["bar"]}]
function foo() { return 42; }

// Options: ["always",{"excludeMatching":["bar"]}]
function foo(): number { return 42; }
function bar() { return 42; }

// Options: ["always",{"includeOnlyMatching":["foo","baz"]}]
function foo(): number { return 42; }
function bar() { return 42; }

// Options: ["always",{"excludeMatching":["^b.*","qux"]}]
function foo(): number { return 42; }
function bar() { return 42; }

// Options: ["always",{"includeOnlyMatching":["^f.*"]}]
function foo(): number { return 42; }
function bar() { return 42; }
```



<a name="eslint-plugin-flowtype-rules-require-types-at-top"></a>
### <code>require-types-at-top</code>

Requires all type declarations to be at the top of the file, after any import declarations.

<a name="eslint-plugin-flowtype-rules-require-types-at-top-options"></a>
#### Options

The rule has a string option:

* `"never"`
* `"always"`

The default value is `"always"`.

<!-- assertions require-types-at-top -->

<a name="eslint-plugin-flowtype-rules-require-valid-file-annotation"></a>
### <code>require-valid-file-annotation</code>

This rule validates Flow file annotations.

This rule can optionally report missing or missed placed annotations, common typos (e.g. `// @floww`), and enforce a consistant annotation style.

<a name="eslint-plugin-flowtype-rules-require-valid-file-annotation-options"></a>
#### Options

The rule has a string option:

* `"never"` (default): Never report files that are missing an `@flow` annotation.
* `"always"`: Always report files that are missing an `@flow` annotation

This rule has an object option:

* `"annotationStyle"` - Enforce a consistant file annotation style.
    * `"none"` (default): Either annotation style is accepted.
    * `"line"`: Require single line annotations (i.e. `// @flow`).
    * `"block"`: Require block annotations (i.e. `/* @flow */`).

```js
{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always"
    ]
  }
}

{
  "rules": {
    "flowtype/require-valid-file-annotation": [
      2,
      "always", {
        "annotationStyle": "block"
      }
    ]
  }
}
```

The following patterns are considered problems:

```js
;// @flow
// Message: Flow file annotation not at the top of the file.

;
// @flow
// Message: Flow file annotation not at the top of the file.

// @Flow
// Message: Malformed Flow file annotation.

// @NoFlow
// Message: Malformed Flow file annotation.

// @Noflow
// Message: Malformed Flow file annotation.

// @floweeeeeee
// Message: Misspelled or malformed Flow file annotation.

// @nofloweeeeeee
// Message: Misspelled or malformed Flow file annotation.

// Options: ["always"]
a;
// Message: Flow file annotation is missing.

// Options: ["always",{"annotationStyle":"line"}]
/* @flow */
// Message: Flow file annotation style must be `// @flow`

// Options: ["always",{"annotationStyle":"block"}]
// @flow
// Message: Flow file annotation style must be `/* @flow */`

// Options: ["always",{"annotationStyle":"line"}]
/* @noflow */
// Message: Flow file annotation style must be `// @noflow`

// Options: ["always",{"annotationStyle":"block"}]
// @noflow
// Message: Flow file annotation style must be `/* @noflow */`

// Options: ["always"]
a;
// Message: Flow file annotation is missing.

// Options: ["always",{"annotationStyle":"block"}]
a;
// Message: Flow file annotation is missing.
```

The following patterns are not considered problems:

```js
a;

// @flow
a;

//@flow
a;

//**@flow
a;

/* foo @flow bar */
a;



// @flow
a;

// @flow
// @FLow

// @noflow
a;

// Options: ["always"]
// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
a;

// Options: ["always",{"annotationStyle":"line"}]
// @flow

// Options: ["never",{"annotationStyle":"none"}]
// @function

// Options: ["never"]
// @fixable

// Options: ["always",{"annotationStyle":"block"}]
/* @flow */
```



<a name="eslint-plugin-flowtype-rules-require-variable-type"></a>
### <code>require-variable-type</code>

Requires that all variable declarators have type annotations.

<a name="eslint-plugin-flowtype-rules-require-variable-type-options"></a>
#### Options

You can exclude variables that match a certain regex by using `excludeVariableMatch`.

This excludes all parameters that start with an underscore (`_`).
The default pattern is `a^`, which doesn't match anything, i.e., all parameters are checked.

```js
{
    "rules": {
        "flowtype/require-variable-type": [
            2,
            {
              "excludeVariableMatch": "^_"
            }
        ]
    }
}
```


You can choose specific variable types (`var`, `let`, and `const`) to ignore using `excludeVariableTypes`.

This excludes `var` and `let` declarations from needing type annotations, but forces `const` declarations to have it.
By default, all declarations are checked.

```js
{
    "rules": {
        "flowtype/require-variable-type": [
            2,
            {
              "excludeVariableTypes": {
                "var": true,
                "let": true,
                "const": false,
              }
            }
        ]
    }
}
```



The following patterns are considered problems:

```js
var foo = "bar"
// Message: Missing "foo" variable type annotation.

var foo : string = "bar", bar = 1
// Message: Missing "bar" variable type annotation.

// Options: [{"excludeVariableMatch":"^_"}]
var _foo = "bar", bar = 1
// Message: Missing "bar" variable type annotation.

// Options: [{"excludeVariableTypes":{"let":false,"var":true}}]
var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"
// Message: Missing "hey" variable type annotation.
```

The following patterns are not considered problems:

```js
var foo : string = "bar"

var foo : string = "bar", bar : number = 1

// Options: [{"excludeVariableMatch":"^_"}]
var _foo = "bar", bar : number = 1

// Options: [{"excludeVariableTypes":{"var":true}}]
var foo = "bar", bar = 1

// Options: [{"excludeVariableTypes":{"let":true,"var":true}}]
var foo = "bar", bar = 1; const oob : string = "oob"; let hey = "yah"
```



<a name="eslint-plugin-flowtype-rules-semi"></a>
### <code>semi</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent use of semicolons after type aliases.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a semicolon after a type alias. If it is `'always'` then a problem is raised when there is no semicolon after a type alias.

The default value is `'always'`.

The following patterns are considered problems:

```js
// Options: []
type FooType = {}
// Message: Missing semicolon.

// Options: ["always"]
type FooType = {}
// Message: Missing semicolon.

// Options: ["never"]
type FooType = {};
// Message: Extra semicolon.
```

The following patterns are not considered problems:

```js
type FooType = {};

// Options: ["always"]
type FooType = {};

// Options: ["always"]
type FooType = { a: number;
 b: string;
 };

// Options: ["never"]
type FooType = { a: number;
 b: string;
 }

// Options: ["never"]
type FooType = {}

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type FooType = {}
```



<a name="eslint-plugin-flowtype-rules-sort-keys"></a>
### <code>sort-keys</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces sorting of Object annotations.

This rule mirrors ESlint's [sort-keys](http://eslint.org/docs/rules/sort-keys) rule.

<a name="eslint-plugin-flowtype-rules-sort-keys-options"></a>
#### Options

The first option specifies sort order.

* `"asc"` (default) - enforce ascending sort order.
* `"desc"` - enforce descending sort order.

The second option takes an object with two possible properties.

* `caseSensitive` - if `true`, enforce case-sensitive sort order. Default is `true`.
* `natural` - if `true`, enforce [natural sort order](https://en.wikipedia.org/wiki/Natural_sort_order). Default is `false`.

```js
{
  "rules": {
    "flowtype/sort-keys": [
      2,
      "asc", {
        "caseSensitive": true,
        "natural": false
      }
    ]
  }
}
```

The following patterns are considered problems:

```js
type FooType = { a: number, c: number, b: string }
// Message: Expected type annotations to be in ascending order. "b" should be before "c".

type FooType = { a: number, b: number, C: number }
// Message: Expected type annotations to be in ascending order. "C" should be before "b".

type FooType = { 1: number, 2: number, 10: number }
// Message: Expected type annotations to be in ascending order. "10" should be before "2".

// Options: ["desc"]
type FooType = { a: number, b: number }
// Message: Expected type annotations to be in descending order. "b" should be before "a".

// Options: ["desc"]
type FooType = { C: number, b: number, a: string }
// Message: Expected type annotations to be in descending order. "b" should be before "C".

// Options: ["desc"]
type FooType = { 10: number, 2: number, 1: number }
// Message: Expected type annotations to be in descending order. "2" should be before "10".

// Options: ["asc",{"caseSensitive":false}]
type FooType = { a: number, c: number, C: number, b: string }
// Message: Expected type annotations to be in insensitive ascending order. "b" should be before "C".

// Options: ["asc",{"caseSensitive":false}]
type FooType = { a: number, C: number, c: number, b: string }
// Message: Expected type annotations to be in insensitive ascending order. "b" should be before "c".

// Options: ["asc",{"natural":true}]
type FooType = { 1: number, 10: number, 2: boolean }
// Message: Expected type annotations to be in natural ascending order. "2" should be before "10".

type FooType = { a: number, c: number, b: string }
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          a: number,
          c: number,
          b: string,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          +a: number,
          c: number,
          b: string,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          -a: number,
          c: number,
          b: string,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          a?: number,
          c: ?number,
          b: string,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          a: (number) => void,
          c: number,
          b: (param: string) => number,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          a: number | string | boolean,
          c: number,
          b: (param: string) => number,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".


        type FooType = {
          c: number,
          a: number | string | boolean,
          b: (param: string) => number,
        }
      
// Message: Expected type annotations to be in ascending order. "a" should be before "c".


        type FooType = {
          c: {
            z: number,
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b: (param: string) => number,
        }
      
// Message: Expected type annotations to be in ascending order. "x" should be before "z".
// Message: Expected type annotations to be in ascending order. "a" should be before "c".


        type FooType = {
          c: {
            z: {
              j: string,
              l: number,
              k: boolean,
            },
            x: string,
            y: boolean,
          },
          a: number | string | boolean,
          b: (param: string) => number,
        }
      
// Message: Expected type annotations to be in ascending order. "k" should be before "l".
// Message: Expected type annotations to be in ascending order. "x" should be before "z".
// Message: Expected type annotations to be in ascending order. "a" should be before "c".


        type FooType = {
          +c: number,
          -b: number,
          a: number,
        }
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".
// Message: Expected type annotations to be in ascending order. "a" should be before "b".


        type FooType = {|
          +c: number,
          -b: number,
          a: number,
        |}
      
// Message: Expected type annotations to be in ascending order. "b" should be before "c".
// Message: Expected type annotations to be in ascending order. "a" should be before "b".
```

The following patterns are not considered problems:

```js
type FooType = { a: number }

type FooType = { a: number, b: number, c: (boolean | number) }

type FooType = { C: number, a: string, b: foo }

type FooType = { 1: number, 10: number, 2: boolean }

// Options: ["desc"]
type FooType = { c: number, b: number, a: number }

// Options: ["desc"]
type FooType = { b: string, a: {}, C: number }

// Options: ["desc"]
type FooType = { 2: number, 10: number, 1: boolean }

// Options: ["asc",{"caseSensitive":false}]
type FooType = { a: number, b: number, c: number, C: number }

// Options: ["asc",{"caseSensitive":false}]
type FooType = { a: number, b: number, C: number, c: number }

// Options: ["asc",{"natural":true}]
type FooType = { 1:number, 2: number, 10: number }

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type FooType = { b: number, a: number }
```



<a name="eslint-plugin-flowtype-rules-space-after-type-colon"></a>
### <code>space-after-type-colon</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing after the type annotation colon.

<a name="eslint-plugin-flowtype-rules-space-after-type-colon-options"></a>
#### Options

This rule has a string argument.

* `"always"` (default): Require a space after the type annotation colon (e.g. foo: BarType).
* `"never"`: Require no spaces after the type annotation colon (e.g. foo:BarType).

This rule has an option object.

* `"allowLineBreak"` - Allow a line break to count as a space following the annotation colon.
    * `"true"`: Enable
    * `"false"`: Disable

{
  "rules": {
    "flowtype/space-after-type-colon": [
      2,
      "always", {
        "allowLineBreak": false
      }
    ]
  }
}

The following patterns are considered problems:

```js
// Options: ["never"]
(foo: string) => {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:  string) => {}
// Message: There must be 1 space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:(() => void)) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

// Options: ["never"]
(foo: (() => void)) => {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:  (() => void)) => {}
// Message: There must be 1 space after "foo" parameter type annotation colon.

({ lorem, ipsum, dolor } :   SomeType) => {}
// Message: There must be 1 space after "{ lorem, ipsum, dolor }" parameter type annotation colon.

(foo:{ a: string, b: number }) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

({ a, b } :{ a: string, b: number }) => {}
// Message: There must be a space after "{ a, b }" parameter type annotation colon.

([ a, b ] :string[]) => {}
// Message: There must be a space after "[ a, b ]" parameter type annotation colon.

(i?:number) => {}
// Message: There must be a space after "i" parameter type annotation colon.

(i?:  number) => {}
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
(i?: number) => {}
// Message: There must be no space after "i" parameter type annotation colon.

(foo:
  { a: string, b: number }) => {}
// Message: There must not be a line break after "foo" parameter type annotation colon.

(foo:
{ a: string, b: number }) => {}
// Message: There must not be a line break after "foo" parameter type annotation colon.

(foo: 
{ a: string, b: number }) => {}
// Message: There must not be a line break after "foo" parameter type annotation colon.

// Options: ["always"]
():Object => {}
// Message: There must be a space after return type colon.

// Options: ["never"]
(): Object => {}
// Message: There must be no space after return type colon.

// Options: ["always"]
():  Object => {}
// Message: There must be 1 space after return type colon.

// Options: ["always"]
():(() => void) => {}
// Message: There must be a space after return type colon.

// Options: ["never"]
(): (() => void) => {}
// Message: There must be no space after return type colon.

// Options: ["always"]
():  (() => void) => {}
// Message: There must be 1 space after return type colon.

// Options: ["never"]
export default function (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["never"]
function foo (foo: string) {}
// Message: There must be no space after "foo" parameter type annotation colon.

// Options: ["always"]
(foo:string) => {}
// Message: There must be a space after "foo" parameter type annotation colon.

function foo (foo:string) {}
// Message: There must be a space after "foo" parameter type annotation colon.

async function foo({ lorem, ipsum, dolor }:SomeType) {}
// Message: There must be a space after "{ lorem, ipsum, dolor }" parameter type annotation colon.

function x(i?:number) {}
// Message: There must be a space after "i" parameter type annotation colon.

function x(i?:  number) {}
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
function x(i?: number) {}
// Message: There must be no space after "i" parameter type annotation colon.

function a():x {}
// Message: There must be a space after return type colon.

// Options: ["always"]
function a():  x {}
// Message: There must be 1 space after return type colon.

// Options: ["never"]
function a(): x {}
// Message: There must be no space after return type colon.

type X = (foo:number) => string
// Message: There must be a space after "foo" parameter type annotation colon.

// Options: ["never"]
type X = (foo: number) => string
// Message: There must be no space after "foo" parameter type annotation colon.

type X = (foo:  number) => string
// Message: There must be 1 space after "foo" parameter type annotation colon.

type X = (foo:?number) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:(number)) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:((number))) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type X = (foo:  ((number))) => string
// Message: There must be 1 space after "foo" parameter type annotation colon.

// Options: ["never"]
type X = (foo: ((number))) => string
// Message: There must be no space after "foo" parameter type annotation colon.

type X = (foo:?(number)) => string
// Message: There must be a space after "foo" parameter type annotation colon.

type TArrayPredicate = (el: T, i?:number) => boolean
// Message: There must be a space after "i" parameter type annotation colon.

type TArrayPredicate = (el: T, i?:  number) => boolean
// Message: There must be 1 space after "i" parameter type annotation colon.

// Options: ["never"]
type TArrayPredicate = (el:T, i?: number) => boolean
// Message: There must be no space after "i" parameter type annotation colon.

class X { foo:string }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { foo: string }
// Message: There must be no space after "foo" class property type annotation colon.

class X { foo:?string }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { foo: ?string }
// Message: There must be no space after "foo" class property type annotation colon.

class X { static foo:number }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { static foo: number }
// Message: There must be no space after "foo" class property type annotation colon.

class X { static foo :number }
// Message: There must be a space after "foo" class property type annotation colon.

// Options: ["never"]
class X { static foo : number }
// Message: There must be no space after "foo" class property type annotation colon.

declare class X { static foo:number }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
declare class X { static foo: number }
// Message: There must be no space after "foo" type annotation colon.

declare class X { static foo :number }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
declare class X { static foo : number }
// Message: There must be no space after "foo" type annotation colon.

class X { +foo:string }
// Message: There must be a space after "foo" class property type annotation colon.

class X { +foo:  string }
// Message: There must be 1 space after "foo" class property type annotation colon.

// Options: ["never"]
class X { +foo: string }
// Message: There must be no space after "foo" class property type annotation colon.

class X { static +foo:string }
// Message: There must be a space after "foo" class property type annotation colon.

class X { static +foo:  string }
// Message: There must be 1 space after "foo" class property type annotation colon.

// Options: ["never"]
class X { static +foo: string }
// Message: There must be no space after "foo" class property type annotation colon.

type X = { foo:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["always"]
type X = { foo:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
type X = { foo: string }
// Message: There must be no space after "foo" type annotation colon.

type X = { foo:  string }
// Message: There must be 1 space after "foo" type annotation colon.

type X = { foo?:string }
// Message: There must be a space after "foo" type annotation colon.

// Options: ["never"]
type X = { foo?: string }
// Message: There must be no space after "foo" type annotation colon.

type X = { foo?:?string }
// Message: There must be a space after "foo" type annotation colon.

type X = { foo?:  ?string }
// Message: There must be 1 space after "foo" type annotation colon.

type Foo = { barType:(string | () => void) }
// Message: There must be a space after "barType" type annotation colon.

type Foo = { barType:(((string | () => void))) }
// Message: There must be a space after "barType" type annotation colon.

// Options: ["never"]
type Foo = { barType: (string | () => void) }
// Message: There must be no space after "barType" type annotation colon.

type Foo = { barType:  (string | () => void) }
// Message: There must be 1 space after "barType" type annotation colon.

type Foo = { barType:  ((string | () => void)) }
// Message: There must be 1 space after "barType" type annotation colon.

type X = { get:() => A; }
// Message: There must be a space after "get" type annotation colon.

type X = { get:<X>() => A; }
// Message: There must be a space after "get" type annotation colon.

// Options: ["never"]
type X = { get: () => A; }
// Message: There must be no space after "get" type annotation colon.

// Options: ["never"]
type X = { get: <X>() => A; }
// Message: There must be no space after "get" type annotation colon.

type X = { get:  () => A; }
// Message: There must be 1 space after "get" type annotation colon.

type X = { get:  <X>() => A; }
// Message: There must be 1 space after "get" type annotation colon.

type X = { +foo:string }
// Message: There must be a space after "foo" type annotation colon.

type X = { +foo:  string }
// Message: There must be 1 space after "foo" type annotation colon.

// Options: ["never"]
type X = { +foo: string }
// Message: There must be no space after "foo" type annotation colon.

type X = { +foo?:string }
// Message: There must be a space after "foo" type annotation colon.

type X = { +foo?:  string }
// Message: There must be 1 space after "foo" type annotation colon.

// Options: ["never"]
type X = { +foo?: string }
// Message: There must be no space after "foo" type annotation colon.

// Options: ["always"]
type X = { [a:b]: c }
// Message: There must be a space after type annotation colon.

// Options: ["never"]
type X = { [a: b]:c }
// Message: There must be no space after type annotation colon.

// Options: ["always"]
type X = { [a:    b]: c }
// Message: There must be 1 space after type annotation colon.

// Options: ["always"]
type X = { +[a:b]: c }
// Message: There must be a space after type annotation colon.

// Options: ["never"]
type X = { +[a: b]:c }
// Message: There must be no space after type annotation colon.

// Options: ["always"]
type X = { +[a:    b]: c }
// Message: There must be 1 space after type annotation colon.

// Options: ["always"]
type X = { [a: b]:c }
// Message: There must be a space after type annotation colon.

// Options: ["never"]
type X = { [a:b]: c }
// Message: There must be no space after type annotation colon.

// Options: ["always"]
type X = { [a: b]:    c }
// Message: There must be 1 space after type annotation colon.

// Options: ["always"]
type X = { [a:b]:c }
// Message: There must be a space after type annotation colon.
// Message: There must be a space after type annotation colon.

// Options: ["never"]
type X = { [a: b]: c }
// Message: There must be no space after type annotation colon.
// Message: There must be no space after type annotation colon.

// Options: ["always"]
type X = { [a:  b]:  c }
// Message: There must be 1 space after type annotation colon.
// Message: There must be 1 space after type annotation colon.

// Options: ["always"]
type X = { [a:(b)]:(c) }
// Message: There must be a space after type annotation colon.
// Message: There must be a space after type annotation colon.

// Options: ["never"]
type X = { [a: (b)]: (c) }
// Message: There must be no space after type annotation colon.
// Message: There must be no space after type annotation colon.

// Options: ["never"]
const x = ({}: {})
// Message: There must be no space after type cast colon.

// Options: ["always"]
const x = ({}:{})
// Message: There must be a space after type cast colon.

// Options: ["always"]
const x = ({}:  {})
// Message: There must be 1 space after type cast colon.

// Options: ["never"]
((x): (string))
// Message: There must be no space after type cast colon.

// Options: ["always"]
((x):(string))
// Message: There must be a space after type cast colon.

// Options: ["always"]
((x):  (string))
// Message: There must be 1 space after type cast colon.

// Options: ["always"]
const x:number = 7;
// Message: There must be a space after const type annotation colon.

// Options: ["always"]
let x:number = 42;
// Message: There must be a space after let type annotation colon.

// Options: ["always"]
var x:number = 42;
// Message: There must be a space after var type annotation colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

(foo: (string|number)) => {}

// Options: ["never"]
(foo:string) => {}

// Options: ["always"]
(foo: string) => {}

// Options: ["never"]
(foo:(() => void)) => {}

// Options: ["always"]
(foo: (() => void)) => {}

({ lorem, ipsum, dolor }: SomeType) => {}

(foo: { a: string, b: number }) => {}

({ a, b }: ?{ a: string, b: number }) => {}

([ a, b ]: string[]) => {}

(i?: number) => {}

// Options: ["never"]
(i?:number) => {}

// Options: ["always",{"allowLineBreak":true}]
(foo:
  { a: string, b: number }) => {}

// Options: ["always",{"allowLineBreak":true}]
(foo:
  { a: string, b: number }) => {}

// Options: ["never"]
():Object => {}

// Options: ["always"]
(): Object => {}

// Options: ["never"]
():(number | string) => {}

// Options: ["always"]
(): (number | string) => {}

// Options: ["never"]
():number|string => {}

// Options: ["always"]
(): number|string => {}

// Options: ["never"]
():(() => void) => {}

// Options: ["always"]
(): (() => void) => {}

// Options: ["never"]
():( () => void ) => {}

// Options: ["always"]
(): ( () => void ) => {}

(): { a: number, b: string } => {}

// Options: ["never"]
() :{ a:number, b:string } => {}

function x(foo: string) {}

class Foo { constructor(foo: string) {} }

// Options: ["never"]
function x(foo:string) {}

// Options: ["never"]
class Foo { constructor(foo:string) {} }

async function foo({ lorem, ipsum, dolor }: SomeType) {}

function x({ a, b }: { a: string, b: number }) {}

function x(i?: number) {}

// Options: ["never"]
function x(i?:number) {}

function a(): x {}

// Options: ["never"]
function a():x {}

function a(): (number | string) {}

// Options: ["never"]
function a() :(number | string) {}

type X = (foo: number) => string;

type X = (foo : number) => string;

type X = (foo: ?number) => string;

type X = (foo? : ?number) => string;

type X = (foo: ?{ x: number }) => string;

// Options: ["never"]
type X = (foo:number) => string;

// Options: ["never"]
type X = (foo:?{ x:number }) => string;

type X = (foo: (number)) => string

type X = (foo: ((number))) => string

// Options: ["never"]
type X = (foo:((number))) => string

type X = ?(foo: ((number))) => string

// Options: ["never"]
type X = ?(foo:((number))) => string

type TArrayPredicate = (el: T, i?: number) => boolean

// Options: ["never"]
type TArrayPredicate = (el:T, i?:number) => boolean

type X = (number) => string;

type X = (?number) => string;

type X = number => string;

type X = ?number => string;

type X = ({ foo: bar }) => string;

// Options: ["always"]
type X = (number) => string;

// Options: ["always"]
type X = (?number) => string;

// Options: ["always"]
type X = number => string;

// Options: ["always"]
type X = ?number => string;

// Options: ["always"]
type X = ({ foo: bar }) => string;

class Foo { bar }

class Foo { bar = 3 }

class Foo { bar: string }

class Foo { bar: ?string }

// Options: ["never"]
class Foo { bar:string }

// Options: ["never"]
class Foo { bar:?string }

class X { static foo : number }

// Options: ["never"]
class X { static foo :number }

declare class X { static foo : number }

// Options: ["never"]
declare class X { static foo :number }

class X { +foo: string }

class X { static +foo: string }

// Options: ["never"]
class X { +foo:string }

// Options: ["never"]
class X { static +foo:string }

type X = { foo: string }

// Options: ["never"]
type X = { foo:string }

type X = { foo?: string }

type X = { foo?: ?string }

// Options: ["never"]
type X = { foo?:?string }

type Foo = { barType: (string | () => void) }

type Foo = { barType: ((string | () => void)) }

// Options: ["never"]
type Foo = { barType:(string | () => void) }

// Options: ["never"]
type Foo = { barType:((string | () => void)) }

type X = { get(): A; }

type X = { get<X>(): A; }

// Options: ["never"]
type X = { get(): A; }

// Options: ["never"]
type X = { get<X>(): A; }

type X = { get: () => A; }

type X = { get: <X>() => A; }

// Options: ["never"]
type X = { get:() => A; }

// Options: ["never"]
type X = { get:<X>() => A; }

type X = { +foo: string }

type X = { +foo?: string }

// Options: ["never"]
type X = { +foo:string }

// Options: ["never"]
type X = { +foo?:string }

// Options: ["always"]
type X = { [a: b]: c }

// Options: ["never"]
type X = { [a:b]:c }

// Options: ["always"]
type X = { +[a: b]: c }

// Options: ["never"]
type X = { +[a:b]:c }

// Options: ["always"]
type X = { [string]: c }

// Options: ["never"]
type X = { [string]:c }

// Options: ["never"]
const x = ({}:{})

// Options: ["always"]
const x = ({}: {})

// Options: ["never"]
((x):(string))

// Options: ["always"]
((x): (string))

// Options: ["always"]
const x: number = 7;

// Options: ["always"]
let x: number = 42;

// Options: ["always"]
var x: number = 42;
```



<a name="eslint-plugin-flowtype-rules-space-before-generic-bracket"></a>
### <code>space-before-generic-bracket</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the opening `<` of generic type annotation parameters.

This rule takes one argument. If it is `'never'` then a problem is raised when there is a space before the `<`. If it is `'always'` then a problem is raised when there is no space before the `<`.

The default value is `'never'`.

The following patterns are considered problems:

```js
type X = Promise <string>
// Message: There must be no space before "Promise" generic type annotation bracket

// Options: ["never"]
type X = Promise <string>
// Message: There must be no space before "Promise" generic type annotation bracket

type X = Promise  <string>
// Message: There must be no space before "Promise" generic type annotation bracket

// Options: ["always"]
type X = Promise<string>
// Message: There must be a space before "Promise" generic type annotation bracket

// Options: ["always"]
type X = Promise  <string>
// Message: There must be one space before "Promise" generic type annotation bracket
```

The following patterns are not considered problems:

```js
type X = Promise<string>

// Options: ["always"]
type X = Promise <string>
```



<a name="eslint-plugin-flowtype-rules-space-before-type-colon"></a>
### <code>space-before-type-colon</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing before the type annotation colon.

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space before the type annotation colon. If it is `'never'` then a problem is raised when there is a space before the type annotation colon. The default value is `'never'`.

The following patterns are considered problems:

```js
// Options: ["never"]
(foo : string) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["never"]
(foo ? : string) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo  : string) => {}
// Message: There must be 1 space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo?: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo ?  : string) => {}
// Message: There must be 1 space before "foo" parameter type annotation colon.

// Options: ["always"]
(foo  ?: string) => {}
// Message: There must be a space before "foo" parameter type annotation colon.

({ lorem, ipsum, dolor } : SomeType) => {}
// Message: There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.

(foo : { a: string, b: number }) => {}
// Message: There must be no space before "foo" parameter type annotation colon.

({ a, b } : { a: string, b: number }) => {}
// Message: There must be no space before "{ a, b }" parameter type annotation colon.

([ a, b ] : string[]) => {}
// Message: There must be no space before "[ a, b ]" parameter type annotation colon.

() : x => {}
// Message: There must be no space before return type colon.

// Options: ["always"]
(): x => {}
// Message: There must be a space before return type colon.

// Options: ["always"]
()  : x => {}
// Message: There must be 1 space before return type colon.

function x(foo : string) {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
function x(foo: string) {}
// Message: There must be a space before "foo" parameter type annotation colon.

var x = function (foo : string) {}
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
var x = function (foo: string) {}
// Message: There must be a space before "foo" parameter type annotation colon.

class Foo { constructor(foo : string ) {} }
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
class Foo { constructor(foo: string ) {} }
// Message: There must be a space before "foo" parameter type annotation colon.

async function foo({ lorem, ipsum, dolor } : SomeType) {}
// Message: There must be no space before "{ lorem, ipsum, dolor }" parameter type annotation colon.

function a() : x {}
// Message: There must be no space before return type colon.

// Options: ["always"]
function a(): x {}
// Message: There must be a space before return type colon.

// Options: ["always"]
function a()  : x {}
// Message: There must be 1 space before return type colon.

type X = (foo :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo:string) => string;
// Message: There must be a space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo  :string) => string;
// Message: There must be 1 space before "foo" parameter type annotation colon.

type X = (foo? :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

type X = (foo?     :string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

// Options: ["always"]
type X = (foo?:string) => string;
// Message: There must be a space before "foo" parameter type annotation colon.

type X = (foo? :?string) => string;
// Message: There must be no space before "foo" parameter type annotation colon.

class X { foo :string }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { foo: string }
// Message: There must be a space before "foo" class property type annotation colon.

class X { foo :?string }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { foo: ?string }
// Message: There must be a space before "foo" class property type annotation colon.

class X { static foo : number }
// Message: There must be no space before "foo" class property type annotation colon.

class X { static foo :number }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static foo: number }
// Message: There must be a space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static foo:number }
// Message: There must be a space before "foo" class property type annotation colon.

declare class Foo { static bar :number; }
// Message: There must be no space before "bar" type annotation colon.

declare class Foo { static bar : number; }
// Message: There must be no space before "bar" type annotation colon.

// Options: ["always"]
declare class Foo { static bar:number; }
// Message: There must be a space before "bar" type annotation colon.

// Options: ["always"]
declare class Foo { static bar: number; }
// Message: There must be a space before "bar" type annotation colon.

// Options: ["always"]
class X { +foo: string }
// Message: There must be a space before "foo" class property type annotation colon.

// Options: ["always"]
class X { +foo  : string }
// Message: There must be 1 space before "foo" class property type annotation colon.

// Options: ["never"]
class X { +foo : string }
// Message: There must be no space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static +foo: string }
// Message: There must be a space before "foo" class property type annotation colon.

// Options: ["always"]
class X { static +foo  : string }
// Message: There must be 1 space before "foo" class property type annotation colon.

// Options: ["never"]
class X { static +foo : string }
// Message: There must be no space before "foo" class property type annotation colon.

type X = { foo : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["never"]
type X = { foo : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo  : string }
// Message: There must be 1 space before "foo" type annotation colon.

type X = { foo? : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo?: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo?  : string }
// Message: There must be 1 space before "foo" type annotation colon.

// Options: ["always"]
type X = { foo   ?: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { +foo: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { +foo  : string }
// Message: There must be 1 space before "foo" type annotation colon.

// Options: ["never"]
type X = { +foo : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { +foo?: string }
// Message: There must be a space before "foo" type annotation colon.

// Options: ["always"]
type X = { +foo?  : string }
// Message: There must be 1 space before "foo" type annotation colon.

// Options: ["never"]
type X = { +foo? : string }
// Message: There must be no space before "foo" type annotation colon.

// Options: ["always"]
type X = { [a: b] : c }
// Message: There must be a space before type annotation colon.

// Options: ["never"]
type X = { [a : b]: c }
// Message: There must be no space before type annotation colon.

// Options: ["always"]
type X = { [a  : b] : c }
// Message: There must be 1 space before type annotation colon.

// Options: ["always"]
type X = { +[a:b] : c }
// Message: There must be a space before type annotation colon.

// Options: ["never"]
type X = { +[a : b]: c }
// Message: There must be no space before type annotation colon.

// Options: ["always"]
type X = { +[a  : b] : c }
// Message: There must be 1 space before type annotation colon.

// Options: ["always"]
type X = { [a : b]: c }
// Message: There must be a space before type annotation colon.

// Options: ["never"]
type X = { [a: b] : c }
// Message: There must be no space before type annotation colon.

// Options: ["always"]
type X = { [a : b]  : c }
// Message: There must be 1 space before type annotation colon.

// Options: ["always"]
type X = { [a:b]:c }
// Message: There must be a space before type annotation colon.
// Message: There must be a space before type annotation colon.

// Options: ["never"]
type X = { [a : b] : c }
// Message: There must be no space before type annotation colon.
// Message: There must be no space before type annotation colon.

// Options: ["always"]
type X = { [a  : b]  : c }
// Message: There must be 1 space before type annotation colon.
// Message: There must be 1 space before type annotation colon.

// Options: ["always"]
type X = { [a:(b)]:(c) }
// Message: There must be a space before type annotation colon.
// Message: There must be a space before type annotation colon.

// Options: ["never"]
type X = { [a : (b)] : (c) }
// Message: There must be no space before type annotation colon.
// Message: There must be no space before type annotation colon.

// Options: ["never"]
const x = ({} :{})
// Message: There must be no space before type cast colon.

// Options: ["always"]
const x = ({}:{})
// Message: There must be a space before type cast colon.

// Options: ["always"]
const x = ({}  :{})
// Message: There must be 1 space before type cast colon.

// Options: ["never"]
((x) : string)
// Message: There must be no space before type cast colon.

// Options: ["always"]
((x): string)
// Message: There must be a space before type cast colon.

// Options: ["always"]
((x)  : string)
// Message: There must be 1 space before type cast colon.

// Options: ["always"]
const x:number = 7;
// Message: There must be a space before const type annotation colon.

// Options: ["always"]
let x:number = 42;
// Message: There must be a space before let type annotation colon.

// Options: ["always"]
var x:number = 42;
// Message: There must be a space before var type annotation colon.
```

The following patterns are not considered problems:

```js
(foo) => {}

(foo: string) => {}

(foo?: string) => {}

(foo ?: string) => {}

// Options: ["never"]
(foo: string) => {}

// Options: ["always"]
(foo : string) => {}

// Options: ["always"]
(foo? : string) => {}

// Options: ["always"]
(foo ? : string) => {}

// Options: ["always"]
(foo  ? : string) => {}

({ lorem, ipsum, dolor }: SomeType) => {}

(foo: { a: string, b: number }) => {}

({ a, b }: ?{ a: string, b: number }) => {}

(): { a: number, b: string } => {}

// Options: ["always"]
() : { a : number, b : string } => {}

([ a, b ]: string[]) => {}

(): x => {}

// Options: ["always"]
() : x => {}

(): (number | string) => {}

// Options: ["always"]
() : (number | string) => {}

function x(foo: string) {}

// Options: ["always"]
function x(foo : string) {}

var x = function (foo: string) {}

// Options: ["always"]
var x = function (foo : string) {}

class X { foo({ bar }: Props = this.props) {} }

class Foo { constructor(foo: string ) {} }

// Options: ["always"]
class Foo { constructor(foo : string ) {} }

async function foo({ lorem, ipsum, dolor }: SomeType) {}

function x({ a, b }: { a: string, b: number }) {}

function a(): x {}

// Options: ["always"]
function a() : x {}

function a(): (number | string) {}

// Options: ["always"]
function a() : (number | string) {}

type X = (foo:string) => number;

type X = (foo: string) => number;

type X = (foo: ?string) => number;

type X = (foo?: string) => number;

type X = (foo?: ?string) => number;

type X = (foo   ?: string) => number;

// Options: ["always"]
type X = (foo? : string) => number

// Options: ["always"]
type X = (foo? : ?string) => number

type X = (number) => string;

type X = (?number) => string;

type X = number => string;

type X = ?number => string;

type X = ({ foo: bar }) => string;

// Options: ["always"]
type X = (number) => string;

// Options: ["always"]
type X = (?number) => string;

// Options: ["always"]
type X = number => string;

// Options: ["always"]
type X = ?number => string;

// Options: ["always"]
type X = ({ foo : bar }) => string;

class Foo { bar }

class Foo { bar = 3 }

class Foo { bar: string }

class Foo { bar: ?string }

class Foo { bar:?string }

// Options: ["always"]
class Foo { bar : string }

class X { static foo:number }

class X { static foo: number }

// Options: ["always"]
class X { static foo :number }

// Options: ["always"]
class X { static foo : number }

declare class Foo { static bar:number; }

// Options: ["always"]
declare class Foo { static bar :number; }

declare class Foo { static bar: number; }

// Options: ["always"]
declare class Foo { static bar : number; }

class X { +foo: string }

class X { static +foo: string }

// Options: ["always"]
class X { +foo : string }

// Options: ["always"]
class X { static +foo : string }

type X = { foo: string }

// Options: ["always"]
type X = { foo : string }

type X = { foo?: string }

type X = { foo   ?: string }

// Options: ["always"]
type X = { foo? : string }

type X = { +foo: string }

type X = { +foo?: string }

// Options: ["always"]
type X = { +foo : string }

// Options: ["always"]
type X = { +foo? : string }

// Options: ["always"]
type X = { [a : b] : c }

// Options: ["never"]
type X = { [a:b]:c }

// Options: ["always"]
type X = { [string] : c }

// Options: ["never"]
type X = { [string]:c }

// Options: ["always"]
type X = { +[a : b] : c }

// Options: ["never"]
type X = { +[a:b]:c }

// Options: ["always"]
type X = { [a : (b)] : (c) }

// Options: ["never"]
type X = { [a:(b)]:(c) }

// Options: ["never"]
const x = ({}:{})

// Options: ["always"]
const x = ({} :{})

// Options: ["never"]
((x): string)

// Options: ["always"]
((x) : string)

// Options: ["always"]
const x :number = 7;

// Options: ["always"]
let x :number = 42;

// Options: ["always"]
var x :number = 42;
```



<a name="eslint-plugin-flowtype-rules-type-id-match"></a>
### <code>type-id-match</code>

Enforces a consistent naming pattern for type aliases.

<a name="eslint-plugin-flowtype-rules-type-id-match-options"></a>
#### Options

This rule needs a text RegExp to operate with Its signature is as follows:

```js
{
    "rules": {
        "flowtype/type-id-match": [
            2,
            "^([A-Z][a-z0-9]*)+Type$"
        ]
    }
}
```

`'^([A-Z][a-z0-9]*)+Type$'` is the default pattern.

The following patterns are considered problems:

```js
type foo = {};
// Message: Type identifier 'foo' does not match pattern '/^([A-Z][a-z0-9]*)+Type$/'.

// Options: ["^foo$"]
type FooType = {};
// Message: Type identifier 'FooType' does not match pattern '/^foo$/'.
```

The following patterns are not considered problems:

```js
type FooType = {};

// Options: ["^foo$"]
type foo = {};

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type foo = {};
```



<a name="eslint-plugin-flowtype-rules-type-import-style"></a>
### <code>type-import-style</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces a particular style for type imports:

```
// 'identifier' style
import {type T, type U, type V} from '...';

// 'declaration' style
import type {T, U, V} from '...';
```

The rule has a string option:

* `"identifier"` (default): Enforces that type imports are all in the
  'identifier' style.
* `"declaration"`: Enforces that type imports are all in the 'declaration'
  style.

The following patterns are considered problems:

```js
import type {A, B} from 'a';
// Message: Unexpected "import type"

// Options: ["identifier"]
import type {A, B} from 'a';
// Message: Unexpected "import type"

// Options: ["identifier"]
import type {A, B as C} from 'a';
// Message: Unexpected "import type"

// Options: ["identifier"]
import type A from 'a';
// Message: Unexpected "import type"

// Options: ["declaration"]
import {type A, type B} from 'a';
// Message: Unexpected type import
// Message: Unexpected type import
```

The following patterns are not considered problems:

```js
import {type A, type B} from 'a';

// Options: ["identifier"]
import {type A, type B} from 'a';

// Options: ["declaration"]
import type {A, B} from 'a';
```



<a name="eslint-plugin-flowtype-rules-union-intersection-spacing"></a>
### <code>union-intersection-spacing</code>

_The `--fix` option on the command line automatically fixes problems reported by this rule._

Enforces consistent spacing around union and intersection type separators (`|` and `&`).

This rule takes one argument. If it is `'always'` then a problem is raised when there is no space around the separator. If it is `'never'` then a problem is raised when there is a space around the separator.

The default value is `'always'`.

The following patterns are considered problems:

```js
type X = string| number;
// Message: There must be a space before union type annotation separator

// Options: ["always"]
type X = string| number;
// Message: There must be a space before union type annotation separator

type X = string |number;
// Message: There must be a space after union type annotation separator

type X = string|number;
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = {x: string}|{y: number};
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = string | number |boolean;
// Message: There must be a space after union type annotation separator

type X = string|number|boolean;
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

type X = (string)| number;
// Message: There must be a space before union type annotation separator

type X = ((string))|(number | foo);
// Message: There must be a space before union type annotation separator
// Message: There must be a space after union type annotation separator

// Options: ["never"]
type X = string |number;
// Message: There must be no space before union type annotation separator

// Options: ["never"]
type X = string| number;
// Message: There must be no space after union type annotation separator

type X = string& number;
// Message: There must be a space before intersection type annotation separator

// Options: ["always"]
type X = string& number;
// Message: There must be a space before intersection type annotation separator

type X = string &number;
// Message: There must be a space after intersection type annotation separator

type X = {x: string}&{y: number};
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = string&number;
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = string & number &boolean;
// Message: There must be a space after intersection type annotation separator

type X = string&number&boolean;
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

type X = (string)& number;
// Message: There must be a space before intersection type annotation separator

type X = ((string))&(number & foo);
// Message: There must be a space before intersection type annotation separator
// Message: There must be a space after intersection type annotation separator

// Options: ["never"]
type X = string &number;
// Message: There must be no space before intersection type annotation separator

// Options: ["never"]
type X = string& number;
// Message: There must be no space after intersection type annotation separator
```

The following patterns are not considered problems:

```js
type X = string | number;

type X = string | number | boolean;

type X = (string) | number;

type X = ((string)) | (number | foo);

// Options: ["never"]
type X = string|number

type X =
| string
| number

function x() {
type X =
| string
| number
}

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type X = string| number;

type X = string & number;

type X = string & number & boolean;

type X = (string) & number;

type X = ((string)) & (number & foo);

// Options: ["never"]
type X = string&number

type X =
& string
& number

function x() {
type X =
& string
& number
}

// Settings: {"flowtype":{"onlyFilesWithFlowAnnotation":true}}
type X = string& number;
```



<a name="eslint-plugin-flowtype-rules-use-flow-type"></a>
### <code>use-flow-type</code>

Marks Flow [type alias](https://flowtype.org/docs/type-aliases.html) declarations as used.

Used to suppress [`no-unused-vars`](http://eslint.org/docs/rules/no-unused-vars) errors that are triggered by type aliases.

The following patterns are not considered problems:

```js
declare class A {}
// Additional rules: {"no-unused-vars":1}

declare function A(): Y
// Additional rules: {"no-unused-vars":1}

declare module A {}
// Additional rules: {"no-unused-vars":1}

declare module A { declare var a: Y }
// Additional rules: {"no-unused-vars":1}

declare var A: Y
// Additional rules: {"no-unused-vars":1}

import type A from "a"; (function<T: A>(): T {})
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type A from "a"
// Additional rules: {"no-unused-vars":1}

import type {A} from "a"; (function<T: A>(): T {})
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type {A} from "a"
// Additional rules: {"no-unused-vars":1}

(function<T: A>(): T {}); import type {a as A} from "a"
// Additional rules: {"no-unused-vars":1}

type A = {}; function x<Y: A>(i: Y) { i }; x()
// Additional rules: {"no-unused-vars":1}

function x<Y: A>(i: Y) { i }; type A = {}; x()
// Additional rules: {"no-unused-vars":1}

type A = {}; function x<Y: A.B.C>(i: Y) { i }; x()
// Additional rules: {"no-unused-vars":1}

function x<Y: A.B.C>(i: Y) { i }; type A = {}; x()
// Additional rules: {"no-unused-vars":1}
```



<a name="eslint-plugin-flowtype-rules-valid-syntax"></a>
### <code>valid-syntax</code>

**Deprecated** Babylon (the Babel parser) v6.10.0 fixes parsing of the invalid syntax this plugin warned against.

Checks for simple Flow syntax errors.

