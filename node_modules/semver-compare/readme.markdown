# semver-compare

compare two semver version strings, returning -1, 0, or 1

The return value can be fed straight into `[].sort`.

[![build status](https://secure.travis-ci.org/substack/semver-compare.png)](http://travis-ci.org/substack/semver-compare)

# example

``` js
var cmp = require('semver-compare');
var versions = [
    '1.2.3',
    '4.11.6',
    '4.2.0',
    '1.5.19',
    '1.5.5',
    '4.1.3',
    '2.3.1',
    '10.5.5',
    '11.3.0'
];
console.log(versions.sort(cmp).join('\n'));
```

prints:

```
1.2.3
1.5.5
1.5.19
2.3.1
4.1.3
4.2.0
4.11.6
10.5.5
11.3.0
```

whereas the default lexicographic sort (`versions.sort()`) would be:

```
1.2.3
1.5.19
1.5.5
10.5.5
11.3.0
2.3.1
4.1.3
4.11.6
4.2.0
```

# methods

```
var cmp = require('semver-compare')
```

## cmp(a, b)

If the semver string `a` is greater than `b`, return `1`.
If the semver string `b` is greater than `a`, return `-1`.
If `a` equals `b`, return 0;

# install

With [npm](https://npmjs.org) do:

```
npm install semver-compare
```

# license

MIT
