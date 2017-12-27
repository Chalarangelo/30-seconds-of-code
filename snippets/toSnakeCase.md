### toSnakeCase

Converts a string to snake case.

Break the string into words and combine them using `_` as a separator.
For more detailed explanation of this Regex, [visit this Site](https://regex101.com/r/bMCgAB/1).

```js
const toSnakeCase = str => {
  str && str.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');
};
```

```js
toSnakeCase("camelCase") // 'camel_case'
toSnakeCase("some text") // 'some_text'
toSnakeCase("some-javascript-property") // 'some_javascript_property'
toSnakeCase("some-mixed_string With spaces_underscores-and-hyphens") // 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase("AllThe-small Things") // "all_the_smal_things"
toSnakeCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLAndHTML') // "i_am_listening_to_fm_while_loading_different_url_on_my_browser_and_also_editing_some_xml_and_html"
```
