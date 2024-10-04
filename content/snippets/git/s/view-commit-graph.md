---
title: View a visual graph of the Git repository
shortTitle: View commit graph
language: git
tags: [repository]
cover: city-view
excerpt: If you're more of a visual person, you can view a graph of all commits and branches in the repository using a single Git command.
listed: true
dateModified: 2024-04-25
---

If you're more of a visual person, you can view a **graph of all commits and branches** in the repository using a single Git command.

Running `git log --pretty=oneline --graph --decorate --all` prints a visual graph of the whole repository's history. This command displays a **visual representation** of all commits and branches in the repository. You can then use the arrow keys to navigate, or press <kbd>Q</kbd> to exit.

```shell
# Syntax: git log --pretty=oneline --graph --decorate --all

git log --pretty=oneline --graph --decorate --all
# * 3050fc0de Fix network bug
# * c191f90c7 Initial commit
```
