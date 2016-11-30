// libraries
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

// Server setup
var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'sodium chloride',
  resave: true,
  saveUninitialized: true,
}));


var port = process.env.PORT || 5000;
app.set('port',port);
app.listen(port);




// root/default path
app.get('/',function(request,response){
	request.session.asd = 'a';
	console.log('root\n',request.session);
	response.writeHead(200,{'Content-Type':'text/plain'});
	response.end('helloworld');
});