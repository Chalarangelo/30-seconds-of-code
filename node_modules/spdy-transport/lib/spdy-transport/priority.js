'use strict'

var transport = require('../spdy-transport')
var utils = transport.utils

var assert = require('assert')
var debug = require('debug')('spdy:priority')

function PriorityNode (tree, options) {
  this.tree = tree

  this.id = options.id
  this.parent = options.parent
  this.weight = options.weight

  // To be calculated in `addChild`
  this.priorityFrom = 0
  this.priorityTo = 1
  this.priority = 1

  this.children = {
    list: [],
    weight: 0
  }

  if (this.parent !== null) {
    this.parent.addChild(this)
  }
}

function compareChildren (a, b) {
  return a.weight === b.weight ? a.id - b.id : a.weight - b.weight
}

PriorityNode.prototype.toJSON = function toJSON () {
  return {
    parent: this.parent,
    weight: this.weight,
    exclusive: this.exclusive
  }
}

PriorityNode.prototype.getPriority = function getPriority () {
  return this.priority
}

PriorityNode.prototype.getPriorityRange = function getPriorityRange () {
  return { from: this.priorityFrom, to: this.priorityTo }
}

PriorityNode.prototype.addChild = function addChild (child) {
  child.parent = this
  utils.binaryInsert(this.children.list, child, compareChildren)
  this.children.weight += child.weight

  this._updatePriority(this.priorityFrom, this.priorityTo)
}

PriorityNode.prototype.remove = function remove () {
  assert(this.parent, 'Can\'t remove root node')

  this.parent.removeChild(this)
  this.tree._removeNode(this)

  // Move all children to the parent
  for (var i = 0; i < this.children.list.length; i++) {
    this.parent.addChild(this.children.list[i])
  }
}

PriorityNode.prototype.removeChild = function removeChild (child) {
  this.children.weight -= child.weight
  var index = utils.binarySearch(this.children.list, child, compareChildren)
  if (index !== -1 && this.children.list.length >= index) {
    this.children.list.splice(index, 1)
  }
}

PriorityNode.prototype.removeChildren = function removeChildren () {
  var children = this.children.list
  this.children.list = []
  this.children.weight = 0
  return children
}

PriorityNode.prototype._updatePriority = function _updatePriority (from, to) {
  this.priority = to - from
  this.priorityFrom = from
  this.priorityTo = to

  var weight = 0
  for (var i = 0; i < this.children.list.length; i++) {
    var node = this.children.list[i]
    var nextWeight = weight + node.weight

    node._updatePriority(
      from + this.priority * (weight / this.children.weight),
      from + this.priority * (nextWeight / this.children.weight)
    )
    weight = nextWeight
  }
}

function PriorityTree (options) {
  this.map = {}
  this.list = []
  this.defaultWeight = options.defaultWeight || 16

  this.count = 0
  this.maxCount = options.maxCount

  // Root
  this.root = this.add({
    id: 0,
    parent: null,
    weight: 1
  })
}
module.exports = PriorityTree

PriorityTree.create = function create (options) {
  return new PriorityTree(options)
}

PriorityTree.prototype.add = function add (options) {
  if (options.id === options.parent) {
    return this.addDefault(options.id)
  }

  var parent = options.parent === null ? null : this.map[options.parent]
  if (parent === undefined) {
    return this.addDefault(options.id)
  }

  debug('add node=%d parent=%d weight=%d exclusive=%d',
    options.id,
    options.parent === null ? -1 : options.parent,
    options.weight || this.defaultWeight,
    options.exclusive ? 1 : 0)

  var children
  if (options.exclusive) {
    children = parent.removeChildren()
  }

  var node = new PriorityNode(this, {
    id: options.id,
    parent: parent,
    weight: options.weight || this.defaultWeight
  })
  this.map[options.id] = node

  if (options.exclusive) {
    for (var i = 0; i < children.length; i++) {
      node.addChild(children[i])
    }
  }

  this.count++
  if (this.count > this.maxCount) {
    debug('hit maximum remove id=%d', this.list[0].id)
    this.list.shift().remove()
  }

  // Root node is not subject to removal
  if (node.parent !== null) {
    this.list.push(node)
  }

  return node
}

// Only for testing, should use `node`'s methods
PriorityTree.prototype.get = function get (id) {
  return this.map[id]
}

PriorityTree.prototype.addDefault = function addDefault (id) {
  debug('creating default node')
  return this.add({ id: id, parent: 0, weight: this.defaultWeight })
}

PriorityTree.prototype._removeNode = function _removeNode (node) {
  delete this.map[node.id]
  var index = utils.binarySearch(this.list, node, compareChildren)
  this.list.splice(index, 1)
  this.count--
}
