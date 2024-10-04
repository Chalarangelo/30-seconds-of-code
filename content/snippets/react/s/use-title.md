---
title: How can I use a React hook to change the title of a page?
shortTitle: useTitle hook
language: react
tags: [hooks,effect]
cover: chubby-squirrel
excerpt: Ever wanted to change the title of a page in a React app? You can create a custom hook to do just that.
listed: true
dateModified: 2024-06-25
---

React doesn't provide a built-in way to **change the title of a page**. However, you can create a custom hook to do just that. This hook will set the title of the page when the component mounts and clean up when the component unmounts.

Before you implement the logic, however, you'll need to **check if you're in a browser environment**. This is because the `document` object is only available in the browser. You can do this by using `typeof` to determine if the `Document` is defined or not.

Then, using the `useRef()` hook, you can **store the original title** of the `Document`, if defined. This will allow you to reset the title when the component unmounts.

Finally, you can use the `useEffect()` hook to set `Document.title` to the passed value when the component mounts and clean up when unmounting.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
