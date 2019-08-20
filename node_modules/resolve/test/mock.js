var path = require('path');
var test = require('tape');
var resolve = require('../');

test('mock', function (t) {
    t.plan(8);

    var files = {};
    files[path.resolve('/foo/bar/baz.js')] = 'beep';

    var dirs = {};
    dirs[path.resolve('/foo/bar')] = true;

    function opts(basedir) {
        return {
            basedir: path.resolve(basedir),
            isFile: function (file, cb) {
                cb(null, Object.prototype.hasOwnProperty.call(files, path.resolve(file)));
            },
            isDirectory: function (dir, cb) {
                cb(null, !!dirs[path.resolve(dir)]);
            },
            readFile: function (file, cb) {
                cb(null, files[path.resolve(file)]);
            }
        };
    }

    resolve('./baz', opts('/foo/bar'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/bar/baz.js'));
        t.equal(pkg, undefined);
    });

    resolve('./baz.js', opts('/foo/bar'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/bar/baz.js'));
        t.equal(pkg, undefined);
    });

    resolve('baz', opts('/foo/bar'), function (err, res) {
        t.equal(err.message, "Cannot find module 'baz' from '" + path.resolve('/foo/bar') + "'");
        t.equal(err.code, 'MODULE_NOT_FOUND');
    });

    resolve('../baz', opts('/foo/bar'), function (err, res) {
        t.equal(err.message, "Cannot find module '../baz' from '" + path.resolve('/foo/bar') + "'");
        t.equal(err.code, 'MODULE_NOT_FOUND');
    });
});

test('mock from package', function (t) {
    t.plan(8);

    var files = {};
    files[path.resolve('/foo/bar/baz.js')] = 'beep';

    var dirs = {};
    dirs[path.resolve('/foo/bar')] = true;

    function opts(basedir) {
        return {
            basedir: path.resolve(basedir),
            isFile: function (file, cb) {
                cb(null, Object.prototype.hasOwnProperty.call(files, file));
            },
            isDirectory: function (dir, cb) {
                cb(null, !!dirs[path.resolve(dir)]);
            },
            'package': { main: 'bar' },
            readFile: function (file, cb) {
                cb(null, files[file]);
            }
        };
    }

    resolve('./baz', opts('/foo/bar'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/bar/baz.js'));
        t.equal(pkg && pkg.main, 'bar');
    });

    resolve('./baz.js', opts('/foo/bar'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/bar/baz.js'));
        t.equal(pkg && pkg.main, 'bar');
    });

    resolve('baz', opts('/foo/bar'), function (err, res) {
        t.equal(err.message, "Cannot find module 'baz' from '" + path.resolve('/foo/bar') + "'");
        t.equal(err.code, 'MODULE_NOT_FOUND');
    });

    resolve('../baz', opts('/foo/bar'), function (err, res) {
        t.equal(err.message, "Cannot find module '../baz' from '" + path.resolve('/foo/bar') + "'");
        t.equal(err.code, 'MODULE_NOT_FOUND');
    });
});

test('mock package', function (t) {
    t.plan(2);

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
            isFile: function (file, cb) {
                cb(null, Object.prototype.hasOwnProperty.call(files, path.resolve(file)));
            },
            isDirectory: function (dir, cb) {
                cb(null, !!dirs[path.resolve(dir)]);
            },
            readFile: function (file, cb) {
                cb(null, files[path.resolve(file)]);
            }
        };
    }

    resolve('bar', opts('/foo'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/node_modules/bar/baz.js'));
        t.equal(pkg && pkg.main, './baz.js');
    });
});

test('mock package from package', function (t) {
    t.plan(2);

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
            isFile: function (file, cb) {
                cb(null, Object.prototype.hasOwnProperty.call(files, path.resolve(file)));
            },
            isDirectory: function (dir, cb) {
                cb(null, !!dirs[path.resolve(dir)]);
            },
            'package': { main: 'bar' },
            readFile: function (file, cb) {
                cb(null, files[path.resolve(file)]);
            }
        };
    }

    resolve('bar', opts('/foo'), function (err, res, pkg) {
        if (err) return t.fail(err);
        t.equal(res, path.resolve('/foo/node_modules/bar/baz.js'));
        t.equal(pkg && pkg.main, './baz.js');
    });
});
