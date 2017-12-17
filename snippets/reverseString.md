### reverseString

Reverses a string.

Use array destructuring and `Array.reverse()` to reverse the order of the characters in the string.
Combine characters to get a string using `join('')`.

```js
const reverseString = str => [...str].reverse().join('');
// reverseString('foobar') -> 'raboof'
```
