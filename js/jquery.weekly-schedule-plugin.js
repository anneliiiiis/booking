(function ($) {
  $.fn.weekly_schedule = function (callerSettings) {

    var settings = $.extend({
      days: ["Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"], // Days displayed

      hours: "07:00AM-10:00PM", // Hours displye
      fontColor: "black", // Font colot used in the component
      headerBackgroundColor: "#fff", // Background color of headers
      onSelected: function () {}, // handler called after selection
      onRemoved: function () {}, // handler called after removal

    }, callerSettings || {});

    settings.hoursParsed = parseHours(settings.hours);


    var mousedown = false;
    var devarionMode = false;
    var schedule = this;

    if (typeof callerSettings == 'string') {
      switch (callerSettings) {
      case 'getSelectedHour':
        return getSelectedHour();
        break;
      default:
        throw 'Weekly schedule method unrecognized!'
      }
    }
    // options is an object, initialize!
    else {
      var days = settings.days; // option
      var hours = settings.hoursParsed; // option
      var dates = settings.dates;
      var datesForClass = settings.datesForClass;
      $(schedule).addClass('schedule');

      /*
       * Generate Necessary DOMs
       */

      // Create Header
      var dayHeaderContainer = $('<div></div>', {
        class: "header"
      });

      var align_block = $('<div></div>', {
        class: "align-block"
      });

      dayHeaderContainer.append(align_block);

      // Insert header items
      for (var i = 0; i < days.length; ++i) {
        var day_header = $('<div></div>', {
          class: "header-item " + days[i] + "-header " + datesForClass[i]
        });
        var header_title = $('<h4>' + capitalize(days[i]) + "<br>" + dates[i] + '</h4>')

        day_header.append(header_title);
        dayHeaderContainer.append(day_header);
      }


      var days_wrapper = $('<div></div>', {
        class: 'days-wrapper'
      });

      var hourHeaderContainer = $('<div></div>', {
        class: 'hour-header'
      });

      days_wrapper.append(hourHeaderContainer);

      for (var i = 0; i < hours.length; i++) {
        var hour_header_item = $('<div></div>', {
          class: 'hour-header-item ' + hours[i]
        });

        var header_title = $('<h5>' + hours[i] + '</h5>');

        hour_header_item.append(header_title);
        hourHeaderContainer.append(hour_header_item);
      }



      for (var i = 0; i < days.length; i++) {
        var day = $('<div></div>', {
          class: "day " + days[i] + " " + datesForClass[i]
        });

        for (var j = 0; j < hours.length; j++) {
          var hour = $('<div></div>', {
            class: "hour " + hours[j] + " " + datesForClass[i],
            id: hours[j] + "|" + datesForClass[i]

          });

          var workerIcon = $('<div></div>', {
            class: "workerIcon",
            id: "worker" + hours[j] + "|" + datesForClass[i]
          });

          hour.append(workerIcon);
          day.append(hour);
        }

        days_wrapper.append(day);
      }

      /*
       * Inject objects
       */

      $(schedule).append(dayHeaderContainer);
      $(schedule).append(days_wrapper);


      /*
       *  Style Everything
       */
      $('.schedule').css({
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        "margin-top": "0px"
      });

      $('.header').css({
        position: "fixed",
        "z-index": "1",
        height: "59px",
        top: "50px",
        width: "100%",
        background: "rgb(248, 248, 248)",
        display: "flex"
      });
      $('.align-block').css({
        width: "40%",
        height: "100%",
        background: "rgb(248, 248, 248)"
      });

      // Style Header Items
      $('.header-item').css({
        width: '100%',
        height: '100%',
        margin: '2px' // option
      });
      $('.header-item h4').css({
        margin: 0,
        textAlign: 'center',
        verticalAlign: 'middle',
        position: "relative",
        top: "50%",
        color: settings.fontColor,
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
        fontWeight: settings.fontWeight,
        transform: "translateY(-50%)",
        userSelect: "none"
      });

      $('.hour-header').css({
        display: 'flex',
        flexDirection: 'column',
        margin: "0px 1px 2px 2px",
        background: "rgb(251, 255, 251)",
        marginRight: '1px',
        width: '40%'
      });

      $('.days-wrapper').css({
        "margin-top": "39px",
        width: "100%",
        background: "transparent", //option
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        position: "relative"
      });

      $('.hour-header-item').css({
        width: "100%",
        height: "38px",
        margin: "1px",
        border: "none", // option
        borderColor: "none", // option
        borderStyle: "none" // option
      });
      $('.hour-header-item h5').css({
        color: settings.fontColor,
        margin: "0", // option
        textAlign: "right",
        verticalAlign: "middle",
        position: "relative",
        fontFamily: settings.fontFamily,
        fontSize: settings.fontSize,
        fontWeight: settings.fontWeight,
        paddingRight: "10%",
        userSelect: "none",
        "font-size": "17px"
      });

      $('.day').css({
        display: "flex",
        flexDirection: "column",
        marginBottom: "1px",
        marginRight: "1px",
        background: "transparent", // option
        width: "100%"
      });
      $('.hour_hover').css({
        backgroundColor: "#e7e7e7"
      });
      $('.hour').css({
        background: "rgb(251, 255, 251)", // option
        borderBottom: "solid #e7e7e7", // option
        borderBottomWidth: "1px",
        /*borderTop: "solid #fff", // option
        borderTopWidth: "1px",
        borderRight: "solid #fff", // option
        borderRightWidth: "1px",
        borderLeft: "solid #fff", // option
        borderLeftWidth: "1px",*/
        width: "100%",
        height: "40px",
        userSelect: "none"


      });

      function getSelectedHour() {
        var dayContainer = $('.day');
        var output = {};
        for (var i = 0; i < dayContainer.length; i++) {
          var children = $(dayContainer[i]).children();

          var hoursSelected = [];
          for (var j = 0; j < children.length; j++) {
            if ($(children[j]).hasClass('selected') || $(children[j]).hasClass('selected2')) {
              hoursSelected.push(children[j]);
            }
          }
          output[i] = hoursSelected;
        }
        return output;
      }

      /*
       * Hook eventlisteners
       


      $("#firstWorker").click(function () {
        selectionEvent("hoverFirstWorker", "selectedFirstWorker", "disabledFirstWorker", "#b13535", "#dc5353");
      });

      $("#secondWorker").click(function () {
        selectionEvent("hoverSecondWorker", "selectedSecondWorker", "disabledSecondWorker", "#3d903d", "#5cb85c");
      });

      function selectionEvent(hover, selected, disabled, hoverColor, selectedColor) {
        console.log(schedule);

        var event = $("<style type='text/css' scoped> ." + hover + " { background: " + hoverColor +
          " !important;} ." + selected + "." + disabled + " { pointer-events: none !important; opacity: 0.3 !important; box-shadow: none !important; }</style>");
        event.appendTo(schedule);

        console.log(schedule);

        $('.hour').on('mouseenter', function () {
          if (!mousedown) {
            $(this).addClass(hover);
          } else {
            if (devarionMode) {
              $(this).removeClass(selected);
            } else {
              $(this).addClass(selected);
              
            }
          }
        }).on('mousedown', function () {
          mousedown = true;
          focusOn($(this).parent());

          if ($(this).hasClass(selected)) {
            schedule.trigger('selectionremoved')
            $(this).removeClass(selected);
            devarionMode = true;
          } else {
            schedule.trigger('selectionmade')
            $(this).addClass(selected);
          }
          $(this).removeClass(hover);
        }).on('mouseup', function () {
          devarionMode = false;
          mousedown = false;
          clearFocus();
        }).on('mouseleave', function () {
          if (!mousedown) {
            $(this).removeClass(hover);
          }
        });



        function clearFocus() {
          var dayContainer = $('.day');

          for (var i = 0; i < dayContainer.length; i++) {

            var hours = $(dayContainer[i]).children();
            for (var j = 0; j < hours.length; j++) {
              $(hours[j]).removeClass(disabled);
            }
          }
        }
      }

*/

      // Prevent Right Click
      $('.schedule').on('contextmenu', function () {
        return false;
      });

    }

    function parseHours(string) {
      var output = [];
      var minutes = ["00", "15", "30", "45"];
      var split = string.toUpperCase().split("-");
      var startInt = parseInt(split[0].split(":")[0]);
      var endInt = parseInt(split[1].split(":")[0]);

      var startHour = split[0].includes("PM") ? startInt + 12 : startInt;
      var endHour = split[1].includes("PM") ? endInt + 12 : endInt;

      var curHour = startHour;

      for (curHour; curHour <= endHour; curHour++) {
        for (var minute in minutes) {
          var parsedStr = "";

          if (curHour > 12) {
            parsedStr += (curHour).toString() + ":" + minutes[minute];
          } else if (curHour == 12) {
            parsedStr += curHour.toString() + ":" + minutes[minute];
          } else {
            parsedStr += curHour.toString() + ":" + minutes[minute];
          }

          output.push(parsedStr);
        }

      }

      return output;
    }

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }


  };
}(jQuery));