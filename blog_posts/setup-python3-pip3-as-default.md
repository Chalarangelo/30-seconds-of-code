---
title: "Tip: Set up Python 3 and pip 3 as default"
shortTitle: Python 3 and pip 3 setup
type: tip
tags: python,setup
author: chalarangelo
cover: avocado-slices
excerpt: A very common problem when working with Python is having to remember the correct version. Luckily, there's an easy fix for that.
firstSeen: 2021-06-07T12:00:00+03:00
lastUpdated: 2021-06-12T19:30:41+03:00
---

One of the most common headaches when working with Python is having to remember to use Python 3.x instead of Python 2.x. Luckily, it's really easy to setup Python 3 and pip 3 as the defaults. You first need to figure out where each one is installed using the `which` command:

```shell
which python3   # /usr/local/bin/python3
which pip3      # /usr/local/bin/pip3
```

Make a note of each response, so that you can add the paths as aliases to your shell environment's configuration file. Then, you can use `echo` to add a line for each one to either `.zshrc` or `.bashrc` depending on your environment:

```shell
# Linux or other bash environment
echo "alias python=/usr/local/bin/python3" >> ~/.bashrc
echo "alias pip=/usr/local/bin/pip3" >> ~/.bashrc

# Mac OS or other zsh environment
echo "alias python=/usr/local/bin/python3" >> ~/.zshrc
echo "alias pip=/usr/local/bin/pip3" >> ~/.zshrc
```

And you're all done! `python` and `pip` are both mapped to their 3.x versions,
