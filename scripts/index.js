// libraries
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var data = require('./data.js');
var bind = require('bind');

// Server setup
var app = express();
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

app.use('/pages', express.static('pages'));
app.use('/pages/css', express.static('/pages/css'));

app.get('/login',function(request,response) {
	var authenticated = request.session.auth != null;
	bind.toFile('pages/login.tpl',
		{
			auth : authenticated
		},
		function(data)
		{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(data);
		});
});

app.post('/authenticate',function(request,response){
	var username = request.body.username;
	var password = request.body.password;
	if(username != null && password != null 
		&& data.correctAuthentication(username,password) && request.session.auth == null)
	{
		request.session.auth = username;
	}
	response.redirect('/');
});

app.get('/logout',function(request,response){
	request.session.destroy();
	response.redirect('/');
});

app.get('/signup',function(request,response){
	var authenticated = request.session.auth != null;
	bind.toFile('pages/registration.tpl',
		{
			auth : authenticated
		},
		function(data)
		{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(data);
		});
});

app.post('/registerUser',function(request,response){
	if(!request.body)
	{
		response.redirect('/');
	}
	else
	{
		var username = request.body.username;
		var pwd = request.body.pwd;
		var pwdcheck = request.body.pwdcheck;
		var name = !request.body.name ? "" : request.body.name;
		var surname = !request.body.surname ? "" : request.body.surname;

		if(!!username && !!pwd && !!pwdcheck && pwd === pwdcheck)
		{
			if(!data.insertUser(username,pwd,name,surname))
			{
				response.redirect('/signup');
			}
			else
			{
				response.redirect('/login');
			}
		}
		else
		{
			response.redirect('/signup');
		}

	}
});

// root/default path
app.get('/',function(request,response){
	var authenticated = request.session.auth != null;
	var username = authenticated ? data.getUser(request.session.auth).username : "";
	bind.toFile('pages/index.tpl',
		{
			auth : authenticated,
			username : username
		},
		function(data)
		{
			response.writeHead(200,{'Content-Type':'text/html'});
			response.end(data);
		});
});
