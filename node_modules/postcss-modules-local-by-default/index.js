var postcss = require('postcss');
var Tokenizer = require('css-selector-tokenizer');

function normalizeNodeArray(nodes) {
  var array = [];
  nodes.forEach(function(x) {
    if(Array.isArray(x)) {
      normalizeNodeArray(x).forEach(function(item) {
        array.push(item);
      });
    } else if(x) {
      array.push(x);
    }
  });
  if(array.length > 0 && array[array.length - 1].type === 'spacing') {
    array.pop();
  }
  return array;
}

function localizeNode(node, context) {
  if(context.ignoreNextSpacing && node.type !== 'spacing') {
    throw new Error('Missing whitespace after :' + context.ignoreNextSpacing);
  }
  if(context.enforceNoSpacing && node.type === 'spacing') {
    throw new Error('Missing whitespace before :' + context.enforceNoSpacing);
  }

  var newNodes;
  switch(node.type) {
    case 'selectors':
      var resultingGlobal;
      context.hasPureGlobals = false;
      newNodes = node.nodes.map(function(n) {
        var nContext = {
          global: context.global,
          lastWasSpacing: true,
          hasLocals: false,
          explicit: false
        };
        n = localizeNode(n, nContext);
        if(typeof resultingGlobal === 'undefined') {
          resultingGlobal = nContext.global;
        } else if(resultingGlobal !== nContext.global) {
          throw new Error('Inconsistent rule global/local result in rule "' +
            Tokenizer.stringify(node) + '" (multiple selectors must result in the same mode for the rule)');
        }
        if(!nContext.hasLocals) {
          context.hasPureGlobals = true;
        }
        return n;
      });
      context.global = resultingGlobal;
      node = Object.create(node);
      node.nodes = normalizeNodeArray(newNodes);
      break;

    case 'selector':
      newNodes = node.nodes.map(function(n) {
        return localizeNode(n, context);
      });
      node = Object.create(node);
      node.nodes = normalizeNodeArray(newNodes);
      break;

    case 'spacing':
      if(context.ignoreNextSpacing) {
        context.ignoreNextSpacing = false;
        context.lastWasSpacing = false;
        context.enforceNoSpacing = false;
        return null;
      }
      context.lastWasSpacing = true;
      return node;

    case 'pseudo-class':
      if(node.name === 'local' || node.name === 'global') {
        if(context.inside) {
          throw new Error('A :' + node.name + ' is not allowed inside of a :' + context.inside + '(...)');
        }
        context.ignoreNextSpacing = context.lastWasSpacing ? node.name : false;
        context.enforceNoSpacing = context.lastWasSpacing ? false : node.name;
        context.global = (node.name === 'global');
        context.explicit = true;
        return null;
      }
      break;

    case 'nested-pseudo-class':
      var subContext;
      if(node.name === 'local' || node.name === 'global') {
        if(context.inside) {
          throw new Error('A :' + node.name + '(...) is not allowed inside of a :' + context.inside + '(...)');
        }
        subContext = {
          global: (node.name === 'global'),
          inside: node.name,
          hasLocals: false,
          explicit: true
        };
        node = node.nodes.map(function(n) {
          return localizeNode(n, subContext);
        });
        // don't leak spacing
        node[0].before = undefined;
        node[node.length - 1].after = undefined;
      } else {
        subContext = {
          global: context.global,
          inside: context.inside,
          lastWasSpacing: true,
          hasLocals: false,
          explicit: context.explicit
        };
        newNodes = node.nodes.map(function(n) {
          return localizeNode(n, subContext);
        });
        node = Object.create(node);
        node.nodes = normalizeNodeArray(newNodes);
      }
      if(subContext.hasLocals) {
        context.hasLocals = true;
      }
      break;

    case 'id':
    case 'class':
      if(!context.global) {
        node = {
          type: 'nested-pseudo-class',
          name: 'local',
          nodes: [node]
        };
        context.hasLocals = true;
      }
      break;
  }

  // reset context
  context.lastWasSpacing = false;
  context.ignoreNextSpacing = false;
  context.enforceNoSpacing = false;
  return node;
}

function localizeDeclNode(node, context) {
  var newNode;
  switch(node.type) {
    case 'item':
      if(context.localizeNextItem) {
        newNode = Object.create(node);
        newNode.name = ':local(' + newNode.name + ')';
        context.localizeNextItem = false;
        return newNode;
      }
      break;

    case 'nested-item':
      var newNodes = node.nodes.map(function(n) {
        return localizeDeclValue(n, context);
      });
      node = Object.create(node);
      node.nodes = newNodes;
      break;

    case 'url':
      if(context.options && context.options.rewriteUrl) {
        newNode = Object.create(node);
        newNode.url = context.options.rewriteUrl(context.global, node.url);
        return newNode;
      }
      break;
  }
  return node;
}

function localizeDeclValue(valueNode, context) {
  var newValueNode = Object.create(valueNode);
  newValueNode.nodes = valueNode.nodes.map(function(node) {
    return localizeDeclNode(node, context);
  });
  return newValueNode;
}

