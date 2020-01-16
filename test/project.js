// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
	toggle("navSmall");
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

function hideTags() {
    hideElement(document.getElementById("tags"));
    hideElement(document.getElementById("currentTag"));
    let elements = document.getElementsByClassName("project");
    for(var elem of elements) {
        showElement(elem);
    }
}

function openTaggedProjects(tag) {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    let elements = document.getElementsByClassName("project");
    for(var elem of elements) {
        let tags = elem.getAttribute("data-tags");
        if(tags != null && tags.split(" ").indexOf(tag) != -1)
            showElement(elem);
        else
            hideElement(elem);
    }
    let currentTagText = document.getElementById("currentTagText");
    currentTagText.innerHTML = tag;
    showElement(document.getElementById("currentTag"));
}