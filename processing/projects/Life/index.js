var grid = [];
var w = 500;
var h = 500;
var gridSize = 10;
var space = false;
var timer = 0;

var setup = function() {
  let c = createCanvas(w, h);
  c.parent("gameCanvas");
  for(var row = 0; row < floor(w/gridSize); row++) {
    grid.push([]);
    for(var col = 0; col < floor(h/gridSize); col++){
      grid[row].push(0);
    }
  }
};

var draw = function() {
  drawBoard();
  generations();
};

function generations() {
  if(space && timer == 0) {
    runRules();
    timer = 10;
  }
  if(timer > 0) {
    timer -= 1;
  }
  if(!space) {
    timer = 0;
  }
}

var runRules = function() {
  var temp = [];
  for(var row = 0; row < floor(w/gridSize); row++) {
    temp.push([]);
    for(var col = 0; col < floor(h/gridSize); col++){
      var neighbors = 0;
      if(row > 0){
        neighbors += grid[row-1][col];
        if(col > 0)
          neighbors += grid[row-1][col - 1];
        if(col < floor(h/gridSize) - 1)
          neighbors += grid[row-1][col + 1];
      }
      if(row < floor(w/gridSize) - 1){
        neighbors += grid[row+1][col];
        if(col > 0)
          neighbors += grid[row+1][col - 1];
        if(col < floor(h/gridSize) - 1)
          neighbors += grid[row+1][col + 1];
      }
      if(col > 0)
          neighbors += grid[row][col - 1];
      if(col < floor(h/gridSize) - 1)
          neighbors += grid[row][col + 1];
          
      if(grid[row][col] === 0){
        if(neighbors == 3){
          temp[row].push(1);
        }else{
          temp[row].push(0);
        }
      }
      if(grid[row][col] === 1) {
        if(neighbors <= 1 || neighbors > 3){
           temp[row].push(0);
        }else{
          temp[row].push(1);
        }
      }
    }
  }
  grid = temp;
};

var drawBoard = function() {
  for(var row = 0; row < floor(w/gridSize); row++) {
    for(var col = 0; col < floor(h/gridSize); col++){
      if(grid[row][col] === 0)
        fill(255);
      else
        fill(0);
      rect(col * gridSize, row * gridSize, gridSize, gridSize);
    }
  }  
};

var keyPressed = function() {
  if(keyCode == 32){
    space = true;
  }
};

function keyReleased() {
  if(keyCode == 32) {
    space = false;
  }
}

var mousePressed = function() {
  var ratio = width / document.getElementById("gameCanvas").clientWidth;
  var trueMouseX = mouseX * ratio;
  var trueMouseY = mouseY * ratio;
  var col = floor(trueMouseX / gridSize);
  var row = floor(trueMouseY / gridSize);
  if (grid[row][col] === 0)
    grid[row][col] = 1;
  else
    grid[row][col] = 0;
};