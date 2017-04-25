<?php


header('Content-Type: text/html; charset=utf-8');
require_once('mySQLcon.php');

if(isset($_POST['workerSchedule']) && !empty($_POST['workerSchedule'])) {	
    $workerSchedule = $_POST['workerSchedule'];
    list($date, $start_time, $end_time, $worker_name) = explode(',', $workerSchedule);
    $query = "INSERT INTO working_hours (id,worker,date,start_time,end_time)VALUES(NULL,?,?,?,?)";
    $stmt = mysqli_prepare($con, $query);	
    if ( !$stmt) {
      die('mysqli error: '.mysqli_error($con));
    }
    mysqli_stmt_bind_param($stmt, "ssss", $worker_name, $date, $start_time, $end_time);
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
