---
title: StarRating
tags: components,children,input,state,intermediate
---

Renders a star rating component.

- Define a component, called `Star` that will render each individual star with the appropriate appearance, based on the parent component's state.
- In the `StarRating` component, use the `useState()` hook to define the `rating` and `selection` state variables with the appropriate initial values.
- Create a method, `hoverOver`, that updates `selected` according to the provided `event`, using the .`data-star-id` attribute of the event's target or resets it to `0` if called with a `null` argument.
- Use `Array.from()` to create an array of `5` elements and `Array.prototype.map()` to create individual `<Star>` components.
- Handle the `onMouseOver` and `onMouseLeave` events of the wrapping element using `hoverOver` and the `onClick` event using `setRating`.

```css
.star {
  color: #ff9933;
  cursor: pointer;
}
```

```jsx
const Star = ({ marked, starId }) => {
  return (
    <span data-star-id={starId} className="star" role="button">
      {marked ? '\u2605' : '\u2606'}
    </span>
  );
};

const StarRating = ({ value }) => {
  const [rating, setRating] = React.useState(parseInt(value) || 0);
  const [selection, setSelection] = React.useState(0);

  const hoverOver = event => {
    let val = 0;
    if (event && event.target && event.target.getAttribute('data-star-id'))
      val = event.target.getAttribute('data-star-id');
    setSelection(val);
  };
  return (
    <div
      onMouseOut={() => hoverOver(null)}
      onClick={e => setRating(e.target.getAttribute('data-star-id') || rating)}
      onMouseOver={hoverOver}
    >
      {Array.from({ length: 5 }, (v, i) => (
        <Star
          starId={i + 1}
          key={`star_${i + 1}`}
          marked={selection ? selection >= i + 1 : rating >= i + 1}
        />
      ))}
    </div>
  );
};
```

```jsx
ReactDOM.render(<StarRating value={2} />, document.getElementById('root'));
```
