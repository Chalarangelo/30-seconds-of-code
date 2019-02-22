### CountDown

Renders a countdown timer that prints a message when it reaches zero.

- The timer starts automatically with the initial value passed through the `props`
- Each second, `tick()` is called. It updates the timer, decreasing the time by one second each time
- If the `pause` button is clicked, `tick()` refrains from updating the time until the `resume` button is clicked
- If the `restart` button is clicked, the timer starts over from step 1
- If the time hits zero, the message 'Time's up!' is printed

```jsx
function CountDown(props) {
  const [paused, setPaused] = useState(false);
  const [over, setOver] = useState(false);
  const [time, setTime] = useState({
    hours: parseInt(props.hours),
    minutes: parseInt(props.minutes),
    seconds: parseInt(props.seconds)
  });

  function tick() {
    if (paused) {
      return;
    }

    if (time.hours == 0 && time.minutes == 0 && time.seconds == 0) {
      setOver(true);
    } else if (time.minutes == 0 && time.seconds == 0) {
      setTime({
        hours: time.hours - 1,
        minutes: 59,
        seconds: 59
      });
    } else if (time.seconds == 0) {
      setTime({
        hours: time.hours,
        minutes: time.minutes - 1,
        seconds: 59
      });
    } else {
      setTime({
        hours: time.hours,
        minutes: time.minutes,
        seconds: time.seconds - 1
      })
    }
  }

  function reset() {
    setTime({
      hours: parseInt(props.hours),
      minutes: parseInt(props.minutes),
      seconds: parseInt(props.seconds)
    });
    setPaused(false);
    setOver(false);
  }

  useEffect(() => {
    let timerID = setInterval(() => tick(), 1000);

    return () => clearInterval(timerID);
  });

  return (
    <div>
      <p>{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</p>
      <div>{over ? "Time's up!" : ''}</div>
      <button onClick={() => setPaused(!paused)}>{paused ? 'RESUME' : 'PAUSE'}</button>
      <button onClick={() => reset()}>RESTART</button>
    </div>
  );
}
```

```jsx
ReactDOM.render(
  <CountDown hours="1" minutes="45" seconds="0" />,
  document.getElementById('root')
);
```
