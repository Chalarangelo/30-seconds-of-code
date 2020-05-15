---
title: isMobile
tags: client agent,intermediate
---

boolean, Returns true if the client uses mobile, otherwise returns false.

`isMobile()` does not affected by screen size, if your using laptop and your screen width 500px it still returning false. 

'isMobile()' uses regex to check userAgent if it's mobile or not.

```js
const isMobile = () =>
  {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent );
  }
  
```

```js
isMobile(); // false
```
