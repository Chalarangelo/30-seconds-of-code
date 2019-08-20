/*eslint new-cap: ["error", {"capIsNewExceptions": ["Color"]}]*/

var assert = require('assert'),
  fs = require('fs'),
  path = require('path'),
  read = fs.readFileSync,
  sassPath = process.env.NODESASS_COV
      ? require.resolve('../lib-cov')
      : require.resolve('../lib'),
  sass = require(sassPath),
  fixture = path.join.bind(null, __dirname, 'fixtures'),
  resolveFixture = path.resolve.bind(null, __dirname, 'fixtures');

describe('api', function() {

  describe('.render(options, callback)', function() {

    beforeEach(function() {
      delete process.env.SASS_PATH;
    });

    it('should compile sass to css with file', function(done) {
      var expected = read(fixture('simple/expected.css'), 'utf8').trim();

      sass.render({
        file: fixture('simple/index.scss')
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should compile sass to css with outFile set to absolute url', function(done) {
      sass.render({
        file: fixture('simple/index.scss'),
        sourceMap: true,
        outFile: fixture('simple/index-test.css')
      }, function(error, result) {
        assert.equal(JSON.parse(result.map).file, 'index-test.css');
        done();
      });
    });

    it('should compile sass to css with outFile set to relative url', function(done) {
      sass.render({
        file: fixture('simple/index.scss'),
        sourceMap: true,
        outFile: './index-test.css'
      }, function(error, result) {
        assert.equal(JSON.parse(result.map).file, 'index-test.css');
        done();
      });
    });

    it('should compile sass to css with outFile and sourceMap set to relative url', function(done) {
      sass.render({
        file: fixture('simple/index.scss'),
        sourceMap: './deep/nested/index.map',
        outFile: './index-test.css'
      }, function(error, result) {
        assert.equal(JSON.parse(result.map).file, '../../index-test.css');
        done();
      });
    });

    it('should compile generate map with sourceMapRoot pass-through option', function(done) {
      sass.render({
        file: fixture('simple/index.scss'),
        sourceMap: './deep/nested/index.map',
        sourceMapRoot: 'http://test.com/',
        outFile: './index-test.css'
      }, function(error, result) {
        assert.equal(JSON.parse(result.map).sourceRoot, 'http://test.com/');
        done();
      });
    });

    it('should compile sass to css with data', function(done) {
      var src = read(fixture('simple/index.scss'), 'utf8');
      var expected = read(fixture('simple/expected.css'), 'utf8').trim();

      sass.render({
        data: src
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should compile sass to css using indented syntax', function(done) {
      var src = read(fixture('indent/index.sass'), 'utf8');
      var expected = read(fixture('indent/expected.css'), 'utf8').trim();

      sass.render({
        data: src,
        indentedSyntax: true
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should NOT compile empty data string', function(done) {
      sass.render({
        data: ''
      }, function(error) {
        assert.equal(error.message, 'No input specified: provide a file name or a source string to process');
        done();
      });
    });

    it('should NOT compile without any input', function(done) {
      sass.render({ }, function(error) {
        assert.equal(error.message, 'No input specified: provide a file name or a source string to process');
        done();
      });
    });

    it('should returnn error status 1 for bad input', function(done) {
      sass.render({
        data: '#navbar width 80%;'
      }, function(error) {
        assert(error.message);
        assert.equal(error.status, 1);
        done();
      });
    });

    it('should compile with include paths', function(done) {
      var src = read(fixture('include-path/index.scss'), 'utf8');
      var expected = read(fixture('include-path/expected.css'), 'utf8').trim();

      sass.render({
        data: src,
        includePaths: [
          fixture('include-path/functions'),
          fixture('include-path/lib')
        ]
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should add cwd to the front on include paths', function(done) {
      var src = fixture('cwd-include-path/root/index.scss');
      var expected = read(fixture('cwd-include-path/expected.css'), 'utf8').trim();
      var cwd = process.cwd();

      process.chdir(fixture('cwd-include-path'));
      sass.render({
        file: src,
        includePaths: []
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));

        process.chdir(cwd);
        done();
      });
    });

    it('should check SASS_PATH in the specified order', function(done) {
      var src = read(fixture('sass-path/index.scss'), 'utf8');
      var expectedRed = read(fixture('sass-path/expected-red.css'), 'utf8').trim();
      var expectedOrange = read(fixture('sass-path/expected-orange.css'), 'utf8').trim();

      var envIncludes = [
        fixture('sass-path/red'),
        fixture('sass-path/orange')
      ];

      process.env.SASS_PATH = envIncludes.join(path.delimiter);
      sass.render({
        data: src,
        includePaths: []
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expectedRed.replace(/\r\n/g, '\n'));
      });

      process.env.SASS_PATH = envIncludes.reverse().join(path.delimiter);
      sass.render({
        data: src,
        includePaths: []
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expectedOrange.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should prefer include path over SASS_PATH', function(done) {
      var src = read(fixture('sass-path/index.scss'), 'utf8');
      var expectedRed = read(fixture('sass-path/expected-red.css'), 'utf8').trim();
      var expectedOrange = read(fixture('sass-path/expected-orange.css'), 'utf8').trim();

      var envIncludes = [
        fixture('sass-path/red')
      ];
      process.env.SASS_PATH = envIncludes.join(path.delimiter);

      sass.render({
        data: src,
        includePaths: []
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expectedRed.replace(/\r\n/g, '\n'));
      });
      sass.render({
        data: src,
        includePaths: [fixture('sass-path/orange')]
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expectedOrange.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should render with precision option', function(done) {
      var src = read(fixture('precision/index.scss'), 'utf8');
      var expected = read(fixture('precision/expected.css'), 'utf8').trim();

      sass.render({
        data: src,
        precision: 10
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
        done();
      });
    });

    it('should contain all included files in stats when data is passed', function(done) {
      var src = read(fixture('include-files/index.scss'), 'utf8');
      var expected = [
        fixture('include-files/bar.scss').replace(/\\/g, '/'),
        fixture('include-files/foo.scss').replace(/\\/g, '/')
      ];

      sass.render({
        data: src,
        includePaths: [fixture('include-files')]
      }, function(error, result) {
        assert.deepEqual(result.stats.includedFiles, expected);
        done();
      });
    });

    it('should render with indentWidth and indentType options', function(done) {
      sass.render({
        data: 'div { color: transparent; }',
        indentWidth: 7,
        indentType: 'tab'
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n\t\t\t\t\t\t\tcolor: transparent; }');
        done();
      });
    });

    it('should render with linefeed option', function(done) {
      sass.render({
        data: 'div { color: transparent; }',
        linefeed: 'lfcr'
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n\r  color: transparent; }');
        done();
      });
    });
  });

  describe('.render(importer)', function() {
    var src = read(fixture('include-files/index.scss'), 'utf8');

    it('should respect the order of chained imports when using custom importers and one file is custom imported and the other is not.', function(done) {
      sass.render({
        file: fixture('include-files/chained-imports-with-custom-importer.scss'),
        importer: function(url, prev, done) {
          // NOTE: to see that this test failure is only due to the stated
          // issue do each of the following and see that the tests pass.
          //
          //   a) add `return sass.NULL;` as the first line in this function to
          //      cause non-custom importers to always be used.
          //   b) comment out the conditional below to force our custom
          //      importer to always be used.
          //
          //  You will notice that the tests pass when either all native, or
          //  all custom importers are used, but not when a native + custom
          //  import chain is used.
          if (url !== 'file-processed-by-loader') {
            return sass.NULL;
          }
          done({
            file: fixture('include-files/' + url + '.scss')
          });
        }
      }, function(err, data) {
        assert.equal(err, null);

        assert.equal(
          data.css.toString().trim(),
          'body {\n  color: "red"; }'
        );

        done();
      });
    });

    it('should still call the next importer with the resolved prev path when the previous importer returned both a file and contents property - issue #1219', function(done) {
      sass.render({
        data: '@import "a";',
        importer: function(url, prev, done) {
          if (url === 'a') {
            done({
              file: '/Users/me/sass/lib/a.scss',
              contents: '@import "b"'
            });
          } else {
            assert.equal(prev, '/Users/me/sass/lib/a.scss');
            done({
              file: '/Users/me/sass/lib/b.scss',
              contents: 'div {color: yellow;}'
            });
          }
        }
      }, function() {
        done();
      });
    });

    it('should override imports with "data" as input and fires callback with file and contents', function(done) {
      sass.render({
        data: src,
        importer: function(url, prev, done) {
          done({
            file: '/some/other/path.scss',
            contents: 'div {color: yellow;}'
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should should resolve imports depth first', function (done) {
      var actualImportOrder = [];
      var expectedImportOrder = [
        'a', '_common', 'vars', 'struct', 'a1', 'common', 'vars', 'struct', 'b', 'b1'
      ];
      var expected = read(fixture('depth-first/expected.css'));

      sass.render({
        file: fixture('depth-first/index.scss'),
        importer: function (url, prev, done) {
          actualImportOrder.push(url);
          done();
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), expected);
        assert.deepEqual(actualImportOrder, expectedImportOrder);
        done();
      });
    });

    it('should override imports with "file" as input and fires callback with file and contents', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done({
            file: '/some/other/path.scss',
            contents: 'div {color: yellow;}'
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "data" as input and returns file and contents', function(done) {
      sass.render({
        data: src,
        importer: function(url, prev) {
          return {
            file: prev + url,
            contents: 'div {color: yellow;}'
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "file" as input and returns file and contents', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev) {
          return {
            file: prev + url,
            contents: 'div {color: yellow;}'
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "data" as input and fires callback with file', function(done) {
      sass.render({
        data: src,
        importer: function(url, /* jshint unused:false */ prev, done) {
          done({
            file: path.resolve(path.dirname(fixture('include-files/index.scss')), url + (path.extname(url) ? '' : '.scss'))
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should override imports with "file" as input and fires callback with file', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done({
            file: path.resolve(path.dirname(prev), url + (path.extname(url) ? '' : '.scss'))
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should override imports with "data" as input and returns file', function(done) {
      sass.render({
        data: src,
        importer: function(url) {
          return {
            file: path.resolve(path.dirname(fixture('include-files/index.scss')), url + (path.extname(url) ? '' : '.scss'))
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should override imports with "file" as input and returns file', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev) {
          return {
            file: path.resolve(path.dirname(prev), url + (path.extname(url) ? '' : '.scss'))
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should fallback to default import behaviour if importer returns sass.NULL', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done(sass.NULL);
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should fallback to default import behaviour if importer returns null for backwards compatibility', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done(null);
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should fallback to default import behaviour if importer returns undefined for backwards compatibility', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done(undefined);
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should fallback to default import behaviour if importer returns false for backwards compatibility', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done(false);
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
        done();
      });
    });

    it('should override imports with "data" as input and fires callback with contents', function(done) {
      sass.render({
        data: src,
        importer: function(url, prev, done) {
          done({
            contents: 'div {color: yellow;}'
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "file" as input and fires callback with contents', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev, done) {
          done({
            contents: 'div {color: yellow;}'
          });
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "data" as input and returns contents', function(done) {
      sass.render({
        data: src,
        importer: function() {
          return {
            contents: 'div {color: yellow;}'
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should override imports with "file" as input and returns contents', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return {
            contents: 'div {color: yellow;}'
          };
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should accept arrays of importers and return respect the order', function(done) {
      sass.render({
        file: fixture('include-files/index.scss'),
        importer: [
          function() {
            return sass.NULL;
          },
          function() {
            return {
              contents: 'div {color: yellow;}'
            };
          }
        ]
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
        done();
      });
    });

    it('should be able to see its options in this.options', function(done) {
      var fxt = fixture('include-files/index.scss');
      sass.render({
        file: fxt,
        importer: function() {
          assert.equal(fxt, this.options.file);
          return {};
        }
      }, function() {
        assert.equal(fxt, this.options.file);
        done();
      });
    });

    it('should be able to access a persistent options object', function(done) {
      sass.render({
        data: src,
        importer: function() {
          this.state = this.state || 0;
          this.state++;
          return {
            contents: 'div {color: yellow;}'
          };
        }
      }, function() {
        assert.equal(this.state, 2);
        done();
      });
    });

    it('should wrap importer options', function(done) {
      var options;
      options = {
        data: src,
        importer: function() {
          assert.notStrictEqual(this.options.importer, options.importer);
          return {
            contents: 'div {color: yellow;}'
          };
        }
      };
      sass.render(options, function() {
        done();
      });
    });

    it('should reflect user-defined error when returned as callback', function(done) {
      sass.render({
        data: src,
        importer: function(url, prev, done) {
          done(new Error('doesn\'t exist!'));
        }
      }, function(error) {
        assert(/doesn\'t exist!/.test(error.message));
        done();
      });
    });

    it('should reflect user-defined error with return', function(done) {
      sass.render({
        data: src,
        importer: function() {
          return new Error('doesn\'t exist!');
        }
      }, function(error) {
        assert(/doesn\'t exist!/.test(error.message));
        done();
      });
    });

    it('should throw exception when importer returns an invalid value', function(done) {
      sass.render({
        data: src,
        importer: function() {
          return { contents: new Buffer('i am not a string!') };
        }
      }, function(error) {
        assert(/returned value of `contents` must be a string/.test(error.message));
        done();
      });
    });
  });

  describe('.render(functions)', function() {
    it('should call custom defined nullary function', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            return new sass.types.Number(42, 'px');
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: 42px; }');
        done();
      });
    });

    it('should call custom function with multiple args', function(done) {
      sass.render({
        data: 'div { color: foo(3, 42px); }',
        functions: {
          'foo($a, $b)': function(factor, size) {
            return new sass.types.Number(factor.getValue() * size.getValue(), size.getUnit());
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: 126px; }');
        done();
      });
    });

    it('should work with custom functions that return data asynchronously', function(done) {
      sass.render({
        data: 'div { color: foo(42px); }',
        functions: {
          'foo($a)': function(size, done) {
            setTimeout(function() {
              done(new sass.types.Number(66, 'em'));
            }, 50);
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: 66em; }');
        done();
      });
    });

    it('should let custom functions call setter methods on wrapped sass values (number)', function(done) {
      sass.render({
        data: 'div { width: foo(42px); height: bar(42px); }',
        functions: {
          'foo($a)': function(size) {
            size.setUnit('rem');
            return size;
          },
          'bar($a)': function(size) {
            size.setValue(size.getValue() * 2);
            return size;
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  width: 42rem;\n  height: 84px; }');
        done();
      });
    });

    it('should properly convert strings when calling custom functions', function(done) {
      sass.render({
        data: 'div { color: foo("bar"); }',
        functions: {
          'foo($a)': function(str) {
            str = str.getValue().replace(/['"]/g, '');
            return new sass.types.String('"' + str + str + '"');
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: "barbar"; }');
        done();
      });
    });

    it('should let custom functions call setter methods on wrapped sass values (string)', function(done) {
      sass.render({
        data: 'div { width: foo("bar"); }',
        functions: {
          'foo($a)': function(str) {
            var unquoted = str.getValue().replace(/['"]/g, '');
            str.setValue('"' + unquoted + unquoted + '"');
            return str;
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  width: "barbar"; }');
        done();
      });
    });

    it('should properly convert colors when calling custom functions', function(done) {
      sass.render({
        data: 'div { color: foo(#f00); background-color: bar(); border-color: baz(); }',
        functions: {
          'foo($a)': function(color) {
            assert.equal(color.getR(), 255);
            assert.equal(color.getG(), 0);
            assert.equal(color.getB(), 0);
            assert.equal(color.getA(), 1.0);

            return new sass.types.Color(255, 255, 0, 0.5);
          },
          'bar()': function() {
            return new sass.types.Color(0x33ff00ff);
          },
          'baz()': function() {
            return new sass.types.Color(0xffff0000);
          }
        }
      }, function(error, result) {
        assert.equal(
          result.css.toString().trim(),
          'div {\n  color: rgba(255, 255, 0, 0.5);' +
          '\n  background-color: rgba(255, 0, 255, 0.2);' +
          '\n  border-color: red; }'
        );
        done();
      });
    });

    it('should properly convert boolean when calling custom functions', function(done) {
      sass.render({
        data: 'div { color: if(foo(true, false), #fff, #000);' +
          '\n  background-color: if(foo(true, true), #fff, #000); }',
        functions: {
          'foo($a, $b)': function(a, b) {
            return sass.types.Boolean(a.getValue() && b.getValue());
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: #000;\n  background-color: #fff; }');
        done();
      });
    });

    it('should let custom functions call setter methods on wrapped sass values (boolean)', function(done) {
      sass.render({
        data: 'div { color: if(foo(false), #fff, #000); background-color: if(foo(true), #fff, #000); }',
        functions: {
          'foo($a)': function(a) {
            return a.getValue() ? sass.types.Boolean.FALSE : sass.types.Boolean.TRUE;
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: #fff;\n  background-color: #000; }');
        done();
      });
    });

    it('should properly convert lists when calling custom functions', function(done) {
      sass.render({
        data: '$test-list: (bar, #f00, 123em); @each $item in foo($test-list) { .#{$item} { color: #fff; } }',
        functions: {
          'foo($l)': function(list) {
            assert.equal(list.getLength(), 3);
            assert.ok(list.getValue(0) instanceof sass.types.String);
            assert.equal(list.getValue(0).getValue(), 'bar');
            assert.ok(list.getValue(1) instanceof sass.types.Color);
            assert.equal(list.getValue(1).getR(), 0xff);
            assert.equal(list.getValue(1).getG(), 0);
            assert.equal(list.getValue(1).getB(), 0);
            assert.ok(list.getValue(2) instanceof sass.types.Number);
            assert.equal(list.getValue(2).getValue(), 123);
            assert.equal(list.getValue(2).getUnit(), 'em');

            var out = new sass.types.List(3);
            out.setValue(0, new sass.types.String('foo'));
            out.setValue(1, new sass.types.String('bar'));
            out.setValue(2, new sass.types.String('baz'));
            return out;
          }
        }
      }, function(error, result) {
        assert.equal(
          result.css.toString().trim(),
          '.foo {\n  color: #fff; }\n\n.bar {\n  color: #fff; }\n\n.baz {\n  color: #fff; }'
        );
        done();
      });
    });

    it('should properly convert maps when calling custom functions', function(done) {
      sass.render({
        data: '$test-map: foo((abc: 123, #def: true)); div { color: if(map-has-key($test-map, hello), #fff, #000); }' +
          'span { color: map-get($test-map, baz); }',
        functions: {
          'foo($m)': function(map) {
            assert.equal(map.getLength(), 2);
            assert.ok(map.getKey(0) instanceof sass.types.String);
            assert.ok(map.getKey(1) instanceof sass.types.Color);
            assert.ok(map.getValue(0) instanceof sass.types.Number);
            assert.ok(map.getValue(1) instanceof sass.types.Boolean);
            assert.equal(map.getKey(0).getValue(), 'abc');
            assert.equal(map.getValue(0).getValue(), 123);
            assert.equal(map.getKey(1).getR(), 0xdd);
            assert.equal(map.getValue(1).getValue(), true);

            var out = new sass.types.Map(3);
            out.setKey(0, new sass.types.String('hello'));
            out.setValue(0, new sass.types.String('world'));
            out.setKey(1, new sass.types.String('foo'));
            out.setValue(1, new sass.types.String('bar'));
            out.setKey(2, new sass.types.String('baz'));
            out.setValue(2, new sass.types.String('qux'));
            return out;
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: #fff; }\n\nspan {\n  color: qux; }');
        done();
      });
    });

    it('should properly convert null when calling custom functions', function(done) {
      sass.render({
        data: 'div { color: if(foo("bar"), #fff, #000); } ' +
          'span { color: if(foo(null), #fff, #000); }' +
          'table { color: if(bar() == null, #fff, #000); }',
        functions: {
          'foo($a)': function(a) {
            return sass.types.Boolean(a instanceof sass.types.Null);
          },
          'bar()': function() {
            return sass.NULL;
          }
        }
      }, function(error, result) {
        assert.equal(
          result.css.toString().trim(),
          'div {\n  color: #000; }\n\nspan {\n  color: #fff; }\n\ntable {\n  color: #fff; }'
        );
        done();
      });
    });

    it('should be possible to carry sass values across different renders', function(done) {
      var persistentMap;

      sass.render({
        data: 'div { color: foo((abc: #112233, #ddeeff: true)); }',
        functions: {
          foo: function(m) {
            persistentMap = m;
            return sass.types.Color(0, 0, 0);
          }
        }
      }, function() {
        sass.render({
          data: 'div { color: map-get(bar(), abc); background-color: baz(); }',
          functions: {
            bar: function() {
              return persistentMap;
            },
            baz: function() {
              return persistentMap.getKey(1);
            }
          }
        }, function(errror, result) {
          assert.equal(result.css.toString().trim(), 'div {\n  color: #112233;\n  background-color: #ddeeff; }');
          done();
        });
      });
    });

    it('should let us register custom functions without signatures', function(done) {
      sass.render({
        data: 'div { color: foo(20, 22); }',
        functions: {
          foo: function(a, b) {
            return new sass.types.Number(a.getValue() + b.getValue(), 'em');
          }
        }
      }, function(error, result) {
        assert.equal(result.css.toString().trim(), 'div {\n  color: 42em; }');
        done();
      });
    });

    it('should fail when returning anything other than a sass value from a custom function', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            return {};
          }
        }
      }, function(error) {
        assert.ok(/A SassValue object was expected/.test(error.message));
        done();
      });
    });

    it('should properly bubble up standard JS errors thrown by custom functions', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            throw new RangeError('This is a test error');
          }
        }
      }, function(error) {
        assert.ok(/This is a test error/.test(error.message));
        done();
      });
    });

    it('should properly bubble up unknown errors thrown by custom functions', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            throw {};
          }
        }
      }, function(error) {
        assert.ok(/unexpected error/.test(error.message));
        done();
      });
    });

    it('should call custom functions with correct context', function(done) {
      function assertExpected(result) {
        assert.equal(result.css.toString().trim(), 'div {\n  foo1: 1;\n  foo2: 2; }');
      }
      var options = {
        data: 'div { foo1: foo(); foo2: foo(); }',
        functions: {
          // foo() is stateful and will persist an incrementing counter
          'foo()': function() {
            assert(this);
            this.fooCounter = (this.fooCounter || 0) + 1;
            return new sass.types.Number(this.fooCounter);
          }
        }
      };

      sass.render(options, function(error, result) {
        assertExpected(result);
        done();
      });
    });

    describe('should properly bubble up errors from sass color constructor', function() {
      it('four booleans', function(done) {
        sass.render({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              return new sass.types.Color(false, false, false, false);
            }
          }
        }, function(error) {
          assert.ok(/Constructor arguments should be numbers exclusively/.test(error.message));
          done();
        });
      });

      it('two arguments', function(done) {
        sass.render({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              return sass.types.Color(2,3);
            }
          }
        }, function(error) {
          assert.ok(/Constructor should be invoked with either 0, 1, 3 or 4 arguments/.test(error.message));
          done();
        });
      });

      it('single string argument', function(done) {
        sass.render({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              return sass.types.Color('foo');
            }
          }
        }, function(error) {
          assert.ok(/Only argument should be an integer/.test(error.message));
          done();
        });
      });
    });

    it('should properly bubble up errors from sass value constructors', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            return sass.types.Boolean('foo');
          }
        }
      }, function(error) {
        assert.ok(/Expected one boolean argument/.test(error.message));
        done();
      });
    });

    it('should properly bubble up errors from sass value setters', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            var ret = new sass.types.Number(42);
            ret.setUnit(123);
            return ret;
          }
        }
      }, function(error) {
        assert.ok(/Supplied value should be a string/.test(error.message));
        done();
      });
    });

    it('should fail when trying to set a bare number as the List item', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            var out = new sass.types.List(1);
            out.setValue(0, 2);
            return out;
          }
        }
      }, function(error) {
        assert.ok(/Supplied value should be a SassValue object/.test(error.message));
        done();
      });
    });

    it('should fail when trying to set a bare Object as the List item', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            var out = new sass.types.List(1);
            out.setValue(0, {});
            return out;
          }
        }
      }, function(error) {
        assert.ok(/A SassValue is expected as the list item/.test(error.message));
        done();
      });
    });

    it('should fail when trying to set a bare Object as the Map key', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            var out = new sass.types.Map(1);
            out.setKey(0, {});
            out.setValue(0, new sass.types.String('aaa'));
            return out;
          }
        }
      }, function(error) {
        assert.ok(/A SassValue is expected as a map key/.test(error.message));
        done();
      });
    });

    it('should fail when trying to set a bare Object as the Map value', function(done) {
      sass.render({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            var out = new sass.types.Map(1);
            out.setKey(0, new sass.types.String('aaa'));
            out.setValue(0, {});
            return out;
          }
        }
      }, function(error) {
        assert.ok(/A SassValue is expected as a map value/.test(error.message));
        done();
      });
    });

    it('should always map null, true and false to the same (immutable) object', function(done) {
      var counter = 0;

      sass.render({
        data: 'div { color: foo(bar(null)); background-color: baz("foo" == "bar"); }',
        functions: {
          foo: function(a) {
            assert.strictEqual(a, sass.TRUE,
              'Supplied value should be the same instance as sass.TRUE'
            );

            assert.strictEqual(
              sass.types.Boolean(true), sass.types.Boolean(true),
              'sass.types.Boolean(true) should return a singleton');

            assert.strictEqual(
              sass.types.Boolean(true), sass.TRUE,
              'sass.types.Boolean(true) should be the same instance as sass.TRUE');

            counter++;

            return sass.types.String('foo');
          },
          bar: function(a) {
            assert.strictEqual(a, sass.NULL,
                'Supplied value should be the same instance as sass.NULL');

            assert.throws(function() {
              return new sass.types.Null();
            }, /Cannot instantiate SassNull/);

            counter++;

            return sass.TRUE;
          },
          baz: function(a) {
            assert.strictEqual(a, sass.FALSE,
              'Supplied value should be the same instance as sass.FALSE');

            assert.throws(function() {
              return new sass.types.Boolean(false);
            }, /Cannot instantiate SassBoolean/);

            assert.strictEqual(
              sass.types.Boolean(false), sass.types.Boolean(false),
              'sass.types.Boolean(false) should return a singleton');

            assert.strictEqual(
              sass.types.Boolean(false), sass.FALSE,
              'sass.types.Boolean(false) should return singleton identical to sass.FALSE');

            counter++;

            return sass.types.String('baz');
          }
        }
      }, function() {
        assert.strictEqual(counter, 3);
        done();
      });
    });
  });

  describe('.render({stats: {}})', function() {
    var start = Date.now();

    it('should provide a start timestamp', function(done) {
      sass.render({
        file: fixture('include-files/index.scss')
      }, function(error, result) {
        assert(!error);
        assert.strictEqual(typeof result.stats.start, 'number');
        assert(result.stats.start >= start);
        done();
      });
    });

    it('should provide an end timestamp', function(done) {
      sass.render({
        file: fixture('include-files/index.scss')
      }, function(error, result) {
        assert(!error);
        assert.strictEqual(typeof result.stats.end, 'number');
        assert(result.stats.end >= result.stats.start);
        done();
      });
    });

    it('should provide a duration', function(done) {
      sass.render({
        file: fixture('include-files/index.scss')
      }, function(error, result) {
        assert(!error);
        assert.strictEqual(typeof result.stats.duration, 'number');
        assert.equal(result.stats.end - result.stats.start, result.stats.duration);
        done();
      });
    });

    it('should contain the given entry file', function(done) {
      sass.render({
        file: fixture('include-files/index.scss')
      }, function(error, result) {
        assert(!error);
        assert.equal(result.stats.entry, fixture('include-files/index.scss'));
        done();
      });
    });

    it('should contain an array of all included files', function(done) {
      var expected = [
        fixture('include-files/bar.scss').replace(/\\/g, '/'),
        fixture('include-files/foo.scss').replace(/\\/g, '/'),
        fixture('include-files/index.scss').replace(/\\/g, '/')
      ];

      sass.render({
        file: fixture('include-files/index.scss')
      }, function(error, result) {
        assert(!error);
        assert.deepEqual(result.stats.includedFiles.sort(), expected.sort());
        done();
      });
    });

    it('should contain array with the entry if there are no import statements', function(done) {
      var expected = fixture('simple/index.scss').replace(/\\/g, '/');

      sass.render({
        file: fixture('simple/index.scss')
      }, function(error, result) {
        assert.deepEqual(result.stats.includedFiles, [expected]);
        done();
      });
    });

    it('should state `data` as entry file', function(done) {
      sass.render({
        data: read(fixture('simple/index.scss'), 'utf8')
      }, function(error, result) {
        assert.equal(result.stats.entry, 'data');
        done();
      });
    });

    it('should contain an empty array as includedFiles', function(done) {
      sass.render({
        data: read(fixture('simple/index.scss'), 'utf8')
      }, function(error, result) {
        assert.deepEqual(result.stats.includedFiles, []);
        done();
      });
    });
  });

  describe('.renderSync(options)', function() {
    it('should compile sass to css with file', function(done) {
      var expected = read(fixture('simple/expected.css'), 'utf8').trim();
      var result = sass.renderSync({ file: fixture('simple/index.scss') });

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should compile sass to css with outFile set to absolute url', function(done) {
      var result = sass.renderSync({
        file: fixture('simple/index.scss'),
        sourceMap: true,
        outFile: fixture('simple/index-test.css')
      });

      assert.equal(JSON.parse(result.map).file, 'index-test.css');
      done();
    });

    it('should compile sass to css with outFile set to relative url', function(done) {
      var result = sass.renderSync({
        file: fixture('simple/index.scss'),
        sourceMap: true,
        outFile: './index-test.css'
      });

      assert.equal(JSON.parse(result.map).file, 'index-test.css');
      done();
    });

    it('should compile sass to css with outFile and sourceMap set to relative url', function(done) {
      var result = sass.renderSync({
        file: fixture('simple/index.scss'),
        sourceMap: './deep/nested/index.map',
        outFile: './index-test.css'
      });

      assert.equal(JSON.parse(result.map).file, '../../index-test.css');
      done();
    });

    it('should compile generate map with sourceMapRoot pass-through option', function(done) {
      var result = sass.renderSync({
        file: fixture('simple/index.scss'),
        sourceMap: './deep/nested/index.map',
        sourceMapRoot: 'http://test.com/',
        outFile: './index-test.css'
      });

      assert.equal(JSON.parse(result.map).sourceRoot, 'http://test.com/');
      done();
    });

    it('should compile sass to css with data', function(done) {
      var src = read(fixture('simple/index.scss'), 'utf8');
      var expected = read(fixture('simple/expected.css'), 'utf8').trim();
      var result = sass.renderSync({ data: src });

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should compile sass to css using indented syntax', function(done) {
      var src = read(fixture('indent/index.sass'), 'utf8');
      var expected = read(fixture('indent/expected.css'), 'utf8').trim();
      var result = sass.renderSync({
        data: src,
        indentedSyntax: true
      });

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should NOT compile empty data string', function(done) {
      assert.throws(function() {
        sass.renderSync({ data: '' });
      }, /No input specified: provide a file name or a source string to process/ );
      done();
    });

    it('should NOT compile without any input', function(done) {
      assert.throws(function() {
        sass.renderSync({});
      }, /No input specified: provide a file name or a source string to process/);
      done();
    });

    it('should throw error for bad input', function(done) {
      assert.throws(function() {
        sass.renderSync('somestring');
      });
      assert.throws(function() {
        sass.renderSync({ data: '#navbar width 80%;' });
      });

      done();
    });

    it('should compile with include paths', function(done) {
      var src = read(fixture('include-path/index.scss'), 'utf8');
      var expected = read(fixture('include-path/expected.css'), 'utf8').trim();
      var result = sass.renderSync({
        data: src,
        includePaths: [
          fixture('include-path/functions'),
          fixture('include-path/lib')
        ]
      });

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should add cwd to the front on include paths', function(done) {
      var src = fixture('cwd-include-path/root/index.scss');
      var expected = read(fixture('cwd-include-path/expected.css'), 'utf8').trim();
      var cwd = process.cwd();

      process.chdir(fixture('cwd-include-path'));
      var result = sass.renderSync({
        file: src,
        includePaths: [
          fixture('include-path/functions'),
          fixture('include-path/lib')
        ]
      });
      process.chdir(cwd);

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should check SASS_PATH in the specified order', function(done) {
      var src = read(fixture('sass-path/index.scss'), 'utf8');
      var expectedRed = read(fixture('sass-path/expected-red.css'), 'utf8').trim();
      var expectedOrange = read(fixture('sass-path/expected-orange.css'), 'utf8').trim();

      var envIncludes = [
        fixture('sass-path/red'),
        fixture('sass-path/orange')
      ];

      process.env.SASS_PATH = envIncludes.join(path.delimiter);
      var result = sass.renderSync({
        data: src,
        includePaths: []
      });

      assert.equal(result.css.toString().trim(), expectedRed.replace(/\r\n/g, '\n'));

      process.env.SASS_PATH = envIncludes.reverse().join(path.delimiter);
      result = sass.renderSync({
        data: src,
        includePaths: []
      });

      assert.equal(result.css.toString().trim(), expectedOrange.replace(/\r\n/g, '\n'));
      done();
    });

    it('should prefer include path over SASS_PATH', function(done) {
      var src = read(fixture('sass-path/index.scss'), 'utf8');
      var expectedRed = read(fixture('sass-path/expected-red.css'), 'utf8').trim();
      var expectedOrange = read(fixture('sass-path/expected-orange.css'), 'utf8').trim();

      var envIncludes = [
        fixture('sass-path/red')
      ];
      process.env.SASS_PATH = envIncludes.join(path.delimiter);

      var result = sass.renderSync({
        data: src,
        includePaths: []
      });

      assert.equal(result.css.toString().trim(), expectedRed.replace(/\r\n/g, '\n'));

      result = sass.renderSync({
        data: src,
        includePaths: [fixture('sass-path/orange')]
      });

      assert.equal(result.css.toString().trim(), expectedOrange.replace(/\r\n/g, '\n'));
      done();
    });

    it('should render with precision option', function(done) {
      var src = read(fixture('precision/index.scss'), 'utf8');
      var expected = read(fixture('precision/expected.css'), 'utf8').trim();
      var result = sass.renderSync({
        data: src,
        precision: 10
      });

      assert.equal(result.css.toString().trim(), expected.replace(/\r\n/g, '\n'));
      done();
    });

    it('should contain all included files in stats when data is passed', function(done) {
      var src = read(fixture('include-files/index.scss'), 'utf8');
      var expected = [
        fixture('include-files/bar.scss').replace(/\\/g, '/'),
        fixture('include-files/foo.scss').replace(/\\/g, '/')
      ];

      var result = sass.renderSync({
        data: src,
        includePaths: [fixture('include-files')]
      });

      assert.deepEqual(result.stats.includedFiles, expected);
      done();
    });

    it('should render with indentWidth and indentType options', function(done) {
      var result = sass.renderSync({
        data: 'div { color: transparent; }',
        indentWidth: 7,
        indentType: 'tab'
      });

      assert.equal(result.css.toString().trim(), 'div {\n\t\t\t\t\t\t\tcolor: transparent; }');
      done();
    });

    it('should render with linefeed option', function(done) {
      var result = sass.renderSync({
        data: 'div { color: transparent; }',
        linefeed: 'lfcr'
      });

      assert.equal(result.css.toString().trim(), 'div {\n\r  color: transparent; }');
      done();
    });
  });

  describe('.renderSync(importer)', function() {
    var src = read(fixture('include-files/index.scss'), 'utf8');

    it('should override imports with "data" as input and returns file and contents', function(done) {
      var result = sass.renderSync({
        data: src,
        importer: function(url, prev) {
          return {
            file: prev + url,
            contents: 'div {color: yellow;}'
          };
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
      done();
    });

    it('should override imports with "file" as input and returns file and contents', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev) {
          return {
            file: prev + url,
            contents: 'div {color: yellow;}'
          };
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
      done();
    });

    it('should override imports with "data" as input and returns file', function(done) {
      var result = sass.renderSync({
        data: src,
        importer: function(url) {
          return {
            file: path.resolve(path.dirname(fixture('include-files/index.scss')), url + (path.extname(url) ? '' : '.scss'))
          };
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should override imports with "file" as input and returns file', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function(url, prev) {
          return {
            file: path.resolve(path.dirname(prev), url + (path.extname(url) ? '' : '.scss'))
          };
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should override imports with "data" as input and returns contents', function(done) {
      var result = sass.renderSync({
        data: src,
        importer: function() {
          return {
            contents: 'div {color: yellow;}'
          };
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
      done();
    });

    it('should override imports with "file" as input and returns contents', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return {
            contents: 'div {color: yellow;}'
          };
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
      done();
    });



    it('should fallback to default import behaviour if importer returns sass.NULL', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return sass.NULL;
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should fallback to default import behaviour if importer returns null for backwards compatibility', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return null;
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should fallback to default import behaviour if importer returns undefined for backwards compatibility', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return undefined;
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should fallback to default import behaviour if importer returns false for backwards compatibility', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          return false;
        }
      });

      assert.equal(result.css.toString().trim(), '/* foo.scss */\n/* bar.scss */');
      done();
    });

    it('should accept arrays of importers and return respect the order', function(done) {
      var result = sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: [
          function() {
            return sass.NULL;
          },
          function() {
            return {
              contents: 'div {color: yellow;}'
            };
          }
        ]
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: yellow; }\n\ndiv {\n  color: yellow; }');
      done();
    });

    it('should be able to see its options in this.options', function(done) {
      var fxt = fixture('include-files/index.scss');
      var sync = false;
      sass.renderSync({
        file: fixture('include-files/index.scss'),
        importer: function() {
          assert.equal(fxt, this.options.file);
          sync = true;
          return {};
        }
      });
      assert.equal(sync, true);
      done();
    });

    it('should throw user-defined error', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: src,
          importer: function() {
            return new Error('doesn\'t exist!');
          }
        });
      }, /doesn\'t exist!/);

      done();
    });

    it('should throw exception when importer returns an invalid value', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: src,
          importer: function() {
            return { contents: new Buffer('i am not a string!') };
          }
        });
      }, /returned value of `contents` must be a string/);

      done();
    });
  });

  describe('.renderSync(functions)', function() {
    it('should call custom function in sync mode', function(done) {
      var result = sass.renderSync({
        data: 'div { width: cos(0) * 50px; }',
        functions: {
          'cos($a)': function(angle) {
            if (!(angle instanceof sass.types.Number)) {
              throw new TypeError('Unexpected type for "angle"');
            }
            return new sass.types.Number(Math.cos(angle.getValue()));
          }
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  width: 50px; }');
      done();
    });

    it('should return a list of selectors after calling the headings custom function', function(done) {
      var result = sass.renderSync({
        data: '#{headings(2,5)} { color: #08c; }',
        functions: {
          'headings($from: 0, $to: 6)': function(from, to) {
            var i, f = from.getValue(), t = to.getValue(),
              list = new sass.types.List(t - f + 1);

            for (i = f; i <= t; i++) {
              list.setValue(i - f, new sass.types.String('h' + i));
            }

            return list;
          }
        }
      });

      assert.equal(result.css.toString().trim(), 'h2, h3, h4, h5 {\n  color: #08c; }');
      done();
    });

    it('should let custom function invoke sass types constructors without the `new` keyword', function(done) {
      var result = sass.renderSync({
        data: 'div { color: foo(); }',
        functions: {
          'foo()': function() {
            return sass.types.Number(42, 'em');
          }
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: 42em; }');
      done();
    });

    it('should let us register custom functions without signatures', function(done) {
      var result = sass.renderSync({
        data: 'div { color: foo(20, 22); }',
        functions: {
          foo: function(a, b) {
            return new sass.types.Number(a.getValue() + b.getValue(), 'em');
          }
        }
      });

      assert.equal(result.css.toString().trim(), 'div {\n  color: 42em; }');
      done();
    });

    it('should fail when returning anything other than a sass value from a custom function', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              return {};
            }
          }
        });
      }, /A SassValue object was expected/);

      done();
    });

    it('should properly bubble up standard JS errors thrown by custom functions', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              throw new RangeError('This is a test error');
            }
          }
        });
      }, /This is a test error/);

      done();
    });

    it('should properly bubble up unknown errors thrown by custom functions', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              throw {};
            }
          }
        });
      }, /unexpected error/);

      done();
    });

    it('should properly bubble up errors from sass value getters/setters/constructors', function(done) {
      assert.throws(function() {
        sass.renderSync({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              return sass.types.Boolean('foo');
            }
          }
        });
      }, /Expected one boolean argument/);

      assert.throws(function() {
        sass.renderSync({
          data: 'div { color: foo(); }',
          functions: {
            'foo()': function() {
              var ret = new sass.types.Number(42);
              ret.setUnit(123);
              return ret;
            }
          }
        });
      }, /Supplied value should be a string/);

      done();
    });

    it('should call custom functions with correct context', function(done) {
      function assertExpected(result) {
        assert.equal(result.css.toString().trim(), 'div {\n  foo1: 1;\n  foo2: 2; }');
      }
      var options = {
        data: 'div { foo1: foo(); foo2: foo(); }',
        functions: {
          // foo() is stateful and will persist an incrementing counter
          'foo()': function() {
            assert(this);
            this.fooCounter = (this.fooCounter || 0) + 1;
            return new sass.types.Number(this.fooCounter);
          }
        }
      };
      assertExpected(sass.renderSync(options));
      done();
    });
  });

  describe('.renderSync({stats: {}})', function() {
    var start = Date.now();
    var result = sass.renderSync({
      file: fixture('include-files/index.scss')
    });

    it('should provide a start timestamp', function(done) {
      assert.strictEqual(typeof result.stats.start, 'number');
      assert(result.stats.start >= start);
      done();
    });

    it('should provide an end timestamp', function(done) {
      assert.strictEqual(typeof result.stats.end, 'number');
      assert(result.stats.end >= result.stats.start);
      done();
    });

    it('should provide a duration', function(done) {
      assert.strictEqual(typeof result.stats.duration, 'number');
      assert.equal(result.stats.end - result.stats.start, result.stats.duration);
      done();
    });

    it('should contain the given entry file', function(done) {
      assert.equal(result.stats.entry, resolveFixture('include-files/index.scss'));
      done();
    });

    it('should contain an array of all included files', function(done) {
      var expected = [
        fixture('include-files/bar.scss').replace(/\\/g, '/'),
        fixture('include-files/foo.scss').replace(/\\/g, '/'),
        fixture('include-files/index.scss').replace(/\\/g, '/')
      ].sort();
      var actual = result.stats.includedFiles.sort();

      assert.equal(actual[0], expected[0]);
      assert.equal(actual[1], expected[1]);
      assert.equal(actual[2], expected[2]);
      done();
    });

    it('should contain array with the entry if there are no import statements', function(done) {
      var expected = fixture('simple/index.scss').replace(/\\/g, '/');

      var result = sass.renderSync({
        file: fixture('simple/index.scss')
      });

      assert.deepEqual(result.stats.includedFiles, [expected]);
      done();
    });

    it('should state `data` as entry file', function(done) {
      var result = sass.renderSync({
        data: read(fixture('simple/index.scss'), 'utf8')
      });

      assert.equal(result.stats.entry, 'data');
      done();
    });

    it('should contain an empty array as includedFiles', function(done) {
      var result = sass.renderSync({
        data: read(fixture('simple/index.scss'), 'utf8')
      });

      assert.deepEqual(result.stats.includedFiles, []);
      done();
    });
  });

  describe('.info', function() {
    var package = require('../package.json'),
      info = sass.info;

    it('should return a correct version info', function(done) {
      assert(info.indexOf(package.version) > 0);
      assert(info.indexOf('(Wrapper)') > 0);
      assert(info.indexOf('[JavaScript]') > 0);
      assert(info.indexOf('[NA]') < 0);
      assert(info.indexOf('(Sass Compiler)') > 0);
      assert(info.indexOf('[C/C++]') > 0);

      done();
    });
  });
});
