var blockSize = 150;
var borderSize = 10;
var gameSize = (blockSize * 4) + (borderSize * 5);
var playing = true;
var grid = [];

var setup = function() {
  createCanvas(gameSize, gameSize);
  makeGrid();
  addNewBlock();
  addNewBlock();
  background(0);
  drawGrid();
};

var makeGrid = function() {
  for(var row = 0; row < 4; row++){
    grid.push([]);
    for(var column = 0; column < 4; column++){
      var x = (column * blockSize) + ((column + 1) * borderSize);
      var y = (row * blockSize) + ((row + 1) * borderSize);
      grid[row].push({xpos: x, ypos: y, value: 0});
    }
  }
};

var isFilled = function(){
  for(var row = 0; row < 4; row++){
    for(var column = 0; column < 4; column++){
      var block = grid[row][column];
      if(block.value === 0)
        return false;
    }
  }
  return true;
};

var checkLose = function() {
  if(isFilled() === false)
    return false;
  for(var row = 0; row < 4; row++){
    for(var column = 0; column < 4; column++){
      var block = grid[row][column];
      if(row !== 0){
        if(grid[row - 1][column].value == block.value)
          return false;
      }
      if(row !== 3){
        if(grid[row + 1][column].value == block.value)
          return false;
      }
      if(column !== 0){
        if(grid[row][column - 1].value == block.value)
          return false;
      }
      if(column !== 3){
        if(grid[row][column + 1].value == block.value)
          return false;
      }
    }
  }
  return true;
};

var drawLose = function(){
  textAlign(CENTER, CENTER);
  fill(0);
  rect(gameSize/2 - 125, gameSize/2 - 30, 250, 60);
  fill(255, 255, 255);
  textSize(48);
  text("YOU LOSE", gameSize/2, gameSize/2);
};

var addNewBlock = function() {
  var value = round(random(0, 1)) ? 2 : 4;
  var row = round(random(0, 3));
  var column = round(random(0, 3));
  while(grid[row][column].value !== 0){
    row = round(random(0, 3));
    column = round(random(0, 3));
  }
  grid[row][column].value = value;
};

var drawGrid = function() {
  for(var row = 0; row < 4; row++){
    for(var column = 0; column < 4; column++){
      var block = grid[row][column];
      fill(getFill(block.value));
      rect(block.xpos, block.ypos, blockSize, blockSize);
      if(block.value !== 0){
        textAlign(CENTER, CENTER);
        textSize(28);
        fill(getTextFill(block.value));
        text(block.value, block.xpos + blockSize/2, block.ypos + blockSize/2);
      }
    }
  }
};

var getFill = function(v){
  if(v === 0)
    return color(77, 77, 77);
  if(v == 2)
    return color(191, 191, 191);
  if(v == 4)
    return color(255, 204, 102);
  if(v == 8)
    return color(255, 102, 0);
  if(v == 16)
    return color(255, 51, 0);
  if(v == 32)
    return color(204, 51, 0);
  if(v == 64)
    return color(153, 102, 0);
  if(v == 128)
    return color(153, 51, 0);
  if(v == 256)
    return color(102, 34, 0);
  if(v == 512)
    return color(51, 17, 0);
  if(v == 1024)
    return color(51, 204, 51);
  if(v == 2048)
    return color(0, 153, 51);
  if(v >= 4096)
    return color(255, 0, 0);
};

var getTextFill = function(v){
  if((v >= 2 && v <= 128) || v == 1024)
    return color(0);
  if(v >= 256)
    return color(255, 255, 255);
};

var keyPressed = function() {
  if(playing && (keyCode == LEFT || keyCode == RIGHT || keyCode == UP || keyCode == DOWN)){
    if(keyCode == LEFT)
      moveLeft();
    if(keyCode == RIGHT)
      moveRight();
    if(keyCode == UP)
      moveUp();
    if(keyCode == DOWN)
      moveDown();
    if(checkLose()){
      drawLose();
      playing = false;
    }
  }
};

var moveLeft = function(){
  var moves = 0;
  for(var row = 0; row < 4; row++){
   moves += moveRowLeft(row, 0, 0);
  }
  if(moves !== 0){
    addNewBlock();
    background(0);
    drawGrid();
    if(playing === false)
      drawLose();
  }
};

