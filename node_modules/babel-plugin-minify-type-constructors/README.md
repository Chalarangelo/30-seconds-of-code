# babel-plugin-minify-type-constructors

**Note:** Not recommended if full support for IE8 and lower is required. [Details](https://github.com/babel/minify/pull/45#discussion_r70181249)

## Example

**In**

```javascript
Boolean(x);
Number(x);
String(x);
Array(3);
Array(3,1);
Object({foo: 'bar'});
```

**Out**

```javascript
!!x;
+x;
x + "";
[,,,];
[3, 1];
{foo: 'bar'};
```

## Installation

```sh
npm install babel-plugin-minify-type-constructors
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-type-constructors"]
}
```

### Via CLI

```sh
babel --plugins minify-type-constructors script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-type-constructors"]
});
```

## Options

+ `array` - prevent plugin from minifying arrays
+ `boolean` - prevent plugin from minifying booleans
+ `number` — prevent plugin from minifying numbers
+ `object` — prevent plugin from minifying objects
+ `string` — prevent plugin from minifying strings
