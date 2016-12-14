var request = require("request");

var url = "http://localhost:5000/";

describe("Test login ",function(){
	describe("with admin",function(){
		it(" returns status code 200 ",function(done){
			request.post(url + "authenticate?username=admin&password=admin",
				function(error,response,body){

					if(error){
	     			   console.log(error);
	    			}
					expect(response.statusCode).toBe(200);
					done();
				});
		});
	});
});

describe("Test registration of a user ",function(){
	it(" returns 400 if empty parameters",function(done){
		request.post(url+"registerUser",
			function(error,response,body){
				expect(response.statusCode).toBe(400);
				done();
			});
	});
});

describe("Test insert test ",function(){
	it(" if we aren't authenticated it returns 401",function(done){
		request.post(url+"insertTest",
			function(error,response,body){
				expect(response.statusCode).toBe(401);
				done();
			});
	});
});