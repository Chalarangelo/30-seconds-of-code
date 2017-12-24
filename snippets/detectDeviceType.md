### detectDeviceType

Detects weather the website is being opened in a mobile device or a desktop

```js
const detectDevice = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? "Mobile" : "Desktop";
```