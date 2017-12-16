### decamelize

Decamelizes a string with/without a custom separator (underscore by default).

```js
const decamelize = (str, separator) => {
  separator = typeof separator === 'undefined' ? '_' : separator;
  return str
        .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
        .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
        .toLowerCase();
}
// decamelize('someDatabaseFieldName', ' ') -> 'some database field name'
// decamelize('someLabelThatNeedsToBeCamelized', '-') -> 'some-label-that-needs-to-be-camelized'
// decamelize('someJavascriptProperty', '_') -> 'some_javascript_property'
```
