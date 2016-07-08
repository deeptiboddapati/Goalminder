

class SpreadsheetApp{
//This class allows users to open Google Sheets files and to create new ones. 
//This class is the parent class for the Spreadsheet service.
	getActiveSpreadsheet(){
	//	Returns the currently active spreadsheet, or null if there is none.
	var spreadsheet = new Spreadsheet();
	return spreadsheet;

	}
}
class Spreadsheet{
//This class allows users to access and modify Google Sheets files. 
//Common operations are adding new sheets and adding collaborators.
	getSheetByName(name){
		//Returns a sheet with the given name.
		var sheet = new Sheet()
		return sheet;
	}
}
class Sheet{
//Access and modify spreadsheet sheets. 
//Common operations are renaming a sheet and accessing range objects from the sheet.
	constructor(){
		this.tasks = [];
		/*
		title
		duration
		importance
		duedate

		*/
		for(var i = 0; i<100; i++){
			var task = {}
			task.title = 'Do ' + getRandomWord();
			task.duration = getRandomInt(10,60);
			task.importance = getRandomInt(1,10);
			task.duedate = getRandomDate(30);
			this.tasks.push(task);
		}
	}
	/*
	getRange(rowtostart, coltostart, numberofrows,numberofcolumns){
		//Returns the range with the top left cell at the given coordinates 
		//with the given number of rows and columns.
	
	}

	getLastRow(){
	//Returns the position of the last row that has content.
	}
	getLastColumn(){
	//Returns the position of the last column that has content.
	}
	*/
	getSheetValues(startRow, startColumn, numRows, numColumns){
	//Returns the rectangular grid of values for this range starting at the given coordinates.
	return this.tasks
	}
}
/*


class Range
//Access and modify spreadsheet ranges. 
//This class allows users to access and modify ranges in Google Sheets.
// A range can be a single cell in a sheet or a range of cells in a sheet.

	getValues(){
	//return Object[][] can be Number, Boolean, Date, or String
	//empty cells are represented by empty strings
	}
*/

var spreadsheetapp = new SpreadsheetApp()