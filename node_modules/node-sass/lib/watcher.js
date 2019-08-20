var grapher = require('sass-graph'),
  clonedeep = require('lodash/cloneDeep'),
  path = require('path'),
  config = {},
  watcher = {},
  graph = null;

watcher.reset = function(opts) {
  config = clonedeep(opts || config || {});
  var options = {
    loadPaths: config.includePath,
    extensions: ['scss', 'sass', 'css'],
    follow: config.follow,
  };

  if (config.directory) {
    graph = grapher.parseDir(config.directory, options);
  } else {
    graph = grapher.parseFile(config.src, options);
  }

  return Object.keys(graph.index);
};

watcher.changed = function(absolutePath) {
  var files = {
    added: [],
    changed: [],
    removed: [],
  };

  this.reset();

  if (absolutePath && path.basename(absolutePath)[0] !== '_') {
    files.changed.push(absolutePath);
  }

  graph.visitAncestors(absolutePath, function(parent) {
    if (path.basename(parent)[0] !== '_') {
      files.changed.push(parent);
    }
  });

  graph.visitDescendents(absolutePath, function(child) {
    files.added.push(child);
  });

  return files;
};

watcher.added = function(absolutePath) {
  var files = {
    added: [],
    changed: [],
    removed: [],
  };

  this.reset();

  if (Object.keys(graph.index).indexOf(absolutePath) === -1) {
    files.added.push(absolutePath);
  }

  graph.visitDescendents(absolutePath, function(child) {
    files.added.push(child);
  });

  return files;
};

watcher.removed = function(absolutePath) {
  var files = {
    added: [],
    changed: [],
    removed: [],
  };

  graph.visitAncestors(absolutePath, function(parent) {
    if (path.basename(parent)[0] !== '_') {
      files.changed.push(parent);
    }
  });

  if (Object.keys(graph.index).indexOf(absolutePath) !== -1) {
    files.removed.push(absolutePath);
  }

  this.reset();

  return files;
};

module.exports = watcher;
