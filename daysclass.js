class Days extends Array{
	constructor(number){
		super()
		for(var i=0;i<number;i++){
			var day = {
				events:[],
				tasks:[],
				midnight:0,
				freetotal:144,
				busytotal:0,
				busytimes:new Set(),
				freetimes: this.initFreetime(),
				originalbusytotal:0,
				originalfreetotal:0,
				taskstotal:0
			}
			this.push(day)
		}
		
	}
	initFreetime(){
		var freetime = new Set();
		for(var i = 1; i<=144; i++){
			freetime.add(i);
		}
		return freetime
	}
	nextDay(){
		//generator function for days
		return this[Symbol.iterator]();
	}

	setMidnight(start){
		start = new moment(start)
		start.startOf('day');
		this.forEach(function(item,index){
			var tempday = new moment(start._d);
			tempday.add(index,'days');
			item.midnight = new moment(tempday._d);
		})

	}

	addEvents(events){
		var days = this.nextDay()
		var date = days.next().value
		var daysarray = this
		events.forEach(function(item,index){

			while(!(date.midnight.isSame(item.getStartTime(),'day'))){
				date.busytotal = date.busytimes.size;
				date.freetotal -= date.busytotal
				date.originalfreetotal = date.freetotal;
				date.originalbusytotal = date.busytotal;
				date = days.next().value
			}

			var tempevent = new moment(item.getStartTime())
			tempevent.minutes(Math.floor(tempevent.minutes()/10)*10)
			var duration = Math.ceil(moment(item.getEndTime()).diff(tempevent,'minutes')/10)*10

			date.events.push({start:tempevent,
				duration : duration})
			daysarray.addevent(tempevent,duration,date)


		})


	}

	addTasks(tasks){

		var days = this.nextDay()
		var date = days.next().value
		var daysarray = this
		tasks.forEach(function(item,index){

			if(date.freetotal < item.durationunits){
				date = days.next().value
				//console.log(date)
			}

			
			/*
			date.tasks.push(item)
			date.freetotal -= item.durationunits
			date.busytotal +=item.durationunits
			*/
			daysarray.addtask(item,date)

		})
	}

	addevent(start,duration,day){
		var startingpoint = start.diff(day.midnight,'minutes')/10
		for(var s = startingpoint; s < startingpoint+duration/10; s ++  ){
			day.busytimes.add(s)
			day.freetimes.delete(s)

		}
	}

	addtask(task,day){
		day.tasks.push(task);
		day.freetotal -= task.durationunits
		day.busytotal += task.durationunits
		day.taskstotal += task.durationunits

	}
	testDays(daysarray){
		/*
		events:[],
		tasks:[],
		midnight:0,
		freetotal:144,
		busytotal:0,
		busytimes:new Set(),
		freetimes: this.initFreetime(),
		originalbusytotal:0,
		originalfreetotal:0,
		taskstotal:0
		*/

		this.forEach(function(day,date){
			//console.log(daysarray)
			console.log(date)
			var testday = daysarray[date]
			if(testday.events.length != day.events.length){
				console.log('event lists dont match');
				console.log(day)
				console.log(testday)
			}

			//check if the events equal
			day.events.forEach(function(event,number){
				var testevent = testday.events[number];

				if(!event.start.isSame(testevent.start)){
					console.log('error events dont equal');
					console.log(event)
					console.log(testevent)
				}

				else if(event.duration != testevent.duration){
					console.log('durations dont match')
				}
			})//end check events

			//check if the tasks equal
			day.tasks.forEach(function(task,number){
				var testtask = testday.tasks[number];
				console.log('task number'+ number)
				if(!testday.tasks.includes(task)){
					console.log('error task is not included');
					console.log(task)
					console.log(testday.tasks)
				}
				else if(!task.duedate.isSame(testtask.duedate)){
					console.log('error task duedates dont equal');
					console.log(task)
					console.log(testtask)
				}

				else if(task.duration != testtask.duration){
					console.log('task durations dont match')
					console.log(task)
					console.log(testtask)
				}

				else if(task.durationunits != testtask.durationunits){
					console.log('task durationunits dont match')
					console.log(task)
					console.log(testtask)
				}

				else if(task.title != testtask.title){
					console.log('task title dont match')
					console.log(task)
					console.log(testtask)
				}


				else if(task.importance != testtask.importance){
					console.log('task durations dont match')
					console.log(task)
					console.log(testtask)
				}

				else if(task.priority != testtask.priority){
					console.log('task durations dont match')
					console.log(task)
					console.log(testtask)
				}												
			})//end check tasks


		})

	}



}

var d = new Days(days.length)
d.setMidnight(events[0].getStartTime())

d.addEvents(events)

d.addTasks(taskstwo)



