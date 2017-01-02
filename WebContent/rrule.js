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

    document.getElementById('rruleContent').value = rrule;
    
    // Interval type word
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
    console.log(intervalType);
}
