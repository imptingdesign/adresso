<?php
require_once 'vendor\autoload.php';
require_once 'vendor\phpoffice\phpword\src\PhpWord\TemplateProcessor.php';

define('PHPWORD_BASE_DIR', realpath(__DIR__));

$input = json_decode(file_get_contents('php://input'));
/*$input = new StdClass();
$input->erdat = '18.11.2016';
$input->name = 'Mustermann Max';
$input->ernam = 'ADMIN';
$input->filename = 'Stammblatt_Mustermann_Max_18_11_2016';*/


// --------------------------------------------------------------------------------------
// Template processor instance creation
echo date('H:i:s'), ' Creating new TemplateProcessor instance... ' . '<br/>';
$templateProcessor = new \PhpOffice\PhpWord\TemplateProcessor('Adresseus_Stammblatt_Template.docx');

// insert values into placeholders
$templateProcessor->setValue('top_date', $input->erdat);
$templateProcessor->setValue('name_txt', $input->name);
$templateProcessor->setValue('street_txt', $input->strasse);
$templateProcessor->setValue('city_txt', $input->ort);
$templateProcessor->setValue('country_txt', $input->land);
$templateProcessor->setValue('letter_txt', $input->anrede);
$templateProcessor->setValue('state_01', $input->status);
$templateProcessor->setValue('ki_name', $input->kind);
$templateProcessor->setValue('ki_geb', $input->bday);
$templateProcessor->setValue('telefon', $input->tel);
$templateProcessor->setValue('fax', $input->fax);
$templateProcessor->setValue('handy', $input->handy);
$templateProcessor->setValue('mail', $input->mail);
$templateProcessor->setValue('info_txt', $input->bem);
$templateProcessor->setValue('zahl_txt', $input->zart);
$templateProcessor->setValue('konto_txt', $input->konto);
$templateProcessor->setValue('blz_txt', $input->blz);
$templateProcessor->setValue('iban_txt', $input->iban);
$templateProcessor->setValue('bottom_info', 'Was hier ??');
$templateProcessor->setValue('bottom_user', $input->ernam);


echo date('H:i:s'), ' Saving the result document...' . '<br/>';
$templateProcessor->saveAs('output/' .$input->filename.' .docx');

?>