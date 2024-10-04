---
title: Can I check if a JavaScript string contains a substring, regardless of case?
shortTitle: Case-insensitive substring search
language: javascript
tags: [string,regexp]
cover: cup-of-orange
excerpt: Search for substrings in JavaScript strings without worrying about case sensitivity.
listed: true
dateModified: 2024-05-25
---

As with most languages, JavaScript's **substring matching is case-sensitive by default**. If you need to check if a string contains a substring, but you don't care about the case, you'll need to roll up your own solution.

Converting both strings to **lowercase** before comparing them is the naive approach, but it's generally discouraged for performance reasons. Instead, you can use a **regular expression** with the `'i'` flag to perform a case-insensitive search.

In order to do so, you'll have to use the `RegExp()` constructor to create a regular expression that matches the given `searchString`, ignoring the case. Then, you can use the `RegExp.prototype.test()` method to check if the string contains the substring.

```js
const includesCaseInsensitive = (str, searchString) =>
  new RegExp(searchString, 'i').test(str);

includesCaseInsensitive('Blue Whale', 'blue'); // true
```
