---
title: React useBodyScrollLock hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/folded-map.jpg
firstSeen: 2021-09-02T05:00:00-04:00
---

Enables body scroll locking.

- Use the `useLayoutEffect()` with an empty array as the second argument to execute the provided callback only once when the component is mounted.
- Use `Window.getComputedStyle()` to get the `overflow` value of the `body` element and store it in a variable.
- Replace the `overflow` value of the `body` element with `'hidden'` and restore it to its original value when unmounting.

```jsx
const useBodyScrollLock = () => {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};
```

```jsx
const Modal = ({ onClose }) => {
  useBodyScrollLock();

  return (
    <div
      style={{
        zIndex: 100, background: 'rgba(0,0,0,0.25)', display: 'flex',
        justifyContent: 'center', alignItems: 'center'
      }}
    >
      <p
        style={{ padding: 8, borderRadius: 8, background: '#fff' }}
        onClick={onClose}
      >
        Scroll locked! <br /> Click me to unlock
      </p>
    </div>
  );
};

const MyApp = () => {
  const [modalOpen, setModalOpen] = React.useState(false);

  return (
    <div
      style={{
        height: '400vh', textAlign: 'center', paddingTop: 100,
        background: 'linear-gradient(to bottom, #1fa2ff, #12d8fa, #a6ffcb)'
      }}
    >
      <button onClick={() => setModalOpen(true)}>Open modal</button>
      {modalOpen && <Modal onClose={() => setModalOpen(false)} />}
    </div>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
