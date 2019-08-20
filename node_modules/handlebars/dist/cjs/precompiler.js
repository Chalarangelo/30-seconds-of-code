/* eslint-disable no-console */
'use strict';

// istanbul ignore next

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

// istanbul ignore next

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _neoAsync = require('neo-async');

var _neoAsync2 = _interopRequireDefault(_neoAsync);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _handlebars = require('./handlebars');

var Handlebars = _interopRequireWildcard(_handlebars);

var _path = require('path');

var _sourceMap = require('source-map');

module.exports.loadTemplates = function (opts, callback) {
  loadStrings(opts, function (err, strings) {
    if (err) {
      callback(err);
    } else {
      loadFiles(opts, function (err, files) {
        if (err) {
          callback(err);
        } else {
          opts.templates = strings.concat(files);
          callback(undefined, opts);
        }
      });
    }
  });
};

function loadStrings(opts, callback) {
  var strings = arrayCast(opts.string),
      names = arrayCast(opts.name);

  if (names.length !== strings.length && strings.length > 1) {
    return callback(new Handlebars.Exception('Number of names did not match the number of string inputs'));
  }

  _neoAsync2['default'].map(strings, function (string, callback) {
    if (string !== '-') {
      callback(undefined, string);
    } else {
      (function () {
        // Load from stdin
        var buffer = '';
        process.stdin.setEncoding('utf8');

        process.stdin.on('data', function (chunk) {
          buffer += chunk;
        });
        process.stdin.on('end', function () {
          callback(undefined, buffer);
        });
      })();
    }
  }, function (err, strings) {
    strings = strings.map(function (string, index) {
      return {
        name: names[index],
        path: names[index],
        source: string
      };
    });
    callback(err, strings);
  });
}

function loadFiles(opts, callback) {
  // Build file extension pattern
  var extension = (opts.extension || 'handlebars').replace(/[\\^$*+?.():=!|{}\-[\]]/g, function (arg) {
    return '\\' + arg;
  });
  extension = new RegExp('\\.' + extension + '$');

  var ret = [],
      queue = (opts.files || []).map(function (template) {
    return { template: template, root: opts.root };
  });
  _neoAsync2['default'].whilst(function () {
    return queue.length;
  }, function (callback) {
    var _queue$shift = queue.shift();

    var path = _queue$shift.template;
    var root = _queue$shift.root;

    _fs2['default'].stat(path, function (err, stat) {
      if (err) {
        return callback(new Handlebars.Exception('Unable to open template file "' + path + '"'));
      }

      if (stat.isDirectory()) {
        opts.hasDirectory = true;

        _fs2['default'].readdir(path, function (err, children) {
          /* istanbul ignore next : Race condition that being too lazy to test */
          if (err) {
            return callback(err);
          }
          children.forEach(function (file) {
            var childPath = path + '/' + file;

            if (extension.test(childPath) || _fs2['default'].statSync(childPath).isDirectory()) {
              queue.push({ template: childPath, root: root || path });
            }
          });

          callback();
        });
      } else {
        _fs2['default'].readFile(path, 'utf8', function (err, data) {
          /* istanbul ignore next : Race condition that being too lazy to test */
          if (err) {
            return callback(err);
          }

          if (opts.bom && data.indexOf('﻿') === 0) {
            data = data.substring(1);
          }

          // Clean the template name
          var name = path;
          if (!root) {
            name = _path.basename(name);
          } else if (name.indexOf(root) === 0) {
            name = name.substring(root.length + 1);
          }
          name = name.replace(extension, '');

          ret.push({
            path: path,
            name: name,
            source: data
          });

          callback();
        });
      }
    });
  }, function (err) {
    if (err) {
      callback(err);
    } else {
      callback(undefined, ret);
    }
  });
}

