---
title: isValidPort
tags: portnumber, regex, intermediate
---

- The snippet validates if the given port number is within the port number range using regex pattern.
- If a valid port number is given it will return true else false
- Valid port numbers are from 0001 to 65535

```js
const isValidPort = (portNum) => {
	portPattern = new RegExp('^()([1-9]|[1-5]?[0-9]{2,4}|6[1-4][0-9]{3}|65[1-4][0-9]{2}|655[1-2][0-9]|6553[1-5])$');
	return portPattern.test(""+portNum);
}
```

```js
isValidPort(65536); // 'false'
```
