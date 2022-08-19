---
title: JavaScript Data Structures - Binary Search Tree
shortTitle: Binary Search Tree
type: story
tags: javascript,object,class,array
expertise: advanced
author: chalarangelo
cover: blog_images/purple-flower-macro-4.jpg
excerpt: A binary search tree is a data structure consisting of a set of ordered linked nodes representing a hierarchical tree structure, in which each node can have at most two children.
firstSeen: 2021-08-31T05:00:00-04:00
---

### Definition

A binary search tree is a data structure consisting of a set of ordered linked nodes that represent a hierarchical tree structure. Each node is linked to others via parent-children relationship. Any given node can have at most two children (left and right). The first node in the binary search tree is the root, whereas nodes without any children are the leaves. The binary search tree is organized in such a way that for any given node, all nodes in its left subtree have a key less than itself and all nodes in its right subtree have a key greater than itself.

![JavaScript Binary Search Tree visualization](./blog_images/ds-binary-search-tree.png)

Each node in a binary search tree data structure must have the following properties:

- `key`: The key of the node
- `value`: The value of the node
- `parent`: The parent of the node (`null` if there is none)
- `left`: A pointer to the node's left child (`null` if there is none)
- `right`: A pointer to the node's right child (`null` if there is none)

The main operations of a binary search tree data structure are:

- `insert`: Inserts a node as a child of the given parent node
- `remove`: Removes a node and its children from the binary search tree
- `has`: Checks if a given node exists
- `find`: Retrieves a given node
- `preOrderTraversal`: Traverses the binary search tree by recursively traversing each node followed by its children
- `postOrderTraversal`: Traverses the binary search tree by recursively traversing each node's children followed by the node
- `inOrderTraversal`: Traverses the binary search tree by recursively traversing each node's left child, followed by the node, followed by its right child

### Implementation

```js
class BinarySearchTreeNode {
  constructor(key, value = key, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  get isLeaf() {
    return this.left === null && this.right === null;
  }

  get hasChildren() {
    return !this.isLeaf;
  }
}

class BinarySearchTree {
  constructor(key, value = key) {
    this.root = new BinarySearchTreeNode(key, value);
  }

  *inOrderTraversal(node = this.root) {
    if (node.left) yield* this.inOrderTraversal(node.left);
    yield node;
    if (node.right) yield* this.inOrderTraversal(node.right);
  }

  *postOrderTraversal(node = this.root) {
    if (node.left) yield* this.postOrderTraversal(node.left);
    if (node.right) yield* this.postOrderTraversal(node.right);
    yield node;
  }

  *preOrderTraversal(node = this.root) {
    yield node;
    if (node.left) yield* this.preOrderTraversal(node.left);
    if (node.right) yield* this.preOrderTraversal(node.right);
  }

  insert(key, value = key) {
    let node = this.root;
    while (true) {
      if (node.key === key) return false;
      if (node.key > key) {
        if (node.left !== null) node = node.left;
        else {
          node.left = new BinarySearchTreeNode(key, value, node);
          return true;
        }
      } else if (node.key < key) {
        if (node.right !== null) node = node.right;
        else {
          node.right = new BinarySearchTreeNode(key, value, node);
          return true;
        }
      }
    }
  }

  has(key) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === key) return true;
    }
    return false;
  }

  find(key) {
    for (let node of this.postOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }

  remove(key) {
    const node = this.find(key);
    if (!node) return false;
    const isRoot = node.parent === null;
    const isLeftChild = !isRoot ? node.parent.left === node : false;
    const hasBothChildren = node.left !== null && node.right !== null;

    if (node.isLeaf) {
      if (!isRoot) {
        if (isLeftChild) node.parent.left = null;
        else node.parent.right = null;
      } else {
        this.root = null;
      }
      return true;
    } else if (!hasBothChildren) {
      const child = node.left !== null ? node.left : node.right;
      if (!isRoot) {
        if (isLeftChild) node.parent.left = child;
        else node.parent.right = child;
      } else {
        this.root = child;
      }
      child.parent = node.parent;
      return true;
    } else {
      const rightmostLeft = [...this.inOrderTraversal(node.left)].slice(-1)[0];
      rightmostLeft.parent = node.parent;
      if (!isRoot) {
        if (isLeftChild) node.parent.left = rightmostLeft;
        else node.parent.right = rightmostLeft;
      } else {
        this.root = rightmostLeft;
      }
      rightmostLeft.right = node.right;
      node.right.parent = rightmostLeft;
      return true;
    }
  }
}
```

- Create a `class` for the `BinarySearchTreeNode` with a `constructor` that initializes the appropriate `key`, `value`, `parent`, `left` and `right` properties.
- Define an `isLeaf` getter, that uses `Array.prototype.length` to check if both `left` and `right` are empty.
- Define a `hasChildren` getter, that is the reverse of the `isLeaf` getter.
- Create a `class` for the `BinarySearchTree` with a `constructor` that initializes the `root` of the binary search tree.
- Define a `preOrderTraversal()` generator method that traverses the binary search tree in pre-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define a `postOrderTraversal()` generator method that traverses the binary search tree in post-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define a `inOrderTraversal()` generator method that traverses the binary search tree in in-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define an `insert()` method, that uses a `while` loop to search the binary search tree, moving through each node's children, until an appropriate position is found to insert a new child `BinarySearchTreeNode` either as the `left` or `right` child, depending on the given `key`.
- Define a `has()` method, that uses the `preOrderTraversal()` method to check if the given node exists in the binary search tree.
- Define a `find()` method, that uses the `preOrderTraversal()` method to retrieve the given node in the binary search tree.
- Define a `remove()` method, that removes the given `BinarySearchTreeNode` from the binary search tree, deleting any links to it and updating the binary search tree to retain its order.

```js

const tree = new BinarySearchTree(30);

tree.insert(10);
tree.insert(15);
tree.insert(12);
tree.insert(40);
tree.insert(35);
tree.insert(50);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 10, 15, 12, 40, 35, 50]

[...tree.inOrderTraversal()].map(x => x.value);
// [10, 12, 15, 30, 35, 40, 50]

[...tree.postOrderTraversal()].map(x => x.value);
// [12, 15, 10, 35, 50, 40, 30]

tree.root.value;                // 30
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // true
tree.find(40).isLeaf;           // false
tree.find(50).parent.value;     // 40
tree.find(15).left.value;       // 12
tree.find(12).right;            // null

tree.remove(12);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 10, 15, 40, 35, 50]

tree.remove(10);

[...tree.preOrderTraversal()].map(v => ({
  key: v.key,
  parent: v.parent ? v.parent.key : null,
})); // [30, 15, 40, 35, 50]

tree.remove(40);

[...tree.preOrderTraversal()].map(x => x.value);
// [30, 15, 40, 35, 50]

tree.remove(30);

[...tree.preOrderTraversal()].map(x => x.value);
// [15, 35, 50]
```
