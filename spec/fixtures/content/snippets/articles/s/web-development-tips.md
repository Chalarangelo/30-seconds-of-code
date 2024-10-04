---
title: Web development tips
test: true
tags: [webdev]
cover: do-more-computer
excerpt: This is a test snippet, do not publish it!
listed: false
dateModified: 2021-09-27
---

This is a **test** snippet. It is intended to provide a centralized place to _test_ all sorts of `markdown` content that one could produce in a post.

## This is a level 2 heading with `some code`

Links come in all shapes and sizes. They are often in the form of an automatically generated reference, such as `Array.from()`.

And some other times, you might get a mixed content link, such as a link for the [modulo operator(`%`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder), which needs to be carefully styled to make sure it looks good.

```js [aFunction.js]
// First we need to make sure lines that are 80 characters long fit snugly here.
const aFunction = (a, b = 2) => {
  if (a === b) return b;
  const c = a * b;
  const d = a > b ? `${a} is larger` : `${a} is smaller`;
  const e = 'something';
  return [e, { c, d }];
};
```

> [!TIP]
>
> Helpful advice for doing things better or more easily.

There's a few more elements and some cases we should cover just to be safe.

![Diagram of Flexbox properties](./illustrations/flexbox-diagram.svg)

> This is a quote by some not-so-famous person.

---

There's <small>small text</small>, <sup>exponents</sup> and this weird <sub>sub thing</sub>.

|    | Cookies | Local storage | Session storage |
| -- | -- | -- | -- |
| **Capacity** | 4KB | 10MB | 5MB |
| **Accessible from** | Any window | Any window | Same tab |
| **Expiration** | Manually set | Never | On tab close |
| **Storage location** | Browser and server | Browser only | Browser only |
| **Sent with requests** | Yes | No | No |
| **Blockable by users** | Yes | Yes | Yes |
| **Editable by users** | Yes | Yes | Yes |

Tables are quite special and they may be used in a few places. Let's make sure they look great.

1. This is a list item
2. Part of an ordered list
3. That has a few items
   1. Sometimes we have sub-items
   2. That are also ordered
4. And we can go back to the main list

> [!WARNING]
>
> Urgent info that needs immediate user attention to avoid problems.
