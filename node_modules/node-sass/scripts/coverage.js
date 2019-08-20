/*!
 * node-sass: scripts/coverage.js
 */

var Mocha = require('mocha'),
  fs = require('fs'),
  path = require('path'),
  mkdirp = require('mkdirp'),
  coveralls = require('coveralls'),
  istanbul = require('istanbul'),
  sourcefiles = ['index.js', 'binding.js', 'extensions.js', 'render.js', 'errors.js'],
  summary= istanbul.Report.create('text-summary'),
  lcov = istanbul.Report.create('lcovonly', { dir: path.join('coverage') }),
  html = istanbul.Report.create('html', { dir: path.join('coverage', 'html') });

function coverage() {
  var mocha = new Mocha();
  var rep = function(runner) {
    runner.on('end', function(){
      var cov = global.__coverage__,
        collector = new istanbul.Collector();
      if (cov) {
        mkdirp(path.join('coverage', 'html'), function(err) {
          if (err) { throw err; }
          collector.add(cov);
          summary.writeReport(collector, true);
          html.writeReport(collector, true);
          lcov.on('done', function() {
            fs.readFile(path.join('coverage', 'lcov.info'), function(err, data) {
              if (err) { console.error(err); }
              coveralls.handleInput(data.toString(),
                   function (err) { if (err) { console.error(err); } });
            });
          });
          lcov.writeReport(collector, true);
        });
      } else {
        console.warn('No coverage');
      }
    });
  };
  var instrumenter = new istanbul.Instrumenter();
  var instrumentedfiles = [];
  var processfile = function(source) {
    fs.readFile(path.join('lib', source), function(err, data) {
      if (err) { throw err; }
      mkdirp('lib-cov', function(err) {
        if (err) { throw err; }
        fs.writeFile(path.join('lib-cov', source),
               instrumenter.instrumentSync(data.toString(),
                 path.join('lib', source)),
               function(err) {
                 if (err) { throw err; }
                 instrumentedfiles.push(source);
                 if (instrumentedfiles.length === sourcefiles.length) {
                   fs.readdirSync('test').filter(function(file){
                     return file.substr(-6)  === 'api.js' ||
                            file.substr(-11) === 'runtime.js' ||
                            file.substr(-7)  === 'spec.js';
                   }).forEach(function(file){
                     mocha.addFile(
                       path.join('test', file)
                     );
                   });
                   process.env.NODESASS_COV = 1;
                   mocha.reporter(rep).run(function(failures) {
                     process.on('exit', function () {
                       process.exit(failures);
                     });
                   });
                 }
               });
      });
    });
  };
  for (var i in sourcefiles) {
    processfile(sourcefiles[i]);
  }
}

/**
 * Run
 */

coverage();
