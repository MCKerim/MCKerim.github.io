
var gameFieldCanvas = document.getElementById("gameField");
var ctx = gameFieldCanvas.getContext("2d");
gameFieldCanvas.height = 500;
gameFieldCanvas.width = 500;

var snakeSettingsList = document.getElementById("snakeSettingsList");

function addSnakeButtonPressed()
{
    if(snakes.length < keyPrefabs.length && !gameIsRunning)
    {
        var newSnake = new Snake(snakes.length,colorPrefabs[snakes.length][0], colorPrefabs[snakes.length][1]);
        newSnake.changeInputKeys(keyPrefabs[snakes.length][0], keyPrefabs[snakes.length][1], keyPrefabs[snakes.length][2], keyPrefabs[snakes.length][3]);
        snakes.push(newSnake);

        let liElement = document.createElement("li");
        liElement.classList.add("snakeSettingsUi");
        liElement.id = snakes.length;

        let pElement1 = document.createElement("p");
        let textElement1 = document.createTextNode("Snake " + snakes.length);
        pElement1.appendChild(textElement1);

        let pElement2 = document.createElement("p");
        let textElement2 = document.createTextNode("Left: "+
        keyPrefabsInChar[snakes.length-1][0] + ", Right: " + keyPrefabsInChar[snakes.length-1][1] +", Up: "+ keyPrefabsInChar[snakes.length-1][2] +
         ", Down: " + keyPrefabsInChar[snakes.length-1][3]);
        pElement2.appendChild(textElement2);

        let pElement3 = document.createElement("p");
        let textElement3 = document.createTextNode("Score: 0 Highscore: 0");
        pElement3.classList.add("scoreText");
        pElement3.appendChild(textElement3);


        liElement.appendChild(pElement1);
        liElement.appendChild(pElement2);
        liElement.appendChild(pElement3);

        snakeSettingsList.appendChild(liElement);

        /*snakeSettingsList.innerHTML += "<li class='snakeSettingsUi' id='" + snakes.length + "' onClick='changeSetting(this)'>Snake " + snakes.length +"<p> Left: "+
         keyPrefabsInChar[snakes.length-1][0] + ", Right: " + keyPrefabsInChar[snakes.length-1][1] +", Up: "+ keyPrefabsInChar[snakes.length-1][2] +
          ", Down: " + keyPrefabsInChar[snakes.length-1][3] +"<p><p class='scoreText'>Score: 0 Highscore: 0<p></li>";
          */
        snakeSettingsList.lastChild.style.color = colorPrefabs[snakes.length-1][1];
    }
}

var keyPrefabs = [
    [65, 68, 87, 83],//wasd
    [37, 39, 38, 40],//arrow keys
    [72, 75, 85, 74],//ijkl
    [192, 191, 186, 222]
];

var keyPrefabsInChar = [
    ["A", "D", "W", "S"],//wasd
    ["←", "→", "↑", "↓"],//arrow keys
    ["H", "K", "U", "J"],//ijkl
    ["Ö", "#", "Ü", "Ä"]
];

var colorPrefabs = [
    ["rgb(202, 82, 75)", "rgb(255,105,97)"], //red
    ["rgb(60, 60, 255)", "rgb(100, 100, 255)"], //blue 
    ["#c4c3be", "#edece6"], // white
    ["#CD4813", "#EB5E28"] //orange
];

function changeSetting(e)
{
    console.log("hello");
}

var animIsplaying = false;
function removeSnakeButtonPressed()
{
    if(snakes.length > 1 && !animIsplaying && !gameIsRunning)
    {
        snakes.pop();
        let last = snakeSettingsList.lastChild;
        last.classList.add("removeAnim");
        animIsplaying = true;
        last.addEventListener("animationend", () => {
            animIsplaying = false;
            last.remove();
        });

        last.addEventListener("webkitAnimationEnd", () => {
            animIsplaying = false;
            last.remove();
        });
    }
}

var snakes = [];
//var snake1 = new Snake("rgb(255,60, 60)", "rgb(255,105,97)");
//snakes.push(snake1);
var snakeSettingsUi = [];

