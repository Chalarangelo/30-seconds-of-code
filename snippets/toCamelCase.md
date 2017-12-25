### toCamelCase

Converts a string to camelcase.

Break the string into words and combine them capitalizing the first letter of each word.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toCamelCase = str => {
  let s = str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');
  return s.slice(0,1).toLowerCase() + s.slice(1)
  }
```

```js
toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
