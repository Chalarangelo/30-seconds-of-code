var camelCase = require("lodash/camelCase");

function dashesCamelCase(str) {
  return str.replace(/-+(\w)/g, function(match, firstLetter) {
    return firstLetter.toUpperCase();
  });
}

module.exports = function compileExports(result, importItemMatcher, camelCaseKeys) {
  if (!Object.keys(result.exports).length) {
    return "";
  }

  var exportJs = Object.keys(result.exports).reduce(function(res, key) {
    var valueAsString = JSON.stringify(result.exports[key]);
    valueAsString = valueAsString.replace(result.importItemRegExpG, importItemMatcher);
    function addEntry(k) {
      res.push("\t" + JSON.stringify(k) + ": " + valueAsString);
    }

    var targetKey;
    switch(camelCaseKeys) {
      case true:
        addEntry(key);
        targetKey = camelCase(key);
        if (targetKey !== key) {
          addEntry(targetKey);
        }
        break;
      case 'dashes':
        addEntry(key);
        targetKey = dashesCamelCase(key);
        if (targetKey !== key) {
          addEntry(targetKey);
        }
        break;
      case 'only':
        addEntry(camelCase(key));
        break;
      case 'dashesOnly':
        addEntry(dashesCamelCase(key));
        break;
      default:
        addEntry(key);
        break;
    }
    return res;
  }, []).join(",\n");

  return "{\n" + exportJs + "\n}";
};
