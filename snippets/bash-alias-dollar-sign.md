---
title: "Tip: A bash alias for copying from the web"
shortTitle: Bash alias for copying from the web
type: tip
tags: [git,configuration]
author: chalarangelo
cover: capsule-coffee
excerpt: Many online resources prefix their terminal commands with a dollar sign. Luckily, we've got a solution to this small annoyance.
dateModified: 2023-03-05T05:00:00-04:00
---

If you've ever copied a terminal command from the web, chances are you've also copied the dollar sign (`$`) that precedes it. This is a small annoyance that many developers encounter almost daily, but it can be easily dealt with. All you need to do is add an `alias` for the dollar sign to your `.bashrc` or `.zshrc` file:

```shell
alias '$'=''
```

But what about variables? Aren't these prefixed with a dollar sign? This alias won't break your scripts, as aliases replace only the first word of each simple command. Simply put, the only dollar sign that will be replaced is the one at the beginning of the line.
