var gulp            = require('gulp'),
    less            = require('gulp-less'),
    autoprefixer    = require('gulp-autoprefixer');


gulp.task('less', function () {
    return gulp.src('app/less/*.less')
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('app/css'));
});


gulp.task('watch', ['less'], function () {
    gulp.watch('app/less/**/*.less', ['less']);
});