module.exports.cli = function (opts) {
  if (opts.version) {
    console.log(Handlebars.VERSION);
    return;
  }

  if (!opts.templates.length && !opts.hasDirectory) {
    throw new Handlebars.Exception('Must define at least one template or directory.');
  }

  if (opts.simple && opts.min) {
    throw new Handlebars.Exception('Unable to minimize simple output');
  }

  var multiple = opts.templates.length !== 1 || opts.hasDirectory;
  if (opts.simple && multiple) {
    throw new Handlebars.Exception('Unable to output multiple templates in simple mode');
  }

  // Force simple mode if we have only one template and it's unnamed.
  if (!opts.amd && !opts.commonjs && opts.templates.length === 1 && !opts.templates[0].name) {
    opts.simple = true;
  }

  // Convert the known list into a hash
  var known = {};
  if (opts.known && !Array.isArray(opts.known)) {
    opts.known = [opts.known];
  }
  if (opts.known) {
    for (var i = 0, len = opts.known.length; i < len; i++) {
      known[opts.known[i]] = true;
    }
  }

  var objectName = opts.partial ? 'Handlebars.partials' : 'templates';

  var output = new _sourceMap.SourceNode();
  if (!opts.simple) {
    if (opts.amd) {
      output.add('define([\'' + opts.handlebarPath + 'handlebars.runtime\'], function(Handlebars) {\n  Handlebars = Handlebars["default"];');
    } else if (opts.commonjs) {
      output.add('var Handlebars = require("' + opts.commonjs + '");');
    } else {
      output.add('(function() {\n');
    }
    output.add('  var template = Handlebars.template, templates = ');
    if (opts.namespace) {
      output.add(opts.namespace);
      output.add(' = ');
      output.add(opts.namespace);
      output.add(' || ');
    }
    output.add('{};\n');
  }

  opts.templates.forEach(function (template) {
    var options = {
      knownHelpers: known,
      knownHelpersOnly: opts.o
    };

    if (opts.map) {
      options.srcName = template.path;
    }
    if (opts.data) {
      options.data = true;
    }

    var precompiled = Handlebars.precompile(template.source, options);

    // If we are generating a source map, we have to reconstruct the SourceNode object
    if (opts.map) {
      var consumer = new _sourceMap.SourceMapConsumer(precompiled.map);
      precompiled = _sourceMap.SourceNode.fromStringWithSourceMap(precompiled.code, consumer);
    }

    if (opts.simple) {
      output.add([precompiled, '\n']);
    } else {
      if (!template.name) {
        throw new Handlebars.Exception('Name missing for template');
      }

      if (opts.amd && !multiple) {
        output.add('return ');
      }
      output.add([objectName, '[\'', template.name, '\'] = template(', precompiled, ');\n']);
    }
  });

  // Output the content
  if (!opts.simple) {
    if (opts.amd) {
      if (multiple) {
        output.add(['return ', objectName, ';\n']);
      }
      output.add('});');
    } else if (!opts.commonjs) {
      output.add('})();');
    }
  }

  if (opts.map) {
    output.add('\n//# sourceMappingURL=' + opts.map + '\n');
  }

  output = output.toStringWithSourceMap();
  output.map = output.map + '';

  if (opts.min) {
    output = minify(output, opts.map);
  }

  if (opts.map) {
    _fs2['default'].writeFileSync(opts.map, output.map, 'utf8');
  }
  output = output.code;

  if (opts.output) {
    _fs2['default'].writeFileSync(opts.output, output, 'utf8');
  } else {
    console.log(output);
  }
};

function arrayCast(value) {
  value = value != null ? value : [];
  if (!Array.isArray(value)) {
    value = [value];
  }
  return value;
}

/**
 * Run uglify to minify the compiled template, if uglify exists in the dependencies.
 *
 * We are using `require` instead of `import` here, because es6-modules do not allow
 * dynamic imports and uglify-js is an optional dependency. Since we are inside NodeJS here, this
 * should not be a problem.
 *
 * @param {string} output the compiled template
 * @param {string} sourceMapFile the file to write the source map to.
 */
