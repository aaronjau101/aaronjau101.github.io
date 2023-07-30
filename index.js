//Hide an element
function hideElement(element) {
    if (element.className.indexOf("w3-show") != -1) {
        element.className = element.className.replace(" w3-show", "");
    }
}

//Show an element
function showElement(element) {
    if (element.className.indexOf("w3-show") == -1) {
        element.className += " w3-show";
    }
}

//Highlight a game
function highlight(gameID) {
	unhighlight();
	hideElement(document.getElementById("header"));
	showElement(document.getElementById("projects"));
	showElement(document.getElementById(gameID));
}

//Unighlight all games
function unhighlight() {
	stopVideos();
	hideElement(document.getElementById("tde"));
	hideElement(document.getElementById("srb"));
	hideElement(document.getElementById("tc"));
	hideElement(document.getElementById("projects"));
	showElement(document.getElementById("header"));
}

function stopVideos() {
	let elements = document.getElementsByClassName("vid");
	for(let vid of elements) {
		vid.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
	}
}

//Easter Egg p5js canvas running in background
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