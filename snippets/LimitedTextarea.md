### LimitedTextarea

Renders a textarea component with a character limit.

Use the value of the `value` prop to determine the initial `state.content` and `state.characterCount` and the value of the `limit` props to determine the value of `state.limit`.
Create a method, `handleChange`, which trims the `event.target.value` data if necessary and uses `Component.prototype.setState` to update `state.content` and `state.characterCount`, and bind it to the component's context.
In the`render()` method, use a`<div>` to wrap both the`<textarea>` and the `<p>` element that displays the character count and bind the `onChange` event of the `<textarea>` to the `handleChange` method.

```jsx
class LimitedTextarea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content: props.value,
      characterCount: props.value.length,
      limit: props.limit
    };
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(event) {
    let newContent = event.target.value;
    if(newContent.length >= this.state.limit) newContent = newContent.slice(0, this.state.limit);
    this.setState(state => ({ content: newContent, characterCount: newContent.length }));
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
        <p>{this.state.characterCount}/{this.props.limit}</p>
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(
  <LimitedTextarea limit={32} value='Hello!' />,
  document.getElementById('root')
);
```

< !--tags: input,state,class -- >

< !--expertise: 0 -- >