var moveRowLeft = function(r, c, m) {
  var block = grid[r][c];
  var blocks = [];
  for(var col = c + 1; col < 4; col++){
    blocks.push(grid[r][col]);
  }
  var blockRight = nextBlock(blocks);
  if(blockRight == -1)
      return m;
  var bR = blocks[blockRight];
  if(block.value === 0){
    block.value = bR.value;
    bR.value = 0;
    return m + moveRowLeft(r, c, m + 1);
  }else if(block.value == bR.value){
    block.value *= 2;
    bR.value = 0;
    if(c == 2)
      return m + 1;
    else
      return m + moveRowLeft(r, c + 1, m + 1);
  }else{
    if(c == 2)
      return m;
    else
      return m + moveRowLeft(r, c + 1, m);
  }
};

var moveRight = function(){
  var moves = 0;
  for(var row = 0; row < 4; row++){
    moves += moveRowRight(row, 3, 0);
  }
  if(moves !== 0){
    addNewBlock();
    background(0);
    drawGrid();
    if(playing === false)
      drawLose();
  }
};

var moveRowRight = function(r, c, m) {
  var block = grid[r][c];
  var blocks = [];
  for(var col = c - 1; col > -1; col--){
    blocks.push(grid[r][col]);
  }
  var blockLeft = nextBlock(blocks);
  if(blockLeft == -1)
      return m;
  var bL = blocks[blockLeft];
  if(block.value === 0){
    block.value = bL.value;
    bL.value = 0;
    return m + moveRowRight(r, c, m + 1);
  }else if(block.value == bL.value){
    block.value *= 2;
    bL.value = 0;
    if(c == 1)
      return m + 1;
    else
      return m + moveRowRight(r, c - 1, m + 1);
  }else{
    if(c == 1)
      return m;
    else
      return m + moveRowRight(r, c - 1, m);
  }
};

var moveUp = function(){
  var moves = 0;
  for(var column = 0; column < 4; column++){
   moves += moveColumnUp(0, column, 0);
  }
  if(moves !== 0){
    addNewBlock();
    background(0);
    drawGrid();
    if(playing === false)
      drawLose();
  }
};

var moveColumnUp = function(r, c, m) {
  var block = grid[r][c];
  var blocks = [];
  for(var row = r + 1; row < 4; row++){
    blocks.push(grid[row][c]);
  }
  var blockDown = nextBlock(blocks);
  if(blockDown == -1)
      return m;
  var bD = blocks[blockDown];
  if(block.value === 0){
    block.value = bD.value;
    bD.value = 0;
    return m + moveColumnUp(r, c, m + 1);
  }else if(block.value == bD.value){
    block.value *= 2;
    bD.value = 0;
    if(r == 2)
      return m + 1;
    else
      return m + moveColumnUp(r + 1, c, m + 1);
  }else{
    if(r == 2)
      return m;
    else
      return m + moveColumnUp(r + 1, c, m);
  }
};

var moveDown = function(){
  var moves = 0;
  for(var column = 0; column < 4; column++){
    moves += moveColumnDown(3, column, 0);
  }
  if(moves !== 0){
    addNewBlock();
    background(0);
    drawGrid();
    if(playing === false)
      drawLose();
  }
};

var moveColumnDown = function(r, c, m) {
  var block = grid[r][c];
  var blocks = [];
  for(var row = r - 1; row > -1; row--){
    blocks.push(grid[row][c]);
  }
  var blockUp = nextBlock(blocks);
  if(blockUp == -1)
      return m;
  var bU = blocks[blockUp];
  if(block.value === 0){
    block.value = bU.value;
    bU.value = 0;
    return m + moveColumnDown(r, c, m + 1);
  }else if(block.value == bU.value){
    block.value *= 2;
    bU.value = 0;
    if(r == 1)
      return m + 1;
    else
      return m + moveColumnDown(r - 1, c, m + 1);
  }else{
    if(r == 1)
      return m;
    else
      return m + moveColumnDown(r - 1, c, m);
  }
};

var nextBlock = function(blocks) {
  for(var i = 0; i < blocks.length; i++){
    if(blocks[i].value !== 0){
      return i;
    }
  }
  return -1;
};