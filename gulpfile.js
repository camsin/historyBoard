var gulp = require('gulp');

gulp.task('bootstrapcss', function(){
  return gulp.src('bower_components/bootstrap/dist/css/*')
    .pipe(gulp.dest('public/stylesheets/lib'))
});

gulp.task('bootstrapjs', function(){
  return gulp.src('bower_components/bootstrap/dist/js/*')
    .pipe(gulp.dest('public/javascripts/lib'))
});

gulp.task('jquery', function(){
  return gulp.src('bower_components/jquery/dist/*')
    .pipe(gulp.dest('public/javascripts/lib'))
});

gulp.task('icon', function(){
  return gulp.src('bower_components/components-font-awesome/css/*')
    .pipe(gulp.dest('public/stylesheets/lib'))
});


gulp.task('default', [ 'jquery', 'bootstrapcss', 'bootstrapjs', 'icon' ]);
