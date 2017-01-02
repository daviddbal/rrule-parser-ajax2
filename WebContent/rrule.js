/**
 * 
 */
function loadXMLDoc()
{
	var xmlhttp;
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
		} else {
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange = function() {
		if (xmlhttp.readyState == 4) {
			if (xmlhttp.status = 200){
				document.getElementById("result").innerHTML = xmlhttp.responseText;
				} else
				{
					alert("Action can't be performed");
				}
			}
		};

	xmlhttp.open("POST", "RRuleServlet3");
	xmlhttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    var rruleContent = document.getElementById('rruleContent').value;
    var dateTimeStart = document.getElementById('dateTimeStart').value
    var limit = document.getElementById('limit').value
	xmlhttp.send("rruleContent=" + rruleContent + "&dateTimeStart=" + dateTimeStart + "&limit=" + limit);
}

/*
 * Initialize start date picker
 */
function initDate()
{
    var date = new Date();
    var dateString = buildDate(date, "-"); // assemble ISO 8601 date
    console.log("init dateString:" + dateString + " " + date);
    document.getElementById('dateStart').value = dateString;
}

/*
 * Build a date string
 */
function buildDate(date, delimiter)
{
    var yearString = date.toLocaleDateString('default', {year: 'numeric'});
    var monthString = date.toLocaleDateString('default', {month: 'numeric'});
    monthString = ("0" + monthString).slice(-2); // make 2-digits
    var dayString = date.toLocaleDateString('default', {day: 'numeric'});
    dayString = ("0" + dayString).slice(-2); // make 2-digits
    return yearString + delimiter + monthString + delimiter + dayString;
}

function refreshRRuleAndDTStart()
{
	buildRRule();
	buildDTStart();
}

/*
 * Generate RRULE field
 */
function buildRRule()
{
    var freq = document.getElementById('freq').value;
    var rrule = "RRULE:FREQ=" + freq;

    var interval = document.getElementById('interval').value;
    if (interval > 1)
	{
    	rrule += ";INTERVAL=" + interval;
	}
    
    /*
     * WEEKLY
     * 
     * Handle Day-of-Week options
     */
    if (freq === "WEEKLY")
	{
        document.getElementById('dayOfWeek').style.display = "inline";
    	
    	var sun = document.getElementById('sundayCheckbox').checked;
    	var mon = document.getElementById('mondayCheckbox').checked;
    	var tue = document.getElementById('tuesdayCheckbox').checked;
    	var wed = document.getElementById('wednesdayCheckbox').checked;
    	var thu = document.getElementById('thursdayCheckbox').checked;
    	var fri = document.getElementById('fridayCheckbox').checked;
    	var sat = document.getElementById('saturdayCheckbox').checked;
    	
    	if (!sun && !mon && !tue && !wed && !thu && !fri && !sat)
		{
        	document.getElementById('wednesdayCheckbox').checked = true;
        	wed = true;
		}
    	
    	rrule += ";BYDAY=";
    	if (sun)
		{
    		rrule += "SU,";
		}
    	if (mon)
		{
    		rrule += "MO,";
		}
    	if (tue)
		{
    		rrule += "TU,";
		}
    	if (wed)
		{
    		rrule += "WE,";
		}
    	if (thu)
		{
    		rrule += "TH,";
		}
    	if (fri)
		{
    		rrule += "FR,";
		}
    	if (sat)
		{
    		rrule += "SA,";
		}
    	rrule = rrule.substring(0, rrule.length - 1);
	} else
	{
    	document.getElementById('dayOfWeek').style.display = "none";
	}

    /*
     * MONTHLY options
     */
    if (freq === "MONTHLY")
	{
        document.getElementById('monthlyOptions').style.display = "inline";
    	
    	var isDayOfMonthChecked = document.getElementById('dayOfMonthCheckBox').checked;
    	var isDayOfWeekChecked = document.getElementById('dayOfWeekCheckBox').checked;
    	var dateString = document.getElementById('dateStart').value;
    	var timeString = document.getElementById('timeStart').value;
    	if (timeString === "")
		{
    		var d = new Date();
    		var options = { hour12: false };
    		timeString = d.toLocaleTimeString('default', options);
    		console.log("timeString:" + timeString);
    		console.log(d.toLocaleTimeString('en-US', { hour12: false }));
		}
    	var date = new Date(dateString + "T" + timeString);
    	var days = ['SU','MO','TU','WE','TH','FR','SA'];
    	var dayOfWeek = days[date.getDay()];

   	 	if (!isDayOfMonthChecked && !isDayOfWeekChecked)
		{
        	document.getElementById('dayOfMonthCheckBox').checked = true;
        	dom = true;
		}
    	 console.log(date + ":" + dayOfWeek);
    	if (isDayOfWeekChecked)
		{
    		var ordinal = weekOrdinalInMonth(date);
			rrule += ";BYDAY=" + ordinal + dayOfWeek;
		} else if (isDayOfMonthChecked)
		{
			rrule += ";BYMONTHDAY=" + date.getDate();
		}
	} else
	{
    	document.getElementById('monthlyOptions').style.display = "none";
	}
    
    /*
     * END criteria
     */
	var isAfterChecked = document.getElementById('afterCheckBox').checked;
	var isOnChecked = document.getElementById('onCheckBox').checked;
	if (isAfterChecked)
	{
		document.getElementById('afterSpan').style.display = "inline";
		document.getElementById('onSpan').style.display = "none";
		var count = document.getElementById('after').value;
		var afterType = makeIntervalType(freq, count);
		document.getElementById('afterType').innerHTML = afterType;
		rrule += ";COUNT=" + count;
	} else if (isOnChecked)
	{
		document.getElementById('onSpan').style.display = "inline";	
		document.getElementById('afterSpan').style.display = "none";
	} else
	{ // Never
		document.getElementById('afterSpan').style.display = "none";
		document.getElementById('onSpan').style.display = "none";
	}
    
    // Set RRULE text
    document.getElementById('rruleContent').value = rrule;
    
    /*
     * Interval type word
     */
    var intervalType = makeIntervalType(freq, document.getElementById('interval').value);
    document.getElementById('intervalType').innerHTML = intervalType;
    console.log(freq);
}

