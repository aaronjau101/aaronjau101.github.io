//Hide an element
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

//Hide the tags for projects
function seeAll() {
    let elements = document.getElementsByClassName("project");
    for(var elem of elements) {
        showElement(elem);
    }
}

//Display all projects with a certain tag
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
}