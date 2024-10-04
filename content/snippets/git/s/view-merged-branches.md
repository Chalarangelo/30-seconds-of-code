---
title: View all merged Git branches
shortTitle: View merged branches
language: git
tags: [repository,branch]
cover: cobbled-street
excerpt: Looking for a way to list all merged branches in your Git repository? Look no further.
listed: true
dateModified: 2024-04-17
---

Looking for a way to list all **merged branches** in your Git repository? This can be useful in a variety of scenarios, including cleaning up your repository or identifying branches that are ready to be deleted.

> [!TIP]
>
> You can easily [delete merged branches](/git/s/delete-branch#delete-merged-branches), using a single command. Check out the linked article for more information.

Using `git branch -a --merged` allows you to view a list of all merged local branches. This command displays branches that have been **merged into the current branch**, making it easy to identify branches that are no longer needed. Use the arrow keys to navigate the list and press <kbd>Q</kbd> to exit.

```shell
# Syntax: git branch -a --merged

git checkout master
git branch -a --merged
# patch-1
# patch-2
```
