---
title: React useScript hook
shortTitle: useScript hook
language: react
tags: [hooks,effect,state,event]
cover: travel-mug-3
excerpt: Ever wanted to dynamically load an external script in React? Here's a trick to help you out.
listed: true
dateModified: 2024-06-23
---

Have you ever wanted to **dynamically load an external script** in a React component? You can create a custom hook to handle this logic for you. This hook will load the script when the component mounts and clean up when the component unmounts.

> [!CAUTION]
>
> Be cautious when loading external scripts, as they can introduce security vulnerabilities and performance issues. Make sure you trust the source of the script and understand its implications.

Starting out, you'll have to create a state variable to hold the **load status** of the script, using the `useState()` hook. You can then define a function to handle all the logic for loading and unloading the script, using the `useEffect()` hook. The effect will depend on the `src` value passed to the hook. If no `src` value is present, you can set the `status` to `'idle'` and return.

Then, using `Document.querySelector()`, you can check if a `<script>` element with the appropriate `src` value exists. If **no relevant element exists**, you can use `Document.createElement()` to create one and give it the appropriate attributes. You can use the `data-status` attribute as a way to indicate the status of the script, setting it to `'loading'` initially. If a **relevant element exists**, you can skip initialization and update the `status` from its `data-status` attribute. This ensures that **no duplicate element** will be created.

Finally, you can use `EventTarget.addEventListener()` to listen for `'load'` and `'error'` events and handle them by updating the `data-status` attribute and the `status` state variable. When the component unmounts, you can use `Document.removeEventListener()` to remove any listeners bound to the element.

```jsx
const useScript = src => {
  const [status, setStatus] = React.useState(src ? 'loading' : 'idle');

  React.useEffect(() => {
    if (!src) {
      setStatus('idle');
      return;
    }

    let script = document.querySelector(`script[src="${src}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = src;
      script.async = true;
      script.setAttribute('data-status', 'loading');
      document.body.appendChild(script);

      const setDataStatus = event => {
        script.setAttribute(
          'data-status',
          event.type === 'load' ? 'ready' : 'error'
        );
      };
      script.addEventListener('load', setDataStatus);
      script.addEventListener('error', setDataStatus);
    } else {
      setStatus(script.getAttribute('data-status'));
    }

    const setStateStatus = event => {
      setStatus(event.type === 'load' ? 'ready' : 'error');
    };

    script.addEventListener('load', setStateStatus);
    script.addEventListener('error', setStateStatus);

    return () => {
      if (script) {
        script.removeEventListener('load', setStateStatus);
        script.removeEventListener('error', setStateStatus);
      }
    };
  }, [src]);

  return status;
};

const script =
  'data:text/plain;charset=utf-8;base64,KGZ1bmN0aW9uKCl7IGNvbnNvbGUubG9nKCdIZWxsbycpIH0pKCk7';

const Child = () => {
  const status = useScript(script);
  return <p>Child status: {status}</p>;
};

const MyApp = () => {
  const status = useScript(script);
  return (
    <>
      <p>Parent status: {status}</p>
      <Child />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <MyApp />
);
```
