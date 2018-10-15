### copyToClipboardAsync

This snippet copies text to your clipboard using the [new clipboard api](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) and the [permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API). Unfortunately, few browsers support the permissions api for now. 

```js
const copyToClipboardAsync = (text) => {
  return navigator.permissions.query({name:'clipboard-write'}).then(function(result) {
    if (result.state == 'granted' || result.state == 'prompt') {
      return navigator.clipboard.writeText(text);
    } else if (result.state == 'denied') {
      return Promise.reject("Permission denied.");
    }
    
    result.onchange = function() {// when the user's permissions change
      console.log('Permission ' + result.state);
    }
  });
};
```

```js
copyToClipboardAsync("Hello, World!").
  then(() => console.log("Copied!").
  catch(console.error);
```
