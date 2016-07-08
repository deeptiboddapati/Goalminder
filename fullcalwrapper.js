class Fullcalwrapper{

	constructor(){

		this.header =  {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay'
		};
		this.editable = true;
		this.events = [];

	}

	renderCalendar(){

		var calInfo = {};

		calInfo.header= this.header;
		calInfo.editable= this.editable;
		calInfo.events=this.events;
		$('#calendar').fullCalendar( 'destroy' )
		$('#calendar').fullCalendar(calInfo);

	}

	initializeEventArray(length){
		var eventArray = new Array(length);

		for(var i=0;i<length;i++){
			eventArray[i]={title:'gen',
			start:'00',
			end:'00',
			allDay:false 
			}
		}
		return eventArray;
	}

	setEvents(calendarevents){
		this.events= this.initializeEventArray(calendarevents.length);

		for(var i=0;i<calendarevents.length;i++){

			this.events[i].title =calendarevents[i].getTitle();
			this.events[i].start = calendarevents[i].getStartTime();
			this.events[i].end = calendarevents[i].getEndTime();

		}
	}

	updateEvents(calendarevents){
		var eventslength = this.events.length; 

		for(var i=0;i<calendarevents.length;i++){
			var eventsindex = eventslength-1 + i;
			this.events[eventsindex] = {title:'gen',
			start:'00',
			end:'00',
			allDay:false 
			}
		this.events[eventsindex].title =calendarevents[i].getTitle();
		this.events[eventsindex].start = calendarevents[i].getStartTime();
		this.events[eventsindex].end = calendarevents[i].getEndTime();

		}
	}

}