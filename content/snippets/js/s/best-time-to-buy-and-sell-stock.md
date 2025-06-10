---
title: Best Time to Buy and Sell Stock JavaScript Solution
shortTitle: Best Time to Buy and Sell Stock
language: javascript
tags: [algorithm,math,array]
cover: workhard-laptop
excerpt: Have you tried solving "Best Time to Buy and Sell Stock" on LeetCode? Let's take a couple of approaches to tackle it in JavaScript.
listed: true
dateModified: 2025-08-28
---

As I was fooling around with LeetCode problems, I stumbled upon one that I found quite interesting. The problem in question is [Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/). The task is to find the **maximum profit you can achieve by buying and selling a stock on different days**, given an array of prices where the index represents the day.

@[Quick refresher](/js/s/max-subarray)

## Maximum subarray approach

Naturally, this felt very similar to the **maximum subarray** problem, which I've tackled in the past. In fact, one very simple solution involves using the code previously written for said problem with a couple of additional steps.

```js
const maxSubarray = arr => {
  let maxSum = -Infinity, sum = 0;
  let sMax = 0, eMax = arr.length - 1, s = 0;

  arr.forEach((n, i) => {
    sum += n;
    if (maxSum < sum) {
      maxSum = sum;
      sMax = s;
      eMax = i;
    }

    if (sum < 0) {
      sum = 0;
      s = i + 1;
    }
  });

  return arr.slice(sMax, eMax + 1);
};

const maxProfit = prices =>
  Math.max(
    maxSubarray(
      prices.slice(1).map((p, i) => p - prices[i])
    ).reduce((x, y) => x + y, 0),
    0
  );

maxProfit([7, 1, 5, 3, 6, 4]); // 5
```

First, we create a new array that represents the **profit or loss if we sell the stock on the next day**. Then, we apply the `maxSubarray` function to this new array to find the **maximum profit** we can achieve. Finally, we return the maximum profit found, ensuring that it is not negative by using `Math.max()` with `0`.

This implementation works just fine, but it's not the fastest solution. We can do better by using a single pass through the array.

## Single pass approach

Instead of creating a new array and using the maximum subarray approach, we can solve the problem in a **single pass** through the prices array. The idea is to **keep track of the minimum price seen so far** and calculate the profit at each step, determining if we should update our buy price or our maximum profit.

```js
const maxProfit = prices => {
  let buy = prices[0], profit = 0;

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < buy)
      buy = prices[i];
    else if (prices[i] - buy > profit)
      profit = prices[i] - buy;
  }

  return profit;
};

maxProfit([7, 1, 5, 3, 6, 4]); // 5
```

Starting with the first price as the initial buy price, we iterate through the prices array. If we find a price lower than our current buy price, we **update the buy price**. If the profit from selling at the current price exceeds our recorded profit, we **update the profit**. As these two conditions are **mutually exclusive**, we ensure that we always have the best buy price and the maximum profit at the end of the loop.

This solution is more efficient, as it only requires a single pass through the prices array. It also requires **no additional space** for a new array, making it more memory-efficient.

## Conclusion

A seemingly simple problem can often be solved in multiple ways, each with its own trade-offs. While there's nothing wrong with using familiar tools and building on top of previous solutions, it's always worth exploring more efficient approaches. In this case, the single pass solution not only improves performance but also simplifies the logic by avoiding unnecessary array manipulations.
