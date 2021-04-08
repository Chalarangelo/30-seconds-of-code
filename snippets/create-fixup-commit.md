---
title: Create a fixup commit
tags: commit,advanced
---

Creates a fixup commit that can be autosquashed in the next rebase.

- Use `git commit --fixup <commit>` to create a fixup commit for the specified `<commit>`.
- After running `git rebase --autosquash`, fixup commits will be automatically squashed into the commits they reference.

```sh
git commit --fixup <commit>
```

```sh
git add .
git commit --fixup 3050fc0de
# Created a fixup commit for `3050fc0de`
git rebase HEAD~5 --autosquash
# Now the fixup commit has been squashed
```
