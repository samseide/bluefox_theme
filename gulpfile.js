var gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    prefix      = require('gulp-autoprefixer'),
    concat      = require('gulp-concat'),
    babel       = require('gulp-babel'),
    cp          = require('child_process');

/**
 * @task sass
 * Compile files from scss
 */
gulp.task('sass', function () {
  return gulp.src('src/styles.scss')
  .pipe(sass())
  .pipe(prefix(['last 3 versions', '> 1%', 'ie 8'], { cascade: true }))
  .pipe(gulp.dest('compiled/css'))
});

/**
 * @task scripts
 * Compile files from js
 */
gulp.task('scripts', function() {
  return gulp.src(['_js/*.js', '_js/custom.js'])
  .pipe(babel({
    presets: ['es2015']
  }))
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('js'))
});

/**
 * @task clearcache
 * Clear all caches
 */
gulp.task('clearcache', function(done) {
  return cp.spawn('drush', ['cache-rebuild'], {stdio: 'inherit'})
  .on('close', done);
});

/**
 * @task watch
 * Watch scss files for changes & recompile
 * Clear cache when Drupal related files are changed
 */
gulp.task('watch', function () {
  gulp.watch(['_scss/*.scss', '_scss/**/*.scss'], ['sass']);
  gulp.watch(['_js/*.js'], ['scripts']);
});

/**
 * Default task, running just `gulp` will
 * compile Sass files and watch files.
 */
gulp.task('default', ['watch']);
