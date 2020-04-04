/**************************************
Timer and Wave counter + Info
**************************************/

var timer = 0;
var wave = 0;
var timerInterval;
var sneak = false;

function count(){
    timer += 1;
    document.getElementById("timer").innerHTML = timer;
}

function startTimer() {
    clearInterval(timerInterval);
    if(wave < 10) 
        wave += 1;
    document.getElementById("wave").innerHTML = wave;
    document.getElementById("info").innerHTML = data[wave-1][0];
    timer = 0;
    document.getElementById("timer").innerHTML = timer;
    sneak = false;
    document.getElementById("sneakpeek").innerHTML = "";
    timerInterval = setInterval(count, 1000);
}

function reset() {
    clearInterval(timerInterval);
    timer = 0;
    wave = 0;
    document.getElementById("wave").innerHTML = wave;
    document.getElementById("timer").innerHTML = timer;
    document.getElementById("info").innerHTML = "";
    sneak = false;
    document.getElementById("sneakpeek").innerHTML = "";
}

function sneakPeek() {
    sneak = !sneak;
    if(sneak && wave < 9) {
        document.getElementById("sneakpeek").innerHTML = data[wave][0];
    }else{
        document.getElementById("sneakpeek").innerHTML = "";
    }
}

/**************************************
Load in the txt file into an array
**************************************/

function loadCodes(textFile) {
    $.ajax({
        url: textFile, 
        success: function(result){
            processData(result);
        }
    });
}

$(document).ready(loadCodes("REG_LEECH_BEG.txt"));

var data;

function processData(allText) {
    console.log("Loading Codes");
    data = [];
    reset();
    var lines = allText.split(/\r\n|\n/);
    var lb = "---"
    for (var i=0; i< lines.length; i++) {
        var line = lines[i];
        if(line.slice(0, lb.length) == lb) {
            var t = [];
            
            for(var j = i + 1; j < lines.length; j++){
                if(lines[j][0] == "W") {
                    t.push([""]);
                }
                if(lines[j][0] == "-") {
                    break;
                }
                t[t.length-1] += lines[j] + "<br>";
            }
            
            data.push(t);
        }
    }
}