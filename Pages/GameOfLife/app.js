
var gameFieldCanvas = document.getElementById("gameField");
var ctx = gameFieldCanvas.getContext("2d");

var gridSize = 600;
gameFieldCanvas.height = gridSize;
gameFieldCanvas.width = gridSize;

const FRAMES_PER_SECOND = 4;
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
var lastFrameTime = 0;


let fieldX = gameFieldCanvas.width/20;
let fieldY = gameFieldCanvas.height/20;

let arraySize = fieldX * fieldY;
var field = [arraySize];

for(let i=0; i < arraySize; i++)
{
    field[i] = {currState: 0, lastState: 0};
}

if((60 / FRAMES_PER_SECOND) % 1 === 0)
{
    console.log("Alles gut");
}
else
{
    console.log("ERROR: Wrong FPS.");
}

var startButton = document.getElementById("startButton");
var autoPlayIsOn = false;
function startAutoPlay()
{
    if(autoPlayIsOn)
    {
        startButton.innerHTML = "Play";
        autoPlayIsOn = false;
    }
    else
    {
        startButton.innerHTML = "Pause";
        autoPlayIsOn = true;
        gameLoop();
    }
}

function reset()
{
    for(let i=0; i < arraySize; i++)
    {
        field[i].currState = 0;
        field[i].lastState = 0;
    }

    startButton.innerHTML = "Play";
    autoPlayIsOn = false;

    ctx.clearRect(0, 0,gameFieldCanvas.width, gameFieldCanvas.height);
}

function gameLoop(time)
{
    if(time-lastFrameTime < FRAME_MIN_TIME)
    { 
        requestAnimationFrame(gameLoop);
        return; 
    }
    lastFrameTime = time;
    //***********************************/
    //ctx.clearRect(0, 0,gameFieldCanvas.width, gameFieldCanvas.height);

    calcRound();
    updateLastState();
    //drawField();

    if(autoPlayIsOn)
    {
        window.requestAnimationFrame(gameLoop);
    }
}

function updateLastState()
{
    for(let y=0; y < fieldY; y++)
    {
       for(let x=0; x < fieldX; x++)
       {
           let currField = y*fieldX + x;
           field[currField].lastState = field[currField].currState;
       }
    }
}

function calcRound()
{
    /*RULES
        1. alive und 2-3 nachbarn = übelebe
        2. tot und 3 lebende nachbarn = werd lebend
        3. sonst stirb
    */

    for(let y=0; y < fieldY; y++)
    {
       for(let x=0; x < fieldX; x++)
       {
           let currField = y*fieldX + x;

           //Count Neighbours
           let neighbours = 0;
           if(y < fieldY-1)
           {
                neighbours += field[(y+1)*fieldX + x].lastState;
           }
           if(y > 0)
           {
                neighbours += field[(y-1)*fieldX + x].lastState;
           }
           if(x < fieldX-1)
           {
                neighbours += field[y*fieldX + (x+1)].lastState;
           }
           if(x > 0)
           {
                neighbours += field[y*fieldX + (x-1)].lastState;
           }
           if(y < fieldY-1 && x < fieldX-1)
           {
                neighbours += field[(y+1)*fieldX + (x+1)].lastState;
           }
           if(y > 0 && x < fieldX-1)
           {
                neighbours += field[(y-1)*fieldX + (x+1)].lastState;
           }
           if(y < fieldY-1 && x > 0)
           {
                neighbours += field[(y+1)*fieldX + (x-1)].lastState;
           }
           if(y > 0 && x > 0)
           {
                neighbours += field[(y-1)*fieldX + (x-1)].lastState;
           }
           
           //Rules
           if(field[currField].currState === 1)
           {
                if(neighbours !== 2 && neighbours !== 3)
                {
                    field[currField].currState = 0;
                }
           }
           else
           {
                if(neighbours === 3)
                {
                    field[currField].currState = 1;
                }
           }

           //Draw Cell
           if(field[y*fieldX + x].currState === 1)
            {
                ctx.fillStyle = "#edece6";
                ctx.beginPath();
                ctx.rect(x*20, y*20, 10*2, 10*2);
                ctx.fill();
            }
            else
            {
                ctx.fillStyle = "#1b1811";
                ctx.beginPath();
                ctx.rect(x*20, y*20, 10*2, 10*2);
                ctx.fill();
            }
       }
    }
}

function drawField()
{
    for(let y=0; y < fieldY; y++)
    {
        for(let x=0; x < fieldX; x++)
        {
            if(field[y*fieldX + x].currState === 1)
            {
                ctx.fillStyle = "#edece6";
                ctx.beginPath();
                ctx.rect(x*20, y*20, 10*2, 10*2);
                ctx.fill();
            }
            else
            {
                ctx.fillStyle = "#1b1811";
                ctx.beginPath();
                ctx.rect(x*20, y*20, 10*2, 10*2);
                ctx.fill();
            }
        }
    }
}

function getMousePos(gameFieldCanvas, evt) {
    var rect = gameFieldCanvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
}

gameFieldCanvas.addEventListener('click', function(evt) {
    var mousePos = getMousePos(gameFieldCanvas, evt);

    //console.log('Mouse position: ' + mousePos.x + ',' + mousePos.y);
    let posX = Math.floor(mousePos.x/20);
    let posY = Math.floor(mousePos.y/20);

    //console.log(posX + 25 * posY);

    console.log(field[posX + fieldX * posY].currState === 0);
    if(field[posX + fieldY * posY].currState === 0)
    {
        console.log("white");
        field[posX + fieldX * posY].currState = 1;
        field[posX + fieldX * posY].lastState = 1;

        ctx.fillStyle = "#edece6";
        ctx.beginPath();
        ctx.rect(posX*20, posY*20, 10*2, 10*2);
        ctx.fill();
    }
    else
    {
        field[posX + fieldX * posY].currState = 0;
        field[posX + fieldX * posY].lastState = 0;

        ctx.fillStyle = "#1b1811";
        ctx.beginPath();
        ctx.rect(posX*20, posY*20, 10*2, 10*2);
        ctx.fill();
    }
}, false);