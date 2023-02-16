---
title: Configure the git text editor
tags: configuration
cover: purple-sunset-beach
firstSeen: 2021-04-04T21:25:22+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Configures the text editor used by git.

- Use `git config --global core.editor <editor-command>` to call `<editor-command>` as the git text editor.

```shell
git config --global core.editor <editor-command>
```

```shell
git config --global core.editor "code --wait"
# Sets VS Code as the git text editor
```
