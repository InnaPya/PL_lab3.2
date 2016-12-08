var request = require('request');
var str = "";
request('https://api.meetup.com/2/open_events?and_text=False&country=us&offset=0&city=Boston&format=json&lon=-71.0&limited_events=False&topic=technology&state=ma&photo-host=public&page=20&radius=25.0&lat=42.0&desc=False&status=upcoming&sig_id=216657279&sig=ccb1a0f4db5045c31835161ebda65eb33db5a7e9', function (err,res,body) {
	if (err) throw err;
	var events = (JSON.parse(body))["results"];
	var dayInMs = 86400000;
	var start = (new Date()).setHours(0, 0, 0, 0) + 43200000;
	for (var j = 0; j < 7; j++) {
		str += "<h3>" + (new Date(start)).toDateString() + "</h3><br>";
		for (var i in events) {
			var eventDate = new Date((events[i])["time"]);
			if (eventDate > start && eventDate < start + dayInMs) {
				str += "<b>Name: </b>" + (events[i])["name"] + "<br>";
				if ("venue" in events[i]) {
					str += "<b>Address: </b>" + ((events[i])["venue"])["address_1"] + "<br>";
				}
				str += "<b>Time: </b>" + (eventDate.toTimeString()).substring(0,5) + " PM<br>";
				if ("description" in events[i]) {
					str +="<details><summary><b>Description</b></summary><p>" + (events[i])["description"] + "</p></details>"
				}
				str += "<br>";
			}
		}
		start += dayInMs;
	}
	fs.writeFile("page.html", str, function(err) {
   		if (err) console.log(err);
	});
});




