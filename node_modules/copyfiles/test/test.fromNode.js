'use strict';
var test = require('tape');
var copyfiles = require('../');
var rimraf = require('rimraf');
var fs = require('fs');
var mkdirp = require('mkdirp');
var cp = require('child_process');

function after(t) {
  rimraf('output', function (err) {
    t.error(err, 'rm out');
    rimraf('input', function (err) {
      t.error(err, 'rm input');
      t.end();
    });
  });
}
function before(t) {
  mkdirp('input/other', function (err) {
    t.error(err, 'rm input');
    t.end();
  });
}

test('normal', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/c.js', 'c');
    copyfiles(['input/*.txt', 'output'], function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output/input', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('exclude', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/c.js.txt', 'c');
    copyfiles( ['input/*.txt', 'output'], {
      exclude: '**/*.js.txt'
    }, function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output/input', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('all', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/.c.txt', 'c');
    copyfiles( ['input/*.txt', 'output'], {
      all: true
    }, function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output/input', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['.c.txt', 'a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('all from cl', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/.c.txt', 'c');
    cp.spawnSync('./copyfiles', ['-a', 'input/*.txt', 'output']);
    fs.readdir('output/input', function (err, files) {
      t.error(err, 'readdir');
      t.deepEquals(files, ['.c.txt', 'a.txt', 'b.txt'], 'correct number of things');
      t.end();
    });
  });
  t.test('teardown', after);
});
test('all from cl 2', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/.c.txt', 'c');
    cp.spawnSync('./copyfiles', ['--all', 'input/*.txt', 'output']);
    fs.readdir('output/input', function (err, files) {
      t.error(err, 'readdir');
      t.deepEquals(files, ['.c.txt', 'a.txt', 'b.txt'], 'correct number of things');
      t.end();
    });
  });
  t.test('teardown', after);
});
test('soft', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    mkdirp('output/input/other', function(){
      fs.writeFileSync('input/a.txt', 'inputA');
      fs.writeFileSync('output/input/a.txt', 'outputA');
      t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
      fs.writeFileSync('input/b.txt', 'b');
      fs.writeFileSync('input/other/c.txt', 'inputC');
      fs.writeFileSync('output/input/other/c.txt', 'outputC');
      fs.writeFileSync('input/other/d.txt', 'd');
      copyfiles(['input/**/*.txt', 'output'], {soft:true}, function (err) {
        t.error(err, 'copyfiles');
        fs.readdir('output/input', function (err, files) {
          t.error(err, 'readdir');
          t.deepEquals(files, ['a.txt', 'b.txt', 'other'], 'correct number of things');
          t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
          t.equal( fs.readFileSync('output/input/b.txt').toString(), 'b')
          t.equal( fs.readFileSync('output/input/other/c.txt').toString(), 'outputC')
          t.end();
        });
      });
    })
  });
  t.test('teardown', after);
});
test('soft from cl', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    mkdirp('output/input/other', function(){
      fs.writeFileSync('input/a.txt', 'inputA');
      fs.writeFileSync('output/input/a.txt', 'outputA');
      t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
      fs.writeFileSync('input/b.txt', 'b');
      fs.writeFileSync('input/other/c.txt', 'inputC');
      fs.writeFileSync('output/input/other/c.txt', 'outputC');
      fs.writeFileSync('input/other/d.txt', 'd');
      cp.spawnSync('./copyfiles', ['-s', 'input/**/*.txt', 'output']);

      fs.readdir('output/input', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt', 'other'], 'correct number of things');
        t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
        t.equal( fs.readFileSync('output/input/b.txt').toString(), 'b')
        t.equal( fs.readFileSync('output/input/other/c.txt').toString(), 'outputC')
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('soft from cl 2', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    mkdirp('output/input/other', function(){
      fs.writeFileSync('input/a.txt', 'inputA');
      fs.writeFileSync('output/input/a.txt', 'outputA');
      t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
      fs.writeFileSync('input/b.txt', 'b');
      fs.writeFileSync('input/other/c.txt', 'inputC');
      fs.writeFileSync('output/input/other/c.txt', 'outputC');
      fs.writeFileSync('input/other/d.txt', 'd');
      cp.spawnSync('./copyfiles', ['--soft', 'input/**/*.txt', 'output']);

      fs.readdir('output/input', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt', 'other'], 'correct number of things');
        t.equal( fs.readFileSync('output/input/a.txt').toString(), 'outputA' )
        t.equal( fs.readFileSync('output/input/b.txt').toString(), 'b')
        t.equal( fs.readFileSync('output/input/other/c.txt').toString(), 'outputC')
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('with up', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/c.js', 'c');
    copyfiles(['input/*.txt', 'output'], 1, function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});

test('with up 2', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/other/a.txt', 'a');
    fs.writeFileSync('input/other/b.txt', 'b');
    fs.writeFileSync('input/other/c.js', 'c');
    copyfiles(['input/**/*.txt', 'output'], 2, function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
test('flatten', function (t) {
  t.test('setup', before);
  t.test('copy stuff', function (t) {
    fs.writeFileSync('input/other/a.txt', 'a');
    fs.writeFileSync('input/b.txt', 'b');
    fs.writeFileSync('input/other/c.js', 'c');
    copyfiles(['input/**/*.txt', 'output'], true, function (err) {
      t.error(err, 'copyfiles');
      fs.readdir('output', function (err, files) {
        t.error(err, 'readdir');
        t.deepEquals(files, ['a.txt', 'b.txt'], 'correct number of things');
        t.end();
      });
    });
  });
  t.test('teardown', after);
});
