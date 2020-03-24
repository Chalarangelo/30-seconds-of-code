---
title: logArgsAndResult
tags: utility, debugging, beginner
---

Wrapper function that logs arguments that were passed into a function and the result.

Inside any non-arrow function, we can access arguments through the variable: arguments. We use this variable and a callback function to log the arguments we pass to a function and the result.

```js
const wrapLog = (funcName, func) => {
  return function() {
    console.log(`${funcName}(${listArgs}) => ${func(...Object.values(arguments))}`);
  };
};

const logVolume = wrapLog("volume", (x, y, z) => {
  return x * y * z;
});
```

```js
logVolume(5, 3, 2); // volume(5, 3, 2) => 30
logVolume(3, 2, 4); // volume(3, 2, 4) => 24
```