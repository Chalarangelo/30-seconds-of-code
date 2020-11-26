---
title: CountDown
tags: components,state,advanced
---

Renders a countdown timer that prints a message when it reaches zero.

- Use the `useState()` hook to create a state variable to hold the time value, initialize it from the props and destructure it into its components.
- Use the `useState()` hook to create the `paused` and `over` state variables, used to prevent the timer from ticking if it's paused or the time has run out.
- Create a method `tick`, that updates the time values based on the current value (i.e. decreasing the time by one second).
- Create a method `reset`, that resets all state variables to their initial states.
- Use the the `useEffect()` hook to call the `tick` method every second via the use of `setInterval()` and use `clearInterval()` to clean up when the component is unmounted.
- Use `String.prototype.padStart()` to pad each part of the time array to two characters to create the visual representation of the timer.

```jsx
const CountDown = ({ hours = 0, minutes = 0, seconds = 0 }) => {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [[h, m, s], setTime] = React.useState([hours, minutes, seconds]);

  const tick = () => {
    if (paused || over) return;
    if (h === 0 && m === 0 && s === 0) setOver(true);
    else if (m === 0 && s === 0) {
      setTime([h - 1, 59, 59]);
    } else if (s == 0) {
      setTime([h, m - 1, 59]);
    } else {
      setTime([h, m, s - 1]);
    }
  };

  const reset = () => {
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p>{`${h.toString().padStart(2, '0')}:${m
        .toString()
        .padStart(2, '0')}:${s.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button onClick={() => setPaused(!paused)}>
        {paused ? 'Resume' : 'Pause'}
      </button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  );
};
```

```jsx
ReactDOM.render(
  <CountDown hours={1} minutes={45} />,
  document.getElementById('root')
);
```
