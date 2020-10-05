---
title: fetchGet
tags: browser,fetch,http,intermediate
---

Uses fetch to complete an HTTP Get request.

- Change the URL to the URL that you are requesting from
- Add and modify the parameter object to the parameters that you are passing
- Add headers if necessary
- Change `rawResponse.json()` to `rawResponse.text()` if retrieving plain text

```js
const getReq = async () => {
	let url = new URL("https://httpbin.org/get");
	url.search = new URLSearchParams({
		param1: "value1",
		param2: "value2",
		param3: "value3",
	}).toString();

	const rawResponse = await fetch(url, {
		headers: {
			"Accept": "application/json",
			"Content-Type": "application/json",
		},
	});

	const content = await rawResponse.json();

	console.log(content);
};
```

```js
getReq();

// Response
// -----------------------------
// {
//   "args": {
//     "param1": "value1",
//     "param2": "value2",
//     "param3": "value3"
//   },
//   "headers": {
//     "Accept": "application/json",
//     "Accept-Encoding": "gzip, deflate, br",
//     "Accept-Language": "en-US,en;q=0.5",
//     "Content-Type": "application/json",
//     "Dnt": "1",
//     "Host": "httpbin.org",
//     "Origin": "null",
//     "User-Agent": "User Agent String Would Be Here",
//     "X-Amzn-Trace-Id": "Root=X-XXXXXXXXX-XXXXXXXXXXXXXXXXXXXXXXXX"
//   },
//   "origin": "XX.XXX.XXX.XX",
//   "url": "https://httpbin.org/get?param1=value1&param2=value2&param3=value3"
// }
```
