---
title: Purge a file from Git history
shortTitle: Purge file
language: git
tags: [repository,remote]
cover: white-flower
excerpt: Did you accidentally commit sensitive information? Learn how to completely purge a file from Git history.
listed: true
dateModified: 2024-05-01
---

If you've ever **accidentally committed sensitive information** to a Git repository, you know how important, and difficult, it is to remove it from history. While not the most straightforward of processes, Git provides a way to completely **purge a file from history**.

The `git rm` command allows you to **remove a file** from the working directory and the index. Using `git rm --cached --ignore-unmatch <path>` deletes the file from the index without removing it from the working directory. This allows you to **remove a file from history** without deleting it from your local machine.

Having figured out how to remove the file, we now need a way to **rewrite the branch's history**. Using `git filter-branch --force --index-filter <command> --prune-empty --tag-name-filter cat -- --all`, you can rewrite the branch's history, passing it the previous command. This command will **remove the file from all commits** in the repository.

Finally, you can use `git push <remote> --force --all` to **force push the changes to the remote repository**. This will overwrite the remote repository with the changes you made locally. Note that you need to have the necessary permissions to force push to the remote repository.

> [!CAUTION]
>
> This is a **destructive action** that rewrites the history of the entire repository. Make sure you know what you are doing.

```shell
# Syntax:
#  git filter-branch --force --index-filter \
#    "git rm --cached --ignore-unmatch <path>" \
#    --prune-empty --tag-name-filter cat -- --all
#  git push <remote> --force --all

git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch config/apiKeys.json" \
  --prune-empty --tag-name-filter cat -- --all
# Purges `config/apiKeys.json` from history

git push origin --force --all
# Force pushes the changes to the remote repository
```
