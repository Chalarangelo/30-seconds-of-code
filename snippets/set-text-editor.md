---
title: Configure the git text editor
tags: configuration,intermediate
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
