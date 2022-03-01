---
title: "Tip: Debugging Node.js using Chrome Developer Tools"
type: tip
tags: javascript,node,debugging
expertise: intermediate
author: chalarangelo
cover: blog_images/bug.jpg
excerpt: Did you know you can use Chrome Developer Tools to debug your Node.js code? Find out how in this short guide.
firstSeen: 2020-07-15T16:10:13+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Node.js can be debugged using Chrome Developer Tools since `v6.3.0`. Here's a quick guide on how to do this:

1. Download and install Node.js `v6.3.0` or newer, if you don't already have it installed on your machine.
2. Run node with the `--inspect-brk` flag (e.g. `node --inspect-brk index.js`).
3. Open `about:inspect` in a new tab in Chrome. You should see something like the screenshot below.
4. Click `Open dedicated DevTools for Node` to open a new window connected to your Node.js instance.
5. Use the Developer Tools to debug your Node.js application!

![about:inspect page](./blog_images/chrome-debug-node.png)
