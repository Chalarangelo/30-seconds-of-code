---
title: How can I disable Git's fast forward merging by default?
shortTitle: Disable fast forward merging by default
language: git
tags: [configuration,repository]
cover: people-on-beach
excerpt: Git defaults to fast-forward merging when possible. But, what if you want to disable it by default? Let's see how you can do that.
listed: true
dateModified: 2024-04-15
---

Git's **default behavior** is to fast forward when merging branches. This means that if the branch you're merging into hasn't diverged from the branch you're merging, Git will simply **move the pointer** to the new commit. This is known as a **fast-forward merge**.

However, there are cases where you might want to **disable fast-forward merging** by default. For example, you might want to **preserve the history** of the branches you're merging, or you might want to **enforce a merge commit** to capture the merge operation.

In order to disable the default fast-forward merging behavior in Git, you can use the `merge.ff` configuration option. By using `git config --add merge.ff false`, you can disable fast-forward merging for all branches, even if it is possible. You can also use the `--global` flag to **configure this option globally**.

```shell
# Usage: git config [--global] --add merge.ff false

git config --global --add merge.ff false
# Globally disables fast-forward merging by default

git checkout master
git merge my-branch
# Will never fast forward even if it's possible
```
