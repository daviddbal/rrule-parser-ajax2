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
				document.getElementById("message").innerHTML = xmlhttp.responseText;
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
