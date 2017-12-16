### Convert string from camelcase

Use `replace()` to remove underscores, hyphens and spaces and convert words to camelcase.
Omit the scond argument to use a default separator of '_'.

```js
const fromCamelCase = (str, separator = '_') => 
  str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
// decamelize('someDatabaseFieldName', ' ') -> 'some database field name'
// decamelize('someLabelThatNeedsToBeCamelized', '-') -> 'some-label-that-needs-to-be-camelized'
// decamelize('someJavascriptProperty', '_') -> 'some_javascript_property'
```
