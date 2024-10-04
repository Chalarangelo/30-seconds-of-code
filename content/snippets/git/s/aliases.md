---
title: Customize Git using aliases for common operations
shortTitle: Git aliases
language: git
tags: [configuration,cheatsheet]
cover: compass-1
excerpt: Increase your productivity and reduce your cognitive load by creating aliases for many common git operations.
listed: true
dateModified: 2024-05-03
---

Git allows you to create aliases for many common operations, making it easier to remember and execute them. As far as **customization** goes, this is one of the most powerful features Git offers, allowing you to create **shortcuts for complex commands** or to make your workflow more efficient.

## Creating aliases

Simply running `git config --global alias.<alias> <command>` will create an **alias for the specified command**. The alias can then be used in place of the command when running Git commands. If your command contains spaces, you can wrap it in quotes.

```shell
# Syntax: git config --global alias.<alias> <command>

git config --global alias.co checkout
# Creates an alias `co` for the `checkout` command

git config --global alias.cm "commit -m"
# Creates an alias `cm` for the `commit -m` command
```

Alternatively, you can [edit the configuration file](/git/s/edit-config) and **add multiple aliases** all at once. This can be the more practical solution for adding more **complex commands**, as you don't have to worry about escaping special characters.

```shell
# Syntax: git config --global -e

git config --global -e
# Opens the global git configuration file in the default git text editor
```

## Useful aliases

Below you can find a list of aliases I've found personally useful for increasing productivity when working with Git. Feel free to use them as they are or modify them to suit your needs.

```editorconfig [~/.gitconfig]
[alias]
  co = checkout
  cob = checkout -b
  coo = !git fetch && git checkout
  br = branch
  brd = branch -d
  st = status
  aa = add -A .
  unstage = reset --soft HEAD^
  cm = commit -m
  amend = commit --amend -m
  fix = commit --fixup
  undo = reset HEAD~1
  rv = revert
  cp = cherry-pick
  pu = !git push origin `git branch --show-current`
  fush = push -f
  mg = merge --no-ff
  rb = rebase
  rbc = rebase --continue
  rba = rebase --abort
  rbs = rebase --skip
  rom = !git fetch && git rebase -i origin/master --autosquash
  save = stash push
  pop = stash pop
  apply = stash apply
  rl = reflog
```
