---
title: Word wrap a JavaScrip string
shortTitle: Word wrap
language: javascript
tags: [string,regexp]
cover: white-tablet
excerpt: Wrap a string to a given number of characters using a string break character in JavaScript.
listed: true
dateModified: 2024-02-29
---

Text wrapping isn't the easiest thing to do, especially if you care about words not being split down the middle. While this is quite a common problem, the best solution isn't a particularly easy one, as it requires a bit of **regular expression** magic.

```js
const regexp = /(?![^\n]{1,32}$)([^\n]{1,32})\s/g;
const str =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.';

str.replace(regexp, '$1\n');
// 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nFusce tempus.'
```

As you can see in the above example, it's fairly easy to wrap a string to a specific number of characters. But _how_ does this work? Let's break it down:

- Using `[^\n]` combined with a quantifier, `{1,32}`, we're matching **any character that isn't a newline**, up to 32 times. We'll have to use a **capturing group** to remember this sequence.
- As this doesn't prevent sequences ending in the middle of a word, we need to use the `\s` character class to match **any whitespace character**. We'll have to place this **outside the group** to avoid it being included in the replacement.
- Finally, we can use a **negative lookahead** (`?!`) to prevent the match from happening at the **end of the string**. This avoids adding a newline at the end of the string.

After demystifying the regular expression, we can use `String.prototype.replace()` to replace the matched sequences with the captured group and a newline character. This will effectively wrap the string to a maximum of 32 characters.

In order to make this more generic, we can use the `RegExp()` constructor to create a regular expression with a **dynamic maximum length**. This allows us to create a function that can word wrap a string to any number of characters.

```js
const wordWrap = (str, max, br = '\n') => str.replace(
  new RegExp(`(?![^\\n]{1,${max}}$)([^\\n]{1,${max}})\\s`, 'g'), `$1${br}`
);

const str =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce tempus.';

wordWrap(str, 32);
// 'Lorem ipsum dolor sit amet,\nconsectetur adipiscing elit.\nFusce tempus.'
wordWrap(str, 32, '\r\n');
/*
 'Lorem ipsum dolor sit amet,\r\nconsectetur adipiscing elit.\r\nFusce tempus.'
*/
```
