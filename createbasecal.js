var calendar = new Calendar();
var events = calendar.getEvents();


var fullCal = new Fullcalwrapper();

fullCal.setEvents(events);

fullCal.renderCalendar();

/*
var newcal = new Calendar();
var newevents = newcal.getEvents();

fullCal.updateEvents(newevents);

fullCal.renderCalendar();

*/