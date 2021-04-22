---
title: "Tip: Create a commit with a different date"
type: tip
tags: git,commit
authors: chalarangelo
cover: blog_images/ice.jpg
excerpt: Ever needed to create a git commit with a different date? Here's a quick and easy way to do it.
---

Sometimes, you might run into a situation where you need to create a commit with a different date than the current one. Luckily, you can handle this using `GIT_AUTHOR_DATE` and `GIT_COMMITTER_DATE`:

```shell
GIT_AUTHOR_DATE='Mon May 18 19:32:10 2020 -0400' \
  GIT_COMMITTER_DATE='Mon May 18 19:32:10 2020 -0400'\
  git commit -m 'Commit from the past'
```

As shown in the example above, you can set both values to any date you like and your code will be committed on that date. Note that the format for the values above is `'date +"%s %z"'`, also referred to as internal raw git format, but you can also use other formats, such as RFC 2822 (`'Mon, 18 May 2020 19:32:10 -0400'`), ISO 8601 (`'2020-05-18 19:32:10 -0400'`), local (`'Mon May 18 19:32:10 2020'`), short (`'2020-05-18'`) or relative (`5.seconds.ago`, `2.years.3.months.ago`, `'6am yesterday'`).

**Image credit:** [Visit Greenland](https://unsplash.com/@greenland?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
