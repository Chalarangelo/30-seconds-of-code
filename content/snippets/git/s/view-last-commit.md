---
title: View the last Git commit
shortTitle: View last commit
language: git
tags: [commit]
cover: clouds-n-mountains
excerpt: Learn how to view the last commit in Git using the `git log` command.
listed: true
dateModified: 2024-04-23
---

Checking the contents of the last Git commit can sometimes be useful to orient yourself in the repository's history. The `git log` command can help you with this by displaying the last commit in the repository.

Using `git log -1`, you can view the last commit in the repository. This command will show you the **commit hash**, **author**, **date**, and **commit message** of the last commit. You can navigate through the commit history using the arrow keys and exit by pressing <kbd>Q</kbd>.

```shell
# Syntax: git log -1

git log -1
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
