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
	
	if (mysqli_num_rows($result) > 0) {
		// output data of each row
		$rows = array();
		while($r = mysqli_fetch_assoc($result)) {
			$rows[] = $r;
		}
	} else {
		$rows = array();
	}
	try {
		echo json_encode($rows, JSON_UNESCAPED_UNICODE);
		
		$conn->close();
		/* switch (json_last_error()) {
			case JSON_ERROR_NONE:
			echo ' - No errors';
			break;
			case JSON_ERROR_DEPTH:
			echo ' - Maximum stack depth exceeded';
			break;
			case JSON_ERROR_STATE_MISMATCH:
			echo ' - Underflow or the modes mismatch';
			break;
			case JSON_ERROR_CTRL_CHAR:
			echo ' - Unexpected control character found';
			break;
			case JSON_ERROR_SYNTAX:
			echo ' - Syntax error, malformed JSON';
			break;
			case JSON_ERROR_UTF8:
			echo ' - Malformed UTF-8 characters, possibly incorrectly encoded';
			break;
			default:
			echo ' - Unknown error';
			break;
		} */
	}
	catch (Exception $e) {
		echo 'Exception abgefangen: ',  $e->getMessage(), "\n";
	}
?>