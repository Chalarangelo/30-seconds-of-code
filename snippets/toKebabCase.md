### toKebabCase

Converts a string to [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
Breaks the string into words.
A word is defined as following:-
-> Beginning with two or more capital letters, e.g. XML or FM
-> Begin with a capital letter followed by lower case letters with optional trailing numbers, e.g. Hello or Http2
-> Contain nothing but lower case letters with optional trailing numbers, e.g. hello or http2
-> Individual upper letters, e.g T.M.N.T
-> Groups of numbers, e.g. 555-555-5555

For more detailed explanation of this Regex [Visit this Site](https://regex101.com/r/bMCgAB/1)

```js
const toKebabCase = str => {
    let regex = rx = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
    return str.match(regex).map(x =>{
        return x.toLowerCase();
    }).join('-');
}
// toKebabCase("camelCase") -> 'camel-case'
// toKebabCase("some text") -> 'some-text'
// toKebabCase("some-mixed_string With spaces_underscores-and-hyphens") -> 'some-mixed-string-with-spaces-underscores-and-hyphens'
// toKebabCase("AllThe-small Things") -> "all-the-small-things"
// toKebabCase('IAmListeningToFMWhileLoadingDifferentURLOnMyBrowserAndAlsoEditingSomeXMLandHTML') -> "i-am-listening-to-fm-while-loading-different-url-on-my-browser-and-also-editing-xml-and-html"
```
