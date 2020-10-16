---
title: DistanceBetweenCoordinates
tags: math,intermediate
---

- The snippet is used to find the distance between given two coordinates
- function takes two argument (latitude , longitude).
- If points are same return 0 else calculate the distace between them.
- toRad() is a utility function to conver degree to radians

```js
const arialDistance = (x1,y1,x2,y2) =>{
  if ((x1===x2) && (y1===y2)){
    return 0
    }

  else{
    var Radius = 6371.0
    var longitude_1 = this.toRad(y1)
    var latitude_1 = this.toRad(x1)
    var longitude_2 = this.toRad(y1)
    var latitude_2 = this.toRad(x2)

    var dist_longitude = longitude_2 - longitude_1
    var dist_latitude = latitude_2 - latitude_1

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var arial_distance = R * c
    
    return arial_distance
  }
}
toRad = (Value) => {
        return Value * Math.PI / 180;
}
```

```js
arialDistance(20.563 , 21.909 , 20.5937 , 78.9629); // '5902 in km '
```
