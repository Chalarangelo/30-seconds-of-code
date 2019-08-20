# babel-plugin-minify-constant-folding

Tries to evaluate expressions and inline the result.

## Example

**In**

```javascript
"a" + "b"
2 * 3;
4 | 3;
"b" + a + "c" + "d" + g + z + "f" + "h" + "i"

[a, b, c].concat([d, e], f, g, [h]);
["a", "b", "c"].join();
["a", "b", "c"].join('@');
[1, 2, 3].length;
[1, 2, 3][1];
[1, 2, 3].shift();
[1, 2, 3].slice(0, 2);
[a, b, c].pop();
[a, b, c].reverse();
"a,b,c".split(",");
"abc"[0];
"abc".charAt();
"abc".charAt(1);
"abc".length;
```

**Out**

```javascript
"ab";
6;
7;
"b" + a + "cd" + g + z + "fhi";

[a, b, c, d, e, f, g, h];
"a,b,c";
"a@b@c";
3;
2;
2;
[1, 2];
c;
[c, b, a];
["a", "b", "c"];
"a";
"a";
"a";
"b";
3;
```

## Installation

```sh
npm install babel-plugin-minify-constant-folding
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```json
{
  "plugins": ["minify-constant-folding"]
}
```

### Via CLI

```sh
babel --plugins minify-constant-folding script.js
```

### Via Node API

```javascript
require("babel-core").transform("code", {
  plugins: ["minify-constant-folding"]
});
```

## Options

+ `tdz` - Account for TDZ (Temporal Dead Zone)
