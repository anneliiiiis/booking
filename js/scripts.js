$('document').ready(function () {
  var selectedHours = [];
  var mouseIsDown = false;
  var curretDate = new Date();
  var addTimeOn = false;
  var changeTimeOn = false;
  var deleteTimeOn = false;
  var workScheduleOn = false;
  generateWeekWithData(curretDate);

  $(".addTime").click(function () {
    $(".deleteButtonIcon").empty();
    $(".addSubmittButton").empty();
    enableScheduleAdd();
    var $button = $('<button type = "button" class="btn btn-primary addNewTime" >Lisa aeg</button>');
    $button.appendTo($(".addSubmittButton"));
    addTimeOn = true;
    changeTimeOn = false;
    deleteTimeOn = false;
    workScheduleOn = false;
    var selectedDate = "";
    document.getElementById("infoAsText").innerHTML = "vali algusaeg";
    $(".workScheduleButtons").slideUp();
    $(".addTimeContainer").slideDown();
    $('.hour').on('mouseenter', function () {
      if (addTimeOn && !(changeTimeOn) && !(deleteTimeOn)) {
        if (mouseIsDown) {
          var idName = $(this).attr('id');
          selectedHours.push(idName);
          var timeAndDateCliced = idName.split("|");
          var dateCliced = timeAndDateCliced[1];
          if (selectedDate === dateCliced) {
            var lastClasses = document.getElementById(idName).className;
            document.getElementById(idName).className = lastClasses + " chosenTime";
          }

        }
      }
    });

    $('.hour').on('mousedown', function () {
      if (addTimeOn && !(changeTimeOn) && !(deleteTimeOn) && !(workScheduleOn)) {
        selectedHours = emptySelectedHoursClass(selectedHours);
        mouseIsDown = true;
        emptyAllAddScheduleInputs();
        var idName = $(this).attr('id');
        var timeAndDateCliced = idName.split("|");
        var lastClasses = document.getElementById(idName).className;
        selectedHours.push(idName);
        document.getElementById(idName).className = lastClasses + " chosenTime";
        var timeCliced = timeAndDateCliced[0];
        var dateCliced = timeAndDateCliced[1];
        selectedDate = dateCliced;
        document.getElementById("workDate").value = dateCliced;
        document.getElementById("startTime").value = timeCliced;
        getAllDataForForm(idName);
      }
    }).on('mouseup', function () {
      if (addTimeOn && !(changeTimeOn) && !(deleteTimeOn) && !(workScheduleOn)) {
        mouseIsDown = false;
        var idName = $(this).attr('id');
        var timeAndDateCliced = idName.split("|");
        var endtimeCliced = timeAndDateCliced[0];
        endtimeCliced = add15minToEndTime(endtimeCliced);
        document.getElementById("endTime").value = endtimeCliced;
        var hasTime = false;
        for (selectedNR = 0; selectedNR < selectedHours.length; selectedNR++) {
          var selectedHourID = selectedHours[selectedNR];
          var selectedHourClasses = document.getElementById(selectedHourID).classList;
          for (classesElemNR = 0; classesElemNR < selectedHourClasses.length; classesElemNR++) {
            if (selectedHourClasses[classesElemNR].startsWith("start")) {
              hasTime = true;
            }
          }
        }
        if (hasTime) {
          for (classElem = 0; classElem < selectedHours.length; classElem++) {
            var id = selectedHours[classElem];
            var classes = document.getElementById(id).className;
            classes = classes.replace("chosenTime", "");
            document.getElementById(id).className = classes;
            disableScheduleAdd();
          }
        } else {
          enableScheduleAdd();
        }
      }
    });
  });


  $(document).on('click', '.addNewTime', function () {
    addTimeOn = false;
    workScheduleOn = false;
    var date = document.getElementById("workDate").value;
    var sTime = document.getElementById("startTime").value;
    var eTime = document.getElementById("endTime").value;
    // eTime = subtract15minToEndTime(eTime);
    var clName = document.getElementById("clientName").value;
    var info = document.getElementById("otherInfo").value;
    var wType = document.getElementById("workType").value;
    if (date === "" || clName === "" || sTime === "" || eTime === "" || info === "" || wType === "") {
      document.getElementById("infoAsText").innerHTML = "Täida kõik väljad";
    } else {
      var data = date + "|" + sTime;
      var check = "";
      $.ajax({
        type: "POST",
        url: "php/doubleCheck.php",
        data: {
          checkForDoubles: data
        },
        success: function (response1) {
          if (response1 === "") {
            var allInfo = date + "|" + sTime + "|" + eTime + "|" + clName + "|" + info + "|" + wType;
            $.ajax({
              type: "POST",
              url: "php/addNewTime.php",
              data: {
                addTime: allInfo
              },
              success: function (response) {
                document.getElementById("infoAsText").innerHTML = response;
                $(".mySchedule").load("index.php");
                $(".addTimeContainer").slideUp();
              }
            });
          } else {
            document.getElementById("infoAsText").innerHTML = "Aeg on juba olemas!";
            selectedHours = [];
          }
        }
      });
      emptyAllAddScheduleInputs();
    }
  });

  //aja kustutamine
  $(".deleteTime").click(function () {
    $(".deleteButtonIcon").empty();
    selectedHours = emptySelectedHoursClass(selectedHours);
    deleteTimeOn = true;
    addTimeOn = false;
    changeTimeOn = false;
    workScheduleOn = false;
    document.getElementById("infoAsText").innerHTML = "Vali aeg, mida soovid kustutada.";
    $(".workScheduleButtons").slideUp();
    $(".addTimeContainer").slideUp();
    var $deletebuttonIcon = $('<span class=" glyphicon glyphicon-remove pull-right" aria-hidden="true"></span>');
    $deletebuttonIcon.appendTo($(".deleteButtonIcon"));
    $('.hour').on('mousedown', function () {
      if (!addTimeOn && !(changeTimeOn) && deleteTimeOn) {
        var idName = $(this).attr('id');
        var classes = document.getElementById(idName).classList;
        for (classElem = 0; classElem < classes.length; classElem++) {
          if (classes[classElem].startsWith("start")) {
            var startId = classes[classElem].slice(5);
            idName = startId;
          }
        }
        $.ajax({
          type: "POST",
          url: "php/deleteTime.php",
          data: {
            action: idName
          },
          success: function (response) {
            if (response === "") {
              document.getElementById("infoAsText").innerHTML = "Vajuta ajale mida soovid kustutada!";
            } else {
              document.getElementById("infoAsText").innerHTML = response;
              $(".mySchedule").load("index.php");
            }
          }
        });
      }
    });
  });

  $(".changeTime").click(function () {
    emptyAllAddScheduleInputs();
    $(".deleteButtonIcon").empty();
    selectedHours = emptySelectedHoursClass(selectedHours);
    changeTimeOn = true;
    deleteTimeOn = false;
    addTimeOn = false;
    workScheduleOn = false;
    enableScheduleAdd();
    $(".addSubmittButton").empty();
    document.getElementById("infoAsText").innerHTML = "Vali aeg, mida soovid muuta";

    var $button = $('<button class="btn btn-warning updateTime" id="updateTime">Muuda aeg</button>');
    $button.appendTo($(".addSubmittButton"));

    document.getElementById("infoAsText").innerHTML = "";
    $(".workScheduleButtons").slideUp();
    $(".addTimeContainer").slideDown();

    $('.hour').on('mousedown', function () {
      if (!addTimeOn && changeTimeOn && !deleteTimeOn && !(workScheduleOn)) {
        enableScheduleAdd();
        document.getElementById("endTime").value = "";
        document.getElementById("clientName").value = "";
        document.getElementById("otherInfo").value = "";
        document.getElementById("workType").value = "";
        document.getElementById("startTime").value = "";
        document.getElementById("workDate").value = "";
        var idName = $(this).attr('id');
        var classes = document.getElementById(idName).classList;
        for (classElem = 0; classElem < classes.length; classElem++) {
          if (classes[classElem].startsWith("start")) {
            var startId = classes[classElem].slice(5);
            idName = startId;
            var timeAndDateCliced = idName.split("|");
            var timeCliced = timeAndDateCliced[0];
            var dateCliced = timeAndDateCliced[1];
            document.getElementById("workDate").value = dateCliced;
            document.getElementById("startTime").value = timeCliced;
            getAllDataForForm(idName);
          }
        }
        var checkIfTimeExsists = document.getElementById("startTime").value;
        if (checkIfTimeExsists.length < 1) {
          document.getElementById("infoAsText").innerHTML = "aega pole veel lisatud valu uus aeg";
          disableScheduleAdd();
        }
      }
    });
  });

  $(document).on('click', '.updateTime', function () {

    var date = document.getElementById("workDate").value;
    var sTime = document.getElementById("startTime").value;
    var eTime = document.getElementById("endTime").value;
    var clName = document.getElementById("clientName").value;
    var info = document.getElementById("otherInfo").value;
    var wType = document.getElementById("workType").value;
    if (date === "" || clName === "" || sTime === "" || eTime === "" || info === "" || wType === "") {
      document.getElementById("infoAsText").innerHTML = "Täida kõik väljad";
    } else {
      var allInfo = date + "|" + sTime + "|" + eTime + "|" + clName + "|" + info + "|" + wType;
      $.ajax({
        type: "POST",
        url: "php/updateTime.php",
        data: {
          updateTime: allInfo
        },
        success: function (response) {
          document.getElementById("infoAsText").innerHTML = response;
          $(".mySchedule").load("index.php");
          $(".addTimeContainer").slideUp();
        }
      });

    }
  });

  //ok nupu vajutus
  $("#generateWeek").click(function () {
    var date = $("#schedule_date").val();
    var a = new Date(date);
    generateWeekWithData(a);
  });

  $("#submitButton").click(function () {
    var date = $("#workDate").val();
    var a = new Date(date);
    generateWeekWithData(a);
  });

  $(".exitForm").click(function () {
    $(".addTimeContainer").slideUp();
  });
  $('.tooltip').tooltipster({
    theme: 'tooltipster-light'
  });
  $('.datepicker1').datepicker({
    format: 'yyyy-mm-dd',
    weekStart: 1
  });

  //uue töögraafiku lisamine
  $(".addWorkSchedule").click(function () {
    $(".saveWorkWeek").slideUp();
    $(".addTimeContainer").slideUp();
    $(".workScheduleButtons").slideDown();
    $(".workersButtons").slideDown();
    $(".deleteButtonIcon").empty();
    selectedHours = emptySelectedHoursClass(selectedHours);
    addTimeOn = false;
    changeTimeOn = false;
    deleteTimeOn = false;
    workScheduleOn = true;

  });


  $("#firstWorker").click(function () {

    $(".workersButtons").slideUp();
    $(".saveWorkWeek").slideDown();
    var worker = "Merily";
    addWorkSchedule(worker, addTimeOn, changeTimeOn, deleteTimeOn, workScheduleOn);


  });

  $("#secondWorker").click(function () {

    $(".workersButtons").slideUp();
    $(".saveWorkWeek").slideDown();
    var worker = "Kristiina";
    addWorkSchedule(worker, addTimeOn, changeTimeOn, deleteTimeOn, workScheduleOn);

  });
});

