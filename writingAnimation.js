
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