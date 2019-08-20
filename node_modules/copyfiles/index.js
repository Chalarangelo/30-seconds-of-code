'use strict';
var path = require('path');
var fs = require('fs');
var glob = require('glob');
var mkdirp = require('mkdirp');
var through = require('through2').obj;
var noms = require('noms').obj;
function toStream(array) {
  var length = array.length;
  var i = 0;
  return noms(function (done) {
    if (i >= length) {
      this.push(null);
    }
    this.push(array[i++]);
    done();
  });
}
function depth(string) {
  return path.normalize(string).split(path.sep).length - 1;
}
function dealWith(inPath, up) {
  if (!up) {
    return inPath;
  }
  if (up === true) {
    return path.basename(inPath);
  }
  if (depth(inPath) < up) {
    throw new Error('cant go up that far');
  }
  return path.join.apply(path, path.normalize(inPath).split(path.sep).slice(up));
}
module.exports = copyFiles;
function copyFiles(args, config, callback) {
  if (typeof config === 'function') {
    callback = config;
    config = {
      up:0
    };
  }
  if (typeof config !== 'object' && config) {
    config = {
      up: config
    };
  }
  var opts = config.up || 0;
  var soft = config.soft;
  if (typeof callback !== 'function') {
    throw new Error('callback is not optional');
  }
  var input = args.slice();
  var outDir = input.pop();
  var globOpts = {};
  if (config.exclude) {
    globOpts.ignore = config.exclude;
  }
  if (config.all) {
    globOpts.dot = true;
  }
  toStream(input)
  .pipe(through(function (pathName, _, next) {
    var self = this;
    glob(pathName, globOpts, function (err, paths) {
      if (err) {
        return next(err);
      }
      paths.forEach(function (unglobbedPath) {
        self.push(unglobbedPath);
      });
      next();
    });
  }))
  .pipe(through(function (pathName, _, next) {
    fs.stat(pathName, function (err, pathStat) {
      if (err) {
        return next(err);
      }
      var outName = path.join(outDir, dealWith(pathName, opts));
      function done(){
        mkdirp(path.dirname(outName), function (err) {
          if (err) {
            return next(err);
          }
          next(null, pathName);
        });
      }
      if (pathStat.isDirectory()) {
        return next();
      }
      if (!pathStat.isFile()) {
        return next(new Error('how can it be neither file nor folder?'))
      }
      if (!soft) {
        return done();
      }
      fs.stat(outName, function(err){
        if(!err){
          //file exists
          return next()
        }
        if (err.code === 'ENOENT') {
          //file does not exist
          return done();
        }
        // other error
        return next(err)
      })
    });
  }))
  .pipe(through(function (pathName, _, next) {
    var outName = path.join(outDir, dealWith(pathName, opts));
    fs.createReadStream(pathName)
      .pipe(fs.createWriteStream(outName))
      .on('error', next)
      .on('finish', next);
  }))
  .on('error', callback)
  .on('finish', callback);
}
