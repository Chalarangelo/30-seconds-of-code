---
title: Purge a file from history
tags: repository,remote,advanced
---

Completely purges a file from history.

- Use `git rm --cached --ignore-unmatch <path>` to delete the file in the specified `<path>`.
- Use `git filter-branch --force --index-filter <command> --prune-empty --tag-name-filter cat -- --all` to rewrite the branch's history, passing it the previous command.
- You can optionally use `git push <remote> --force -all` to force push the changes to the remote repository.
- ⚠️ **WARNING**: This is a destructive action that rewrites the history of the entire repository. Make sure you know what you are doing.

```shell
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch <path>" \
  --prune-empty --tag-name-filter cat -- --all
git push <remote> --force --all
```

```shell
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config/apiKeys.json" \
  --prune-empty --tag-name-filter cat -- --all
# Purges `config/apiKeys.json` from history
git push origin --force --all
# Force pushes the changes to the remote repository
```
