<?php

try {
	$myfile = fopen("C:\serialdb.txt", "w") or die("Unable to open file!");
	$txt = json_decode(file_get_contents('php://input'));
	fwrite($myfile, $txt);
	fclose($myfile);
}
catch (Exception $e) {
	echo json_encode(array(
	'error' => array(
	'msg' => $e->getMessage(),
	'code' => $e->getCode(),
	),
    ));
}

?>