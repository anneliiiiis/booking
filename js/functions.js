function enableHourClick() {
  $('.hour').on('mousedown', function () {
    document.getElementById("endTime").value = "";
    document.getElementById("clientName").value = "";
    document.getElementById("otherInfo").value = "";
    document.getElementById("workType").value = "";
    var idName = $(this).attr('id');
    var timeAndDateCliced = idName.split("|");
    var timeCliced = timeAndDateCliced[0];
    var dateCliced = timeAndDateCliced[1];
    document.getElementById("workDate").value = dateCliced;
    document.getElementById("startTime").value = timeCliced;
    getAllDataForForm(idName);
  });
}

function generateWeekWithData($a) {
  $("#mySchedule").empty();
  var monISO = getDayOfWeek($a, 1).toISOString().split('T');
  var monday = monISO[0].split('-');
  var mon = monday[2] + "." + monday[1] + "." + monday[0];

  var tueISO = getDayOfWeek($a, 2).toISOString().split('T');
  var tuesday = tueISO[0].split('-');
  var tue = tuesday[2] + "." + tuesday[1] + "." + tuesday[0];

  var wenISO = getDayOfWeek($a, 3).toISOString().split('T');
  var wednesday = wenISO[0].split('-');
  var wen = wednesday[2] + "." + wednesday[1] + "." + wednesday[0];

  var thuISO = getDayOfWeek($a, 4).toISOString().split('T');
  var thursday = thuISO[0].split('-');
  var thu = thursday[2] + "." + thursday[1] + "." + thursday[0];

  var friISO = getDayOfWeek($a, 5).toISOString().split('T');
  var friday = friISO[0].split('-');
  var fri = friday[2] + "." + friday[1] + "." + friday[0];

  var satISO = getDayOfWeek($a, 6).toISOString().split('T');
  var saturday = satISO[0].split('-');
  var sat = saturday[2] + "." + saturday[1] + "." + saturday[0];

  var sunISO = getDayOfWeek($a, 7).toISOString().split('T');
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

  $('#mySchedule').ready(function () {
    for (var i = 0; i < datesForClass.length; i++) {

      show(datesForClass[i]);

    }
  });
}

function getDayOfWeek(d, nr) {
  d = new Date(d);
  var day = d.getDay(),
    diff = d.getDate() - day + (day == 0 ? -6 : nr);
  return new Date(d.setDate(diff));
}


function show($date) {

  $.ajax({
    type: "POST",
    url: "php/phpscript.php",
    data: {
      action: $date
    },
    success: function (response) {
      if (response != "") {

        response = response.slice(0, -2);
        var elements = response.split("--");

        for (var i = 0; i < elements.length; i++) {
          var row = elements[i];
          row = row.split("|");
          var date = row[0];
          var startTime = row[1].slice(0, -3);
          var endTime = row[2].slice(0, -3);

          var listOfidNames = getIdNames(startTime, endTime, date);
          var workType = row[5];
          var timeStart = listOfidNames[listOfidNames.length - 1];
          for (var j = 0; j < listOfidNames.length; j++) {
            var idName = listOfidNames[j];
            colorDiv(workType, idName);


            document.getElementById(idName).className = "hour taken start" + timeStart;

            // kui j on 1 siis on viimane selle aja hour div(tagurpidi)
            if (j != 0 && workType.toLowerCase() === "laser") {
              var classofelem = document.getElementById(idName).className;
              document.getElementById(idName).className = classofelem + " takenMiddleLaser";
            } else if (j != 0 && workType.toLowerCase() === "massaaž") {
              var classofelem = document.getElementById(idName).className;
              document.getElementById(idName).className = classofelem + " takenMiddleMas";
            } else if (j != 0 && workType.toLowerCase() === "kinesioteipimine") {
              var classofelem = document.getElementById(idName).className;
              document.getElementById(idName).className = classofelem + " takenMiddlefKine";
            } else if (j != 0 && workType.toLowerCase() === "füsioteraapia") {
              var classofelem = document.getElementById(idName).className;
              document.getElementById(idName).className = classofelem + " takenMiddlefFusi";
            } else if (j != 0 && workType.toLowerCase() === "nõustamine") {
              var classofelem = document.getElementById(idName).className;
              document.getElementById(idName).className = classofelem + " takenMiddleNou";
            }

            if (j === (listOfidNames.length - 1)) {
              var startclassNames = document.getElementById(idName).className;
              // console.log(idName+"- " +startclassNames);
              document.getElementById(idName).className = startclassNames + " thisIsStart";
              var thisINNER = document.getElementById(idName).innerHTML;
              document.getElementById(idName).innerHTML = thisINNER + '<div class="infoIcon pull-left" title="' + row[4] + '"><span class="glyphicon glyphicon-info-sign "></span></div>' + '<div class="deleteButtonIcon pull-right"></div> <b>' + row[5] + "</b><br> " + row[3] + "<br> ";
            }
          }
        }
      }
    }
  });
}

