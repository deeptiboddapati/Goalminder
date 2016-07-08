var events = calendar.getEvents();

events.sort(compareEvents);

var firstevent = new moment(events[0].getStartTime())

var lastevent = new moment(events[events.length-1].getStartTime())

firstevent.startOf('day')
lastevent.startOf('day')

var days = [];
var numdays = lastevent.diff(firstevent,'days')
for(var i = 0; i<= numdays; i++){ 
	var tempday = new moment(firstevent._d)
	tempday.add(i,'days');
	var daytemplate = {midnight:0,
		events:[]
	}
	daytemplate.midnight = new moment(tempday._d);
	days.push(daytemplate);
	
}

function* nextDay(days){
  var index = 0;
  while(true)
  yield days[index++];
}

var gen = nextDay(days);

var date = gen.next().value
events.forEach(function(item,index){
	
	while(!(date.midnight.isSame(item.getStartTime(),'day'))){
		//console.log('moving date')
		date = gen.next().value
	}
	//console.log(index)
	//console.log(date.midnight)
	//console.log(item.getStartTime())
	//var tempevent = new moment(item.getStartTime())
	//tempevent.duration(moment(item.getEndTime()).diff(tempevent))
	//date.events.push(tempevent)
	//date.events.push(item)

	var tempevent = new moment(item.getStartTime())
	tempevent.minutes(Math.floor(tempevent.minutes()/10)*10)
	var duration = Math.ceil(moment(item.getEndTime()).diff(tempevent,'minutes')/10)*10

	date.events.push({start:tempevent,
		duration : duration})

})


days.forEach(function(item){
	item.busytotal =0
	item.busytimes = new Set();
	item.freetotal = 144
	for(var i = 0; i <item.events.length;i++){
		//console.log(item.events[i])
		//item.events.eventduration +=item.events[i].duration
		// duration = 340 and startingpoint = 120 then 120/10 = 12 and duration/10 = 34
		//s needs to go from 12>34

		var startingpoint = (item.events[i].start.diff(item.midnight,'minutes'))/10
		for(var s = startingpoint; s < startingpoint+item.events[i].duration/10; s ++  ){
			item.busytimes.add(s)

		}

	}
	item.busytotal = item.busytimes.size
	item.freetotal -= item.busytotal
})