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


$(document).ready(function(){
    $.ajax({url: "codes.txt", 
    success: function(result){
        processData(result);
    }
    });
});

var data = [];


function processData(allText) {
    var lines = allText.split(/\r\n|\n/);
    var lb = "---"
    for (var i=0; i< lines.length; i++) {
        var line = lines[i];
        if(line.slice(0, lb.length) == lb) {
            var t = [];
            
            for(var j = i + 1; j < lines.length; j++){
                if(lines[j][0] == "W" || lines[j] == "Meat first call-----") {
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
    console.log(data);
}   


/*************************************
Trying to organize the data into JSON
**************************************/
var d = -1;
var waveStrats = [];

waveStrats.push({
    len: 2,
    strats: [ 
        { 
            type: "all",
            spawnWave: [
                {
                    start: 0,
                    code: [1, 1],
                }
            ],
            spacing: [d, d], 
            eta: 30 
        } 
    ],
    
});

waveStrats.push({
    len: 3,
    strats: [ 
        { 
            type: "all",
            spawnWave: [
                {
                    start: 0,
                    code: [1, 1, 2],
                }
            ],
            spacing: [d, d, 21], 
            eta: 36 
        } 
    ],
    
});

waveStrats.push({
    len: 3,
    strats: [ 
        { 
            type: "all",
            spawnWave: [
                {
                    start: 0,
                    code: [1, 6, 2],
                }
            ],
            spacing: [d, d, d], 
            eta: 48
        } 
    ],
    
});

waveStrats.push({
    len: 4,
    strats: [ 
        { 
            type: "all",
            spawnWave: [
                {
                    start: 0,
                    code: [1, 4, 3],
                },
                {
                    start: 36,
                    code: [0, 0, 0, 7],
                }
            ],
            spacing: [d, d, d, d], 
            eta: 48
        } 
    ],
    
});

waveStrats.push({
    len: 5,
    strats: [ 
        { 
            type: "all",
            spawnWave: [
                {
                    start: 0,
                    code: [1, 3, 2, 2],
                },
                {
                    start: 42,
                    code: [0, 0, 0, 0, 7],
                }
            ],
            spacing: [d, 18, d, 27, d], 
            eta: 60
        },
        { 
            type: "w-t",
            spawnWave: [
                {
                    start: 0,
                    code: [2, 3, 2, 2],
                },
                {
                    start: 42,
                    code: [0, 0, 0, 1, 9],
                }
            ],
            spacing: [d, 18, 21, d, d], 
            eta: 54,
            note: "Destroy 1 Meat and take a Tofu"
        },
        { 
            type: "t-w",
            spawnWave: [
                {
                    start: 0,
                    code: [2, 5, 2, 1],
                },
                {
                    start: 42,
                    code: [0, 0, 0, 2, 7],
                }
            ],
            spacing: [d, d, 21, d, d], 
            eta: 54,
            note: "Destroy 1 Meat and take a Tofu"
        } 
    ],
    
});