function minify(output, sourceMapFile) {
  try {
    // Try to resolve uglify-js in order to see if it does exist
    require.resolve('uglify-js');
  } catch (e) {
    if (e.code !== 'MODULE_NOT_FOUND') {
      // Something else seems to be wrong
      throw e;
    }
    // it does not exist!
    console.error('Code minimization is disabled due to missing uglify-js dependency');
    return output;
  }
  return require('uglify-js').minify(output.code, {
    sourceMap: {
      content: output.map,
      url: sourceMapFile
    }
  });
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2xpYi9wcmVjb21waWxlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozt3QkFDa0IsV0FBVzs7OztrQkFDZCxJQUFJOzs7OzBCQUNTLGNBQWM7O0lBQTlCLFVBQVU7O29CQUNDLE1BQU07O3lCQUNlLFlBQVk7O0FBR3hELE1BQU0sQ0FBQyxPQUFPLENBQUMsYUFBYSxHQUFHLFVBQVMsSUFBSSxFQUFFLFFBQVEsRUFBRTtBQUN0RCxhQUFXLENBQUMsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLE9BQU8sRUFBRTtBQUN2QyxRQUFJLEdBQUcsRUFBRTtBQUNQLGNBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNmLE1BQU07QUFDTCxlQUFTLENBQUMsSUFBSSxFQUFFLFVBQVMsR0FBRyxFQUFFLEtBQUssRUFBRTtBQUNuQyxZQUFJLEdBQUcsRUFBRTtBQUNQLGtCQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDZixNQUFNO0FBQ0wsY0FBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3ZDLGtCQUFRLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxDQUFDO1NBQzNCO09BQ0YsQ0FBQyxDQUFDO0tBQ0o7R0FDRixDQUFDLENBQUM7Q0FDSixDQUFDOztBQUVGLFNBQVMsV0FBVyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7QUFDbkMsTUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7TUFDaEMsS0FBSyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBRWpDLE1BQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxPQUFPLENBQUMsTUFBTSxJQUM1QixPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUN6QixXQUFPLFFBQVEsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsMkRBQTJELENBQUMsQ0FBQyxDQUFDO0dBQ3hH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O0NBQ0oiLCJmaWxlIjoicHJlY29tcGlsZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgQXN5bmMgZnJvbSAnbmVvLWFzeW5jJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBIYW5kbGViYXJzIGZyb20gJy4vaGFuZGxlYmFycyc7XG5pbXBvcnQge2Jhc2VuYW1lfSBmcm9tICdwYXRoJztcbmltcG9ydCB7U291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU5vZGV9IGZyb20gJ3NvdXJjZS1tYXAnO1xuXG5cbm1vZHVsZS5leHBvcnRzLmxvYWRUZW1wbGF0ZXMgPSBmdW5jdGlvbihvcHRzLCBjYWxsYmFjaykge1xuICBsb2FkU3RyaW5ncyhvcHRzLCBmdW5jdGlvbihlcnIsIHN0cmluZ3MpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2FkRmlsZXMob3B0cywgZnVuY3Rpb24oZXJyLCBmaWxlcykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRzLnRlbXBsYXRlcyA9IHN0cmluZ3MuY29uY2F0KGZpbGVzKTtcbiAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gbG9hZFN0cmluZ3Mob3B0cywgY2FsbGJhY2spIHtcbiAgbGV0IHN0cmluZ3MgPSBhcnJheUNhc3Qob3B0cy5zdHJpbmcpLFxuICAgICAgbmFtZXMgPSBhcnJheUNhc3Qob3B0cy5uYW1lKTtcblxuICBpZiAobmFtZXMubGVuZ3RoICE9PSBzdHJpbmdzLmxlbmd0aFxuICAgICAgJiYgc3RyaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBIYW5kbGViYXJzLkV4Y2VwdGlvbignTnVtYmVyIG9mIG5hbWVzIGRpZCBub3QgbWF0Y2ggdGhlIG51bWJlciBvZiBzdHJpbmcgaW5wdXRzJykpO1xuICB9XG5cbiAgQXN5bmMubWFwKHN0cmluZ3MsIGZ1bmN0aW9uKHN0cmluZywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChzdHJpbmcgIT09ICctJykge1xuICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMb2FkIGZyb20gc3RkaW5cbiAgICAgICAgbGV0IGJ1ZmZlciA9ICcnO1xuICAgICAgICBwcm9jZXNzLnN0ZGluLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5vbignZGF0YScsIGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgICAgICAgYnVmZmVyICs9IGNodW5rO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5vbignZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBidWZmZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVyciwgc3RyaW5ncykge1xuICAgICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKChzdHJpbmcsIGluZGV4KSA9PiAoe1xuICAgICAgICBuYW1lOiBuYW1lc1tpbmRleF0sXG4gICAgICAgIHBhdGg6IG5hbWVzW2luZGV4XSxcbiAgICAgICAgc291cmNlOiBzdHJpbmdcbiAgICAgIH0pKTtcbiAgICAgIGNhbGxiYWNrKGVyciwgc3RyaW5ncyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRGaWxlcyhvcHRzLCBjYWxsYmFjaykge1xuICAvLyBCdWlsZCBmaWxlIGV4dGVuc2lvbiBwYXR0ZXJuXG4gIGxldCBleHRlbnNpb24gPSAob3B0cy5leHRlbnNpb24gfHwgJ2hhbmRsZWJhcnMnKS5yZXBsYWNlKC9bXFxcXF4kKis/LigpOj0hfHt9XFwtW1xcXV0vZywgZnVuY3Rpb24oYXJnKSB7IHJldHVybiAnXFxcXCcgKyBhcmc7IH0pO1xuICBleHRlbnNpb24gPSBuZXcgUmVnRXhwKCdcXFxcLicgKyBleHRlbnNpb24gKyAnJCcpO1xuXG4gIGxldCByZXQgPSBbXSxcbiAgICAgIHF1ZXVlID0gKG9wdHMuZmlsZXMgfHwgW10pLm1hcCgodGVtcGxhdGUpID0+ICh7dGVtcGxhdGUsIHJvb3Q6IG9wdHMucm9vdH0pKTtcbiAgQXN5bmMud2hpbHN0KCgpID0+IHF1ZXVlLmxlbmd0aCwgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBsZXQge3RlbXBsYXRlOiBwYXRoLCByb290fSA9IHF1ZXVlLnNoaWZ0KCk7XG5cbiAgICBmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uKGVyciwgc3RhdCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEhhbmRsZWJhcnMuRXhjZXB0aW9uKGBVbmFibGUgdG8gb3BlbiB0ZW1wbGF0ZSBmaWxlIFwiJHtwYXRofVwiYCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIG9wdHMuaGFzRGlyZWN0b3J5ID0gdHJ1ZTtcblxuICAgICAgICBmcy5yZWFkZGlyKHBhdGgsIGZ1bmN0aW9uKGVyciwgY2hpbGRyZW4pIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCA6IFJhY2UgY29uZGl0aW9uIHRoYXQgYmVpbmcgdG9vIGxhenkgdG8gdGVzdCAqL1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhdGggPSBwYXRoICsgJy8nICsgZmlsZTtcblxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi50ZXN0KGNoaWxkUGF0aCkgfHwgZnMuc3RhdFN5bmMoY2hpbGRQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgIHF1ZXVlLnB1c2goe3RlbXBsYXRlOiBjaGlsZFBhdGgsIHJvb3Q6IHJvb3QgfHwgcGF0aH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcy5yZWFkRmlsZShwYXRoLCAndXRmOCcsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0IDogUmFjZSBjb25kaXRpb24gdGhhdCBiZWluZyB0b28gbGF6eSB0byB0ZXN0ICovXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wdHMuYm9tICYmIGRhdGEuaW5kZXhPZignXFx1RkVGRicpID09PSAwKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2xlYW4gdGhlIHRlbXBsYXRlIG5hbWVcbiAgICAgICAgICBsZXQgbmFtZSA9IHBhdGg7XG4gICAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICBuYW1lID0gYmFzZW5hbWUobmFtZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2Yocm9vdCkgPT09IDApIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZyhyb290Lmxlbmd0aCArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGV4dGVuc2lvbiwgJycpO1xuXG4gICAgICAgICAgcmV0LnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IGRhdGFcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmdW5jdGlvbihlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHJldCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuY2xpID0gZnVuY3Rpb24ob3B0cykge1xuICBpZiAob3B0cy52ZXJzaW9uKSB7XG4gICAgY29uc29sZS5sb2coSGFuZGxlYmFycy5WRVJTSU9OKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIW9wdHMudGVtcGxhdGVzLmxlbmd0aCAmJiAhb3B0cy5oYXNEaXJlY3RvcnkpIHtcbiAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ011c3QgZGVmaW5lIGF0IGxlYXN0IG9uZSB0ZW1wbGF0ZSBvciBkaXJlY3RvcnkuJyk7XG4gIH1cblxuICBpZiAob3B0cy5zaW1wbGUgJiYgb3B0cy5taW4pIHtcbiAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ1VuYWJsZSB0byBtaW5pbWl6ZSBzaW1wbGUgb3V0cHV0Jyk7XG4gIH1cblxuICBjb25zdCBtdWx0aXBsZSA9IG9wdHMudGVtcGxhdGVzLmxlbmd0aCAhPT0gMSB8fCBvcHRzLmhhc0RpcmVjdG9yeTtcbiAgaWYgKG9wdHMuc2ltcGxlICYmIG11bHRpcGxlKSB7XG4gICAgdGhyb3cgbmV3IEhhbmRsZWJhcnMuRXhjZXB0aW9uKCdVbmFibGUgdG8gb3V0cHV0IG11bHRpcGxlIHRlbXBsYXRlcyBpbiBzaW1wbGUgbW9kZScpO1xuICB9XG5cbiAgLy8gRm9yY2Ugc2ltcGxlIG1vZGUgaWYgd2UgaGF2ZSBvbmx5IG9uZSB0ZW1wbGF0ZSBhbmQgaXQncyB1bm5hbWVkLlxuICBpZiAoIW9wdHMuYW1kICYmICFvcHRzLmNvbW1vbmpzICYmIG9wdHMudGVtcGxhdGVzLmxlbmd0aCA9PT0gMVxuICAgICAgJiYgIW9wdHMudGVtcGxhdGVzWzBdLm5hbWUpIHtcbiAgICBvcHRzLnNpbXBsZSA9IHRydWU7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBrbm93biBsaXN0IGludG8gYSBoYXNoXG4gIGxldCBrbm93biA9IHt9O1xuICBpZiAob3B0cy5rbm93biAmJiAhQXJyYXkuaXNBcnJheShvcHRzLmtub3duKSkge1xuICAgIG9wdHMua25vd24gPSBbb3B0cy5rbm93bl07XG4gIH1cbiAgaWYgKG9wdHMua25vd24pIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gb3B0cy5rbm93bi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga25vd25bb3B0cy5rbm93bltpXV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG9iamVjdE5hbWUgPSBvcHRzLnBhcnRpYWwgPyAnSGFuZGxlYmFycy5wYXJ0aWFscycgOiAndGVtcGxhdGVzJztcblxuICBsZXQgb3V0cHV0ID0gbmV3IFNvdXJjZU5vZGUoKTtcbiAgaWYgKCFvcHRzLnNpbXBsZSkge1xuICAgIGlmIChvcHRzLmFtZCkge1xuICAgICAgb3V0cHV0LmFkZCgnZGVmaW5lKFtcXCcnICsgb3B0cy5oYW5kbGViYXJQYXRoICsgJ2hhbmRsZWJhcnMucnVudGltZVxcJ10sIGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcXG4gIEhhbmRsZWJhcnMgPSBIYW5kbGViYXJzW1wiZGVmYXVsdFwiXTsnKTtcbiAgICB9IGVsc2UgaWYgKG9wdHMuY29tbW9uanMpIHtcbiAgICAgIG91dHB1dC5hZGQoJ3ZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIicgKyBvcHRzLmNvbW1vbmpzICsgJ1wiKTsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LmFkZCgnKGZ1bmN0aW9uKCkge1xcbicpO1xuICAgIH1cbiAgICBvdXRwdXQuYWRkKCcgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMudGVtcGxhdGUsIHRlbXBsYXRlcyA9ICcpO1xuICAgIGlmIChvcHRzLm5hbWVzcGFjZSkge1xuICAgICAgb3V0cHV0LmFkZChvcHRzLm5hbWVzcGFjZSk7XG4gICAgICBvdXRwdXQuYWRkKCcgPSAnKTtcbiAgICAgIG91dHB1dC5hZGQob3B0cy5uYW1lc3BhY2UpO1xuICAgICAgb3V0cHV0LmFkZCgnIHx8ICcpO1xuICAgIH1cbiAgICBvdXRwdXQuYWRkKCd7fTtcXG4nKTtcbiAgfVxuXG4gIG9wdHMudGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGtub3duSGVscGVyczoga25vd24sXG4gICAgICBrbm93bkhlbHBlcnNPbmx5OiBvcHRzLm9cbiAgICB9O1xuXG4gICAgaWYgKG9wdHMubWFwKSB7XG4gICAgICBvcHRpb25zLnNyY05hbWUgPSB0ZW1wbGF0ZS5wYXRoO1xuICAgIH1cbiAgICBpZiAob3B0cy5kYXRhKSB7XG4gICAgICBvcHRpb25zLmRhdGEgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBwcmVjb21waWxlZCA9IEhhbmRsZWJhcnMucHJlY29tcGlsZSh0ZW1wbGF0ZS5zb3VyY2UsIG9wdGlvbnMpO1xuXG4gICAgLy8gSWYgd2UgYXJlIGdlbmVyYXRpbmcgYSBzb3VyY2UgbWFwLCB3ZSBoYXZlIHRvIHJlY29uc3RydWN0IHRoZSBTb3VyY2VOb2RlIG9iamVjdFxuICAgIGlmIChvcHRzLm1hcCkge1xuICAgICAgbGV0IGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHByZWNvbXBpbGVkLm1hcCk7XG4gICAgICBwcmVjb21waWxlZCA9IFNvdXJjZU5vZGUuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAocHJlY29tcGlsZWQuY29kZSwgY29uc3VtZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnNpbXBsZSkge1xuICAgICAgb3V0cHV0LmFkZChbcHJlY29tcGlsZWQsICdcXG4nXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGVtcGxhdGUubmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ05hbWUgbWlzc2luZyBmb3IgdGVtcGxhdGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuYW1kICYmICFtdWx0aXBsZSkge1xuICAgICAgICBvdXRwdXQuYWRkKCdyZXR1cm4gJyk7XG4gICAgICB9XG4gICAgICBvdXRwdXQuYWRkKFtvYmplY3ROYW1lLCAnW1xcJycsIHRlbXBsYXRlLm5hbWUsICdcXCddID0gdGVtcGxhdGUoJywgcHJlY29tcGlsZWQsICcpO1xcbiddKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE91dHB1dCB0aGUgY29udGVudFxuICBpZiAoIW9wdHMuc2ltcGxlKSB7XG4gICAgaWYgKG9wdHMuYW1kKSB7XG4gICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgb3V0cHV0LmFkZChbJ3JldHVybiAnLCBvYmplY3ROYW1lLCAnO1xcbiddKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dC5hZGQoJ30pOycpO1xuICAgIH0gZWxzZSBpZiAoIW9wdHMuY29tbW9uanMpIHtcbiAgICAgIG91dHB1dC5hZGQoJ30pKCk7Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMubWFwKSB7XG4gICAgb3V0cHV0LmFkZCgnXFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JyArIG9wdHMubWFwICsgJ1xcbicpO1xuICB9XG5cbiAgb3V0cHV0ID0gb3V0cHV0LnRvU3RyaW5nV2l0aFNvdXJjZU1hcCgpO1xuICBvdXRwdXQubWFwID0gb3V0cHV0Lm1hcCArICcnO1xuXG4gIGlmIChvcHRzLm1pbikge1xuICAgIG91dHB1dCA9IG1pbmlmeShvdXRwdXQsIG9wdHMubWFwKTtcbiAgfVxuXG4gIGlmIChvcHRzLm1hcCkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3B0cy5tYXAsIG91dHB1dC5tYXAsICd1dGY4Jyk7XG4gIH1cbiAgb3V0cHV0ID0gb3V0cHV0LmNvZGU7XG5cbiAgaWYgKG9wdHMub3V0cHV0KSB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhvcHRzLm91dHB1dCwgb3V0cHV0LCAndXRmOCcpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2FzdCh2YWx1ZSkge1xuICB2YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6IFtdO1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSBbdmFsdWVdO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBSdW4gdWdsaWZ5IHRvIG1pbmlmeSB0aGUgY29tcGlsZWQgdGVtcGxhdGUsIGlmIHVnbGlmeSBleGlzdHMgaW4gdGhlIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBXZSBhcmUgdXNpbmcgYHJlcXVpcmVgIGluc3RlYWQgb2YgYGltcG9ydGAgaGVyZSwgYmVjYXVzZSBlczYtbW9kdWxlcyBkbyBub3QgYWxsb3dcbiAqIGR5bmFtaWMgaW1wb3J0cyBhbmQgdWdsaWZ5LWpzIGlzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3kuIFNpbmNlIHdlIGFyZSBpbnNpZGUgTm9kZUpTIGhlcmUsIHRoaXNcbiAqIHNob3VsZCBub3QgYmUgYSBwcm9ibGVtLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvdXRwdXQgdGhlIGNvbXBpbGVkIHRlbXBsYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlTWFwRmlsZSB0aGUgZmlsZSB0byB3cml0ZSB0aGUgc291cmNlIG1hcCB0by5cbiAqL1xuZnVuY3Rpb24gbWluaWZ5KG91dHB1dCwgc291cmNlTWFwRmlsZSkge1xuICB0cnkge1xuICAgIC8vIFRyeSB0byByZXNvbHZlIHVnbGlmeS1qcyBpbiBvcmRlciB0byBzZWUgaWYgaXQgZG9lcyBleGlzdFxuICAgIHJlcXVpcmUucmVzb2x2ZSgndWdsaWZ5LWpzJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZS5jb2RlICE9PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIFNvbWV0aGluZyBlbHNlIHNlZW1zIHRvIGJlIHdyb25nXG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICAvLyBpdCBkb2VzIG5vdCBleGlzdCFcbiAgICBjb25zb2xlLmVycm9yKCdDb2RlIG1pbmltaXphdGlvbiBpcyBkaXNhYmxlZCBkdWUgdG8gbWlzc2luZyB1Z2xpZnktanMgZGVwZW5kZW5jeScpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgcmV0dXJuIHJlcXVpcmUoJ3VnbGlmeS1qcycpLm1pbmlmeShvdXRwdXQuY29kZSwge1xuICAgIHNvdXJjZU1hcDoge1xuICAgICAgY29udGVudDogb3V0cHV0Lm1hcCxcbiAgICAgIHVybDogc291cmNlTWFwRmlsZVxuICAgIH1cbiAgfSk7XG59XG4iXX0=
