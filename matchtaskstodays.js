var spreadsheetapp = new SpreadsheetApp()

var spreadsheet =spreadsheetapp.getActiveSpreadsheet()

var sheet = spreadsheet.getSheetByName('name')

tasks = sheet.getSheetValues()

//calculate priority

for(var i= 0; i< tasks.length; i++){
	tasks[i].priority = tasks[i].importance/tasks[i].duedate.diff(new Date(),'days');
}

//sort by priority

tasks.sort(function(a,b){
	var difference = b.priority -a.priority;
	return difference
})

//add a tasks property to each days

days.forEach(function(item){
	item.tasks=[];
	item.originalbusytotal = item.busytotal
	item.originalfreetotal = item.freetotal
	})


var maxUtil = 0.4;
tasks.forEach(function(item){
	
	var gen = nextDay(days);
	var date = gen.next().value
	item.durationunits = Math.ceil(item.duration/10)
	while(date.freetotal < item.durationunits || maxUtil <= (date.busytotal+item.durationunits)/144 ){
		//console.log(date.busytotal/144)
		//console.log(date.busytotal)
		date = gen.next().value;
	}
	date.tasks.push(item)
	date.freetotal -= item.durationunits
	date.busytotal += item.durationunits

	
})
/*
freetotal+busytotal should = 144
never less than 0
*/
days.forEach(function(item){
	item.tasktotal= 0;
	item.tasks.forEach(function(task){
		item.tasktotal += task.durationunits
	})
	
	})