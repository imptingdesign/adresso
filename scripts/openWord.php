<?php

try {
	// starting word
	$word = new COM("word.application") or die("Unable to instantiate Word");

	$filename = realpath(json_decode(file_get_contents('php://input')));
	//$filename = 'C:\Users\Matze\Desktop\Voranmeldung_Kita.doc';
	$word->Documents->Open($filename);

	//bring it to front
	$word->Visible = 1;
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