---
title: What is CORS?
shortTitle: CORS explained
type: question
tags: [javascript,browser,webdev]
author: chalarangelo
cover: chill-surfing
excerpt: CORS (Cross-Origin Resource Sharing) trips up many developers, but it's pretty easy to wrap your head around.
dateModified: 2023-05-07T05:00:00-04:00
---

When it comes to HTTP, an **origin** is defined by several different aspects of a URL. As mentioned in a [previous article](/articles/s/js-window-location-cheatsheet/), the origin is composed of the following:

- The **protocol** (e.g. `http` or `https`)
- The **hostname** (e.g. `30secondsofcode.org`)
- The **port** (e.g. `80` or `3000`)

As long as **all three** of these match, the browser considers the two URLs to be **same-origin**. If any of these aspects differ, the browser considers the two URLs to be **cross-origin**. It might be helpful to look at some examples of different origins to clarify:

- `http://30secondsofcode.org` and `https://www.30secondsofcode.org` (different protocols)
- `http://www.30secondsofcode.org` and `http://dev.30secondsofcode.org` (different hostnames)
- `https://30secondsofcode.org` and `https://30secondsofcode.org:3000` (different ports)

It's also important to note that the **path** (everything that comes after the hostname) is **not part of the origin**. This means that `https://30secondsofcode.org` and `https://30secondsofcode.org/articles` are considered to be the same origin.

When **CORS** (Cross-Origin Resource Sharing) is mentioned, it's usually in the context of **Same-Origin Policy**, a security feature implemented by web browsers. It **blocks web pages from making cross-origin requests** with the purpose of preventing malicious websites from making unauthorized requests to sensitive resources on other domains.

As this can be quite restrictive, CORS allows the server to specify which other domains are allowed to make requests to its resources. This is done through the use of **CORS headers**, `Origin` in the request and `Access-Control-Allow-Origin` in the response. This way, for example, API servers can allow requests from specific web pages, while still blocking requests from other domains.
