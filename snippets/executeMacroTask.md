---
title: executeMacroTask
tags: eventloop,macrotask,advanced
---

Executes any arbitrary provided function (a task) as a macro task. This pushes a task onto the macrotask queue to be executed next. This is extremely useful in frontend programming especially when writing in frameworks such as React or Angular where certain instances you need fine tune control of the global macrotask queue for performance or safety reasons.

Please see [this](https://javascript.info/event-loop#macrotasks-and-microtasks) for in-depth information if needed.

```js
const executeJSMacroTask = (taskFn) => {
  setTimeout(taskFn);
};
```

```js
executeJSMacroTask(() => console.log('macroTask')); // Logs `macroTask` in the next order of execution on the event loop.
```
