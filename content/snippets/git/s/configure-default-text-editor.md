---
title: Configure Git's default text editor
shortTitle: Configure text editor
language: git
tags: [configuration]
cover: purple-sunset-beach
excerpt: Learn how to configure the text editor used by Git for commit messages and other text editing tasks.
listed: true
dateModified: 2024-04-09
---

Tired of having to use the terminal when Git prompts you to enter a commit message? You can **configure the text editor** used by Git to make the process more convenient. This way, you can use your favorite text editor to write commit messages and other text editing tasks.

In order to do so, you can use `git config --global core.editor <editor-command>` to set the text editor used by Git. Replace `<editor-command>` with the command that opens your preferred text editor.

```shell
# Usage: git config --global core.editor <editor-command>

git config --global core.editor "code --wait"
# Sets VS Code as the git text editor

git config --global core.editor "vim"
# Sets Vim as the git text editor

git config --global core.editor "subl --wait"
# Sets Sublime Text as the git text editor
```
