<?php
require_once('mySQLcon.php');

$action = $_POST["action"];
if ($action==""){
	echo"";
}else{
	$query ="SELECT * FROM schedule WHERE date = '$action'";
	$show = mysqli_query($con, $query) or die("errrroooor");
	while ($row  = mysqli_fetch_array($show)){
		
		echo $row["date"] ."|".  $row["startTime"] ."|". $row["endTime"] ."|". $row["clientName"] ."|". $row["info"] ."|" . $row["workType"] . "--";
	}
	
}
?>