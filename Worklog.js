//$("#time").bootstrapMaterialDatePicker({date: false});
$(document).ready(function() {
	
	$(".ui-timepicker-input").timepicker({
		"minTime": "6",
		"maxTime": "20",
		"step": 5,
		"disableTextInput": true,
		"scrollDefault": "now",
		"timeFormat": "G:i",
	});

	$(".ui-timepicker-break").timepicker({
		"minTime": "0:30",
		"maxTime": "5:00",
		"step": 1,
		"disableTextInput": true,
		"scrollDefault": "0:30",
		"timeFormat": "G:i",
	});



	$("#timelog").submit( function(evt) {
		evt.preventDefault();

		var arrivedAt = $("#field_arrive").timepicker('getTime', new Date());
  		var leftAt = $("#field_leave").timepicker('getTime', new Date());

  		document.getElementById("startValue").innerHTML = timeToString(arrivedAt)
  		document.getElementById("endValue").innerHTML = timeToString(leftAt);
  		document.getElementById("totalValue").innerHTML = computeDifference(arrivedAt, leftAt);
  		document.getElementById("result").removeAttribute("hidden");
	});

	$("#field_arrive").on("change", function () {

		if ($("#field_arrive").val()) {
			var from = $("#field_arrive").timepicker('getTime', new Date());
			var to = $("#field_leave").timepicker('getTime', new Date());

			if (to != null) {
				var pause = $("#field_break").timepicker('getTime', new Date());

				to.setMinutes(to.getMinutes() - pause.getMinutes());
				if (from > to) {
					document.getElementById("field_arrive").setCustomValidity("Invalid field.");
					document.getElementById("calculateTime").disabled = true;
					console.log("Invalid input!");
				} else {
					document.getElementById("field_arrive").setCustomValidity("");
					document.getElementById("field_leave").setCustomValidity("");
					document.getElementById("calculateTime").disabled = false;
				}	
			}
		}
	});

	$("#field_leave").on("change", function () {

		if ($("#field_leave").val()) {
			var from = $("#field_arrive").timepicker('getTime', new Date());
			var to = $("#field_leave").timepicker('getTime', new Date());
			var pause = $("#field_break").timepicker('getTime', new Date());

			to.setMinutes(to.getMinutes() - pause.getMinutes());
			if (from > to) {
				document.getElementById("field_leave").setCustomValidity("Invalid field.");
				document.getElementById("calculateTime").disabled = true;
				console.log("Invalid input!");
			} else {
				document.getElementById("field_leave").setCustomValidity("");
				document.getElementById("field_arrive").setCustomValidity("");
				document.getElementById("calculateTime").disabled = false;
			}
		}
	});
})


function computeDifference(fromDate, toDate) {
	var dailyBreak = $("#field_break").timepicker('getTime', new Date())

	toDate.setMinutes(toDate.getMinutes() - dailyBreak.getMinutes());
	var difference = toDate.getTime() - fromDate.getTime();
	if (difference < 0)
		difference = 0;

	return milisecondsToString(difference);
}

function milisecondsToString(time) {
	var msec = time;
	var hh = Math.floor(msec / 1000.0 / 60.0 / 60.0);
	msec -= Math.floor(hh * 1000 * 60 * 60);

	var mm = Math.round(msec / 1000.0 / 60.0);
	msec -= Math.floor(mm * 1000 * 60);

	var hour = "";
	if (hh < 0) {
		hour += "-";
		hh *= -1;
	}
	hour += (hh < 10) ? "0" : "";
	hour += hh;
	//var ss = Math.floor(msec / 1000.0);
	//msec -= ss * 1000;
	return hour + ":" + (mm < 10 ? "0" : "") + mm;
}

function timeToString(time) {
	var hh = time.getHours();
	var mm = time.getMinutes();
	//var ss = time.getSeconds();
	return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}

function getPause(pause) {
	var time = new Date(pause * 60 * 1000);
	//time.setMinutes(pause);

	console.log(time.UTC());


	return time;
}
