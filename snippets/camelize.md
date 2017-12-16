### Camelize

Camelize a string, cutting the string by multiple separators like
 hyphens, underscores and spaces.

```js
/**
 * @param {str} string str to camelize
 * @return string Camelized text
 */
const camelize = str => str.replace(/^([A-Z])|[\s-_]+(\w)/g, 
  (match, p1, p2, offset) =>  p2 ? p2.toUpperCase() : p1.toLowerCase());
// camelize("some_database_field_name") -> 'someDatabaseFieldName'
// camelize("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// camelize("some-javascript-property") -> 'someJavascriptProperty'
// camelize("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
