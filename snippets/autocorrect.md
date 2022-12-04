---
title: Autocorrect git commands
tags: configuration
author: chalarangelo
cover: blog_images/purple-flower-bunch.jpg
firstSeen: 2021-04-06T20:58:33+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Configures git to autocorrect mistyped commands.

- Use `git config --global help.autocorrect 1` to enable git's autocorrect.

```shell
git config --global help.autocorrect 1
```

```shell
git config --global help.autocorrect 1
git sttaus # Runs `git status` instead
```
