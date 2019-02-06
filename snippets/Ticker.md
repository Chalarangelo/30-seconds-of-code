### Ticker

Renders a ticker component.

- The ticker state is initially set to zero 
- When the `Tick!` button is clicked, `timer` is incremented periodically at the given `interval`
- When the `Reset` button is clicked, the value of the timer is set to zero and the `setInterval` is cleared
- The `setInterval` is cleared once the desired `time` is reached
- `time` and `interval` are the required props

```jsx
class Ticker extends Component {
	constructor(props) {
		super(props);
		this.state = {ticker: 0}
		this.interval = null
	}

	tick = () => {
		this.reset()
		this.interval = setInterval(() => {
			if (this.state.ticker < this.props.times) {
				this.setState(({ ticker }) => ({ticker: ticker + 1}))
			}else{
				clearInterval(this.interval)
			}
		}, this.props.interval)
	}

	reset = () => {
		this.setState({ticker: 0})
		clearInterval(this.interval)
	}

	render() {
		return (
			<div>
				<span style={{fontSize: 100}}>{this.state.ticker}</span>       
				<button onClick={this.tick}>Tick!</button>
				<button onClick={this.reset}>Reset</button>
			</div>
		);
	}
}
```

```jsx
ReactDOM.render(<Ticker times={5} interval={1000} />, document.getElementById('root'));
```
