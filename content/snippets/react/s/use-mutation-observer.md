---
title: React useMutationObserver hook
shortTitle: useMutationObserver hook
language: react
tags: [hooks,effect]
cover: lemon-tea
excerpt: Use the `MutationObserver` API to watch for changes made to the DOM tree.
listed: true
dateModified: 2024-06-27
---

JavaScript's `MutationObserver` API is a modern way to **watch for changes** made to the DOM tree. However, its imperative nature can make it difficult to use in a declarative manner. You can create a custom hook to make it easier to use `MutationObserver` in React components.

All you really need is a `ref` to the **element** you want to watch, a `callback` function to be called when changes are detected, and an `options` object to specify what changes to watch for.

To create your custom hook, you'll use the `useEffect()` hook to set up the `MutationObserver` and the `ref` to watch. The **effect** will depend on the `callback` and `options` values.

Then, inside the effect **callback**, you'll check if the `ref` is initialized. If it is, you'll create a new `MutationObserver` and pass it the `callback`. You'll then call `MutationObserver.observe()` with the given `options` to watch the `ref` for changes.

Finally, **when the component unmounts**, you'll use the `MutationObserver.disconnect()` method to remove the observer.

```jsx
const useMutationObserver = (
  ref,
  callback,
  options = {
    attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  }
) => {
  React.useEffect(() => {
    if (ref.current) {
      const observer = new MutationObserver(callback);
      observer.observe(ref.current, options);
      return () => observer.disconnect();
    }
  }, [callback, options]);
};

const App = () => {
  const mutationRef = React.useRef();
  const [mutationCount, setMutationCount] = React.useState(0);
  const incrementMutationCount = () => {
    return setMutationCount(mutationCount + 1);
  };
  useMutationObserver(mutationRef, incrementMutationCount);
  const [content, setContent] = React.useState('Hello world');

  return (
    <>
      <label for="content-input">Edit this to update the text:</label>
      <textarea
        id="content-input"
        style={{ width: '100%' }}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <div
        style={{ width: '100%' }}
        ref={mutationRef}
      >
        <div
          style={{
            resize: 'both',
            overflow: 'auto',
            maxWidth: '100%',
            border: '1px solid black',
          }}
        >
          <h2>Resize or change the content:</h2>
          <p>{content}</p>
        </div>
      </div>
      <div>
        <h3>Mutation count {mutationCount}</h3>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
);
```
