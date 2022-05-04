---
title: View commits in a specific date range
tags: repository,commit
expertise: intermediate
author: maciv
cover: blog_images/organizer.jpg
firstSeen: 2021-04-06T16:28:49+03:00
lastUpdated: 2021-04-13T21:10:59+03:00
---

Prints all commits in the specified date range.

- Use `git log --since=<date-from> --until=<date-to>` to view a log of all commits between `<date-from>` and `<date-to>`.
- You can use only `--since=<date-from>` to see all commits since a specific date or only `--until=<date-to>` to view all commits up to a specific date
- Use arrow keys to navigate, press <kbd>Q</kbd> to exit.

```shell
git log [--since=<date-from>] [--until=<date-to>]
```

```shell
git log --since='Apr 1 2021' --until='Apr 4 2021'
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]

git log --since='2 weeks ago'
# commit c191f90c7766ee6d5f24e90b552a6d446f0d02e4
# Author: 30 seconds of code
# Date: Tue Apr 6 11:11:08 2021 +0300
# [...]
```
