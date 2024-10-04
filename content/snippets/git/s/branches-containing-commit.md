---
title: Find branches containing a specific Git commit
shortTitle: Find branches containing commit
language: git
tags: [branch,commit]
cover: dark-leaves
excerpt: Learn how to filter branches based on whether they contain a specific commit or not.
listed: true
dateModified: 2023-05-25
---

Commits are the building blocks of Git, used to track changes to a repository. They can be used to identify specific points in a repository's history, and can be referenced by their commit hash. But apart from finding a commit, how can you find all the branches containing it? This sort of information can be useful when you want to find out which branches contain a specific bugfix or feature.

## Branches that contain a commit

As usual, Git has a simple solution to this problem. Using `git branch` with the `--contains` flag will print all the **branches containing a specific commit**.

```shell
# Syntax: git branch --contains <commit>

git branch --contains 3050fc0
# development
# network-fixes
```

## Branches that don't contain a commit

Similarly, you can look for **branches that don't contain a specific commit** by using the `--no-contains` flag.

```shell
# Syntax: git branch --no-contains <commit>

git branch --no-contains 3050fc0
# master
# adapter-feature
```