function getAllDataForForm($data) {
  $.ajax({
    type: "POST",
    url: "php/getall.php",
    data: {
      action: $data
    },
    success: function (response) {
      if (response != "") {
        var row = response.split("|");
        var date = row[0];
        var startTime = row[1].slice(0, -3);
        var endTime = row[2].slice(0, -3);
        var clientName = row[3];
        var info = row[4];
        var work = row[5];
        startTime = deleteFirstZero(startTime);
        endTime = deleteFirstZero(endTime);

        var listOfidNames = getIdNames(startTime, endTime, date);
        var workType = row[5];
        document.getElementById("endTime").value = endTime;
        document.getElementById("clientName").value = clientName;
        document.getElementById("otherInfo").value = info;
        document.getElementById("workType").value = work;
        response = "";
      }
    }
  });
}

function colorDiv($string, $id) {
  if ($string.toLowerCase() == "laser") {
    document.getElementById($id).style.backgroundColor = "#80fbbc";
  } else if ($string.toLowerCase() == "nõustamine") {
    document.getElementById($id).style.backgroundColor = "#ff9279";
  } else if ($string.toLowerCase() == "massaaž") {
    document.getElementById($id).style.backgroundColor = "#80eafb";
  } else if ($string.toLowerCase() == "füsioteraapia") {
    document.getElementById($id).style.backgroundColor = "#ffa7e0";
  } else if ($string.toLowerCase() == "kinesioteipimine") {
    document.getElementById($id).style.backgroundColor = "#fbf280";
  }

}

function enableScheduleAdd() {
  document.getElementById('endTime').disabled = false;
  document.getElementById('startTime').disabled = false;
  document.getElementById('workDate').disabled = false;
  document.getElementById('workType').disabled = false;
  document.getElementById('otherInfo').disabled = false;
  document.getElementById('clientName').disabled = false;
}

function disableScheduleAdd() {
  document.getElementById('endTime').disabled = true;
  document.getElementById('startTime').disabled = true;
  document.getElementById('workDate').disabled = true;
  document.getElementById('workType').disabled = true;
  document.getElementById('otherInfo').disabled = true;
  document.getElementById('clientName').disabled = true;
}

function deleteFirstZero($time) {
  if ($time[0] == "0") {
    $time = $time.substring(1);
  }
  return $time;
}

function getIdNames($startTime, $endTime, $date) {
  var listOfid = [];
  $startTime = deleteFirstZero($startTime);
  $endTime = deleteFirstZero($endTime);

  var newTime = $endTime;

  while (newTime.localeCompare($startTime) != 0) {
    var endTimeList = newTime.split(":");
    if (endTimeList[1] == "00") {
      newTime = (+endTimeList[0] - +'1') + ":" + "45";
      listOfid.push(newTime + "|" + $date);
    } else if (endTimeList[1] == "15") {
      newTime = endTimeList[0] + ":" + "00";
      listOfid.push(newTime + "|" + $date);
    } else {
      newTime = endTimeList[0] + ":" + (+endTimeList[1] - +'15');
      listOfid.push(newTime + "|" + $date);
    }

  }
  return listOfid;

}

