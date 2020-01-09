---
title: useAsync
tags: react,intermediate,hook
---


The `useAsync` hook is used to bind asynchronous call and handle different states like loading, error, and value. According to the state of an asynchronous call, we can render different states like loading, error and value state.

**Explanation:**
In `useAsync` hook we need to pass the handler function and that will be called after calling the `run` method. Once `run` get's called we're changing loading, error and value field according to asynchronous call response.

```js
const useAsync = (fn, options = {}) => {
  const autoRun = options.autoRun || false

  const [state, setState] = React.useState({
    error: null,
    loading: false,
    value: null,
  })

  const handleStateChange = args => {
    setState({ ...state, ...args })
  }

  const run = async (args = null) => {
    try {
      handleStateChange({ loading: true, error: null })
      const value = await fn(args)
      handleStateChange({ loading: false, value: value || null, error: null })
    } catch (error) {
      handleStateChange({ loading: false, value: null, error })
    }
  }

  React.useEffect(() => {
    if (autoRun) {
      run()
    }
  }, [autoRun])

  return {
    state,
    setState,
    run,
  }
}
```

**Usages**
```jsx
const App = () => {
  const handleSubmit = () => {
    const url = "https://jsonplaceholder.typicode.com/todos"
    return fetch(url).then(response => response.json())
  }

  const submission = useAsync(handleSubmit, { autoRun: false })

  return (
    <div>
      {submission.value && <div>{submission.value}</div>}
      <button
        onClick={() => submission.run({ foo: "bar" })}
        disabled={submission.loading}
      >
        click me
      </button>
    </div>
  )
}
```
