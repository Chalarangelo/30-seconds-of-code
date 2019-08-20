var gulp = require('gulp')
var eslint = require('gulp-eslint')

gulp.task('lint', function() {
  return gulp.src(['src/**', 'demo/app.js', 'demo/components/*.jsx'])
    // eslint() attaches the lint output to the eslint property
    // of the file object so it can be used by other modules.
    .pipe(eslint())
    // eslint.format() outputs the lint results to the console.
    // Alternatively use eslint.formatEach() (see Docs).
    .pipe(eslint.format())
    // To have the process exit with an error code (1) on
    // lint error, return the stream and pipe to failOnError last.
    .pipe(eslint.failOnError())
})


// Demo related tasks

var flatten = require('gulp-flatten')
var stream = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babelify = require('babelify')
var browserSync = require('browser-sync').create()
var reload = browserSync.reload

function bundleJs(bundler) {
  return bundler.bundle()
    .pipe(stream('demo/app.js'))
    .pipe(buffer())
    .pipe(flatten())
    .pipe(gulp.dest('demo/assets'))
}

gulp.task('demo:bundle', function() {
  return bundleJs(browserify('./demo/app.js', {debug: true}) // Append a source map
    .transform(babelify))
})

gulp.task('demo:bundleAndWatch', function() {
  var bundler = watchify(browserify('./demo/app.js', Object.assign({debug: true}, watchify.args)))
    .transform(babelify)

  bundler.on('update', bundleJs.bind(null, bundler))

  return bundleJs(bundler)
})

gulp.task('demo', ['demo:bundleAndWatch'], function() {
  browserSync.init({
    port: 3010,
    browser: ['google chrome'],
    open: false,
    notify: false,
    server: {
      baseDir: "demo/assets"
    }
  })

  // Watch JavaScript and lint changes
  gulp.watch(['src/**', 'demo/app.js', 'demo/components/*.jsx'], ['lint'])

  // Reload when the app CSS or bundled JS changes
  gulp.watch('demo/assets/*.css').on('change', reload)
  gulp.watch('demo/assets/app.js').on('change', reload)
})

// gh-pages related tasks

gulp.task('gh-pages', ['demo:bundle'], function() {
  require('del').sync(['gh-pages/**/*.*', '!gh-pages', '!gh-pages/.git'])
  return gulp.src('demo/assets/**/*.*')
    .pipe(gulp.dest('gh-pages'))
})
