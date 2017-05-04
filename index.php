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

      
      
      <div class="pull-right" id="infoAsText"></div>
      </div>
      <?php include 'schedule.php';?>
  </body>
  <script src="js/functions.js"></script>
  <script src="js/scripts.js"></script>