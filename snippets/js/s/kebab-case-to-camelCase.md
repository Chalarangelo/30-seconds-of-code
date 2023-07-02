---
title: Kebab case to camel case
type: snippet
language: javascript
tags: [string, array]
cover: camel
dateModified: 2023-07-02T06:05:00-04:00
---

Converts kebab-case string into camelCase.

- The kebab-case string is split into an array of substrings using the hyphen ("-") as the separator.
- Each substring in the array is processed:
  - The first substring (at index 0) is returned as is.
  - For subsequent substrings (at indexes greater than 0), the first character is capitalized using `toUpperCase()`, and the remaining characters are appended using `slice(1)`.
- The modified substrings are then joined together into a single string without any separator.

```js
const kebabToCamelCase = (kebabCase) =>
  kebabCase
    .split("-")
    .map((key, i) => {
      if (i == 0) return key;
      return `${key[0].toUpperCase()}${key.slice(1)}`;
    })
    .join("");
```

```js
kebabToCamelCase(
  "the-kebab-to-camel-case-converter-converts-text-to-camel-case"
); // theKebabToCamelCaseConverterConvertsTextToCamelCase
```
