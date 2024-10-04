---
title: An introductory guide to Git submodules
shortTitle: Submodules
language: git
tags: [repository,submodule]
cover: rocky-mountains-2
excerpt: Git submodules are a powerful feature that often trips up developers. Fret not, this guide will help you understand the basics.
listed: true
dateModified: 2024-04-27
---

Git submodules are a powerful feature that allow you to **include other repositories within your own repository**. This can be useful for including libraries or other code that you want to keep separate from your main repository.

## Add a submodule

To add a submodule to your repository, you can use `git submodule add <upstream-path> <local-path>`. The first argument is the **URL of the repository** you want to add as a submodule, and the second argument is the **path** where you want the submodule to be located within your repository.

```shell
# Syntax: git submodule add <upstream-path> <local-path>

git submodule add https://github.com/30-seconds/30-seconds-of-code ./30code
# Creates the directory `30code` containing the submodule from
# "https://github.com/30-seconds/30-seconds-of-code"
```

Adding a submodule will create a **new directory** in your repository that contains the contents of the submodule repository. The submodule directory will contain a `.git` directory that points to the submodule repository, allowing you to **track changes** to the submodule independently of your main repository.

Additionally, a `.gitmodules` file will be created in the root of your repository that contains information about the submodule, such as the URL of the submodule repository and the path where the submodule is located.

## Initialize submodules

After adding a submodule to your repository, you will need to **initialize and update** the submodule to fetch its contents. You can do this by running `git submodule update --init --recursive`.

While the `--recursive` flag isn't strictly necessary, it ensures that any **nested submodules** are also updated. This is useful if the submodule itself contains submodules, as it will ensure that all submodules are initialized and updated.

```shell
# Syntax: git submodule update --init --recursive

git submodule update --init --recursive
# Clones missing submodules and checks out commits
```

## Update submodules

When you clone a repository that contains submodules, the submodules will be **checked out at a specific commit**. When you want to **update the contents** of the submodules to the latest version, you can use `git submodule update --recursive --remote`. Again, the `--recursive` flag ensures that any submodules within the submodule are also updated.

```shell
# Syntax: git submodule update --recursive --remote

git submodule update --recursive --remote
# Pulls all submodules from their respective remotes
```

## Rename a submodule

Luckily, renaming a submodule is just as easy as renaming a directory. Using `git mv <old-submodule> <new-submodule>` will **rename the directory** containing the submodule. This will also **update the submodule's path** in the `.gitmodules` file.

```shell
# Syntax: git mv <old-submodule> <new-submodule>

git mv 30code 30-seconds-of-code
# Renames the `30code` submodule to `30-seconds-of-code`
```

## Delete a submodule

Deleting a submodule is a little more complicated. You'll first have to use `git submodule deinit -f -- <submodule>` to **unregister the submodule**. Then, you need to remove the `.git/modules/<submodule>` directory, using `rm -rf .git/modules/<submodule>`. Finally, you can **remove the working tree** of the submodule using `git rm -f <submodule>`.

```shell
# Syntax:
#  git submodule deinit -f -- <submodule>
#  rm -rf .git/modules/<submodule>
#  git rm -f <submodule>

git submodule deinit -f -- 30code
rm -rf .git/modules/30code
git rm -f 30code
# Removes the `30code` submodule
```
