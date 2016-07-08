var calendar = new Calendar();
var events = calendar.getEvents();
var eventarray = new Array(events.length);
index= 0;
function convertcaleventsforfullcal(item){
   eventarray[index]= {title:'gen',
	start:'00',
	end:'00',
	allDay:false 
	}
	eventarray[index].title = item.getTitle();
	eventarray[index].start = item.getStartTime();
	eventarray[index].end = item.getEndTime();
	//eventarray[index].allDay =false;
	index++; 
}
for(i=0;i<events.length;i++){
	convertcaleventsforfullcal(events[i])
}

eventinfo.events = eventarray;

$('#calendar').fullCalendar(eventinfo)