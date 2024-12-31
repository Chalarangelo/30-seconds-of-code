---
title: How can I calculate the distance between two coordinates using JavaScript?
shortTitle: Distance between two coordinates
language: javascript
tags: [math]
cover: angry-waves
excerpt: Given two pairs of latitude and longitude coordinates, you can calculate the distance between them using the Haversine formula. Let's find out how.
listed: true
dateModified: 2024-12-02
---

I've recently come across a problem where I needed to calculate the **distance between two sets of latitude and longitude coordinates**. This is a common task in many applications, such as mapping services, location-based services, and geocoding.

Luckily, the complicated math for it has already been done for us. We can simply use the [**Haversine formula**](https://en.wikipedia.org/wiki/Haversine_formula) to calculate the distance between two points on the Earth's surface given their latitude and longitude coordinates. Apart from the two points, we'll also need the **radius of the Earth** to calculate the distance, which is approximately 6,371 kilometers or 3,959 miles.

> [!NOTE]
>
> If you're unfamiliar with JavaScript's [numeric separators](/js/s/numeric-separator), used in the code below, they're just **syntactic sugar** to make large numeric values more readable.

For the formula to work, we'll first have to **convert our coordinates to radians**. This is a matter of simply using `Math.PI` and multiplying by the latitude and longitude values, then dividing by `180` (essentially the [`toRadians` code snippet](/js/s/convert-degrees-radians)). We'll also need to find the **differences in latitude and longitude between the two points**. Then, we can apply the Haversine formula to calculate the distance.

```js
const coordinateDistance = (lat1, lon1, lat2, lon2) => {
  // Convert degrees to radians
  const radLat1 = lat1 * Math.PI / 180;
  const radLon1 = lon1 * Math.PI / 180;
  const radLat2 = lat2 * Math.PI / 180;
  const radLon2 = lon2 * Math.PI / 180;

  // Radius of the Earth in meters
  const R = 6_371_000; // m

  // Differences in coordinates
  const dLat = radLat2 - radLat1;
  const dLon = radLon2 - radLon1;

  // Haversine formula
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance.toFixed(2); // Return distance rounded to 2 decimal places
};

// Sample usage:
const lat1 = 40.7128; // New York City
const lon1 = -74.0060;
const lat2 = 34.0522; // Los Angeles
const lon2 = -118.2437;

coordinateDistance(lat1, lon1, lat2, lon2); // 3935746.25 (meters)
```

The beauty of this formula is that we can tweak the `R` value to calculate the distance in **different units**. For example, if we set `R` to `6_371` (the Earth's radius in kilometers), the result will be in **kilometers**. If we set it to `3959` (the Earth's radius in miles), the result will be in **miles**. This makes it very versatile for different use cases.

If you want to take it a step further, you may also calculate the distance of two points on another planet or sphere by changing the `R` value accordingly. The Haversine formula is not limited to Earth's surface, but can be applied to any sphere. This makes it a powerful tool for a wide range of applications.
