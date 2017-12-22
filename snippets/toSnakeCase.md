### toSnakeCase

Converts a string to snakecase.

Use `replace()` to add underscores before capital letters, convert `toLowerCase()`, then `replace()` hyphens and spaces with underscores.

```js
const toSnakeCase = str =>
  str.replace(/(\w)([A-Z])/g, '$1_$2').replace(/[\s-]/g, '_').toLowerCase();
// toSnakeCase("camelCase") -> 'camel_case'
// toSnakeCase("some text") -> 'some_text'
// toSnakeCase("some-javascript-property") -> 'some_javascript_property'
// toSnakeCase("some-mixed_string With spaces_underscores-and-hyphens") -> 'some_mixed_string_with_spaces_underscores_and_hyphens'
```
