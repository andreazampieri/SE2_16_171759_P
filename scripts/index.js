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
app.use('/pages/js', express.static('/pages/js'));

app.get('/login',function(request,response) {
	var authenticated = request.session.auth != null;
	bind.toFile('pages/login.tpl',
		{
			auth : authenticated
		},
		function(data)
		{
			var statusCode = authenticated ? 307 : 200; //307 redirected because already logged in
			response.writeHead(statusCode,{'Content-Type':'text/html'});
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
		response.redirect('/');
	}
	else
	{
		response.status = 403;
		response.sendFile(path.join(__dirname+'/../pages/forbidden.html'));
	}
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
			var statusCode = authenticated ? 307 : 200; 				//307 redirected because already logged in
			response.writeHead(statusCode,{'Content-Type':'text/html'});
			response.end(data);
		});
});

app.post('/registerUser',function(request,response){
	if(!request.body)
	{
		response.status=400;
		response.sendFile(path.join(__dirname+'/../pages/badrequest.html'));
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
				response.redirect(400,'/signup');
			}
			else
			{
				response.redirect(200,'/login');
			}
		}
		else
		{
			response.redirect(400,'/signup');
		}

	}
});

app.post('/insertTest',function(request,response){
	if(request.session.auth == null)
	{
		response.redirect(401,'/login');
	}
	else if(!request.body)
	{
		response.status =400;
		response.sendFile(path.join(__dirname+'/../pages/badrequest.html'));
	}
	else
	{
		var username = request.session.auth;
		var test = request.body.testname;
		var date = request.body.date;
		var score = request.body.score;
		var universities = request.body.universities.split(",").map(s => s.trim());

		data.insertTest(test);

		for(var i=0; i< universities.length; i++){
			data.associateUserToTest(username,test,date,universities[i],score);
		}
		response.redirect(200,'/');
	}
});

app.post('/tests/getUserTests',function(request,response){
	if(!!request.session.auth)
	{
		var headers = {};
		headers["Access-Control-Allow-Origin"] = "*"; //for cross enviroment request
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";//methods allowed to response
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"; //type of headers
		headers["Content-Type"] = "application/json";//format response

		var tests = data.getUserTests(request.session.auth);
		var json = {tests:[]};
		for(var i=0;i<tests.length;i++)
		{
			json.tests.push(data.testToJSON(tests[i]));
		}

		response.writeHead(200, headers);
		response.end(JSON.stringify(json));
	}
	else
	{
		response.writeHead(401,{});
		response.end(JSON.stringify({}));
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
