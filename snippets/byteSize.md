### byteSize

Returns the length of string.

It converts a given string to a [Blob Object](https://developer.mozilla.org/en-US/docs/Web/API/Blob) and finds it's size

```js
const byteSize = str => new Blob([str]).size;
```

```js
byteSize("😀"); // 4
byteSize("Hello World"); // 11
```
