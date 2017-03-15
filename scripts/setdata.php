<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$dbname = "adr_stmb_muki";

	// Create connection
	$conn = new mysqli($servername, $username, $password, $dbname);
	// Check connection
	if ($conn->connect_error) {
		die("Connection failed: " + $conn->connect_error);
	}

	$sql = $_GET['q'];
	
	$result = $conn->query($sql);
	
	$conn->close();
?>