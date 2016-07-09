class Days extends Array{
	constructor(number){
		super()
		for(var i=0;i<number;i++){
			var day = {
				events:[],
				tasks:[],
				midnight:0,
				freetotal:0,
				busytotal:0,
				busytimes:new Set(),
				originalbusytotal:0,
				originalfreetotal:0,
				taskstotal:0
			}
			this.push(day)
		}
		
	}

	
}

var d = new Days(33)