---
title: View Git commits that manipulated a specific string
shortTitle: View commits that manipulated a string
language: git
tags: [commit]
cover: bunny-poster
excerpt: Learn how to view all commits that manipulated a specific string in a Git repository.
listed: true
dateModified: 2024-04-26
---

Finding all commits that **manipulated a specific string** in a Git repository sounds like a pretty tricky task, if you don't know how to do it. Fortunately, Git provides a straightforward way to search for commits that manipulated a given string.

Using `git log -S<string>`, you can find all commits that manipulated the specified `<string>`. The `-S` flag is used to look for differences that change the **number of occurrences** of the specified string.

You can additionally apply any other valid filters to the `git log` command to further narrow down the search results (e.g. by date range).

```shell
# Syntax: git log -S<string>

git log -S<string>
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
