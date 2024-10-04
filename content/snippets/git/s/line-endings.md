---
title: Configure Git's line endings
shortTitle: Configure line endings
language: git
tags: [repository,configuration]
cover: leaves-read
excerpt: If you're working with a team using different operating systems, configuring line endings can help maintain consistency.
listed: true
dateModified: 2024-04-13
---

If you're working with a team that uses **different operating systems**, you might run into issues with **line endings**. Windows uses a different line ending (`\r\n`) compared to UNIX systems (`\n`). This can cause problems when sharing files between different systems.

Luckily, Git provides a way to configure line endings for a repository. By setting the `core.eol` configuration, you can specify whether to use UNIX (`\n`) or DOS (`\r\n`) line endings in your repository.

You can simply run `git config core.eol [lf | crlf]` to configure the line endings for your repository. `lf` stands for **UNIX line endings**, while `crlf` stands for **DOS line endings**.

```shell
# Usage: git config core.eol [lf | crlf]

git config core.eol lf
# Configures to use UNIX line endings

git config core.eol crlf
# Configures to use DOS line endings
```
