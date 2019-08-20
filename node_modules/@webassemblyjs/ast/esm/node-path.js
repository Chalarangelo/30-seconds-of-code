function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function findParent(_ref, cb) {
  var parentPath = _ref.parentPath;

  if (parentPath == null) {
    throw new Error("node is root");
  }

  var currentPath = parentPath;

  while (cb(currentPath) !== false) {
    // Hit the root node, stop
    // $FlowIgnore
    if (currentPath.parentPath == null) {
      return null;
    } // $FlowIgnore


    currentPath = currentPath.parentPath;
  }

  return currentPath.node;
}

function insertBefore(context, newNode) {
  return insert(context, newNode);
}

function insertAfter(context, newNode) {
  return insert(context, newNode, 1);
}

function insert(_ref2, newNode) {
  var node = _ref2.node,
      inList = _ref2.inList,
      parentPath = _ref2.parentPath,
      parentKey = _ref2.parentKey;
  var indexOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!inList) {
    throw new Error('inList' + " error: " + ("insert can only be used for nodes that are within lists" || "unknown"));
  }

  if (!(parentPath != null)) {
    throw new Error('parentPath != null' + " error: " + ("Can not remove root node" || "unknown"));
  }

  // $FlowIgnore
  var parentList = parentPath.node[parentKey];
  var indexInList = parentList.findIndex(function (n) {
    return n === node;
  });
  parentList.splice(indexInList + indexOffset, 0, newNode);
}

function remove(_ref3) {
  var node = _ref3.node,
      parentKey = _ref3.parentKey,
      parentPath = _ref3.parentPath;

  if (!(parentPath != null)) {
    throw new Error('parentPath != null' + " error: " + ("Can not remove root node" || "unknown"));
  }

  // $FlowIgnore
  var parentNode = parentPath.node; // $FlowIgnore

  var parentProperty = parentNode[parentKey];

  if (Array.isArray(parentProperty)) {
    // $FlowIgnore
    parentNode[parentKey] = parentProperty.filter(function (n) {
      return n !== node;
    });
  } else {
    // $FlowIgnore
    delete parentNode[parentKey];
  }

  node._deleted = true;
}

function stop(context) {
  context.shouldStop = true;
}

function replaceWith(context, newNode) {
  // $FlowIgnore
  var parentNode = context.parentPath.node; // $FlowIgnore

  var parentProperty = parentNode[context.parentKey];

  if (Array.isArray(parentProperty)) {
    var indexInList = parentProperty.findIndex(function (n) {
      return n === context.node;
    });
    parentProperty.splice(indexInList, 1, newNode);
  } else {
    // $FlowIgnore
    parentNode[context.parentKey] = newNode;
  }

  context.node._deleted = true;
  context.node = newNode;
} // bind the context to the first argument of node operations


function bindNodeOperations(operations, context) {
  var keys = Object.keys(operations);
  var boundOperations = {};
  keys.forEach(function (key) {
    boundOperations[key] = operations[key].bind(null, context);
  });
  return boundOperations;
}

function createPathOperations(context) {
  // $FlowIgnore
  return bindNodeOperations({
    findParent: findParent,
    replaceWith: replaceWith,
    remove: remove,
    insertBefore: insertBefore,
    insertAfter: insertAfter,
    stop: stop
  }, context);
}

export function createPath(context) {
  var path = _extends({}, context);

  Object.assign(path, createPathOperations(path));
  return path;
}