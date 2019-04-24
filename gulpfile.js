

// gulp init 
var gulp = require('gulp');
var sass = require('gulp-sass');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var imagemin = require('gulp-imagemin');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

gulp.task('default', function() 
{
  // place code for your default task here
});


// sass
gulp.task('sass', function () 
{
    return gulp.src('./assets/src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./assets/src/sass'));
});

// cssmin

gulp.task('cssmin', function () 
{
    gulp.src('./assets/src/sass/**/*.css') 
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./assets/dist/css'));
});

// imagemin 

gulp.task('imagemin', () =>
    gulp.src('./assets/src/img/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./assets/dist/img/'))
);

gulp.task('watch', function () 
{
    watch('./assets/src/sass/**/*.scss', batch(function (events, done) {
        gulp.start('sass', done);
    }));

    watch('./assets/src/sass/**/*.css', batch(function (events, done) {
        gulp.start('cssmin', done);
    }));

    watch('./assets/src/img/**/*', batch(function (events, done) {
        gulp.start('imagemin', done);
    }));
 
});