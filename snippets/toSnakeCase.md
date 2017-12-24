### toSnakeCase

Converts a string to snakecase.

Use `replace()` to add underscores before capital letters, convert `toLowerCase()`, then `replace()` hyphens and spaces with underscores.

```js
const toSnakeCase = str =>
  let regex = rx = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    let arr = str.match(regex);
    arr = arr.forEach(x =>{
        return s.toLowerCase();
    });
    return arr.join('_')
// toSnakeCase("camelCase") -> 'camel_case'
// toSnakeCase("some text") -> 'some_text'
// toSnakeCase("some-javascript-property") -> 'some_javascript_property'
// toSnakeCase("some-mixed_string With spaces_underscores-and-hyphens") -> 'some_mixed_string_with_spaces_underscores_and_hyphens'
```
