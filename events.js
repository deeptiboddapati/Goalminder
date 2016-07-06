
	var date = new Date();
	var d = date.getDate();
	var m = date.getMonth();
	var y = date.getFullYear();
    var eventinfo = {};
    eventinfo.header = {
		left: 'prev,next today',
		center: 'title',
		right: 'month,agendaWeek,agendaDay'
		};
	eventinfo.events = [


					{
					title  : 'Work',
					start  : '2016-03-00T12:30:00',
					end: '2016-03-00T20:30:00',
					allDay : true // will make the time show

					},
					{
					title  : 'Work',
					start  : '2016-03-01T12:30:00',
					end: '2016-03-01T20:30:00',
					allDay : false // will make the time show

					},
					{
					title  : 'Work',
					start  : '2016-03-02T12:30:00',
					end: '2016-03-02T20:30:00',
					allDay : false // will make the time show


					},
					{
					title  : 'Work',
					start  : '2016-03-05T12:30:00',
					end: '2016-03-05T20:30:00',
					allDay : false // will make the time show

					},
					{
					title  : 'Work',
					start  : '2016-03-06T12:30:00',
					end: '2016-03-06T20:30:00',
					allDay : false // will make the time show

					}
		]

	eventinfo.editable = true
	eventinfo.eventAfterRender = function(event, element, view) {
        var duration = moment.duration(event.end - event.start).hours();
  
    element.find('.fc-title').append(" <div>Hours: "+ duration+ "</div>");
   if(event.start<new Date()){
    element.addClass("past")
   };
};
        
	$('#calendar').fullCalendar(eventinfo)

//var calendarEvents = createEventsList();
//console.log(calendarEvents);