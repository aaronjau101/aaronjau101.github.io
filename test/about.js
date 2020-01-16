// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
	toggle("navSmall");
}

//Open accordion panels when aaccordion clicked
var acc = document.getElementsByClassName("accordion");
console.log(acc.length)
for (var i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


// Toggle an element to show or hide
function toggle(id) {
    let element = document.getElementById(id);
    if (element.className.indexOf("w3-show") == -1) {
        element.className += " w3-show";
    } else { 
        element.className = element.className.replace(" w3-show", "");
    }
}

// Hide an element
function hide(id) {
    let element = document.getElementById(id);
    if (element.className.indexOf("w3-show") != -1) {
        element.className = element.className.replace(" w3-show", "");
    }
}


// Open the correct story
function openStory(length) {
    if(length == "long") {
        toggle("lifeStory");
        hide("tldr");
    }else if(length == "short"){
        hide("lifeStory");
        toggle("tldr");
    }
}

// Add click event to the story buttons for being active
var btnContainer = document.getElementById("storyButtons");
var btns = btnContainer.getElementsByClassName("sb");

for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", function() {
    if (this.className.indexOf("sbActive") != -1) {
        console.log("current button is active")
        this.className = this.className.replace(" sbActive", "");
    }else{
        console.log("current button is not active")
        var current = document.getElementsByClassName("sbActive");
        if(current.length > 0) {
            current[0].className = current[0].className.replace(" sbActive", "");
        }
        this.className += " sbActive";
    }
  });
}

//Re-align text when resizing
$(window).on('resize', function() {
    if($(window).width() > 600) {
        $('.aboutTextRight').addClass('w3-margin-left');
        $('.aboutTextLeft').addClass('w3-margin-right');
    }else{
        $('.aboutTextRight').removeClass('w3-margin-left');
        $('.aboutTextLeft').removeClass('w3-margin-right');
    }
})
//Align text based on screen size at start
$(document).ready(function() {
    if($(window).width() > 600) {
        $('.aboutTextRight').addClass('w3-margin-left');
        $('.aboutTextLeft').addClass('w3-margin-right');
    }else{
        $('.aboutTextRight').removeClass('w3-margin-left');
        $('.aboutTextLeft').removeClass('w3-margin-right');
    }
})