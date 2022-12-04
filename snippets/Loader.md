---
title: Spinning loader
tags: components
cover: blog_images/godray-computer-mug.jpg
firstSeen: 2019-09-11T21:59:12+03:00
lastUpdated: 2020-11-16T15:17:26+02:00
---

Renders a spinning loader component.

- Render an SVG, whose `height` and `width` are determined by the `size` prop.
- Use CSS to animate the SVG, creating a spinning animation.

```css
.loader {
  animation: rotate 2s linear infinite;
}

@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}

.loader circle {
  animation: dash 1.5s ease-in-out infinite;
}

@keyframes dash {
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
}
```

```jsx
const Loader = ({ size }) => {
  return (
    <svg
      className="loader"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  );
};
```

```jsx
ReactDOM.render(<Loader size={24} />, document.getElementById('root'));
```
