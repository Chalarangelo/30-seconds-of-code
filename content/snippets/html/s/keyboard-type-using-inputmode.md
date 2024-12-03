---
title: Display the right type of keyboard for form inputs
shortTitle: Keyboard type using inputmode
language: html
tags: [form]
cover: yellow-shoes
excerpt: Keyboard input on mobile devices is hard to get right. Here's how to ensure the right keyboard is displayed for each input.
listed: true
dateModified: 2024-12-03
---

A common issue with form inputs on **mobile devices** is that the wrong keyboard is displayed, making it harder for users to fill out the form. For example, a numeric keyboard should be shown for a phone number input, but a regular keyboard is displayed instead. This can be frustrating for users and can lead to incorrect input.

Luckily, HTML has a **built-in solution** for this, via the [`inputmode`](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode) attribute. This attribute allows you to specify the **type of keyboard** that should be displayed for an input field. Here's how you can use it:

```html
<label>
  Phone number: <input type="tel" inputmode="tel" />
</label>
```

In this example, the `inputmode="tel"` attribute tells the browser to display a telephone keypad for the input field, making it easier for users to enter a phone number. Here's **all the possible values** for the `inputmode` attribute:

- `none`: No virtual keyboard is shown.
- `text`: A regular keyboard is shown.
- `url`: A URL keyboard is shown (includes keys like <kbd>.com</kbd> and <kbd>/</kbd>).
- `email`: An email keyboard is shown (includes keys like <kbd>@</kbd> and <kbd>.</kbd>).
- `tel`: A telephone keypad is shown.
- `search`: A search keyboard is shown (includes a <kbd>Go</kbd> button).
- `numeric`: A numeric keyboard is shown.
- `decimal`: A numeric keyboard with a decimal point is shown.

> [!WARNING]
>
> The `inputmode` attribute is not a replacement for the [`type`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attr-type) attribute. The former acts as a hint to the browser about the type of keyboard to display, while the latter specifies the type of data expected in the input field.
