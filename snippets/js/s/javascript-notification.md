---
title: Send notification with Javascript
type: snippet
language: javascript
tags: [notification]
cover: laptop-with-code
dateModified: 2023-08-29T07:14:34.963Z
---

Sends a notification to the client device using Javascript notification API.

- Request permission for sending notifications using ` Notification.requestPermission()`.
- permission can have 3 values:
    1. granted
    2. denied
    3. defualt: system treats this as denied permission.
- Send notifcation using `Notification()`.


```js
const sendNotification = async (title, body) => {
    const permission = await Notification.requestPermission();

    if(permission === 'granted') {
        var notification = new Notification(title, { body });
    }
}
```