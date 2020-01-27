//Open accordion panels when aaccordion clicked
var acc = document.getElementsByClassName("accordion");
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

// Hide an element
function hide(id) {
    let element = document.getElementById(id);
    if (element.className.indexOf("w3-show") != -1) {
        element.className = element.className.replace(" w3-show", "");
    }
}