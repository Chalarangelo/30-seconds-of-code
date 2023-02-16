---
title: What is the difference between async and defer in script loading?
shortTitle: Async and defer
type: question
tags: javascript,html
author: chalarangelo
cover: coworking-space
excerpt: Understanding how to correctly load your JavaScript files can significantly improve your web application's performance.
firstSeen: 2022-09-04T05:00:00-04:00
---

When it comes to loading JavaScript files, there are a few different options available. Understanding exactly how scripts are loaded and executed is crucial for website performance, as well as for the overall quality of the user experience. Let's take a look at how the `<script>` tag works and how certain attributes affect its behavior.

![Script loading visualization](./blog_images/async-defer.png)

### No attributes

More often than not, a plain `<script>` tag without attributes is what most people tend to start with. This implements the default browser behavior. The HTML will be parsed until the script tag is encountered. At this point, HTML parsing will be paused and the script will be loaded. The script will then be executed before HTML parsing can resume.

```html
<script src="script.js"></script>
```

As you can see, this method can cause a long pause in HTML parsing, resulting in a degraded user experience.

### The async attribute

To avoid a long pause in HTML parsing, the `async` attribute can be leveraged. This ensures that, when the script is encountered, parsing doesn't pause right away. Instead, the script is loaded in the background and only the HTML parsing is paused to execute it. HTML parsing resumes as usual after script execution is completed.

```html
<script src="script.js" async></script>
```

While the `async` attribute takes steps to mitigate the issue mentioned previously, it comes with an important caveat. Scripts loaded this way are not guaranteed to execute in the order specified, but rather as they become available when they are loaded.

### The defer attribute

Finally, the `defer` attribute builds on top of the previous behavior to guarantee order of execution for scripts. As previously, scripts are loaded in the background as they are encountered. When the HTML parsing finishes, they are then executed in order.

```html
<script src="script.js" defer></script>
```
