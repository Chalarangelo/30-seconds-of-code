---
title: Optimize the local Git repository
shortTitle: Optimize local repository
language: git
tags: [repository]
cover: automaton
excerpt: Is your Git repository getting bloated? Optimize it by garbage collecting loose objects.
listed: true
dateModified: 2024-04-13
---

Is your Git repository getting bloated? Maybe you've seen a significant increase in the repository size, or you're experiencing performance issues. One way to address this is by **optimizing the local repository**.

Using `git gc --prune=now --aggressive`, you can **garbage collect loose objects** in the repository. This command will optimize the repository by removing unnecessary objects and compressing the repository data.

```shell
# Usage: git gc --prune=now --aggressive

git gc --prune=now --aggressive
# Optimizes the local repository
```

> [!NOTE]
>
> The command might take a minute to run, so hang back and let Git do its magic. Once it's done, you should see an optimized repository with improved performance.
