/*
To Do List:

Create a proper 1-9 list in the suggestion boxes, Grey out any which won't be there.
Improve the suggestions.
Improve the UI.

*/


window.onload = function () {

	const RADIX = 10;
	var sudokuGrid = [
		[0,0,0,0,0,0,0,0,0],//1
		[0,0,0,0,0,0,0,0,0],//2
		[0,0,0,0,0,0,0,0,0],//3
		[0,0,0,0,0,0,0,0,0],//4
		[0,0,0,0,0,0,0,0,0],//5
		[0,0,0,0,0,0,0,0,0],//6
		[0,0,0,0,0,0,0,0,0],//7
		[0,0,0,0,0,0,0,0,0],//8
		[0,0,0,0,0,0,0,0,0],//9
	];
    
	var suggestionSudokuGrid = [
		[0,0,0,0,0,0,0,0,0],//1
		[0,0,0,0,0,0,0,0,0],//2
		[0,0,0,0,0,0,0,0,0],//3
		[0,0,0,0,0,0,0,0,0],//4
		[0,0,0,0,0,0,0,0,0],//5
		[0,0,0,0,0,0,0,0,0],//6
		[0,0,0,0,0,0,0,0,0],//7
		[0,0,0,0,0,0,0,0,0],//8
		[0,0,0,0,0,0,0,0,0],//9
	];

	document.getElementById("checkGridButt").addEventListener("click", checkGrid);
	document.getElementById("getSuggestionsButt").addEventListener("click", makeSuggestions);
    
	function getGrid() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var cell = document.getElementById('a' + i + j);
				if (cell.value != "") {
					sudokuGrid[i][j] = parseInt(cell.value, RADIX);
				} else {
					sudokuGrid[i][j] = 0;
				}
			}
		}
	}
    
	function checkGrid() {
		document.getElementById("checkOutput").innerHTML = "Checking Grid...";
		clearGridStyle();
		getGrid();

		for (var checker = 0; checker < 9; checker++) {
			if (!checkRow(checker)) {
				for (var rowChecker = 0; rowChecker < 9; rowChecker++) {
					var rowCell = document.getElementById('a' + checker + rowChecker);
					rowCell.classList.add("invalidCell");
				}
			}

			if (!checkColumn(checker)) {
				for (var columnChecker = 0; columnChecker < 9; columnChecker++) {
					var columnCell = document.getElementById('a' + columnChecker + checker);
					columnCell.classList.add("invalidCell");
				}
			}

			var startingRow = 0;
			var startingCol = 0;
			/*
			*    0 1 2 3 4 5 6 7 8
			* 
			* 0  1 1 1 2 2 2 3 3 3
			* 1  1 1 1 2 2 2 3 3 3
			* 2  1 1 1 2 2 2 3 3 3
			* 3  4 4 4 5 5 5 6 6 6
			* 4  4 4 4 5 5 5 6 6 6
			* 5  4 4 4 5 5 5 6 6 6
			* 6  7 7 7 8 8 8 9 9 9
			* 7  7 7 7 8 8 8 9 9 9
			* 9  7 7 7 8 8 8 9 9 9
			*/
			switch (checker) {
				case 0://Top left
					startingRow = 0;
					startingCol = 0;
					break;
				case 1://Top middle 
					startingRow = 0;
					startingCol = 3;
					break;
				case 2://Top right
					startingRow = 0;
					startingCol = 6;
					break;
				case 3: //Middle left
					startingRow = 3;
					startingCol = 0;
					break;
				case 4://Middle middle
					startingRow = 3;
					startingCol = 3;
					break;
				case 5://Middle right
					startingRow = 3;
					startingCol = 6;
					break;
				case 6://Bottom left
					startingRow = 6;
					startingCol = 0;
					break;
				case 7://Bottom middle
					startingRow = 6;
					startingCol = 3;
					break;
				case 8://Bottom right
					startingRow = 6;
					startingCol = 6;
					break;
			}
			
			if (!checkGroup(startingRow, startingCol)) {
				//console.log("Invalid Group");
				for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
					for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
						var groupCell = document.getElementById('a' + groupRowIter + groupColIter);
						groupCell.classList.add("invalidCell"); 
					}
				}
			}
		}
		document.getElementById("checkOutput").innerHTML = "Grid Checked...";
	}
    
	function checkRow(row) {
		var validRow = true;
		var numberCheck = [0,0,0,0,0,0,0,0,0];

		for (var iterator = 0; iterator < 9; iterator++) {
			if (sudokuGrid[row][iterator] > 0) {
				numberCheck[sudokuGrid[row][iterator] - 1]++;
				if (numberCheck[sudokuGrid[row][iterator]-1] > 1) {
					validRow = false;
				}
			}
		}
		return validRow;
	}

	function checkColumn(column) {
		var validColumn = true;
		var numberCheck = [0,0,0,0,0,0,0,0,0];

		for (var iterator = 0; iterator < 9; iterator++) {
			if (sudokuGrid[iterator][column] > 0) {
				numberCheck[sudokuGrid[iterator][column] - 1]++;
				if (numberCheck[sudokuGrid[iterator][column] - 1] > 1) {
					validColumn = false;
				}
			}
		}
		return validColumn;
	}

	function checkGroup(startingRow, startingCol) {
		var validGroup = true;
		var numberCheck = [0,0,0,0,0,0,0,0,0];

		for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
			for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
				if (sudokuGrid[groupRowIter][groupColIter] > 0) {
					numberCheck[sudokuGrid[groupRowIter][groupColIter] - 1]++;
					if (numberCheck[sudokuGrid[groupRowIter][groupColIter] - 1] > 1) {
						validGroup = false;
					}
				}
			}
		}
		return validGroup;
	}
    
	function clearGridStyle() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var cell = document.getElementById('a' + i + j);
				if (cell.classList.contains("invalidCell")) {
					cell.classList.remove("invalidCell");
				}
			}
		}
	}

	function makeSuggestions() {
		getGrid();
		
		document.getElementById("suggestionOutput").innerHTML = "Finding Suggestions...";
		
		calculateGeneralSuggestions();
		displayGeneralSuggestions();

		calculateSuggestions();
		displaySuggestions();
		suggestSingleNumbers();
		
		document.getElementById("suggestionOutput").innerHTML = "Finished Suggestions!";
	}
	
	function calculateSuggestions() {
		var checkedGroups = 0;
		// i is the row, j is the column
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				if (sudokuGrid[i][j] != 0 ) {//cell has a number.
					suggestionSudokuGrid[i][j] = 'x';
				} else {
					//index 0 is 1. index 8 is 9. These count the occurences of a number.
					var suggestions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
					suggestions = checkRowSuggestion(i, suggestions);
					suggestions = checkColumnSuggestion(j, suggestions);

					var startingRow = 0;
					var startingCol = 0;
					/*
					*    0 1 2 3 4 5 6 7 8
					* 
					* 0  1 1 1 2 2 2 3 3 3
					* 1  1 1 1 2 2 2 3 3 3
					* 2  1 1 1 2 2 2 3 3 3
					* 3  4 4 4 5 5 5 6 6 6
					* 4  4 4 4 5 5 5 6 6 6
					* 5  4 4 4 5 5 5 6 6 6
					* 6  7 7 7 8 8 8 9 9 9
					* 7  7 7 7 8 8 8 9 9 9
					* 9  7 7 7 8 8 8 9 9 9
					*/
					
					//This following code needs to stay; for each cell, need to check the group numbers as well.
					if (i <= 2) {
						if (j <= 2) {
							startingRow = 0;
							startingCol = 0;
						} else if (j <= 5) {
							startingRow = 0;
							startingCol = 3;
						} else {
							startingRow = 0;
							startingCol = 6;
						}
					} else if (i <= 5) {
						if (j <= 2) {
							startingRow = 3;
							startingCol = 0;
						} else if (j <= 5) {
							startingRow = 3;
							startingCol = 3;
						} else {
							startingRow = 3;
							startingCol = 6;
						}
					} else {
						if (j <= 2) {
							startingRow = 6;
							startingCol = 0;
						} else if (j <= 5) {
							startingRow = 6;
							startingCol = 3;
						} else {
							startingRow = 6;
							startingCol = 6;
						}
					}
					
					suggestions = checkGroupSuggestion(startingRow, startingCol, suggestions);
					
					suggestionSudokuGrid[i][j] = suggestions;
				}
			}
		}
	}
	
	function displaySuggestions() {
		for (var i = 0; i < 9; i++) {
			for (var j = 0; j < 9; j++) {
				var suggestionCell = document.getElementById('s' + i + j);
				var textSug = "";
				var suggestedSolutions = suggestionSudokuGrid[i][j];
				if (suggestedSolutions == 'x') {
					textSug = 'x';
				} else {
					for (var sugCounter = 0; sugCounter < 9; sugCounter++) {
						if (suggestedSolutions[sugCounter] == 0) {
							if (textSug == "") {
								textSug = (sugCounter +1);
							} else {
								textSug += ", " + (sugCounter +1);
							}
						}
					}
				}
				suggestionCell.innerHTML = textSug;
			}
		}
	}
	
	function suggestSingleNumbers() {
		document.getElementById("suggestionTips").innerHTML = "";
		//get all cells in a group. combine all suggestions into one. If one number only has one occurence, only one spot for it.
		
		for (var i = 0; i < 9; i++) {
			var groupSuggestions = [0,0,0,0,0,0,0,0,0];
			var startingRow = 0;
			var startingCol = 0;
			/*
			*    0 1 2 3 4 5 6 7 8
			* 
			* 0  1 1 1 2 2 2 3 3 3
			* 1  1 1 1 2 2 2 3 3 3
			* 2  1 1 1 2 2 2 3 3 3
			* 3  4 4 4 5 5 5 6 6 6
			* 4  4 4 4 5 5 5 6 6 6
			* 5  4 4 4 5 5 5 6 6 6
			* 6  7 7 7 8 8 8 9 9 9
			* 7  7 7 7 8 8 8 9 9 9
			* 9  7 7 7 8 8 8 9 9 9
			*/
			switch (i) {
				case 0://Top left
					startingRow = 0;
					startingCol = 0;
					break;
				case 1://Top middle 
					startingRow = 0;
					startingCol = 3;
					break;
				case 2://Top right
					startingRow = 0;
					startingCol = 6;
					break;
				case 3: //Middle left
					startingRow = 3;
					startingCol = 0;
					break;
				case 4://Middle middle
					startingRow = 3;
					startingCol = 3;
					break;
				case 5://Middle right
					startingRow = 3;
					startingCol = 6;
					break;
				case 6://Bottom left
					startingRow = 6;
					startingCol = 0;
					break;
				case 7://Bottom middle
					startingRow = 6;
					startingCol = 3;
					break;
				case 8://Bottom right
					startingRow = 6;
					startingCol = 6;
					break;
			}
			
			for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
				for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
					//if (i == 1) {console.log("Suggestion Grid " + suggestionSudokuGrid[groupRowIter][groupColIter]);console.log("Group " + groupSuggestions);}
					//console.log(groupSuggestions);
					var invertedSuggestion = invertArray(suggestionSudokuGrid[groupRowIter][groupColIter]);
					//groupSuggestions = mergeArray(groupSuggestions, suggestionSudokuGrid[groupRowIter][groupColIter]);
					groupSuggestions = mergeArray(groupSuggestions, invertedSuggestion);
				}
			}
			//console.log(groupSuggestions);
			for (var j=0; j<9; j++) {
				if (groupSuggestions[j] == 1) {
					var output = document.getElementById("suggestionTips");
					output.innerText += "Group " + (i+1) + " has a single digit somewhere!, Look for number " + (j+1) + "\n";
					//console.log("Group " + (i+1) + " has a single digit somewhere!, Look for number " + (j+1));
				}
			}
		}
	}
	
	function invertArray(array) {
		var tempArray = array;
		for (var i = 0; i < 9; i++) {
			if (tempArray[i] == 0) {
				tempArray[i] = 1;
			} else if (tempArray[i] == 1) {
				tempArray[i] = 0;
			}
		}
		return tempArray;
	}
	function mergeArray(arrayOne, arrayTwo) {	
		//alert(arrayOne + "\n" + arrayTwo);
		if (arrayTwo === 'x') {
			return arrayOne;
		}
		for (var i = 0; i < 9; i++) {
			//console.log(arrayOne[i] + " " + arrayTwo[i]);
			arrayOne[i] = arrayOne[i] + arrayTwo[i];
		}
		return arrayOne;
	}
	
	var rowSuggestions = [
			[0,0,0,0,0,0,0,0,0],//1
			[0,0,0,0,0,0,0,0,0],//2
			[0,0,0,0,0,0,0,0,0],//3
			[0,0,0,0,0,0,0,0,0],//4
			[0,0,0,0,0,0,0,0,0],//5
			[0,0,0,0,0,0,0,0,0],//6
			[0,0,0,0,0,0,0,0,0],//7
			[0,0,0,0,0,0,0,0,0],//8
			[0,0,0,0,0,0,0,0,0],//9
		];
		var columnSuggestions = [
			[0,0,0,0,0,0,0,0,0],//1
			[0,0,0,0,0,0,0,0,0],//2
			[0,0,0,0,0,0,0,0,0],//3
			[0,0,0,0,0,0,0,0,0],//4
			[0,0,0,0,0,0,0,0,0],//5
			[0,0,0,0,0,0,0,0,0],//6
			[0,0,0,0,0,0,0,0,0],//7
			[0,0,0,0,0,0,0,0,0],//8
			[0,0,0,0,0,0,0,0,0],//9
		];
		var groupSuggestions = [
			[0,0,0,0,0,0,0,0,0],//1
			[0,0,0,0,0,0,0,0,0],//2
			[0,0,0,0,0,0,0,0,0],//3
			[0,0,0,0,0,0,0,0,0],//4
			[0,0,0,0,0,0,0,0,0],//5
			[0,0,0,0,0,0,0,0,0],//6
			[0,0,0,0,0,0,0,0,0],//7
			[0,0,0,0,0,0,0,0,0],//8
			[0,0,0,0,0,0,0,0,0],//9
		];
	function calculateGeneralSuggestions() {
		
		// i is the row, j is the column
		for (var i = 0; i < 9; i++) {
				//index 0 is 1. index 8 is 9. These count the occurences of a number.
				var suggestions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				rowSuggestions[i] = checkRowSuggestion(i, suggestions);
				
				suggestions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				columnSuggestions[i] = checkColumnSuggestion(i, suggestions);
				
				var startingRow = 0;
				var startingCol = 0;
				switch (i) {
					case 0://Top left
						startingRow = 0;
						startingCol = 0;
						break;
					case 1://Top middle 
						startingRow = 0;
						startingCol = 3;
						break;
					case 2://Top right
						startingRow = 0;
						startingCol = 6;
						break;
					case 3: //Middle left
						startingRow = 3;
						startingCol = 0;
						break;
					case 4://Middle middle
						startingRow = 3;
						startingCol = 3;
						break;
					case 5://Middle right
						startingRow = 3;
						startingCol = 6;
						break;
					case 6://Bottom left
						startingRow = 6;
						startingCol = 0;
						break;
					case 7://Bottom middle
						startingRow = 6;
						startingCol = 3;
						break;
					case 8://Bottom right
						startingRow = 6;
						startingCol = 6;
						break;
				}
				
				suggestions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
				groupSuggestions[i] = checkGroupSuggestion(startingRow, startingCol, suggestions);
		}
	}
	function displayGeneralSuggestions() {
		var suggestionAreaRow = document.getElementById("generalSuggestionsRow");
		var suggestionAreaColumn = document.getElementById("generalSuggestionsColumn");
		var suggestionAreaGroup = document.getElementById("generalSuggestionsGroup");
		suggestionAreaRow.innerText = "1|2|3|4|5|6|7|8|9\n";
		suggestionAreaColumn.innerText = "1|2|3|4|5|6|7|8|9\n";
		suggestionAreaGroup.innerText = "1|2|3|4|5|6|7|8|9\n";
		for (var i = 0; i < 9; i++) {
			suggestionAreaRow.innerText += "Row " + i + ": " + rowSuggestions[i].join("|") + "\n";
			suggestionAreaColumn.innerText += "Column " + i + ": " + columnSuggestions[i].join("|") + "\n";
			suggestionAreaGroup.innerText += "Group " + i + ": " + groupSuggestions[i].join("|") + "\n";
		}
	}
	
		
	function checkRowSuggestion(row, suggestions) {
		for (var iterator = 0; iterator < 9; iterator++) {
			if (sudokuGrid[row][iterator] > 0) {
				suggestions[sudokuGrid[row][iterator] - 1]++;
				//suggestions[sudokuGrid[row][iterator] - 1] = 1;
			}
		}
		return suggestions;
	}
	function checkColumnSuggestion(column, suggestions) {
		for (var iterator = 0; iterator < 9; iterator++) {
			if (sudokuGrid[iterator][column] > 0) {
				suggestions[sudokuGrid[iterator][column] - 1]++;
				//suggestions[sudokuGrid[iterator][column] - 1] = 1;
			}
		}
		return suggestions;
	}
	function checkGroupSuggestion(startingRow, startingCol, suggestions) {
		for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
			for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
				if (sudokuGrid[groupRowIter][groupColIter] > 0) {
					suggestions[sudokuGrid[groupRowIter][groupColIter] - 1]++;
					//suggestions[sudokuGrid[groupRowIter][groupColIter] - 1] = 1;
				}
			}
		}
		return suggestions;
	}

};


