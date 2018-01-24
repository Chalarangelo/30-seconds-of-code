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
module.exports = elo