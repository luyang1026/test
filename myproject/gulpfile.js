var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
gulp.task('copy',()=>{
	return gulp.src('src/tpl/*.html')
	.pipe(gulp.dest('dist'));
});
gulp.task('css',()=>{
	return gulp.src('src/**/*.less)
	.pipe(autoprefixer('last 2 versions'))
	.pipe(gulp.dest('dist/css')
	.pipe(minifyCss())
	.pipe(rename({extname:'.min.css'})
	.pipe(gulp.dest('dist/css');
