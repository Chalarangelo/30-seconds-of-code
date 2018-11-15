### midpoint

Calculates the midpoint between two pairs of x and y points.

Takes in two pairs of (x,y) points, calculates the midpoint between the x's, the midpoint between the y's, and returns the coordinates in an array.

```js
const midpoint = (x1, y1, x2, y2) => {
  let points = new Array(2);
  let first_point = (x1 + x2) / 2;
  let second_point = (y1 + y2) / 2;

  points[0] = first_point;
  points[1] = second_point;
  return points;
};
```

```js
midpoint(2, 2, 4, 4); // [3, 3]
midpoint(4, 4, 6, 6); // [5, 5]
midpoint(1, 3, 2, 4); // [1.5, 3.5]
```

