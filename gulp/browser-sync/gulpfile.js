var gulp = require('gulp'),
	browserSync = require('browser-sync').create();

gulp.task('bs',function(){
	browserSync.init({
		server:{
			baseDir:'./'
		}
	})
	gulp.watch('./**/*.css',function(){
		return gulp.src('./**/*.css')
			.pipe(browserSync.stream())
		
	})
})
