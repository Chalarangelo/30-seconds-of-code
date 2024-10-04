---
title: View or change the remote URL of a Git repository
shortTitle: View or change remote URL
language: git
tags: [repository]
cover: red-mountain
excerpt: Learn how to view or change the URL of the remote repository in Git.
listed: true
dateModified: 2024-04-18
---

The **remote URL** of a Git repository is the URL of the repository on the **remote server**, such as GitHub, GitLab, or Bitbucket. This URL is used to push and pull changes to and from the remote repository. Viewing and changing the remote URL is crucial for collaborating with others and managing your repository.

## View the remote URL

You can use `git config --get remote.origin.url` to display the URL of the remote repository. The `origin` is the **default name of the remote repository**, but you can replace it with the name of your remote repository.

```shell
# Syntax: git config --get remote.origin.url

git config --get remote.origin.url
# https://github.com/30-seconds/30-seconds-of-code
```

## Change the remote URL

Similarly, you can use `git remote set-url origin <url>` to change the URL of the remote repository to `<url>`. Again, replace `origin` with the name of your remote repository if it's different.

```shell
# Syntax: git remote set-url origin <url>

git remote set-url origin https://github.com/30-seconds/30-seconds-of-code
# The remote URL is now "https://github.com/30-seconds/30-seconds-of-code"
```
