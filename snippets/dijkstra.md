---
title: Dijkstra's algorithm
tags: algorithm, path-finding, graph, intermediate
firstSeen: 2021-08-22T15:03:21+09:00
---

Finds the shortest pathes from a node to other nodes in the given graph.

- Can only be used when the graph only contains positive weights.
- Define two arrays containing all the nodes' distances & whether they are visited from the initial node.
- Set the initial node's distance to 0 and its visit to itself to 'true'.
- Set the initial node's neighbour nodes' distances.
- For every node in the graph:
  - Find the node currently with the shortest distance among the non-visited nodes.
  - Set the selected node's visit to 'true'.
  - For every node that are the selected node's neighbour:
    - Update the neighbour nodes' distances if the path from the selected node gives better path weight.
- Return the distances array, if a node is not reachable from the initial node, then return -1.

```js
const get_smallest_node = (distances, visited) => {
  let min_val = Number.MAX_VALUE,
    idx = 0;
  for (let i = 1; i < distances.length; ++i) {
    if (distances[i] < min_val && !visited[i]) {
      (idx = i), (min_val = distances[i]);
    }
  }
  return idx;
};

const dijkstra = (start, graph) => {
  let distances = new Array(graph.length).fill(Number.MAX_VALUE);
  let visited = new Array(graph.length).fill(false);
  (distances[start] = 0), (visited[start] = true);
  for (let i = 0; i < graph[start].length; ++i) {
    let dest = graph[start][i];
    distances[dest["node"]] = dest["weight"];
  }
  for (let i = 1; i < graph.length; ++i) {
    let cur = get_smallest_node(distances, visited);
    visited[cur] = true;
    for (let j = 0; j < graph[cur].length; ++j) {
      let dest = graph[cur][j],
        cost = distances[cur] + dest["weight"];
      distances[dest["node"]] = Math.min(distances[dest["node"]], cost);
    }
  }
  return distances.slice(1).map((x) => (x == Number.MAX_VALUE ? -1 : x));
};
```

```js
let start = 1,
  graph = [
    [],
    [
      { node: 2, weight: 2 },
      { node: 3, weight: 5 },
      { node: 4, weight: 1 },
    ],
    [
      { node: 3, weight: 3 },
      { node: 4, weight: 2 },
    ],
    [
      { node: 2, weight: 3 },
      { node: 6, weight: 5 },
    ],
    [
      { node: 3, weight: 3 },
      { node: 5, weight: 1 },
    ],
    [
      { node: 3, weight: 1 },
      { node: 6, weight: 2 },
    ],
    [],
  ];

dijkstra(start, graph); // [ 0, 2, 3, 1, 2, 4 ]
```
