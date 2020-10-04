---
title: getCookie
tags: browser,string,intermediate
---

Get a cookie value by name.
Example: Get value for the cookie "foo"

```js
const getCookie = (name) => {
    const cookies = []
    const cookieStrings = document.cookie.split(';')
    const regex = new RegExp('^\\s*([^=]+)\\s*=\\s*(.*?)$')

    cookieStrings.forEach((cookieStr) => {
        const match = regex.exec(cookieStr)
        if (match !== null) {
            cookies.push({
                name: match[1],
                value: match[2],
            })
        }
    })

    return cookies.find(x => x.name === name)
}
```

```js
getCookie('foo'); // { name: 'foo', value: 'bar' }
```
