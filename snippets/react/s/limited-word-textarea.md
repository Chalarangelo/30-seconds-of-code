---
title: Textarea with word limit
type: snippet
language: react
tags: [components,input,state,callback,effect,event]
cover: painters-desk
dateModified: 2021-10-13T19:29:39+02:00
---

Renders a textarea component with a word limit.

- Use the `useState()` hook to create a state variable, containing `content` and `wordCount`. Use the `value` prop and `0` as the initial values respectively.
- Use the `useCallback()` hooks to create a memoized function, `setFormattedContent`, that uses `String.prototype.split()` to turn the input into an array of words.
- Check if the result of applying `Array.prototype.filter()` combined with `Boolean` has a `length` longer than `limit`. If it does, trim the input. Otherwise return the raw input, updating state accordingly in both cases.
- Use the `useEffect()` hook to call the `setFormattedContent` method on the value of the `content` state variable during the initial render.
- Bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of `event.target.value`.

```jsx
const LimitedWordTextarea = ({ rows, cols, value, limit }) => {
  const [{ content, wordCount }, setContent] = React.useState({
    content: value,
    wordCount: 0
  });

  const setFormattedContent = React.useCallback(
    text => {
      let words = text.split(' ').filter(Boolean);
      if (words.length > limit) {
        setContent({
          content: words.slice(0, limit).join(' '),
          wordCount: limit
        });
      } else {
        setContent({ content: text, wordCount: words.length });
      }
    },
    [limit, setContent]
  );

  React.useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        {wordCount}/{limit}
      </p>
    </>
  );
};
```

```jsx
ReactDOM.createRoot(document.getElementById('root')).render(
  <LimitedWordTextarea limit={5} value="Hello there!" />
);
```
