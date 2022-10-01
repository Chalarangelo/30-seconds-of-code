---
title: Resource Preloading Cheat Sheet
type: cheatsheet
tags: webdev,html,browser
expertise: beginner
author: chalarangelo
cover: blog_images/folded-map.jpg
excerpt: Preloading content is one of many ways to improve your website's performance.
firstSeen: 2022-10-12T05:00:00-04:00
---

Preloading content is one of many ways to improve web performance. The `rel` attribute of the `link` element can be used to instruct the browser how to handle different resources. Here's a handy cheatsheet to help you remember the different values and their effects.

- `rel="preload"`: Download the resource as soon as possible. Used when you're going to need a resource in a few seconds, on the same page.
- `rel="prefetch"`: Suggest that the resource is fetched in advance. Used when you're going to need a resource for the next page.
- `rel="preconnect"`: Establish a connection to the linked website, to speed up fetching resources from it later. Used when you're going to need a resource, but you don't know its full URL yet.
- `rel="dns-prefetch"`: Resolve the DNS for the linked website, to speed up fetching resources from it later. Used when you're going to need a resource, but you don't know its full URL yet (mainly for older browsers).
- `rel="prerender"`: Preload the resource and render it in the background, speeding up page load in the future. Used when users are likely to navigate to a specific page.
- `rel="modulepreload"`: Preload a JavaScript module script. Used when you're going to need an ES module script soon.
