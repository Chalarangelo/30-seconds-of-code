---
title: Clone a repository
tags: repository,remote,beginner
---

Clones an existing repository, creating a local copy of it.

- Use `git clone <url>` to clone an existing repository from `<url>` to a local directory. The directory's name will be based on the name of the cloned repository.
- Alternatively, use `git clone <url> [<directory>]` to clone the repository into the specified local `<directory>`.

```shell
git clone <url> [<directory>]
```

```shell
git clone https://github.com/30-seconds/30-seconds-of-code.git
# Clones the repository in a new directory named '30-seconds-of-code'
cd 30-seconds-of-code

git clone https://github.com/30-seconds/30-seconds-of-code.git my-project
# Clones the repository in a new directory named 'my-project'
cd my-project
```
