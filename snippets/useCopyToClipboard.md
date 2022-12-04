---
title: React useCopyToClipboard hook
tags: hooks,effect,state,callback
author: chalarangelo
cover: blog_images/antelope.jpg
firstSeen: 2020-04-22T18:51:30+03:00
lastUpdated: 2020-11-16T14:17:53+02:00
---

Copies the given text to the clipboard.

- Use the [copyToClipboard](/js/s/copy-to-clipboard/) snippet to copy the text to clipboard.
- Use the `useState()` hook to initialize the `copied` variable.
- Use the `useCallback()` hook to create a callback for the `copyToClipboard` method.
- Use the `useEffect()` hook to reset the `copied` state variable if the `text` changes.
- Return the `copied` state variable and the `copy` callback.

```jsx
const useCopyToClipboard = text => {
  const copyToClipboard = str => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    const selected =
      document.getSelection().rangeCount > 0
        ? document.getSelection().getRangeAt(0)
        : false;
    el.select();
    const success = document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    return success;
  };

  const [copied, setCopied] = React.useState(false);

  const copy = React.useCallback(() => {
    if (!copied) setCopied(copyToClipboard(text));
  }, [text]);
  React.useEffect(() => () => setCopied(false), [text]);

  return [copied, copy];
};
```

```jsx
const TextCopy = props => {
  const [copied, copy] = useCopyToClipboard('Lorem ipsum');
  return (
    <div>
      <button onClick={copy}>Click to copy</button>
      <span>{copied && 'Copied!'}</span>
    </div>
  );
};

ReactDOM.render(<TextCopy />, document.getElementById('root'));
```
