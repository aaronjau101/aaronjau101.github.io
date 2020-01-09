function getExpDiff(level) {
  let a = level - 1;
  let b = a / 7;
  let c = Math.pow(2, b);
  let d = 300 * c;
  let e = Math.floor(a + d);
  return e / 4;
}

function getExp(level) {
  if(level < 2) return 0;
  var total = 0;
  for(var i = 2; i <= level; i++) {
    total += getExpDiff(i);
  }
  return total;
}

function getLevel(exp) {
  var maxLevel = 126;
  for(var level = 2; level <= maxLevel; level++) {
      if(getExp(level) > exp) {
          return level - 1;
      }
  }
  return maxLevel;
}

function remainingExp(exp, targetLevel) {
  var targetExp = getExp(targetLevel);
  if(exp > targetExp) { return 0; }
  return Math.floor(targetExp - exp);
}

function getActions(epa, exp) {
  return Math.ceil(exp/epa);
}

function getCost(cpa, actions) {
  return cpa * actions;
}

function checkResult() {
    let convert = document.getElementById("startExp").checked;
    let start = document.getElementById("startInput").value;
    let currentLvl = convert  ? getLevel(start) : start;
    let currentExp = !convert ? getExp(start)   : start;
    let targetLvl = document.getElementById("lvlInput").value;
    let targetExp = getExp(targetLvl);
    let expNeeded = remainingExp(currentExp, targetLvl);
    let epa = document.getElementById("epaInput").value;
    let actionsNeeded = getActions(epa, expNeeded);
    let cpa = document.getElementById("cpaInput").value;
    let costNeeded = getCost(cpa, actionsNeeded);
    var result = "Your current level is: " + String(currentLvl);
    result += "<br><br>";
    result += "Your current experience is: " + numberWithCommas(Math.floor(currentExp));
    result += "<br><br>";
    result += "Your target level is: " + String(targetLvl);
    result += "<br><br>";
    result += "Your target experience is: " + numberWithCommas(targetExp);
    result += "<br><br>";
    result += "You need ";
    result += numberWithCommas(expNeeded);
    result += " more experience to reach target level";
    result += "<br><br>";
    result += "It will take ";
    result += numberWithCommas(actionsNeeded);
    result += " actions";
    result += "<br><br>";
    result += "Which will cost you ";
    result += numberWithCommas(costNeeded);
    result += " gp";
    document.getElementById("result").innerHTML = result;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}