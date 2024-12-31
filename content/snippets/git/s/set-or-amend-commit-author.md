---
title: Create a commit by a different author in Git
shortTitle: Set or amend commit author
language: git
tags: [commit]
cover: new-plant
excerpt: Ever wanted to commit as someone else? Maybe change the author of an existing commit? Here's how.
listed: true
dateModified: 2023-05-24
---

Every Git commit is associated with an author, usually configured globally on your machine. But what if you want to commit as someone else? What can you do in case your Git configuration is wrong or you want to use a different email for a specific commit? And what can you do if you've already made a commit and want to change its author?

## Create a commit by a different author

As long as you have the author's information, you can create a commit by them. Using the `--author` option for `git commit` will allow you to **create a new commit by a different author**.

```shell
# Syntax: git commit --author="<name> <email>"

# Make some changes to files
git add .
git commit -m "Fix the network bug" --author="Duck Quackers <cool.duck@qua.ck>"
# Creates a commit by `Duck Quackers`
```

## Change the last commit's author

In case you want to **change the author of the last commit**, you only need to add the `--amend` flag to the previous command. You can learn more about updating commits in [our guide on amending commits](/git/s/update-commit-message-or-contents).

```shell
# Syntax: git commit --amend --author="<name> <email>"

# Make some changes to files
git add .
git commit -m "Fix the network bug" --author="Duck Quackers <cool.duck@qua.ck>"
# Creates a commit by `Duck Quackers`

# Edit or add files
git add .
git commit --amend --author="Quack Duckers <ducky-o@qua.ck>"
# The last commit is now updated and the author is `Quack Duckers`
```

## Caveats

Changing the author of a commit will also change its **SHA-1 checksum**. If you've already pushed the commit to a remote repository, you will need to force push the updated commit to the remote.

Additionally, if your remote repository is configured to only accept **signed commits**, you might be unable to sign the commit unless you have the original author's GPG key.

Finally, you can't use `--author` to add **multiple authors** to a commit. If you want to do so, you can find more information in [the relevant article](/git/s/github-co-authors).
