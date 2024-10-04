---
title: This is a test snippet, in JavaScript
language: javascript
tags: [link]
cover: do-more-computer
excerpt: This is a test snippet, do not publish it!
listed: false
dateModified: 2100-12-31
---

This is a **test** snippet. It is intended to provide a centralized place to _test_ all sorts of markdown content that one could produce in a post. It is not intended to be published. Always make sure the `dateModified` is in the far, far future.

## Headings

Supported heading levels are between `2` and `4` (inclusive). Level `1` is reserved for the post title.

## This is a level 2 heading with `some code`

In order to better test headings, we need to make sure that we have a lot of text here. The spacing between headings and paragraphs is imperative to get right.

### This is a level 3 heading with `some code`

- Lists might end up appearing right after a heading.
- We want to make sure they look correct, too.

#### This is a level 4 heading with `some code`

```html
<h4>Didn't see this one coming, huh?</h4>
```

This was a good opportunity to test what a code block would look like right after a heading. Hope it looks good!

## Links

Links come in all shapes and sizes. They are often in the form of an automatically generated reference, such as `Array.from()`.

Other times, they might be plain text linking to an internal resource, such as [this link](/snippets/demo/s/test-snippet.md).

And some other times, you might get a mixed content link, such as a link for the [modulo operator(`%`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder), which needs to be carefully styled to make sure it looks good.

However unlikely, it doesn't hurt to test for [`inline code block links that might break to a new line`](https://developer.mozilla.org/en-US/docs/Web/CSS/box-decoration-break) to make sure they render nicely.

## Code

**Code** is a key element in a website called _30 seconds of code_. Sometimes, it's `inline`, other times it's not. You might also have a key like <kbd>Cmd</kbd> in the text.

### Single code block, with a language

```js
// First we need to make sure lines that are 80 characters long fit snugly here.
const aFunction = (a, b = 2) => {
  if (a === b) return b;
  const c = a * b;
  const d = a > b ? `${a} is larger` : `${a} is smaller`;
  const e = 'something';
  return [e, { c, d }];
};
```

### Three consecutive code blocks, in different languages

```html
<div class="something">
  <p>Some text</p>
</div>
```

```css
.something {
  display: flex;
  flex-direction: column;
}
```

```js
const element = document.querySelector('.something');

if (element.innerText.match(/some text/gi)) {
  element.classList.add('some-class');
}
```

### Single code block, without a language

```
This is a code block without a language. It doesn't appear very often, yet it's important to make sure it looks good.

Let's also ensure lines wrap on their, as needed. Might come in handy!
```

## Other elements

There's a few more elements and some cases we should cover just to be safe.

### Image illustrations

![Diagram of Flexbox properties](./illustrations/flexbox-diagram.svg)

### Blockquotes

> This is a blockquote by some not-so-famous person. It's important to make sure it looks good, too. Let's also throw in a tiny bit of `code` for good measure.

> And this is a multi-paragraph blockquote.
>
> Notice how it's a little different.

### Horizontal rules

Apart from text, there are also horizontal rules.

---

We don't use them all that often, but you can see one above.

### Special inline elements

Some other elements appear less frequently. Namely there's <small>small text</small>, which is relatively uncommon, exponents that look like <sup>this</sup> and this weird <sub>sub thing</sub> that we don't really use anywhere.

### Tables

Tables are quite special and they may be used in a few places. Let's make sure they look great.

|    | Cookies | Local storage | Session storage |
| -- | -- | -- | -- |
| **Capacity** | 4KB | 10MB | 5MB |
| **Accessible from** | Any window | Any window | Same tab |
| **Expiration** | Manually set | Never | On tab close |
| **Storage location** | Browser and server | Browser only | Browser only |
| **Sent with requests** | Yes | No | No |
| **Blockable by users** | Yes | Yes | Yes |
| **Editable by users** | Yes | Yes | Yes |

### Lists

Somehow, we forgot about lists, but they are something we use a ton.

- This is a list item
- Part of an unordered list
- That has a few items
  - Sometimes we have sub-items
  - That are also unordered
- And we can go back to the main list

1. This is a list item
2. Part of an ordered list
3. That has a few items
   1. Sometimes we have sub-items
   2. That are also ordered
4. And we can go back to the main list

### Admonitions

> [!NOTE]
>
> Useful information that users should know, even when skimming content.

> [!TIP]
>
> Helpful advice for doing things better or more easily.

> [!IMPORTANT]
>
> Key information users need to know to achieve their goal.

> [!WARNING]
>
> Urgent info that needs immediate user attention to avoid problems.

> [!CAUTION]
>
> Advises about risks or negative outcomes of certain actions.

> [!NOTE]
>
> A more complex admonition.
>
> This one has a few paragraphs.
> It also has some **strong** text.

### Embedded content

https://codepen.io/chalarangelo/pen/mdodgeL
