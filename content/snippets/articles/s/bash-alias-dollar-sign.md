---
title: A bash alias for copying commands from the web
shortTitle: Bash alias for copying from the web
language: git
tags: [configuration]
cover: capsule-coffee
excerpt: Learn how to eliminate the annoyance of copying dollar signs ($) along with terminal commands from the web with a simple bash alias.
listed: true
dateModified: 2023-03-05
---

If you've ever copied a terminal command from the web, chances are you've also copied the **dollar sign** (`$`) that precedes it. This is a small annoyance that many developers encounter almost daily, but it can be easily dealt with. All you need to do is add an `alias` for the dollar sign to your `.bashrc` or `.zshrc` file:

```shell
alias '$'=''
```

But what about variables? Aren't these prefixed with a dollar sign? This bash alias won't break your scripts, as aliases replace only the first word of each simple command. Simply put, the only dollar sign that will be replaced is the one at the **beginning of the line**.
