// Slideshows
var slideIndex = 1;

function plusDivs(n) {
  slideIndex = slideIndex + n;
  showDivs(slideIndex);
}

function showDivs(n) {
  var x = document.getElementsByClassName("processingSlides");
  if (n > x.length) {slideIndex = 1}    
    if (n < 1) {slideIndex = x.length} ;
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[slideIndex-1].style.display = "block";  
}

// Opening Platforms (Unity, Unreal, etc)
function openPlatform(evt, platformName) {
  hidePlatforms();
  document.getElementById(platformName).style.display = "block";
  evt.currentTarget.className += " w3-black";
}

function hidePlatforms() {
  var platforms = document.getElementsByClassName("platform");
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].style.display = "none";
  }
}