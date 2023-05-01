---
title: Delete a submodule
type: snippet
tags: [repository,submodule]
author: chalarangelo
cover: silver-flat-screen
dateModified: 2021-04-13T21:10:59+03:00
---

Deletes a submodule from the repository.

- Use `git submodule deinit -f -- <submodule>` to unregister the specified `<submodule>`.
- Use `rm -rf .git/modules/<submodule>` to remove the directory of the submodule.
- Use `git rm -f <submodule>` to remove the working tree of the submodule.

```shell
git submodule deinit -f -- <submodule>
rm -rf .git/modules/<submodule>
git rm -f <submodule>
```

```shell
git submodule deinit -f -- 30code
rm -rf .git/modules/30code
git rm -f 30code
# Removes the `30code` submodule
```
