---
title: Add a Git commit message template
shortTitle: Add commit template
language: git
tags: [repository,configuration]
cover: river-house-lights
excerpt: If you want your team to follow a common format for commit messages, you can set up a commit message template to make it easier.
listed: true
dateModified: 2024-04-10
---

Git has a ton of hidden or lesser-known features that can make your life easier. One such feature is the ability to set up a **commit message template** for your repository. This can be useful if you want your team to follow a common format for commit messages.

Using `git config commit.template <file>`, you can specify a file that contains the commit message template for the current repository. This way, every time you commit changes, Git will open a copy of the template in your text editor, making it easier for you to follow the commit message format.

```shell
# Usage: git config commit.template <file>

git config commit.template "commit-template"
# Sets "commit-template" as the commit message template
```

If, for example your team is following the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) format, you can create a template file, named `commit-template` at the root of your repository, and use it as the commit message template.

```shell [commit-template]
# <type>[optional scope]: <description>
#  feat: add new feature
#  fix: bug fix
#  Append a `!` to indicate a breaking change

# [optional body]

# [optional footer(s)]
#  BREAKING CHANGE: introduce breaking change

# Specification: https://www.conventionalcommits.org/en/v1.0.0/#specification
```

```shell
git config commit.template "commit-template"
# Sets the above "commit-template" as the commit message template
```
