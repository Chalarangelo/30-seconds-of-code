---
title: coordinateDistanceKm
tags: math,beginner
---

Calculate the distance between two points on Earth given latitude and longitude values in degrees.

- Convert latitude and longitude values from decimal degrees to radians.
- Apply Haversine formula, which determines the great-circle distance between two points on a sphere.

```js
const degreesToRads = (deg) => (deg * Math.PI) / 180.0;

const coordinateDistanceKm = (lat1, lng1, lat2, lng2) => {
  const earthRadiusKm = 6371;

  lat1 = degreesToRads(lat1);
  lng1 = degreesToRads(lng1);
  lat2 = degreesToRads(lat2);
  lng2 = degreesToRads(lng2);

  const dlng = lng2 - lng1;
  const dlat = lat2 - lat1;
  const a = Math.pow(Math.sin(dlat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlng / 2), 2);
  const c = 2 * Math.asin(Math.sqrt(a));

  return c * earthRadiusKm;
};
```

```js
coordinateDistanceKm(0, 0, 0, 0); // 0
coordinateDistanceKm(40.7128, -74.006, 39.9526, -75.1652); // 129.61 - New York to Philadelphia
coordinateDistanceKm(37.7749, -122.4194, 34.0522, -118.2437); // 559.12 - San Francisco to Los Angeles
```
