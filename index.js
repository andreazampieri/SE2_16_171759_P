// libraries
var express = require('express');



// Server setup
var app = express();

var address = 'localhost';
var port = 12345;
app.set('port',(process.env.PORT || port));
app.listen(port, address);

// root/default path
app.use('/',function(request,response){
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('helloworld');
});