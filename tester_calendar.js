//tester class from old task master
function CalendarEvent(){
  
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
};

CalendarEvent.prototype.makeEvent= function(dateobject){
  this.date = dateobject;
  this.year = dateobject.getFullYear();
  this.month = dateobject.getMonth();
  this.da = dateobject.getDate();
  this.start = 480;
};

CalendarEvent.prototype.getStartTime = function(){
  var pridate = new Date(this.year,this.month,this.da)
  addMinutestoDate(pridate,this.start)
  return pridate
};

CalendarEvent.prototype.getEndTime= function(){
  var pridate = new Date(this.year,this.month,this.da)
  addMinutestoDate(pridate,this.start+this.duration)
  return pridate
};



function testCalendarEvent(){
  for(var i = 0; i <50000; i++){
  var a = new CalendarEvent();
    
    a.getStartTime()
    a.getEndTime()
    if(a.getEndTime()-a.getStartTime()  <20){
      //Logger.log(a.start)
      //Logger.log(a.duration)
      //Logger.log(a.getStartTime())
      //Logger.log(a.getEndTime())
     throw "error with start and end" 
    }
  }
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




