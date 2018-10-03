### multiSplit

Return ad array of strings separated by multiple delimiters.

Use `String.prototype.split()` to split a given text using a RegExp.


```js
const multiSplit = (str, arr = [ " " ]) => str.split(new RegExp(`[${arr.join("")}]`));
```

```js
multiSplit('Hi. I love code, beer, music.', [".",","]); // [ 'Hi', ' I love code', ' beer', ' music', '' ]
multiSplit('Hi. I love code, beer, music.'); // [ 'Hi.', 'I', 'love', 'code,', 'beer,', 'music.' ]
```
