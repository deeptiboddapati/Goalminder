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
			}
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
					
					if(day.freetimes.has(time-1)){
						var newtime = time- 1
						var freetime = day.freetimes.values();
						var time = freetime.next().value;
						while(!(time ==newtime)){
							time=freetime.next().value;
						}
					}

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
}
