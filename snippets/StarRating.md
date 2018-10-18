### StarRating

Renders a star rating component.

Use the value of the `rating` prop to determine if a valid rating is supplied and store it in `state.rating` (or `0` if invalid or not supplied).
Initialize `state.selection` to `0`.
Create two methods, `hoverOver` and `setRating`, that take a number as argument and update `state.selected` and `state.rating` according to it, bind them both to the component's context.
Define a functional component, called `Star` that will render each individual star with the appropriate appearance, based on the parent component's `state`, and handle its `onMouseEnter` event, using the parent component's `hoverOver` method.
In the `render()` method, create a `<div>` to wrap the `<Star>` components, which are created using `Array.prototype.map` on an array of 5 elements, created using `Array.from`, and handle the `onMouseLeave` event to set `state.selection` to `0` and the `onClick` event to set the `state.rendering` to the `star-id` attribute of the `event.target`. 
Finally, pass the appropriate values to each `<Star>` component (`starId`, `marked` and `onHover`).

```jsx
function Star({ marked, starId, onHover }) {
  return (
    <span
      star-id={starId}
      style={{ color: '#ff9933' }}
      onMouseEnter={() => onHover(starId)}
    >
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
}

class StarRating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rating: typeof props.rating == 'number' ? props.rating : 0,
      selection: 0
    };
    this.hoverOver = this.hoverOver.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  hoverOver(val) {
    this.setState(state => ({ selection: val }));
  }
  handleClick(event) {
    const val = event.target.getAttribute('star-id') || this.state.rating;
    this.setState(state => ({ rating: val }));
  }
  render() {
    return (
      <div onMouseOut={() => this.hoverOver(0)} onClick={this.handleClick}>
        {Array.from({ length: 5 }, (v, i) => i + 1).map(v => (
          <Star
            starId={v}
            key={`star_${ v } `}
            marked={
              this.state.selection
                ? this.state.selection >= v
                : this.state.rating >= v
            }
            onHover={this.hoverOver}
          />
        ))}
      </div>
    );
  }
}
```

```jsx
ReactDOM.render(<StarRating/>, document.getElementById('root'));
ReactDOM.render(<StarRating rating={2} />, document.getElementById('root'));
```

<!-- tags: visual,children,input,state,class -->

<!-- expertise: 2 -->
