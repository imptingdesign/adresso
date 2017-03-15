// -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
//									start of Adresseus - custom code
// -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~

// --------------------------------------------------------------------------------------------------
//									start of main functions (program flow)
// --------------------------------------------------------------------------------------------------


// --------------------------------------------------------------------------------------------------
//									end of main functions (program flow)
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
//										start of helper functions
// --------------------------------------------------------------------------------------------------
// -- search & filter table
function searchTable() {
	$("#search").keyup(function() {
		var value = this.value;
		
		$("table").find("tr").each(function(index) {
			if (!index) return;
			var id = $(this).find("td").text().toLowerCase();
			$(this).toggle(id.indexOf(value.toLowerCase()) !== -1);
		});
	});
}

// -- sort table
$(document).ready(function() { 
    $("#datamonitor").tablesorter();
}); 

// -- encode utf8
function encode_utf8(s) {
	"use strict";
  return unescape(encodeURIComponent(s));
}

// -- decode utf8
function decode_utf8(s) {
	"use strict";
  return decodeURIComponent(escape(s));
}

// -- function that creates date out of text input
function stringToDate(value) {
	var dateobj = new Date();
	// day from text input
	var day = value.substring(0,2);
	// caution: month counts from 0 -> 0 = January
	var month = (parseInt(value.substring(3,5)) - 1).toString();
	// year from text input
	var year = value.substring(6,10);
	
	// set date to values of substrings & to 00:00:000
	dateobj.setDate(day);
	dateobj.setMonth(month);
	dateobj.setFullYear(year);
	
	// use UTC here to fix timezone offset (UTC -> GMT+2)
	dateobj.setUTCHours(00);
	dateobj.setUTCMinutes(00);
	dateobj.setUTCSeconds(00);
	dateobj.setUTCMilliseconds(000);
		
	return dateobj.toISOString();
}

// -- function that converts date to text output
function dateToString(value) {
	var dateobj = new Date(value);
	var day;
	var month;
	if (parseInt(dateobj.getDate()) < 10) {
		day = "0" + dateobj.getDate();
	}
	else {
		day = dateobj.getDate();
	}
	var helper = parseInt(dateobj.getMonth()) + 1;
	if (helper < 10) {
		month = "0" + helper;
	}
	else {
		month = helper.toString();
	}
	var year = dateobj.getFullYear();
	
	return day + "." + month + "." + year;
	
}

// function that subtracts days from a given date
function subtractDays(date, days) {
    return new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - days,
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    );
}

function setSalutation(gender) {
	switch (gender) {
		case "male":
			document.getElementById("briefanrede").value = "Sehr geehrter Herr";
			return;
		case "female":
			document.getElementById("briefanrede").value = "Sehr geehrte Frau";
			return;
		case "family":
			document.getElementById("briefanrede").value = "Sehr geehrte Familie";
			return;
	}
}

// open overview page
function goToOverview() {
	window.location.href = "#/page/monitor";
}

// open groupoverview
function goToGov(state) {
	switch (state) {
	case "ST1":
		window.location.href = "#/page/goupmon1";
		break;
	case "ST2":
		window.location.href = "#/page/goupmon2";
		break;
	case "ST3":
		window.location.href = "#/page/goupmon3";
		break;
	case "ST4":
		window.location.href = "#/page/goupmon4";
		break;
	}
}

// get selected rows
function getSelRows() {
	var oRows = {};
	var c = 0;
	$('#datamonitor tr').filter(':has(:checkbox:checked)').each(function() {
		// this = tr
		$tr = $(this);
		$($tr).each(function() {
			// If you need to iterate the TD's
			oRows[c] = $(this).find('td').eq(1).text();
			c++;
		});
	});
	return oRows;
}

