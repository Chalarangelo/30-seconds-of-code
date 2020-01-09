---
title: useAsync
tags: hooks,state,effect,intermediate
---

A hook that handle asynchronous calls.

- Create a custom hook that takes a handler `function` and `options`.
- Use the `React.useState()` hook to initialize the `value`, `error` and `loading` state variables.
- Use the `React.useEffect()` hook to call `run()` method and update the state variables accordingly if `options.autoRun` set to true.
- Use the `run` function to manually trigger `handler` function.
- Return an object containting the `value`, `error` and `isLoading` state variables and `run` function.

```jsx
const useAsync = (fn, options = {}) => {
  const [value, setValue] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(false)

  const autoRun = options.autoRun || false

  const run = async (args = null) => {
    try {
      setIsLoading(true)
      const value = await fn(args)
      setError(null)
      setValue(value)
    } catch (error) {
      setIsLoading(false)
      setValue(null)
      setError(error)
    }
  }

  React.useEffect(() => {
    if (autoRun) {
      run()
    }
  }, [autoRun])

  return {
    value,
    error,
    isLoading,
    run,
  }
}
```

```jsx
const App = () => {
  const handleSubmit = (args) => { // args {foo: bar}
    const url = "https://jsonplaceholder.typicode.com/todos"
    return fetch(url).then(response => response.json())
  }

  const submission = useAsync(handleSubmit, { autoRun: false })

  return (
    <div>
      <button onClick={() => submission.run({ foo: "bar" })} disabled={submission.isLoading}>
        {submission.isLoading ? 'Loading...': 'click me'}
      </button>
      <pre>{JSON.stringify(submission.value, null, 2)}</pre>
    </div>
  )
}
```
