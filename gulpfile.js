var gulp = require('gulp');
var sass = require('gulp-sass');

var sassFiles = 'public/stylesheets/sass/*.scss',
    cssDest = 'public/stylesheets/css/';

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

gulp.task('sass', function() {
  gulp.src(sassFiles)
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(cssDest));
});


/*correr gulp watch para que gulp detecte todos los cambios del sassFiles y los compile automaticamente*/
gulp.task('watch',function() {
    gulp.watch(sassFiles,['sass']);
});

gulp.task('default', [ 'jquery', 'bootstrapcss', 'bootstrapjs', 'icon', 'sass', 'watch' ]);
