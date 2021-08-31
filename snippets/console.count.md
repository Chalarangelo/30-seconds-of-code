---
title: Console.Count() Method
tags: node
firstSeen: 2021-08-31T11:20:58+02:00
lastUpdated: 2021-08-3119T11:20:58+03:00
---

The console.count() function is an predefined API of the console module used to count label passed to it as a parameter, by internal counter at specific label.

Also, this is alternative Method to the string count . 

- Parameters:
- path : ( Optional ) or parameter specifies the label to be count.
- Return Value: Output the count of this function called with the specify label to the console.
 
---

---
```js
const console = require('console');
  
console.count("Count"); // 5

```