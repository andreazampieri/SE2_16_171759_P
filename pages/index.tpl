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
	<!--
	<table id="tests">
		<tr class="headers">
			<td>Test Name</td>
			<td>Locations</td>
			<td>Misc. Datas</td>
		</tr>
		<tr>
			<td>CISIA</td>
			<td>UniTN, UniPD</td>
			<td>Position UniTN: 87/150<br>
					Position UniPD: 102/200</td>
		</tr>
		<tr>
			<td>CINECA</td>
			<td>UniVR</td>
			<td>Position UniVR: 62/130</td>
		</tr>
		<tr>
			<td>MIUR</td>
			<td>North Italy, Florence</td>
			<td>Results available in 18 days</td>
		</tr>
	</table>
	-->
	(:
			if[auth] ~
			[:then ~ 
				<h2>Your tests</h2>
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