---
title: LimitedTextarea
tags: components,state,callback,event,beginner
---

Renders a textarea component with a character limit.

- Use the `useState()` hook to create the `content` state variable and set its value to that of `value` prop, trimmed down to `limit` characters.
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
ReactDOM.render(
  <LimitedTextarea limit={32} value="Hello!" />,
  document.getElementById('root')
);
```
