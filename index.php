<?php
session_start();
if(!isset($_SESSION['username'])){
   header("Location:login.php");
}

include 'head.php';
?>

<body>
<?php include 'navbar.php';?>
	<div class="container">
		<?php include 'addSchedule.php';?>
		<?php include 'workScheduleButtons.php'; ?>
	</div>
			
	<div class="col-md-12 setWeek">
		<div class="col-md-3">
			<label class="control-label" for="date">Vali nädal</label>
		</div>
		<div class="col-md-3">
			<div class="input-append date " id="dp3" data-date="" >
				<input class="span2 datepicker1" id="schedule_date" name="schedule_date" size="16" type="text" value="">
				<span class="add-on"><i class="icon-th"></i></span>
			</div>
		</div>
		<div class="col-md-3">
			<button type="button" class="btn btn-primary" id="generateWeek">OK</button>
			<!--<button type="button" class="btn btn-primary" id="generateNextWeek">Järgmine nädal</button>-->
		</div>
		<div class="col-md-3" id = "infoAsText"></div>
	</div>
	<?php include 'schedule.php';?>
</body>
<script src="js/functions.js"></script>
<script src="js/scripts.js"></script>

