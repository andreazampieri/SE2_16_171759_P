// libraries
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var data = require('./data.js')

// Server setup
var app = express();
app.use(cookieParser());
app.use(session({
  secret: 'sodium chloride',
  resave: true,
  saveUninitialized: true,
}));

app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 5000;
app.set('port',port);
app.listen(port,function(){
	console.log("Server running on port: "+port);
	data.insertUser("admin","admin","admin","admin");
});

app.use('/pages',express.static('pages'));

app.get('/login',function(request,response) {
	if(request.session.auth == null)
	{
		response.sendFile(path.join(__dirname+'/../pages/login.html'));
	}
	else
	{
		response.sendFile(path.join(__dirname+'/../pages/alreadyAuth.html'));
	}
});

app.post('/authenticate',function(request,response){
	var username = request.body.username;
	var password = request.body.password;
	if(username != null && password != null 
		&& data.correctAuthentication(username,password) && request.session.auth == null)
	{
		request.session.auth = "true";
	}
	response.redirect('/');
});


// root/default path
app.get('/',function(request,response){
	if(request.session.auth != null)
	{
		response.sendFile(path.join(__dirname+'/../pages/index.html'));
	}
	else
	{
		response.redirect('/login');
	}
});
