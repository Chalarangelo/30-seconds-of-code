---
title: Add a submodule
tags: repository,submodule,advanced
---

Adds a new submodule to the repository.

- Use `git submodule add <upstream-path> <local-path>` to add a new submodule from `<upstream-path>` to `<local-path>`.

```sh
git submodule add <upstream-path> <local-path>
```

```sh
git submodule add https://github.com/30-seconds/30-seconds-of-code ./30code
# Creates the directory `30code` containing the submodule from
# "https://github.com/30-seconds/30-seconds-of-code"
```
