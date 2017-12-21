### httpsRedirect

Redirects the page to HTTPS if its currently in HTTP. Also, pressing the back button doesn't take it back to the HTTP page as its replaced in the history.

```js
const httpsRedirect = () => {
	if(location.protocol !== "https:") location.replace("https://" + location.href.split("//")[1]);
}
```