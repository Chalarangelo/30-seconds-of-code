---
title: ClickOutside
tags: hooks,effect,event,intermediate
---

A hook that handles the event of clicking outside of the wrapped component.

- Create a custom hook that takes a `ref` and a `callback` to handle the `click` event.
- Use the `React.useEffect()` hook to append and clean up the `click` event.
- Use the `React.useRef()` hook to create a `ref` for your click component and pass it to the `useClickOutside` hook.

```css
.click-box {
  border: 2px dashed orangered;
  height: 200px;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

p {
  border: 2px solid blue;
  padding: 16px;
}
```

```jsx
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

function ClickBox({ onClickOutside }) {
  const clickRef = useRef();
  useClickOutside(clickRef, onClickOutside);
  return (
    <div className="click-box" ref={clickRef}>
      <p>Hello Click Me Inside!</p>
    </div>
  );
}
```

```jsx
ReactDOM.render(
  <ClickBox onClickOutside={() => alert('click outside')} />,
  document.getElementById('root')
);
```
