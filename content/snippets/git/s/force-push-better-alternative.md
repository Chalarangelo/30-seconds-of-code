---
title: A better alternative to force pushing
shortTitle: Safe force push alternative
language: git
tags: [repository,branch]
cover: home-office
excerpt: Forced pushes in shared branches are dangerous, but did you know there's a safer alternative?
listed: true
dateModified: 2026-01-28
---

I've been using `git push --force` for quite a few years now, and while it can be pretty handy, I've never quite managed to shake the feeling I'm going to break something. Thankfully, `git reflog` has saved me in those rare cases when I've messed up, but I've always been on the lookout for a **better alternative**.

```shell
git push --force
# Force push changes to the remote branch, overwriting any conflicting changes
```

@[You may also like](/git/s/view-undo-history)

Turns out, there has been a solution all along: `git push --force-with-lease`! This command works similarly to `git push --force`, but with an **added layer of safety**. It checks **if the remote branch has been updated since your last fetch** before allowing the force push. If someone else has pushed changes to the remote branch, **the force push will be rejected**, preventing you from accidentally overwriting their work.

```shell
git push --force-with-lease
# Force push changes to the remote branch only if it hasn't been updated since the last fetch
```

Now, obviously, this might not be the silver bullet you were looking for, but **it will prevent the most common issue on shared branches**. It also comes with its own pitfalls, such as `git fetch` tricking it into thinking your branch is up to date when it isn't. But overall, it's a much safer alternative to `git push --force`, and I highly recommend giving it a try. So much so that I've completely replace my `git push --force` usage with it!
