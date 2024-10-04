---
title: Case conversion in JavaScript
shortTitle: Case conversion
language: javascript
tags: [string,regexp]
cover: chubby-squirrel
excerpt: A complete guide to case conversion in JavaScript, including camel case, kebab case, snake case, Pascal case, title case and sentence case.
listed: true
dateModified: 2023-12-31
---

Different programming languages and frameworks have different conventions for naming variables, functions and classes. It's often necessary to **convert strings between different cases**, which is where this guide comes in.

## Word boundary identification

Before we can convert a string to a different case, we need to be able to identify the **boundaries between words**. While a naive approach could rely on spaces or other delimiters to separate words, this approach is not robust enough to handle all cases. **Regular expressions** provide a far more robust solution to this problem. After much experimentation, I've found the following regular expression to be the most robust:

```js
const r = /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g;
```

This looks intimidating even to me, not gonna lie. Let's break it down into its constituent parts:

- `[A-Z]{2,}` matches two or more consecutive uppercase letters. This is useful for identifying acronyms like `XML` or `HTML`.
- `(?=[A-Z][a-z]+[0-9]*|\b)` is a lookahead assertion that matches a word boundary.
- `[A-Z]?[a-z]+[0-9]*` matches a word starting with an optional uppercase letter, followed by one or more lowercase letters and zero or more digits.
- `[A-Z]` matches a single uppercase letter.
- `[0-9]+` matches one or more digits.
- `g` is a global flag that allows the regular expression to match all occurrences in the string.

## Convert any case to camel case

The **camel case** naming convention requires that the **first letter of each word is capitalized, except for the first word**. For example `someName` is camel case, but `SomeName` is not. This convention is used in JavaScript for naming variables, functions and classes.

In order to convert a string to camel case, we need to:

- Use `String.prototype.match()` to break the string into words using an appropriate regexp.
- Use `Array.prototype.map()` to transform individual words. Use `String.prototype.slice()` and `String.prototype.toUpperCase()` to capitalize the first letter of each word, and `String.prototype.toLowerCase()` to lowercase the rest.
- Use `Array.prototype.join()` to combine the words into a single string.
- Finally, use `String.prototype.toLowerCase()` to lowercase the first letter of the final string.

```js
const toCamelCase = str => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
      .join('');
  return s.slice(0, 1).toLowerCase() + s.slice(1);
};

toCamelCase('some_database_field_name'); // 'someDatabaseFieldName'
toCamelCase('Some label that needs to be camelized');
// 'someLabelThatNeedsToBeCamelized'
toCamelCase('some-javascript-property'); // 'someJavascriptProperty'
toCamelCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'someMixedStringWithSpacesUnderscoresAndHyphens'
```

## Convert any case to Pascal case

**Pascal case** is most often used in object-oriented languages like Java or C#. Pascal case strings have the **first letter of each word capitalized**. For example `SomeName` is Pascal case, but `someName` is not.

The process for converting a string to Pascal case is very similar to the process for converting a string to camel case. The only difference is that we don't need to lowercase the first letter of the final string.

```js
const toPascalCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase())
    .join('');

toPascalCase('some_database_field_name'); // 'SomeDatabaseFieldName'
toPascalCase('Some label that needs to be pascalized');
// 'SomeLabelThatNeedsToBePascalized'
toPascalCase('some-javascript-property'); // 'SomeJavascriptProperty'
toPascalCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'SomeMixedStringWithSpacesUnderscoresAndHyphens'
```

## Convert any case to kebab case

**Kebab case** is most often used in URL slugs. Kebab case strings are **all lowercase, with words separated by hyphens**. For example `some-name` is kebab case, but `some-Name` is not.

In order to convert a string to kebab case, we need only lowercase each word and join them with a hyphen.

```js
const toKebabCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('-');

toKebabCase('camelCase'); // 'camel-case'
toKebabCase('some text'); // 'some-text'
toKebabCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some-mixed-string-with-spaces-underscores-and-hyphens'
toKebabCase('AllThe-small Things'); // 'all-the-small-things'
toKebabCase('IAmEditingSomeXMLAndHTML');
// 'i-am-editing-some-xml-and-html'
```

## Convert any case to snake case

