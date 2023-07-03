---
title: Textarea with character limit
type: snippet
language: react
tags: [components,state,callback,event]
cover: flower-portrait-2
dateModified: 2021-10-13T19:29:39+02:00
---

Renders a textarea component with a character limit.

- Use the `useState()` hook to create the `content` state variable. Set its value to that of `value` prop, trimmed down to `limit` characters.
- Create a method `setFormattedContent`, which trims the content down to `limit` characters and memoize it, using the `useCallback()` hook.
- Bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of the fired event.

```jsx
const LimitedTextarea = ({ rows, cols, value, limit }) => {
  const [content, setContent] = React.useState(value.slice(0, limit));

  const setFormattedContent = React.useCallback(
    text => {
      setContent(text.slice(0, limit));
    },
    [limit, setContent]
  );

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        {content.length}/{limit}
      </p>
    </>
  );
};
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <LimitedTextarea limit={32} value="Hello!" />
);
```
