var balls, playing, score, turret, multiplier;

var LEFT_ARROW = 37;
var RIGHT_ARROW = 39;
var UP = 38;

var start = true;

var setup = function() {
  createCanvas(500, 500).parent("gameCanvas");
  balls = [];
  playing = true;
  score = 0;
  multiplier = 1;
  turret = {
  x: 250,
  y: 500,
  size: 100,
  angle: PI * 1.5
};
};

function startScreen() {
  background('orange');
  fill('black');
  textSize(48);
  textAlign(CENTER, CENTER);
  text("CLICK ON\nTHE SCREEN\nTO START", 250, 250);
}

function mousePressed(){
  start = false;
}

var draw = function() {
  if(start) {
    startScreen();
    return;
  }
  if(playing) {
    drawBackground();
    drawTurret();
    drawBalls();
    moveBall();
    checkLose();
    drawScore();
  }
};

var drawScore = function() {
  fill(0);
  noStroke();
  textSize(32);
  textAlign(RIGHT, CENTER);
  text(score.toFixed(0), 490, 450);
  textAlign(LEFT, CENTER);
  text('x'+ multiplier.toFixed(0), 10, 450);
};

var checkLose = function() {
  if(balls.length === 0)
    return;
  var ball = balls[balls.length - 1];
  var yv = ball.speed * sin(ball.angle);
  if(ball.y + (ball.size/2) > 400 && yv >= 0) {
    playing = false;
    drawBackground();
    drawTurret();
    drawBalls();
    textSize(48);
    fill(255, 0, 0);
    textAlign(CENTER, CENTER);
    text("YOU LOSE", 250, 250);
  }
};

var moveBall = function() {
  if(!ballMoving())
    return;
  var ball = balls[balls.length - 1];
  ball.x += ball.speed * cos(ball.angle);
  ball.y += ball.speed * sin(ball.angle);
  if(ball.y < ball.size/2) {
    ball.y = ball.size/2;
    ball.angle = (PI * 2) - ball.angle;
  }
  if(ball.x < ball.size/2 || ball.x > 500 - (ball.size/2)) {
    ball.x = max(ball.size/2, min(500 - (ball.size/2), ball.x));
    ball.angle = (PI) - ball.angle;
  }
  for(var i = 0; i < balls.length - 1; i++) {
    var b = balls[i];
    if(dist(b.x, b.y, ball.x, ball.y) < (b.size/2) + (ball.size/2)) {
      b.strength--;
      var angle = atan2(ball.y - b.y, ball.x - b.x);
      ball.x = b.x + (((b.size/2) + (ball.size/2)) * cos(angle));
      ball.y = b.y + (((b.size/2) + (ball.size/2)) * sin(angle));
      ball.angle = angle + (angle - (ball.angle + PI));
      if(ballDestroyed()) {
        score += multiplier;
        multiplier += 1;
      }
      balls = balls.filter((p) => {return p.strength > 0});
    }
  }
  ball.speed = ball.speed <= 0.1 ? 0 : ball.speed - 0.1;
  if(ball.speed === 0) {
    ball.size = max(getClosestEdge(ball) * 2, ball.size);
  }
};

var ballDestroyed = function() {
  for(var ball of balls) {
    if(ball.strength <= 0) {
      return true;
    }
  }
  return false;
}

var getClosestEdge = function(b) {
  var edges = [
    {x: 0, y: b.y},
    {x: 500, y: b.y},
    {x: b.x, y: 0},
    {x: b.x, y: 400},
  ];
  for(var ball of balls) {
    if(ball.x == b.x && ball.y == b.y)
      continue;
    var angle = atan2(b.y - ball.y, b.x - ball.x);
    var x = ball.x + (ball.size * 0.5 * cos(angle));
    var y = ball.y + (ball.size * 0.5 * sin(angle));
    edges.push({x: x, y: y});
  } 
  var closest = 1000000;
  for (var e of edges) {
    var d = dist(e.x, e.y, b.x, b.y);
    if(d < closest) {
      closest = d;
    }
  }
  return closest;
};

var drawBalls = function() {
  for(var ball of balls) {
    stroke(0);
    strokeWeight(1);
    if(!playing && ball.y + (ball.size/2) > 400) {
      fill(255, 0, 0);
      ellipse(ball.x, ball.y, ball.size, ball.size);
    } else if(ball.speed > 0) {
      fill(0, 255, 0);
      ellipse(ball.x, ball.y, ball.size, ball.size);
    }else{
      fill(0, 0, 255);
      ellipse(ball.x, ball.y, ball.size, ball.size);
      textAlign(CENTER, CENTER);
      textSize(18);
      fill(255);
      text(ball.strength, ball.x, ball.y);
    }
  }
};

var spawnBall = function() {
  var x = turret.x + (75 * cos(turret.angle));
  var y = turret.y + (75 * sin(turret.angle));
  balls.push({x: x, y: y, size: 20, angle: turret.angle, speed: 12.5, strength: 5});
};

var drawBackground = function() {
  background(100);
  noFill();
  stroke(0);
  strokeWeight(1);
  rect(0, 0, 499, 499);
  line(0, 400, 500, 400);
};

var drawTurret = function() {
  fill(0);
  ellipse(turret.x, turret.y, turret.size, turret.size);
  var x = cos(turret.angle);
  var y = sin(turret.angle);
  stroke(255, 0, 0);
  line(turret.x, turret.y, turret.x + (x*1500), turret.y + (y*1500));
  strokeWeight(15);
  stroke(0);
  line(turret.x, turret.y, turret.x + (x*75), turret.y + (y*75));
};

var keyPressed = function() {
  if(keyCode == LEFT_ARROW && turret.angle > (PI * (13/12))) {
    turret.angle -= (PI / 36);  
  }
  if(keyCode == RIGHT_ARROW && turret.angle < (PI * (23/12))) {
    turret.angle += (PI / 36);  
  }
  if(keyCode == UP && !ballMoving()) {
    multiplier = 1;
    spawnBall();
  }
  if(!playing) {
    setup();
  }
};

var ballMoving = function() {
  if(balls.length === 0)
    return false;
  return balls[balls.length-1].speed > 0;
};

window.addEventListener("keydown", function(e) {
    if([37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);