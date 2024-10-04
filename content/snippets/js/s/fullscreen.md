---
title: Toggle fullscreen mode for an element using JavaScript
shortTitle: Fullscreen mode
language: javascript
tags: [browser]
cover: cloudy-mountaintop-2
excerpt: Did you know you can use JavaScript to toggle fullscreen mode for an element on a webpage? Let's learn how!
listed: true
dateModified: 2024-05-23
---

Modern web APIs are powerful and allow you to interact with the browser in ways that were previously only possible with plugins or extensions. One such API is provided via the `Element.requestFullscreen()` method, which allows you to **display an element in fullscreen mode**.

> [!CAUTION]
>
> This feature is marked as **limited availability**. At the time of writing, **Safari** is the notable exception, as it doesn't support it. It's also worth noting that fullscreen mode can be intrusive to users, so use it judiciously.

Given a target element, you can use JavaScript to toggle fullscreen mode for that element. In order to **toggle fullscreen mode on**, you can use the `Element.requestFullscreen()` method. To **exit fullscreen mode**, you can use the `Document.exitFullscreen()` method.

```js
document.body.requestFullscreen(); // Opens `body` in fullscreen mode
document.exitFullscreen(); // Exits fullscreen mode
```

If you want to further **customize the fullscreen behavior**, you can use the [`navigationUI`](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#navigationui) option in the `Element.requestFullscreen()` method. This option allows you to specify whether the browser should display **navigation UI** (such as the address bar) while in fullscreen mode.

```js
const toggleFullscreen = (mode = true, el = 'body', ui = 'auto') =>
  mode
    ? document.querySelector(el).requestFullscreen({ navigationUI: ui })
    : document.exitFullscreen();

toggleFullscreen();
// Opens `body` in fullscreen mode
toggleFullscreen(false);
// Exits fullscreen mode
toggleFullscreen(true, '#myElement', 'hide');
// Opens `#myElement` in fullscreen mode without navigation UI
```

As soon as an element's **fullscreen mode changes**, it will trigger the `fullscreenchange` event on the `document`. You can listen for this event to perform additional actions when the fullscreen mode changes. If the **fullscreen mode is rejected**, the `fullscreenerror` event will be triggered instead.

```js
document.addEventListener('fullscreenchange', () => {
  console.log('Fullscreen mode changed!');
});

toggleFullscreen(); // Opens `body` in fullscreen mode
// LOGS: Fullscreen mode changed!
toggleFullscreen(false); // Exits fullscreen mode
// LOGS: Fullscreen mode changed!
```

> [!NOTE]
>
> Fullscreen mode comes with **plenty of caveats**. Be sure to check the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/requestFullScreen#compatible_elements) for more information on how to use it.