function addWorkSchedule($worker, $addTimeOn, $changeTimeOn, $deleteTimeOn, $workScheduleOn) {
  var workHoursAddControl = [];
  var workHoursRemoveControl = [];
  var mouseIsDown = false;
  var hasClassOnEnter = false;
  var innerHTML = document.getElementsByClassName("hour").innerHTML;
  document.getElementsByClassName("hour").innerHTML = innerHTML + +'<div id="workerIcon"></div>';
  $('.hour').on('mouseenter', function () {
    if (!$addTimeOn && !$changeTimeOn && !$deleteTimeOn && $workScheduleOn) {
      if (mouseIsDown) {
        var idName = $(this).attr('id');
        var workerId = "worker" + idName;
        var selection = "selectedBy" + $worker;
        var timeAndDate = idName.split("|");
        var datelist = [timeAndDate[1], timeAndDate[0]];
        var thisClasses = this.className;
        if (thisClasses.search('beginningOfWork') != -1) {
          mouseIsDown = false;
        } else {
          if (hasClassOnEnter) {
            if ($(this).hasClass(selection)) {
              if (workHoursAddControl.includes(idName)) {
                var index = getIdOfElementInArray(workHoursAddControl, idName);
                workHoursAddControl.splice(index, 1);
                document.getElementById(workerId).innerHTML = "";
                $(this).removeClass(selection);
              } else {
                workHoursRemoveControl.push(idName);
                document.getElementById(workerId).innerHTML = "";
                $(this).removeClass(selection);

              }
            }
          } else {
            if (!$(this).hasClass(selection)) {
              if (workHoursRemoveControl.includes(idName)) {
                document.getElementById(workerId).innerHTML = '<span class="newChosenTime glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
                $(this).addClass(selection);
                var index = getIdOfElementInArray(workHoursRemoveControl, idName);
                workHoursRemoveControl.splice(index, 1);

              } else {
                workHoursAddControl.push(idName);
                document.getElementById(workerId).innerHTML = '<span class="newChosenTime glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
                $(this).addClass(selection);
              }

            }

          }
        }
      }
    }
  });
  $('.hour').on('mousedown', function () {
    if (!$addTimeOn && !$changeTimeOn && !$deleteTimeOn && $workScheduleOn) {
      var idName = $(this).attr('id');
      var timeAndDate = idName.split("|");
      var workerId = "worker" + idName;
      var selection = "selectedBy" + $worker;
      var datelist = [timeAndDate[1], timeAndDate[0]];
      //Kui on varem lisatud aeg
      var thisClasses = this.className;
      if (thisClasses.search('beginningOfWork') != -1) {
        console.log("dbs olev aeg");
        var classOfwork = this.classList[this.classList.length - 1];
        var dateandtimeString = classOfwork.substring(15, 32);
        var dateAndStarttime = parseBackToDate(dateandtimeString);
        console.log(dateAndStarttime);
        if (!workHoursRemoveControl.includes(dateAndStarttime + "|" + $worker)) {
          workHoursRemoveControl.push(dateAndStarttime + "|" + $worker);
          $("." + classOfwork).css("background-color", "#caaeae");
        } else {
          $("." + classOfwork).css("background-color", "rgb(251, 255, 251)");
          var index = getIdOfElementInArray(workHoursRemoveControl, dateAndStarttime);
          workHoursRemoveControl.splice(index, 1);
        }


      } else {
        mouseIsDown = true;
        if ($(this).hasClass(selection)) {
          console.log(this.className);
          hasClassOnEnter = true;
          if (workHoursAddControl.includes(idName)) {
            var index = getIdOfElementInArray(workHoursAddControl, idName);
            workHoursAddControl.splice(index, 1);
            document.getElementById(workerId).innerHTML = "";
            $(this).removeClass(selection);
          } else {
            if (!workHoursRemoveControl.includes(idName)) {
              workHoursRemoveControl.push(idName);
              document.getElementById(workerId).innerHTML = "";
              $(this).removeClass(selection);
            }
          }
          console.log("mous down on selection");
          console.log("ADD" + workHoursAddControl);
          console.log("remove" + workHoursRemoveControl);
        } else {
          console.log(this.className);
          hasClassOnEnter = false;
          if (workHoursRemoveControl.includes(idName)) {
            document.getElementById(workerId).innerHTML = '<span class=" newChosenTime glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
            $(this).addClass(selection);
            var index = getIdOfElementInArray(workHoursRemoveControl, idName);
            workHoursRemoveControl.splice(index, 1);

          } else {
            workHoursAddControl.push(idName);
            document.getElementById(workerId).innerHTML = '<span class=" newChosenTime glyphicon glyphicon-user chosenTimeWorker' + $worker + '"></span>';
            $(this).addClass(selection);
          }
          console.log("mous down on  NOselection");
          console.log("ADD" + workHoursAddControl);
          console.log("remove" + workHoursRemoveControl);
        }
      }
    }
  }).on('mouseup', function () {
    if (!$addTimeOn && !$changeTimeOn && !$deleteTimeOn && $workScheduleOn) {
      mouseIsDown = false;
    }
  });




  $(".sendWorkWeek").click(function () {
    $(".saveWorkWeek").slideUp();
    console.log(workHoursAddControl);
    //console.log(workHoursRemoveControl);
    var selectedWorkScheduleIdAdd = listInListByDate(workHoursAddControl);
    // console.log(selectedWorkScheduleIdRemoved)
    var addDataForSend = "";

    selectedWorkScheduleIdAdd.sort();
    for (n = 0; n < selectedWorkScheduleIdAdd.length; n++) {

      var dayDate = selectedWorkScheduleIdAdd[n].shift();
      var times = selectedWorkScheduleIdAdd[n].sort();
      //console.log(times);
      // console.log(dayDate);
      addDataForSend += dayDate + "," + times[0] + ",";
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
          addDataForSend += nextTime + "," + $worker + "--";

          if (timeIndex === times.length - 1) {
            //console.log("viimane element");
          } else {
            addDataForSend += dayDate + "," + (times[timeIndex + 1]) + ",";
            // console.log("veel üks aeg on sellel kuupäeval");
          }
        }

      }

    }


    addDataForSend = addDataForSend.slice(0, -2);
    console.log("dataforsend ADD "+addDataForSend);
    listOfData = addDataForSend.split("--");
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
    console.log(workHoursRemoveControl);
    for (remIndex = 0; remIndex < workHoursRemoveControl.length; remIndex++) {
      $.ajax({
        type: "POST",
        url: "php/deleteWorkingHours.php",
        data: {
          action: workHoursRemoveControl[remIndex]
        },
        success: function (response) {
          console.log(response);
        }

      });
    }


    location.reload();
  });

}