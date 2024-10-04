---
title: Countdown timer
language: react
tags: [components,state]
cover: sea-view-2
excerpt: Create a countdown timer that prints a message when it reaches zero, using React.
listed: true
dateModified: 2024-06-13
---

One of the benefits of React is that you can create complex components, encapsulating their logic and state. A great use case for this is a **countdown timer** that prints a message when it reaches zero.

The component relies heavily on the use of the `useState()` hook. It creates **state variables** to hold the time value, the `paused` state, and the `over` state.

The `tick` method **updates the time values** based on the current value. This method performs simple mathematical operations that decrease the time by one second, handling edge cases as needed. Similarly, the `reset` method resets all state variables to their initial states.

Then, using the `useEffect()` hook to call the `tick` method **every second** via the use of `setInterval()`, the component updates the time value. The hook also uses `clearInterval()` to clean up when the component is unmounted.

Finally, the component **renders** the countdown timer, displaying the time value and a message when the time **reaches zero**. It also includes buttons to pause, resume, and restart the timer.

> [!NOTE]
>
> This implementation only supports hours, minutes, and seconds. You can easily extend it to support days, weeks, or even months.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <CountDown hours={1} minutes={45} />
);
```
