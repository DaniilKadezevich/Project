'use strict';

const   gulp = require('gulp'),
        sass = require('gulp-sass'),
        concat = require('gulp-concat'),
        uglify = require('gulp-uglify'),
        browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('app/sass/**/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: './app',  
        },
        notify: false
    });
});

gulp.task('concatJs', function () {
    return gulp.src([
        'node_modules/lodash/lodash.min.js', 
        'node_modules/wow.js/dist/wow.min.js',
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/ion-rangeslider/js/ion.rangeSlider.min.js',
        'node_modules/slick-carousel/slick/slick.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/moment/min/moment.min.js',
        'node_modules/moment/locale/ru.js'
         ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('app/js'))
        // .pipe(browserSync.reload({stream: true}))
});
gulp.task('concatCss', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css', 
        'node_modules/ion-rangeslider/css/normalize.css',
        'node_modules/ion-rangeslider/css/ion.rangeSlider.css',
        'node_modules/ion-rangeslider/css/ion.rangeSlider.skinHTML5.css',
        'node_modules/animate.css/animate.min.css',
        'node_modules/slick-carousel/slick/slick.css', 
        'node_modules/slick-carousel/slick/slick-theme.css',
         ])
        .pipe(concat('libs.min.css'))
        .pipe(gulp.dest('app/css'))
        // .pipe(browserSync.reload({stream: true}))
});
gulp.task('concat', ['concatCss', 'concatJs'])

gulp.task('copy', function() {
    return gulp.src([
        'node_modules/slick-carousel/slick/fonts/slick.svg',
        'node_modules/slick-carousel/slick/fonts/slick.woff',
        'node_modules/slick-carousel/slick/fonts/slick.ttf',
        'node_modules/slick-carousel/slick/fonts/slick.eot'
        ])
    .pipe(gulp.dest('app/css/fonts'))
});

gulp.task('watch', ['browser-sync', 'sass'], function () {
    gulp.watch('app/sass/**/*.sass', ['sass']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('default', ['watch']);