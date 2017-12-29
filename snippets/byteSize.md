### byteSize

Returns the length of string.

```js
const byteSize = str => new Blob([str]).size;
```

```js
byteSize("😀"); // 4
byteSize("Hello World"); // 11
```
