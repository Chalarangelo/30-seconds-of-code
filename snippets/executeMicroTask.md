---
title: executeMicroTask
tags: eventloop,microtask,advanced
---

Executes any arbitrary provided function (a task) as a micro task. This will push a task for execution onto the microTask queue of the event loop to guarantee this task will execute prior to the execution of any other macrotask on the event loop. This is quite useful to force execution of a task before something else when working with large frameworks where such things of order of execution are not in your direct control.

Please see [this](https://javascript.info/event-loop#macrotasks-and-microtasks) for in-depth microtask explanation if needed.

```js
const executeMicroTask = (taskFn) => {
  Promise.resolve().then(taskFn);
};
```

```js
setTimeout(() => alert('timeout'));

executeMicroTask(() => console.log('microTask')); // Logs `microTask` in the next order of execution on the event loop before any macrotasks.

// Timeout will appear last even through it's ordered first in sequence of parser. The console output will execute first.
```
