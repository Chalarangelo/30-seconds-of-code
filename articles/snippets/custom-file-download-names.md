---
title: "Tip: Customize the names of downloadable files"
shortTitle: Customize the names of downloadable files
type: tip
tags: [webdev,html,browser]
author: chalarangelo
cover: hard-disk
excerpt: Learn what HTML5 attribute you can use to customize the names of your downloadable files with this quick tip.
dateModified: 2021-06-12T19:30:41+03:00
---

HTML5 introduced a variety of convenient features that many of us use every day. As downloadable links aren't something I work with very often, I recently found out that you can use the `download` attribute on an `<a>` element for much more than just making it trigger a download. In fact, you can pass it a string value that will act as the name of the downloadable file, effectively allowing you to customize its name:

```html
<!-- The downloaded file will be named 'June-2020.csv' -->
<a href="/data/2020/06/report.csv" download="June-2020.csv">June 2020</a>
```
