'use strict';

import gulp from 'gulp';
import del from 'del';
import sass from 'gulp-sass';
import jade from 'gulp-jade';
import useref from 'gulp-useref';
import gulpIf from 'gulp-if';
import cssnano from 'gulp-cssnano';
import runSequence from 'run-sequence';
var browserSync = require('browser-sync').create();

const paths = {
    scripts: 'src/scripts/**/*.js',
    images: 'src/images/*',
    styles: 'src/styles/*.scss',
    jade: 'src/**/*.jade',
    fonts: 'src/fonts/*'
};

gulp.task('clean', () => {
    return del(['dist']);
});

gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('useref', () => {
    return gulp.src('dist/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', () => {
    return gulp.src(paths.styles)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('jade', () => {
    return gulp.src('src/index.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy:images', () => {
    return gulp.src(paths.images, {dot: true})
        .pipe(gulp.dest('dist/images'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', () =>  {
    gulp.watch(paths.styles, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.images, ['copy:images']);
});

gulp.task('default', () => {
    runSequence(['clean', 'sass', 'jade', 'copy:images', 'serve', 'watch']);
});