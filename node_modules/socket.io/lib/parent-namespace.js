'use strict';

const Namespace = require('./namespace');

let count = 0;

class ParentNamespace extends Namespace {

  constructor(server) {
    super(server, '/_' + (count++));
    this.children = new Set();
  }

  initAdapter() {}

  emit() {
    const args = Array.prototype.slice.call(arguments);

    this.children.forEach(nsp => {
      nsp.rooms = this.rooms;
      nsp.flags = this.flags;
      nsp.emit.apply(nsp, args);
    });
    this.rooms = [];
    this.flags = {};
  }

  createChild(name) {
    const namespace = new Namespace(this.server, name);
    namespace.fns = this.fns.slice(0);
    this.listeners('connect').forEach(listener => namespace.on('connect', listener));
    this.listeners('connection').forEach(listener => namespace.on('connection', listener));
    this.children.add(namespace);
    this.server.nsps[name] = namespace;
    return namespace;
  }
}

module.exports = ParentNamespace;
