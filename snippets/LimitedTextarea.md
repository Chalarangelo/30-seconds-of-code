### LimitedTextarea

Renders a textarea component with a character limit.

Use the `value` and `limit` props to pass in the initial `content` and the `limit` values for the LimitedTextArea component.
Create a method, `handleChange`, which trims the `event.target.value` data if necessary and updates `content` with the new entered content.
In the`render()` method, use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to the `handleChange` method.

```jsx
function LimitedTextArea(props) {
  const { rows, cols, value, limit } = props;

  const setFormattedContent = text => {
    text.length > limit ? setContent(text.slice(0, limit)) : setContent(text);
  };

  const [content, setContent] = useState(value);
  // Run once to test if the initial value is greater than the limit
  useEffect(() => {
    setFormattedContent(content);
  }, []);

  const handleChange = event => {
    setFormattedContent(event.target.value);
  };

  return (
    <div>
      <textarea
        rows={rows}
        cols={cols}
        onChange={handleChange}
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
<!-- tags: input,state,class -->

<!-- expertise: 0 -->