function emptySelectedHoursClass($selectedHours) {
  for (classElem = 0; classElem < $selectedHours.length; classElem++) {
    var id = $selectedHours[classElem];
    var classes = document.getElementById(id).className;
    classes = classes.replace("chosenTime", "");
    document.getElementById(id).className = classes;

  }
  return $selectedHours = [];
}

function subtract15minToEndTime($time) {
  var timelist = $time.split(":");
  var newTime;
  if (timelist[1] == "45") {
    newTime = timelist[0] + ":" + '30';
  }
  if (timelist[1] == "30") {
    newTime = timelist[0] + ":" + '15';
  }
  if (timelist[1] == "15") {
    newTime = timelist[0] + ":" + '00';
  }
  if (timelist[1] == "00") {
    newTime = (timelist[0] - +'1') + ":" + '45';
  }
  return newTime;
}

function add15minToEndTime($time) {
  var timelist = $time.split(":");
  var newTime;
  if (timelist[1] == "00") {
    newTime = timelist[0] + ":" + '15';
  }
  if (timelist[1] == "30") {
    newTime = timelist[0] + ":" + '45';
  }
  if (timelist[1] == "15") {
    newTime = timelist[0] + ":" + '30';
  }
  if (timelist[1] == "45") {
    newTime = (+timelist[0] + 1) + ":" + '00';

  }
  return newTime;
}

function emptyAllAddScheduleInputs() {
  document.getElementById("workDate").value = "";
  document.getElementById("startTime").value = "";
  document.getElementById("endTime").value = "";
  document.getElementById("clientName").value = "";
  document.getElementById("otherInfo").value = "";
  document.getElementById("workType").value = "";
}

