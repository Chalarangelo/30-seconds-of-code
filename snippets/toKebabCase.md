### toKebabCase

Converts a string to snakecase.
Use `replace()` to add spaces before capital letters, convert `toLowerCase()`, then `replace()`  and undesrsocres and spaces with hyphens.
Also check if a string starts with hyphen and if yes remove it.

```js
const toKebabCase = str => {
    str = str.replace(/([A-Z])/g," $1").toLowerCase().replace(/_/g,' ').replace(/\s\s+/g, '-').replace(/\s/g,'-');
    return str.startsWith('-') ? str.slice(1,str.length) : str;
}
// toKebabCase("camelCase") -> 'camel-case'
// toKebabCase("some text") -> 'some-text'
// toKebabCase("some-javascript-property") -> 'some-javascript-property'
// toKebabCase("some-mixed_string With spaces_underscores-and-hyphens") -> 'some-mixed-string-with-spaces-underscores-and-hyphens'
// toKebabCase("AllThe-small Things") -> "all-the-small-things"
```
