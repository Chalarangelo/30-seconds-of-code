### Ticker

Renders a ticker component.

Use the `React.useState()` hook to initialize the `ticker` state variable to `0`.
Define two methods, `tick` and `reset`, that will periodically increment `timer` based on `interval` and reset `interval` respectively.
Return a `<div>` with two `<button>` elements, each of which calls `tick` and `reset` respectively.

```jsx
function Ticker(props) {
  const [ticker, setTicker] = React.useState(0);
  let interval = null;

  const tick = () => {
    reset();
    interval = setInterval(() => {
      if (ticker < props.times) 
        setTicker(ticker + 1);
      else 
        clearInterval(interval);
    }, props.interval);
  }

  const reset = () => {
    setTicker(0);
    clearInterval(interval);
  }

  return (
    <div>
      <span style={{ fontSize: 100 }}>{this.state.ticker}</span>
      <button onClick={this.tick}>Tick!</button>
      <button onClick={this.reset}>Reset</button>
    </div>
  );
}
```

```jsx
ReactDOM.render(<Ticker times={5} interval={1000} />, document.getElementById('root'));
```

<!-- tags: visual,state -->

<!-- expertise: 1 -->