---
title: React useIntersectionObserver hook
tags: hooks,state,effect
author: chalarangelo
cover: blog_images/budapest-palace.jpg
firstSeen: 2021-09-10T05:00:00-04:00
---

Observes visibility changes for a given element.

- Use the `useState()` hook to store the intersection value of the given element.
- Create an `IntersectionObserver` with the given `options` and an appropriate callback to update the `isIntersecting` state variable.
- Use the `useEffect()` hook to call `IntersectionObserver.observe()` when mounting the component and clean up using `IntersectionObserver.unobserve()` when unmounting.

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
```

```jsx
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

ReactDOM.render(<MyApp />, document.getElementById('root'));

```
