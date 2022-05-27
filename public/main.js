//Theme changing script
var icon = document.getElementById("btn-theme-change");
var classList = document.body.classList;
localStorage.setItem("currentTheme", localStorage.getItem("currentTheme"));

icon.onclick = function () {
    classList.toggle("light-theme");
    if (classList.contains("light-theme")) {
        icon.src = "images/moon.png"; //light theme is on show moon icon
        localStorage.setItem("currentTheme", "light");
    } else {
        icon.src = "images/sun.png"; //dark theme is on show sun icon
        localStorage.setItem("currentTheme", "dark");
    }
}
document.body.onload = function () {
    if (localStorage.getItem("currentTheme") === "dark") {
        classList.remove("light-theme");
        icon.src = "images/sun.png";
    }
    if (localStorage.getItem("currentTheme") === "light") {
        classList.add("light-theme");
        icon.src = "images/moon.png";
    }
}

//For copy the Want Amount on clipboard
function copyWantAmount() {
    var copyText = document.getElementById("wantAmountId");
    copyText.select();
    // copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
}

//To keep Updated select options
var tempValue = null;
var valueArray = document.getElementsByTagName("option");
var arrayLength = valueArray.length;

for (let i = 0; i < arrayLength; i++) {
    tempValue = valueArray[i].value;
    if (i < (arrayLength / 2)) {
        if (tempValue === haveVar) {
            valueArray[i].selected = 'selected';
        }
    } else {
        if (tempValue === wantVar) {
            valueArray[i].selected = 'selected';
        }
    }
}

function flipCurrencies() {
    var list_1Selected = null;
    var list_2Selected = null;

    for (let i = 0; i < arrayLength; i++) {
        if (i < (arrayLength / 2)) {
            if (valueArray[i].selected === true) {
                list_1Selected = i;
                valueArray[i].selected = false;
            }
        } else {
            if (valueArray[i].selected === true) {
                list_2Selected = i;
                valueArray[i].selected = false;
            }
        }
    }
    document.getElementById("haveId").selectedIndex = (list_2Selected - (arrayLength / 2));
    document.getElementById("wantId").selectedIndex = list_1Selected;
}