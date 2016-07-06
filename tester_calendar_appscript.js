//Rewrite of tester fuctions based on Appscript classes and descriptions.
//Link: https://developers.google.com/apps-script/reference/calendar/

/*

#class Calendar

##Methods 

###Getters  

1. ~~ getEvents(startTime,endTime) ~~

2. ~~ getId() ~~

3. ~~ getName() ~~

4. ~~ getTimeZone() ~~

###Setters 

1. ~~ setTimeZone(timeZone) ~~

2. ~~ setName(name) ~~

3. ~~ setColor(color) ~~

###Constructors 

1. ~~ createEvent(title, startTime, endTime) ~~

2. ~~ createEventFromDescription(description) ~~

3. ~~ createAllDayEvent(title, date) ~~

###Destructors 

1. ~~ deleteCalendar() ~~

#Class CalendarApp

##Methods 

###Getters 

1. ~~ getCalendarsByName(name) ~~

2. ~~ getCalendarById(id) ~~

###Constructors 

1. ~~ createCalendar(name) ~~

#Class CalendarEvent

##Methods 

###Getters 

1. ~~ getAllDayEndDate() ~~

2. ~~ getAllDayStartDate() ~~

3. ~~ getStartTime() ~~

4. ~~ getEndTime() ~~

5. ~~ getLocation() ~~

6. ~~ getTitle() ~~

7. ~~ getTag(key) ~~

8. ~~ isAllDayEvent() ~~

###Setters 

1. ~~ setTag(key, value) ~~

2. ~~ setTime(startTime, endTime) ~~

3. ~~ setTitle(title) ~~

4. ~~ setLocation(location) ~~

5. ~~ setDescription(description) ~~

###Updaters 

1. ~~ addEmailReminder(minutesBefore) ~~

2. ~~ addGuest(email) ~~

3. ~~ addPopupReminder(minutesBefore) ~~

4. ~~ addSmsReminder(minutesBefore) ~~

5. ~~ removeGuest(email) ~~

6. ~~ removeAllReminders() ~~

7. ~~ removeAllReminders() ~~

###Destructors 

1. ~~ deleteEvent() ~~

2. ~~ deleteTag(key) ~~


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





*/


class CalendarEvent {
  //  Represents a single calendar event.
  constructor(){

  var seed = moment();
  seed.add(getRandomInt(1,365), 'days')
  .add(getRandomInt(0,24),'hours')
  .add(getRandomInt(0,60),'minutes')

  this.startTime = new Date(seed._d);
  this.duration = getRandomInt(0,1439-(seed.hours()*60+seed.minutes()));
  seed.add(this.duration,'minutes')
  this.endTime = new Date(seed._d);
  this.title = getRandomWord()
  }

getStartTime(){
  return this.startTime
};

getEndTime(){
  return this.endTime
};

getTitle(){
  return this.title
};

}

/*
  Represents a single calendar event.

##Methods 

###Getters

1. getAllDayEndDate()
  return- Date

2. getAllDayStartDate()
  return- Date
  
5. getLocation()
  return- String
  Gets the location of the event.

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

function getRandomInt(min, max) {
  
  return Math.round(Math.random() * (max - min)) + min;
}



function compareEvents(a, b) {

   var difference = a.getStartTime() - b.getStartTime();

  return difference;
};

function getRandomWord(){
  var words = ["Jamestown","Juxtaposed","Mudcap","Aerarian","Germanically",
  "Kolima","Watchman","Serjeanty","Disrespectfulness","Underrobe","Tenuously",
  "Unsaturated","Unseaworthy","Lucifer.","Russetish","Weightiness","Moscow",
  "Subcommissaries","Xylol","Unquellable","Berezina","Bodycheck","Girondism",
  "Repaginating","Postbursal","Transchannel","Unbelieving","Overabsorption.",
  "Bingen","Heptahydrated","Quillfish","Uneconomical","Tapelike","Gangrening",
  "Summonses","Heronry","Stannous","Anisette","Interannular","Desegregation",
  "Ashake","Falconer.","Transmissiveness","Starchy","Dnepropetrovsk","Unchivalrous",
  "Atomicity","Wariest","Eurymachus","Postincarnation","Colorado","Karyosome",
  "Heartbroken","Lemur","Zoomorphism","Beardfishes.","Degrading","Candolle",
  "Penillion","Newscasting","Circularizer","Collate","Ginglymus","Outstricken",
  "Analyzability","Neurogenous","Unparceled","Carpale","Behmenite","Infamousness"]

  //var index = getRandomInt(0,words.length-1)
  var index = getRandomInt(0,69)
  return words[index]

}


class Calendar{
  //Represents a calendar that the user owns or is subscribed to.
  constructor(name){
    this.name = name;
    this.events= this.createEvents();
  }

  createEvents(number = 100){
  var numevents = number;
  var eventlist = [];

  for(var i = 0; i <numevents; i++){
  eventlist.push(new CalendarEvent())
  }
  
  //eventlist.sort(compareEvents)
  
  return eventlist
  }

  getEvents(startTime=0,endTime=0){
    /*
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
    */
    var eventOutput = [];

  
    if(moment.isDate(startTime) && moment.isDate(endTime)){
      //console.log('start time and end time are both dates')

      this.events.forEach(function(item){

      if(moment(item.getStartTime()).isBetween(startTime, endTime)){
        eventOutput.push(item);
      }
      
    });

    }
    
    else if(moment.isDate(startTime)){
      //console.log('startTime is date')
      this.events.forEach(function(item){

      if(moment(item.getStartTime()).isAfter(startTime)){
        eventOutput.push(item);
      }
    });

    }
    
    else if(moment.isDate(endTime)){

      //console.log('endTime is date')
      this.events.forEach(function(item){

      if(moment(item.getStartTime()).isBefore(endTime)){
        eventOutput.push(item);
      }
    });

    }
    
    else{
      //console.log('neither start time nor end time are dates')
      eventOutput = this.events
    }
    
    return eventOutput;
  }


}
/*


##Methods 

###Getters 

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

*/

var ap = new Calendar('Rose');
start = ap.getEvents()[7].getStartTime()
end = ap.getEvents()[35].getStartTime()
console.log(ap.getEvents(start,end));



