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
        r.style.setProperty('--image-brightness', '0.7');

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
        r.style.setProperty('--image-brightness', '1');

        // Change light mode icon visible to hidden
        lightModeIcon.style.visibility = "hidden";
        darkModeIcon.style.visibility = "visible";
    }
}