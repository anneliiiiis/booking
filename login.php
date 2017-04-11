
<?php
   ob_start();
   session_start();
if(isset($_SESSION['username'])){
   header("Location:index.php");
}
?>

<?
   // error_reporting(E_ALL);
   // ini_set("display_errors", 1);
?>

<html lang = "en">
   
	<?php include 'head.php';?>

	
   <body>
      <div class="container">
      <h1>Aegade broneerimine</h1>
      <h2>Sisesta kasutajanimi ja parool</h2> 
      <div class = "container form-signin">
         
         <?php
            $msg = '';
            
            if (isset($_POST['login']) && !empty($_POST['username']) 
               && !empty($_POST['password'])) {
				
               if ($_POST['username'] == 'u' && 
                  $_POST['password'] == 'p') {
                  $_SESSION['valid'] = true;
                  $_SESSION['timeout'] = time();
                  $_SESSION['username'] = 'tutorialspoint';
                  header('Refresh: 2; URL = index.php');
               }else {
                  $msg = 'Wrong username or password';
               }
            }
         ?>
      </div> <!-- /container -->
      
      <div class = "container">
      
         <form class = "form-signin" role = "form" 
            action = "<?php echo htmlspecialchars($_SERVER['PHP_SELF']); 
            ?>" method = "post">
            <h4 class = "form-signin-heading"><?php echo $msg; ?></h4>
            <input type = "text" class = "form-control" 
               name = "username" placeholder = "kasutajanimi" 
               required autofocus></br>
            <input type = "password" class = "form-control"
               name = "password" placeholder = "parool" required>
            <button class = "btn btn-lg btn-primary btn-block" type = "submit" 
               name = "login">Login</button>
         </form>
			
         Click here to clean <a href = "logout.php" tite = "Logout">Session.
         
      </div> 
      </div>
   </body>
</html>