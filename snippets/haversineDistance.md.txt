---
title: Haversine Distance
tags: math,algorithm,advanced
firstSeen: 2021-09-17T19:22:08+00:00
---

Calculate the great-circle distance between two points using the Haversine formula. It is the shortest distance between two points on the surface of a sphere, measured along the surface of the sphere.

- The function takes source and destination latitude and longitude as inputs
- R is earth’s radius (mean radius = 6,371km)
- Math.PI property represents the ratio of the circumference of a circle to its diameter, approximately 3.14159
- Using Math.sin and Math.cos to calculate a, a is the square of half the chord length between the points
- Using Math.atan2 and Math.sqrt to calculate c, c is the angular distance in radians

```js
const haversineDistance = (lat1, lon1, lat2, lon2) =>
{
  const radius = 6371e3; // metres
  const radian1 = lat1 * Math.PI/180;
  const radian2 = lat2 * Math.PI/180;
  const dLatitude = (lat2-lat1) * Math.PI/180;
  const dLongitude = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(dLatitude/2) * Math.sin(dLatitude/2) + Math.cos(radian1) * Math.cos(radian2) * Math.sin(dLongitude/2) * Math.sin(dLongitude/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  const distance = radius * c; // in metres
}
```

```js
haversineDistance(19.2178295, 72.8672463, 19.1023974, 72.8518488); // '12936.952102163763'
```