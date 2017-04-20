<?php
require_once('mySQLcon.php');

$action = $_POST["action"];
if ($action==""){
	echo"jõudsin siia poop";
}else{
	list($time, $date) = split('[|]', $action);
	$query = "DELETE FROM schedule WHERE date = ? AND startTime = ?";
	$stmt = mysqli_prepare($con, $query);
	mysqli_stmt_bind_param($stmt, "ss", $date, $time);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows > 0){
		echo "Aeg kustutatud kuupäevaga: " . $date . " kellaajaga: " . $time;
	}else{
		echo "Aeg pole veel lisatud.";
	}
}
$con->close();
?>