---
title: Create a textarea React component with word or character limit
shortTitle: Limited word or character textarea
language: react
tags: [components,input,state,callback,event]
cover: flower-portrait-2
excerpt: Create your custom textarea components, with a word or character limit in React.
listed: true
dateModified: 2024-06-19
---

The `<textarea>` element is a multi-line **text input control** that allows users to enter text. React allows you to enhance its functionality by creating custom components that can have additional features, such as a word or character limit.

## Uncontrolled textarea element

The simplest version of a `<textarea>` component is an **uncontrolled** one. It uses the `defaultValue` prop passed down from the parent as the initial value of the input field. The `onChange` event is used to fire the `onValueChange` callback and send the new value to the parent.

```jsx
const TextArea = ({
  cols = 20,
  rows = 2,
  defaultValue,
  onValueChange,
  ...rest
}) => {
  return (
    <textarea
      cols={cols}
      rows={rows}
      defaultValue={defaultValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <TextArea
    placeholder="Insert some text here..."
    onValueChange={val => console.log(val)}
  />
);
```

## Controlled textarea element

A **controlled** `<textarea>` component instead uses the `value` prop to manage the input field's value. The `onChange` event is used to update the `value` prop with the new value. Taking this a step further, we can use the `useState()` hook to create a state variable, `content`. For this variant, it won't do much more than mirror the `value` prop.

```jsx
const TextArea = ({ cols = 20, rows = 2, value, onChange, ...rest }) => {
  const [content, setContent] = React.useState(value);

  return (
    <textarea
      cols={cols}
      rows={rows}
      value={content}
      onChange={event => {
        setContent(event.target.value);
        onChange(event.target.value);
      }}
      {...rest}
    />
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <TextArea
    placeholder="Insert some text here..."
    value="Hello, world!"
    onChange={val => console.log(val)}
  />
);
```

## Limited character textarea

Expanding upon the controlled `<textarea>` component, we can add a **character limit** to it. The `useState()` hook is used to create the `content` state variable, which is set to the `value` prop trimmed down to `limit` characters. A method, `setFormattedContent`, is created to trim the content down to `limit` characters and memoize it using the `useCallback()` hook. The `onChange` event of the `<textarea>` is bound to call `setFormattedContent` with the value of the fired event.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <LimitedTextarea limit={32} value="Hello!" />
);
```

## Limited word textarea

Similarly, we can create a `<textarea>` component with a **word limit**. The implementation is much the same as before, except that we use `String.prototype.split()` to turn the input into an array of words. The `setFormattedContent` method is then used to trim the input down to `limit` words.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <LimitedWordTextarea limit={5} value="Hello there!" />
);
```
