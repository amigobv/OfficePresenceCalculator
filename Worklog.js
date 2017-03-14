//$("#time").bootstrapMaterialDatePicker({date: false});
var BREAKFAST = 12;
var LAUNCH = 30;

$(document).ready(function() {
	console.log("Document loaded!");
	$(".timepicker").timepicker({
		minTime: "6",
		maxTime: "20",
		interval: 10,
		scrollbar: true,
		dropdown: true,
		dynamic: false,
	});

	$("#timelog").submit( function(evt) {
		evt.preventDefault();

		var arrivedAt = $("#field_arrive").val();
  		var leftAt = $("#field_leave").val();

  		document.getElementById("startValue").innerHTML = arrivedAt
  		document.getElementById("endValue").innerHTML = leftAt;
  		document.getElementById("totalValue").innerHTML = computeDifference(arrivedAt, leftAt);
  		document.getElementById("result").removeAttribute("hidden");
	});

})


function computeDifference(from, to) {
	var fromDate = parseTime(from);
	var toDate = parseTime(to);

	toDate.setMinutes(toDate.getMinutes() - BREAKFAST);
	toDate.setMinutes(toDate.getMinutes() - LAUNCH);
	var difference = toDate.getTime() - fromDate.getTime();
	
	return parseDifference(difference);
}

function parseTime(time) {
	var timeItems = time.split(":");
	var elements = timeItems[1].split(" ");

	var minutes = parseInt(elements[0]);

	var hours = parseInt(timeItems[0]);
	if (elements[1].indexOf("PM") != -1) {
		if (hours != 12) {
			hours += 12;	
		}
	}
	
	var current = new Date();
	current.setHours(hours);
	current.setMinutes(minutes);
	return current;
}

function parseDifference(diff) {
	var msec = diff;
	var hh = Math.floor(msec / 1000.0 / 60.0 / 60.0);
	msec -= Math.floor(hh * 1000 * 60 * 60);

	var mm = Math.round(msec / 1000.0 / 60.0);
	msec -= Math.floor(mm * 1000 * 60);

	//var ss = Math.floor(msec / 1000.0);
	//msec -= ss * 1000;
	return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
}

function getPause(pause) {
	var time = new Date(pause * 60 * 1000);
	//time.setMinutes(pause);

	console.log(time.UTC());


	return time;
}
