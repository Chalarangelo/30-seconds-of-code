---
title: View a visual graph of the repository
type: snippet
tags: [repository]
cover: city-view
dateModified: 2021-04-13T21:10:59+03:00
---

Prints a visual graph of all commits and branches in the repository.

- Use `git log --pretty=oneline --graph --decorate --all` to view a visual graph of the whole repository's history.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git log --pretty=oneline --graph --decorate --all
```

```shell
git log --pretty=oneline --graph --decorate --all
# * 3050fc0de Fix network bug
# * c191f90c7 Initial commit
```
