---
title: How can I detect the device type with JavaScript?
shortTitle: Detect device type
language: javascript
tags: [browser,regexp]
cover: clutter-2
excerpt: Learn how to detect whether a page is being viewed on a mobile device or a desktop.
listed: true
dateModified: 2024-06-03
---

Device detection is fairly useful in a multitude of tasks, such as **responsive design**, **analytics**, and **feature detection**. While there are many different ways to go about it, you can generally detect whether a page is being viewed on a mobile device or a desktop by using a regular expression to test the `Navigator.userAgent` property.

The `Navigator.userAgent` property contains a string representing the **user agent of the browser**. This string can be used to determine the type of device the user is using to view the page. Various devices have different user agent strings, which can be used to identify them.

For the most part a simple **regular expression** can cover almost all modern devices nowadays. Something like `/Mobile|Android|iPhone|iPad/i` should be enough to cover most mobile devices. Then, all you have to do is use `RegExp.prototype.test()` to check if the user agent string matches the regular expression.

```js
const detectDeviceType = () =>
  /Mobile|Android|iPhone|iPad/i.test(navigator.userAgent)
    ? 'Mobile'
    : 'Desktop';

detectDeviceType();
// 'Mobile' or 'Desktop'
```

> [!NOTE]
>
> An older version of this article used an **extended version of this expression** (`/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i`) to detect mobile devices. Since then, some of these patterns have become less common or even obsolete. If you need to detect specific devices, you might need to update the regular expression to match the user agents of the devices you are targeting.
