var gulp = require('gulp'),
	less = require('gulp-less'),
	browserSync = require('browser-sync').create();

gulp.task('bs',function(){
	browserSync.init({
		server:{
			baseDir:'./'
		}
	})
	gulp.watch('./**/*.css',function(){
		browserSync.reload('./**/*.css')
		
	})
})

gulp.task('bs2',['test'],function(){
	browserSync.init({
		server:{
			baseDir:'./'
		},
	});
	gulp.watch('./less/*',['less']);
})

gulp.task('test',function(done){
	console.log('test');
	done();
})

gulp.task('bs3',[''], function() {
    browserSync.init({
    	server:{
    		baseDir:'./'
    	}
    })
});
gulp.task('less',['test'],function(){
	return gulp.src('./less/*.less')
		.pipe(less())
		.pipe(gulp.dest('./css'))
		.pipe(browserSync.stream())
})