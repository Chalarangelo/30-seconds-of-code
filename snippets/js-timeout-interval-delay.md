---
title: How delays work in JavaScript timing functions
shortTitle: Delays in JavaScript timing functions
type: story
tags: [javascript,browser,timeout]
author: chalarangelo
cover: river-house-lights
excerpt: Did you know that the delay of `setTimeout()` and `setInterval()` is merely a suggestion?
dateModified: 2022-10-26T05:00:00-04:00
---

JavaScript provides two widely used timing functions, `setTimeout()` and `setInterval()`. Both of these functions execute a specified function after a given amount of time either once or repeatedly. While this is straightforward, many people don't realize that **the delay is merely a suggestion** and can be altered by a number of factors.

### Delays are not exact

I went into detail about how JavaScript engines execute code in [the Event Loop explanation](/articles/s/javascript-event-loop-explained), but let me recap here. As JavaScript is single-threaded, tasks are queued to be executed in a loop. Thus, `setTimeout()` and `setInterval()` are tasks that will be executed after at least the given amount of time has elapsed. There is no guarantee, however, that the task will be executed exactly after the given amount of time has elapsed. The delay is a suggestion, signifying the **minimum amount of time** that must pass before the task is executed. The actual delay can be longer, depending on the current state of the JavaScript engine.

### Browser factors

Apart from engine-related delays, there are a few other factors that play a role in the actual delay of a task. Briefly, these are:

- Browsers **throttle nested timeouts and intervals** with a delay of at least 4ms, but this can vary depending on the browser.
- Timeouts and intervals in **inactive/background tabs are throttled** to a minimum of 1000ms to increase battery life.
- **Known tracking scripts in background tabs** can be throttled even further after a certain amount of time.

On a side note, some browsers store delays as a 32-bit signed integer, meaning that delays over 24.8 days will cause an overflow and execute immediately.
