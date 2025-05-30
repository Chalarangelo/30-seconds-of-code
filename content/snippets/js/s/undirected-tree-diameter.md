---
title: How can I find the diameter of an undirected tree in JavaScript?
shortTitle: Undirected tree diameter
language: javascript
tags: [algorithm,array]
cover: laptop-off-2
excerpt: Using a two-pass DFS approach, we can efficiently find the diameter of an undirected tree in JavaScript.
listed: true
dateModified: 2025-07-31
---

Given the previous articles on [how to build an undirected tree from edges](/js/s/undirected-tree-from-edges) and [how to traverse it using DFS or BFS](/js/s/undirected-tree-dfs-bfs), we continue our exploration of undirected trees in JavaScript. This time, we will focus on how to find the **diameter** of an undirected tree using a two-pass DFS approach.

@[Quick refresher](/js/s/undirected-tree-from-edges)

## Diameter of an undirected tree

The diameter of an undirected tree is defined as the **longest path between any two nodes** in the tree. In other words, it's the **maximum number of edges** that need to be traversed to go from one node to another in the tree. Let's look at an example to visualize this:

![Undirected Tree Diameter visualization](./illustrations/undirected-tree-diameter.svg)
This tree would correspond to the following edges array and `Map` representation:

```js
const edges = [ [0, 1], [0, 2], [2, 3], [2, 4] ];

const graphMap = new Map([
  [0, [1, 2]],
  [1, [0]],
  [2, [0, 3, 4]],
  [3, [2]],
  [4, [2]]
]);
```

Note that the diameter of this tree is the path from node `0` to node `4`, which has a length of `3`, but it could also be the path from node `0` to node `3`, which also has a length of `3`.

## Implementation

To find the diameter of an undirected tree, we can use a **two-pass DFS approach**. The first pass will find the **farthest node from an arbitrary starting node**, and the second pass will find the **farthest node from that node**, which will give us the diameter.

@[Quick refresher](/js/s/undirected-tree-dfs-bfs#depth-first-search-dfs)

To do so, we'll **keep track of the maximum distance** and the corresponding node during our DFS traversal. We'll also push the **distance of the current node** incremented by `1` alongside the node itself onto a stack, allowing us to explore the tree iteratively.

```js {4,7,11-14,18}
const dfsDistance = (graph, startDistance = -1, startNode = 0) => {
  const stack = [[startNode, 0]];
  const visited = new Set();
  let [maxDistance, maxNode] = [startDistance, startNode];

  while (stack.length) {
    const [node, distance] = stack.pop();
    if (visited.has(node)) continue;

    visited.add(node);
    if (maxDistance < distance) {
      maxDistance = distance;
      maxNode = node;
    }

    const neighbors = graph.get(node) || [];
    for (let neighbor of neighbors)
      if (!visited.has(neighbor)) stack.push([neighbor, distance + 1]);
  }

  return [maxDistance, maxNode];
};

const dfsDiameter = graph => {
  // First pass to find the farthest node from an arbitrary starting node (0)
  const [maxDistance, farthestNode] = dfsDistance(graph, -1, 0);

  // Second pass to find the diameter from the farthest node found
  const [diameter] = dfsDistance(graph, maxDistance, farthestNode);

  return diameter;
};

dfsDiameter(graphMap); // 3
```

As you can see, with a few small tweaks to our DFS implementation, we can efficiently find the diameter of an undirected tree. The **first pass** finds the farthest node from the starting node, using the distance to track how far we are from the starting point.

We then use this distance and the farthest node to perform a **second pass**, which gives us the diameter of the tree. The final result is the length of the longest path between any two nodes in the undirected tree.

## Conclusion

Expanding upon our DFS implementation, we can easily calculate the diameter of an undirected tree in JavaScript. This two-pass DFS approach is efficient and straightforward, allowing us to find the longest path in the tree with minimal complexity. I hope it will help you in your coding adventures! 🏖️
