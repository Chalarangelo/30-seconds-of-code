---
title: detectLanguage
tags: browser,intermediate
---

Detects what the language of the current user is.

- Retrieve the current language by looking in several places of the navigator object.

```js
const detectLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
      return navigator.languages[0];
    } else {
      return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-US';
    }
};
```

```js
detectLanguage(); // "nl-NL"
```
