---
title: React useScript hook
tags: hooks,effect,state,event
author: chalarangelo
cover: blog_images/travel-mug-3.jpg
firstSeen: 2021-10-08T05:00:00-04:00
---

Dynamically loads an external script.

- Use the `useState()` hook to create a state variable for the load status of the script.
- Use the `useEffect()` hook to handle all the logic for loading and unloading the script anytime the `src` changes.
- If no `src` value is present, set the `status` to `'idle'` and return.
- Use `Document.querySelector()` to check if a `<script>` element with the appropriate `src` value exists.
- If no relevant element exists, use `Document.createElement()` to create one and give it the appropriate attributes.
- Use the `data-status` attribute as a way to indicate the status of the script, setting it to `'loading'` initially.
- If a relevant element exists, skip initialization and update the `status` from its `data-status` attribute. This ensures that no duplicate element will be created.
- Use `EventTarget.addEventListener()` to listen for `'load'` and `'error'` events and handle them by updating the `data-status` attribute and the `status` state variable.
- Finally, when the component unmounts, use `Document.removeEventListener()` to remove any listeners bound to the element.

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
```

```jsx
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

ReactDOM.render(<MyApp />, document.getElementById('root'));
```
