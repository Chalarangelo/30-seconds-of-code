'use strict';

module.exports = matchNode;


// Match node against a simple selector.
function matchNode (rule, node, nodeIndex, parent, props) {
  return matchType(rule, node) &&
    matchAttrs(rule, node) &&
    matchPseudos(rule, node, nodeIndex, parent, props);
}


function matchType (rule, node) {
  return !rule.tagName || rule.tagName == '*' || rule.tagName == node.type;
}


function matchAttrs (rule, node) {
  return !rule.attrs || rule.attrs.every(function (attr) {
    switch (attr.operator) {
      case undefined:
        return attr.name in node;

      case '=':
        // First, check for special values.
        switch (attr.value) {
          case 'null':
            if (attr.name in node && node[attr.name] == null) return true;
            break;

          case 'true':
            if (node[attr.name] === true) return true;
            break;

          case 'false':
            if (node[attr.name] === false) return true;
            break;
        }
        return node[attr.name] == attr.value;

      case '^=':
        return typeof node[attr.name] == 'string' &&
          node[attr.name].slice(0, attr.value.length) == attr.value;

      case '*=':
        return typeof node[attr.name] == 'string' &&
          node[attr.name].indexOf(attr.value) >= 0;

      case '$=':
        return typeof node[attr.name] == 'string' &&
          node[attr.name].slice(-attr.value.length) == attr.value;

      default:
        throw Error('Undefined attribute operator: ' + attr.operator);
    }
  });
}


function matchPseudos (rule, node, nodeIndex, parent, props) {
  return !rule.pseudos || rule.pseudos.every(function (pseudo) {
    switch (pseudo.name) {
      case 'root':
        return parent == null;

      case 'nth-child':
        return parent && pseudo.value(nodeIndex);

      case 'nth-last-child':
        return parent && pseudo.value(parent.children.length - 1 - nodeIndex);

      case 'nth-of-type':
        return parent && pseudo.value(props.typeIndex);

      case 'nth-last-of-type':
        return parent && pseudo.value(props.typeCount - 1 - props.typeIndex);

      case 'first-child':
        return parent && nodeIndex == 0;

      case 'last-child':
        return parent && nodeIndex == parent.children.length - 1;

      case 'first-of-type':
        return parent && props.typeIndex == 0;

      case 'last-of-type':
        return parent && props.typeIndex == props.typeCount - 1;

      case 'only-child':
        return parent && parent.children.length == 1;

      case 'only-of-type':
        return parent && props.typeCount == 1;

      case 'empty':
        return node.children && !node.children.length;

      case 'not':
        return !matchNode(pseudo.value.rule, node, nodeIndex, parent, props);

      default:
        throw Error('Undefined pseudo-class: ' + pseudo.name);
    }
  });
}
