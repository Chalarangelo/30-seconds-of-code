---
title: Create a unit converter data structure in JavaScript
shortTitle: Convert between any compatible units
language: javascript
tags: [math,function]
cover: tropical-waterfall-2
excerpt: Learn how to create a unit converter data structure in JavaScript that can convert between any compatible units.
listed: true
dateModified: 2023-11-08
---

## Class-based unit converter data structure

In its simplest form, any unit-based value is a **numeric value with a unit of measurement** attached to it. Converting from one unit to another is rather simple, so long as the **units are compatible** and you know the **conversion factor** between them.

Applying this logic, we can create a simple data structure class for converting between units of distance. The data structure will store the value internally as centimeters, and will provide methods for converting from and to other units.

In order to avoid adding each conversion manually, we can easily use `Object.defineProperty()` to create a **getter for each unit**, which will calculate the value in the specified unit. Similarly, we can also create a **static method for each unit** that will create a new instance of the data structure with the value converted to the internally stored unit.

```js
class Distance {
  static conversions = {
    inches: 2.54,
    feet: 30.48,
    yards: 91.44,
    miles: 160934.4,
    centimeters: 1,
    meters: 100,
    kilometers: 100000,
  };

  constructor(cm) {
    this.cm = cm;
  }
}

Object.entries(Distance.conversions).forEach(([unit, conversion]) => {
  Object.defineProperty(
    Distance,
    `from${unit.charAt(0).toUpperCase() + unit.slice(1)}`,
    {
      get: function () {
        return value => new Distance(value * conversion);
      },
    }
  );

  Object.defineProperty(Distance.prototype, unit, {
    get: function () {
      return this.cm / conversion;
    },
  });
});

const distance = Distance.fromMeters(10);

distance.feet; // 32.808398950131235
distance.centimeters; // 1000
```

## Unit converter data structure factory function

While this works perfectly fine for a specific type of measurement, we have to repeat the whole process for a different type of measurement. This is not ideal, as we can end up with a lot of **code duplication**.

Luckily, JavaScript uses [prototypal inheritance](/js/s/classical-vs-prototypal-inheritance), meaning we can use a **function** in place of a class and apply the same sort of logic to create a generic unit converter data structure. This will allow us to create a single factory function that can be used to create a unit converter for any type of measurement.

```js
const createUnitConverter = unitCoversions => {
  // Create function that will act as the data structure
  const UnitConverter = function (unit) {
    this.unit = unit;
  };

  // Add static methods
  Object.entries(unitCoversions).forEach(([unit, conversion]) => {
    Object.defineProperty(
      UnitConverter,
      `from${unit.charAt(0).toUpperCase() + unit.slice(1)}`,
      {
        get: function () {
          return value => new UnitConverter(value * conversion);
        },
      }
    );

    // Add instance methods
    Object.defineProperty(UnitConverter.prototype, unit, {
      get: function () {
        return this.unit / conversion;
      },
    });
  });

  return UnitConverter;
};

const Data = createUnitConverter({
  bits: 1,
  bytes: 8,
  kilobits: 1000,
  kilobytes: 8000,
  megabits: 1000000,
  megabytes: 8000000,
  gigabits: 1000000000,
  gigabytes: 8000000000,
  terabits: 1000000000000,
  terabytes: 8000000000000,
  petabits: 1000000000000000,
  petabytes: 8000000000000000,
});

const data = Data.fromBytes(2000);

data.kilobytes; // 2
data.bits; // 16000
```

While this works for **simple formulas**, something like [temperature conversion](/js/s/convert-celsius-fahrenheit) is a bit more complex. I'll not go into further detail here, but I'm sure you can easily figure out the necessary tweaks to allow for **functions instead of simple conversion factors**.
