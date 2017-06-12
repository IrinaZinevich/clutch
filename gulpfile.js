var gulp            = require('gulp'),
    less            = require('gulp-less'),
    browserSync     = require('browser-sync'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglifyjs'),
    del             = require('del');


gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function () {
    browserSync({
        server: {
            baseDir: 'app'
        },
        notify: false
    });
});

gulp.task('scripts', function () {
    return gulp.src(['app/libs/jquery/dist/jquery.min.js'])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

gulp.task('watch', ['browser-sync', 'less', 'scripts'], function () {
    gulp.watch('app/less/*.less', ['less']);
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('clean', function () {
    del.sync('dist');
});

gulp.task('build',['less', 'scripts'], function () {

    var buildCss = gulp.src('app/css/main.css')
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('app/fonts/**/*.css')
        .pipe(gulp.dest('dist/fonts'));

    var buildJS = gulp.src('app/js/**/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['watch']);