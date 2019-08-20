"use strict";

const _ = require(`lodash`);

const invariant = require(`invariant`);

const {
  getDb,
  colls
} = require(`./index`); /////////////////////////////////////////////////////////////////////
// Node collection metadata
/////////////////////////////////////////////////////////////////////


function makeTypeCollName(type) {
  return `gatsby:nodeType:${type}`;
}
/**
 * Creates a collection that will contain nodes of a certain type. The
 * name of the collection for type `MyType` will be something like
 * `gatsby:nodeType:MyType` (see `makeTypeCollName`)
 */


function createNodeTypeCollection(type) {
  const collName = makeTypeCollName(type);
  const nodeTypesColl = getDb().getCollection(colls.nodeTypes.name);
  invariant(nodeTypesColl, `Collection ${colls.nodeTypes.name} should exist`);
  nodeTypesColl.insert({
    type,
    collName
  }); // TODO what if `addCollection` fails? We will have inserted into
  // nodeTypesColl but no collection will exist. Need to make this
  // into a transaction

  const options = {
    unique: [`id`],
    indices: [`id`],
    disableMeta: true
  };
  const coll = getDb().addCollection(collName, options);
  return coll;
}
/**
 * Returns the name of the collection that contains nodes of the
 * specified type, where type is the node's `node.internal.type`
 */


function getTypeCollName(type) {
  const nodeTypesColl = getDb().getCollection(colls.nodeTypes.name);
  invariant(nodeTypesColl, `Collection ${colls.nodeTypes.name} should exist`);
  let nodeTypeInfo = nodeTypesColl.by(`type`, type);
  return nodeTypeInfo ? nodeTypeInfo.collName : undefined;
}
/**
 * Returns a reference to the collection that contains nodes of the
 * specified type, where type is the node's `node.internal.type`
 */


function getNodeTypeCollection(type) {
  const typeCollName = getTypeCollName(type);
  let coll;

  if (typeCollName) {
    coll = getDb().getCollection(typeCollName);
    invariant(coll, `Type [${type}] Collection doesn't exist for nodeTypeInfo: [${typeCollName}]`);
    return coll;
  } else {
    return undefined;
  }
}
/**
 * Deletes all empty node type collections, unless `force` is true, in
 * which case it deletes the collections even if they have nodes in
 * them
 */


function deleteNodeTypeCollections(force = false) {
  const nodeTypesColl = getDb().getCollection(colls.nodeTypes.name); // find() returns all objects in collection

  const nodeTypes = nodeTypesColl.find();

  for (const nodeType of nodeTypes) {
    let coll = getDb().getCollection(nodeType.collName);

    if (coll.count() === 0 || force) {
      getDb().removeCollection(coll.name);
      nodeTypesColl.remove(nodeType);
    }
  }
}
/**
 * Deletes all nodes from all the node type collections, including the
 * id -> type metadata. There will be no nodes related data in loki
 * after this is called
 */


function deleteAll() {
  const db = getDb();

  if (db) {
    deleteNodeTypeCollections(true);
    db.getCollection(colls.nodeMeta.name).clear();
  }
} /////////////////////////////////////////////////////////////////////
// Queries
/////////////////////////////////////////////////////////////////////

/**
 * Returns the node with `id` == id, or null if not found
 */


function getNode(id) {
  if (!id) {
    return null;
  } // First, find out which collection the node is in


  const nodeMetaColl = getDb().getCollection(colls.nodeMeta.name);
  invariant(nodeMetaColl, `nodeMeta collection should exist`);
  const nodeMeta = nodeMetaColl.by(`id`, id);

  if (nodeMeta) {
    // Now get the collection and query it by the `id` field, which
    // has an index on it
    const {
      typeCollName
    } = nodeMeta;
    const typeColl = getDb().getCollection(typeCollName);
    invariant(typeColl, `type collection ${typeCollName} referenced by nodeMeta but doesn't exist`);
    return typeColl.by(`id`, id);
  } else {
    return undefined;
  }
}
/**
 * Returns all nodes of a type (where `typeName ==
 * node.internal.type`). This is an O(1) operation since nodes are
 * already stored in separate collections by type
 */


function getNodesByType(typeName) {
  invariant(typeName, `typeName is null`);
  const collName = getTypeCollName(typeName);
  const coll = getDb().getCollection(collName);
  if (!coll) return [];
  return coll.data;
}
/**
 * Returns the collection of all nodes. This should be deprecated and
 * `getNodesByType` should be used instead. Or at least where possible
 */


function getNodes() {
  const nodeTypes = getTypes();
  return _.flatMap(nodeTypes, nodeType => getNodesByType(nodeType));
}
/**
 * Returns the unique collection of all node types
 */


function getTypes() {
  const nodeTypes = getDb().getCollection(colls.nodeTypes.name).data;
  return nodeTypes.map(nodeType => nodeType.type);
}
/**
 * Looks up the node by id, records a dependency between the node and
 * the path, and then returns the node
 *
 * @param {string} id node id to lookup
 * @param {string} path the page path to record a node dependency
 * against
 * @returns {Object} node or undefined if not found
 */


