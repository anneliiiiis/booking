<?php

header('Content-Type: text/html; charset=utf-8');
require_once('mySQLcon.php');



if(isset($_POST['addTime']) && !empty($_POST['addTime'])) {		
	$query = "INSERT INTO schedule (id,date,startTime,endTime,clientName,info,workType)VALUES(NULL,?,?,?,?,?,?)";			
  $addTime = $_POST["addTime"];
	list($form_date, $start_time, $end_time, $clientName, $info, $work_type) = explode('|', $addTime);
	$stmt = mysqli_prepare($con, $query);	
	mysqli_stmt_bind_param($stmt, "ssssss", $form_date, $start_time,$end_time ,$clientName, $info,$work_type);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows ==1){
		echo'Aeg lisatud!';
		mysqli_stmt_close($stmt);
		mysqli_close($con);
	}else{
		echo'Aega ei lisatud. Proovi uuesti';
		mysqli_stmt_close($stmt);
		mysqli_close($con);
	}
	
}
?>