class Timeslot{
	constructor(start,end,isBooked){
	this.start = start;
	this.end = end;
	if(end==Infinity){
		this.next = null;
	}
	else{
		this.next = 0;
	}
	
	this.previous = 0;
	this.isBooked = isBooked;
	this.isFree = !isBooked;
	}

	includesStartOf(slot){
		console.log(this)
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
		this.push(new Timeslot(0,Infinity,false))
	}//end constructor

	/* method */ getTheFitFor(event){
		for(var i = 0; !this[i].includesStartOf(event); i++){
		}
		return this[i]
	}//end getTheFitFor

	/* method */ updateFreeSpotsWith(event){
		this.forEach(function(slot,index,timeslots){

			if(event.includesStartOf(slot) && slot.isFree){

				slot.start = event.end;
				if(slot.isFullyUsed()){
					timeslots[slot.previous].next = slot.next;
				}

			}
		})
	}//end updateFreeSpotsWith

	/* method */ addEvent(startTime,endTime){
		var event = new Timeslot(
		startTime, //start
		endTime, //end
		true //isBooked
		)
		

		var timeslot = this.getTheFitFor(event);
		console.log(timeslot)
		this.push(event)
		if(timeslot.isFree){

			if(event.endsAfter(timeslot)){

				timeslot.end = event.start;
				this.insertAfter(
					timeslot, //existing Slot
					event //Slot to be inserted.
				)
				
				this.updateFreeSpotsWith(event);


			}

			else{ //if event.endsBefore(timeslot)
				/*
				var newSlot = this.addNewSlot(
				this.indexOf(event), //newSlot.previous
				event.end, //newSlot.start
				timeslot.end, //newSlot.end 
				timeslot.next //newSlot.next
				);
				*/
				var newSlot = new Timeslot(event.end,
					timeslot.end, 
					false);
				this.push(newSlot);
				timeslot.end = event.start;

				/*
				event.next = timeslot.next;
				event.previous = this.indexOf(timeslot);
				timeslot.next = this.indexOf(event);

				newSlot.next = event.next;
				newSlot.previous = this.indexOf(event);
				event.next = this.indexOf(newSlot);
				*/

				this.insertAfter(timeslot,//existing Slot
					event //Slot to be inserted.
					);
				this.insertAfter(event,//existing Slot
					newSlot //Slot to be inserted.
					);

			}

		}
		else{ //if timeslot.isBooked
			if(event.endsAfter(timeslot)){
				this.updateFreeSpotsWith(event);
			}
			else{ //if event.endsBefore(timeslot)
				this.insertAfter(
					timeslot, //existing Slot
					event //Slot to be inserted.
				)
			}

		}
	
	}//end addEvent

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
	}//end insertAfter

}//end class Timeslots 