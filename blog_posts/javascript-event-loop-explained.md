---
title: What is the Event Loop in JavaScript?
shortTitle: Event loop explained
type: question
tags: javascript,browser,event
author: chalarangelo
cover: tranquility
excerpt: The Event Loop is a source of confusion for many developers, but it's a fundamental piece of the JavaScript engine.
firstSeen: 2022-08-21T05:00:00-04:00
---

The Event Loop is a source of confusion for many developers, but it's a fundamental piece of the JavaScript engine. It's what allows JavaScript to be single-threaded, yet able to execute in a non-blocking fashion. To understand the Event Loop, we first need to explain a few things about the JavaScript engine, such as the Call Stack, Tasks, Microtasks and their respective Queues. Let's break them down one by one.

### The Call Stack

The **Call Stack** is a data structure that keeps track of the execution of JavaScript code. As the name suggests, it's a stack, thus a LIFO (Last In, First Out) data structure in memory. Each function that's executed is represented as a frame in the Call Stack and placed on top of the previous function.

Let's look at a simple example, step by step:

```js
function foo() {
  console.log('foo');
  bar();
}

function bar() {
  console.log('bar');
}
```

1. The Call Stack is initially empty.
2. The function `foo()` is pushed onto the Call Stack.
3. The function `foo()` is executed and popped off the Call Stack.
4. The function `console.log('foo')` is pushed onto the Call Stack.
5. The function `console.log('foo')` is executed and popped off the Call Stack.
6. The function `bar()` is pushed onto the Call Stack.
7. The function `bar()` is executed and popped off the Call Stack.
8. The function `console.log('bar')` is pushed onto the Call Stack.
9. The function `console.log('bar')` is executed and popped off the Call Stack.
10. The Call Stack is now empty.

### Tasks and the Task Queue

**Tasks** are scheduled, synchronous blocks of code. While executing, they have exclusive access to the Call Stack and can also enqueue other tasks. Between Tasks, the browser can perform rendering updates. Tasks are stored in the **Task Queue**, waiting to be executed by their associated functions. The Task Queue, in turn, is a FIFO (First In, First Out) data structure. Examples of Tasks include the callback function of an event listener associated with an event and the callback of `setTimeout()`.

### Microtasks an the Microtask Queue

**Microtasks** are similar to Tasks in that they're scheduled, synchronous blocks of code with exclusive access to the Call Stack while executing. Additionally, they are stored in their own FIFO (First In, First Out) data structure, the **Microtask Queue**. Microtasks differ from Tasks, however, in that the Microtask Queue must be emptied out after a Task completes and before re-rendering. Examples of Microtasks include `Promise` callbacks and `MutationObserver` callbacks.

Microtasks and the Microtask Queue are also referred to as Jobs and the Job Queue.

### The Event Loop

Finally, the **Event Loop** is a loop that keeps running and checks if the Call Stack is empty. It processes Tasks and Microtasks, by placing them in the Call Stack one at a time and also controls the rendering process. It's made up of four key steps:

1. **Script evaluation:** Synchronously executes the script until the Call Stack is empty.
2. **Task processing:** Select the first Task in the Task Queue and run it until the Call Stack is empty.
3. **Microtask processing:** Select the first Microtask in the Microtask Queue and run it until the Call Stack is empty, repeating until the Microtask Queue is empty.
4. **Rendering:** Re-render the UI and loop back to step 2.

### A practical example

To better understand the Event Loop, let's look at a practical example, incorporating all of the above concepts:

```js
console.log('Script start');

setTimeout(() => console.log('setTimeout()'), 0);

Promise.resolve()
  .then(() => console.log('Promise.then() #1'))
  .then(() => console.log('Promise.then() #2'));

console.log('Script end');

// LOGS:
//   Script start
//   Script end
//   Promise.then() #1
//   Promise.then() #2
//   setTimeout()
```

Does the output look like what you expected? Let's break down what's happening, step by step:

1. The Call Stack is initially empty. The Event Loop begins evaluating the script.
2. `console.log()` is pushed to the Call Stack and executed, logging `'Script start'`.
3. `setTimeout()` is pushed to the Call Stack and executed. This creates a new Task for its callback function in the Task Queue.
4. `Promise.prototype.resolve()` is pushed to the Call Stack and executed, calling in turn `Promise.prototype.then()`.
5. `Promise.prototype.then()` is pushed to the Call Stack and executed. This creates a new Microtask for its callback function in the Microtask Queue.
6. `console.log()` is pushed to the Call Stack and executed, logging `'Script end'`.
7. The Event Loops has finished its current Task, evaluating the script. It then begins running the first Microtask in the Microtask Queue, which is the callback of `Promise.prototype.then()` that was queued in step 5.
8. `console.log()` is pushed to the Call Stack and executed, logging `'Promise.then() #1'`.
9. `Promise.prototype.then()` is pushed to the Call Stack and executed. This creates a new entry for its callback function in the Microtask Queue.
10. The Event Loop checks the Microtask Queue. As it’s not empty, it executes the first Microtask, which is the callback of `Promise.prototype.then()` that was queued in step 10.
11. `console.log()` is pushed to the Call Stack and executed, logging `'Promise.then() #2'`.
12. Re-rendering would occur here, if there was any.
13. The Microtask Queue is empty, so the Event Loop moves to the Task Queue and executes the first Task, which is the callback of `setTimeout()` that was queued in step 3.
14. `console.log()` is pushed to the Call Stack and executed, logging `'setTimeout()'`.
15. Re-rendering would occur here, if there was any.
16. The Call Stack is now empty.

### Summary

- The **Event Loop** is responsible for executing the JavaScript code. It first evaluates and executes the script, then processes **Tasks** and **Microtasks**.
- **Tasks** and **Microtasks** are scheduled, synchronous blocks of code. They are executed one at a time, and are placed in the **Task Queue** and **Microtask Queue**, respectively.
- For all of these, the **Call Stack** is used to keep track of function calls.
- Whenever **Microtasks** are executed, the **Microtask Queue** must be emptied out before the next **Task** can be executed.
- **Rendering** occurs between **Tasks**, but not between **Microtasks**.

### Notes

- The script evaluation step of the Event Loop is in itself treated similarly to a Task.
- The second argument of `setTimeout()` indicates a minimum time until execution, not a guaranteed time. This is due to the fact that Tasks execute in order and that Microtasks may be executed in-between.
- The behavior of the event loop in Node.js is similar, but has some differences. Most notably, there is no rendering step.
- Older browser versions did not completely respect the order of operations, so Tasks and Microtasks may execute in different orders.
