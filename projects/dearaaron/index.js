var questionInput = document.getElementById("question");
var answerInput = document.getElementById("response");
var resetButton = document.getElementById("myBtn");
var question = "";
var answer = "You are not worthy";
var prompt = "Dear Aaron";
var promptLong = "Dear Aaron, will you please answer this question:"
var index = 1;
var secret = false;
var answered = false;

function prompted() {
  return prompt == question.slice(0, prompt.length);
}

function reset() {
    question = "";
    answer = "You are not worthy";
    answerInput.innerHTML = "";
    index = 1;
    secret = false;
    answered = false;
    questionInput.innerHTML = question;
    resetButton.active = false;
}

function typing(e){
  var key = e.keyCode;
  var char = String.fromCharCode(key);
  //reset if answered
  if(answered) {
    reset();
  }
  //If question mark is pressed show answer
  else if(key == 63 && prompted()) {
    question += char;
    answerInput.innerHTML = "Aaron's response: " + answer;
    answered = true;
  }
  //If period is pressed
  else if(key == 46) {
    //If first char, then start secret
    if(question == "") {
      secret = true;
      answer = "";
      question = prompt.slice(0, index);
      index++;
    //If secret already started
    }else if(secret) {
      secret = false;
      question = promptLong.slice(0, index);
      index++;
    }
  //If we are in secret mode
  }else if (secret) {
    answer += char;
    question = promptLong.slice(0, index);
    index++;
  //Check if new line should be added
  }else if(key == 13) {
    question += "<br>";
  //Add to question
  }else{
    question += char;
  }

  questionInput.innerHTML = question;
}

function lineSize() {
  let s = question.length;
  for(var i = s - 1; i >= 3; i--) {
    if(question[i-3] == "<" && question[i-2] == "b" &&
      question[i-1] == "r" && question[i] == ">") {
      return s - i;
    }
  }
  return s;
}

function backspaced() {
  //if answered, reset answer but only delete "?""
  if(answered) {
    let temp = question.slice(0, question.length - 1)
    reset();
    question = temp;
  }else if(secret) {
    question = question.slice(0, question.length - 1);
    answer = answer.slice(0, answer.length - 1);
    index -= 1;
    if(index <= 1) {
      reset();
    }
  } else {
    if(lineSize() == 1) {
      question = question.slice(0, question.length - 4);
    }else{
      question = question.slice(0, question.length - 1);
    }
    if(question == "") {
      reset();
    }
  }  
  questionInput.innerHTML = question;
}

addEvent(document, "keypress", function (e) {
    e = e || window.event;
    typing(e);
});

addEvent(document, "keydown", function (e) {
    e = e || window.event;
    if(e.keyCode == 8) {
      backspaced();  
    }
});

function addEvent(element, eventName, callback) {
    if (element.addEventListener) {
        element.addEventListener(eventName, callback, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + eventName, callback);
    } else {
        element["on" + eventName] = callback;
    }
}

function hideSpoiler() {
  for(var spoiler of document.getElementsByClassName("spoiler")) {
    spoiler.className += " w3-hide";
  }
}