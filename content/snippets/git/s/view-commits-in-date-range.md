---
title: View Git commits in a specific date range
shortTitle: View commits in date range
language: git
tags: [repository,commit]
cover: organizer
excerpt: View all commits in a specific date range using `git log`.
listed: true
dateModified: 2024-03-29
---

The `git log` command can be used for all sorts of things, including **filtering commits** based on various criteria. One of the most common use cases is to view all **commits in a specific date range**. This can be useful when you want to see what changes were made during a specific period of time, or when you're trying to track down a bug that was introduced at a certain point in time.

## View commits between two dates

Using `git log --since=<date-from> --until=<date-to>`, you can view all commits **between** `<date-from>` and `<date-to>`. The dates can be specified in a variety of formats, such as `YYYY-MM-DD`, `MM/DD/YYYY`, or even relative terms like `yesterday`, `2 weeks ago`, etc.

```shell
# Syntax: git log [--since=<date-from>] [--until=<date-to>]

git log --since='Apr 1 2021' --until='Apr 4 2021'
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```

## View commits since a specific date

Moreover, to only view commits **since** a specific date, you can use `git log --since=<date-from>`.

```shell
# Syntax: git log --since=<date-from>

git log --since='2 weeks ago'
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```

## View commits until a specific date

Similarly, if you only want to see commits **up to** a specific date, you can use `git log --until=<date-to>`.

```shell
# Syntax: git log --until=<date-to>

git log --until='yesterday'
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
