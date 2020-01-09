// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

//When game button is pressed it loads an iframe
function loadFrame(index) {
    let project = projects[index];
    
    let titleString = "<h1>" + project.title + "</h1>";
    document.getElementById("gameTitle").innerHTML = titleString;

    let frameString = "<iframe src='./projects/" + project.link + "/index.html' height='525' width='515'></iframe>";
    document.getElementById("gameFrame").innerHTML = frameString;

    let instructionsString = "<h2>Instructions</h2><br><p>" + project.instructions + "</p>";
    document.getElementById("gameInstructions").innerHTML = instructionsString;

    document.getElementById("topButton").style.display = "block";;
}

let projects = 
[
    {title: "2048", link: "2048", instructions: "Use arrow keys to move tiles"},
    {title: "Game of Life", link: "Life", instructions: "Use mouse to select/deselect tiles.<br>Then use Space bar to run a generation."},
    {title: "Minesweeper", link: "Minesweeper", instructions: "Use left mouse click to discover tiles.<br>Use right mouse click to flag tiles."},
    {title: "Orbital", link: "Orbital", instructions: "Use left and right arrow keys to turn turret.<br>Use up arrow to shoot ball."}
];