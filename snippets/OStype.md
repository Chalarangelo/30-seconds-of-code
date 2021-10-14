---
title: createHTTPServer
tags: node,beginner
firstSeen: 2021-10-14T15:26:31.821Z
lastUpdated: 2021-10-14T15:26:31.821Z
---

Get the type of os.
- The os module provides API for getting information about hardware related like CPU,       memory, directories, IP address and many more.

```js
var os = require('os');
  const  getOSName=()=>  os.type()
```
```js
getOSName() // Windows_NT;
```