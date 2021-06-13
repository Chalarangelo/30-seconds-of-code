---
title: How can I execute an event handler at most once?
type: question
tags: javascript,browser,event
authors: maciv
cover: blog_images/dog-waiting.jpg
excerpt: Learn how to attach an event handler to events that is executed at most once in this JavaScript blog post.
firstSeen: 2020-08-12T11:21:48+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

### jQuery

Back in the day when jQuery was all the rage, we would usually use [`$.one()`](https://api.jquery.com/one/) to create an event handler that would execute at most once for a given event per element. A simple example would be as follows:

```html
<button id="my-btn">Click me!</button>
```

```js
$('#my-btn').one('click', () => {
  console.log('Hello!');  // 'Hello!' will only be logged on the first click
});
```

### Using a flag

However, jQuery seems to have fallen out of favor lately and thus many developers have resorted to writing their version of `$.one()`. An implementation could look like this:

```js
const listenOnce = (el, evt, fn) => {
  let fired = false;
  el.addEventListener(evt, (e) => {
    if (!fired) fn(e);
    fired = true;
  });
};

listenOnce(
  document.getElementById('my-btn'),
  'click',
  () => console.log('Hello!')
);  // 'Hello!' will only be logged on the first click
```

In this implementation, we use a flag, `fired`, to check if the event has been triggered before and only execute the passed callback, `fn`, the first time the event is triggered. There are some details that we might have omitted such as removing the listener, but overall this is a reasonably solid implementation.

### Event listener options

If you are targeting modern browsers (i.e. not IE), [`EventTarget.addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) has introduced the `options` object parameter, which allows us to pass a few different flags, one of which is `once`. Setting `once` to `true` results in the exact same behavior as the snippet above with minimal effort.

Here's one way to write the previous snippet using `once`, which also happens to be how we implemented the latest version of the [listenOnce snippet](/js/s/listen-once):

```js
const listenOnce = (el, evt, fn) => el.addEventListener(evt, fn, { once: true });

listenOnce(
  document.getElementById('my-btn'),
  'click',
  () => console.log('Hello!')
);  // 'Hello!' will only be logged on the first click
```
