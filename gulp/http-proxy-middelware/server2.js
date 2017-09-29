var express = require('express');
var proxy = require('http-proxy-middleware')
var app = express();

app.get('/gogo',function(req,res){
	for(var i in req){
		console.log(i)
	}
	console.log(req.url)
	res.send('server2:data')
});

app.listen('8183')