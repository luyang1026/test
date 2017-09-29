const http = require('http');
const WebSocket = require('socket.io');
const fs = require('fs');

var server = http.createServer((req,res)=>{
	fs.readFile(req.url.substring(1),(err,data)=>{
		if(err){
			res.end('err');
		}
		res.end(data);
	})
	// res.end('hello world')
}).listen('8888');

server.on('request',()=>{
	console.log(111)
})