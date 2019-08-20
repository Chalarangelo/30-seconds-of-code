var path = require('path');
var test = require('tape');
var resolve = require('../');

test('mock', function (t) {
    t.plan(4);

    var files = {};
    files[path.resolve('/foo/bar/baz.js')] = 'beep';

    var dirs = {};
    dirs[path.resolve('/foo/bar')] = true;

    function opts(basedir) {
        return {
            basedir: path.resolve(basedir),
            isFile: function (file) {
                return Object.prototype.hasOwnProperty.call(files, path.resolve(file));
            },
            isDirectory: function (dir) {
                return !!dirs[path.resolve(dir)];
            },
            readFileSync: function (file) {
                return files[path.resolve(file)];
            }
        };
    }

    t.equal(
        resolve.sync('./baz', opts('/foo/bar')),
        path.resolve('/foo/bar/baz.js')
    );

    t.equal(
        resolve.sync('./baz.js', opts('/foo/bar')),
        path.resolve('/foo/bar/baz.js')
    );

    t.throws(function () {
        resolve.sync('baz', opts('/foo/bar'));
    });

    t.throws(function () {
        resolve.sync('../baz', opts('/foo/bar'));
    });
});

test('mock package', function (t) {
    t.plan(1);

    var files = {};
    files[path.resolve('/foo/node_modules/bar/baz.js')] = 'beep';
    files[path.resolve('/foo/node_modules/bar/package.json')] = JSON.stringify({
        main: './baz.js'
    });

    var dirs = {};
    dirs[path.resolve('/foo')] = true;
    dirs[path.resolve('/foo/node_modules')] = true;

    function opts(basedir) {
        return {
            basedir: path.resolve(basedir),
            isFile: function (file) {
                return Object.prototype.hasOwnProperty.call(files, path.resolve(file));
            },
            isDirectory: function (dir) {
                return !!dirs[path.resolve(dir)];
            },
            readFileSync: function (file) {
                return files[path.resolve(file)];
            }
        };
    }

    t.equal(
        resolve.sync('bar', opts('/foo')),
        path.resolve('/foo/node_modules/bar/baz.js')
    );
});
