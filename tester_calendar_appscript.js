//Rewrite of tester fuctions based on Appscript classes and descriptions.
//Link: https://developers.google.com/apps-script/reference/calendar/

/*
#Class Calendar

  Represents a calendar that the user owns or is subscribed to.

##Methods 

###Getters 

1. getEvents(startTime,endTime)
  return- CalendarEvent[] 
  Gets all events that occur within a given time range.

  Overloaded- getEvents(startTime, endTime, options)
  return- CalendarEvent[] 
  Gets all events that occur within a given time range and meet the specified criteria.

  * startTime- Date; the start of the time range
  * endTime- Date; the end of the time range, non-inclusive
  * options- Object;  a JavaScript object that specifies advanced parameters, as listed below
 

    * start- Integer; the index of the first event to return
    * max- Integer; the maximum number of events to return
    * author- String; an email address used to filter results by the event creator
    * search- String; a full-text search query used to filter results
    * statusFilters[]- GuestStatus[]; an array of statuses used to filter results

2. getId()
  return-String
  Gets the ID of the calendar.

3. getName()
  return-String
  Gets the name of the calendar.

4. getTimeZone()
  return-String
  Gets the time zone of the calendar.

###Setters

1. setTimeZone(timeZone)
  return-Calendar
  Sets the time zone of the calendar.
  
  * timeZone- String; the time zone, specified in "long" format (e.g., "America/New_York", as listed by Joda.org)

2. setName(name)
  return-Calendar
  Sets the name of the calendar.
  
3. setColor(color)
  return-Calendar
  Sets the color of the calendar.


###Constructors

1. createEvent(title, startTime, endTime)
  return-CalendarEvent
  Creates a new event.

  Overloaded- createEvent(title, startTime, endTime, options)
  return-CalendarEvent
  Creates a new event.

  * title- String;  the title of the event
  * startTime- Date; the date and time when the event starts
  * endTime- Date; the date and time when the event ends
  * options- Object;  a JavaScript object that specifies advanced parameters, as listed below
 

    * description- String;  the description of the event
    * location- String;  the location of the event
    * guests- String;  a comma-separated list of email addresses that should be added as guests
    * sendInvites- Boolean; whether to send invitation emails (default: false)

2. createEventFromDescription(description)
  return-CalendarEvent
  Creates an event from a free-form description.
  
  * description- String;  a free-form description of the event

3. createAllDayEvent(title, date)
  return-CalendarEvent
  Creates a new all-day event.

  Overloaded- createAllDayEvent(title, date, options)
  return-CalendarEvent
  Creates a new all-day event.

  * title- String;  the title of the event
  * date- Date; the date of the event (only the day is used; the time is ignored)
  * options- Object;  a JavaScript object that specifies advanced parameters, as listed below
 

    * description- String;  the description of the event
    * location- String;  the location of the event
    * guests- String;  a comma-separated list of email addresses that should be added as guests
    * sendInvites- Boolean; whether to send invitation emails (default: false)

###Destructors

1. deleteCalendar()
  return- void
  Deletes the calendar permanently.

#Class CalendarApp

  Allows a script to read and update the user's Google Calendar.
  Shares most methods with Calendar but applies them to the user's default calendar. 
##Methods 

###Getters

1. getCalendarsByName(name)
  return- Calendar[]

2. getCalendarById(id)
  return- Calendar



###Constructors
 
1. createCalendar(name)
  return- Calendar

  Overloaded- createCalendar(name, options)
  return- Calendar



#Class CalendarEvent

  Represents a single calendar event.

##Methods 

###Getters

1. getAllDayEndDate()
  return- Date

2. getAllDayStartDate()
  return- Date

3. getStartTime()
  return- Date
  
4. getEndTime()
  return- Date
  
5. getLocation()
  return- String
  Gets the location of the event.

6. getTitle()
  return- String

7. getTag(key)
  return- String

8. isAllDayEvent()
  return- bool

###Setters
 
1. setTag(key, value)
  return- CalendarEvent

2. setTime(startTime, endTime)
  return- CalendarEvent

3. setTitle(title)
  return- CalendarEvent

4. setLocation(location)
  return- CalendarEvent

5. setDescription(description)
  return- CalendarEvent


###Updaters
 
1. addEmailReminder(minutesBefore)
  return- CalendarEvent

2. addGuest(email)
  return- CalendarEvent

3. addPopupReminder(minutesBefore)
  return- CalendarEvent

4. addSmsReminder(minutesBefore)
  return- CalendarEvent

5. removeGuest(email)
  return- CalendarEvent

6. removeAllReminders()
  return- CalendarEvent

7. removeAllReminders()
  return- CalendarEvent

###Destructors
 
1. deleteEvent()
  return- void

2. deleteTag(key)
  return- CalendarEvent


*/

class CalendarEvent {
  constructor(){

  this.thirtydaymonths = [3,5,8,10]
  //this.year = getRandomInt(1970,2015);
  this.year = 2015;
  this.month = getRandomInt(0,11);//0-11

  if(!(this.thirtydaymonths.indexOf(this.month) === -1)){ //if indexof returns anything but -1
  this.da = getRandomInt(1,30); //1-30
  }
  else if(this.month ===1){
    this.da = CheckforLeapYear(this.year);
    
  }
  else{
      this.da = getRandomInt(1,31);
    }
  this.date = new Date(this.year,this.month,this.da);
  this.start = getRandomInt(1,1339);
  this.duration =getRandomInt(20,1339-this.start);
  //Logger.log(this.date);
    if(this.date.getMonth() != this.month){
      throw "error month has changed";
    };
    if(this.date.getFullYear() != this.year){
      throw "error year has changed";
      
    };
    if(this.date.getDate() != this.da){
      throw "error day has changed";
    };
  }

getStartTime(){
  var pridate = new Date(this.year,this.month,this.da)
  addMinutestoDate(pridate,this.start)
  return pridate
};

getEndTime(){
  var pridate = new Date(this.year,this.month,this.da)
  addMinutestoDate(pridate,this.start+this.duration)
  return pridate
};

}

function getRandomInt(min, max) {
  //used by tester_calendar 
  return Math.round(Math.random() * (max - min)) + min;
}

function CheckforLeapYear(year){
  //used by tester_calendar 
  if(!(year%400) || (year%100 && !(year%4))){
      var leapyear = year;
      var day = getRandomInt(1,29);
    };
   if(year%4 || (!(year%25) && year%16)){
     var notleapyear = year;
     var day = getRandomInt(1,28);
   };
    if(leapyear === notleapyear){
      throw "Error with Leapyear calculation";
    };
  return day
};

function compareEvents(a, b) {
  //used by tester_calendar 
   var difference = a.getStartTime() - b.getStartTime();

  return difference;
};

function addMinutestoDate(dateobj, min){
  //used by tester_calendar 
  var milliseconds = min*60000 +dateobj.getTime()
  dateobj.setTime(milliseconds)
  return dateobj
};

function createEventsList(){
  
  var numevents = 100;
  var eventlist = [];
  for(var i = 0; i <numevents; i++){
  eventlist.push(new CalendarEvent())
  }
  
  eventlist.sort(compareEvents)
  
  return eventlist
};

createEventsList();

