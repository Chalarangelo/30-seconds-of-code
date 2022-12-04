---
title: "Tip: Prefetching resources in the browser"
shortTitle: Resource prefetching
type: tip
tags: webdev,html,browser
author: chalarangelo
cover: blog_images/playing-fetch.jpg
excerpt: Resource prefetching is a great technique to improve perceived page speed on your website and one that requires little to no effort. Learn how to use it today.
firstSeen: 2020-06-20T13:41:31+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Resource prefetching is a great technique to improve perceived page speed on your website and provide a better user experience, without a lot of effort. Prefetching happens in the browser as soon as it is idle, meaning it will not slow down the initial load, but rather utilize idle time to fetch and cache resources that might be useful later on.

To prefetch a resource, you can add a `<link>` tag with the `rel="prefetch"` attribute inside your document's `<head>` or `<body>`:

```html
<link rel="prefetch" href="./cool_page/data.json">
```

What this does is hint the browser that we will need this resource, so it should download it when idle and store it in the cache. Bear in mind that prefetching is more of a hint rather to the browser than anything else, so there are situations where the browser might ignore it (due to other browser downloads, user settings, connection issues etc.).

Prefetching resources can increase the perceived load time of a page or resource that is often requested, while also providing major performance benefits for resources such as webfonts, as they will download after the browser downloads, parses and styles the DOM. Currently resource prefetching only supports `http://` and `https://` links, however the same-origin restriction does not apply to resource prefetching, so you can download external resources if necessary.

Similarly, you can preload assets using the `rel="preload"` attribute, which are not hints but rather directions that the browser must follow:

```html
<link rel="preload" href="./important_page/data.json">
```

The only downside to preloading resources compared to prefetching is that [browser support](https://caniuse.com/#search=preload) might be low depending on when you are reading this.
