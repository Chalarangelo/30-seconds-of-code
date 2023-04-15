---
title: How can I use JavaScript to reload the page?
shortTitle: Reload page
type: story
tags: javascript,browser
author: chalarangelo
cover: night-tram
excerpt: Need to reload the current page using JavaScript? Here's the best way to do it, as well as some alternatives.
firstSeen: 2023-05-14T05:00:00-04:00
---

### The short answer

Most often than not, `window.location.reload()` is all you need to reload the current page. This method behaves exactly like the **browser's reload button**, using the same cache rules and everything.

```js
// Reload the page
window.location.reload();
```

### The slightly longer answer

While `window.location.reload()` is the most common way to reload a page, there are some nuances that you might need to be aware of.

As stated already, compatibility shouldn't be an issue, so we're not going to delve into that. However, there's a notable oddity concerning the method's arguments. As it turns out, **Firefox** used to support an optional `forceGet` boolean argument, which you might come across in older code. This means that passing a value of `true` to the method would bypass the **browser's cache**.

```js
// Bypass cache in Firefox
window.location.reload(true);
```

Apart from that, `window.location.reload()` will reload the page **keeping POST data** in forms, which might not be desired. In those situations, you might want to assign `window.location.href` to itself to cause a reload. This will cause the page to reload, but will also clear the POST data.

```js
// Clear POST data
window.location.href = window.location.href;
```

This technique also comes with some caveats. For example, if the current **URL contains a hash**, the page won't reload. In this case, you might want to use `String.prototype.split()` to remove the hash from the URL and then assign it to itself.

```js
// Reload the page, removing the hash from the URL
window.location.href = window.location.href.split('#')[0];
```

As you can see, each technique has its pros and cons, so you should choose the one that best suits your needs. That being said, `window.location.reload()` is the most common and reliable way to reload a page, so it's the one you should use most of the time.
