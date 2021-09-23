var GRID_COLUMN_SIZE = 10;
var GRID_ROW_SIZE = 10;

var grid = [];

//Function that returns a cell's index number given the row and column
var getIndex = function(row, col) {
	return (row * GRID_COLUMN_SIZE) + col;
}

//Function to create the starting grid
var setupGrid = function() {
	var table = document.getElementById("table");
	for(var row = 0; row < GRID_ROW_SIZE; row++) {
		var rowHTML = "";
		rowHTML += "<div class='row'>";
		for(var col = 0; col < GRID_COLUMN_SIZE; col++) {
			var index = getIndex(row, col);
			rowHTML += "<div class='cell' id='cell" + index + "' onclick='clickCell(this)'></div>";
			grid.push({
				alive: false,
				neighbourScore: 0,
			});
		}
		rowHTML += "</div>";
		table.innerHTML += rowHTML;
	}
}

var colorBoard = function() {
	for(var row = 0; row < GRID_ROW_SIZE; row++) {
		for(var col = 0; col < GRID_COLUMN_SIZE; col++) {
			var index = getIndex(row, col)
			var cell = document.getElementById("cell" + index);
			if(grid[index].alive) {
				cell.style.backgroundColor = "black";
			}else{
				cell.style.backgroundColor = "white";
			}
		}
	}
}

var clickCell = function(cell) {
	var index = cell.id.split("cell")[1];
	grid[index].alive = !grid[index].alive;
	colorBoard();
}

var countNeighbors = function() {
	for(var row = 0; row < GRID_ROW_SIZE; row++) {
		for(var col = 0; col < GRID_COLUMN_SIZE; col++) {
			var index = getIndex(row, col)
			//Reset score to zero before counting
			grid[index].neighbourScore = 0
			//Check if there is a row above the current cell
			if(row > 0) {
				//TOP LEFT NEIGHBOR - also check if there is column left of cell
				if(col > 0 && grid[getIndex(row-1, col-1)].alive) {
					grid[index].neighbourScore += 1;
				}
				//TOP NEIGHBOR
				if(grid[getIndex(row-1, col)].alive) {
					grid[index].neighbourScore += 1;
				}
				//TOP RIGHT NEIGHBOR - also check if there is column right of cell
				if(col < GRID_COLUMN_SIZE - 1 && grid[getIndex(row-1, col+1)].alive) {
					grid[index].neighbourScore += 1;
				}
			}
			//Check if there is a row below the current cell
			if(row < GRID_ROW_SIZE - 1) {
				//BOTTOM LEFT NEIGHBOR - also check if there is column left of cell
				if(col > 0 && grid[getIndex(row+1, col-1)].alive) {
					grid[index].neighbourScore += 1;
				}
				//BOTTOM NEIGHBOR
				if(grid[getIndex(row+1, col)].alive) {
					grid[index].neighbourScore += 1;
				}
				//BOTTOM RIGHT NEIGHBOR - also check if there is column right of cell
				if(col < GRID_COLUMN_SIZE - 1 && grid[getIndex(row+1, col+1)].alive) {
					grid[index].neighbourScore += 1;
				}
			}
			//LEFT NEIGHBOR - also check if there is column left of cell
			if(col > 0 && grid[getIndex(row, col-1)].alive) {
				grid[index].neighbourScore += 1;
			}
			//RIGHT NEIGHBOR - also check if there is column right of cell
			if(col < GRID_COLUMN_SIZE - 1 && grid[getIndex(row, col+1)].alive) {
				grid[index].neighbourScore += 1;
			}
		}
	}
}

var updateHealth = function() {
	for(var cell of grid) {
		if(cell.alive && (cell.neighbourScore == 2 || cell.neighbourScore == 3)) {
			cell.alive = true;
		}else if (cell.alive == false && cell.neighbourScore == 3) {
			cell.alive = true;
		}else{
			cell.alive = false;
		}
	}
}

var runGeneration = function() {
	countNeighbors();
	updateHealth();
	colorBoard();
}