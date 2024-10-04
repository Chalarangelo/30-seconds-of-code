---
title: View Git commits by a certain author or committer
shortTitle: View commits by author or committer
language: git
tags: [repository,commit]
cover: comic-glasses
excerpt: If you're looking for a way to find commits by a specific author or committer in a Git repository, look no further.
listed: true
dateModified: 2024-04-25
---

When viewing the commit history of a Git repository, you might want to **filter** the commits by author or committer. As is often the case, Git has you covered.

## View commits by a specific author

When you're looking for commits made by a **specific author**, you can use `git log --author=<author>` to filter the commit history. Replace `<author>` with the name of the author you're interested in.

```shell
# Syntax: git log --author=<author>

git log --author="Duck Quacking"
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```

## View commits by a specific committer

Similarly, to filter commits by a **specific committer**, you can use `git log --committer=<committer>`, replacing `<committer>` with the name of the committer you're interested in.

```shell
# Syntax: git log --committer=<committer>

git log --committer="Duck Quacking"
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
