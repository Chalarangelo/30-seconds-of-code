define(['exports', 'neo-async', 'fs', './handlebars', 'path', 'source-map'], function (exports, _neoAsync, _fs, _handlebars, _path, _sourceMap) {
  /* eslint-disable no-console */
  'use strict';

  // istanbul ignore next

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _Async = _interopRequireDefault(_neoAsync);

  var _fs2 = _interopRequireDefault(_fs);

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
      return callback(new _handlebars.Exception('Number of names did not match the number of string inputs'));
    }

    _Async['default'].map(strings, function (string, callback) {
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
    _Async['default'].whilst(function () {
      return queue.length;
    }, function (callback) {
      var _queue$shift = queue.shift();

      var path = _queue$shift.template;
      var root = _queue$shift.root;

      _fs2['default'].stat(path, function (err, stat) {
        if (err) {
          return callback(new _handlebars.Exception('Unable to open template file "' + path + '"'));
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
      console.log(_handlebars.VERSION);
      return;
    }

    if (!opts.templates.length && !opts.hasDirectory) {
      throw new _handlebars.Exception('Must define at least one template or directory.');
    }

    if (opts.simple && opts.min) {
      throw new _handlebars.Exception('Unable to minimize simple output');
    }

    var multiple = opts.templates.length !== 1 || opts.hasDirectory;
    if (opts.simple && multiple) {
      throw new _handlebars.Exception('Unable to output multiple templates in simple mode');
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

      var precompiled = _handlebars.precompile(template.source, options);

      // If we are generating a source map, we have to reconstruct the SourceNode object
      if (opts.map) {
        var consumer = new _sourceMap.SourceMapConsumer(precompiled.map);
        precompiled = _sourceMap.SourceNode.fromStringWithSourceMap(precompiled.code, consumer);
      }

      if (opts.simple) {
        output.add([precompiled, '\n']);
      } else {
        if (!template.name) {
          throw new _handlebars.Exception('Name missing for template');
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
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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KiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5pbXBvcnQgQXN5bmMgZnJvbSAnbmVvLWFzeW5jJztcbmltcG9ydCBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBIYW5kbGViYXJzIGZyb20gJy4vaGFuZGxlYmFycyc7XG5pbXBvcnQge2Jhc2VuYW1lfSBmcm9tICdwYXRoJztcbmltcG9ydCB7U291cmNlTWFwQ29uc3VtZXIsIFNvdXJjZU5vZGV9IGZyb20gJ3NvdXJjZS1tYXAnO1xuXG5cbm1vZHVsZS5leHBvcnRzLmxvYWRUZW1wbGF0ZXMgPSBmdW5jdGlvbihvcHRzLCBjYWxsYmFjaykge1xuICBsb2FkU3RyaW5ncyhvcHRzLCBmdW5jdGlvbihlcnIsIHN0cmluZ3MpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2FkRmlsZXMob3B0cywgZnVuY3Rpb24oZXJyLCBmaWxlcykge1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgY2FsbGJhY2soZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvcHRzLnRlbXBsYXRlcyA9IHN0cmluZ3MuY29uY2F0KGZpbGVzKTtcbiAgICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIG9wdHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xufTtcblxuZnVuY3Rpb24gbG9hZFN0cmluZ3Mob3B0cywgY2FsbGJhY2spIHtcbiAgbGV0IHN0cmluZ3MgPSBhcnJheUNhc3Qob3B0cy5zdHJpbmcpLFxuICAgICAgbmFtZXMgPSBhcnJheUNhc3Qob3B0cy5uYW1lKTtcblxuICBpZiAobmFtZXMubGVuZ3RoICE9PSBzdHJpbmdzLmxlbmd0aFxuICAgICAgJiYgc3RyaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBIYW5kbGViYXJzLkV4Y2VwdGlvbignTnVtYmVyIG9mIG5hbWVzIGRpZCBub3QgbWF0Y2ggdGhlIG51bWJlciBvZiBzdHJpbmcgaW5wdXRzJykpO1xuICB9XG5cbiAgQXN5bmMubWFwKHN0cmluZ3MsIGZ1bmN0aW9uKHN0cmluZywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChzdHJpbmcgIT09ICctJykge1xuICAgICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHN0cmluZyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBMb2FkIGZyb20gc3RkaW5cbiAgICAgICAgbGV0IGJ1ZmZlciA9ICcnO1xuICAgICAgICBwcm9jZXNzLnN0ZGluLnNldEVuY29kaW5nKCd1dGY4Jyk7XG5cbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5vbignZGF0YScsIGZ1bmN0aW9uKGNodW5rKSB7XG4gICAgICAgICAgYnVmZmVyICs9IGNodW5rO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvY2Vzcy5zdGRpbi5vbignZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgY2FsbGJhY2sodW5kZWZpbmVkLCBidWZmZXIpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGZ1bmN0aW9uKGVyciwgc3RyaW5ncykge1xuICAgICAgc3RyaW5ncyA9IHN0cmluZ3MubWFwKChzdHJpbmcsIGluZGV4KSA9PiAoe1xuICAgICAgICBuYW1lOiBuYW1lc1tpbmRleF0sXG4gICAgICAgIHBhdGg6IG5hbWVzW2luZGV4XSxcbiAgICAgICAgc291cmNlOiBzdHJpbmdcbiAgICAgIH0pKTtcbiAgICAgIGNhbGxiYWNrKGVyciwgc3RyaW5ncyk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRGaWxlcyhvcHRzLCBjYWxsYmFjaykge1xuICAvLyBCdWlsZCBmaWxlIGV4dGVuc2lvbiBwYXR0ZXJuXG4gIGxldCBleHRlbnNpb24gPSAob3B0cy5leHRlbnNpb24gfHwgJ2hhbmRsZWJhcnMnKS5yZXBsYWNlKC9bXFxcXF4kKis/LigpOj0hfHt9XFwtW1xcXV0vZywgZnVuY3Rpb24oYXJnKSB7IHJldHVybiAnXFxcXCcgKyBhcmc7IH0pO1xuICBleHRlbnNpb24gPSBuZXcgUmVnRXhwKCdcXFxcLicgKyBleHRlbnNpb24gKyAnJCcpO1xuXG4gIGxldCByZXQgPSBbXSxcbiAgICAgIHF1ZXVlID0gKG9wdHMuZmlsZXMgfHwgW10pLm1hcCgodGVtcGxhdGUpID0+ICh7dGVtcGxhdGUsIHJvb3Q6IG9wdHMucm9vdH0pKTtcbiAgQXN5bmMud2hpbHN0KCgpID0+IHF1ZXVlLmxlbmd0aCwgZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBsZXQge3RlbXBsYXRlOiBwYXRoLCByb290fSA9IHF1ZXVlLnNoaWZ0KCk7XG5cbiAgICBmcy5zdGF0KHBhdGgsIGZ1bmN0aW9uKGVyciwgc3RhdCkge1xuICAgICAgaWYgKGVycikge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sobmV3IEhhbmRsZWJhcnMuRXhjZXB0aW9uKGBVbmFibGUgdG8gb3BlbiB0ZW1wbGF0ZSBmaWxlIFwiJHtwYXRofVwiYCkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgIG9wdHMuaGFzRGlyZWN0b3J5ID0gdHJ1ZTtcblxuICAgICAgICBmcy5yZWFkZGlyKHBhdGgsIGZ1bmN0aW9uKGVyciwgY2hpbGRyZW4pIHtcbiAgICAgICAgICAvKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCA6IFJhY2UgY29uZGl0aW9uIHRoYXQgYmVpbmcgdG9vIGxhenkgdG8gdGVzdCAqL1xuICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhlcnIpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKGZpbGUpIHtcbiAgICAgICAgICAgIGxldCBjaGlsZFBhdGggPSBwYXRoICsgJy8nICsgZmlsZTtcblxuICAgICAgICAgICAgaWYgKGV4dGVuc2lvbi50ZXN0KGNoaWxkUGF0aCkgfHwgZnMuc3RhdFN5bmMoY2hpbGRQYXRoKS5pc0RpcmVjdG9yeSgpKSB7XG4gICAgICAgICAgICAgIHF1ZXVlLnB1c2goe3RlbXBsYXRlOiBjaGlsZFBhdGgsIHJvb3Q6IHJvb3QgfHwgcGF0aH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcy5yZWFkRmlsZShwYXRoLCAndXRmOCcsIGZ1bmN0aW9uKGVyciwgZGF0YSkge1xuICAgICAgICAgIC8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0IDogUmFjZSBjb25kaXRpb24gdGhhdCBiZWluZyB0b28gbGF6eSB0byB0ZXN0ICovXG4gICAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVycik7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKG9wdHMuYm9tICYmIGRhdGEuaW5kZXhPZignXFx1RkVGRicpID09PSAwKSB7XG4gICAgICAgICAgICBkYXRhID0gZGF0YS5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gQ2xlYW4gdGhlIHRlbXBsYXRlIG5hbWVcbiAgICAgICAgICBsZXQgbmFtZSA9IHBhdGg7XG4gICAgICAgICAgaWYgKCFyb290KSB7XG4gICAgICAgICAgICBuYW1lID0gYmFzZW5hbWUobmFtZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2Yocm9vdCkgPT09IDApIHtcbiAgICAgICAgICAgIG5hbWUgPSBuYW1lLnN1YnN0cmluZyhyb290Lmxlbmd0aCArIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBuYW1lID0gbmFtZS5yZXBsYWNlKGV4dGVuc2lvbiwgJycpO1xuXG4gICAgICAgICAgcmV0LnB1c2goe1xuICAgICAgICAgICAgcGF0aDogcGF0aCxcbiAgICAgICAgICAgIG5hbWU6IG5hbWUsXG4gICAgICAgICAgICBzb3VyY2U6IGRhdGFcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuICBmdW5jdGlvbihlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBjYWxsYmFjayhlcnIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjYWxsYmFjayh1bmRlZmluZWQsIHJldCk7XG4gICAgfVxuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMuY2xpID0gZnVuY3Rpb24ob3B0cykge1xuICBpZiAob3B0cy52ZXJzaW9uKSB7XG4gICAgY29uc29sZS5sb2coSGFuZGxlYmFycy5WRVJTSU9OKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIW9wdHMudGVtcGxhdGVzLmxlbmd0aCAmJiAhb3B0cy5oYXNEaXJlY3RvcnkpIHtcbiAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ011c3QgZGVmaW5lIGF0IGxlYXN0IG9uZSB0ZW1wbGF0ZSBvciBkaXJlY3RvcnkuJyk7XG4gIH1cblxuICBpZiAob3B0cy5zaW1wbGUgJiYgb3B0cy5taW4pIHtcbiAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ1VuYWJsZSB0byBtaW5pbWl6ZSBzaW1wbGUgb3V0cHV0Jyk7XG4gIH1cblxuICBjb25zdCBtdWx0aXBsZSA9IG9wdHMudGVtcGxhdGVzLmxlbmd0aCAhPT0gMSB8fCBvcHRzLmhhc0RpcmVjdG9yeTtcbiAgaWYgKG9wdHMuc2ltcGxlICYmIG11bHRpcGxlKSB7XG4gICAgdGhyb3cgbmV3IEhhbmRsZWJhcnMuRXhjZXB0aW9uKCdVbmFibGUgdG8gb3V0cHV0IG11bHRpcGxlIHRlbXBsYXRlcyBpbiBzaW1wbGUgbW9kZScpO1xuICB9XG5cbiAgLy8gRm9yY2Ugc2ltcGxlIG1vZGUgaWYgd2UgaGF2ZSBvbmx5IG9uZSB0ZW1wbGF0ZSBhbmQgaXQncyB1bm5hbWVkLlxuICBpZiAoIW9wdHMuYW1kICYmICFvcHRzLmNvbW1vbmpzICYmIG9wdHMudGVtcGxhdGVzLmxlbmd0aCA9PT0gMVxuICAgICAgJiYgIW9wdHMudGVtcGxhdGVzWzBdLm5hbWUpIHtcbiAgICBvcHRzLnNpbXBsZSA9IHRydWU7XG4gIH1cblxuICAvLyBDb252ZXJ0IHRoZSBrbm93biBsaXN0IGludG8gYSBoYXNoXG4gIGxldCBrbm93biA9IHt9O1xuICBpZiAob3B0cy5rbm93biAmJiAhQXJyYXkuaXNBcnJheShvcHRzLmtub3duKSkge1xuICAgIG9wdHMua25vd24gPSBbb3B0cy5rbm93bl07XG4gIH1cbiAgaWYgKG9wdHMua25vd24pIHtcbiAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gb3B0cy5rbm93bi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAga25vd25bb3B0cy5rbm93bltpXV0gPSB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IG9iamVjdE5hbWUgPSBvcHRzLnBhcnRpYWwgPyAnSGFuZGxlYmFycy5wYXJ0aWFscycgOiAndGVtcGxhdGVzJztcblxuICBsZXQgb3V0cHV0ID0gbmV3IFNvdXJjZU5vZGUoKTtcbiAgaWYgKCFvcHRzLnNpbXBsZSkge1xuICAgIGlmIChvcHRzLmFtZCkge1xuICAgICAgb3V0cHV0LmFkZCgnZGVmaW5lKFtcXCcnICsgb3B0cy5oYW5kbGViYXJQYXRoICsgJ2hhbmRsZWJhcnMucnVudGltZVxcJ10sIGZ1bmN0aW9uKEhhbmRsZWJhcnMpIHtcXG4gIEhhbmRsZWJhcnMgPSBIYW5kbGViYXJzW1wiZGVmYXVsdFwiXTsnKTtcbiAgICB9IGVsc2UgaWYgKG9wdHMuY29tbW9uanMpIHtcbiAgICAgIG91dHB1dC5hZGQoJ3ZhciBIYW5kbGViYXJzID0gcmVxdWlyZShcIicgKyBvcHRzLmNvbW1vbmpzICsgJ1wiKTsnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0cHV0LmFkZCgnKGZ1bmN0aW9uKCkge1xcbicpO1xuICAgIH1cbiAgICBvdXRwdXQuYWRkKCcgIHZhciB0ZW1wbGF0ZSA9IEhhbmRsZWJhcnMudGVtcGxhdGUsIHRlbXBsYXRlcyA9ICcpO1xuICAgIGlmIChvcHRzLm5hbWVzcGFjZSkge1xuICAgICAgb3V0cHV0LmFkZChvcHRzLm5hbWVzcGFjZSk7XG4gICAgICBvdXRwdXQuYWRkKCcgPSAnKTtcbiAgICAgIG91dHB1dC5hZGQob3B0cy5uYW1lc3BhY2UpO1xuICAgICAgb3V0cHV0LmFkZCgnIHx8ICcpO1xuICAgIH1cbiAgICBvdXRwdXQuYWRkKCd7fTtcXG4nKTtcbiAgfVxuXG4gIG9wdHMudGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24odGVtcGxhdGUpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgIGtub3duSGVscGVyczoga25vd24sXG4gICAgICBrbm93bkhlbHBlcnNPbmx5OiBvcHRzLm9cbiAgICB9O1xuXG4gICAgaWYgKG9wdHMubWFwKSB7XG4gICAgICBvcHRpb25zLnNyY05hbWUgPSB0ZW1wbGF0ZS5wYXRoO1xuICAgIH1cbiAgICBpZiAob3B0cy5kYXRhKSB7XG4gICAgICBvcHRpb25zLmRhdGEgPSB0cnVlO1xuICAgIH1cblxuICAgIGxldCBwcmVjb21waWxlZCA9IEhhbmRsZWJhcnMucHJlY29tcGlsZSh0ZW1wbGF0ZS5zb3VyY2UsIG9wdGlvbnMpO1xuXG4gICAgLy8gSWYgd2UgYXJlIGdlbmVyYXRpbmcgYSBzb3VyY2UgbWFwLCB3ZSBoYXZlIHRvIHJlY29uc3RydWN0IHRoZSBTb3VyY2VOb2RlIG9iamVjdFxuICAgIGlmIChvcHRzLm1hcCkge1xuICAgICAgbGV0IGNvbnN1bWVyID0gbmV3IFNvdXJjZU1hcENvbnN1bWVyKHByZWNvbXBpbGVkLm1hcCk7XG4gICAgICBwcmVjb21waWxlZCA9IFNvdXJjZU5vZGUuZnJvbVN0cmluZ1dpdGhTb3VyY2VNYXAocHJlY29tcGlsZWQuY29kZSwgY29uc3VtZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRzLnNpbXBsZSkge1xuICAgICAgb3V0cHV0LmFkZChbcHJlY29tcGlsZWQsICdcXG4nXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghdGVtcGxhdGUubmFtZSkge1xuICAgICAgICB0aHJvdyBuZXcgSGFuZGxlYmFycy5FeGNlcHRpb24oJ05hbWUgbWlzc2luZyBmb3IgdGVtcGxhdGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdHMuYW1kICYmICFtdWx0aXBsZSkge1xuICAgICAgICBvdXRwdXQuYWRkKCdyZXR1cm4gJyk7XG4gICAgICB9XG4gICAgICBvdXRwdXQuYWRkKFtvYmplY3ROYW1lLCAnW1xcJycsIHRlbXBsYXRlLm5hbWUsICdcXCddID0gdGVtcGxhdGUoJywgcHJlY29tcGlsZWQsICcpO1xcbiddKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIE91dHB1dCB0aGUgY29udGVudFxuICBpZiAoIW9wdHMuc2ltcGxlKSB7XG4gICAgaWYgKG9wdHMuYW1kKSB7XG4gICAgICBpZiAobXVsdGlwbGUpIHtcbiAgICAgICAgb3V0cHV0LmFkZChbJ3JldHVybiAnLCBvYmplY3ROYW1lLCAnO1xcbiddKTtcbiAgICAgIH1cbiAgICAgIG91dHB1dC5hZGQoJ30pOycpO1xuICAgIH0gZWxzZSBpZiAoIW9wdHMuY29tbW9uanMpIHtcbiAgICAgIG91dHB1dC5hZGQoJ30pKCk7Jyk7XG4gICAgfVxuICB9XG5cbiAgaWYgKG9wdHMubWFwKSB7XG4gICAgb3V0cHV0LmFkZCgnXFxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JyArIG9wdHMubWFwICsgJ1xcbicpO1xuICB9XG5cbiAgb3V0cHV0ID0gb3V0cHV0LnRvU3RyaW5nV2l0aFNvdXJjZU1hcCgpO1xuICBvdXRwdXQubWFwID0gb3V0cHV0Lm1hcCArICcnO1xuXG4gIGlmIChvcHRzLm1pbikge1xuICAgIG91dHB1dCA9IG1pbmlmeShvdXRwdXQsIG9wdHMubWFwKTtcbiAgfVxuXG4gIGlmIChvcHRzLm1hcCkge1xuICAgIGZzLndyaXRlRmlsZVN5bmMob3B0cy5tYXAsIG91dHB1dC5tYXAsICd1dGY4Jyk7XG4gIH1cbiAgb3V0cHV0ID0gb3V0cHV0LmNvZGU7XG5cbiAgaWYgKG9wdHMub3V0cHV0KSB7XG4gICAgZnMud3JpdGVGaWxlU3luYyhvcHRzLm91dHB1dCwgb3V0cHV0LCAndXRmOCcpO1xuICB9IGVsc2Uge1xuICAgIGNvbnNvbGUubG9nKG91dHB1dCk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGFycmF5Q2FzdCh2YWx1ZSkge1xuICB2YWx1ZSA9IHZhbHVlICE9IG51bGwgPyB2YWx1ZSA6IFtdO1xuICBpZiAoIUFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgdmFsdWUgPSBbdmFsdWVdO1xuICB9XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBSdW4gdWdsaWZ5IHRvIG1pbmlmeSB0aGUgY29tcGlsZWQgdGVtcGxhdGUsIGlmIHVnbGlmeSBleGlzdHMgaW4gdGhlIGRlcGVuZGVuY2llcy5cbiAqXG4gKiBXZSBhcmUgdXNpbmcgYHJlcXVpcmVgIGluc3RlYWQgb2YgYGltcG9ydGAgaGVyZSwgYmVjYXVzZSBlczYtbW9kdWxlcyBkbyBub3QgYWxsb3dcbiAqIGR5bmFtaWMgaW1wb3J0cyBhbmQgdWdsaWZ5LWpzIGlzIGFuIG9wdGlvbmFsIGRlcGVuZGVuY3kuIFNpbmNlIHdlIGFyZSBpbnNpZGUgTm9kZUpTIGhlcmUsIHRoaXNcbiAqIHNob3VsZCBub3QgYmUgYSBwcm9ibGVtLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBvdXRwdXQgdGhlIGNvbXBpbGVkIHRlbXBsYXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc291cmNlTWFwRmlsZSB0aGUgZmlsZSB0byB3cml0ZSB0aGUgc291cmNlIG1hcCB0by5cbiAqL1xuZnVuY3Rpb24gbWluaWZ5KG91dHB1dCwgc291cmNlTWFwRmlsZSkge1xuICB0cnkge1xuICAgIC8vIFRyeSB0byByZXNvbHZlIHVnbGlmeS1qcyBpbiBvcmRlciB0byBzZWUgaWYgaXQgZG9lcyBleGlzdFxuICAgIHJlcXVpcmUucmVzb2x2ZSgndWdsaWZ5LWpzJyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBpZiAoZS5jb2RlICE9PSAnTU9EVUxFX05PVF9GT1VORCcpIHtcbiAgICAgIC8vIFNvbWV0aGluZyBlbHNlIHNlZW1zIHRvIGJlIHdyb25nXG4gICAgICB0aHJvdyBlO1xuICAgIH1cbiAgICAvLyBpdCBkb2VzIG5vdCBleGlzdCFcbiAgICBjb25zb2xlLmVycm9yKCdDb2RlIG1pbmltaXphdGlvbiBpcyBkaXNhYmxlZCBkdWUgdG8gbWlzc2luZyB1Z2xpZnktanMgZGVwZW5kZW5jeScpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH1cbiAgcmV0dXJuIHJlcXVpcmUoJ3VnbGlmeS1qcycpLm1pbmlmeShvdXRwdXQuY29kZSwge1xuICAgIHNvdXJjZU1hcDoge1xuICAgICAgY29udGVudDogb3V0cHV0Lm1hcCxcbiAgICAgIHVybDogc291cmNlTWFwRmlsZVxuICAgIH1cbiAgfSk7XG59XG4iXX0=
