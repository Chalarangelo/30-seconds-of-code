---
title: Environment is Travis CI
tags: node
expertise: intermediate
unlisted: true
cover: blog_images/succulent-5.jpg
firstSeen: 2018-01-01T17:28:08+02:00
lastUpdated: 2020-10-20T23:02:01+03:00
---

Checks if the current environment is [Travis CI](https://travis-ci.org/).

- Check if the current environment has the `TRAVIS` and `CI` environment variables ([reference](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)).

```js
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
```

```js
isTravisCI(); // true (if code is running on Travis CI)
```
