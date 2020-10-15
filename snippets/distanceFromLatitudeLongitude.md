---
title: distanceFromLatitudeLongitude
tags: math,latitude,longitude,intermediate
---

Code returns the Arial distance between two given latitudes and longitudes.

- Latitude and Longitude should be in degrees.

```js
const distanceFromLatitudeLongitude = (lat1,lon1,lat2,lon2) =>
  {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon2-lon1) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
  }
```

```js
const distance  = distanceFromLatitudeLongitude(24.5854,73.7125,26.9124,75.7873); // Should be in degrees
```
