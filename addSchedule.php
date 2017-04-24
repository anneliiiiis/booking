<div class="addTimeContainer" id="schedule-form" >

	<form class="form-horizontal addTimeForm" method="post">
		<div class="form-group col-md-3">
			<label class="control-label" for="date">Kuupäev:</label>
			
				<input  class="span2 workDate" size="16" name="workDate" id = "workDate" type="data" maxlength="8">

		</div>
		
		<div class="form-group col-md-3">
			<label class="control-label ">Algusaeg:</label>
			<select class="form-control  startTime" name="start_time" id="startTime">
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
				<option>15:00</option>
				<option>15:15</option>
				<option>15:30</option>
				<option>15:45</option>
				<option>16:00</option>
				<option>16:15</option>
				<option>16:30</option>
				<option>16:45</option>
        <option>17:00</option>
				<option>17:15</option>
				<option>17:30</option>
				<option>17:45</option>
				<option>18:00</option>
				<option>18:15</option>
				<option>18:30</option>
				<option>18:45</option>
				<option>19:00</option>
				<option>19:15</option>
				<option>19:30</option>
				<option>19:45</option>
				<option>20:00</option>
				<option>20:15</option>
				<option>20:30</option>
				<option>20:45</option>
				<option>20:00</option>
				<option>20:15</option>
				<option>20:30</option>
				<option>20:45</option>
			</select>
		</div>
		<div class="form-group col-md-3">
			<label class="control-label ">Lõppaeg:</label>
			<select class="form-control " name="end_time" id="endTime">
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
				<option>15:00</option>
				<option>15:15</option>
				<option>15:30</option>
				<option>15:45</option>
				<option>16:00</option>
				<option>16:15</option>
				<option>16:30</option>
				<option>16:45</option>
        <option>17:00</option>
				<option>17:15</option>
				<option>17:30</option>
				<option>17:45</option>
				<option>18:00</option>
				<option>18:15</option>
				<option>18:30</option>
				<option>18:45</option>
				<option>19:00</option>
				<option>19:15</option>
				<option>19:30</option>
				<option>19:45</option>
				<option>20:00</option>
				<option>20:15</option>
				<option>20:30</option>
				<option>20:45</option>
				<option>20:00</option>
				<option>20:15</option>
				<option>20:30</option>
				<option>20:45</option>
			</select>

		</div>
		<div class="form-group col-md-3">
			<label class="control-label" for="name">Kliendi nimi:</label>
			<div class="">
				<input type="text" class="form-control" id="clientName" maxlength="100" name="clientName" placeholder="kliendi nimi">
			</div>
		</div>
		<div class="form-group col-md-3">
			<label class="control-label" for="info">Muu info:</label>
			<input type="text" class="form-control" id="otherInfo" maxlength="100" name="info" placeholder="muu info">
		</div>
		<div class="form-group col-md-3">
				<label class="control-label ">Protseduur:</label>
				<select class="form-control " name="work_type" id="workType">
					<option>Nõustamine</option>
					<option>Laser</option>
					<option>Massaaž</option>
					<option>Füsioteraapia</option>
					<option>Kinesioteipimine</option>
				</select>
			</div>
		
		
	</form>
	<div class=" col-md-3 addSubmittButton">
			
		
		</div>
		<button type="button" class="btn btn-default exitForm"> <span class=" glyphicon glyphicon-remove" aria-hidden="true"></span></button>
</div>