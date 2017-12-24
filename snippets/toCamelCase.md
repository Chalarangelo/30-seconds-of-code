### toCamelCase

Converts a string to camelcase.

Use `replace()` to remove underscores, hyphens, and spaces and convert words to camelcase.

```js
const toCamelCase = str => {
let regex = rx = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    let arr = str.match(regex);
    arr = arr.map(x =>{
        return x.slice(0,1).toUpperCase() + x.slice(1).toLowerCase();
    });
    str = arr.join('')
    return str.slice(0,1).toLowerCase() + str.slice(1)
    }
// toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
// toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
// toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'
```
