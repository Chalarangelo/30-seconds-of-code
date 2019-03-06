### LimitedWordTextarea

Renders a textarea component with a word limit.

* Use the `React.useState()` hook to create the `content` and `wordCount` state variables and set their values to `value` and `0` respectively.
* Create a method `setFormattedContent`, which uses `String.prototype.split(' ')` to turn the input into an array of words and check if the result of applying `Array.prototype.filter(Boolean)` has a `length` longer than `limit`.
* If the afforementioned `length` exceeds the `limit`, trim the input, otherwise return the raw input, updating `content` and `wordCount` accordingly in both cases.
* Use the `React.useEffect()` hook to call the `setFormattedContent` method on the value of the `content` state variable.
* Use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to call `setFormattedContent` with the value of `event.target.value`.

```jsx
function LimitedWordTextarea({ rows, cols, value, limit }) {
  const [content, setContent] = React.useState(value);
  const [wordCount, setWordCount] = React.useState(0);

  const setFormattedContent = text => {
    let words = text.split(' ');
    if (words.filter(Boolean).length > limit) {
      setContent(
        text
          .split(' ')
          .slice(0, limit)
          .join(' ')
      );
      setWordCount(limit);
    } else {
      setContent(text);
      setWordCount(words.filter(Boolean).length);
    }
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
        {wordCount}/{limit}
      </p>
    </div>
  );
}
```

```jsx
ReactDOM.render(
  <LimitedWordTextArea limit={5} value="Hello there!" />,
  document.getElementById('root')
);
```

<!-- tags: input,state,effect -->

<!-- expertise: 0 -->
