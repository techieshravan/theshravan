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
    scripts: 'src/js/**/*.js',
    images: 'src/img/**/*.*',
    styles: 'src/scss/creative.scss',
    jade: 'src/**/*.jade',
    fonts: 'src/fonts/*'
};

gulp.task('clean:dist', () => {
    return del.sync('dist');
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
        .pipe(gulp.dest('dist/css/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('jade', () => {
    return gulp.src('src/index.jade')
        .pipe(jade({ pretty: true }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('scripts', () => {
    return gulp.src(paths.scripts)
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('copy:bootstrap', () => {
    gulp.src('bower_components/bootstrap/dist/css/*.css').pipe(gulp.dest('dist/css'));
    gulp.src('bower_components/bootstrap/dist/fonts/*.*').pipe(gulp.dest('dist/fonts'));
    gulp.src('bower_components/bootstrap/dist/js/*.js').pipe(gulp.dest('dist/js'));
    
    gulp.src('bower_components/jquery/dist/*.js').pipe(gulp.dest('dist/js'));

    gulp.src('src/font-awesome/css/*.*').pipe(gulp.dest('dist/font-awesome/css'));
    gulp.src('src/font-awesome/fonts/*.*').pipe(gulp.dest('dist/font-awesome/fonts'));

    gulp.src('src/css/animate.min.css').pipe(gulp.dest('dist/css'));
});

gulp.task('copy:images', () => {
    gulp.src(paths.images, {dot: true})
    .pipe(gulp.dest('dist/img'))
    .pipe(browserSync.reload({ stream: true }));

gulp.src(paths.fonts, {dot: true})
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('watch', () =>  {
    gulp.watch(paths.styles, ['sass']);
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.images, ['copy:images']);
    gulp.watch('./dist/index.html', browserSync.reload);
});

gulp.task('default', () => {
    runSequence(['clean:dist', 'sass', 'scripts', 'jade', 'copy:images', 'copy:bootstrap', 'serve', 'watch']);
});