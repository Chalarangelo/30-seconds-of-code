### LimitedWordTextArea

Renders a textarea component with a word limit.

Use the value of the `value` prop to determine the initial `state.content` and `state.wordCount` and the value of the `limit` props to determine the value of `state.limit`.
Create a method, `handleChange`, which trims the `event.target.value` data if necessary and uses `Component.prototype.setState` to update `state.content` and `state.wordCount`, and bind it to the component's context.
In the`render()` method, use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to the `handleChange` method.

```jsx
class LimitedWordTextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value,
      wordCount: props.value.split(' ').filter(Boolean).length,
      limit: props.limit
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let newContent = event.target.value;

    if (newContent.split(' ').filter(Boolean).length > this.state.limit) {
      newContent = newContent
        .split(' ')
        .splice(0, this.state.limit)
        .join(' ');
    }
    this.setState(state => ({
      content: newContent,
      wordCount: newContent.split(' ').filter(Boolean).length
    }));
  }
  render() {
    return (
      <div>
        <textarea
          rows={this.props.rows}
          cols={this.props.cols}
          onChange={this.handleChange}
          value={this.state.content}
        >
        </textarea>
        <p>{this.state.wordCount} / {this.props.limit}</p>
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(
  <LimitedWordTextArea limit={5} value='Hello there!' />,
  document.getElementById('root')
);
```

< !--tags: input,state,class -- >

< !--expertise: 0 -- >

