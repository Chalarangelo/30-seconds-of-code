### elo

Computes the new ratings between two opponents using the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system). It takes an array
of two pre-ratings and returns an array containing two post-ratings.
The winner's rating is the first element of the array.

Use the exponent `**` operator and math operators to compute the expected score (chance of winning)
of each opponent and compute the new rating for each. Omit the second argument to use the default
K-factor of 32, or supply a custom K-factor value.

```js
const elo = ([a, b], kFactor = 32) => {
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) => rating + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  return [newRating(a, 1), newRating(b, 0)];
};
```

```js
elo([1200, 1200]); // [1216, 1184]
elo([1200, 1200], 64); // [1232, 1168]
```
