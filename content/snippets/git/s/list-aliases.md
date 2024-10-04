---
title: List all Git aliases
shortTitle: List aliases
language: git
tags: [configuration]
cover: coffee-float
excerpt: Did you set up a lot of Git aliases and forgot what they are? List them all with this command.
listed: true
dateModified: 2024-03-30
---

Setting up Git aliases can be a great way to save time and make your workflow more efficient. However, if you've set up a lot of aliases, it can be hard to remember what they all are. Luckily, you can easily list them using the `git config` command.

> [!TIP]
>
> I've compiled a list of [the most useful Git aliases](/git/s/useful-aliases), as well as a guide on **how to set them up**, which might come in handy.

In order to print all your aliases, you'll first have to use `git config -l` to **list all variables** set in the configuration file. In order to filter the output and only keep aliases, you can **pipe** the output (`|`) to `grep alias`. Finally, you can use `sed 's/^alias\.//g'` to remove the `alias.` part from each alias.

```shell
# Syntax: git config -l | grep alias | sed 's/^alias\.//g'

# Examples
git config -l | grep alias | sed 's/^alias\.//g'
# st=status
# co=checkout
# rb=rebase
```
