var gulp = require('gulp'),
    sass = require('gulp-sass'),
    connect = require('gulp-connect'),
    refresh = require('gulp-refresh')
    browserify = require('gulp-browserify'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    changed = require('gulp-changed'),
    clean = require('gulp-clean'),
    using = require('gulp-using');

var onError = function(err) {
    notify.onError({
        title:    "Gulp",
        subtitle: "Failure!",
        message:  "Error: <%= error.message %>",
        sound:    "Beep"
    })(err);
    this.emit('end');
};

gulp.task('server', function(){
    connect.server({
        host:'0.0.0.0',
        root:['public'],
        port:1000,
        livereload: true
    })

});

gulp.task('copy', function () {
    gulp.src(['src/placeholders/*.*'])
        .pipe(gulp.dest('public/dist/placeholders/'));
});

gulp.task('sass', function(){
    return gulp.src('src/sass/*.scss')
        .pipe(plumber({errorHandler: onError}))
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('public/dist/css/'))
        .pipe(refresh());
});


gulp.task('buildJsx', function () {
    return gulp.src(["src/**/*.jsx"])
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel({
            presets: ['es2015','stage-0','react'],
        }))
        .pipe(gulp.dest("public/dist/"))
        .pipe(refresh());
});


gulp.task('build', ['sass','buildJsx'], function () {
    gulp.src('src/SmokeEditorFactory.jsx')
        .pipe(using({}))
        .pipe(plumber({errorHandler: onError}))
        .pipe(babel({
            presets: ['es2015','react'],
        }))
        .pipe(browserify({
            insertGlobals : true
        }))
        .pipe(gulp.dest('public/dist/'))
        .pipe(refresh());
});

gulp.task('watch', function() {
    refresh.listen();
    gulp.watch('src/placeholders/*.*', ['copy']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/**/*.jsx', ['build']);
});

gulp.task('dev',['server','build','copy','watch']);
gulp.task('build-all',['build','copy']);
