var calendar = new Calendar();
var events = calendar.getEvents();


var fullCal = new Fullcalwrapper();

fullCal.setEvents(events);

fullCal.renderCalendar();