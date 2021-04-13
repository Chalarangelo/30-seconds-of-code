---
title: List all git aliases
tags: configuration,intermediate
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
