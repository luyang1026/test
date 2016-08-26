var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoPrefixer = require('gulp-autoprefixer');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var pump = require('pump')


gulp.task('a',['b'],function(){
	console.log('a')
})
gulp.task('b',function(){
	console.log('b')
})

gulp.task('c',function(){
	gulp.start('a')
});

gulp.task('css',function(){
	return gulp.src('myproject/**/*.css')//myproject/src/css/*css->src/css/
	.pipe(autoPrefixer('last 2 versions'))
	.pipe(gulp.dest((path)=>{
		console.log(path);return 'ss'
	}))//+src/css
});


// var watcher = gulp.watch('./test.js',['default']);