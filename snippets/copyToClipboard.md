### copyToClipboard

Copy a string to the clipboard. Only works as a result of user action (i.e. inside a `click` event listener).

Create a new `<textarea>` element, fill it with the supplied data and add it to the HTML document.
Use `document.execCommand('copy')` to copy to the clipboard.
Finally, remove the `<textarea>` element from the HTML document.

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}
```

```js
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```
