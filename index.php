<?php
session_start();
if(!isset($_SESSION['username'])){
   header("Location:login.php");
}
include 'phpscript.php';
?>
	<?php include 'head.php';?>

		<body>

			<div class="container">
				<a href="logout.php" tite="Logout" class="btn btn-info pull-right">Logi välja</a>
				<h2>Elulaseri ajad</h2>
			  	<button type="button" class="btn btn-primary" onclick="">Lisa uus aeg</button>
				<?php include 'addSchedule.php';?>


				<div class="btn-group btn-group-justified" role="work-group">
					<div class="btn-group" role="work-group">
						<button type="button" class="btn btn-danger" id="firstWorker">Kristiina</button>
					</div>
					<div class="btn-group" role="work-group">
						<button type="button" class="btn btn-success" id="secondWorker">Merily</button>
					</div>

				</div>
			</div>
			<div class="col-md-12" id="mySchedule">
			</div>

		</body>
		<script src="js/scripts.js"></script>