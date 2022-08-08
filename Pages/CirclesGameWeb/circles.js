var canvas = document.getElementById("gameCanvasCircles");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext("2d");

var circles = [];

window.onresize = function() { 
   canvas.height = window.innerHeight;  
   canvas.width = window.innerWidth; 
}; 

function createCircle()
{   
    if(circles.length >= 100)
    {
        alert("Max limit of 100 Circles reached.");
        return;
    }

    //let rect = canvas.getBoundingClientRect(); 
    //let newX = event.clientX - rect.left; 
    //let newY = event.clientY - rect.top; 
    //20 150   /10     20 80       /4
    if(onMobile)
    {
        var r = returnRandom(20, 70);
    }
    else
    {
        var r = returnRandom(20, 180);
    }
    
    var dx = 0;
    var dy = 0;
    do{
        dx = returnRandom(-5, 5);
        dy = returnRandom(-5, 5);
    }while(dx === 0 || dy === 0)

    var newCircle = new Circle(
        returnRandom(0+r, innerWidth-r),
        returnRandom(0+r, innerHeight-r),
        r,
        dx,
        dy,
        returnRandomColor());

    circles.push(newCircle);

    //random Position
    //returnRandom(0+r, innerWidth-r),
    //returnRandom(0+r, innerHeight-r),
}

function updateAllCircles()
{
    for(let i=0; i < circles.length; i++)
    {
        circles[i].circleUpdate();
    }
}

var score = 0;
var spawnCircleButton = document.getElementById("spawnCircleButton");
var scoreText = document.getElementById("scoreText");
var scoreTextDiv = document.getElementById("scoreTextDiv");

var onMobile = false;
if (/Android|webOS|iPhone|iPad|BlackBerry|Windows Phone|Opera Mini|IEMobile|Mobile/i.test(navigator.userAgent))
{
    canvas.addEventListener('touchstart', function(e){ clickedOnCircle(e)});
    onMobile = true;
}
else
{
    canvas.addEventListener('mousedown', function(e){ clickedOnCircle(e)});
    onMobile = false;
}
    
function clickedOnCircle(event)
{
    if(!spawnActive)
    {
        return;
    }

    if(onMobile)
    {
        var x = event.touches[0].pageX; 
        var y = event.touches[0].pageY; 
    }
    else
    {
        var x = event.clientX; 
        var y = event.clientY; 
    }

    let hittet = false;

    for(let i=0; i < circles.length; i++)
    {
        if((circles[i].x + circles[i].r + 10) > x && (circles[i].x - circles[i].r - 10) < x && (circles[i].y + circles[i].r + 10) > y && (circles[i].y - circles[i].r - 10) < y)
        {
            hittet = true;
            circles.splice(i, 1);
            score++;
            scoreText.innerHTML = score;

            if(scoreTextDiv.style.animation.length <= 0)
            {
                scoreTextDiv.style.animation = "scored 1s ease-in-out";
                setTimeout(() => {scoreTextDiv.style.animation = ""}, 1000);
            }
        }
    }

    if(!hittet)
    {
        score = 0;
        scoreText.innerHTML = "";

        spawnActive = false;
        clearInterval(spawnActive);
        spawnCircleButton.innerHTML = "Try Again";
        spawnCircleButton.classList.remove("goDown");

        circles = [];
        document.body.style.animation = "death 1s ease-out";
    }
}

var spawnActive = false;
function randomIntervalls()
{
    if(spawnActive)
    {
        createCircle();
        let nextSpawn = returnRandom(250, 2500);
        spawnActive = setTimeout(randomIntervalls, nextSpawn);
    }
}

function toggleCircleSpawn()
{
    if(!spawnActive)
    {
        spawnActive = true;
        spawnActive = setTimeout(randomIntervalls, 2000);
        spawnCircleButton.innerHTML = "Pause";
        spawnCircleButton.classList.add("goDown");
        document.body.style.animation="";
    }
    else
    {
        spawnActive = false;
        clearInterval(spawnActive);
        spawnCircleButton.innerHTML = "Resume";
        spawnCircleButton.classList.remove("goDown");
    }
}

draw();
function draw()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateAllCircles();

    window.requestAnimationFrame(draw);
}

function Circle(x, y, targetR, startDx, startDy, color)
{
    this.targetR = targetR;

    this.x = x;
    this.y = y;
    this.r = 0;
    this.color = color;

    this.velocity = {
        x: startDx,
        y: startDy
    };

    this.circleUpdate = function()
    {
        this.circleGrow();
        this.circleCollide();
        this.circleMove();
        this.circleDraw();
    };

    this.circleGrow = function()
    {
        if(this.r < this.targetR)
        {
            this.r += this.targetR/40;
        }
        else if(this.r > this.targetR)
        {
            this.r = this.targetR;
        }
    }

    this.circleDraw = function()
    {
        //ctx.beginPath();
        //ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        //ctx.strokeStyle = this.color;
        //ctx.stroke();

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    };

    this.circleMove = function()
    {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.circleCollide = function()
    {
        if(this.x + this.r > canvas.width)
        {
            this.velocity.x *= -1;
            this.x = canvas.width - this.r;
        }
        else if(this.x - this.r < 0)
        {
            this.velocity.x *= -1;
            this.x = 0 + this.r;
        }

        if(this.y + this.r > canvas.height)
        {
            this.velocity.y *= -1;
            this.y = canvas.height - this.r;
        }
        else if(this.y - this.r < 0)
        {
            this.velocity.y *= -1;
            this.y = 0 + this.r;
        }
    };
}

function returnRandom(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function returnRandomColor(){
    var colors = ["rgba(255,105,97)", "#1b1811"];
    return colors[returnRandom(0, colors.length-1)];
}