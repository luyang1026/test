var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');
gulp.task('js',function(){
	return gulp.src('*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter(stylish))
})

console.log(process.env)