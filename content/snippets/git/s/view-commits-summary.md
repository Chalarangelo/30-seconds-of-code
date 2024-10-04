---
title: View a short summary of Git commits
shortTitle: Short commits summary
language: git
tags: [repository,commit]
cover: dark-city
excerpt: Learn how to view a short summary of your Git commits using git log.
listed: true
dateModified: 2023-05-23
---

One of the most common things you might need to do when working with Git is to view a short summary of your commits. While `git log` is the go-to command for this, it can be a bit verbose at times. Luckily, it provides a plethora of options to help you customize its output.

## Short summary of all commits

One of these is `--oneline`, which is actually a shorthand for `--pretty=oneline --abbrev-commit`. It prints a short summary of all commits, with each commit being printed on a single line.

```shell
git log --oneline
# d540ba1 Merge network bug fix
# 3050fc0 Fix network bug
# c191f90 Initial commit
```

Notice the short, 7-character commit identifiers. This is because of the `--abbrev-commit` option, which abbreviates the commit SHA-1 checksum to 7 characters. This shorter string is enough to uniquely identify a commit.

## Short summary of commits without merges

Other options can be used in conjunction with `--oneline` to further customize the output. For example, you can use `--no-merges` to exclude merge commits from the output.

```shell
git log --oneline --no-merges
# 3050fc0 Fix network bug
# c191f90 Initial commit
```