var tempid;
// handle button click
function handleBtnClick(mode) {
	switch (mode) {
		case "Neu":
			// redirect to "create" page		
			window.location.href = "#/page/create";
			break;
		// end case "Neu"
		case "Ändern":
			try {
				// 1. get first marked line
				var adrO = getSelRows();
				if (Object.keys(adrO).length > 0) {
					// 2. redirect to corresponding page
					window.location.href = "#/page/change";
					tempid = adrO[0];
					loadSingleStmb(adrO[0]);
					break;
				} else {
					alert("Bitte eine Zeile markieren");
					break;
				}
			}
			catch (ex) {
				alert(ex.message);
				break;
			}
		// end case "Ändern"
		case "Anzeigen":
		try {
			// 1. get first marked line
			var adrO = getSelRows();
			if (Object.keys(adrO).length > 0) {
				// 2. redirect to corresponding page
				window.location.href = "#/page/display";
				loadSingleStmb(adrO[0]);
				break;
			} else {
				alert("Bitte eine Zeile markieren");
				break;
			}
		}
		catch (ex) {
			alert(ex.message);
			break;
		}
		// end case "Anzeigen"
		case "Archivieren":
			// minimum 1 line
			try {
				var adrO = getSelRows();
				if (Object.keys(adrO).length > 0) {
					var i = 0;
					for (i; i < Object.keys(adrO).length; i++) {
						// do "archive" function
						var dbtab = "adr_stmb_data";
						var ardat = new Date();
						ardat.setUTCHours(00);
						ardat.setUTCMinutes(00);
						ardat.setUTCSeconds(00);
						ardat.setUTCMilliseconds(000);
						
						var str = "UPDATE " + dbtab + " SET ardat = " + JSON.stringify(ardat) + " WHERE id = " + adrO[i];
						try {
							// AJAX call to run SQL statements
							$.ajax({ 
								url:  '/adr/scripts/setdata.php?q=' + str,
								dataType: "json", 
								async: true
							}).responseText;
						}
						catch (e) {
							alert("Fehler abgefangen: " + e.message);
						}
					}
					alert("Stammblätter wurden archiviert");
					break;
				} else {
					alert("Bitte mindestens eine Zeile markieren!");
					break;
				}
			} catch(e) {
				alert(e.message);
				break;
			} // end case "Archivieren"
		case "Löschen":
			// minimum 1 line
			try {
				var adrO = getSelRows();
				if (Object.keys(adrO).length > 0) {
					var i = 0;
					// confirm here!
					if (!confirm("Wollen Sie die markierten Stammblätter löschen?")) {
						return;
					}
					for (i; i < Object.keys(adrO).length; i++) {
						var dbtab = "adr_stmb_data";	
						var str = 'DELETE FROM ' + dbtab + ' WHERE id = ' + adrO[i];
						// AJAX call to run SQL statements
						$.ajax({ 
							url:  '/adr/scripts/setdata.php?q=' + str,
							dataType: "json", 
							async: true
						}).responseText;
					}
					alert("Stammblätter wurden gelöscht");
					break;
				}
				else {
					alert("Bitte mindestens eine Zeile markieren!");
					break;
				}
			} 
			catch(e) {
				alert(e.message);
				break;
			} // end case "Löschen"
		case "Brief 1":
		// minimum 1 line
		try {
			var adrO = getSelRows();
//			console.log("Anzahl adrO Inhalte: " + Object.keys(adrO).length);
			if (Object.keys(adrO).length > 0) {
				var i = 0;
				var str = "viewid;Name;Vorname;Straße;Ort;Land;Kindname;Geburtstag;Anrede;" 
				+ "Telefon;Fax;Mail;Handy;Bemerkung;Status;Konto;BLZ;IBAN;Zahlungsart;Frei1;Frei2;Frei3;Erfassungsdatum;Erfasser;MOD;%";
				for (i; i < Object.keys(adrO).length; i++) {
					// prepare data for serialdb.txt
					var erdat = new Date();
					erdat.setUTCHours(00);
					erdat.setUTCMinutes(00);
					erdat.setUTCSeconds(00);
					erdat.setUTCMilliseconds(000);
					
//					console.log("i:"+i);
					
					var row = getRowObject(adrO[i]);
					
//					console.log("row.viewid:" + row.viewid);
					
					str += row.viewid + ";" + row.name + ";" + row.vorname + ";" + row.strasse + ";" + row.ort + ";" + row.land 
					+ ";" + row.kind + ";" + row.geburtstag + ";" + row.briefanrede + ";" + row.telefon + ";" + row.fax + ";" + row.mail 
					+ ";" + row.handy + ";" + row.bemerkung + ";" + row.status + ";" + row.bankkonto + ";" + row.blz + ";" + row.iban 
					+ ";" + row.zart + ";" + row.frei1 + ";" + row.frei2 + ";" + row.frei3	+ ";" + dateToString(erdat) 
					+ ";" + row.ernam + ";" + row.adrmod + ";%";

				}
			// AJAX call to write object contents to .txt file
			$.ajax({
				url:  '/adr/scripts/writetxt.php',
				dataType: "json", 
	   			data : JSON.stringify(str),
	   		 	type : 'POST',
				success: function(data) {
					if (data.error) {
					// handle the error
						throw data.error.msg;
					}
				 }
	   		 });
				
			// AJAX call to open given WORD file
			// $.ajax({
				// url:  '/adr/scripts/openWord.php',
				// dataType: "json", 
	   			// data : JSON.stringify('C:/Users/Matze/Desktop/Voranmeldung_Kita.doc'),
	   		 	// type : 'POST',
				// success: function(data) {
					// if (data.error) {
						// // handle the error
						// throw data.error.msg;
					// }
					// // alert(data.result);
				// }
	   		 // });
			break;
			} else {
				alert("Bitte mindestens eine Zeile markieren!");
				break;
			}
		} catch(e) {
			alert(e.message);
			break;
		} // end case "Brief 1"
		case "Brief 2":
			// same as Brief 1!!
	}
	// end switch
}