function Snake(personalId, newColor, newBodyColor)
{   
    this.personalId = personalId;
    this.color = newColor;
    this.bodyColor = newBodyColor;
    this.r = 10;
    let highscore = 0;

    this.pos = {
        x: 20 * Math.floor(Math.random() * (24 + 1)) + 10,
        y: 20 * Math.floor(Math.random() * (24 + 1)) + 10
    };

    this.dir = {
        x: 0,
        y: 0
    };

    this.leftKey = 65;
    this.rightKey = 68;
    this.upKey = 87;
    this.downKey = 83;

    this.isMoving = true;

    this.update = function()
    {
        if(this.isMoving === true)
        {   
            this.moveBody();
            this.move();
        }
        this.checkForCollisions();
        this.checkForFood();
        this.draw();
    };

    this.draw = function()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.pos.x - this.r, this.pos.y - this.r, this.r*2, this.r*2);
        ctx.fill();
    };

    this.move = function()
    {
        this.pos.x += this.dir.x * this.r*2;
        this.pos.y += this.dir.y * this.r*2;
    };

    this.changeDir = function(newX, newY)
    {
        this.dir.x = newX;
        this.dir.y = newY;
    };

    this.checkForFood = function()
    {
        if(this.pos.x === food.pos.x && this.pos.y === food.pos.y)
        {
            food.newPos();
            var snakePart1 = new SnakePart(this.pos.x, this.pos.y, this.bodyColor);
            bodyParts.push(snakePart1);

            if(highscore < bodyParts.length)
            {
                highscore = bodyParts.length;
            }
            var nodes = snakeSettingsList.children;
            nodes[personalId].getElementsByClassName("scoreText")[0].innerHTML = "Score: " + bodyParts.length + " Highscore: " + highscore;
        }
    };

    var bodyParts = [];
    this.moveBody = function()
    {
        if(bodyParts.length != 0)
        {
            for(var i=bodyParts.length-1; i > 0; i--)
            {
                bodyParts[i].moveTo(bodyParts[i-1].pos.x, bodyParts[i-1].pos.y);
                bodyParts[i].draw();
            }
            bodyParts[i].moveTo(this.pos.x, this.pos.y);
            bodyParts[i].draw();
        }
    };

    this.getBodyParts = function()
    {
        return bodyParts;
    }

    this.checkForCollisions = function()
    {
        if(this.pos.x-this.r < 0 || this.pos.x+this.r > gameFieldCanvas.width || this.pos.y-this.r < 0 || this.pos.y+this.r > gameFieldCanvas.height)
        {
            this.die();
            return;
        }

        bodyParts.forEach(bodyPart => {
        if(this.pos.x === bodyPart.pos.x && this.pos.y === bodyPart.pos.y)
           {
                this.die();
                return;
            }
        });
        
        snakes.forEach(snakeToCheck => {
            if(snakeToCheck === this)
            {
                return;
            }
            let bodyPartsToCheck = snakeToCheck.getBodyParts();
            bodyPartsToCheck.forEach(bodyPartToCheck => {
                if(this.pos.x === bodyPartToCheck.pos.x && this.pos.y === bodyPartToCheck.pos.y)
                {
                    this.die();
                    return;
                }
            });
            if(this.pos.x === snakeToCheck.pos.x && this.pos.y === snakeToCheck.pos.y)
            {
                console.log("Snake hittet " + this.pos.x +" "+ snakeToCheck.pos.x);
                snakeToCheck.die();
                this.die();
                return;
            }
        });
    };

    this.die = function()
    {
        this.pos.x = 20 * Math.floor(Math.random() * (24 + 1)) + 10;
        this.pos.y = 20 * Math.floor(Math.random() * (24 + 1)) + 10;
        this.dir.x = 0;
        this.dir.y = 0;
        bodyParts = [];

        var nodes = snakeSettingsList.children;
        nodes[personalId].getElementsByClassName("scoreText")[0].innerHTML = "Score: " + bodyParts.length + " Highscore: " + highscore;
    };

    this.resetHighscore = function()
    {
        highscore = 0;
        var nodes = snakeSettingsList.children;
        nodes[personalId].getElementsByClassName("scoreText")[0].innerHTML = "Score: " + bodyParts.length + " Highscore: " + highscore;
    }

    this.getHighscore = function()
    {
        return highscore;
    }

    this.getPersonalId = function()
    {
        return this.personalId;
    }

    this.getColor = function()
    {
        return this.bodyColor;
    }

    this.changeDir = function(newKeyCode)
    {
        if(newKeyCode === this.leftKey && this.dir.x != 1)
        {
            this.dir.x = -1;
            this.dir.y = 0;
        }
        else if(newKeyCode === this.rightKey && this.dir.x != -1)
        {   
            this.dir.x = 1;
            this.dir.y = 0;
        }
        else if(newKeyCode === this.upKey && this.dir.y != 1)
        {
            this.dir.x = 0;
            this.dir.y = -1;
        }
        else if(newKeyCode === this.downKey && this.dir.y != -1)
        {
            this.dir.x = 0;
            this.dir.y = 1;
        }
    };

    this.changeInputKeys = function(newKeyLeft, newKeyRight, newKeyUp, newKeyDown)
    {
        this.leftKey = newKeyLeft;
        this.rightKey = newKeyRight;
        this.upKey = newKeyUp;
        this.downKey = newKeyDown;
    };
}

