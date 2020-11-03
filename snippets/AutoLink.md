---
title: AutoLink
tags: components,fragment,regexp,intermediate
---

Renders a string as plaintext, with URLs converted to appropriate link elements.

- Use `String.prototype.split()` and `String.prototype.match()` with a regular expression to find URLs in a string.
- Return matched URLs rendered as `<a>` elements, dealing with missing protocol prefixes if necessary.
- Render the rest of the string as plaintext.

```jsx
const AutoLink = ({ text }) => {
  const delimiter = /((?:https?:\/\/)?(?:(?:[a-z0-9]?(?:[a-z0-9\-]{1,61}[a-z0-9])?\.[^\.|\s])+[a-z\.]*[a-z]+|(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})(?::\d{1,5})*[a-z0-9.,_\/~#&=;%+?\-\\(\\)]*)/gi;

  return (
    <>
      {text.split(delimiter).map(word => {
        const match = word.match(delimiter);
        if (match) {
          const url = match[0];
          return (
            <a href={url.startsWith('http') ? url : `http://${url}`}>{url}</a>
          );
        }
        return word;
      })}
    </>
  );
};
```

```jsx
ReactDOM.render(
  <AutoLink text="foo bar baz http://example.org bar" />,
  document.getElementById('root')
);
```
