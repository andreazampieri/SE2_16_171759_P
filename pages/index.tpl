<!DOCTYPE html>
<html>
<head>
	<meta name="viewport" content="width=device-width,initial-scale=1">
	<title>Enter YOUniversity</title>
	<meta charset="utf-8">
	<link rel="stylesheet" type="text/css" href="pages/css/index.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script type="text/javascript" src="pages/js/home.js"></script>
</head>
<body>
<div class="container-header">
	<div class="logo">EnterYOUniversity</div>
	<div class="menu">
		<div class="menu-item">
			<strong>(: username :)</strong>
		</div>
		<div class="menu-item">Analytics</div>
		<div class="menu-item">Settings</div>
		<div class="menu-item">
		(:
			if[auth] ~
			[:then ~ <a href="/logout">Logout</a>:]
			[:else ~ <a href="/login">Login</a>:]
		:)
		</div>
	</div>
	<table id="tests" style="display: (:if[auth]~[:then ~ block:][:else ~ none:]:)">
		<tr>
			<th>Test Name</th>
			<th>Locations</th>
			<th>Date</th>
			<th>Info</th>
		</tr>
	</table>
	(:
			if[auth] ~
			[:then ~ 
				<button id="buttontoggle">Insert a new test</button>
				<form id="insertTest" action="/insertTest" method="post">
					Name: <input type="text" name="testname" required><br>
					Universities [u1, u2, ...]: <input type="text" name="universities" required><br>
					Date : <input type="date" name="date" required><br>
					Score: <input type="number" name="score" required><br>
					<input type="submit" value="Insert">
				</form>
			:]
			[:else ~ <h3>Welcome! Register <a href="/signup">here</a> or <a href="/login">sign in</a>!</h3>:]
	:)
</div>
</body>
</html>