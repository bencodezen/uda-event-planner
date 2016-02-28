// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var uglifyCSS = require('gulp-uglifycss');
var rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync').create();

// Serve
gulp.task('serve', function() {
  gulp.watch(["**/*.html", "css/**/*.css", "js/**/*.js"]).on('change', browserSync.reload);
  gulp.watch('sass/**/*.scss', ['sass']);

  browserSync.init({
    server: {
        baseDir: "./src/"
    }
  });
});

// Generate Production Assets
gulp.task('dist', function() {
  // Prepare HTML
  gulp.src('src/**/*.html')
    .pipe(gulp.dest('./dist/'));
  // Prepare CSS
  gulp.src('src/css/**/*.css')
    .pipe(uglifyCSS({
      "max-line-len": 80
    }))
    .pipe(gulp.dest('./dist/css'));
  // Prepare JS
  gulp.src('src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// Lint Task
gulp.task('lint', function() {
  return gulp.src('js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Compile Sass and Autoprefix Styles
gulp.task('sass', function() {
  return gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'))
    .pipe(autoprefixer({
      browsers: ['last 3 versions'],
      cascade: false
    }))
    .pipe(uglifyCSS({
      "max-line-len": 80
    }))
    .pipe(gulp.dest('css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
  return gulp.src('src/js/*.js')
    .pipe(gulp.dest('dist'))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

// Watch Files For Changes
gulp.task('watch', function() {
  gulp.watch('src/js/*.js', ['lint', 'scripts']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);