---
title: Autocorrect git commands
type: snippet
tags: [configuration]
author: chalarangelo
cover: purple-flower-bunch
dateModified: 2021-04-13T21:10:59+03:00
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
