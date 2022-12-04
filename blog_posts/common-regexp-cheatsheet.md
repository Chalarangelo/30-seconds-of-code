---
title: Common regular expressions
type: cheatsheet
tags: javascript,string,regexp
author: chalarangelo
cover: blog_images/rocky-beach.jpg
excerpt: A collection of regular expressions that can be used to solve common problems.
firstSeen: 2022-11-09T05:00:00-04:00
---

### Exact string match

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Add the string you want to match in-between the two anchors.

```js
const regexp = /^abc$/;
// Where 'abc' is the exact string you want to match
```

### Match empty string

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Do not add any characters in-between to match an empty string.

```js
const regexp = /^$/;
```

### Match whitespace sequences

- Use the `\s` meta-sequence to match any whitespace character, including spaces, tabs, newlines, etc.
- Use the `+` quantifier to match one or more occurrences of the previous character.
- Add the global flag (`g`) to match all occurrences of the pattern in the string.

```js
const regexp = /\s+/g;
```

### Match line breaks

- Depending on the environment, line breaks can be represented in different ways.
- Use the `\r` character to match carriage returns, the `\n` character to match newlines, and the `\r\n` sequence to match carriage returns followed by newlines.
- Add the global (`g`) and multiline (`m`) flags to match all occurrences of the pattern in the string.

```js
const regexp = /\r|\n|\r\n/gm;
```

### Match non-word characters

- Use negation (`^`) to match any character that is not a word character (`\w`) or a whitespace character (`\s`).
- Add the global flag (`g`) to match all occurrences of the pattern in the string.
- Add the ignore case flag (`i`) to match both uppercase and lowercase characters.

```js
const regexp = /[^\w\s]/gi;
```

### Match alphanumeric, dashes and hyphens

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Use the `a-zA-Z0-9-` pattern to match any alphanumeric character, dashes and hyphens.
- Use the `+` quantifier to match one or more occurrences of the previous character.
- Particularly useful when matching URL slugs.

```js
const regexp = /^[a-zA-Z0-9-_]+$/;
```

### Match letters and whitespaces

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Use the `a-zA-Z\s` pattern to match any letter and whitespace character.
- Use the `+` quantifier to match one or more occurrences of the previous pattern.

```js
const regexp = /^[A-Za-z\s]+$/;
```

### Pattern not included

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Use a negative lookahead (`?!`) to match any character that is not followed by the pattern you want to exclude.
- Add the global flag (`g`) to match all occurrences of the pattern in the string.
- To ensure more than one pattern is not included, use the `|` character to separate them.

```js
const regexp = /^((?!(abc|bcd)).)*$/;
// Where 'abc' and 'bcd' are pattern you want to exclude
```

### Text inside brackets

- Use the `\(` and `\)` characters to match the opening and closing brackets, respectively.
- Use a capturing group between the two and exclude the closing parenthesis character.
- Use the `+` quantifier to match one or more characters, as needed.
- Add the global flag (`g`) to match all occurrences of the pattern in the string.
- Replace `\(` and `\)` with `\[` and `\]` to match square brackets and with `\{` and `\}` to match curly brackets.

```js
const regexp = /\(([^)]+)\)/g;
```

### Validate GUID/UUID

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Validate each segment of the GUID/UUID separately using numeric character ranges and quantifiers.

```js
const regexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
```

### Validate date format (DD/MM/YYYY)

- Use the `^` and `$` anchors to match the start and end of the string, respectively.
- Validate each segment of the date separately using numeric character ranges and quantifiers.
- Alter the order of the segments and separators to match different formats.

```js
const regexp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
```

### Chunk string into n-size chunks

- Use the `.{1,n}` quantifier to match any character between `1` and `n` times.
- Add the global flag (`g`) to match all occurrences of the pattern in the string.

```js
const regexp = /.{1,2}/g;
// Where '2' is the number of characters per chunk
```
