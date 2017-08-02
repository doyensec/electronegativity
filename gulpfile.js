'use strict';

const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');

const src = './src';
const dist = './dist';

gulp.task('default', [ 'clean', 'es6', 'es6:watch' ]);

gulp.task('clean', function() { return del([ dist + '/*' ]); });

gulp.task('es6', function() {
  gulp.src([ src + '/**/*.js' ])
      .pipe(plumber())
      .pipe(babel())
      .pipe(gulp.dest(dist))
});

gulp.task('es6:watch', function() { gulp.watch(src + '/**/*.js', [ 'es6' ]); });
