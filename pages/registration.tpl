<!DOCTYPE html>
<html>
<head>
	<title>Register</title>
</head>
<body>
	(:
		if[auth] ~
		[:then ~
			<h2>You are authenticated</h2>
			<p><a href="/logout">Logout</a> before registering a new acconunt</p>
			<a href="/../">Back</a>
		:]
		[:else ~
				<h2>Insert your information</h2>
				<form action="/registerUser" method="post">
					Username: <input type="text" name="username" required><br>
					Password: <input type="password" name="pwd" required><br>
					Repeat Password: <input type="password" name="pwdcheck" required><br>
					Name: <input type="text" name="name" required><br>
					Surname: <input type="text" name="surname" required><br>
					<input type="submit" value="Insert!">
				</form>
		:]
	:)
</body>
</html>