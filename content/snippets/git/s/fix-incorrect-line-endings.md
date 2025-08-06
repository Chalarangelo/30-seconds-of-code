---
title: How do I fix incorrect line endings in a git repository?
shortTitle: Fix incorrect line endings
language: git
tags: [configuration,repository]
cover: laptop-off
excerpt: Have you ever encountered an issue with incorrect line endings in your git repository? Let's fix it!
listed: true
dateModified: 2025-09-07
---

A little while back, while working on a Ruby repository, a colleague of mine encountered an issue where they **couldn't run a Ruby script**. The error was a little odd, leading us down a rabbit hole of trying to figure it out:

```plaintext
env: ruby\r: No such file or directory
```

Naturally, we looked it up on StackOverflow to figure out what was going on. Turns out, **line endings** were the culprit. For whatever reason, the script had `CRLF` line endings instead of the expected `LF` line endings. This can happen when files are edited on **different operating systems**, as Windows uses `CRLF` while Unix-based systems (like Linux and macOS) use `LF`. This may not have been the exact case, as the whole team is on Unix-based systems, but VS Code confirmed that the file had `CRLF` line endings.

The first step to fixing this was to **set line endings correctly**, and have git manage how it handles them globally:

```shell
# Set the line endings to LF for all files in the repository
git config --global core.autocrlf input
```

While this command sets the line endings to `LF` for all files in the repository, it doesn't **fix existing files**. To fix the existing files, we need to re-commit them with the correct line endings. However, this seems like a hassle and will invariably mess up the repository's history.

Fortunately, there's a way to do this without changing the commit history, as another arduous search on StackOverflow revealed. The solution is to use the `git add --renormalize` command, which will re-check all files in the repository and **apply the new line ending settings**.

```shell
# Re-check all files and apply the new line ending settings
git add --renormalize .
```

These two commands fixed the issue without messing up the repository's history. After running these commands, the Ruby script could be executed without any issues and we were back on track. Hopefully, this little tip will save you some time in the future, if you ever encounter a similar issue with line endings in your git repository! 🍻
