### stringToArrayOfWords

Converts a given string into an array of words

Use String.split with a supplied pattern(defaults to non alpha as a regex) to convert to an Array of Strings and then filter to remove any empty strings.

```js
const stringToArrayOfWords = (str, pattern = /[\W_]+/) => str.split(pattern).filter(Boolean)

// stringToArrayOfWords("I love javaScript!!") -> ["I", "love", "javaScript"]
// stringToArrayOfWords("python, javaScript & coffee") -> ["python", "javaScript", "coffee"]
```
