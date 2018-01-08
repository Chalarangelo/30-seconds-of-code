### httpGet

Makes a `GET` request to the passed `URL` using `XMLHttpRequest` web api.

Explain briefly how the snippet works.

```js
const httpGet = url => {
  const request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.onload = () => {
    const response = JSON.parse(request.responseText);
    (request.readyState === 4 && request.status == "200") ? console.log(response) : console.error(response);
  }
  request.send();
}
```

```js
functionName('sampleInput') // 'sampleOutput'
```