// reset fields on create/change Form
function clearFields() {
	// reset input
	$("#form_create input[type=text]").each(function() {
		this.value = "";
    });
	
	// reset textarea
	$("#bemerkung").val("");
	
	// reset radio button
	var newcol = "optfemale";
	$('#' + newcol).prop('checked',true);
	
	// reset dropdowns
	$("select").prop("selectedIndex",0);
	
	// set salutation again
	setSalutation("female");
}

// format rowobject to fit serialdb
function formatRowObj(ro) {
	var plaufcl = ""; 
	var bdaycl = "";
	
	if (ro[0].geburtstag != "") {
		// bday = new Date(JSON.parse(ro[0].geburtstag));
		// bday = bday.toLocaleTimeString();
		bdaycl = dateToString(JSON.parse(ro[0].geburtstag));
	}
    
 	if (ro[0].plaufnahme != "") {
		plaufcl = dateToString(JSON.parse(ro[0].plaufnahme));
	}   
    
	return {
		viewid: ro[0].id,
		name: ro[0].name,
		vorname: ro[0].vorname,
		strasse: ro[0].strasse,
		ort: ro[0].ort,
		kind: ro[0].kind,
		geburtstag: bdaycl,
        plaufnahme: plaufcl,
		briefanrede: ro[0].briefanrede,
		telefon: ro[0].telefon,
		fax: ro[0].fax,
		mail: ro[0].mail,
		handy: ro[0].handy,
		bemerkung: ro[0].bemerkung,
		status: getStatusText(ro[0].status),
		bankkonto: ro[0].bankkonto,
		blz: ro[0].blz,
		iban: ro[0].iban,
		zart: ro[0].zart,
		frei1: ro[0].frei1,
		frei2: ro[0].frei2,
		frei3: ro[0].frei3,
//		erdat: "",
		ernam: "Admin",
		adrmod: ""
	}
}

// --------------------------------------------------------------------------------------------------
// 											end of helper functions
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// 											start of check functions
// --------------------------------------------------------------------------------------------------
// -- checks input is numeric only
function checkNumericInput(input) {
	var pattern = /^(0|[1-9][0-9]*)$/i;
	if (input != "") {
		if (pattern.test(input)) {
			return true;
		}
		else {
			return false; 
		}
	}
	else {
		// empty textbox is a successful test
		return true;
	}
}

// -- checks date type inputs for validity
function checkDateFormatInput(input) {
	var pattern = /\d{2}(\.)\d{2}(\.)\d{4}/i;
	if(input === "") {
		// empty textbox => successful test
		return true;
	} else {
		if (pattern.test(input)) {
			return true;
		}
		else {
			return false; 
		}

	}
}

