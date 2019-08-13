---
title: Event loop
tags: Event loop
---

The event loop handles all asynchronous callbacks. 
Callbacks are queued in a loop, while other code runs, and will run one by one when the response for each one has been received.
The event loop allows JavaScript to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded.
