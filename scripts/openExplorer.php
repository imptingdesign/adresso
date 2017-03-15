<?php
try {
$explorer = 'C:\Windows\\explorer.exe';
//$folder_to_open = "C:\\xampp\htdocs\adr\output";
$folder_to_open = realpath(json_decode(file_get_contents('php://input')));

// Using "system" function would cause a false/positive
// by Bkav antivirus on virustotal.com. Using shell_exec
// instead solves the issue.
shell_exec("$explorer /n,/e,$folder_to_open");
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