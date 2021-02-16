---
title: getWindowSize
tags: browser,window,width,height,intermediate
---

Shows the width and height of current browser window

- simply call getWindowSize(); 
- useful when building UI

```js
const getWindowSize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  return 'Window width: '+width+'<br>Window height: '+height;
}
```

```js
getWindowSize();  // Shows the width and height of current window Eg: Window width: 1848  and  Window height: 949
```
