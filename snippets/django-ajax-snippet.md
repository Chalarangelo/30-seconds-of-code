---
title: Django-Ajax-Request
tags: Django, Ajax, Json, HttpResposne
---

Django Ajax handler(without Jquery) is a javascript code snippet that sends the data be it form data, textarea data, etc

- This function does not require any third party library like jquery as it uses the inbuilt fetch method of javascript.
- Sends data to Django View without refreshing the page
- Returna a promise wiht the help of which we can manipulate the html as per our need.
- Function takes in a json object, url, type of request as an input and returns the response from django backend.

- Parameters

Data: Josn Object
Url: Url on which data is to be sent
Method: GET, PULL, POST, DELETE

```js
const sendDataToDjango = (data, url, method) => {
  fetch(`${url}`, {
    method: `${method}`,
    credentials: "include",
    cache: "no-cache",
    body: JSON.stringify(data),
    headers: new Headers({
      "content-type": "application/json",
      "X-CSRFToken": getCookie("csrftoken"),
    }),
  }).then(function (response) {
    response.json().then(function (data) {
      return data;
    });
  });
};
```

```js
sendDataToDjango({"username": "Rick"}); // '{"response": "Username Changed"}'
```
