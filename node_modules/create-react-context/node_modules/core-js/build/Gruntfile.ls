require! <[./build fs ./config]>
library-tests = <[client/library.js tests/helpers.js tests/library.js]>map -> src: it
module.exports = (grunt)->
  grunt.loadNpmTasks \grunt-contrib-clean
  grunt.loadNpmTasks \grunt-contrib-copy
  grunt.loadNpmTasks \grunt-contrib-uglify
  grunt.loadNpmTasks \grunt-contrib-watch
  grunt.loadNpmTasks \grunt-livescript
  grunt.loadNpmTasks \grunt-karma
  grunt.initConfig do
    pkg: grunt.file.readJSON './package.json'
    uglify: build:
      files: '<%=grunt.option("path")%>.min.js': '<%=grunt.option("path")%>.js'
      options:
        mangle: {+sort, +keep_fnames}
        compress: {+pure_getters, +keep_fargs, +keep_fnames}
        sourceMap: on
        banner: config.banner
    livescript: src: files:
      './tests/helpers.js': './tests/helpers/*'
      './tests/tests.js': './tests/tests/*'
      './tests/library.js': './tests/library/*'
      './tests/es.js': './tests/tests/es*'
      './tests/experimental.js': './tests/experimental/*'
      './build/index.js': './build/build.ls*'
    clean: <[./library]>
    copy: lib: files:
      * expand: on
        cwd: './'
        src: <[es5/** es6/** es7/** js/** web/** core/** fn/** index.js shim.js]>
        dest: './library/'
      * expand: on
        cwd: './'
        src: <[modules/*]>
        dest: './library/'
        filter: \isFile
      * expand: on
        cwd: './modules/library/'
        src: '*'
        dest: './library/modules/'
    watch:
      core:
        files: './modules/*'
        tasks: \default
      tests:
        files: './tests/tests/*'
        tasks: \livescript
    karma:
      'options':
        configFile: './tests/karma.conf.js'
        browsers: <[PhantomJS]>
        singleRun: on
      'continuous': {}
      'continuous-library':
        files: library-tests
  grunt.registerTask \build (options)->
    done = @async!
    err, it <- build {
      modules: (options || 'es5,es6,es7,js,web,core')split \,
      blacklist: (grunt.option(\blacklist) || '')split \,
      library: !!grunt.option \library
    }
    if err
      console.error err
      process.exit 1
    grunt.option(\path) || grunt.option(\path, './custom')
    fs.writeFile grunt.option(\path) + '.js', it, done
  grunt.registerTask \client ->
    grunt.option \library ''
    grunt.option \path './client/core'
    grunt.task.run <[build:es5,es6,es7,js,web,core uglify]>
  grunt.registerTask \library ->
    grunt.option \library 'true'
    grunt.option \path './client/library'
    grunt.task.run <[build:es5,es6,es7,js,web,core uglify]>
  grunt.registerTask \shim ->
    grunt.option \library ''
    grunt.option \path './client/shim'
    grunt.task.run <[build:es5,es6,es7,js,web uglify]>
  grunt.registerTask \e ->
    grunt.option \library ''>
    grunt.option \path './client/core'
    grunt.task.run <[build:es5,es6,es7,js,web,core,exp uglify]>
  grunt.registerTask \default <[clean copy client library shim]>