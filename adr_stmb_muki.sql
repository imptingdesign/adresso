-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 15. Mrz 2017 um 22:57
-- Server-Version: 10.1.21-MariaDB
-- PHP-Version: 7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `adr_stmb_muki`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `adr_serialdb`
--

CREATE TABLE `adr_serialdb` (
  `id` int(11) NOT NULL,
  `viewid` int(11) NOT NULL,
  `name` text NOT NULL,
  `vorname` text NOT NULL,
  `strasse` text NOT NULL,
  `ort` text NOT NULL,
  `land` text NOT NULL,
  `kind` text NOT NULL,
  `geburtstag` text NOT NULL,
  `briefanrede` text NOT NULL,
  `telefon` text NOT NULL,
  `fax` text NOT NULL,
  `mail` text NOT NULL,
  `handy` text NOT NULL,
  `bemerkung` text NOT NULL,
  `status` text NOT NULL,
  `bankkonto` text NOT NULL,
  `blz` text NOT NULL,
  `iban` text NOT NULL,
  `zart` text NOT NULL,
  `frei1` text NOT NULL,
  `frei2` text NOT NULL,
  `frei3` text NOT NULL,
  `erdat` text NOT NULL,
  `ernam` text NOT NULL,
  `adrmod` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `adr_stmb_cst`
--

CREATE TABLE `adr_stmb_cst` (
  `id` int(11) NOT NULL,
  `atnam` text NOT NULL,
  `atwrt` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `adr_stmb_cst`
--

INSERT INTO `adr_stmb_cst` (`id`, `atnam`, `atwrt`) VALUES
(4, 'STMB_VZ_DOC', '../doc/stammblatt\r\n'),
(5, 'STMB_VZ_PDF', '../pdf/stammblatt'),
(6, 'TEMPL_STMB_DOC', '../template/stmb.doc'),
(7, 'TEMPL_LETTER_SER_1', '../template/letter1.doc\r\n'),
(8, 'TEMPL_LETTER_SER_2', '../template/letter2.doc'),
(9, 'ST1', 'Voranmeldung'),
(10, 'ST2', 'Verbindliche Anmeldung'),
(11, 'ST3', 'laufend'),
(12, 'ST4', 'beendet');

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `adr_stmb_data`
--

CREATE TABLE `adr_stmb_data` (
  `id` int(11) NOT NULL,
  `name` text NOT NULL,
  `vorname` text NOT NULL,
  `strasse` text NOT NULL,
  `ort` text NOT NULL,
  `kind` text NOT NULL,
  `geburtstag` text NOT NULL,
  `plaufnahme` text NOT NULL,
  `briefanrede` text NOT NULL,
  `telefon` text NOT NULL,
  `fax` text NOT NULL,
  `mail` text NOT NULL,
  `handy` text NOT NULL,
  `bemerkung` text NOT NULL,
  `status` text NOT NULL,
  `bankkonto` text NOT NULL,
  `blz` text NOT NULL,
  `iban` text NOT NULL,
  `zart` text NOT NULL,
  `frei1` text NOT NULL,
  `frei2` text NOT NULL,
  `frei3` text NOT NULL,
  `erdat` text NOT NULL,
  `ernam` text NOT NULL,
  `aenam` text NOT NULL,
  `aedat` text NOT NULL,
  `ardat` text NOT NULL,
  `del` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `adr_stmb_data`
--

INSERT INTO `adr_stmb_data` (`id`, `name`, `vorname`, `strasse`, `ort`, `kind`, `geburtstag`, `plaufnahme`, `briefanrede`, `telefon`, `fax`, `mail`, `handy`, `bemerkung`, `status`, `bankkonto`, `blz`, `iban`, `zart`, `frei1`, `frei2`, `frei3`, `erdat`, `ernam`, `aenam`, `aedat`, `ardat`, `del`) VALUES
(2, 'HAns', 'testvorname', 'strasse 1', '90425 Ort', '1', '\"1988-10-22T00:00:00.000Z\"', '', 'Sehr geehrter Herr', '12345', '67890', 'hans@mail.com', '45678', 'bemerkung', 'ST1', '1111', '2222', 'de111111122222222', 'paypal', '', 'frei2', '', '\"2016-10-22T00:00:00.000Z\"', 'mayerm', 'poppst', '\"2016-11-02T00:00:00.000Z\"', '', '0'),
(3, 'HAnsi', 'testvorname', 'strasse 2', '90425 Ort2', '44', '\"1988-10-22T00:00:00.000Z\"', '', 'Sehr geehrte Frau', '12345', '67890', 'hans@mail.com', '45678', 'bemerkung', 'ST2', '1111', '2222', 'de111111122222222', 'paypal', '', 'frei2', '', '\"2015-09-01T00:00:00.000Z\"', 'mayerm', 'poppst', '\"2016-11-02T00:00:00.000Z\"', '2016-11-14T00:00:00.000Z', '0'),
(4, 'Steffen', 'testvorname', 'strasse 2', '90425 Ort2', '44', '\"1988-10-22T00:00:00.000Z\"', '', 'Sehr geehrte Frau', '12345', '67890', 'hans@mail.com', '45678', 'bemerkung', 'ST3', '1111', '2222', 'de111111122222222', 'paypal', '', 'frei2', '', '\"2015-09-01T00:00:00.000Z\"', 'mayerm', 'poppst', '\"2016-11-02T00:00:00.000Z\"', '2016-11-14T00:00:00.000Z', '0'),
(5, 'Matthias', 'testvorname', 'strasse 2', '90425 Ort2', '44', '\"1988-10-22T00:00:00.000Z\"', '', 'Sehr geehrte Frau', '12345', '67890', 'hans@mail.com', '45678', 'bemerkung', 'ST4', '1111', '2222', 'de111111122222222', 'paypal', '', 'frei2', '', '\"2015-09-01T00:00:00.000Z\"', 'mayerm', 'poppst', '\"2016-11-02T00:00:00.000Z\"', '2016-11-14T00:00:00.000Z', '0'),
(6, 'Maxi', 'testvorname', 'Musterstrasse 122', '12345 Musterstadt', 'Kind1', '\"2005-04-05T00:00:00.000Z\"', '', 'Sehr geehrter Herr', '0911/123450', '0911/1234522', 'mail@mailing.com', '0151/1234567', 'Bemerkung\r\nzweite zeile', 'ST4', '1234567', '7654321', 'de232134345235435', 'Dauerauftrag', '', '', '', '\"0016-01-08T00:00:00.000Z\"', 'Adresseus_tool', 'Admin', '\"2016-11-16T00:00:00.000Z\"', '', ''),
(9, 'Mustermann', 'Maximilian', 'MusterstraÃŸe 3', '12345 Musterstadt', 'Justus', '\"1999-07-30T00:00:00.000Z\"', '', 'Sehr geehrte Familie', '', '', 'maxi.muster@test.com', '', '', 'ST2', '', '', '', 'Rechnung', '', '', '', '\"0016-01-08T00:00:00.000Z\"', 'Adresseus_tool', 'Admin', '\"2016-11-23T00:00:00.000Z\"', '', ''),
(10, 'Test', 'testvorname', 'Teststr. 3', '12345 Teststadt', 'Brunhilde', '\"2016-12-01T00:00:00.000Z\"', '', 'Sehr geehrte Frau', '', '', 'askdjwad@test.com', '', '', 'ST3', '', '', '', 'Rechnung', '', '', '', '\"0016-01-08T00:00:00.000Z\"', 'Adresseus_tool', 'Admin', '\"2016-11-23T00:00:00.000Z\"', '', ''),
(11, 'Maxi', 'testvorname', 'Musterstrasse 1', '12345 Musterstadt', 'Kind1', '\"2004-04-05T00:00:00.000Z\"', '', 'Sehr geehrter Herr', '0911/123450', '0911/1234522', 'mail@mailing.com', '0151/1234567', 'Bemerkung', 'ST4', '1234567', '7654321', 'de232134345235435', 'PayPal', '', '', '', '\"0016-01-08T00:00:00.000Z\"', 'Adresseus_tool', '', '', '', ''),
(13, 'aswd', 'asd', 'asd', 'asd', '', '\"2016-10-10T00:00:00.000Z\"', '\"2017-03-20T00:00:00.000Z\"', '', '', '', '', '', '', 'ST1', '', '', '', 'Rechnung', '', '', '', '\"2017-03-15T00:00:00.000Z\"', 'Admin', '', '', '', '');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `adr_serialdb`
--
ALTER TABLE `adr_serialdb`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `adr_stmb_cst`
--
ALTER TABLE `adr_stmb_cst`
  ADD PRIMARY KEY (`id`);

--
-- Indizes für die Tabelle `adr_stmb_data`
--
ALTER TABLE `adr_stmb_data`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `adr_serialdb`
--
ALTER TABLE `adr_serialdb`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT für Tabelle `adr_stmb_cst`
--
ALTER TABLE `adr_stmb_cst`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT für Tabelle `adr_stmb_data`
--
ALTER TABLE `adr_stmb_data`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
