---
title: React useBodyScrollLock hook
shortTitle: useBodyScrollLock hook
language: react
tags: [hooks,effect]
cover: folded-map
excerpt: Do you need to lock the body scroll when a modal is open? Perhaps this custom hook can help.
listed: true
dateModified: 2024-06-22
---

Modals are tricky to implement, but they pose a significant challenge when it comes to scrolling. When a modal is open, you might want to prevent the user from scrolling the body content. This is especially important on mobile devices, where the modal might be taller than the viewport. This technique is often referred to as **body scroll locking**.

To implement this feature in React, you can create a custom hook that locks the body scroll when a modal is open. This hook will set the `overflow` property of the `body` element to `'hidden'` when the modal is open and restore it to its original value when the modal is closed.

Implementation-wise, you'll need to reach for the `useLayoutEffect()` hook to ensure that the scroll lock is applied immediately when the component mounts. You can use `Window.getComputedStyle()` to get the current `overflow` value of the `body` element and store it in a variable. Then, you can replace the `overflow` value with `'hidden'` to lock the scroll. When the component unmounts, you can restore the original `overflow` value.

```jsx
const useBodyScrollLock = () => {
  React.useLayoutEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => (document.body.style.overflow = originalStyle);
  }, []);
};

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
