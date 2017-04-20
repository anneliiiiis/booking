<?php

require_once('mySQLcon.php');

if(isset($_POST['checkForDoubles']) && !empty($_POST['checkForDoubles'])) {
  
  $checkForDoubles = $_POST['checkForDoubles'];
  list($form_date_check, $start_time_check) = split('[|]', $checkForDoubles);
  $start_time_check  = "0" . $start_time_check . ":00";
  $query ="SELECT * FROM schedule WHERE date = '$form_date_check' AND startTime = '$start_time_check'";
 $show = mysqli_query($con, $query) or die("errrroooor");
  while ($row  = mysqli_fetch_array($show)){

			echo $row["date"] ."|".  $row["startTime"] ."|". $row["endTime"] ."|". $row["clientName"] ."|". $row["info"] ."|" . $row["workType"];
		}
}
?>