---
title: 2D Transforms
tags: math,intermediate
---

This snippet helps you integrate various 2D transformations, i.e. translation, scaling and rotation, into you graphics project.

- It uses graphical mathematics to do transformations.
- Useful for animation and gaming projects.

Pass a point P(x,y) to any function and get transformed coordinates.

### Translation

Function: _**translateX**_

```js
const translateX = (x, tx) => (x + tx);
```

```js
let x = 10;
x = translateX(x, 10); // 20
```

Function: _**translateY**_

```js
const translateY = (y, ty) => (x + ty);
```

```js
let y = 10;
y = translateY(y, 10); // 20
```

Function: _**translate**_

```js
const translate = ([x, y], [tx, ty]) => [(x + tx), (y + ty)];
```

```js
let x = 10;
let y = 20;
[x, y] = translate([x, y], [5, 5]); // [15, 25]
```

### Scaling

Function: _**scaleX**_

```js
const scaleX = (x, sx) => (x * sx);
```

```js
let x = 10;
x = scaleX(x, 2); // 20
```

Function: _**scaleY**_

```js
const scaleY = (y, sy) => (x * sy);
```

```js
let y = 10;
y = scaleY(y, 3); // 30
```

Function: _**scale**_

```js
const scale = ([x, y], [sx, sy]) => [(x * sx), (y * sy)];
```

```js
let x = 10;
let y = 20;
[x, y] = scale([x, y], [5, 5]); // [50, 100]
```

### Rotation

Function: _**rotate**_

```js
const rotate = ([x, y], r) => {
  // convert deg to rad
  r *= Math.PI / 180;

  let s = Math.sin(r);
  let c = Math.cos(r);

  let nx = (x * c - y * s).toFixed(3);
  let ny = (y * c + x * s).toFixed(3);

  return [nx, ny];
};
```

```js
let x = 0;
let y = 20;
[x, y] = rotate([x, y], 90); // [-20, 0]
```
