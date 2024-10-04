---
title: React useIntersectionObserver hook
shortTitle: useIntersectionObserver hook
language: react
tags: [hooks,state,effect]
cover: light-leaves
excerpt: Observe visibility changes for a given element, using the `IntersectionObserver` API.
listed: true
dateModified: 2024-06-26
---

JavaScript's `IntersectionObserver` API allows you to **observe visibility changes** for a given element. It's fairly straightforward to create a custom hook that wraps this functionality for React.

Using the `useState()` hook, you can store the **intersection value** of the given element. You can then create an `IntersectionObserver` with the given `options` and an appropriate **callback** to update the `isIntersecting` state variable.

Finally, you can use the `useEffect()` hook to call `IntersectionObserver.observe()` when **mounting** the component and clean up using `IntersectionObserver.unobserve()` when **unmounting**.

```jsx
const useIntersectionObserver = (ref, options) => {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.unobserve(ref.current);
    };
  }, []);

  return isIntersecting;
};

const MyApp = () => {
  const ref = React.useRef();
  const onScreen = useIntersectionObserver(ref, { threshold: 0.5 });

  return (
    <div>
      <div style={{ height: '100vh' }}>Scroll down</div>
      <div style={{ height: '100vh' }} ref={ref}>
        <p>{onScreen ? 'Element is on screen.' : 'Scroll more!'}</p>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);

```
