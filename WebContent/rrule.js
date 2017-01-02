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
     * Handle Day-of-Week for Weekly frequency
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
     * Monthly options
     */
    if (freq === "MONTHLY")
	{
        document.getElementById('monthlyOptions').style.display = "inline";
    	
    	var isDayOfMonthChecked = document.getElementById('dayOfMonthCheckBox').checked;
    	var isDayOfWeekChecked = document.getElementById('dayOfWeekCheckBox').checked;
    	var date = new Date(document.getElementById('dateStart').value);
    	var days = ['SU','MO','TU','WE','TH','FR','SA'];
    	var dayOfWeek = days[date.getDay()];
   	 	console.log(date + " " + " " + dayOfWeek);

   	 	if (!isDayOfMonthChecked && !isDayOfWeekChecked)
		{
        	document.getElementById('dayOfMonthCheckBox').checked = true;
        	dom = true;
		}
    	 console.log(date + ":" + dayOfWeek);
    	if (isDayOfWeekChecked)
		{
    		var ordinal = 1; // TODO - CALCULATE THIS
			rrule += ";BYDAY=" + ordinal + dayOfWeek;
		} else (isDayOfMonthChecked)
		{
			rrule += ";BYMONTHDAY=" + date.getDate();
		}
	} else
	{
    	document.getElementById('monthlyOptions').style.display = "none";
	}
    
    // Set RRULE text
    document.getElementById('rruleContent').value = rrule;
    
    /*
     * Interval type word
     */
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

    var interval = document.getElementById('interval').value;
    if (interval > 1)
	{
    	intervalType += "s";
	}
    document.getElementById('intervalType').innerHTML = intervalType;
    console.log(freq);
}
