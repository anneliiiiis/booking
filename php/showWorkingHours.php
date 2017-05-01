<?php
require_once('mySQLcon.php');
if(isset($_POST['action']) && !empty($_POST['action'])) {
	$action = $_POST["action"];
	if ($action==""){
		echo"";
	}else{
		$query ="SELECT * FROM working_hours WHERE date = '$action'";
		$show = mysqli_query($con, $query) or die("errrroooor");
		while ($row  = mysqli_fetch_array($show)){

			echo $row["date"] ."|".  $row["start_time"] ."|". $row["end_time"] ."|".$row["worker"]."--";
		}
	}
}
?>