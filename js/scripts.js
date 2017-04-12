

$("#generateWeek").click(function () {
	
	
	
	$( "#mySchedule" ).empty();
	var dates = [];
	var thisDate = $("#schedule_date").val();
	var date = $("#schedule_date").val();
	var weekday = ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev"];
	var a = new Date(date);
	var day = weekday[a.getDay()]
	if (day.toLowerCase() === "esmaspäev") {
		dates.push(date);
		for (i = 1; i < 7; i++) {
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + i);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
	} else if (day.toLowerCase() === "teisipäev") {

		var yesterday = new Date();
		yesterday.setDate(a.getDate() - 1);
		var n = yesterday.toISOString();
		var res = n.split("T");
		dates.push(res[0])
		dates.push(date);
		for (i = 1; i < 6; i++) {
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + i);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
	} else if (day.toLowerCase() === "kolmapäev") {
		for (i = 2; i > 0; i--) {
			var yesterday = new Date();
			yesterday.setDate(a.getDate() - i);
			var n = yesterday.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
		
		for (i = 0; i < 5; i++) {
			dates.push(date);
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + 1);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			a = tomorrow;
			date = res[0];
		}
	}else if (day.toLowerCase() === "neljapäev") {
		for (i = 3; i > 0; i--) {
			var yesterday = new Date();
			yesterday.setDate(a.getDate() - i);
			var n = yesterday.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
		
		for (i = 0; i < 4; i++) {
			dates.push(date);
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + 1);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			a = tomorrow;
			date = res[0];
		}
	}else if (day.toLowerCase() === "reede") {
		for (i = 4; i > 0; i--) {
			var yesterday = new Date();
			yesterday.setDate(a.getDate() - i);
			var n = yesterday.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
		
		for (i = 0; i < 3; i++) {
			dates.push(date);
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + 1);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			a = tomorrow;
			date = res[0];
		}
	}else if (day.toLowerCase() === "laupäev") {
		for (i = 5; i > 0; i--) {
			var yesterday = new Date();
			yesterday.setDate(a.getDate() - i);
			var n = yesterday.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
		
		for (i = 0; i < 2; i++) {
			dates.push(date);
			var tomorrow = new Date();
			tomorrow.setDate(a.getDate() + 1);
			var n = tomorrow.toISOString();
			var res = n.split("T");
			a = tomorrow;
			date = res[0];
		}
	}else if (day.toLowerCase() === "pühapäev") {
		for (i = 6; i > 0; i--) {
			var yesterday = new Date();
			yesterday.setDate(a.getDate() - i);
			var n = yesterday.toISOString();
			var res = n.split("T");
			dates.push(res[0]);
		}
		dates.push(thisDate);
		
	}

	
	$('#mySchedule').weekly_schedule({
	// Days displayed
	days: ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"],
	dates: dates,
	// Hours displyed
	hours: "7:00-20:00"


});
	
});





$('.datepicker').datepicker({
	format: 'yyyy-mm-dd',
	weekStart: 1
});