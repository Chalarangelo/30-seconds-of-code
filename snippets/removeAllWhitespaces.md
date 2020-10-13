---
title: removeAllWhitespaces
tags: string,regexp,beginner
---


Returns a string removing any and all whitespaces.
- Use `String.prototype.replace()` with a regular expression to replace any and all occurrences of whitespace characters with a empty string.

```javascript
const removeAllWhitespaces = (string) => {
  if(!string || typeof string !== "string") return "";
  return string.replace(/\s+/g, ""); // trimming the whitespace, if any
}
```


```javascript

removeAllWhitespaces(" Hello, I've a lot of white spaces. \n Including a line break."); // "Hello,I'vealotofwhitespaces.Includingalinebreak."

```
