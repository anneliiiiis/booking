<?php
require_once('mySQLcon.php');

$action = $_POST["action"];
if ($action==""){
	echo"";
}else{
	list($time, $date, $worker) = explode('|', $action);
	$query = "DELETE FROM working_hours WHERE date = ? AND start_time = ? AND worker = ?";
	$stmt = mysqli_prepare($con, $query);
	mysqli_stmt_bind_param($stmt, "sss", $date, $time, $worker);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows > 0){
		echo " " . $date . " kellaajaga: " . $time;
	}else{
		echo "ei kustutatud sellist aega ";
	}
}
$con->close();
?>