/*
 * Make interval or after word
 * adjusts for singular and plural
 */
function makeIntervalType(freq, value)
{
    var intervalType;
    if (freq === "DAILY")
	{
    	intervalType = "day";
	} else if (freq === "WEEKLY")
	{
		intervalType = "week";
	} else if (freq === "MONTHLY")
	{
		intervalType = "month";
	} else if (freq === "YEARLY")
	{
		intervalType = "year";
	} else if (freq === "SECONDLY")
	{
		intervalType = "second";
	} else if (freq === "MINUTELY")
	{
		intervalType = "minute";
	} else if (freq === "HOURLY")
	{
		intervalType = "hour";
	}

    if (value > 1)
	{
    	intervalType += "s";
	}
    return intervalType;
}

/*
 * Create DTSTART property for dateTimeStart
 */
function buildDTStart()
{
	var dateString = document.getElementById('dateStart').value;
	dateString = dateString.replace("-","");
	dateString = dateString.replace("-","");
    var timeString = document.getElementById('timeStart').value;

    if (dateString === "")
	{
    	document.getElementById("submitButton").disabled = true;
	} else
	{
    	document.getElementById("submitButton").disabled = false;
	    var dateTimeStartString = "DTSTART"
	    if (timeString === "")
		{
			dateTimeStartString += ";VALUE=DATE" + ":" + dateString;
		} else
		{
			timeString = timeString.replace(":", ""); // remove minutes :
			if (timeString.indexOf(":") > 0)
			{
				timeString = timeString.replace(":", ""); // remove seconds :
			} else
			{
				timeString += "00"; // add 2 zeros is seconds isn't present
			}
			dateTimeStartString += ":" + dateString + "T" + timeString;
		}
	}
	document.getElementById('dateTimeStart').value = dateTimeStartString;
}

function weekOrdinalInMonth(date)
{
    var firstDayInMonth = new Date(date)
    firstDayInMonth.setDate(1);
    var testDate = firstDayInMonth;
    console.log("ORDINAL:" + date + " " + firstDayInMonth);
    var ordinalWeekNumber = 0;
    while (testDate < date)
    {
        ordinalWeekNumber++;
        testDate.setDate(testDate.getDate()+7); // add one week
    }
    return ordinalWeekNumber;
	}
