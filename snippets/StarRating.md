---
title: Star rating
tags: components,children,input,state
cover: blog_images/lake-church.jpg
firstSeen: 2018-10-18T14:33:45+03:00
lastUpdated: 2021-10-13T19:29:39+02:00
---

Renders a star rating component.

- Define a `Star` component. It renders each individual star with the appropriate appearance, based on the parent component's state.
- Define a `StarRating` component. Use the `useState()` hook to define the `rating` and `selection` state variables with the appropriate initial values.
- Create a method, `hoverOver`, that updates `selected` according to the provided `event`, using the .`data-star-id` attribute of the event's target or resets it to `0` if called with a `null` argument.
- Use `Array.from()` to create an array of `5` elements and `Array.prototype.map()` to create individual `<Star>` components.
- Handle the `onMouseOver` and `onMouseLeave` events of the wrapping element using `hoverOver`. Handle the `onClick` event using `setRating`.

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
