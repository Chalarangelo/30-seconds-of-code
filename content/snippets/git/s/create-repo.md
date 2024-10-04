---
title: Create a new Git repository
shortTitle: Create repository
language: git
tags: [repository]
cover: do-more-computer
excerpt: The first step is often the hardest, yet creating a Git repository is as simple as running a single command.
listed: true
dateModified: 2024-04-14
---

The first thing you need to do when starting a new project is to **initialize a new Git repository**. This sets up all the configuration files needed by Git to track changes in your project.

Simply running `git init` in the project directory will create a new repository. You can also specify a **directory** to create the repository in a different location, using `git init <directory>`.


> [!NOTE]
>
> You only need to run `git init` **once per repository**. Running `git init` in an **existing repository** is safe, so don't worry about accidentally breaking anything.

```shell
# Usage: git init [<directory>]

cd ~/my_project
git init
# Initializes a repo in ~/my_project

cd ~
git init my_project
# Initializes a repo in ~/my_project
```
