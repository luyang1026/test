var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var stylish = require('jshint-stylish');
var glob = require('glob');
var del = require('del');
var fs = require('fs');
var wiredep = require('wiredep').stream;
gulp.task('js',function(){
	return gulp.src('src/script/**/*.js')
		.pipe($.jshint())
		.pipe($.jshint.reporter(stylish))
		.pipe($.concat('main.js'))
		.pipe($.uglify())
		.pipe(gulp.dest('.tmp/script'))
})
gulp.task('css',function(){
	return gulp.src(['src/**/*.less','src/**/*.css'])
		.pipe($.less())
		.pipe($.concat('main.css'))
		.pipe(gulp.dest('.tmp/style'))
})

gulp.task('clean',function(cb){
	del.sync('.tmp');cb();
})

gulp.task('inject',['css','js'],function(){
	var stylesToInject = gulp.src(['.tmp/**/*.css'],{read:false});
	var scriptToInject = gulp.src(['.tmp/**/*.js'],{read:false});
	return gulp.src('src/index.html')
		.pipe(gulp.dest('.tmp',{prefix:1}))
		.pipe(wiredep())
		.pipe($.inject(scriptToInject,{relative: true}))
		.pipe($.inject(stylesToInject,{relative: true}))
		.pipe(gulp.dest('.tmp'))
})

gulp.task('glob',function(){
	glob("./favicon.ico",function(er,files){
		console.log(files)
	})
})
gulp.task('img',function(){
	return gulp.src('src/img/*')
		.pipe($.imagemin())
		.pipe(gulp.dest('.tmp/img'))
})

gulp.task('build', function(cb) {
    $.sequence('clean',['inject','img'],cb);
});
/************************************************************/
gulp.task('a',[], function(cb) {
    	setTimeout(function(){
    		console.log('a');cb()
    	},1199);
});
gulp.task('b',[], function(cb) {
    	setTimeout(function(){
    		console.log('b');cb()
    	},1200);
});
gulp.task('c',[], function(cb) {
    	setTimeout(function(){
    		console.log('c');cb()
    	},1201);
});
gulp.task('d',[], function(cb) {
    	setTimeout(function(){
    		console.log('d');cb()
    	},1202);
});
gulp.task('e',function(cb){
	$.sequence('b','a','c','d')(cb)
	console.log('eee')
});
/************************************************************/
gulp.task('test', ['clean'], function() {
	return gulp.src('src/**/*.less')
		.pipe($.flatten())
		.pipe($.rename(function(path){
			console.log(path)
			path.extname = '.gif'
			return path;
		}))
		.pipe(gulp.dest('.tmp'));
});
