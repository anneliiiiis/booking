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

	

	/*$('#mySchedule').weekly_schedule({
		// Days displayed
		days: ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"],
		dates: dates,
		datesForClass: datesForClass,
		// Hours displyed
		hours: "7:00-20:00"


	});*/
	
	
	//Siin lisan saadud info õigesse divi

});

function getDayOfWeek(d, nr) {
	d = new Date(d);
	var day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : nr);
	return new Date(d.setDate(diff));
}




$('.datepicker').datepicker({
	format: 'yyyy-mm-dd',
	weekStart: 1
});