# babel-preset-minify

Babel preset for all minify plugins.

+ [Install](#install)
+ [Usage](#usage)
+ [Options](#options)

## Install

```sh
npm install --save-dev babel-preset-minify
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "presets": ["minify"]
}
```

or pass in options -

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["MyCustomError"]
    },
    "unsafe": {
      "typeConstructors": false
    },
    "keepFnName": true
  }]]
}
```

### Via CLI

```sh
babel script.js --presets minify
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  presets: ["minify"]
});
```

## Options

Two types of options:

1. 1-1 mapping with plugin
2. The same option passed to multiple plugins

#### 1-1 mapping with plugin

+ `false` - disable plugin
+ `true` - enable plugin
+ `{ ...pluginOpts }` - enable plugin and pass pluginOpts to plugin

OptionName          | Plugin                                                         | DefaultValue
----------          | ------                                                         | ------------
booleans            | [transform-minify-booleans][booleans]                          | true
builtIns            | [minify-builtins][builtIns]                                    | true
consecutiveAdds     | [transform-inline-consecutive-adds][consecutiveAdds]           | true
deadcode            | [minify-dead-code-elimination][deadcode]                       | true
evaluate            | [minify-constant-folding][evaluate]                            | true
flipComparisons     | [minify-flip-comparisons][flipComparisons]                     | true
guards              | [minify-guarded-expressions][guards]                           | true
infinity            | [minify-infinity][infinity]                                    | true
mangle              | [minify-mangle-names][mangle]                                  | true
memberExpressions   | [transform-member-expression-literals][memberExpressions]      | true
mergeVars           | [transform-merge-sibling-variables][mergeVars]                 | true
numericLiterals     | [minify-numeric-literals][numericLiterals]                     | true
propertyLiterals    | [transform-property-literals][propertyLiterals]                | true
regexpConstructors  | [transform-regexp-constructors][regexpConstructors]            | true
removeConsole       | [transform-remove-console][removeConsole]                      | false
removeDebugger      | [transform-remove-debugger][removeDebugger]                    | false
removeUndefined     | [transform-remove-undefined][removeUndefined]                  | true
replace             | [minify-replace][replace]                                      | true
simplify            | [minify-simplify][simplify]                                    | true
simplifyComparisons | [transform-simplify-comparison-operators][simplifyComparisons] | true
typeConstructors    | [minify-type-constructors][typeConstructors]                   | true
undefinedToVoid     | [transform-undefined-to-void][undefinedToVoid]                 | true

#### The same option passed to multiple plugins

+ When multiple plugins require the same option, it's easier to declare it in one place. These options are passed on to two or more plugins.

OptionName          | Plugins
----------          | -------
keepFnName          | Passed to [mangle][mangle] & [deadcode][deadcode]
keepClassName       | Passed to [mangle][mangle] & [deadcode][deadcode]
tdz                 | Passed to [builtIns][builtIns], [evaluate][evaluate], [deadcode][deadcode], [removeUndefined][removeUndefined]

**Examples**

```json
{
  "presets": [["minify", {
    "evaluate": false,
    "mangle": true
  }]]
}
```

```json
{
  "presets": [["minify", {
    "mangle": {
      "exclude": ["ParserError", "NetworkError"]
    }
  }]]
}
```

```json
{
  "presets": [["minify", {
    "keepFnName": true
  }]]
}
// is the same as
{
  "presets": [["minify", {
    "mangle": {
      "keepFnName": true
    },
    "deadcode": {
      "keepFnName": true
    }
  }]]
}
```

[booleans]: ../../packages/babel-plugin-transform-minify-booleans
[builtIns]: ../../packages/babel-plugin-minify-builtins
[consecutiveAdds]: ../../packages/babel-plugin-transform-inline-consecutive-adds
[deadcode]: ../../packages/babel-plugin-minify-dead-code-elimination
[evaluate]: ../../packages/babel-plugin-minify-constant-folding
[flipComparisons]: ../../packages/babel-plugin-minify-flip-comparisons
[guards]: ../../packages/babel-plugin-minify-guarded-expressions
[infinity]: ../../packages/babel-plugin-minify-infinity
[mangle]: ../../packages/babel-plugin-minify-mangle-names
[memberExpressions]: ../../packages/babel-plugin-transform-member-expression-literals
[mergeVars]: ../../packages/babel-plugin-transform-merge-sibling-variables
[numericLiterals]: ../../packages/babel-plugin-minify-numeric-literals
[propertyLiterals]: ../../packages/babel-plugin-transform-property-literals
[regexpConstructors]: ../../packages/babel-plugin-transform-regexp-constructors
[removeConsole]: ../../packages/babel-plugin-transform-remove-console
[removeDebugger]: ../../packages/babel-plugin-transform-remove-debugger
[removeUndefined]: ../../packages/babel-plugin-transform-remove-undefined
[replace]: ../../packages/babel-plugin-minify-replace
[simplify]: ../../packages/babel-plugin-minify-simplify
[simplifyComparisons]: ../../packages/babel-plugin-transform-simplify-comparison-operators
[typeConstructors]: ../../packages/babel-plugin-minify-type-constructors
[undefinedToVoid]: ../../packages/babel-plugin-transform-undefined-to-void
