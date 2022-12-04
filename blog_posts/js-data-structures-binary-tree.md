---
title: JavaScript Data Structures - Binary Tree
shortTitle: Binary Tree
type: story
tags: javascript,object,class,array
author: chalarangelo
cover: blog_images/purple-flower-macro-3.jpg
excerpt: A binary tree is a data structure consisting of a set of linked nodes representing a hierarchical tree structure, in which each node can have at most two children.
firstSeen: 2021-08-26T05:00:00-04:00
---

### Definition

A binary tree is a data structure consisting of a set of linked nodes that represent a hierarchical tree structure. Each node is linked to others via parent-children relationship. Any given node can have at most two children (left and right). The first node in the binary tree is the root, whereas nodes without any children are the leaves.

![JavaScript Binary Tree visualization](./blog_images/ds-binary-tree.png)

Each node in a binary tree data structure must have the following properties:

- `key`: The key of the node
- `value`: The value of the node
- `parent`: The parent of the node (`null` if there is none)
- `left`: A pointer to the node's left child (`null` if there is none)
- `right`: A pointer to the node's right child (`null` if there is none)

The main operations of a binary tree data structure are:

- `insert`: Inserts a node as a child of the given parent node
- `remove`: Removes a node and its children from the binary tree
- `find`: Retrieves a given node
- `preOrderTraversal`: Traverses the binary tree by recursively traversing each node followed by its children
- `postOrderTraversal`: Traverses the binary tree by recursively traversing each node's children followed by the node
- `inOrderTraversal`: Traverses the binary tree by recursively traversing each node's left child, followed by the node, followed by its right child

### Implementation

```js
class BinaryTreeNode {
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

class BinaryTree {
  constructor(key, value = key) {
    this.root = new BinaryTreeNode(key, value);
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

  insert(
    parentNodeKey,
    key,
    value = key,
    { left, right } = { left: true, right: true }
  ) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === parentNodeKey) {
        const canInsertLeft = left && node.left === null;
        const canInsertRight = right && node.right === null;
        if (!canInsertLeft && !canInsertRight) return false;
        if (canInsertLeft) {
          node.left = new BinaryTreeNode(key, value, node);
          return true;
        }
        if (canInsertRight) {
          node.right = new BinaryTreeNode(key, value, node);
          return true;
        }
      }
    }
    return false;
  }

  remove(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.left.key === key) {
        node.left = null;
        return true;
      }
      if (node.right.key === key) {
        node.right = null;
        return true;
      }
    }
    return false;
  }

  find(key) {
    for (let node of this.preOrderTraversal()) {
      if (node.key === key) return node;
    }
    return undefined;
  }
}
```

- Create a `class` for the `BinaryTreeNode` with a `constructor` that initializes the appropriate `key`, `value`, `parent`, `left` and `right` properties.
- Define an `isLeaf` getter, that uses `Array.prototype.length` to check if both `left` and `right` are empty.
- Define a `hasChildren` getter, that is the reverse of the `isLeaf` getter.
- Create a `class` for the `BinaryTree` with a `constructor` that initializes the `root` of the binary tree.
- Define a `preOrderTraversal()` generator method that traverses the binary tree in pre-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define a `postOrderTraversal()` generator method that traverses the binary tree in post-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define a `inOrderTraversal()` generator method that traverses the binary tree in in-order, using the `yield*` syntax to recursively delegate traversal to itself.
- Define an `insert()` method, that uses the `preOrderTraversal()` method to find the given parent node and insert a new child `BinaryTreeNode` either as the `left` or `right` child, depending on the passed options object.
- Define a `remove()` method, that uses the `preOrderTraversal()` method and `Array.prototype.filter()` to remove a `BinaryTreeNode` from the binary tree.
- Define a `find()` method, that uses the `preOrderTraversal()` method to retrieve the given node in the binary tree.

```js
const tree = new BinaryTree(1, 'AB');

tree.insert(1, 11, 'AC');
tree.insert(1, 12, 'BC');
tree.insert(12, 121, 'BG', { right: true });

[...tree.preOrderTraversal()].map(x => x.value);
// ['AB', 'AC', 'BC', 'BCG']

[...tree.inOrderTraversal()].map(x => x.value);
// ['AC', 'AB', 'BC', 'BG']

tree.root.value;                // 'AB'
tree.root.hasChildren;          // true

tree.find(12).isLeaf;           // false
tree.find(121).isLeaf;          // true
tree.find(121).parent.value;    // 'BC'
tree.find(12).left;             // null
tree.find(12).right.value;      // 'BG'

tree.remove(12);

[...tree.postOrderTraversal()].map(x => x.value);
// ['AC', 'AB']
```
