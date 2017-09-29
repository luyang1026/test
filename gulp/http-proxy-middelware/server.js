var express = require('express');
var proxy = require('http-proxy-middleware')
var app = express();

app.use(proxy({
	target: 'http://localhost:8183',
	changeOrigin: true,
	pathRewrite:{'^/api':'/gogo'}
}));
app.get('',function(req,res){
	res.send('server1:data')
});

app.listen('8181')
