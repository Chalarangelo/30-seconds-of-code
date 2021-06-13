---
title: Configure line endings
tags: repository,configuration,intermediate
firstSeen: 2021-04-06T21:35:01+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
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
