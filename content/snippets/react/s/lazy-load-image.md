---
title: Lazy-loading images in React
shortTitle: Lazy load image
language: react
tags: [components,effect,state]
cover: strawberries
excerpt: Learn how to create your own lazy loading image component in React.
listed: true
dateModified: 2024-06-14
---

Lazy loading images is a great way to **improve the performance** of your web application. By only loading images when they are in the viewport, you can reduce the initial load time and save bandwidth. In React, you can create a custom component that supports lazy loading using the `IntersectionObserver` API.

In order to implement the `LazyLoadImage` component, you will need to use the `useState()` hook to create a stateful value that indicates if the **image has been loaded**. You will also use the `useEffect()` hook to check if the `HTMLImageElement.prototype` contains `'loading'`, effectively checking if lazy loading is **supported natively**.

If not, you will create a new `IntersectionObserver` and use `IntersectionObserver.observer()` to observe the `<img>` element. Finally, you will use the `useRef()` hook to create two refs, one for the `<img>` element and the other for the `IntersectionObserver` instance, if necessary.

In order to **render** the `<img>` element, you will apply the `loading='lazy'` attribute to make it load lazily, if necessary. Use the `isLoaded` state variable to determine the value of the `src` attribute.


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

ReactDOM.createRoot(document.getElementById('root')).render(
  <LazyLoadImage
    src="https://picsum.photos/id/1080/600/600"
    alt="Strawberries"
  />
);
```
