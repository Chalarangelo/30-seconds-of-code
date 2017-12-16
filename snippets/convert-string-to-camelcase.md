### Convert string to camelcase

Use `replace()` to remove underscores, hyphens and spaces and convert words to camelcase.

```js
const toCamelCase = str => 
  str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) =>  p2 ? p2.toUpperCase() : p1.toLowerCase());
// camelize("some_database_field_name") -> 'someDatabaseFieldName'
// camelize("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// camelize("some-javascript-property") -> 'someJavascriptProperty'
// camelize("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