function getNodeAndSavePathDependency(id, path) {
  invariant(id, `id is null`);
  invariant(id, `path is null`);

  const createPageDependency = require(`../../redux/actions/add-page-dependency`);

  const node = getNode(id);
  createPageDependency({
    path,
    nodeId: id
  });
  return node;
}
/**
 * Determine if node has changed (by comparing its
 * `internal.contentDigest`
 *
 * @param {string} id
 * @param {string} digest
 * @returns {boolean}
 */


function hasNodeChanged(id, digest) {
  const node = getNode(id);

  if (!node) {
    return true;
  } else {
    return node.internal.contentDigest !== digest;
  }
} /////////////////////////////////////////////////////////////////////
// Create/Update/Delete
/////////////////////////////////////////////////////////////////////

/**
 * Creates a node in the DB. Will create a collection for the node
 * type if one hasn't been created yet
 *
 * @param {Object} node The node to add. Must have an `id` and
 * `internal.type`
 */


function createNode(node, oldNode) {
  invariant(node.internal, `node has no "internal" field`);
  invariant(node.internal.type, `node has no "internal.type" field`);
  invariant(node.id, `node has no "id" field`);
  const type = node.internal.type; // Loki doesn't provide "upsert", so if the node already exists, we
  // delete and then create it

  if (oldNode) {
    deleteNode(oldNode);
  }

  let nodeTypeColl = getNodeTypeCollection(type);

  if (!nodeTypeColl) {
    nodeTypeColl = createNodeTypeCollection(type);
  }

  const nodeMetaColl = getDb().getCollection(colls.nodeMeta.name);
  invariant(nodeMetaColl, `Collection ${colls.nodeMeta.name} should exist`);
  nodeMetaColl.insert({
    id: node.id,
    typeCollName: nodeTypeColl.name
  }); // TODO what if this insert fails? We will have inserted the id ->
  // collName mapping, but there won't be any nodes in the type
  // collection. Need to create a transaction around this

  return nodeTypeColl.insert(node);
}
/**
 * Updates a node in the DB. The contents of `node` will completely
 * overwrite value in the DB. Note, `node` must be a loki node. i.e it
 * has `$loki` and `meta` fields.
 *
 * @param {Object} node The new node information. This should be all
 * the node information. Not just changes
 */


function updateNode(node) {
  invariant(node.internal, `node has no "internal" field`);
  invariant(node.internal.type, `node has no "internal.type" field`);
  invariant(node.id, `node has no "id" field`);
  const type = node.internal.type;
  let coll = getNodeTypeCollection(type);
  invariant(coll, `${type} collection doesn't exist. When trying to update`);
  coll.update(node);
}
/**
 * Deletes a node from its type collection and removes its id ->
 * collName mapping. Function is idempotent. If the node has already
 * been deleted, this is a noop.
 *
 * @param {Object} the node to delete. Must have an `id` and
 * `internal.type`
 */


function deleteNode(node) {
  invariant(node.internal, `node has no "internal" field`);
  invariant(node.internal.type, `node has no "internal.type" field`);
  invariant(node.id, `node has no "id" field`);
  const type = node.internal.type;
  let nodeTypeColl = getNodeTypeCollection(type);

  if (!nodeTypeColl) {
    invariant(nodeTypeColl, `${type} collection doesn't exist. When trying to delete`);
  }

  if (nodeTypeColl.by(`id`, node.id)) {
    const nodeMetaColl = getDb().getCollection(colls.nodeMeta.name);
    invariant(nodeMetaColl, `Collection ${colls.nodeMeta.name} should exist`);
    nodeMetaColl.findAndRemove({
      id: node.id
    }); // TODO What if this `remove()` fails? We will have removed the id
    // -> collName mapping, but not the actual node in the
    // collection. Need to make this into a transaction

    nodeTypeColl.remove(node);
  } // idempotent. Do nothing if node wasn't already in DB

}
/**
 * deprecated
 */


function deleteNodes(nodes) {
  for (const node of nodes) {
    deleteNode(node);
  }
} /////////////////////////////////////////////////////////////////////
// Reducer
/////////////////////////////////////////////////////////////////////


function reducer(state = new Map(), action) {
  switch (action.type) {
    case `DELETE_CACHE`:
      deleteAll();
      return null;

    case `CREATE_NODE`:
      {
        createNode(action.payload, action.oldNode);
        return null;
      }

    case `ADD_FIELD_TO_NODE`:
    case `ADD_CHILD_NODE_TO_PARENT_NODE`:
      updateNode(action.payload);
      return null;

    case `DELETE_NODE`:
      {
        if (action.payload) {
          deleteNode(action.payload);
        }

        return null;
      }

    case `DELETE_NODES`:
      {
        deleteNodes(action.payload);
        return null;
      }

    default:
      return null;
  }
} /////////////////////////////////////////////////////////////////////
// Exports
/////////////////////////////////////////////////////////////////////


module.exports = {
  getNodeTypeCollection,
  getNodes,
  getNode,
  getNodesByType,
  getTypes,
  hasNodeChanged,
  getNodeAndSavePathDependency,
  createNode,
  updateNode,
  deleteNode,
  deleteNodeTypeCollections,
  deleteAll,
  reducer
};
//# sourceMappingURL=nodes.js.map