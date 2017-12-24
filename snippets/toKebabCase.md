### toKebabCase

Converts a string to kebab case.

Break the string into words and combine them using `-` as a separator.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toKebabCase = str =>
  str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');
// toKebabCase("camelCase") -> 'camel-case'
// toKebabCase("some text") -> 'some-text'
// toKebabCase("some-mixed_string With spaces_underscores-and-hyphens") -> 'some-mixed-string-with-spaces-underscores-and-hyphens'
// toKebabCase("AllThe-small Things") -> "all-the-small-things"
// toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML') -> "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"
```
