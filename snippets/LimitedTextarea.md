### LimitedTextarea

Renders a textarea component with a character limit.

Use the `React.useState()` hook to create the `content` state variable and set its value to `value`.
Create a method `setFormattedContent`, which trims the content of the input if it's longer than `limit`.
Use the `React.useEffect()` hook to call the `setFormattedContent` method on the value of the `content` state variable.
Use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of `event.target.value`.

```jsx
function LimitedTextarea({ rows, cols, value, limit }) {
  const [content, setContent] = React.useState(value);

  const setFormattedContent = text => {
    text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
  };

  React.useEffect(() => {
    setFormattedContent(content);
  }, []);

  return (
    <div>
      <textarea
        rows={rows}
        cols={cols}
        onChange={event => setFormattedContent(event.target.value)}
        value={content}
      />
      <p>
        {content.length}/{limit}
      </p>
    </div>
  );
}
```

```jsx
ReactDOM.render(
  <LimitedTextarea limit={32} value='Hello!' />,
  document.getElementById('root')
);
```
<!-- tags: input,state,effect -->

<!-- expertise: 0 -->

