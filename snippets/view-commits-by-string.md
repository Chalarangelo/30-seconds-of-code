---
title: View commits that manipulated a specific string
tags: commit,intermediate
---

Prints a list of all commits that manipulated a given string.

- Use `git log -S<string>` to find all commits that manipulated the specified `<string>`.
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```sh
git log -S<string>
```

```sh
git log -S"30-seconds"
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
