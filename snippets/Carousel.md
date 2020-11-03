---
title: Carousel
tags: components,children,state,effect,advanced
---

Renders a carousel component.

- Use the `useState()` hook to create the `active` state variable and give it a value of `0` (index of the first item).
- Use the `useEffect()` hook to update the value of `active` to the index of the next item, using `setTimeout`.
- Compute the `className` for each carousel item while mapping over them and applying it accordingly.
- Render the carousel items using `React.cloneElement()` and pass down `...rest` along with the computed `className`.

```css
.carousel {
  position: relative;
}

.carousel-item {
  position: absolute;
  visibility: hidden;
}

.carousel-item.visible {
  visibility: visible;
}
```

```jsx
const Carousel = ({ carouselItems, ...rest }) => {
  const [active, setActive] = React.useState(0);
  let scrollInterval = null;

  React.useEffect(() => {
    scrollInterval = setTimeout(() => {
      setActive((active + 1) % carouselItems.length);
    }, 2000);
    return () => clearTimeout(scrollInterval);
  });

  return (
    <div className="carousel">
      {carouselItems.map((item, index) => {
        const activeClass = active === index ? ' visible' : '';
        return React.cloneElement(item, {
          ...rest,
          className: `carousel-item${activeClass}`
        });
      })}
    </div>
  );
};
```

```jsx
ReactDOM.render(
  <Carousel
    carouselItems={[
      <div>carousel item 1</div>,
      <div>carousel item 2</div>,
      <div>carousel item 3</div>
    ]}
  />,
  document.getElementById('root')
);
```
