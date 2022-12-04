//Logo border fade animation
logoImgFadeOut();

function logoImgFadeIn() {
    let logo = document.getElementById("logoImg");
    logo.className += " active";
    setTimeout(logoImgFadeOut, 1250);
}

function logoImgFadeOut(){
    let logo = document.getElementById("logoImg");
    logo.className = logo.className.replace(" active", "");
    setTimeout(logoImgFadeIn, 1250);
}

//Copyright year updater
var date = new Date();
document.getElementById("copyrightYear").innerHTML = date.getFullYear();

//Age updater
updateAge("age", 2000, 8, 12);
function updateAge(id, year, month, day)
{
    let date = new Date();
    let birthday = new Date(year, month-1, day);

    let age = date.getFullYear() - birthday.getFullYear();
    if(date.getMonth() < birthday.getMonth())
    {
        age--;
    }
    else if(date.getMonth() === birthday.getMonth() && date.getDate() < birthday.getDate())
    {
        age--;
    }

    !(age > 0) ? console.log("ERROR: cannot calculate age.") : document.getElementById(id).innerHTML = age;
}

//Job text writing animation
var jobText = document.getElementById("jobText");
const targetTextArr = ["Web-Designer.", "Web-Developer. ",  "Programmer.", "Programmer;", "Developer.", "Game-Developer", "Game-Designer.", "UI/UX-Designer", "console.log(" + '"' + "Hello World!" + '"' + ");"];
var targetText = "";
var randomNumber = 0;
var lastRandomNumber = 0;

setTimeout(() =>{changeText()}, 4000);
function changeText(){
    do{
        randomNumber = Math.floor(Math.random() * targetTextArr.length);
    }while(randomNumber === lastRandomNumber)

    lastRandomNumber = randomNumber;
    targetText = targetTextArr[randomNumber];
    addChar(jobText, targetText, 0);
}

function addChar(currentText, targetText="", number=0){
    blink = false;
    if(currentText.innerHTML.length === targetText.length)
    {
        setTimeout(() =>{blink = true}, 150);
        setTimeout(() =>{removeChar(currentText)}, 2000);
    }
    else if(currentText.innerHTML.length === 0 || currentText.innerHTML.length === 1)
    {
        currentText.innerHTML += targetText[number];
        setTimeout(()=>{addChar(currentText, targetText, number+1)}, 350);
    }
    else
    {
        currentText.innerHTML += targetText[number];
        setTimeout(()=>{addChar(currentText, targetText, number+1)}, Math.floor(Math.random() * 150 + 75));
    }
}

function removeChar(currentText)
{
    blink = false;
    if(currentText.innerHTML.length === 1)
    {
        currentText.innerHTML = currentText.innerHTML.substring(0, currentText.innerHTML.length-1);
        setTimeout(() =>{blink = true}, 150);
        setTimeout(() =>{changeText()}, 1500);
    }
    else if(currentText.innerHTML.length === 2)
    {
        currentText.innerHTML = currentText.innerHTML.substring(0, currentText.innerHTML.length-1);
        setTimeout(()=>{removeChar(currentText)}, 250);
    }else if(currentText.innerHTML.length === 3)
    {
        currentText.innerHTML = currentText.innerHTML.substring(0, currentText.innerHTML.length-1);
        setTimeout(()=>{removeChar(currentText)}, 150);
    }
    else
    {
        currentText.innerHTML = currentText.innerHTML.substring(0, currentText.innerHTML.length-1);
        setTimeout(()=>{removeChar(currentText)}, 50);
    }
}

var thing = document.getElementById("blink");
var blink = true;
updateBlinker();
function updateBlinker()
{
    if(!blink)
    {
        thing.innerHTML = "|";
        setTimeout(()=>{updateBlinker()}, 10);
    }
    else if(thing.innerHTML === "|")
    {
        thing.innerHTML = "";
        setTimeout(()=>{updateBlinker()}, 500);
    }
    else
    {
        thing.innerHTML = "|";
        setTimeout(()=>{updateBlinker()}, 500);
    }
}

//Navigation bar
var burger = document.getElementById("burger");
var navBar = document.getElementById("navBar");
var blackOverlay = document.getElementById("blackOverlay");
var navBarItems = document.querySelectorAll('.navBar .navBarItem');

burger.addEventListener("touchstart", () => {
    navBar.classList.toggle("navBarActive");
    burger.classList.toggle("toggle");
    blackOverlay.classList.toggle("blackOverlayShow");
});

navBarItems.forEach((Item, index) => {
    Item.addEventListener("click", () => {
        navBar.classList.remove("navBarActive");
        burger.classList.remove("toggle");
        blackOverlay.classList.remove("blackOverlayShow");
    })
});

blackOverlay.addEventListener("click", () => {
    navBar.classList.remove("navBarActive");
    burger.classList.remove("toggle");
    blackOverlay.classList.remove("blackOverlayShow");
});

var targetTop;
function scrollHome(targetId)
{
    if(targetId != null)
    {
        targetTop = document.getElementById(targetId).offsetTop - 60;
    }
    else
    {
        targetTop = 0;
    }
    
    window.scrollTo({
        top: targetTop,
        left: 0,
        behavior: "smooth"
    });
}

//Projects filter buttons
var projectsPictures = document.getElementById("Projects_Pictures");
var projectsList = projectsPictures.children;
var lastButton;
var selectedOnStart = document.getElementById("selectedOnStart");

showProjects(selectedOnStart, "ShowAll");
function showProjects(button, tag)
{  
    if(lastButton === undefined)
    {
        lastButton = button;
    }
    else
    {
        lastButton.classList.remove("pressed");
        lastButton = button;
    }
    button.classList.add("pressed");

    for (let i = 0; i < projectsList.length; i++) {
        let currentTags = projectsList[i].getElementsByClassName("tags")[0].innerHTML;

        if(currentTags.match(tag) || (tag === "ShowAll" && !currentTags.match("DontShowOnAll")))
        {
            projectsList[i].classList.remove("makeInvis");
        }
        else
        {
            projectsList[i].classList.add("makeInvis");
        }
    }
}

function toggleDarkMode(toggle){
    var r = document.querySelector(':root');
    if(toggle.checked)
    {
        r.style.setProperty('--main-color', '#969696');
        r.style.setProperty('--second-color', '#1d1d1d');
        r.style.setProperty('--accent-color', '#ffffff');
        r.style.setProperty('--link-active-color', '#ffffff');
    }
    else{
        r.style.setProperty('--main-color', '#1b1811');
        r.style.setProperty('--second-color', '#edece6');
        r.style.setProperty('--accent-color', '#ff6961');
        r.style.setProperty('--link-active-color', '#ffa19a');
    }
}