**Snake case** is most often used in languages such as Python or Ruby. Snake case strings are **all lowercase, with words separated by underscores**. For example `some_name` is snake case, but `some_Name` is not.

The process for converting a string to snake case is the same as the one for kebab case, where the hyphens are replaced with underscores.

```js
const toSnakeCase = str =>
  str &&
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join('_');

toSnakeCase('camelCase'); // 'camel_case'
toSnakeCase('some text'); // 'some_text'
toSnakeCase('some-mixed_string With spaces_underscores-and-hyphens');
// 'some_mixed_string_with_spaces_underscores_and_hyphens'
toSnakeCase('AllThe-small Things'); // 'all_the_small_things'
toSnakeCase('IAmEditingSomeXMLAndHTML');
// 'i_am_editing_some_xml_and_html'
```

## Convert any case to title case

**Title case** is most often used in titles or headings. Title case strings have **the first letter of each word capitalized, with words separated by spaces**. For example `Some Name` is title case, but `Some name` is not.

The conversion process is the same as Pascal case, except that the delimiter is a space instead of an empty string.

```js
const toTitleCase = str =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.slice(0, 1).toUpperCase() + x.slice(1))
    .join(' ');

toTitleCase('some_database_field_name'); // 'Some Database Field Name'
toTitleCase('Some label that needs to be title-cased');
// 'Some Label That Needs To Be Title Cased'
toTitleCase('some-package-name'); // 'Some Package Name'
toTitleCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'Some Mixed String With Spaces Underscores And Hyphens'
```

## Convert any case to sentence case

Finally, **sentence case** is most often used in sentences. Sentence case strings have their **first letter capitalized, with words separated by spaces**. For example `Some name` is sentence case, but `some Name` is not.

As sentence case is pretty lenient, we need only make sure the delimiter is a space and that the first letter of the string is capitalized.

```js
const toSentenceCase = str => {
  const s =
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .join(' ');
  return s.slice(0, 1).toUpperCase() + s.slice(1);
};

toSentenceCase('some_database_field_name'); // 'Some database field name'
toSentenceCase('Some label that needs to be title-cased');
// 'Some label that needs to be title cased'
toSentenceCase('some-package-name'); // 'Some package name'
toSentenceCase('some-mixed_string with spaces_underscores-and-hyphens');
// 'Some mixed string with spaces underscores and hyphens'
```

## Convert to any case

That was a lot of code snippets to go through and you might need more than one in your project. Let's see if we can combine them all into one function that expects a case as an argument and returns the converted string.

```js
const convertCase = (str, toCase = 'camel') => {
  if (!str) return '';

  const delimiter =
    toCase === 'snake'
      ? '_'
      : toCase === 'kebab'
        ? '-'
        : ['title', 'sentence'].includes(toCase)
          ? ' '
          : '';

  const transform = ['camel', 'pascal'].includes(toCase)
    ? x => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase()
    : ['snake', 'kebab'].includes(toCase)
      ? x => x.toLowerCase()
      : toCase === 'title'
        ? x => x.slice(0, 1).toUpperCase() + x.slice(1)
        : x => x;

  const finalTransform =
    toCase === 'camel'
      ? x => x.slice(0, 1).toLowerCase() + x.slice(1)
      : toCase === 'sentence'
        ? x => x.slice(0, 1).toUpperCase() + x.slice(1)
        : x => x;

  const words = str.match(
    /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
  );

  return finalTransform(words.map(transform).join(delimiter));
};

convertCase('mixed_string with spaces_underscores-and-hyphens', 'camel');
// 'mixedStringWithSpacesUnderscoresAndHyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'pascal');
// 'MixedStringWithSpacesUnderscoresAndHyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'kebab');
// 'mixed-string-with-spaces-underscores-and-hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'snake');
// 'mixed_string_with_spaces_underscores_and_hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'title');
// 'Mixed String With Spaces Underscores And Hyphens'
convertCase('mixed_string with spaces_underscores-and-hyphens', 'sentence');
// 'Mixed string with spaces underscores and hyphens'
```

While this code certainly is complex, it builds on top of all previous snippets, conditionally applying the appropriate transformations based on the desired case. As many of the snippets share similarities, the conditions are condensed as much as possible to avoid repetition.
