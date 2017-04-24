<?php
require_once('mySQLcon.php');

if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST["action"];
	if ($action==""){
		echo"action on tühi";
	}else{
		list($time, $date) = explode('|', $action);
		$query ="SELECT * FROM schedule WHERE date = '$date' AND startTime = '$time'";
		$show = mysqli_query($con, $query) or die("errrroooor");
		while ($row  = mysqli_fetch_array($show)){

			echo $row["date"] ."|".  $row["startTime"] ."|". $row["endTime"] ."|". $row["clientName"] ."|". $row["info"] ."|" . $row["workType"];
		}

	}
}





$con->close();
?>