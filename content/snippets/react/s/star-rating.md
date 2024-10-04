---
title: Star rating component
language: react
tags: [components,children,input,state]
cover: lake-church
excerpt: Create your very own star rating component in React.
listed: true
dateModified: 2024-06-12
---

Star rating components are the de facto way of **rating items** on the web. They are simple to use and provide a visual representation of the rating. Yet, implementing them sounds tricky. However, with React, you can create a star rating component with ease.

First, you'll need to separate the **individual star component** from the parent component. The `Star` component will render each individual star with the appropriate appearance based on the parent component's state.

The `StarRating` component, in turn, will use the `useState()` hook to define the `rating` and `selection` state variables with the appropriate initial values. Then, you can define a method, `hoverOver`, that updates `selected` according to the provided `event`, using the `.data-star-id` attribute of the event's target or resets it to `0` if called with a `null` argument.

Finally, using `Array.from()` to create an array of `5` elements and `Array.prototype.map()`, you can create individual `<Star>` components and handle the `onMouseOver` and `onMouseLeave` events of the wrapping element using `hoverOver`. Handle the `onClick` event using `setRating`.

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <StarRating value={2} />
);
```
