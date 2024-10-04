---
title: Split a Git commit into multiple commits
shortTitle: Split commit
language: git
tags: [commit,branch]
cover: interior-16
excerpt: Altering Git history to split a commit sounds intimidating, but it's not that hard. Let's walk through the process step by step.
listed: true
dateModified: 2024-05-05
---

I've often found myself, especially when working on larger feature branches, in a situation where I've made a commit that should have been split into multiple smaller commits. This can happen for various reasons, such as including unrelated changes in a single commit or realizing that a commit should have been broken down into smaller, more focused commits.

While it might sound a little intimidating, it's a fairly straightforward process so long as you're familiar with [Git's interactive rebase](/git/s/interactive-rebase) feature. All you need to do is **find the commit** you want to split and then mark it with `edit` to stop the rebase process. Once you've done that, you can use `git reset HEAD^` to **unstage your changes** and then **commit them separately**. Let's take a look at an example.

```shell
# 1. Use git rebase -i <commit>
git rebase -i HEAD~2
```

```shell [git-rebase-todo]
# 2. Mark the commit you want to split with `edit`
edit 3050fc0de Fix network bug
pick 7b1e3f2a2 Update README
# 3. Save and close the editor to start the rebase
```

```shell
# Stopped at 3050fc0...  Fix network bug
# You can amend the commit now, with
#
#   git commit --amend
#
# Once you are satisfied with your changes, run
#
#   git rebase --continue

# 4. Use `git reset HEAD^` to unstage the changes
git reset HEAD^
# Unstaged changes after reset:
# M       src/sever/network.js
# M       src/public/index.html
# M       package.json

# 5. Commit the changes separately
git add src/server/network.js
git commit -m 'Fix network bug'
# [detached HEAD 1f3e4d5] Fix network bug
#  1 file changed, 3 insertions(+)

git add src/public/index.html
git commit -m 'Update documentation'
# [detached HEAD 9a8b7c6] Update documentation
#  1 file changed, 62 insertions(+)

git add package.json
git commit -m 'Update dependencies'
# [detached HEAD 6d5c4b3] Update dependencies
#  2 files changed, 737 insertions(+), 802 deletions(-)

# 6. Continue the rebase
git rebase --continue
# Successfully rebased and updated refs/heads/network-bug.

# Check the log to confirm the changes
git log --oneline --decorate -4
# 1f3e4d5 (HEAD -> network-bug) Fix network bug
# 9a8b7c6 Update documentation
# 6d5c4b3 Update dependencies
# 7b1e3f2 Update README
```

And there you have it! Without too much hassle, you've successfully **split a commit into multiple smaller commits**. This process can be easily adapted to suit your needs and it can also be repeated as much as you like. Just remember to be careful when **rewriting Git history**, especially if you're working on a shared branch.
