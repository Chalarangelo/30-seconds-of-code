---
title: How can I find the merge commit given a Git commit?
shortTitle: Merge commit for a commit
language: git
tags: [commit]
cover: travel-mug-1
excerpt: Looking for the merge commit where the changes from a given commit were merged into a branch? Here's how you can find it.
listed: true
dateModified: 2024-05-04
---

Oftentimes, we know the commit hash of a specific Git commit and want to find the **merge commit** where the changes from that commit were merged into a branch.

This can be especially useful if your team uses GitHub and you want to find the **pull request** that introduced a specific change. It's also pretty helpful when you need to understand the **context** of a commit and how it fits into the project's history or when you're looking for **files related to a change**.

While there are a few different solutions that might work under different circumstances, after trial and error and a whole lot of Googling, I found a method that works pretty well. [Adding the following alias](/git/s/aliases) to your **Git configuration** will allow you to use `git find-merge <commit>` to find the merge commit for a given commit hash.

```editorconfig [~/.gitconfig]
[alias]
  find-merge = "!sh -c 'commit=$0 && branch=${1:-HEAD} && (git rev-list $commit..$branch --ancestry-path | cat -n; git rev-list $commit..$branch --first-parent | cat -n) | sort -k2 -s | uniq -f1 -d | sort -n | tail -1 | cut -f2'"
```

```shell
# Syntax: git find-merge <commit>

git find-merge 3050fc0
# c2ec1385b47a4b9024bdde77c0978a34359480ac
```

Using `git rev-list`, the command lists all the **commits between the given commit and the branch**, first following the full ancestry path and then following only the first parent. The output of these two commands is then concatenated, sorted, and filtered to find the **merge commit** where the two paths converge. Finally, the resulting **commit hash** is returned.
