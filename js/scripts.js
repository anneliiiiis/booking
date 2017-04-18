$('document').ready(function(){
	$(document).ready(function(){
		$(".addTime").click(function(){
			$(".workScheduleButtons").slideUp();
			$(".addTimeContainer").slideToggle();
			$('.hour').on('mousedown', function () {
				var idName = $(this).attr('id');
				var timeAndDateCliced  = idName.split("|");
				var timeCliced  = timeAndDateCliced[0];
				var dateCliced = timeAndDateCliced[1];
				document.getElementById("datepicker2").value = dateCliced;
				document.getElementById("startTime").value = timeCliced;
		
			});
		});
	});
	$(document).ready(function(){
		$(".addWorkSchedule").click(function(){
			$(".addTimeContainer").slideUp();
			$(".workScheduleButtons").slideToggle();
		});
	});
	
});


$("#generateWeek").click(function () {

	$("#mySchedule").empty();
	var date = $("#schedule_date").val();
	var a = new Date(date);
	

	var monISO = getDayOfWeek(a, 1).toISOString().split('T');
	var monday = monISO[0].split('-');
	var mon = monday[2] + "." + monday[1] + "." + monday[0];

	var tueISO = getDayOfWeek(a, 2).toISOString().split('T');
	var tuesday = tueISO[0].split('-');
	var tue = tuesday[2] + "." + tuesday[1] + "." + tuesday[0];

	var wenISO = getDayOfWeek(a, 3).toISOString().split('T');
	var wednesday = wenISO[0].split('-');
	var wen = wednesday[2] + "." + wednesday[1] + "." + wednesday[0];

	var thuISO = getDayOfWeek(a, 4).toISOString().split('T');
	var thursday = thuISO[0].split('-');
	var thu = thursday[2] + "." + thursday[1] + "." + thursday[0];

	var friISO = getDayOfWeek(a, 5).toISOString().split('T');
	var friday = friISO[0].split('-');
	var fri = friday[2] + "." + friday[1] + "." + friday[0];

	var satISO = getDayOfWeek(a, 6).toISOString().split('T');
	var saturday = satISO[0].split('-');
	var sat = saturday[2] + "." + saturday[1] + "." + saturday[0];

	var sunISO = getDayOfWeek(a, 7).toISOString().split('T');
	var sunday = sunISO[0].split('-');
	var sun = sunday[2] + "." + sunday[1] + "." + sunday[0];

	var dates = [mon, tue, wen, thu, fri, sat, sun];
	var datesForClass = [monISO[0], tueISO[0], wenISO[0], thuISO[0], friISO[0], satISO[0], sunISO[0]];
	
	
	
	$('#mySchedule').weekly_schedule({
		// Days displayed
		days: ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"],
		dates: dates,
		datesForClass: datesForClass,
		// Hours displyed
		hours: "07:00-20:00"
	});

	$('#mySchedule').ready(function(){
		for(var i = 0; i < datesForClass.length; i++){
			
			show(datesForClass[i]);
	
	}
	});

	//Siin lisan saadud info õigesse divi

});

function getDayOfWeek(d, nr) {
	d = new Date(d);
	var day = d.getDay(),
	diff = d.getDate() - day + (day == 0 ? -6 : nr);
	return new Date(d.setDate(diff));
}

function show($date){
	
	$.ajax({
		type: "POST",
		url: "phpscript.php",
		data: {action: $date},
		success: function (response){
			if (response != ""){ 
				response = response.slice(0, -2);
				var elements = response.split("--");

				for (var i = 0; i < elements.length; i++) {
					var row = elements[i];
					row = row.split("|");
					var date = row[0];
					var startTime = row[1].slice(0, -3);
					var endTime = row[2].slice(0, -3);

					var listOfidNames = getIdNames(startTime, endTime, date);
					var workType= row[5];
					for(var j = 0; j < listOfidNames.length; j++){
						var idName= listOfidNames[j];
						colorDiv(workType, idName);
						document.getElementById(idName).innerHTML = row[5] + "<br> "+row[3]+ "<br> "+row[4];
					}
					/*for(){
						
					}*/
				}
			}			
		}
	});
	
}

function colorDiv($string, $id){
	if($string.toLowerCase() == "laser"){
		document.getElementById($id).style.backgroundColor = "#80fbbc";
	}else if($string.toLowerCase() == "nõustamine"){
		document.getElementById($id).style.backgroundColor = "#ff9279";
	}else if($string.toLowerCase() == "massaž"){
		document.getElementById($id).style.backgroundColor = "#80eafb";
	}else if($string.toLowerCase() == "füsioteraapia"){
		document.getElementById($id).style.backgroundColor = "#ffa7e0";
	}else if($string.toLowerCase() == "kinesioteipimine"){
		document.getElementById($id).style.backgroundColor = "#fbf280";
	}
	
}

function getIdNames($startTime, $endTime, $date){
	var listOfid = [];
	if($startTime[0]=="0"){
		$startTime = $startTime.substring(1);
	}
	listOfid.push($startTime+"|"+$date);
	
	if($endTime[0]=="0"){
		$endTime = $endTime.substring(1);
	}
	
	var newTime = $endTime;

	
	while(newTime.localeCompare($startTime) != 0 ){
		var endTimeList = newTime.split(":");
		if(endTimeList[1] == "00"){
			newTime= (+endTimeList[0]- +'1')+":"+"45";
			listOfid.push(newTime+"|"+$date);
		}else if(endTimeList[1] == "15"){
			newTime= endTimeList[0]+":"+"00";
			listOfid.push(newTime+"|"+$date);
		}else{
			newTime= endTimeList[0] + ":"+ (+endTimeList[1]- +'15');
			listOfid.push(newTime+"|"+$date);
		}
	
	}
	return listOfid;
	
}

$('.datepicker1').datepicker({
	format: 'yyyy-mm-dd',
	weekStart: 1
});
$('.datepicker2').datepicker({
	format: 'yyyy-mm-dd',
	weekStart: 1,
	position: 'fixed'
});