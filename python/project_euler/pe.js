$().ready(function(){
    $.ajax({url: "problems.txt", 
    success: function(data){
        processData(data);
    }
    });
});

var index = 0;
var problems = [];

function processData(allText) {
    var lines = allText.split(/\r\n|\n/);
    var start = "Problem ";
    
    for (var i=0; i< lines.length; i++) {
        var line = lines[i];
        if(line.slice(0, start.length) == start) {
            var s = line.slice(start.length, line.length);
            var n = parseInt(s);
            
            var problem = "";
            for(var j = i + 1; j < lines.length; j++){
                if(lines[j][0] == "-") {
                    break;
                }
                problem += lines[j] + "<br>";
            }
            
            problems.push({id: n, text: problem});
        }
    }
}   

function changeIndex(value){
    if(index + value >= 0 && index + value < problems.length) {
        index += value; 
        updateProblem();
    }
}

function changeText(){
    var result = "";
    result += "<h2 class='w3-text-light-grey'>Problem ";
    result += problems[index].id;
    result += "</h2><p>";
    result += problems[index].text;
    result += "</p>"
    document.getElementById("textDiv").innerHTML = result;
}

function changeFrame(){
    let id = problems[index].id;
    // Create an iframe, append it to this document where specified
    var gistFrame = document.createElement("iframe");
    gistFrame.setAttribute("width", "100%");
    gistFrame.id = "gistFrame";

    var zone = document.getElementById("gistDiv");
    zone.innerHTML = "";
    zone.appendChild(gistFrame);

    // Create the iframe's document
    var gistFrameHTML = '<html><body onload="parent.adjustIframeSize(document.body.scrollHeight)"><scr' + 'ipt type="text/javascript" src="https://gist.github.com/aaronjau101/bb0e4c28e0177d3815783041f8993b91.js?file=problem' + id + '.py"></sc'+'ript></body></html>';

    // Set iframe's document with a trigger for this document to adjust the height
    var gistFrameDoc = gistFrame.document;

    if (gistFrame.contentDocument) {
        gistFrameDoc = gistFrame.contentDocument;
    } else if (gistFrame.contentWindow) {
        gistFrameDoc = gistFrame.contentWindow.document;
    }

    gistFrameDoc.open();
    gistFrameDoc.writeln(gistFrameHTML);
    gistFrameDoc.close();		
}

function updateProblem() {
    changeText();
    changeFrame();
}

//setTimeout(updateProblem, 100)
	
function adjustIframeSize(newHeight) {
    var i = document.getElementById("gistFrame");
    i.style.height = parseInt(newHeight) + "px";
}