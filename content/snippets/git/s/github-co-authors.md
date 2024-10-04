---
title: How to add multiple authors to a commit
shortTitle: Add multiple authors to a commit
language: git
tags: [github,programming,webdev]
cover: book-chair
excerpt: Learn how to add multiple authors to a git commit with this quick and easy tip.
listed: true
tocEnabled: false
dateModified: 2021-06-12
---

You can add multiple authors to a git commit, by adding one or more `Co-authored-by` trailers to the commit's message:

```shellsession
$ git commit -m "Refactor usability tests.
>
>
Co-authored-by: name <name@example.com>
Co-authored-by: another-name <another-name@example.com>"
```

## Notes

- To correctly attribute a commit to a co-author, you must use the email associated with their GitHub account.
- If a person's email is private, you can use their GitHub-provided `no-reply` email.
- Leave one or preferably two empty lines before any `Co-authored-by` trailers.
