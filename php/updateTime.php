<?php



header('Content-Type: text/html; charset=utf-8');
require_once('mySQLcon.php');




if(isset($_POST['updateTime']) && !empty($_POST['updateTime'])) {
    $updateTime = $_POST["updateTime"];
    $query = "UPDATE schedule SET date = ?,startTime  = ?,endTime =? ,clientName = ?,info=? ,workType = ? WHERE date=? AND startTime=? ";
    list($form_date, $start_time, $end_time, $clientName, $info, $work_type) = explode('|', $updateTime);
    $start_time  = "0" . $start_time . ":00";
    $stmt = mysqli_prepare($con, $query);	
	mysqli_stmt_bind_param($stmt, "ssssssss", $form_date, $start_time,$end_time ,$clientName, $info,$work_type, $form_date, $start_time);
	mysqli_stmt_execute($stmt);
	$affected_rows = mysqli_stmt_affected_rows($stmt);
	if($affected_rows >0){
		  echo'Aeg uuendatud';
		  mysqli_stmt_close($stmt);
		  mysqli_close($con);
	}else{
		  echo'Aega ei uuendatud. Proovi uuesti!';
		  mysqli_stmt_close($stmt);
		  mysqli_close($con);
	}
}

?>