function SnakePart(posX, posY, newColor)
{
    this.pos = {
        x: posX,
        y: posY
    };
    
    this.r = 10;
    this.color = newColor;
    
    this.moveTo = function(newX, newY)
    {
        this.pos.x = newX;
        this.pos.y = newY;
    };

    this.draw = function()
    {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.rect(this.pos.x - this.r, this.pos.y - this.r, this.r*2, this.r*2);
        ctx.fill();
    };
}

this.window.onkeydown = function(key){
    
    if(!gameIsRunning){return;}
    //console.log(key.keyCode);
    snakes.forEach(snakeToCheck => {
        snakeToCheck.changeDir(key.keyCode);
    });
}

var food = new Food();
function Food()
{
    this.pos = {
        x: 10,
        y: 10
    };
    this.r = 10;

    this.update = function()
    {
        this.draw();
    }

    this.draw = function()
    {
        ctx.fillStyle = "rgb(100, 255, 100)";
        ctx.beginPath();
        ctx.rect(this.pos.x - this.r, this.pos.y - this.r, this.r*2, this.r*2);
        ctx.fill();
    }

    this.newPos = function()
    {//zwanziger steps
        var validPosFound = false;
        while(!validPosFound){
            validPosFound = true;
            this.pos.x = 20 * Math.floor(Math.random() * (24 + 1)) + 10;
            this.pos.y = 20 * Math.floor(Math.random() * (24 + 1)) + 10;

            snakes.forEach(snakeToCheck => {
                var bodyPartsToCheck = snakeToCheck.getBodyParts();
                bodyPartsToCheck.forEach(bodyPartToCheck => {
                    if(this.pos.x === bodyPartToCheck.pos.x && this.pos.y === bodyPartToCheck.pos.y)
                    {
                        validPosFound = false;
                        return;
                    }
                });
                if(this.pos.x === snakeToCheck.pos.x && this.pos.y === snakeToCheck.pos.y)
                {
                    validPosFound = false;
                    return;
                }
            });
        }
    }
    this.newPos();
}

const FRAMES_PER_SECOND = 10;  
const FRAME_MIN_TIME = (1000/60) * (60 / FRAMES_PER_SECOND) - (1000/60) * 0.5;
var lastFrameTime = 0;

if((60 / FRAMES_PER_SECOND) % 1 === 0)
{
    console.log("Alles gut");
}
else
{
    console.log("ERROR: Wrog FPS.");
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
    ctx.clearRect(0, 0,gameFieldCanvas.width, gameFieldCanvas.height);

    snakes.forEach(snake => {
        snake.update();
    });

    if(gameIsRunning)
    {
        updateTimer();
    }

    food.update();
    window.requestAnimationFrame(gameLoop);
}
addSnakeButtonPressed();
gameLoop();

var timerText = document.getElementById("timer");
var oneRoundTime = 30000;
var endTime;
function startTimer()
{
    endTime = new Date().getTime() + oneRoundTime;
    timerText.innerHTML = Math.floor(oneRoundTime/1000);
}

function updateTimer()
{
    var currentTime = new Date().getTime();
    var distance = (endTime - currentTime) / 1000;

    if(distance >= 0)
    {
        let temp = Math.floor(distance * 100) - Math.floor(distance)*100;
        if(temp < 10)
        {
            temp = "0" + temp;
        }
        else if(temp < 1)
        {
            temp = "00";
        }
        timerText.innerHTML = Math.floor(distance) + "." +  temp + "s";
    }
    else
    {
        timerText.innerHTML = "Start";
        endGame();
    }
}

var gameIsRunning = false;
function startGame()
{
    if(gameIsRunning)
    {
        return;
    }

    startTimer();
    gameIsRunning = true;
}

var titelText = document.getElementById("titelText");
function endGame()
{
    if(!gameIsRunning)
    {
        return;
    }

    var winner = snakes[0];
    var highscore = winner.getHighscore();
    for(let i=0; i < snakes.length; i++)
    {
        snakes[i].die();
        if(snakes[i].getHighscore() > winner.getHighscore())
        {
            winner = snakes[i];
            highscore = winner.getHighscore();
        }

        snakes[i].resetHighscore();
        snakes[i].update();
    }

    if(highscore == 1)
    {
        titelText.innerHTML = "Snake " + (winner.getPersonalId()+1) + " won by " + highscore + " point!";
    }
    else
    {
        titelText.innerHTML = "Snake " + (winner.getPersonalId()+1) + " won by " + highscore + " points!";
    }

    titelText.style.color = winner.getColor();
    titelText.style.textShadow = "2px 0 0 #1b1811, -2px 0 0 #1b1811, 0 2px 0 #1b1811, 0 -2px 0 #1b1811, 1px 1px #1b1811, -1px -1px 0 #1b1811, 1px -1px 0 #1b1811, -1px 1px 0 #1b1811";
    gameIsRunning = false;
}