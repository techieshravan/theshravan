'use strict';

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import connect from 'gulp-connect';
import liteserver from 'lite-server'

const paths = {
  scripts: 'src/scripts/*',
  images: 'src/images/*',
  styles: 'src/styles/*.scss',
  html: 'src/**/*.jade',
  fonts: 'src/fonts/*'
};

gulp.task('clean', () => {
  return del(['dist']);
});

gulp.task('sass', () => {
  return gulp.src(paths.styles)
            .pipe(sass().on('error', sass.logError))
            .pipe(gulp.dest('dist/styles/'));
});

gulp.task("jade", () => {
  return gulp.src('src/index.jade')
            .pipe(jade({ pretty: true }))
            .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () =>  {
  gulp.watch(paths.styles, ['sass']);
  gulp.watch(paths.html, ['jade']);
  //gulp.watch(paths.images, ['copy:images']);

  gulp.watch(paths.images, () => {
    gulp.src(paths.images, {dot: true})
        .pipe(gulp.dest('dist/images'));
  });

  //gulp.watch(paths.fonts, () => {
  //  gulp.src(paths.fonts, {dot: true})
  //    .pipe(gulp.dest('dist/fonts'));
  //});

  gulp.watch(paths.scripts, () => {
    gulp.src(paths.scripts, {dot: true})
      .pipe(gulp.dest('dist/scripts'));
  });
});


gulp.task('copy', () => {
  gulp.src(paths.images, {dot: true}).pipe(gulp.dest('dist/images'));
  //gulp.src(paths.fonts, {dot: true}).pipe(gulp.dest('dist/fonts'));
  gulp.src(paths.scripts, {dot: true}).pipe(gulp.dest('dist/scripts'));
});

gulp.task('serve', () => {
  liteserver();
});

gulp.task('compile', ['jade', 'sass']);

gulp.task('default', ['clean', 'copy', 'compile', 'watch', 'serve']);