var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var coffee = require('gulp-coffee');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var jade = require('gulp-jade');

gulp.task('images', function(){
  gulp.src('res/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/res/'));
});

gulp.task('document', function(){
  gulp.src(['src/jade/**/*.jade'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(jade({pretty: true}))
    .pipe(gulp.dest('dist/'));
});


gulp.task('styles', function(){
  gulp.src(['src/sass/**/*.sass'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass({indentedSyntax: true}))
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('scripts', function(){
  return gulp.src('src/coffee/**/*.coffee')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(coffee({bare: true}))
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('default', function(){
  gulp.watch("src/jade/**/*.jade", ['document']);
  gulp.watch("src/sass/**/*.sass", ['styles']);
  gulp.watch("src/coffee/**/*.coffee", ['scripts']);
});
