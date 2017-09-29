var gulp = require('gulp');

gulp.task('default',[''], function() {
    
});

gulp.watch('./**/*.css',function(ev){
	console.log(ev)
})