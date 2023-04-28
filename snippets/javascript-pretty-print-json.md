---
title: "Tip: Pretty-print a JSON object with JavaScript"
shortTitle: Pretty-print JSON
type: tip
tags: [javascript,object,json]
author: chalarangelo
cover: memories-of-pineapple-3
excerpt: Pretty-printing JSON objects in pretty easy and customizable in JavaScript. Here's the gist of it.
dateModified: 2022-07-30T05:00:00-04:00
---

Pretty-printing refers to the process of making some data more human-readable. In regards to JSON, it's primarily the process of indenting the data so that it is easier to read. This is pretty easy to accomplish, using `JSON.stringify()` with the appropriate arguments.

```js
const obj = {
  id: 1182,
  username: 'johnsmith',
  active: true,
  emails: ['johnsmith@mysite.com', 'contact@johnsmi.th'],
};

JSON.stringify(obj, null, 2);
// {
//   "id": 1182,
//   "username": "johnsmith",
//   "active": true,
//   "emails": [
//     "johnsmith@mysite.com"
//     "contact@johnsmi.th"
//   ]
// }
```

As you can see in this example, the third argument of `JSON.stringify()` is the number of spaces to indent each level of the object. Additionally, you can use the second argument to specify a replacer function. This can come in handy if you want to provide custom formatting for certain types of values or specific key-value pairs.

```js
const obj = {
  id: 1182,
  username: 'johnsmith',
  active: true,
  emails: ['johnsmith@mysite.com', 'contact@johnsmi.th'],
};

const replacer = (key, value) => {
  if (key === 'id') return value.toString(16);
  if (key === 'username') return `@${value}`;
  if (key === 'emails') return `${value[0]} +${value.length - 1} more`;
  return value;
};

JSON.stringify(obj, replacer, 2);
// {
//   "id": "0x4e2",
//   "username": "@johnsmith",
//   "active": true,
//   "emails": "johnsmith@mysite.com +1 more"
// }
```
