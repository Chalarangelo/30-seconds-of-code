---
title: Delete a submodule
tags: repository,submodule,advanced
---

Deletes a submodule from the repository.

- Use `git submodule deinit -f -- <submodule>` to unregister the specified `<submodule>`.
- Use `rm -rf .git/modules/<submodule>` to remove the directory of the submodule.
- Use `git rm -f <submodule>` to remove the working tree of the submodule.

```sh
git submodule deinit -f -- <submodule>
rm -rf .git/modules/<submodule>
git rm -f <submodule>
```

```sh
git submodule deinit -f -- 30code
rm -rf .git/modules/30code
git rm -f 30code
# Removes the `30code` submodule
```
