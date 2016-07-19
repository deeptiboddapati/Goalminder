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

		date.busytotal = date.busytimes.size;
		date.freetotal -= date.busytotal
		date.originalfreetotal = date.freetotal;
		date.originalbusytotal = date.busytotal;

	}

	addTasks(tasks){

		
		
		var daysarray = this
		tasks.forEach(function(item,index){
			var days = daysarray.nextDay()
			var date = days.next().value

			while(date.freetotal < item.durationunits){
				date = days.next().value
				//console.log(date)
			}

			
			
			//date.tasks.push(item)
			//date.freetotal -= item.durationunits
			//date.busytotal +=item.durationunits
			
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

	setTasks(){
		this.forEach(function(day){
			day.tasks.forEach(function(task){
				var freetime = day.freetimes.values();
				var time = freetime.next().value;
				var notSet = true;
				while(notSet){
					
					// 1: the set of freetimes has time-1 
					//then set time to time-1
					if(day.freetimes.has(time-1)){
						var newtime = time- 1
						var freetime = day.freetimes.values();
						var time = freetime.next().value;
						while(!(time ==newtime)){
							time=freetime.next().value;
						}
					}

					//2: the set of freetimes doesnt have time-1
					//then check if it has time+i, i =1; i <task.durationUnits;i++
					else{
						var i = 1;
						var canFit = true;
						while(i < task.durationUnits && canFit){
							if(day.freetimes.has(time+i)){
								i++
							}
							else{
							canFit=false;
							}
						}
						if(canFit){
							task.startTime = time;
							day.freetimes.delete(time)
							for(var i = 1; i <= task.durationUnits; i++){
								day.freetimes.delete(time+i)
							}
							notSet = false
						}
						else{
							time =  freetime.next().value;
						}
					}
				}
			})
		})
	}


	testDays(comparisonDays){
		/*
		
		
		busytimes:new Set(),
		freetimes: this.initFreetime(),
		
		*/

		this.forEach(function(day,date){
			//console.log(comparisonDays)
			
			var comparisonDay = comparisonDays[date]

			if(!comparisonDay.midnight.isSame(day.midnight)){
				console.log('midnights dont match!')
				console.log(comparisonDay)
				console.log(day)
			}
			var samefreetotal = day.freetotal == comparisonDay.freetotal
			var samebusytotal = day.busytotal == comparisonDay.busytotal
			var sameoriginalbusytotal = day.originalbusytotal == comparisonDay.originalbusytotal
			var sameoriginalfreetotal = day.originalfreetotal == comparisonDay.originalfreetotal
			var sametaskstotal = day.taskstotal == comparisonDay.taskstotal
			
			if( !samefreetotal || !samebusytotal || !sameoriginalbusytotal || !sameoriginalfreetotal || !sametaskstotal){
				console.log('totals are wrong!')
				console.log(date)
				console.log(day)
				console.log(comparisonDay)
				
			}

			if(comparisonDay.events.length != day.events.length){
				console.log('event lists dont match');
				console.log(day)
				console.log(comparisonDay)
			}

			//check if the events equal
			day.events.forEach(function(event,number){
				var comparisonEvent = comparisonDay.events[number];

				if(!event.start.isSame(comparisonEvent.start)){
					console.log('error events dont equal');
					console.log(event)
					console.log(comparisonEvent)
				}

				else if(event.duration != comparisonEvent.duration){
					console.log('durations dont match')
				}
			})//end check events

			//check if the tasks equal
			day.tasks.forEach(function(task,number){
				var comparisonTask = comparisonDay.tasks[number];
				
				if(!comparisonDay.tasks.includes(task)){
					console.log('day number ' +date)
					console.log('task number'+ number)
					console.log('error task is not included');
					console.log(task)
					console.log(comparisonDay.tasks)
				}
													
			})//end check tasks

			//check if busytimes are equal
			var comparisonBusyTimes = comparisonDay.busytimes
			var busytime = day.busytimes.values()
			for(var i = 0; i <day.busytimes.size; i++){
				
				if(!comparisonBusyTimes.has(busytime.next().value)){
					console.log('busytimes dont match')
					console.log(day)
					console.log(comparisonDay)
				}
			}
			//check if freetimes are not in busytimes
			var freetime = day.freetimes.values()

			for(var i = 0; i <day.freetimes.size; i++){

				if(day.busytimes.has(freetime.next().value)){

					console.log('freetimes overlap with busytimes')
					console.log(day.busytimes)
					console.log(day.freetimes)
				}
			}

		})

	}



}

var d = new Days(days.length)
d.setMidnight(events[0].getStartTime())

d.addEvents(events)

d.addTasks(taskstwo)



d.testDays(days)