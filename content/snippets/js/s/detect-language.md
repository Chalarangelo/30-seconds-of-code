---
title: Detect language
type: snippet
language: javascript
tags: [browser]
cover: accessibility
dateModified: 2020-10-06
---

Detects the preferred language of the current user.

- Use `Navigator.language` or the first value of `Navigator.languages` if available, otherwise return `defaultLang`.
- Omit the second argument, `defaultLang`, to use `'en-US'` as the default language code.

```js
const detectLanguage = (defaultLang = 'en-US') =>
  navigator.language ||
  (Array.isArray(navigator.languages) && navigator.languages[0]) ||
  defaultLang;
```

```js
detectLanguage(); // 'nl-NL'
```
