---
title: JavaScript Data Structures - Graph
shortTitle: Graph
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: purple-flower-macro-1
excerpt: A graph is a data structure consisting of a set of vertices connected by a set of edges.
firstSeen: 2021-08-17T05:00:00-04:00
---

### Definition

A graph is a data structure consisting of a set of nodes or vertices and a set of edges that represent connections between those nodes. Graphs can be directed or undirected, while their edges can be assigned numeric weights.

![JavaScript Graph visualization](./blog_images/ds-graph.png)

Each node in a graph data structure must have the following properties:

- `key`: The key of the node
- `value`: The value of the node

Each edge in a graph data structure must have the following properties:

- `a`: The starting node of the edge
- `b`: The target node of the edge
- `weight`: An optional numeric weight value for the edge

The main operations of a graph data structure are:

- `addNode`: Inserts a new node with the specific key and value
- `addEdge`: Inserts a new edge between two given nodes, optionally setting its weight
- `removeNode`: Removes the node with the specified key
- `removeEdge`: Removes the edge between two given nodes
- `findNode`: Retrieves the node with the given key
- `hasEdge`: Checks if the graph has an edge between two given nodes
- `setEdgeWeight`: Sets the weight of a given edge
- `getEdgeWeight`: Gets the weight of a given edge
- `adjacent`: Finds all nodes for which an edge exists from a given node
- `indegree`: Calculates the total number of edges to a given node
- `outdegree`: Calculates the total number of edges from a given node

### Implementation

```js
class Graph {
  constructor(directed = true) {
    this.directed = directed;
    this.nodes = [];
    this.edges = new Map();
  }

  addNode(key, value = key) {
    this.nodes.push({ key, value });
  }

  addEdge(a, b, weight) {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed)
      this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  removeNode(key) {
    this.nodes = this.nodes.filter(n => n.key !== key);
    [...this.edges.values()].forEach(({ a, b }) => {
      if (a === key || b === key) this.edges.delete(JSON.stringify([a, b]));
    });
  }

  removeEdge(a, b) {
    this.edges.delete(JSON.stringify([a, b]));
    if (!this.directed) this.edges.delete(JSON.stringify([b, a]));
  }

  findNode(key) {
    return this.nodes.find(x => x.key === key);
  }

  hasEdge(a, b) {
    return this.edges.has(JSON.stringify([a, b]));
  }

  setEdgeWeight(a, b, weight) {
    this.edges.set(JSON.stringify([a, b]), { a, b, weight });
    if (!this.directed)
      this.edges.set(JSON.stringify([b, a]), { a: b, b: a, weight });
  }

  getEdgeWeight(a, b) {
    return this.edges.get(JSON.stringify([a, b])).weight;
  }

  adjacent(key) {
    return [...this.edges.values()].reduce((acc, { a, b }) => {
      if (a === key) acc.push(b);
      return acc;
    }, []);
  }

  indegree(key) {
    return [...this.edges.values()].reduce((acc, { a, b }) => {
      if (b === key) acc++;
      return acc;
    }, 0);
  }

  outdegree(key) {
    return [...this.edges.values()].reduce((acc, { a, b }) => {
      if (a === key) acc++;
      return acc;
    }, 0);
  }
}
```

- Create a `class` with a `constructor` that initializes an empty array, `nodes`, and a `Map`, `edges`, for each instance. The optional argument, `directed`, specifies if the graph is directed or not.

- Define an `addNode()` method, which uses `Array.prototype.push()` to add a new node in the `nodes` array.
- Define an `addEdge()` method, which uses `Map.prototype.set()` to add a new edge to the `edges` Map, using `JSON.stringify()` to produce a unique key.
- Define a `removeNode()` method, which uses `Array.prototype.filter()` and `Map.prototype.delete()` to remove the given node and any edges connected to it.
- Define a `removeEdge()` method, which uses `Map.prototype.delete()` to remove the given edge.
- Define a `findNode()` method, which uses `Array.prototype.find()` to return the given node, if any.
- Define a `hasEdge()` method, which uses `Map.prototype.has()` and `JSON.stringify()` to check if the given edge exists in the `edges` Map.
- Define a `setEdgeWeight()` method, which uses `Map.prototype.set()` to set the weight of the appropriate edge, whose key is produced by `JSON.stringify()`.
- Define a `getEdgeWeight()` method, which uses `Map.prototype.get()` to get the eight of the appropriate edge, whose key is produced by `JSON.stringify()`.
- Define an `adjacent()` method, which uses `Map.prototype.values()`, `Array.prototype.reduce()` and `Array.prototype.push()` to find all nodes connected to the given node.
- Define an `indegree()` method, which uses `Map.prototype.values()` and `Array.prototype.reduce()` to count the number of edges to the given node.
- Define an `outdegree()` method, which uses `Map.prototype.values()` and `Array.prototype.reduce()` to count the number of edges from the given node.

```js
const g = new Graph();

g.addNode('a');
g.addNode('b');
g.addNode('c');
g.addNode('d');

g.addEdge('a', 'c');
g.addEdge('b', 'c');
g.addEdge('c', 'b');
g.addEdge('d', 'a');

g.nodes.map(x => x.value);  // ['a', 'b', 'c', 'd']
[...g.edges.values()].map(({ a, b }) => `${a} => ${b}`);
// ['a => c', 'b => c', 'c => b', 'd => a']

g.adjacent('c');            // ['b']

g.indegree('c');            // 2
g.outdegree('c');           // 1

g.hasEdge('d', 'a');        // true
g.hasEdge('a', 'd');        // false

g.removeEdge('c', 'b');

[...g.edges.values()].map(({ a, b }) => `${a} => ${b}`);
// ['a => c', 'b => c', 'd => a']

g.removeNode('c');

g.nodes.map(x => x.value);  // ['a', 'b', 'd']
[...g.edges.values()].map(({ a, b }) => `${a} => ${b}`);
// ['d => a']

g.setEdgeWeight('d', 'a', 5);
g.getEdgeWeight('d', 'a');  // 5
```
