---
title: Use Git to find matching files
shortTitle: Find matching files
language: git
tags: [repository,branch,commit]
cover: boulder-beach
excerpt: Learn how to leverage the power of `git grep` to find matching files in your repository.
listed: true
dateModified: 2024-05-06
---

If you've spent any time in the command line, I'm sure you're familiar with the `grep` command. It's a powerful tool that allows you to search for patterns in files. But did you know that Git has its own version of `grep` that, in addition to all the features of `grep`, also allows you to **search across your entire repository**, its history and even in specific branches or commits?

## Find files matching a pattern

Using `git grep <pattern>` you can search for files in your repository that match a specific pattern. **Regular expressions** are supported, so you can use all the power of regex to find exactly what you're looking for.

```shell
# Syntax: git grep <pattern>

git grep "TODO"
# Returns all files that contain the word "TODO"

git grep "TODO.*"
# Returns all files that contain the word "TODO" followed by any characters
```

### Multi-pattern search

You can search for **multiple patterns** combining them using the `--or` or `--and` flags. The `--or` flag will return files that match any of the patterns, while the `--and` flag will return files that match all of the patterns.

```shell
# Syntax: git grep <pattern1> --or <pattern2>

git grep "TODO" --or "FIXME"
# Returns all files that contain either the word "TODO" or "FIXME"

# Syntax: git grep <pattern1> --and <pattern2>

git grep "TODO" --and "FIXME"
# Returns all files that contain both the word "TODO" and "FIXME"
```

### Case-insensitive search

By default, `git grep` is case-sensitive. If you want to search for **case-insensitive** patterns, you can use the `-i` flag.

```shell
# Syntax: git grep -i <pattern>

git grep -i "todo"
# Returns all files that contain the word "TODO" in any case
```

## Limit results

By default, `git grep` will return all files that match the pattern. If you want to limit the results, there are various ways to do so.

### Limit to a specific file extension

If you want to search only in files with a **specific extension**, you can use `git grep <pattern> -- <pathspec>`. This will limit the search to files with the specified extension.

```shell
# Syntax: git grep <pattern> -- <pathspec>

git grep "TODO" -- "*.js"
# Returns all files with a `.js` extension that contain the word "TODO"

git grep "TODO" -- "*.[jt]s"
# Returns all files with a `.js` or `.ts` extension that contain the word "TODO"
```

### Limit to a specific directory

Similarly, you can use `git grep <pattern> -- <pathspec>` to search only in a **specific directory**. You can also use `:^` to **exclude** files from a specific directory.

```shell
# Syntax: git grep <pattern> -- <pathspec>

git grep "TODO" -- src/
# Returns all files in the `src/` directory that contain the word "TODO"

git grep "TODO" -- :^vendors/
# Returns all files that contain the word "TODO", excluding files in the `vendors/` directory
```

### Limit to a specific commit

If you want to search only in a **specific commit**, you can use `git grep <pattern> <commit>`. This will limit the search to the files in the specified commit.

```shell
# Syntax: git grep <pattern> <commit>

git grep "TODO" HEAD~1
# Returns all files in the previous commit that contain the word "TODO"

git grep "TODO" 3050fc0
# Returns all files in the commit with the hash `3050fc0` that contain the word "TODO"
```

### Limit in a specific branch

Searching in a **specific branch** is similar to searching in a specific commit. You can use `git grep <pattern> <branch>` to search in the files of the specified branch.

```shell
# Syntax: git grep <pattern> <branch>

git grep "TODO" master
# Returns all files in the `master` branch that contain the word "TODO"
```

## Format the output

As the results of `git grep` can be quite long, there are a handful of formatting options, you can use to make them more readable.

### Show line numbers

You can use the `-n` flag to **show line numbers** in the output. This will add the line number between the file name and the matched line.

```shell
# Syntax: git grep -n <pattern>

git grep -n "TODO"
# Returns all files that contain the word "TODO" with line numbers
```

### Show file names only

Instead of showing every matched line, you can use the `-l` flag to **show only the file names** that contain the pattern.

```shell
# Syntax: git grep -l <pattern>

git grep -l "TODO"
# Returns only the file names that contain the word "TODO"
```

### Show the number of matches

If you want to know how many matches there are in each file, you can use the `-c` flag to show the **count of matches** for each file.

```shell
# Syntax: git grep -c <pattern>

git grep -c "TODO"
# Returns the count of matches for the word "TODO" in each file
```