// -- checks if input type matches mail adress pattern
function checkMailAdress(input) {
	var pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
	if(input === "") {
		// empty textbox => successful test
		return true;
	} else {
		if (pattern.test(input)) {
			return true;
		}
		else {
			return false; 
		}
		
	}
}
// --------------------------------------------------------------------------------------------------
// 											end of check functions
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// 										start of AJAX GET functions
// --------------------------------------------------------------------------------------------------
// -- load all adresses from database
function loadAllData() {
	var str = "SELECT * FROM adr_stmb_data WHERE ardat = ''";
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
		
		// fill table with data
		for (i = 0; i < xmldoc.length; i++) {
			var bday = ""; 
			var bdaycl = "";
			
			if (xmldoc[i].geburtstag != "") {
				bday = new Date(JSON.parse(xmldoc[i].geburtstag));
				bday = bday.toLocaleTimeString();
				bdaycl = dateToString(JSON.parse(xmldoc[i].geburtstag));
			}
			var tro = "<tr>"; var tdo = "<td>"; var tdc = "</td>"; var trc = "</tr>";
			var cb = '<input type="checkbox" value="yes" class="md-primary ng-pristine ng-untouched ng-valid ng-not-empty md-checked">';
			
			var tbl = tro + tdo + cb + tdc
			+ tdo + decode_utf8(xmldoc[i].id) + tdc 
			+ tdo + decode_utf8(xmldoc[i].name) + tdc
			+ tdo + decode_utf8(xmldoc[i].vorname) + tdc
			+ tdo + getStatusText(decode_utf8(xmldoc[i].status)) + tdc
			+ tdo + decode_utf8(xmldoc[i].kind) + tdc
			+ tdo + bdaycl + tdc
			+ tdo + decode_utf8(xmldoc[i].zart) + tdc + trc;
			
			// append row to table
			$('#datamonitor > tbody:last-child').append(tbl);
		}
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// load group overview dynamically
function loadGOV(state) {
	var str = "SELECT * FROM adr_stmb_data WHERE ardat = '' AND status LIKE '" + state + "';";
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
		
		// fill table with data
		for (i = 0; i < xmldoc.length; i++) {
			var bday = ""; 
			var bdaycl = "";
			
			if (xmldoc[i].geburtstag != "") {
				bday = new Date(JSON.parse(xmldoc[i].geburtstag));
				bday = bday.toLocaleTimeString();
				bdaycl = dateToString(JSON.parse(xmldoc[i].geburtstag));
			}
			
			var tro = "<tr>"; var tdo = "<td>"; var tdc = "</td>"; var trc = "</tr>";
			var cb = '<input type="checkbox" value="yes" class="md-primary ng-pristine ng-untouched ng-valid ng-not-empty md-checked">';
			
			var tbl = tro + tdo + cb + tdc
			+ tdo + decode_utf8(xmldoc[i].id) + tdc 
			+ tdo + decode_utf8(xmldoc[i].name) + tdc
			+ tdo + decode_utf8(xmldoc[i].vorname) + tdc
			+ tdo + getStatusText(decode_utf8(xmldoc[i].status)) + tdc
			+ tdo + decode_utf8(xmldoc[i].kind) + tdc
			+ tdo + bdaycl + tdc
			+ tdo + decode_utf8(xmldoc[i].zart) + tdc + trc;
			
			// append row to table
			$('#datamonitor > tbody:last-child').append(tbl);
		}
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// load single stmb
function loadSingleStmb(id) {
	var str = "SELECT * FROM adr_stmb_data WHERE id = " + id + ";";
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
			
		// var bday = ""; 
		var bdaycl = "";
        var plaufcl = "";
		
		if (xmldoc[0].geburtstag != "") {
			// bday = new Date(JSON.parse(xmldoc[0].geburtstag));
			// bday = bday.toLocaleTimeString();
			bdaycl = dateToString(JSON.parse(xmldoc[0].geburtstag));
		}
        
        if (xmldoc[0].plaufnahme != "") {
			plaufcl = dateToString(JSON.parse(xmldoc[0].plaufnahme));
		}
			
		// fill input[text] fields
		$("#name").val(xmldoc[0].name);
		$("#vorname").val(xmldoc[0].vorname);
		$("#strasse").val(xmldoc[0].strasse);
		$("#ort").val(xmldoc[0].ort);
		$("#kind").val(xmldoc[0].kind);
		$("#geburtstag").val(bdaycl);
		$("#plaufnahme").val(plaufcl);
        $("#bemerkung").val(xmldoc[0].bemerkung);
		$("#bankkonto").val(xmldoc[0].bankkonto);
		$("#blz").val(xmldoc[0].blz);
		$("#iban").val(xmldoc[0].iban);
		$("#briefanrede").val(xmldoc[0].briefanrede);
		$("#telefon").val(xmldoc[0].telefon);
		$("#fax").val(xmldoc[0].fax);
		$("#email").val(xmldoc[0].mail);
		$("#handy").val(xmldoc[0].handy);
		
		// set radio button
		var newcol;
		switch (xmldoc[0].briefanrede) {
			case "Sehr geehrte Frau":
				newcol = "optfemale";
				break;
			case "Sehr geehrter Herr":
				newcol = "optmale";
				break;
			case "Sehr geehrte Familie":
				newcol = "optfamily";
				break;
		}
		$('#' + newcol).prop('checked',true);
		
		// set zart to value from DB
		$("#zahlungsart option").each(function()
		{
			if ($(this).val() == xmldoc[0].zart) {
				// alert("Zahlungsart: " + $(this).val() + " " + xmldoc[0].zart);
				$('#zahlungsart option[value="' + xmldoc[0].zart + '"]').attr('selected', 'selected');
			}
		});
		// set status to value from DB
		$("#status option").each(function()
		{
			if ($(this).val() == xmldoc[0].status) {
				// alert("Status: " + $(this).val() + " " + xmldoc[0].status);
				$('#status option[value="' + xmldoc[0].status + '"]').attr('selected', 'selected');
			}
		});
		
		}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// display all settings as an overview
function displaySettings() {
	var str = "SELECT atnam, atwrt FROM adr_stmb_cst;";
	//
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
		
		// fill table with data
		for (i = 0; i < xmldoc.length; i++) {
			var tro = "<tr>"; var tdo = "<td>"; var tdc = "</td>"; var trc = "</tr>";
			
			var tbl = tro + tdo + decode_utf8(xmldoc[i].atnam) + tdc + tdo + decode_utf8(xmldoc[i].atwrt) + tdc + trc;
			
			// append row to table
			$('#datamonitor > tbody:last-child').append(tbl);
		}
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// reads status text from settings table
function getStatusText(state) {
	var str = "SELECT atwrt FROM adr_stmb_cst WHERE atnam LIKE '" + state + "'";
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
		
		return decode_utf8(xmldoc[0].atwrt);
		
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// reads row values and returns an object with all Data
function getRowObject(id) {
	var str = "SELECT * FROM adr_stmb_data WHERE id = " + id + ";";
	try {	
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText); // This will wait until you get a response from the ajax request.
		
		var formRow = formatRowObj(xmldoc);
		// console.log("formRow - viewid: " + formRow.viewid);
		return formRow;
		
	} catch (e) {
		alert(e.message);
	}
}

// opens a explorer window on the client machine
function openExp(str) {
	try {
		// load path from DB
		var xmldoc = $.parseJSON($.ajax({ 
			url:  '/adr/scripts/getdata.php?q=' + str,
			dataType: "json", 
			async: false
		}).responseText);
		
		var pathToOpen = xmldoc[0].atwrt;
		//alert(pathToOpen);
	
		$.ajax({
			url:  '/adr/scripts/openExplorer.php',
			dataType: "json", 
			data : JSON.stringify(pathToOpen),
			type : 'POST',
			success: function(data) {
				if (data.error) {
					// handle the error
					throw data.error.msg;
				}
			}
		});
	}
	catch (e) {
		alert(e.message);
	}
}

// --------------------------------------------------------------------------------------------------
// 										end of AJAX GET functions
// --------------------------------------------------------------------------------------------------

// --------------------------------------------------------------------------------------------------
// 										start of AJAX SET functions
// --------------------------------------------------------------------------------------------------
// -- set new stmb
function setSTMB(){
	var str, geb_help,plauf_help;
	
	// get input
	var name = encode_utf8(document.getElementById("name").value);
	var vorname = encode_utf8(document.getElementById("vorname").value);
	var strasse = document.getElementById("strasse").value;
	var ort = encode_utf8(document.getElementById("ort").value);
	var kind = encode_utf8(document.getElementById("kind").value);
	var bday = encode_utf8(document.getElementById("geburtstag").value);
    var plauf = encode_utf8($("#plaufnahme").val());
	var bem = $("#bemerkung").val();
	var bankkonto = encode_utf8(document.getElementById("bankkonto").value);
	var blz = encode_utf8(document.getElementById("blz").value);
	var iban = encode_utf8(document.getElementById("iban").value);
	var zart = $( "#zahlungsart option:selected" ).text();
	var anrede = encode_utf8(document.getElementById("briefanrede").value);
	var tel = encode_utf8(document.getElementById("telefon").value);
	var fax = encode_utf8(document.getElementById("fax").value);
	var mail = encode_utf8(document.getElementById("email").value);
	var handy = encode_utf8(document.getElementById("handy").value);
	var status = $( "#status option:selected" ).val();
		
	var erdat = new Date();
	erdat.setUTCHours(00);
	erdat.setUTCMinutes(00);
	erdat.setUTCSeconds(00);
	erdat.setUTCMilliseconds(000);
	
	var ernam = "Admin";

	// check if birthday date is well formed
	var bDateInput = checkDateFormatInput(bday);
	if (!bDateInput) {
		alert("Bitte Datum in der Form 'TT.MM.JJJJ' eingeben!");
		return;
	}
	if (bday != "") {
		bday = stringToDate(bday);
		geb_help = $("#geburtstag").val();
		var Re = new RegExp("\\.","g");
		geb_help = geb_help.replace(Re,"_");
	}
	else {
		bday = "";
	}
    
    // check if planned entry date is well formed
    // use same check routine as for birthday
	var bplAuf = checkDateFormatInput(plauf);
	if (!bplAuf) {
		alert("Bitte Datum in der Form 'TT.MM.JJJJ' eingeben!");
		return;
	}
    if (plauf != "") {
		plauf = stringToDate(plauf);
		plauf_help = $("#plaufnahme").val();
		var Re2 = new RegExp("\\.","g");
		plauf_help = plauf_help.replace(Re2,"_");
	}
	else {
		plauf = "";
	}
    
    
	// check if mail adress matches pattern
	var bMailInput = checkMailAdress(mail);
	if (!bMailInput) {
		alert("Bitte Mailadresse in der Form '[name] @ [beispiel] . [de]' eingeben!");
		return;
	}
	try {
		
	// create object for phpword
	var obj_php = {
		filename: "Stammblatt_" + name + "_" + vorname + "_" + geb_help,
		name: name + " " + vorname,  
		strasse: strasse, 
		ort: ort, 
		kind: kind,
		bday: $("#geburtstag").val(),
        plauf: $("#plaufnahme").val(),
		anrede: anrede,
		tel: tel,
		fax: fax,
		mail: mail,
		handy: handy,
		bem: bem,
		status: getStatusText(status),
		zart: zart,
		erdat: erdat.toLocaleDateString(),
		ernam: ernam,
		konto: bankkonto,
		blz: blz,
		iban: iban
	};

	var dbtab = "adr_stmb_data";
	
	// SQL string first part (INSERT INTO (...))
	str = "INSERT INTO " + dbtab +" (name, vorname, strasse, ort, kind, geburtstag, plaufnahme, briefanrede, telefon, fax, mail," 
	 + "handy, bemerkung, status, bankkonto, blz, iban, zart, erdat, ernam) VALUES ('";
	 
	 // SQL string variable data
	str += name + "','" + vorname + "','" + strasse + "','" + ort + "','" + kind + "','" + JSON.stringify(bday) 
	+ "','" + JSON.stringify(plauf) + "','" + anrede + "','" + tel + "','" + fax + "','" + mail + "','" + handy + "','" + bem + "','" + status 
	+ "','" + bankkonto + "','" + blz + "','" + iban + "','" + zart + "','" + JSON.stringify(erdat) + "','" + ernam;
	
	// close SQL string
	str += "'); ";

	
		// AJAX call to fill SQL table
		$.ajax({ 
			url:  '/adr/scripts/setdata.php?q=' + str,
			dataType: "json", 
			async: true
		}).responseText;
		
		// AJAX call to create .docx & .pdf file
		$.ajax({
			url:  '/adr/createSTMB.php',
			dataType: "json", 
   			data : JSON.stringify(obj_php),
   		 	type : 'POST'
   		 });
   		 
		// clear input fields
		clearFields();
		
		alert("Stammblatt wurde gespeichert!");
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// -- update sheet
function updateSTMB() {
	var str;
	try {
		// get input
		var name = encode_utf8(document.getElementById("name").value);
		var vorname = encode_utf8(document.getElementById("vorname").value);
		var strasse = document.getElementById("strasse").value;
		var ort = encode_utf8(document.getElementById("ort").value);
		var kind = encode_utf8(document.getElementById("kind").value);
		var bday = encode_utf8(document.getElementById("geburtstag").value);
		var plauf = encode_utf8($("#plaufnahme").val());
		var bem = $("#bemerkung").val();
		var bankkonto = encode_utf8(document.getElementById("bankkonto").value);
		var blz = encode_utf8(document.getElementById("blz").value);
		var iban = encode_utf8(document.getElementById("iban").value);
		var zart = $( "#zahlungsart option:selected" ).text();
		var anrede = encode_utf8(document.getElementById("briefanrede").value);
		var tel = encode_utf8(document.getElementById("telefon").value);
		var fax = encode_utf8(document.getElementById("fax").value);
		var mail = encode_utf8(document.getElementById("email").value);
		var handy = encode_utf8(document.getElementById("handy").value);
		var status = $( "#status option:selected" ).val();
		
		var aedat = new Date();
		aedat.setUTCHours(00);
		aedat.setUTCMinutes(00);
		aedat.setUTCSeconds(00);
		aedat.setUTCMilliseconds(000);
		
		var aenam = "Admin";
		
		// check if birthday date is well formed
		var bDateInput = checkDateFormatInput(bday);
		if (!bDateInput) {
			alert("Bitte Datum in der Form 'TT.MM.JJJJ' eingeben!");
			return;
		}
		if (bday != "") {
			bday = stringToDate(bday);
		}
		else {
			bday = "";
		}
		
        // check if planned entry date is well formed
		var bplAuf = checkDateFormatInput(plauf);
		if (!bplAuf) {
			alert("Bitte Datum in der Form 'TT.MM.JJJJ' eingeben!");
			return;
		}
		if (plauf != "") {
			plauf = stringToDate(plauf);
		}
		else {
			plauf = "";
		}
        
		// check if mail adress matches pattern
		var bMailInput = checkMailAdress(mail);
		if (!bMailInput) {
			alert("Bitte Mailadresse in der Form '[name] @ [beispiel] . [de]' eingeben!");
			return;
		}
		
		var dbtab = "adr_stmb_data";
		// SQL string
		str = "UPDATE " + dbtab + " SET name = '" + name + "', vorname = '" + vorname + "', strasse = '" + strasse 
		+ "', ort = '" + ort + "', kind = '" + kind + "', geburtstag = '" + JSON.stringify(bday) + "', plaufnahme = '" + JSON.stringify(plauf) + "' , briefanrede = '" + anrede + "' , telefon = '" + tel + "', fax = '" + fax + "', mail = '" + mail + "', handy = '" + handy + "', bemerkung = '" + bem + "', status = '" + status
		+ "', bankkonto = '" + bankkonto + "', blz = '" + blz + "', iban = '" + iban + "', zart = '" + zart + "', aedat = '" + JSON.stringify(aedat) + "', aenam = '" + aenam 
		+ "' WHERE id = " + tempid;
	
		// AJAX call to run SQL statements
		$.ajax({ 
			url:  '/adr/scripts/setdata.php?q=' + str,
			dataType: "json", 
			async: true
		}).responseText; 
		
		// clear input fields
		clearFields();
		
		alert("Stammblatt wurde geändert!");
	}
	catch (e) {
		alert("Fehler abgefangen: " + e.message);
	}
}

// --------------------------------------------------------------------------------------------------
// 										end of AJAX SET functions
// --------------------------------------------------------------------------------------------------

// -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~
// 									end of Adresseus - custom code
// -~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~