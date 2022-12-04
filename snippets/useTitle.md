---
title: React useTitle hook
tags: hooks,effect
author: chalarangelo
cover: blog_images/blue-lake.jpg
firstSeen: 2021-09-27T05:00:00-04:00
---

Sets the title of the page

- Use `typeof` to determine if the `Document` is defined or not.
- Use the `useRef()` hook to store the original title of the `Document`, if defined.
- Use the `useEffect()` hook to set `Document.title` to the passed value when the component mounts and clean up when unmounting.

```jsx
const useTitle = title => {
  const documentDefined = typeof document !== 'undefined';
  const originalTitle = React.useRef(documentDefined ? document.title : null);

  React.useEffect(() => {
    if (!documentDefined) return;

    if (document.title !== title) document.title = title;

    return () => {
      document.title = originalTitle.current;
    };
  }, []);
};
```

```jsx
const Alert = () => {
  useTitle('Alert');
  return <p>Alert! Title has changed</p>;
};

const MyApp = () => {
  const [alertOpen, setAlertOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setAlertOpen(!alertOpen)}>Toggle alert</button>
      {alertOpen && <Alert />}
    </>
  );
};

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
