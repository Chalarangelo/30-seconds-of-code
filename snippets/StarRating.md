### StarRating

Renders a star rating component.

Use and IIFE to define a functional component, called `Star` that will render each individual star with the appropriate appearance, based on the parent component's `state` and return the class component `StarRating`.
Use the value of the `rating` prop to determine if a valid rating is supplied and store it in `state.rating` (or `0` if invalid or not supplied).
Initialize `state.selection` to `0`.
Create two methods, `hoverOver` and `setRating`, that take an event as argument and update `state.selected` and `state.rating` according to it, bind them both to the component's context.
In the `render()` method, create a `<div>` to wrap the `<Star>` components, which are created using `Array.prototype.map` on an array of 5 elements, created using `Array.from`, and handle the `onMouseLeave` event to set `state.selection` to `0`, the `onClick` event to set
the `state.rating` and the `onMouseOver` event to set `state.selection` to the `star-id` attribute of the `event.target` respectively. 
Finally, pass the appropriate values to each `<Star>` component (`starId` and `marked`).

```jsx
const StarRating = (function() {
  function Star({ marked, starId }) {
    return (
      <span star-id={starId} style={{ color: '#ff9933' }} role='button'>
        {marked ? '\u2605' : '\u2606'}
      </span>
    );
  }

  return class StarRating extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        rating: typeof props.rating == 'number' ? props.rating : 0,
        selection: 0
      };
      this.hoverOver = this.hoverOver.bind(this);
      this.hoverOut = this.hoverOver.bind(this, null);
      this.handleClick = this.handleClick.bind(this);
    }
    hoverOver(event) {
      let val = 0;
      if (event && event.target && event.target.getAttribute('star-id'))
        val = event.target.getAttribute('star-id');
      this.setState(state => ({ selection: val }));
    }
    handleClick(event) {
      const val = event.target.getAttribute('star-id') || this.state.rating;
      this.setState(state => ({ rating: val }));
    }
    render() {
      return (
        <div
          onMouseOut={this.hoverOut}
          onClick={this.handleClick}
          onMouseOver={this.hoverOver}
        >
          {Array.from({ length: 5 }, (v, i) => (
            <Star
              starId={i+1}
              key={`star_${i+1} `}
              marked={
                this.state.selection
                  ? this.state.selection >= i+1
                  : this.state.rating >= i+1
              }
            />
          ))}
        </div>
      );
    }
  };
})();
```

```jsx
ReactDOM.render(<StarRating/>, document.getElementById('root'));
ReactDOM.render(<StarRating rating={2} />, document.getElementById('root'));
```

<!-- tags: visual,children,input,state,class -->

<!-- expertise: 2 -->
