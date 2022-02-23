---
title: "Tip: How to add multiple authors to a commit"
type: tip
tags: git,github,programming,webdev
author: chalarangelo
cover: blog_images/book-chair.jpg
excerpt: Learn how to add multiple authors to a git commit with this quick and easy tip.
firstSeen: 2020-08-18T12:14:24+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

You can add multiple authors to a git commit, by adding one or more `Co-authored-by` trailers to the commit's message:

```shellsession
$ git commit -m "Refactor usability tests.
>
>
Co-authored-by: name <name@example.com>
Co-authored-by: another-name <another-name@example.com>"
```

### Notes:

- To correctly attribute a commit to a co-author, you must use the email associated with their GitHub account.
- If a person's email is private, you can use their GitHub-provided `no-reply` email.
- Leave one or preferably two empty lines before any `Co-authored-by` trailers.
