---
title: isIPv4
tags: function,beginner
---

Return `true` if the given value is IP Address version 4.

- Uses regular expression to check the given value is IP Address version 4
- If regular expression matches with tht given value function will return `true` or otherwise

```js
const isIPv4 = ip => /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/.test(ip)
```

```js
isIPv4('0.0.0.0') // true
isIPv4('192.168.100.1') // true
isIPv4('216.239.38.120') // true
isIPv4('256.256.256.256') // false
isIPv4('192.168.100') // false
isIPv4('172.16.0.300') // false
```
