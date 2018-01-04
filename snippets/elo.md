### elo

Computes the new ratings between two or more opponents using the [Elo rating system](https://en.wikipedia.org/wiki/Elo_rating_system). It takes an array
of pre-ratings and returns an array containing post-ratings.
The array should be ordered from best performer to worst performer (winner -> loser).

Use the exponent `**` operator and math operators to compute the expected score (chance of winning)
of each opponent and compute the new rating for each. Loop through the ratings, using each permutation to compute the post-Elo rating for each player in a pairwise fashion. Omit the second argument to use the default K-factor of 32, or supply a custom K-factor value. For details on the third argument, see the last example.

```js
const elo = ([...ratings], kFactor = 32, selfRating) => {
  const [a, b] = ratings;
  const expectedScore = (self, opponent) => 1 / (1 + 10 ** ((opponent - self) / 400));
  const newRating = (rating, i) =>
    (selfRating || rating) + kFactor * (i - expectedScore(i ? a : b, i ? b : a));
  if (ratings.length === 2) {
    return [newRating(a, 1), newRating(b, 0)];
  } else {
    for (let i = 0; i < ratings.length; i++) {
      let j = i;
      while (j < ratings.length - 1) {
        [ratings[i], ratings[j + 1]] = elo([ratings[i], ratings[j + 1]], kFactor);
        j++;
      }
    }
  }
  return ratings;
};
```

```js
// Standard 1v1s
elo([1200, 1200]); // [1216, 1184]
elo([1000, 2000]); // [1031.8991261061358, 1968.1008738938642]
elo([1500, 1000]); // [1501.7036868864648, 998.2963131135352]
elo([1200, 1200], 64); // [1232, 1168]

// 4 player FFA, all same rank
elo([1200, 1200, 1200, 1200]).map(Math.round); // [1246, 1215, 1185, 1154]

// For teams, each rating can adjusted based on own team's average rating vs. 
// average rating of opposing team, with the score being added to their
// own individual rating

// 2v2 teams
// Ratings: [1324, 1275] and [1300, 1318]
// Calculate the average ratings of each team and use that as
// the basis of the "expected score" calculation. Supply the individual
// rating as the third argument to compute own Elo rating.
const ratings = [1324, 1275, 1300, 1318];
const averages = [(1324 + 1275) / 2, (1300 + 1318) / 2];
const results = ratings
  .map(
    (rating, index) =>
      elo(
        [index > 1 ? averages[0] : averages[1], index > 1 ? averages[0] : averages[1]],
        32,
        rating
      )[index > 1 ? 1 : 0]
  )
  .map(Math.round); // [1340, 1291, 1284, 1302]

// Individual rank in the match out of each player is also possible to take into account
// Try out 50/50 balance between win/loss and individual performance
```
