<?php



header('Content-Type: text/html; charset=utf-8');
require_once('mySQLcon.php');



if(isset($_POST['addTime']) && !empty($_POST['addTime'])) {		
	$query = "INSERT INTO schedule (id,date,startTime,endTime,clientName,info,workType)VALUES(NULL,?,?,?,?,?,?)";			$addTime = $_POST["addTime"];
	mysql_query("SET NAMES utf8");
	list($form_date, $start_time, $end_time, $clientName, $info, $work_type) = split('[|]', $addTime);
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






/*if(isset($_POST['action']) && !empty($_POST['action'])) {
$action = $_POST["action"];
if ($action==""){
	echo"jõudsin siia poop";
}else{
	list($Start_time, $date ) = split('[|]', $action);
	$query = "UPDATE schedule SET  WHERE date = ?, startTime = ? ";
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


}*/



//UPDATE table_name
//SET column1 = value1, column2 = value2, ...
//WHERE condition;
?>