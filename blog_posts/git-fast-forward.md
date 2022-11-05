---
title: How does Git's fast-forward mode work?
shortTitle: Git fast-forward
type: question
tags: git,branch
expertise: intermediate
author: chalarangelo
cover: blog_images/boats.jpg
excerpt: Merging a branch is a pretty common Git operation. Learn how fast-forward mode works and its benefits, so you can decide if it's a good fit for you and your team.
firstSeen: 2021-07-15T05:00:00-04:00
---

Merging a branch is one of the most common operations when working with Git. Depending on your team and projects you've been a part of, you might have heard of or even used Git's **fast-forward** mode when merging. Fast-forward mode is the default in Git, however GitHub will essentially override this by default and create a merge commit instead.

![Git fast forward explained](./blog_images/git-fast-forward.png)

### Fast-forward merge

As stated above, Git's default is to use fast-forward merge. It will take the commits from the branch being merged and place them at the tip of the branch you're merging into. This creates a **linear history**, which is also the main advantage of using fast-forward merge. If you want to emulate fast-forward merge on GitHub, you can use the "Rebase and merge" option.

### Non fast-forward merge

GitHub, on the other hand, uses non fast-forward merge by default. It will create a merge commit at the tip of the branch you're merging into, optionally referencing the branch being merged in the commit message. This has the advantage of **keeping track of branches** more explicitly than fast-forward merge. If you want to get the same behavior in a Git terminal, you can use the `--no-ff` flag.

As a side note, you can configure the default Git merge behavior, using `git config`. To learn how to do so, you can take a look at the [relevant snippet](/git/s/disable-fast-forward).
