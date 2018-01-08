### longestString

Takes an array of strings and returns the longest one.
The method also accepts combinations of single strings and string arrays

Uses the [rest operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters)
to handle arrays as well as an indefinite amount of single arguments.
Strings are compared using `Array.reduce()`.

```js
const longestString = (...strings) => strings.map(str => {
                          if (Array.isArray(str)) {
                            const first = str.shift();
                            strings.concat(str);
                            return first;
                          } else {
                            return str;
                          }
                        }).reduce((a, b) => a.length > b.length ? a : b);
```

```js
longestString('this', 'is', 'a', 'testcase'); // 'testcase'
longestString(['a', 'ab', 'abc']); // 'abc'
longestString(['a', 'ab', 'abc'], 'abcd'); // 'abcd'
```
