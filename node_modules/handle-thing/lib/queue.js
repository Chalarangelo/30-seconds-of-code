function Queue () {
  this.head = new Item('head', null)
}
module.exports = Queue

Queue.prototype.append = function append (kind, value) {
  var item = new Item(kind, value)
  this.head.prepend(item)
  return item
}

Queue.prototype.isEmpty = function isEmpty () {
  return this.head.prev === this.head
}

Queue.prototype.first = function first () {
  return this.head.next
}

function Item (kind, value) {
  this.prev = this
  this.next = this
  this.kind = kind
  this.value = value
}

Item.prototype.prepend = function prepend (other) {
  other.prev = this.prev
  other.next = this
  other.prev.next = other
  other.next.prev = other
}

Item.prototype.dequeue = function dequeue () {
  var prev = this.prev
  var next = this.next

  prev.next = next
  next.prev = prev
  this.prev = this
  this.next = this

  return this.value
}

Item.prototype.isEmpty = function isEmpty () {
  return this.prev === this
}
