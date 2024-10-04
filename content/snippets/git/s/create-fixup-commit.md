---
title: Create a fixup commit in Git
shortTitle: Create fixup commit
language: git
tags: [commit]
cover: tools
excerpt: If you find yourself needing to fix a previous commit, you can create a fixup commit that can be autosquashed in the next rebase.
listed: true
dateModified: 2024-05-02
---

If you find yourself needing to **fix a previous commit**, you can create a **fixup commit** that can be autosquashed in the next rebase. This allows you to keep your commit history clean and organized.

## Creating a fixup commit

Simply use `git commit --fixup <commit>` to create a fixup commit for the specified `<commit>`. After running `git rebase --autosquash`, fixup commits will be automatically squashed into the commits they reference.

> [!NOTE]
>
> You can learn more about Git's **interactive rebase** in the [relevant article](/git/s/interactive-rebase).

```shell
# Syntax: git commit --fixup <commit>

git add .
git commit --fixup 3050fc0de
# Created a fixup commit for `3050fc0de`
git rebase HEAD~5 --autosquash
# Now the fixup commit has been squashed
```

## Alias for creating fixup commits

As creating a fixup commit might be a very common operation, it's easy to create an **alias** for it. You can use `git config` to create an alias for creating fixup commits.

```shell
git config --global alias.fix 'commit --fixup'
# Now you can use `git fix <commit>` to create a fixup commit

git add .
git fix 3050fc0de
# Created a fixup commit for `3050fc0de`
```

## Simplifying fixup commit creation

Finding the commit hash to reference (e.g. using `tig`) can be cumbersome. Luckily, you can install `fzf` and add an alias that uses it to **select the commit hash interactively**. Then, you can use it to see the commit list and select the one you want to fix.

```shell
# Make sure `fzf` is installed (e.g. `brew install fzf` on MacOS)
git config --global alias.fixup '!git log -n 50 --pretty=format:"%h %s" --no-merges | fzf | cut -c -7 | xargs -o git commit --fixup'

git fixup
# Opens a list of the last 50 commits to choose from
# After selecting a commit, a fixup commit is created
```
