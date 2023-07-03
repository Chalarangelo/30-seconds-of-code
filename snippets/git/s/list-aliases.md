---
title: List all git aliases
type: snippet
language: git
tags: [configuration]
cover: coffee-float
dateModified: 2021-04-13T21:10:59+03:00
---

Prints a list of all git aliases.

- Use `git config -l` to list all variables set in the configuration file.
- Use the pipe operator (`|`) to pipe the output and `grep alias` to only keep aliases.
- Use the pipe operator (`|`) to pipe the output and `sed 's/^alias\.//g'` to remove the `alias.` part from each alias.

```shell
git config -l | grep alias | sed 's/^alias\.//g'
```

```shell
git config -l | grep alias | sed 's/^alias\.//g'
# st=status
# co=checkout
# rb=rebase
```
