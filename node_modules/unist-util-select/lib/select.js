'use strict';

var walkers = require('./ast-walkers'),
    matchNode = require('./match-node'),
    Collector = require('./collector');

var select = exports;


select.selectors = function (selectors, ast) {
  var collect = Collector();
  selectors.selectors.forEach(function (ruleSet) {
    collect(select.ruleSet(ruleSet, ast));
  });
  return collect.result;
};


select.ruleSet = function (ruleSet, ast) {
  return select.rule(ruleSet.rule, ast);
};


select.rule = function (rule, ast) {
  var collect = Collector();
  search(rule, ast, 0, null);
  return collect.result;

  function search (rule, node, nodeIndex, parent) {
    ({
      // `undefined` is the operator on the top rule selector.
      undefined: walkers.topScan,
      // `null` stands for the descendant combinator.
      null: walkers.descendant,
      '>': walkers.child,
      '+': walkers.adjacentSibling,
      '~': walkers.generalSibling
    })[rule.nestingOperator](
      node,
      nodeIndex,
      parent,
      searchOpts({ iterator: match.bind(null, rule) }, rule)
    );
  }

  function match (rule, node, nodeIndex, parent, props) {
    if (matchNode.apply(this, arguments)) {
      if (rule.rule) {
        search(rule.rule, node, nodeIndex, parent);
      }
      else {
        collect(node);
      }
    }
  }
};


function searchOpts (opts, rule) {
  rule.pseudos && rule.pseudos.forEach(function (pseudo) {
    switch (pseudo.name) {
      case 'nth-last-of-type':
      case 'last-of-type':
      case 'only-of-type':
        opts.typeCount = true;

      case 'nth-of-type':
      case 'first-of-type':
        opts.typeIndex = true;
    }
  });

  return opts;
}
