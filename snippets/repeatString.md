### repeatString

Repeats a string n times using `String.repeat()`

If no string is provided the default is `""` and the default number of times is 2.

```js
const repeatString = (str = '', num = 2) => {
  return num >= 0 ? str.repeat(num) : str;
};
```

```js
repeatString("abc",3) // 'abcabcabc'
repeatString("abc") // 'abcabc'
```
