---
title: Ticker
tags: components,state,beginner
---

Renders a ticker component.

- Use the `React.useState()` hook to initialize the `ticker` state variable to `0`.
- Define two methods, `tick` and `reset`, that will periodically increment `timer` based on `intervalId` and reset `intervalId` respectively.
- Return a `<div>` with two `<button>` elements, each of which calls `tick` and `reset` respectively.

```jsx
const Ticker = ({ times, interval }) => {
  const [ticker, setTicker] = React.useState(0);
  let intervalId = null;

  const tick = () => {
    reset();
    intervalId = setInterval(() => {
      if (ticker < times) setTicker(ticker + 1);
      else clearInterval(intervalId);
    }, interval);
  };

  const reset = () => {
    setTicker(0);
    clearInterval(intervalId);
  };

  return (
    <div>
      <span style={{ fontSize: 100 }}>{ticker}</span>
      <button onClick={tick}>Tick!</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
};
```

```jsx
ReactDOM.render(<Ticker times={5} interval={1000} />, document.getElementById('root'));
```
