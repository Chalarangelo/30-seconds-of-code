---
title: DeviceInfo
tags: array,intermediate
---

The ```window.navigator``` object contains information about the visitor's browser. Some examples are:
- ```navigator.appName ```
- ```navigator.appCodeName```
- ```navigator.platform```

```js
const deviceInfo = () => {
    //Browser Application Name
    console.log(navigator.appName)

    //Browser Application Code Name
    console.log(navigator.appCodeName)

    //Browser Engine
    console.log(navigator.product)

    //Browser Version
    console.log(navigator.appVersion)

    //Browser Agent
    console.log(navigator.userAgent)

    //Browser Platform
    console.log(navigator.platform)

    //Browser Language
    console.log(navigator.language)

    //Is the Browser online
    console.log(navigator.online)

  }
```

```js
deviceInfo(); // 'Netscape'
              // 'Mozilla'
              // 'Gecko'
              // '5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
              // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36'
              // 'Linux x86_64'
              // 'en-IN'
              // 'Online'
```
