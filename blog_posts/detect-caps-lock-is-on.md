---
title: How can I detect if Caps Lock is on with JavaScript?
type: story
tags: javascript,browser,event
authors: chalarangelo
cover: blog_images/keyboard.jpg
excerpt: If you need to check if Caps Lock is on when the user is typing in the browser, JavaScript's got you covered.
---

Oftentimes, especially when creating password inputs, you need to check if the Caps Lock key is on and inform the user. You can do that using the [`KeyboardEvent.getModifierState()`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState) method with a value of `'CapsLock'`. This means that you have to listen for a keyboard event on an element in order to check the state of the Caps Lock key:

```html
<form>
  <label for="username">Username:</label>
  <input id="username" name="username">

  <label for="password">Password:</label>
  <input id="password" name="password" type="password">
  <span id="password-message" style="display: none">Caps Lock is on</span>
</form>
```

```js
const el = document.getElementById('password');
const msg = document.getElementById('password-message');

el.addEventListener('keyup', e => {
  msg.style = e.getModifierState('CapsLock')
    ? 'display: block'
    : 'display: none';
});
```

As you can see from the above example, the `'keyup'` event is used on our element of choice to then call `KeyboardEvent.getModifierState()` and determine the state of the `'CapsLock'` key. `'keydown'` and `'keypress'` might also work. However, after testing on multiple devices, it seems that using `'keyup'` is the preferred method as it works better across different OSes and browsers.

**Image credit:** [Markus Winkler](https://unsplash.com/@markuswinkler?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
