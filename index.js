// libraries
var express = require('express');
var http = require('http');


// Server setup
var app = express();

var port = process.env.PORT || 12345;
app.set('port',port);
app.listen(port);

// root/default path
app.use('/',function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('helloworld');
});