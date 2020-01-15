// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
	var x = document.getElementById("navSmall");
	if (x.className.indexOf("w3-show") == -1) {
		x.className += " w3-show";
	} else { 
		x.className = x.className.replace(" w3-show", "");
	}
}

//Re-align text on small screen
$(window).on('resize', function() {
    if($(window).width() > 600) {
        $('.aboutTextRight').addClass('w3-margin-left');
        $('.aboutTextLeft').addClass('w3-margin-right');
    }else{
        $('.aboutTextRight').removeClass('w3-margin-left');
        $('.aboutTextLeft').removeClass('w3-margin-right');
    }
})
$(document).ready(function() {
    if($(window).width() > 600) {
        $('.aboutTextRight').addClass('w3-margin-left');
        $('.aboutTextLeft').addClass('w3-margin-right');
    }else{
        $('.aboutTextRight').removeClass('w3-margin-left');
        $('.aboutTextLeft').removeClass('w3-margin-right');
    }
})

var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    console.log("click")
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}

$(.accordion).on('click', function() {

    })