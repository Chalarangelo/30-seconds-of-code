---
title: What is the difference between Object.freeze() and Object.seal() in JavaScript?
type: question
tags: javascript,object
author: chalarangelo
cover: blog_images/frozen-globe.jpg
excerpt: Both `Object.freeze()` and `Object.seal()` serve a similar purpose, but there's one key difference you need to remember.
firstSeen: 2022-02-06T05:00:00-04:00
---

Both `Object.freeze()` and `Object.seal()` serve as ways to prevent a JavaScript object from being altered. Although similar, they have a key difference that you need to remember.

```js
const frozen = Object.freeze({ username: 'johnsmith' });
const sealed = Object.seal({ username: 'johnsmith' });

frozen.name = 'John Smith';  // frozen = { username: 'johnsmith' }
sealed.name = 'John Smith';  // sealed = { username: 'johnsmith' }

delete frozen.username;      // frozen = { username: 'johnsmith' }
delete sealed.username;      // sealed = { username: 'johnsmith' }

frozen.username = 'jsmith';  // frozen = { username: 'johnsmith' }
sealed.username = 'jsmith';  // sealed = { username: 'jsmith' }
```

If you want to prevent new properties from being added and existing properties from being removed, then both methods will suit your needs. If, however, you want to prevent existing properties from being altered, then you have to use `Object.freeze()`. The reason for that is that `Object.seal()` only marks existing properties as non-configurable, meaning their values can be changed as long as they are writable.

|  | Create | Read | Update | Delete |
| --- | --- | --- | --- | --- |
| `Object.freeze()` | No | Yes | No | No |
| `Object.seal()` | No | Yes | Yes | No |

As a closing note, remember that both methods perform a shallow freeze/seal on the object. This means that nested objects and arrays are not frozen or sealed and can be mutated. To prevent this, you can deep freeze objects, as described in [this related article](/articles/s/javascript-deep-freeze-object).
