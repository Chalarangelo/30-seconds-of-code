---
title: View differences in Git changes
shortTitle: View differences in changes
language: git
tags: [commit,branch]
cover: plant-candle
excerpt: View differences between staged or unstaged changes and the last commit in Git.
listed: true
dateModified: 2024-04-21
---

When working with Git, you'll often need to view the **differences between your changes and the last commit**. This can help you understand what you've modified, what you're about to commit, and what changes you've made since the last commit.

Git provides the `git diff` command to help you with this, allowing you to compare your changes with the last commit. The result will show you the differences between your **unstaged** changes, by default, but you can view the differences between your **staged** changes and the last commit instead, using the `--staged` option.

```shell
# Syntax: git diff [--staged]

git diff
# Displays the differences between unstaged changes and the last commit

git diff --staged
# Displays the differences between staged changes and the last commit
```
