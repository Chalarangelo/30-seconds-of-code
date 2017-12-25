### reverseString

Reverses a string.

Use `split('')` and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `join('')`.

```js
const reverseString = str => str.split('').reverse().join('');
```

```js
reverseString('foobar') -> 'raboof'
```
