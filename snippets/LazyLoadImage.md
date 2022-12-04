---
title: Lazy-loading image
tags: components,effect,state
cover: blog_images/strawberries.jpg
author: chalarangelo
firstSeen: 2022-07-29T05:00:00-04:00
---

Renders an image that supports lazy loading.

- Use the `useState()` hook to create a stateful value that indicates if the image has been loaded.
- Use the `useEffect()` hook to check if the `HTMLImageElement.prototype` contains `'loading'`, effectively checking if lazy loading is supported natively. If not, create a new `IntersectionObserver` and use `IntersectionObserver.observer()` to observer the `<img>` element. Use the `return` value of the hook to clean up when the component unmounts.
- Use the `useCallback()` hook to memoize a callback function for the `IntersectionObserver`. This callback will update the `isLoaded` state variable and use `IntersectionObserver.disconnect()` to disconnect the `IntersectionObserver` instance.
- Use the `useRef()` hook to create two refs. One will hold the `<img>` element and the other the `IntersectionObserver` instance, if necessary.
- Finally, render the `<img>` element with the given attributes. Apply `loading='lazy'` to make it load lazily, if necessary. Use `isLoaded` to determine the value of the `src` attribute.

```jsx
const LazyLoadImage = ({
  alt,
  src,
  className,
  loadInitially = false,
  observerOptions = { root: null, rootMargin: '200px 0px' },
  ...props
}) => {
  const observerRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const [isLoaded, setIsLoaded] = React.useState(loadInitially);

  const observerCallback = React.useCallback(
    entries => {
      if (entries[0].isIntersecting) {
        observerRef.current.disconnect();
        setIsLoaded(true);
      }
    },
    [observerRef]
  );

  React.useEffect(() => {
    if (loadInitially) return;

    if ('loading' in HTMLImageElement.prototype) {
      setIsLoaded(true);
      return;
    }

    observerRef.current = new IntersectionObserver(
      observerCallback,
      observerOptions
    );
    observerRef.current.observe(imgRef.current);
    return () => {
      observerRef.current.disconnect();
    };
  }, []);

  return (
    <img
      alt={alt}
      src={isLoaded ? src : ''}
      ref={imgRef}
      className={className}
      loading={loadInitially ? undefined : 'lazy'}
      {...props}
    />
  );
};
```

```jsx
ReactDOM.render(
  <LazyLoadImage
    src="https://picsum.photos/id/1080/600/600"
    alt="Strawberries"
  />,
  document.getElementById('root')
);
```