function localizeAnimationShorthandDeclValueNodes(nodes, context) {
  var validIdent = validIdent = /^-?[_a-z][_a-z0-9-]*$/i;

  /*
  The spec defines some keywords that you can use to describe properties such as the timing
  function. These are still valid animation names, so as long as there is a property that accepts
  a keyword, it is given priority. Only when all the properties that can take a keyword are
  exhausted can the animation name be set to the keyword. I.e.

  animation: infinite infinite;

  The animation will repeat an infinite number of times from the first argument, and will have an
  animation name of infinite from the second.
  */
  var animationKeywords = {
    '$alternate': 1,
    '$alternate-reverse': 1,
    '$backwards': 1,
    '$both': 1,
    '$ease': 1,
    '$ease-in': 1,
    '$ease-in-out': 1,
    '$ease-out': 1,
    '$forwards': 1,
    '$infinite': 1,
    '$linear': 1,
    '$none': Infinity, // No matter how many times you write none, it will never be an animation name
    '$normal': 1,
    '$paused': 1,
    '$reverse': 1,
    '$running': 1,
    '$step-end': 1,
    '$step-start': 1,
    '$initial': Infinity,
    '$inherit': Infinity,
    '$unset': Infinity,
  };

  var didParseAnimationName = false;
  var parsedAnimationKeywords = {};
  return nodes.map(function(valueNode) {
    var value = valueNode.type === 'item'
      ? valueNode.name.toLowerCase()
      : null;

    var shouldParseAnimationName = false;

    if (!didParseAnimationName && value && validIdent.test(value)) {
      if ('$' + value in animationKeywords) {
        parsedAnimationKeywords['$' + value] = ('$' + value in parsedAnimationKeywords)
          ? (parsedAnimationKeywords['$' + value] + 1)
          : 0;

        shouldParseAnimationName = (parsedAnimationKeywords['$' + value] >= animationKeywords['$' + value]);
      } else {
        shouldParseAnimationName = true;
      }
    }

    var subContext = {
      options: context.options,
      global: context.global,
      localizeNextItem: shouldParseAnimationName && !context.global
    };
    return localizeDeclNode(valueNode, subContext);
  });
}

function localizeAnimationShorthandDeclValues(valuesNode, decl, context) {
  var newValuesNode = Object.create(valuesNode);
  newValuesNode.nodes = valuesNode.nodes.map(function(valueNode, index) {
    var newValueNode = Object.create(valueNode);
    newValueNode.nodes = localizeAnimationShorthandDeclValueNodes(valueNode.nodes, context);
    return newValueNode;
  });
  decl.value = Tokenizer.stringifyValues(newValuesNode);
}

function localizeDeclValues(localize, valuesNode, decl, context) {
  var newValuesNode = Object.create(valuesNode);
  newValuesNode.nodes = valuesNode.nodes.map(function(valueNode) {
    var subContext = {
      options: context.options,
      global: context.global,
      localizeNextItem: localize && !context.global
    };
    return localizeDeclValue(valueNode, subContext);
  });
  decl.value = Tokenizer.stringifyValues(newValuesNode);
}

function localizeDecl(decl, context) {
  var valuesNode = Tokenizer.parseValues(decl.value);

  var isAnimation = /animation?$/.test(decl.prop);
  if (isAnimation) return localizeAnimationShorthandDeclValues(valuesNode, decl, context);

  var isAnimationName = /animation(-name)?$/.test(decl.prop);
  if (isAnimationName) return localizeDeclValues(true, valuesNode, decl, context);

  return localizeDeclValues(false, valuesNode, decl, context);
}

module.exports = postcss.plugin('postcss-modules-local-by-default', function (options) {
  if (typeof options !== 'object') {
    options = {}; // If options is undefined or not an object the plugin fails
  }
  if(options && options.mode) {
    if(options.mode !== 'global' && options.mode !== 'local' && options.mode !== 'pure') {
      throw new Error('options.mode must be either "global", "local" or "pure" (default "local")');
    }
  }
  var pureMode = options && options.mode === 'pure';
  var globalMode = options && options.mode === 'global';
  return function(css) {
    css.walkAtRules(function(atrule) {
      if(/keyframes$/.test(atrule.name)) {
        var globalMatch = /^\s*:global\s*\((.+)\)\s*$/.exec(atrule.params);
        var localMatch = /^\s*:local\s*\((.+)\)\s*$/.exec(atrule.params);
        var globalKeyframes = globalMode;
        if(globalMatch) {
          if(pureMode) {
            throw atrule.error('@keyframes :global(...) is not allowed in pure mode');
          }
          atrule.params = globalMatch[1];
          globalKeyframes = true;
        } else if(localMatch) {
          atrule.params = localMatch[0];
          globalKeyframes = false;
        } else if(!globalMode) {
          atrule.params = ':local(' + atrule.params + ')';
        }
        atrule.walkDecls(function(decl) {
          localizeDecl(decl, {
            options: options,
            global: globalKeyframes
          });
        });
      } else if(atrule.nodes) {
        atrule.nodes.forEach(function(decl) {
          if(decl.type === 'decl') {
            localizeDecl(decl, {
              options: options,
              global: globalMode
            });
          }
        });
      }
    });
    css.walkRules(function(rule) {
      if(rule.parent.type === 'atrule' && /keyframes$/.test(rule.parent.name)) {
        // ignore keyframe rules
        return;
      }
      var selector = Tokenizer.parse(rule.selector);
      var context = {
        options: options,
        global: globalMode,
        hasPureGlobals: false
      };
      var newSelector;
      try {
        newSelector = localizeNode(selector, context);
      } catch(e) {
        throw rule.error(e.message);
      }
      if(pureMode && context.hasPureGlobals) {
        throw rule.error('Selector "' + Tokenizer.stringify(selector) + '" is not pure ' +
          '(pure selectors must contain at least one local class or id)');
      }
      // Less-syntax mixins parse as rules with no nodes
      if (rule.nodes) {
        rule.nodes.forEach(function(decl) {
          localizeDecl(decl, context);
        });
      }
      rule.selector = Tokenizer.stringify(newSelector);
    });
  };
});
