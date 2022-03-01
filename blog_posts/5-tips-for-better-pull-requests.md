---
title: 5 tips for better Pull Requests
type: story
tags: git,github,programming,webdev
expertise: intermediate
author: chalarangelo
cover: blog_images/keyboard-tea.jpg
excerpt: Writing good code is only part of the job. Here are 5 tips to improve your pull requests and help people review them.
unlisted: true
firstSeen: 2020-06-24T12:44:03+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

Writing good code is only part of the job. Here are 5 tips to improve your pull requests and help people review them:

### Small pull requests

The pull requests that get reviewed more thoroughly and confidently and are most often prioritized by developers with limited time are the smallest ones. Make sure you separate concerns into different pull requests (e.g. refactoring and feature implementation), while also keeping commits atomic and well-documented to make the changes easier to understand and review.

### Good descriptions

Always take the time to describe your code and any related tasks in your pull request. Explain the feature you are implementing or the bug you are fixing and provide images and steps to reproduce, if applicable. Note decisions made during implementation, your approach, as well as any limitations, findings and points of interest that might help others better understand your code.

### Rebase onto master

Always rebase your pull requests onto the `master` branch of the repository. This way you can always test your code against the latest changes and resolve merge conflicts, minimizing issues that might arise later on. Apart from that, reviewers will not have to deal with missing features or bug fixes that might have been deployed already, which can considerably speed up review times.

### Review it yourself

Before submitting your pull request for review, always take the time to review it yourself. That way you can handle some low-hanging fruits (typos, easy optimizations, leftover code etc.) and check things you would in other people's pull requests. Self-reviewing has the added benefit of allowing you to reason about decisions and realize which ones might need clarification.

### Respond to reviews

Set some time aside to respond to reviews after submitting your pull request. Handle anything you can as soon as possible and start discussion whenever necessary to arrive to a solution. Use `--fixup` for changes suggested in review comments or add new commits to help reviewers parse new changes more easily. Finally, assume good intentions, be polite and thank your peers.
