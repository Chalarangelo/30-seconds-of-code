"use strict";

var PERMANENT_MARKER = 2;
var TEMPORARY_MARKER = 1;

function createError(node, graph) {
  var er = new Error("Nondeterministic import's order");

  var related = graph[node];
  var relatedNode = related.find(function (relatedNode) {
    return graph[relatedNode].indexOf(node) > -1;
  });

  er.nodes = [node, relatedNode];

  return er;
}

function walkGraph(node, graph, state, result, strict) {
  if (state[node] === PERMANENT_MARKER) return;
  if (state[node] === TEMPORARY_MARKER) {
    if (strict) return createError(node, graph);
    return;
  }

  state[node] = TEMPORARY_MARKER;

  var children = graph[node];
  var length = children.length;

  for (var i = 0; i < length; ++i) {
    var er = walkGraph(children[i], graph, state, result, strict);
    if (er instanceof Error) return er;
  }

  state[node] = PERMANENT_MARKER;

  result.push(node);
}

function topologicalSort(graph, strict) {
  var result = [];
  var state = {};

  var nodes = Object.keys(graph);
  var length = nodes.length;

  for (var i = 0; i < length; ++i) {
    var er = walkGraph(nodes[i], graph, state, result, strict);
    if (er instanceof Error) return er;
  }

  return result;
}

module.exports = topologicalSort;