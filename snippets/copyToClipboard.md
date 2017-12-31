### copyToClipboard

Copy a string to the clipboard. Only works as a result of user action (i.e. inside a `click` event listener).

Create a new `<textarea>` element, fill it with the supplied data and add it to the HTML document.
Use `Selection.getRangeAt()`to store the selected range (if any).
Use `document.execCommand('copy')` to copy to the clipboard.
Remove the `<textarea>` element from the HTML document.
Finally, use `Selection().addRange()` to recover the original selected range (if any).

```js
const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
```

```js
copyToClipboard('Lorem ipsum'); // 'Lorem ipsum' copied to clipboard.
```