function addWorkSchedule($worker) {
  var workHoursAddControl = [];
  var workHoursRemoveControl = [];

  var mouseIsDown = false;
  var hasClassOnEnter = false;
  var innerHTML = document.getElementsByClassName("hour").innerHTML;
  document.getElementsByClassName("hour").innerHTML = innerHTML + +'<div id="workerIcon"></div>';

  $('.hour').on('mouseenter', function () {
    if (mouseIsDown) {
      var idName = $(this).attr('id');
      var workerId = "worker" + idName;
      var selection = ".selectedBy" + $worker;
      var timeAndDate = idName.split("|");
      var datelist = [timeAndDate[1], timeAndDate[0]];
      if (hasClassOnEnter) {
        if (!workHoursRemoveControl.includes(idName)) {
          if (!workHoursAddControl.includes(idName)) {
            workHoursRemoveControl.push(idName);
            document.getElementById(workerId).innerHTML = "";
            $(this).removeClass(selection);
          } else {
            var index = getIdOfElementInArray(workHoursAddControl, idName);
            workHoursAddControl.splice(index, 1);

          }
        }

      } else {
        if (!workHoursAddControl.includes(idName)) {
          if (!workHoursRemoveControl.includes(idName)) {
            workHoursAddControl.push(idName);
            document.getElementById(workerId).innerHTML = '<span class="glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
            $(this).addClass(selection);
          } else {
            var index = getIdOfElementInArray(workHoursRemoveControl, idName);
            workHoursRemoveControl.splice(index, 1);
          }
        }

      }

    }
  });
  $('.hour').on('mousedown', function () {
    mouseIsDown = true;
    var idName = $(this).attr('id');
    var timeAndDate = idName.split("|");
    var workerId = "worker" + idName;
    var selection = ".selectedBy" + $worker;
    var datelist = [timeAndDate[1], timeAndDate[0]];
    if ($(this).hasClass(selection)) {
      hasClassOnEnter = true;
      if (!workHoursRemoveControl.includes(idName)) {
        if (!workHoursAddControl.includes(idName)) {
          workHoursRemoveControl.push(idName);
          document.getElementById(workerId).innerHTML = "";
          $(this).removeClass(selection);
        } else {
          var index = getIdOfElementInArray(workHoursAddControl, idName);
          workHoursAddControl.splice(index, 1);


        }
      }

    } else {
      if (!workHoursAddControl.includes(idName)) {
        if (!workHoursRemoveControl.includes(idName)) {
          workHoursAddControl.push(idName);
          document.getElementById(workerId).innerHTML = '<span class="glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
          $(this).addClass(selection);
        } else {
          var index = getIdOfElementInArray(workHoursRemoveControl, idName);
          workHoursRemoveControl.splice(index, 1);
        }
      }

    }
  }).on('mouseup', function () {
    mouseIsDown = false;
  });




  $(".sendWorkWeek").click(function () {
    console.log(workHoursAddControl);
    //console.log(workHoursRemoveControl);
    var selectedWorkScheduleIdAdd = listInListByDate(workHoursAddControl);

    var selectedWorkScheduleIdRemoved = listInListByDate(workHoursRemoveControl);
    console.log(selectedWorkScheduleIdAdd);
    // console.log(selectedWorkScheduleIdRemoved)
    var dataForSend = "";

    selectedWorkScheduleIdAdd.sort();
    for (n = 0; n < selectedWorkScheduleIdAdd.length; n++) {

      var dayDate = selectedWorkScheduleIdAdd[n].shift();
      var times = selectedWorkScheduleIdAdd[n].sort();
      //console.log(times);
      // console.log(dayDate);
      dataForSend += dayDate + "," + times[0] + ",";
      var startTime = "";
      var endTime = "";
      for (timeIndex = 0; timeIndex < times.length; timeIndex++) {

        var currentTime = times[timeIndex];
        //console.log(currentTime);
        var nextTime = add15minToEndTime(currentTime);
        // console.log(nextTime);

        if (nextTime === times[timeIndex + 1]) {
          //console.log("järgmine olemas");
        } else {
          //console.log("järgmist pole");
          endTime = nextTime;
          dataForSend += nextTime + "," + $worker + "--";

          if (timeIndex === times.length - 1) {
            //console.log("viimane element");
          } else {
            dataForSend += dayDate + "," + (times[timeIndex + 1]) + ",";
            // console.log("veel üks aeg on sellel kuupäeval");
          }
        }

      }

    }
    dataForSend = dataForSend.slice(0, -2);

    console.log(dataForSend);
    listOfData = dataForSend.split("--");
    for (index = 0; index < listOfData.length; index++) {
      $.ajax({
        type: "POST",
        url: "php/workerScheduleAddDb.php",
        data: {
          workerSchedule: listOfData[index]
        },
        success: function (response) {
          console.log(response);
        }

      });
    }
    $(".mySchedule").load("index.php");
  });

}

function listInListByDate($regularList) {
  selectedWorkScheduleIdAdd = [];
  for (index = 0; index < $regularList.length; index++) {
    timeAndDate = $regularList[index].split("|");
    var datelist = [timeAndDate[1], timeAndDate[0]];
    var added = false;
    for (n = 0; n < selectedWorkScheduleIdAdd.length; n++) {
      for (m = 0; m < selectedWorkScheduleIdAdd[n].length; m++) {
        if (timeAndDate[1] === selectedWorkScheduleIdAdd[n][m]) {
          selectedWorkScheduleIdAdd[n].push(timeAndDate[0]);
          added = true;
        }
      }
    }
    if (!added) {
      selectedWorkScheduleIdAdd.push(datelist);
    }
  }
  return selectedWorkScheduleIdAdd;

}

function getIdOfElementInArray($array, $id) {
  var index = "";
  for (i = 0; i < $array.length; i++) {
    if ($id === $array[i]) {
      index = i;
    }
  }
  return index;
}