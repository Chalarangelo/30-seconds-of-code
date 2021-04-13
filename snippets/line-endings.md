---
title: Configure line endings
tags: repository,configuration,intermediate
---

Configures the line endings for a repository.

- Use `git config core.eol [lf | crlf]` to configure the line endings.
- `lf` is the UNIX line ending (`\n`), whereas `crlf` is the DOS line ending (`\r\n`).

```shell
git config core.eol [lf | crlf]
```

```shell
git config core.eol lf # Configured to use UNIX line endings
```
