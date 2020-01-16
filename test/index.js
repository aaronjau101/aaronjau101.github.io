// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
	var x = document.getElementById("navSmall");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

var balls = [];
var w, h;
var mouseDown = false;

function setup() {
	w = window.innerWidth;
	h = window.innerHeight;
	createCanvas(w, h).parent("backgroundCanvas");
}

function draw() {
	background('white');
	if(w != window.innerWidth || h != window.innerHeight) {
		setup();
	}
	if(mouseDown) {
		balls.push(new Ball());
	}
	for(var ball of balls) {
		ball.update();
	}
	balls.filter(b => b.onScreen());
}

function mousePressed() {
	mouseDown = true;
}

function mouseReleased() {
	mouseDown = false;
}

class Ball {
	constructor() {
		this.x = mouseX;
		this.y = mouseY;
		this.size = random(5, 15);
		this.opacity = 100;
		this.xv = random (-5, 5);
		this.yv = random(-5, -1);
		this.gravity = random(0.001, 0.1);
	}

	update() {
		this.move();
		this.draw();
	}

	draw() {
		noStroke();
		fill(23, 54, 25, this.opacity);
		ellipse(this.x, this.y, this.size, this.size);
	}

	move() {
		this.yv += this.gravity;
		this.y += this.yv;
		this.x += this.xv;
		this.opacity -= 0.5;
	}

	onScreen() {
		let r = this.size / 2;
		return this.x + r < w && this.x - r > 0 
			&& this.y + r < h && this.y - r > 0;
	}
}