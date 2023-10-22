---
title: Change the last commit's message or contents in Git
shortTitle: Amend last commit
type: story
language: git
tags: [commit]
cover: greek-coffee
excerpt: Learn how to effortlessly amend the last commit's message or contents using Git and fix any mistakes you might have made.
dateModified: 2023-05-23
---

Have you ever wanted to change the last commit's message or contents? Maybe you forgot to add a file, or you misspelled something in the commit message. Whatever the reason, Git has you covered with the `--amend` option for the `git commit` command.

### Change the last commit's message

If you only want to change the last commit's message, you can use `--amend` and simply add the `-m` option followed by the new message. This will replace the last commit's message with the new one.

```shell
# Syntax: git commit --amend -m <message>

git add .
git commit -m "Fix the network bug"
# Creates the commit: 3050fc0 Fix network bug

git commit --amend -m "Fix the network bug"
# The last commit's message is now "Fix the network bug"
# This also changes its SHA-1 checksum
```

### Change the last commit's contents

If you want to change the last commit's contents, you can use `--amend` after staging the changes you want to add to the last commit. This will add any staged changes to the last commit, without changing its message.

If you want to keep the same commit message and only add the staged changes, you can use `--no-edit` to prevent Git from opening the default editor to change the commit message.

```shell
# Syntax: git commit --amend --no-edit

git add .
git commit -m "Fix the network bug"
# Creates the commit: 3050fc0 Fix network bug

# Edit or add files
git add .
git commit --amend --no-edit
# The last commit includes the edited/added files
# This also changes its SHA-1 checksum
```
