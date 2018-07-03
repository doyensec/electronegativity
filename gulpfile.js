const del = require('del');
const gulp = require('gulp');
const babel = require('gulp-babel');
const eslint = require('gulp-eslint');
const plumber = require('gulp-plumber');


const src = './src';
const dist = './dist';

gulp.task('default', ['clean', 'es6', 'es6:watch']);

gulp.task('clean', () => del([`${dist}/*`]));

gulp.task('lint', () => {
  gulp.src([`${src}/**/*.js`])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('es6', () => {
  gulp.src([`${src}/**/*.js`])
    .pipe(plumber())
    .pipe(babel())
    .pipe(gulp.dest(dist));
});

gulp.task('es6:watch', () => {
  gulp.watch(`${src}/**/*.js`, ['es6']);
});
