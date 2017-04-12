<?php
header('Content-Type: text/html; charset=utf-8');
if(isset($_POST['submit'])){
			$data_missing = array();
			if(empty($_POST['form_date'])){
				$data_missing[] = 'Kuupäev';
			}else{
				$form_date = trim($_POST['form_date']);
			}
			if(empty($_POST['start_time'])){
				$data_missing[] = 'algusaeg';
			}else{
				$start_time = trim($_POST['start_time']);
			}
			if(empty($_POST['end_time'])){
				$data_missing[] = 'lõppaeg';
			}else{
				$end_time = trim($_POST['end_time']);
			}
			if(empty($_POST['clientName'])){
				$data_missing[] = 'Kliendi nimi';
			}else{
				$clientName = trim($_POST['clientName']);
			}
			if(empty($_POST['info'])){
				$data_missing[] = 'Muu info';
			}else{
				$info = trim($_POST['info']);
			}
			if(empty($_POST['work_type'])){
				$data_missing[] = 'töö tüüp';
			}else{
				$work_type = trim($_POST['work_type']);
			}
			if(empty($data_missing)){
				require_once('mySQLcon.php');
				$query = "INSERT INTO schedule (id,date,startTime,endTime,clientName,info,workType)VALUES(NULL,?,?,?,?,?,?)";
				mysql_query("SET NAMES utf8");
				$stmt = mysqli_prepare($conn, $query);
				
					
				
				mysqli_stmt_bind_param($stmt, "ssssss", $form_date, $start_time,$end_time ,$clientName, $info,$work_type);
				mysqli_stmt_execute($stmt);
				$affected_rows = mysqli_stmt_affected_rows($stmt);
				if($affected_rows ==1){
					echo'Aeg lisatud!';
					mysqli_stmt_close($stmt);
					mysqli_close($conn);
				}else{
					echo'Aega ei lisatud. Proovi uuesti';
					mysqli_stmt_close($stmt);
					mysqli_close($conn);
				}
			}else{
				echo 'Täida kõik väljad!';
			}
			
		}
?>
	<form class="form-horizontal" method="post">
		<div class="form-group col-md-12">
			<label class="control-label col-md-2" for="date">Kuupäev:</label>
			<div class="input-append date " id="dp3" data-date="" >
				<input class="span2 datepicker" name="form_date" size="16" type="text" value="">
				<span class="add-on"><i class="icon-th"></i></span>
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-2">Algusaeg:</label>
			<select class="form-control col-md-1" name="start_time" id="">
				<option>7:00</option>
				<option>7:15</option>
				<option>7:30</option>
				<option>7:45</option>
				<option>8:00</option>
				<option>8:15</option>
				<option>8:30</option>
				<option>8:45</option>
				<option>9:00</option>
				<option>9:15</option>
				<option>9:30</option>
				<option>9:45</option>
				<option>10:00</option>
				<option>10:15</option>
				<option>10:30</option>
				<option>10:45</option>
				<option>11:00</option>
				<option>11:15</option>
				<option>11:30</option>
				<option>11:45</option>
				<option>12:00</option>
				<option>12:15</option>
				<option>12:30</option>
				<option>12:45</option>
				<option>13:00</option>
				<option>13:15</option>
				<option>13:30</option>
				<option>13:45</option>
				<option>14:00</option>
				<option>14:15</option>
				<option>14:30</option>
				<option>14:45</option>
			</select>
			<label class="control-label col-md-2">Lõppaeg:</label>
			<select class="form-control col-md-1" name="end_time" id="Hour">
				<option>7:00</option>
				<option>7:15</option>
				<option>7:30</option>
				<option>7:45</option>
				<option>8:00</option>
				<option>8:15</option>
				<option>8:30</option>
				<option>8:45</option>
				<option>9:00</option>
				<option>9:15</option>
				<option>9:30</option>
				<option>9:45</option>
				<option>10:00</option>
				<option>10:15</option>
				<option>10:30</option>
				<option>10:45</option>
				<option>11:00</option>
				<option>11:15</option>
				<option>11:30</option>
				<option>11:45</option>
				<option>12:00</option>
				<option>12:15</option>
				<option>12:30</option>
				<option>12:45</option>
				<option>13:00</option>
				<option>13:15</option>
				<option>13:30</option>
				<option>13:45</option>
				<option>14:00</option>
				<option>14:15</option>
				<option>14:30</option>
				<option>14:45</option>
			</select>

		</div>
		<div class="form-group">
			<label class="control-label col-md-2" for="name">Kliendi nimi:</label>
			<div class="col-sm-10">
				<input type="text" class="form-control col-md-5" id="clientName" name="clientName" placeholder="kliendi nimi">
			</div>
		</div>
		<div class="form-group">
			<label class="control-label col-md-2" for="info">Muu info:</label>
			<input type="text" class="form-control col-md-10" id="clientName" name="info" placeholder="muu info" </div>
			<div class="form-group">
				<label class="control-label col-md-2">Protseduur:</label>
				<select class="form-control col-md-6" name="work_type" id="">
					<option>Nõustamine</option>
					<option>Laser</option>
					<option>Massaž</option>
					<option>Füsioteraapia</option>
					<option>Kinesioteipimine</option>
				</select>
			</div>
			<div class="form-group">
				<div class="col-sm-offset-2 col-sm-10">
					<button type="submit" name="submit" class="btn btn-default">Submit</button>
				</div>
			</div>

	</form>