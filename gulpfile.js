var gulp = require('gulp');
var exec = require('child_process').exec;
var rename = require('gulp-rename');

gulp.task('ng-build', function (cb) {
  exec('ng build --prod', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})

gulp.task('adapt-github-page', ['ng-build'], function () {
  return gulp.src('dist/index.html')
    .pipe(rename('404.html'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['adapt-github-page'], function () {
  return gulp.src('dist/**/*.*')
    .pipe(gulp.dest('../../regextester.github.io'));
});
