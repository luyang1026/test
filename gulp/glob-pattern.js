var glob = require('glob');

glob('js/**/*.js',function(err,files){
	if(err)console.log(err);
	console.log(files)
})