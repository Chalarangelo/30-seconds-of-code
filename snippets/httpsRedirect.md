---
title: httpsRedirect
tags: browser,intermediate
---

Redirects the page to HTTPS if it's currently in HTTP.

- Use `location.protocol` to get the protocol currently being used.
- If it's not HTTPS, use `location.replace()` to replace the existing page with the HTTPS version of the page.
- Use `location.href` to get the full address, split it with `String.prototype.split()` and remove the protocol part of the URL.
- Note that pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

```js
const httpsRedirect = () => {
  if (location.protocol !== 'https:') location.replace('https://' + location.href.split('//')[1]);
};
```

```js
httpsRedirect(); 
// If you are on http://mydomain.com, you are redirected to https://mydomain.com
```
