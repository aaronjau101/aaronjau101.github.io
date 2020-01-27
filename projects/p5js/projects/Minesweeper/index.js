var w = 500;
var h = 400;
var rows = 20;
var cols = 25;
var gridSize = h/rows;
var numberOfBombs = 50;

var grid, time, playing, start, restartButtonImage;

var flagImage, bombImage, bombsafeImage, sadImage, coolImage, happyImage;

var drawScore = function(){
  fill(100);
  rect(0, h, w, 100);
  textSize(48);
  textAlign(LEFT, CENTER);
  fill(255, 0, 0);
  text(numberOfBombs-flagsUsed(), 50, h+50);
  textAlign(RIGHT, CENTER);
  text(round(time), w-50, h+50);
  image(restartButtonImage, (w/2) - 25, h + 25, 50, 50);
};

var flagsUsed = function() {
  var count = 0;
  for(var row = 0; row < rows; row++){
    for(var col = 0; col < cols; col ++){
      count = grid[row][col].vis == "flagged" ? count + 1: count;
      count = count > numberOfBombs ? numberOfBombs : count;
    }
  }
  return count;
};

var draw = function() {
  if(start && playing) {
    time+=1/60;
    drawScore();
  }
};

var setup = function() {
  flagImage = loadImage("./flag.png");
  bombImage = loadImage("./bomb.jpg");
  bombsafeImage = loadImage("./bombsafe.jpg");
  sadImage = loadImage("./sad.png");
  coolImage = loadImage("./cool.png");
  happyImage = loadImage("./happy.png");
  createCanvas(w, h + 100).parent("gameCanvas");
  grid = [];
  time = 0;
  playing = true;
  start = false;
  restartButtonImage = happyImage;
  createGrid();
  placeBombs();
  placeNumbers();
  drawGrid();
  drawScore();
};

function startGame() {

}

var createGrid = function(){
  for(var row = 0; row < rows; row++){
    grid.push([]);
    for(var col = 0; col < cols; col ++){
      grid[row].push({num: 0, vis: "hidden"});
    }
  }
};

var placeBombs= function(){
  for(var i = 0; i < numberOfBombs; i++){
    var r = floor(random(rows));
    var c = floor(random(cols));
    while(grid[r][c].num === 9) {
      r = floor(random(rows));
      c = floor(random(cols));
    }
    grid[r][c].num = 9;
  }
};

var placeNumbers = function(){
  for(var row = 0; row < rows; row++){
    for(var col = 0; col < cols; col ++){
      if(grid[row][col].num != 9) {
        var bombsNearby = 0;
        if(row > 0 && col > 0 && grid[row-1][col-1].num == 9)
          bombsNearby++;
        if(row > 0 && col < cols-1 && grid[row-1][col+1].num == 9)
          bombsNearby++;
        if(row > 0 && grid[row-1][col].num == 9)
          bombsNearby++;
        if(row < rows-1 && col > 0 && grid[row+1][col-1].num == 9)
          bombsNearby++;
        if(row < rows-1 && col < cols-1 && grid[row+1][col+1].num == 9)
          bombsNearby++;
        if(row < rows-1 && grid[row+1][col].num == 9)
          bombsNearby++;
        if(col < cols-1 && grid[row][col+1].num == 9)
          bombsNearby++;
        if(col > 0 && grid[row][col-1].num == 9)
          bombsNearby++;
        grid[row][col].num = bombsNearby;
      }
    }
  }
};

var drawGrid = function() {
  textAlign(CENTER, CENTER);
  textSize(18);
  for(var row = 0; row < rows; row++){
    for(var col = 0; col < cols; col ++){
      if(grid[row][col].vis == "active")
        fill(255);
      else 
        fill(125);
      rect(col * gridSize, row * gridSize, gridSize, gridSize);
      if(grid[row][col].num !== 0 && grid[row][col].vis == "active") {
        fill(0);
        text(grid[row][col].num, gridSize/2 + (col * gridSize), gridSize/2 + (row * gridSize));
      }
      if(grid[row][col].vis == "flagged"){
        image(flagImage, col * gridSize, row * gridSize, gridSize, gridSize);
      }else if(grid[row][col].vis == "bomb"){
        image(bombImage, col * gridSize, row * gridSize, gridSize, gridSize);
      }else if(grid[row][col].vis == "bombsafe"){
        image(bombsafeImage, col * gridSize, row * gridSize, gridSize, gridSize);
      }
    }
  }
};

var showSpace = function(r, c) {
  if(grid[r][c].vis == "active")
    return;
  else
    grid[r][c].vis = "active";
  if(grid[r][c].num !== 0)
    return;
  if(r > 0 && c > 0)
    showSpace(r-1, c-1);
  if(r > 0 && c < cols-1)
    showSpace(r-1, c+1);
  if(r > 0)
    showSpace(r-1, c);
  if(r < rows-1 && c > 0)
    showSpace(r+1, c-1);
  if(r < rows-1 && c < cols-1)
    showSpace(r+1, c+1);
  if(r < rows-1)
    showSpace(r+1, c);
  if(c < cols-1)
    showSpace(r, c+1);
  if(c > 0)
    showSpace(r, c-1);
};

var checkWin = function() {
  var bombCount = 0;
  var visCount = 0;
  for(var row = 0; row < rows; row++){
    for(var col = 0; col < cols; col ++){
      if(grid[row][col].num == 9 && (grid[row][col].vis == "flagged" || grid[row][col].vis == "hidden"))
        bombCount++;
      else if (grid[row][col].vis == "active")
        visCount++;
    }
  }
  if(bombCount == numberOfBombs && visCount == (rows*cols) - numberOfBombs){
    playing = false;
    showBombs();
    drawGrid();
    restartButtonImage = coolImage;
  }
};

var showBombs = function() {
   for(var row = 0; row < rows; row++){
    for(var col = 0; col < cols; col ++){
      if(grid[row][col].num == 9)
        grid[row][col].vis = "bombsafe";
    }
  }
};

var mousePressed = function() {
  var ratio = width / document.getElementById("gameCanvas").clientWidth;
  var trueMouseX = mouseX * ratio;
  var trueMouseY = mouseY * ratio;
  let x = w/2;
  let y = h + 50;
  if(trueMouseX > x-25 && trueMouseX < x+25 && trueMouseY > y-25 && trueMouseY < y+25)
    setup();
  else if(playing){
    if(start === false) 
      start = true;
    var col = floor(trueMouseX / gridSize);
    var row = floor(trueMouseY / gridSize);
    if(mouseButton == LEFT) {
      if(grid[row][col].vis == "flagged")
        grid[row][col].vis = "hidden";
      else if(grid[row][col].num == 9){
        playing = false;
        showBombs();
        grid[row][col].vis = "bomb";
        restartButtonImage = sadImage;
      }else if(grid[row][col].num === 0){
        showSpace(row, col);
      }else{
        grid[row][col].vis = "active";
      }
    }
    if(mouseButton == RIGHT) {
      if(grid[row][col].vis == "hidden")
        grid[row][col].vis = "flagged";
      else if(grid[row][col].vis == "flagged")
        grid[row][col].vis = "hidden";
    }
    drawGrid();
    drawScore();
    checkWin();
  }
};

document.oncontextmenu = function() {
  return false;
}