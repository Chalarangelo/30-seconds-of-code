---
title: Environment is Travis CI
type: snippet
language: javascript
tags: [node]
unlisted: true
cover: succulent-5
dateModified: 2020-10-20
---

Checks if the current environment is [Travis CI](https://travis-ci.org/).

- Check if the current environment has the `TRAVIS` and `CI` environment variables ([reference](https://docs.travis-ci.com/user/environment-variables/#Default-Environment-Variables)).

```js
const isTravisCI = () => 'TRAVIS' in process.env && 'CI' in process.env;
```

```js
isTravisCI(); // true (if code is running on Travis CI)
```
