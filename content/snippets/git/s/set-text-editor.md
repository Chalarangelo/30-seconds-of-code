---
title: Configure the git text editor
type: snippet
language: git
tags: [configuration]
cover: purple-sunset-beach
dateModified: 2021-04-13
---

Configures the text editor used by git.

- Use `git config --global core.editor <editor-command>` to call `<editor-command>` as the git text editor.

```shell
git config --global core.editor <editor-command>
```

```shell
git config --global core.editor "code --wait"
# Sets VS Code as the git text editor

git config --global core.editor "vim"
# Sets Vim as the git text editor

git config --global core.editor "subl --wait"
# Sets Sublime Text as the git text editor
```
