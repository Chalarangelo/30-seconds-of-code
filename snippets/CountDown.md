### CountDown

Renders a countdown timer that prints a message when it reaches zero.

- The timer starts automatically with the initial value passed through the `props`
- Each second, `tick()` is called. It updates the timer, decreasing the time by one second each time.
- If the `pause` button is clicked, `tick()` refrains from updating the time until the `resume` button is clicked.
- If the `restart` button is clicked, the timer starts over from step 1
- If the time hits zero, the message 'Time's up!' is printed

```jsx
class CountDown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      done: false,
      s: parseInt(this.props.seconds),
      m: parseInt(this.props.minutes),
      h: parseInt(this.props.hours)
    };

    this.tick = this.tick.bind(this);
    this.pause = this.pause.bind(this);
    this.reset = this.reset.bind(this);

    this.timerID = setInterval(this.tick, 1000);
  }

  tick() {
    if (this.state.paused) {
      return;
    }

    if (this.state.s === 0 && this.state.m === 0 && this.state.h === 0) {
      clearInterval(this.timerID);
      this.setState({
        done: true
      });
    } else if (this.state.m === 0 && this.state.s === 0) {
      this.setState(state => ({
        h: state.h - 1,
        m: 59,
        s: 59
      }));
    } else if (this.state.s === 0) {
      this.setState(state => ({
        m: state.m - 1,
        s: 59
      }));
    } else {
      this.setState(state => ({
        s: state.s - 1
      }))
    }
  }

  pause() {
    this.setState(state => ({
      paused: !state.paused
    }))
  }

  reset() {
    clearInterval(this.timerID);
    this.setState({
      paused: false,
      done: false,
      s: parseInt(this.props.seconds),
      m: parseInt(this.props.minutes),
      h: parseInt(this.props.hours)
    });
    this.timerID = setInterval(this.tick, 1000);
  }

  render() {
    return (
      <div>
        <h1>{this.state.h.toString().padStart(2, '0') + ':' + this.state.m.toString().padStart(2, '0') + ':' + this.state.s.toString().padStart(2, '0')}</h1>
        <button onClick={this.pause}>{this.state.paused ? 'RESUME' : 'PAUSE'}</button>
        <button onClick={this.reset}>RESTART</button>
        <h1>{this.state.done ? "Time's up!" : ''}</h1>
      </div>
    )
  }
}
```

```jsx
ReactDOM.render(
  <CountDown hours="1" minutes="45" seconds="0" />,
  document.getElementById('root')
);
```
