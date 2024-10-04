---
title: Enable autocorrect for mistyped Git commands
shortTitle: Enable Git autocorrect
language: git
tags: [configuration]
cover: purple-flower-bunch
excerpt: Mistyping commands often? Enable Git's autocorrect feature to automatically fix them.
listed: true
dateModified: 2024-03-28
---

Do you find yourself mistyping commands often? Luckily, Git has an autocorrect feature you can enable to automatically fix them. The [`help.autocorrect`](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration#_help_autocorrect) setting allows you to specify the **autocorrect** behavior you like.

## Enable autocorrect

By setting the value to an **integer**, Git will wait for that many **tenths of a second** before executing the corrected command. For example, setting `help.autocorrect` to `1` will make Git wait for 0.1 seconds before executing the corrected command. Allowed values are between `0` and `50`.

```shell
# Syntax: git config [--global] help.autocorrect <value>

# Enable autocorrect with a 0.1 second delay
git config --global help.autocorrect 1
git sttaus # Runs `git status` instead, after a 0.1 second delay

# Enable autocorrect with a 1 second delay
git config --global help.autocorrect 10
git sttaus # Runs `git status` instead, after a 1 second delay
```

## Additional options

Additionally, you can use some **keywords** to specify the autocorrect behavior, such as `never` to **disable** autocorrect, `immediate` to execute the corrected command **immediately**, and `prompt` to ask for **confirmation** before executing the corrected command.

```shell
# Syntax: git config [--global] help.autocorrect <value>

# Immediate autocorrect
git config --global help.autocorrect immediate
git sttaus # Runs `git status` immediately

# Prompt for confirmation before autocorrect
git config --global help.autocorrect prompt
git sttaus # Asks for confirmation before running `git status`

# Disable autocorrect
git config --global help.autocorrect never
git sttaus # Does not autocorrect
```
