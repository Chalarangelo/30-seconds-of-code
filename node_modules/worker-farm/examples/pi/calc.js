'use strict'

/* A simple π estimation function using a Monte Carlo method
 * For 0 to `points`, take 2 random numbers < 1, square and add them to
 * find the area under that point in a 1x1 square. If that area is <= 1
 * then it's *within* a quarter-circle, otherwise it's outside.
 * Take the number of points <= 1 and multiply it by 4 and you have an
 * estimate!
 * Do this across multiple processes and average the results to
 * increase accuracy.
 */

module.exports = function (points, callback) {
  let inside = 0
    , i = points

  while (i--)
    if (Math.pow(Math.random(), 2) + Math.pow(Math.random(), 2) <= 1)
      inside++

  callback(null, (inside / points) * 4)
}
