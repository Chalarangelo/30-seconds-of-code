---
title: "Tip: How to add multiple authors to a commit"
type: tip
tags: git,github,programming,webdev
authors: chalarangelo
cover: blog_images/book-chair.jpg
excerpt: Learn how to add multiple authors to a git commit with this quick and easy tip.
---

You can add multiple authors to a git commit, by adding one or more `Co-authored-by` trailers to the commit's message:

```sh
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

**Image credit:** [Taylor Simpson](https://unsplash.com/@taylorgsimpson?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
