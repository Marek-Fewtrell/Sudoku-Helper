
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
    		document.getElementById("checkOut").innerHTML = "Checking Grid...";
    		clearGridStyle();
        getGrid();

        for (var checker = 0; checker < 9; checker++) {
            /*console.log("Row " + checker + " is " + checkRow(checker));
            console.log("Col " + checker + " is " + checkColumn(checker));*/
            var tableRow = document.getElementById('r' + (checker + 1));

            if (checkRow(checker)) {
                /*tableRow.classList.add("validRow");

                if (tableRow.classList.contains("invalidRow")) {
                    tableRow.classList.remove("invalidRow");
                }*/
                
                for (var rowChecker = 0; rowChecker < 9; rowChecker++) {
                    var rowCell = document.getElementById('a' + checker + rowChecker);
                    //rowCell.classList.add("validCell");

                    /*if (rowCell.classList.contains("invalidCell")) {
                        rowCell.classList.remove("invalidCell");
                    }*/
                }
            } else {
            		for (var rowChecker = 0; rowChecker < 9; rowChecker++) {
                    var rowCell = document.getElementById('a' + checker + rowChecker);
                    rowCell.classList.add("invalidCell");

                    /*if (rowCell.classList.contains("validCell")) {
                        rowCell.classList.remove("validCell");
                    }*/
                }
                /*tableRow.classList.add("invalidRow");

                if (tableRow.classList.contains("validRow")) {
                    tableRow.classList.remove("validRow");
                }*/
            }


            if (checkColumn(checker)) {
                for (var columnChecker = 0; columnChecker < 9; columnChecker++) {
                    var columnCell = document.getElementById('a' + columnChecker + checker);
                    /*columnCell.classList.add("validCell");

                    if (columnCell.classList.contains("invalidCell")) {
                        columnCell.classList.remove("invalidCell");
                    }*/
                }
            } else {
                for (var columnChecker = 0; columnChecker < 9; columnChecker++) {
                    var columnCell = document.getElementById('a' + columnChecker + checker);
                    columnCell.classList.add("invalidCell");

                    /*if (columnCell.classList.contains("validCell")) {
                        columnCell.classList.remove("validCell");
                    }*/
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
                case 0:
                    startingRow = 0;
                    startingCol = 0;
                    break;
                case 1:
                    startingRow = 0;
                    startingCol = 3;
                    break;
                case 2:
                    startingRow = 0;
                    startingCol = 6;
                    break;
                case 3: // number 4 grid
                    startingRow = 3;
                    startingCol = 0;
                    break;
                case 4:
                    startingRow = 3;
                    startingCol = 3;//This one may be wrong!!!! should be 3 possibly.
                    break;
                case 5:
                    startingRow = 3;
                    startingCol = 6;
                    break;
                case 6:
                    startingRow = 6;
                    startingCol = 0;
                    break;
                case 7:
                    startingRow = 6;
                    startingCol = 3;
                    break;
                case 8:
                    startingRow = 6;
                    startingCol = 6;
                    break;
            }

            if (checkGroup(startingRow, startingCol)) {
                console.log("Valid Group");
                for (var groupRowIter = startingRow; groupRowIter < startingRow + 2; groupRowIter++) {
                    for (var groupColIter = startingCol; groupColIter < startingCol + 2; groupColIter++) {
                        var groupCell = document.getElementById('a' + groupRowIter + groupColIter);
                        /*groupCell.classList.add("validCell"); 
                        
                        if (groupCell.classList.contains("invalidCell")) {
                            groupCell.classList.remove("invalidCell");
                        }*/
                    }
                }
            } else {
                console.log("Invalid Group");
                //alert("for Group:" + checker + "\nStarting Row:" + startingRow + "\nstarting Col:" + startingCol + "\n");
                for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
                    for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
                        //alert("Group Row Iter:" + groupRowIter + "\nGroup Col Iter:" + groupColIter);
                        var groupCell = document.getElementById('a' + groupRowIter + groupColIter);
                        //alert('a' + groupRowIter + groupColIter);
                        groupCell.classList.add("invalidCell"); 

                        /*if (groupCell.classList.contains("validCell")) {
                            groupCell.classList.remove("validCell");
                        }*/
                    }
                }
            }
            
        }
        document.getElementById("checkOut").innerHTML = "Grid Checked...";
    }
    
    function checkRow(row) {
        var validRow = true;
        //var rowToCheck = sudokuGrid[row];
        
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

    function setCell(row, col, valid) {
        if (valid) {
            var cell = document.getElementById('a' + row + col);
            //change the class name to valid
        } else {
            //change class the invalid
        }
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
		document.getElementById("sugOutput").innerHTML = "Getting Suggestions...";
			getGrid();
			// i is the row, j is the column
				for (var i = 0; i < 9; i++) {
            for (var j = 0; j < 9; j++) {
            console.log("i is: " + i + "; j is: " + j);
            if (sudokuGrid[i][j] != 0 ) {
		          document.getElementById('s' + i + j).innerHTML = "x";
            } else {
            		var suggestions = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            		suggestions = checkRowSuggestion(i, suggestions);
            		suggestions = checkColumnSuggestion(j, suggestions);
            		
            		var startingRow = 0;
            		var startingCol = 0;
            		
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
                var suggestionCell = document.getElementById('s' + i + j);
                var textSug = "";
                for (var sugCounter = 0; sugCounter < 9; sugCounter++) {
                	if (suggestions[sugCounter] == 0) {
	                	textSug += (sugCounter +1) + " ,";
                	}
                }
                suggestionCell.innerHTML = textSug;
                }
            }
        }
        document.getElementById("sugOutput").innerHTML = "Got Suggestions!";
		}
		
		function checkRowSuggestion(row, suggestions) {
      //var suggestions = [0,0,0,0,0,0,0,0,0];
      
      for (var iterator = 0; iterator < 9; iterator++) {
          if (sudokuGrid[row][iterator] > 0) {
              suggestions[sudokuGrid[row][iterator] - 1]++;
          }
      }

      return suggestions;
		}
		function checkColumnSuggestion(column, suggestions) {
				//var suggestions = [0,0,0,0,0,0,0,0,0];

        for (var iterator = 0; iterator < 9; iterator++) {
            if (sudokuGrid[iterator][column] > 0) {
                suggestions[sudokuGrid[iterator][column] - 1]++;
            }
        }
        return suggestions;
		}
		function checkGroupSuggestion(startingRow, startingCol, suggestions) {
        //var suggestions = [0,0,0,0,0,0,0,0,0];

        for (var groupRowIter = startingRow; groupRowIter < startingRow + 3; groupRowIter++) {
            for (var groupColIter = startingCol; groupColIter < startingCol + 3; groupColIter++) {
                if (sudokuGrid[groupRowIter][groupColIter] > 0) {
                    suggestions[sudokuGrid[groupRowIter][groupColIter] - 1]++;
                }
            }
        }
        return suggestions;
		}

};



/*function getRows2() {
        //var table = document.getElementById("SudokuTable");
        var allInputs = document.getElementsByTagName("input");

        for (var i = 0; i < 81; i++) {
            //console.log(i + " value is " + allInputs[i].value);
            if (allInputs[i].value == "") {
                continue;
            }
            sudokuGrid[Math.floor(i/9)][i%9] = allInputs[i].value;
        }

        var allRowsValid = true;
        var allColsValid = true;
        for (var checker = 0; checker < 9; checker++) {
            if (!checkRow(checker)) {
                allRowsValid = false;
            }
            if (!checkColumn(checker)) {
                allColsValid = false;;
            }
            
        }

        alert("Valid Rows: " + allRowsValid);
        alert("Valid Cols: " + allColsValid);
    }*/
