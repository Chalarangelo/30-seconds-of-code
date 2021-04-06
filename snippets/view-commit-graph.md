---
title: View a visual graph of the repository
tags: repository,intermediate
---

Prints a visual graph of all commits and branches in the repository.

- Use `git log --pretty=oneline --graph --decorate --all` to view a visual graph of the whole repository's history.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```sh
git log --pretty=oneline --graph --decorate --all
```

```sh
git log --pretty=oneline --graph --decorate --all
# * 3050fc0de Fix network bug
# * c191f90c7 Initial commit
```
