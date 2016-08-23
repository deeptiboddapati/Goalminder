class Timeslot{
	constructor(start,end,isBooked){
	this.start = start;
	this.end = end;
	if(end==Infinity){
		this.next = null;
	}
	else{
		this.next = 'nan';
	}
	
	this.previous = 'nan';
	this.isBooked = isBooked;
	this.isFree = !isBooked;
	}

	includesStartOf(slot){
		
		return this.start <= slot.start && this.end > slot.start;
	}

	isFullyUsed(){
		if(this.isBooked){
			return true
		}
		else if(this.end-this.start <= 0){
			return true
		}
		else{
			return false
		}
	}

	endsAfter(slot){
		return slot.end < this.end
	}
}

class Timeslots extends Array{
	constructor(){
		super();
		this.push(new Timeslot(new Date(),Infinity,false))
	}


	getTheFitFor(event){
		for(var i = 0; !this[i].includesStartOf(event); i++){
		}
		return this[i]
	}
	

	updateFreeSpotsWith(event){
		this.forEach(function(slot,index,timeslots){
			if(event.includesStartOf(slot) && slot.isFree){
				slot.start = event.end;
				if(slot.isFullyUsed()){
					timeslots[slot.previous].next = slot.next;
				}

			}
		})
	}

	addEvent(startTime,endTime){
		var event = new Timeslot(
		startTime, 
		endTime, 
		true 
		)
		var timeslot = this.getTheFitFor(event);
		
		this.push(event)
		if(timeslot.isFree){
			
			if(event.endsAfter(timeslot)){
				timeslot.end = event.start;
				this.insertAfter(timeslot, event)	
				this.updateFreeSpotsWith(event);
			}
			else{ 
				var newSlot = new Timeslot(event.end,
					timeslot.end, 
					false);
				this.push(newSlot);
				timeslot.end = event.start;
				this.insertAfter(timeslot,event);
				this.insertAfter(event,newSlot);
			}

		}
		else{ 

			if(event.endsAfter(timeslot)){
				
				this.updateFreeSpotsWith(event);
				this.insertAfter(timeslot,event)
			}
			else{ 

				this.insertAfter(
					timeslot, 
					event 
				)
			}
		}
		return this.indexOf(event)
	}
	addEvents(events){
		var timeslots =this;
		events.forEach(function(event){
			timeslots.addEvent(event.getStartTime(),event.getEndTime())
		})
	}
	addNewSlot(previous,start,end,next){
		var slot = new Timeslot(start,end,false);
		slot.previous=previous;
		slot.next = next;
		this.push(slot);

	}
	insertAfter(existingSlot,addedSlot){
		addedSlot.next = existingSlot.next;
		addedSlot.previous = this.indexOf(existingSlot);
		existingSlot.next = this.indexOf(addedSlot)
	}

	checkFreetimes(){
		this.forEach(function(slot,index,array){
			if(slot.isFree){
				array.forEach(function(testslot){
					if(testslot.includesStartOf(slot) && !(testslot == slot)){
						return false
					}
				})
			}
		})
		return true
	}
	nextOf(slot){
		return this[slot.next]
	}
	previousOf(slot){
		return this[slot.previous]
	}
	traverseList(){
		var slot = this[0];
		while(!(slot.next == null)){
			
			slot = this.nextOf(slot)
		}
	}

	addTask(duration){
		var slot = this[0];
		var stillLooking = true;
		while(stillLooking){
			console.log(slot)
			var tempduration = slot.end-slot.start;
			console.log(tempduration)
			console.log(tempduration > duration)
			if( tempduration > duration && slot.isFree){
				stillLooking = false;
			}
			else{
				slot = this.nextOf(slot)
			}
		}

		var newEnd = moment(slot.start).add(duration, 'minutes')._d
		
		return this.addEvent(slot.start,newEnd)
	}
}
