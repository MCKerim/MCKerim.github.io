//Logo border fade animation
/*logoImgFadeOut();

function logoImgFadeIn() {
    let logo = document.getElementById("logoImg");
    logo.className += " active";
    setTimeout(logoImgFadeOut, 1250);
}

function logoImgFadeOut(){
    let logo = document.getElementById("logoImg");
    logo.className = logo.className.replace(" active", "");
    setTimeout(logoImgFadeIn, 1250);
}*/

//Copyright year updater
let date = new Date();
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
const jobText = document.getElementById("jobText");
const targetTextArr = ["Web-Designer.", "Web-Developer. ",  "Programmer.", "Programmer;", "Developer.", "Game-Developer", "Game-Designer.", "UI/UX-Designer", "console.log(" + '"' + "Hello World!" + '"' + ");"];
let targetText = "";
let randomNumber = 0;
let lastRandomNumber = 0;

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

const thing = document.getElementById("blink");
let blink = true;
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
const burger = document.getElementById("burger");
const navBar = document.getElementById("navBar");
const blackOverlay = document.getElementById("blackOverlay");
const navBarItems = document.querySelectorAll('.navBar .navBarItem');

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

let targetTop;
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
const projectsPictures = document.getElementById("Projects_Pictures");
const projectsList = projectsPictures.children;
let lastButton;
const selectedOnStart = document.getElementById("selectedOnStart");

showProjects(selectedOnStart, "Proudest");
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

    for (const element of projectsList) {
        let currentTags = element.getElementsByClassName("tags")[0].innerHTML;

        if(currentTags.match(tag) || (tag === "ShowAll" && !currentTags.match("DontShowOnAll")))
        {
            element.classList.remove("makeInvis");
        }
        else
        {
            element.classList.add("makeInvis");
        }
    }
}

const darkModeIcon = document.getElementById("darkModeIcon");
const lightModeIcon = document.getElementById("lightModeIcon");

function toggleDarkMode(toggle){
    let r = document.querySelector(':root');
    if(toggle.checked)
    {
        // Dark mode
        r.style.setProperty('--main-color', '#777161'); // Text usw
        r.style.setProperty('--second-color', '#1b1811'); // Background
        r.style.setProperty('--accent-color', '#DB534D');
        r.style.setProperty('--link-active-color', '#FF7973');

        // Change dark mode icon visible to hidden
        darkModeIcon.style.visibility = "hidden";
        lightModeIcon.style.visibility = "visible";
    }
    else
    {
        // Light mode
        r.style.setProperty('--main-color', '#1b1811');
        r.style.setProperty('--second-color', '#edece6');
        r.style.setProperty('--accent-color', '#ff6961');
        r.style.setProperty('--link-active-color', '#ffa19a');

        // Change light mode icon visible to hidden
        lightModeIcon.style.visibility = "hidden";
        darkModeIcon.style.visibility = "visible";
    }
}