### CountDown

Renders a countdown timer that prints a message when it reaches zero.

* Use object destructuring to set defaults for the `hours`, `minutes` and `seconds` props.
* Use the `React.useState()` hook to create the `time`, `paused` and `over` state variables and set their values to the values of the passed props, `false` and `false` respectively.
* Create a method `tick`, that updates the value of `time` based on the current value (i.e. decreasing the time by one second).
* If `paused` or `over` is `true`, `tick` will return immediately.
* Create a method `reset`, that resets all state variables to their initial states.
* Use the the `React.useEffect()` hook to call the `tick` method every second via the use of `setInterval()` and use `clearInterval()` to cleanup when the component is unmounted.
* Use a `<div>` to wrap a `<p>` element with the textual representation of the components `time` state variable, as well as two `<button>` elements that will pause/unpause and restart the timer respectively.
* If `over` is `true`, the timer will display a message instead of the value of `time`.

```jsx
function CountDown({ hours = 0, minutes = 0, seconds = 0 }) {
  const [paused, setPaused] = React.useState(false);
  const [over, setOver] = React.useState(false);
  const [time, setTime] = React.useState({
    hours: parseInt(hours),
    minutes: parseInt(minutes),
    seconds: parseInt(seconds)
  });

  const tick = () => {
    if (paused || over) return;
    if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) setOver(true);
    else if (time.minutes == 0 && time.seconds == 0)
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    else if (time.seconds == 0)
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    else
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      });
  };

  const reset = () => {
    setTime({
      hours: parseInt(hours),
      minutes: parseInt(minutes),
      seconds: parseInt(seconds)
    });
    setPaused(false);
    setOver(false);
  };

  React.useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);
    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes
        .toString()
        .padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button onClick={() => setPaused(!paused)}>{paused ? 'Resume' : 'Pause'}</button>
      <button onClick={() => reset()}>Restart</button>
    </div>
  );
}
```

```jsx
ReactDOM.render(<CountDown hours="1" minutes="45" />, document.getElementById('root'));
```

<!-- tags: visual,state -->

<!-- expertise: 2 -->
