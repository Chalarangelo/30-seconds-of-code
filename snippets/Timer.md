### Timer

Renders a timer component.

The timer state is initially set to zero. When the `Tick!` button is clicked, `timer` is incremented periodically at the given `interval`. The `setInterval` is cleared once the desired `time` is reached. `time` and `interval` are the required props.

```jsx
class Timer extends Component {
	constructor(props) {
		super(props);
		this.state = {timer: 0}
		this.interval = null
	}

	tick = () => {
		this.interval = setInterval(() => {
			if (this.state.timer < this.props.time) {
				this.setState({timer: this.state.timer + 1})
			}else{
				clearInterval(this.interval)
			}
		}, this.props.interval)
	}

	render() {
		return (
			<div>
				<span style={{fontSize: 100}}>{this.state.timer}</span>       
				<button onClick={this.tick}>Tick!</button>
				<button onClick={() => {
					this.setState({timer: 0})
					clearInterval(this.interval)
				}}>Reset</button>
			</div>
		);
	}

}
```

```jsx
ReactDOM.render(<Timer time={5} interval={1000} />, document.getElementById('root'));
```