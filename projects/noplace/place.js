var db = firebase.firestore();

var rows = 3;
var columns = 3;

var place = [];

db.collection("place").get().then((querySnapshot) => {
	querySnapshot.forEach((doc) => {
		//console.log(`${doc.id} => ${doc.data()}`);
		let data = doc.data();
		data["id"] = doc.id;
		place.push(data);
	});
});

var placeSize;
var currentCell = null;

function setup() {
	var element = document.getElementById('placeDisplay');
	var positionInfo = element.getBoundingClientRect();
	var height = positionInfo.height;
	var width = positionInfo.width;
	if(width) {
		placeSize = width - 32;
		createCanvas(placeSize, placeSize).parent("placeCanvas");
	}else{
		placeSize = 100;
		createCanvas(placeSize, placeSize).parent("placeCanvas");
	}
}

function draw() {
	background("white");
	for(var cell of place) {
		drawCell(cell);
	}
	if(currentCell != null) {
		displayCellInfo(currentCell);
	} else {
		document.getElementById('cellInfo').innerHTML = "None";
	}
}

function drawCell(cell) {
	let s = (placeSize - 1)/ 3;
	stroke("black");
	strokeWeight(2);		
	fill(cell.color[0], cell.color[1], cell.color[2]);
	let x = s * cell.col, y = s * cell.row;
	rect(x, y, s, s);
}

function displayCellInfo(cell) {
	var info = "";
	info += "Owner: " + cell.owner;
	info += "<br>";
	info += "Row: " + cell.row;
	info += "<br>";
	info += "Column: " + cell.col;
	info += "<br>";
	info += "Layer: " + cell.layer;
	info += "<br>";
	info += "Color(RGB): " + cell.color;
	document.getElementById('cellInfo').innerHTML = info;
}

function mousePressed () {
	let s = (placeSize - 1)/ 3;
	for(var cell of place) {
		let x = s * cell.col, y = s * cell.row;
		if(mouseX > x && mouseX < x + s && mouseY > y && mouseY < y + s) {
			if(currentCell == cell) {
				currentCell = null;
			}else{
				currentCell = cell;
			}
		}
	}
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [
    parseInt(result[1], 16),
    parseInt(result[2], 16),
    parseInt(result[3], 16)
  ] : null;
}

function purchaseCell() {
	if(currentCell == null) {
		alert("Click on a cell to purchase");
		return;
	}
	var user = firebase.auth().currentUser;
	if(user == null) {
		alert("Must be signed in to purchase");
		return;
	}
	var emailVerified = user.emailVerified;
	if(!emailVerified) {
		alert("Must verify email before purchase");
		return;
	}
	var colorPicked = document.getElementById("colorPicker").value;
	var RGB = hexToRgb(colorPicked);
	if(RGB == null) {
		alert("Invalid Color");
		return;
	}
	var userName = user.displayName;
	var docId = currentCell.id;
	db.collection("place").doc(docId).update({
    	owner: userName,
    	color: RGB
	});
	currentCell.owner = userName;
	currentCell.color = RGB
}

window.onresize = function() {
	setup();
}