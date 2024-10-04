---
title: Create a Git commit
shortTitle: Create commit
language: git
tags: [commit]
cover: cave-explorer
excerpt: Learn how to create a new commit in Git, along with tricks to skip Git hooks and create empty commits.
listed: true
dateModified: 2024-04-20
---

The building block of version control in Git is the **commit**. A commit represents a unit of work that you want to save in your repository. It includes **changes** to files, a commit **message**, and **metadata** like the author and timestamp.

## Create a commit

Using `git commit -m <message>`, you can create a new commit with the **staged changes** and the specified `<message>`. If you omit the `-m` option, Git will open the default text editor to enter the commit message.

> [!TIP]
>
> If you want to learn how to [configure Git's default text editor](/git/s/configure-default-text-editor) before using this command, check the linked article.

```shell
# Syntax: git commit [-m <message>]

git add .
git commit -m "Fix the network bug"
# Creates a commit with the message "Fix the network bug"

git add .
git commit
# Opens the default text editor to enter the commit message
```

## Commit without running git hooks

If, for whatever reason, you want to skip the **pre-commit** and **commit-msg** hooks, you can use the `--no-verify` option with the `git commit` command. Running `git commit --no-verify -m <message>` will commit the staged changes without running the hooks.

> [!NOTE]
>
> Git hooks are usually set up to enforce coding standards, run tests, or perform other checks before allowing a commit. **Use this option with caution**.

```shell
# Syntax: git commit --no-verify -m <message>

# Make some changes to files, ones that your precommit hook might not allow
git add .
git commit --no-verify -m "Unsafe commit"
# Creates a commit with the message "Unsafe commit", without running git hooks
```

## Create an empty commit

Empty commits are sometimes useful when you want to **mark a point in history** without making any changes. You can create an empty commit using the `--allow-empty` option with the `git commit` command. Running `git commit --allow-empty -m <message>` will create an empty commit with the provided `<message>`. **No changes** will be included in the commit, but it will still be recorded in the repository history.

```shell
# Syntax: git commit --allow-empty -m <message>

git commit --allow-empty -m "Empty commit"
# Creates an empty commit with the message "Empty commit"
```
