var events = calendar.getEvents();

events.sort(compareEvents);

var firstevent = new moment(events[0].getStartTime())

var lastevent = new moment(events[events.length-1].getStartTime())

firstevent.startOf('day')
lastevent.startOf('day')

var days = [];

for(var i = 0; i<356; i++){ 
	var tempday = new moment(firstevent._d)
	tempday.add(i,'days');
	days.push(new moment(tempday._d));
	
}