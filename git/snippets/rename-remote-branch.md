---
title: Rename remote branch
type: snippet
tags: [branch]
cover: horse-sunset
dateModified: 2021-04-13T21:10:59+03:00
---

Renames a branch both locally and on the remote.

- Use `git branch -m <old-name> <new-name>` to rename the local `<old-name>` branch to `<new-name>`.
- Use `git push origin --delete <old-name>` to delete the old remote branch.
- Use `git checkout <new-name>` to switch to the renamed branch.
- Use `git push origin -u <new-name>` to set `<new-name>` as the remote branch for the renamed branch.

```shell
git branch -m <old-name> <new-name>
git push origin --delete <old-name>
git checkout <new-name>
git push origin -u <new-name>
```

```shell
git checkout master
git branch -m patch-1 patch-2    # Renamed the local branch to `patch-2`
git push origin --delete patch-1
git checkout patch-2
git push origin -u patch-2 # Renames the remote branch to `patch-2`
```
