// Copyright year updater
let date = new Date();
document.getElementById("copyrightYear").innerHTML = date.getFullYear();

// Age updater
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

// Navigation bar
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

// Projects filter buttons
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
