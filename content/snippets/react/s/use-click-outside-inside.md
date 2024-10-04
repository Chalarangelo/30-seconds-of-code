---
title: React useClickOutside and useClickInside hooks
shortTitle: useClickOutside and useClickInside hooks
language: react
tags: [hooks,effect,event]
cover: clutter
excerpt: Learn how to effectively handle the click event outside or inside a component using custom hooks.
listed: true
dateModified: 2024-07-05
---

Handling **click events** in React is usually as simple as adding an `onClick` handler to a component. However, there are cases where you need to handle clicks outside or inside a component. This takes some extra effort and, most often than not, requires the use of custom hooks.

> [!NOTE]
>
> It's highly recommended that you learn more about [detection of click events outside an element with JavaScript](/js/s/listen-click-outside-event).

## `useClickOutside` hook

In order to handle clicks **outside of a component**, you'll first need to have a **reference** to the component. This is where the `useRef()` hook comes in handy. You can then use the `useEffect()` hook to add an **event listener** to the `document` and check if the click event occurred outside the component.

```jsx
const useClickOutside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
```

Using the hook is fairly simple. You just need to pass a `ref` and a `callback` function to handle the click event. The `callback` function will be called when the click event occurs outside the component.

```jsx
const ClickBox = ({ onClickOutside }) => {
  const clickRef = React.useRef();
  useClickOutside(clickRef, onClickOutside);

  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: '2px dashed orangered',
        height: 200,
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>Click out of this element</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClickBox onClickOutside={() => alert('click outside')} />
);
```

## `useClickInside` hook

Similarly, you can create a hook to handle clicks **inside a component**. The logic is almost the same, but you need to check if the click event occurred inside the component. This hook can come in handy when you need to handle clicks on multiple children and you don't want to add an `onClick` handler to each of them.

```jsx
const useClickInside = (ref, callback) => {
  const handleClick = e => {
    if (ref.current && ref.current.contains(e.target)) {
      callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};
```

Again, you will need to pass the `ref` and a `callback` function to handle the click event inside the component, same as before.

```jsx
const ClickBox = ({ onClickInside }) => {
  const clickRef = React.useRef();
  useClickInside(clickRef, onClickInside);
  return (
    <div
      className="click-box"
      ref={clickRef}
      style={{
        border: '2px dashed orangered',
        height: 200,
        width: 400,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <p>Click inside this element</p>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <ClickBox onClickInside={() => alert('click inside')} />
);
```
