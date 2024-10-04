---
title: Check if a string is a yes/no answer with JavaScript
shortTitle: Yes/no answer
language: javascript
tags: [string,regexp]
cover: fort-lamp
excerpt: Quickly and easily check if a string is a yes/no answer to a boolean question in your CLI programs.
listed: true
dateModified: 2023-12-15
---

If you've spent any amount of time using your computer's terminal, chances are you've been asked to confirm an action by typing `y` or `n` and pressing `Enter`.

```text [Terminal]
Are you sure you want to continue? [y/n]
```

Implementing this functionality takes some careful consideration in order to get it right.

For starters, your boolean question must understand both `y`/`n` and `yes`/`no` answers. The easiest way to handle this would be a **regular expression** for each answer, such as `(y|yes)` and `(n|no)`.

Additionally, you want to **invalidate user input that doesn't match** the expected answers. For example, if the user types `yess` or `nope`, that is not a valid answer and the result should use the **default value** specified. Adding **positional anchors** to the regular expressions, such as `^(y|yes)$` and `^(n|no)$`, will ensure that the entire string is matched.

Finally, you want the check to be **case-insensitive**, so that `Y` and `y` are treated the same. You can do this by adding the `i` flag to your regular expressions, such as `/^(y|yes)$/i` and `/^(n|no)$/i`.

Putting it all together, you can use `RegExp.prototype.test()` and the ternary operator (`?`) to check if the string matches the expected answers and return the appropriate boolean value.

```js
const yesNo = (val, def = false) =>
  /^(y|yes)$/i.test(val) ? true : /^(n|no)$/i.test(val) ? false : def;

yesNo('Y'); // true
yesNo('yes'); // true
yesNo('No'); // false
yesNo('Foo', true); // true
```
