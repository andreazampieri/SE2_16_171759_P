<!DOCTYPE html>
<html>
<head>
	<title>Login</title>
</head>
<body>
	(:
		if[auth] ~
		[:then ~
			<h2>You are already authenticated</h2>
			<a href="/../">Back</a>
		:]
		[:else ~
				<form action="/authenticate" method="post">
				Username: <input type="text" name="username"><br>
				Password: <input type="password" name="password"><br>
				<input type="submit" value="Login">
				</form>
			:]
	:)
</body>
</html>