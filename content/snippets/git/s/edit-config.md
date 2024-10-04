---
title: Edit the Git configuration file
shortTitle: Edit config
language: git
tags: [configuration]
cover: terminal
excerpt: Learn how to open the Git configuration file in the Git text editor, for editing.
listed: true
dateModified: 2024-04-11
---

Using `git config` a dozen times to set up your Git configuration can be a bit tedious. Instead, you can open the **Git configuration file** in the Git text editor and make the changes directly.

> [!TIP]
>
> You may want to [configure Git's default text editor](/git/s/configure-default-text-editor) before using this command, to ensure you're comfortable with the text editor that opens the configuration file.

Using `git config -e`, you can open the Git configuration file in the **default Git text editor**. This allows you to make changes to the configuration file directly, without having to remember the specific commands for each setting.

You can add the `--global` flag to edit the **global Git configuration file**, or omit it to edit the local repository configuration file.

```shell
# Usage: git config [--global] -e

git config --global -e
# Opens the global git configuration file in the default git text editor

git config -e
# Opens the local repository git configuration file in the text editor
```
