/* this is a module that keeps the data of the webapp. The exports are missing.
 * this webapp needs to model entrance test for universities.
 */


/* user's data
 * a user is defined by a index
 * his datas are found in users.username[i], users.name[i] and users.surname[i]
 */
var users = {
	username : [],
	password : [],
	name : [],
	surname : []
};

/* set of names of the tests
 * 
 * the multi dim. array indicates the results (globally). 
 * As shown below in the indexing, the object `scores` is a 4-dimentional array indexed on username,testname,date and location.
 * The data contained there is the score realized 
 */
var tests = {
	name : [],
	scores : [] 	// array of tuples of the format [username,testname,date,location,score]
};


/**
 * Gets the new user identifier.
 *
 * @return     {number}  The new user identifier.
 */
function getNewUserId(){
	return users.username.length;		//if the users-data is empty -> new id = 0; otherwise the new unused id is the length 
}

function isInt(x){
	return !isNaN(parseInt(x));
}

/**
 * Check for the presence of a user (identified by username)
 *
 * @param      {string}  username  The username
 * @return     {bool}    returns True if the username is present (-> so the user), false otherwise
 */
function userIsPresent(username){
	return getUserId(username) != -1;
}

/**
 * Given an username, it's returned the index in which are located all of his info
 * if it's returned the value 2, users.username[2] contains the username searched
 * and users.name[2] and users.surname[2] contain his relative name and surname
 *
 * @param      {string}  username  The username
 * @return     {number}  The user identifier.
 */
function getUserId(username){
	return users.username.indexOf(username);
}

/**
 * Inserts a new user into the data-object (if it isn't already present)
 *
 * @param      {string}   username  The username
 * @param      {string}   name      The name
 * @param      {string}   surname   The surname of the new user
 * @return     {boolean}  true if the user has been inserted,false otherwise
 */
var insertUser = function(username,password,name,surname) {
	if(!userIsPresent(username)){
		var id = getNewUserId();
		users.username[id] = username;
		users.name[id] = name;
		users.surname[id] = surname;
		users.password[id] = password;
		return true;
	}
	else{
		return false;
	}
}

/**
 * Deletes a user, passing his username
 *
 * @param      {string}   username  The username of the username to be deleted
 * @return     {boolean}  true if the user has been deleted (-> the username was present in the data), false otherwise
 */
var deleteUser = function(username){
	if(userIsPresent(username)){
		var id = getUserId(username);
		users.username.splice(id,1);
		users.name.splice(id,1);
		users.surname.splice(id,1);
		users.password.splice(id,1);
		return true;
	}
	else{
		return false;
	}
}

/**
 * Changes the personal data of a determined user (by username)
 *
 * @param      {string}   username  The username
 * @param      {string}   name      The name
 * @param      {string}   surname   The surname of the user to be changed
 * @return     {boolean}  true if the username was present and the data was changed, false otherwise
 */
var updateUser = function(username,name,surname){
	if(userIsPresent(username)){
		var id = getUserId(username);
		users.name[id] = name;
		users.surname[id] = surname;
		return true;
	}
	else{
		return false;
	}	
}

/**
 * Checks if the couple username-password is right in order to login
 *
 * @param      {string}   username  The username
 * @param      {string}   password  The password
 * @return     {boolean}  true if the user authentication is valid, false otherwise
 */
var correctAuthentication = function(username,password){
	if(userIsPresent(username)){
		var id = getUserId(username);
		return password == users.password[id];
	}else{
		return false;
	}
}

var getUser = function(username){
	if(userIsPresent(username))
	{
		var id = getUserId(username);
		return {
			username : users.username[id],
			name : users.name[id],
			surname : users.surname[id]
		};
	}
	else
	{
		return {};
	}
}

/**
 * Gets the new test identifier.
 *
 * @return     {number}  The new test identifier.
 */
function getNewTestId(){
	return tests.name.length;		//same reasoning done for the user
}

/**
 * Checks if a test is already present (name)
 *
 * @param      {string}  name    The name
 * @return     {boolean} true if the name is present, false otherwise
 */
function testIsPresent(name){
	return tests.name.indexOf(name)!=-1;
}

/**
 * Inserts a new test
 *
 * @param      {string}   name    The name
 * @return     {boolean}  true if the name wasn't present -> been inserted, false otherwise
 */
var insertTest = function(name){
	if(!testIsPresent(name)){
		var id = getNewTestId();
		tests.name[id] = name;
		return true;
	}
	else{
		return false;
	}
}

/**
 * Given a testname, the index of that name in the array tests.name is returned
 *
 * @param      {string}  name    The name
 * @return     {number}  the index of 'name'
 */
function getTestId(name){
	return tests.name.indexOf(name);
}

/**
 * checks if a location is already present in locations.name
 *
 * @param      {string}  location  The location
 * @return     {boolean}  true if it's present, false otherwise
 */
function locationIsPresent(location){
	return locations.name.indexOf(location) != -1;
}

/**
 * given ALLOWED and EXISTING values of username, testname, date, location and score, the record is saved in tests.scores
 *
 * @param      {string}   username  The username
 * @param      {string}   testname  The testname
 * @param      {string}   date      The date
 * @param      {string}   location  The location
 * @param      {string}   score     The score of the record to be savde
 * @return     {boolean}  true if the operation succeeded, false otherwise
 */
var associateUserToTest = function(username,testname,date,location,score){
	if(userIsPresent(username) && testIsPresent(testname) && isInt(score) && isAValidDate(date))
	{
		tests.scores.push([username,testname,date,location,parseInt(score)]);
		return true;
	}
	else
	{
		return false;
	}
}

/**
 * Determines if the string passed in the param matches the format YYYY-MM-DD
 *
 * @param      {string}   string  The string to be analyzed
 * @return     {boolean}  True if a valid it's in the right format, False otherwise.
 */
function isAValidDate(string){
	var validPattern = /^\d\d\d\d-\d\d-\d\d$/;
	return validPattern.test(string);
}

var getUserTests = function(username){	
	if(userIsPresent(username))
	{
		var result = [];
		for(var i=0;i<tests.scores.length;i++)
		{
			if(tests.scores[i][0] == username)		// the first element is the username
			{
				result.push(tests.scores[i]);
			}
		}
		return result;
	}
	else
	{
		return [];
	}
}


var testToJSON = function(test){
	//[username,testname,date,location,score]
	return {"username":test[0],"testname":test[1],"date":test[2],"location":test[3],"score":test[4]};
}

exports.insertUser = insertUser;
exports.deleteUser = deleteUser;
exports.updateUser = updateUser;
exports.getUser = getUser;
exports.correctAuthentication = correctAuthentication;
exports.insertTest = insertTest;
exports.associateUserToTest = associateUserToTest;
exports.getUserTests = getUserTests;
exports.testToJSON = testToJSON;