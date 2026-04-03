---
title: Cherry-pick an unreachable GitHub commit
shortTitle: Cherry-pick unreachable commit
language: git
tags: [commit,branch]
cover: laptop-bronze-mug
excerpt: Have you ever needed to cherry pick a GitHub commit that does not belong to any branch on this repository? Here's an easy way to do it.
listed: true
dateModified: 2026-04-03
---

I recently came across an odd problem on a branch I was working on. There was **a commit that was only on GitHub**, that I needed to [cherry-pick](/git/s/pick-commits) locally, but it had the following message:

> This commit does not belong to any branch on this repository, and may belong to a fork outside of the repository.

I wasn't entirely sure what that meant, but I knew that **the commit wasn't part of a branch**, therefore I had a general idea that plain `git cherry-pick <commit>` wouldn't work. And, obviously it did not!

I decided, instead of looking it up on the internet, to ask Copilot about it, to save some time and to put my tokens to good use. And, to nobody's surprise, I got a pretty good answer. Simply put, I have to **explicitly fetch the commit from the remote** (i.e. GitHub), and then I can cherry-pick it.

```shell
# Syntax: git fetch <remote> <commit>
#         git cherry-pick <commit>

# Fetch the commit directly by SHA first
git fetch origin 8776de5

# Cherry pick as usual
git cherry-pick 8776de5
```

The explanation is that the commit object exists, but it is **not reachable from any branch/tag you can fetch from your current remotes**. So plain cherry-pick fails because your local repo does not have that commit object yet.

> [!NOTE]
>
> If you had **created this commit locally**, it would be part of your git tree and you could cherry-pick it without fetching. But since it was only on the remote and not part of any branch, you need to fetch it first to make it available in your local repository.

