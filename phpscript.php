<?php
function displayDBinfo(){
	$db = 'booking';
	$user = 'root';
	$password = "";

	$conn = new mysqli('localhost',$user,$password,$db)or die("unable to connect");
				$sql = "SELECT id, date, time, name, info, worker, workType FROM schedule";
		$result = mysqli_query($conn, $sql);

		if (mysqli_num_rows($result) > 0) {
				// output data of each row
				while($row = mysqli_fetch_assoc($result)) {
						echo "id: " . $row["id"]. "  date: " . $row["date"]. "time " . $row["time"]."info".$row["info"]. "<br>";
				}
		} else {
				echo "0 results";
		}
}



?>
