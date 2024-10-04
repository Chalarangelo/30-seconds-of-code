---
title: View a summary of changes between two Git commits
shortTitle: View changes summary
language: git
tags: [repository,branch]
cover: taking-photos
excerpt: Learn how to view a summary of changes between two Git commits, using a single command.
listed: true
dateModified: 2024-04-24
---

Have you ever wanted to see the **changes between two commits** in a Git repository without having to go through the entire commit history? A summary of changes can help you understand the differences between two commits quickly. So how can you do that?

Using `git shortlog <commit>..<other-commit>`, you can view a summary of changes between two given commits. Note that the two commits **don't have to be consecutive**, and you can use any valid commit references, such as **commit hashes**, **branch names**, or **tags**. This allows you to compare any two points in the repository's history.

As usual, you can navigate through the summary using the arrow keys and exit by pressing <kbd>Q</kbd>.

```shell
# Syntax: git shortlog <commit>..<other-commit>

git shortlog 3050fc0de..HEAD
# Duck Quacking (2):
#      Fix network bug
#      Update documentation

git shortlog v1.0..v2.0
# Duck Quacking (2):
#      Add new feature
#      Update dependencies

git shortlog master..feature-branch
# Duck Quacking (2):
#      Add new feature
#      Update documentation
```
