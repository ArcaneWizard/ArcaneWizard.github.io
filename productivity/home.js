
const alterButtons = document.getElementById("alterButtons");
const enterCategoryField = document.getElementById("enterCategoryField");
const productivityButtons = document.getElementById("buttons");
const productivityButton = productivityButtons.childNodes[1];
const lastTime = document.getElementById("Last Time");
const body = document.body;

setup();

function setup() {
    if (localStorage.getItem("runOnce") == null) {
        localStorage.setItem("productivity_Keys", "Wasted Time,Semi-Productive,Productive,Took a break");
        localStorage.setItem("productivity_Values", "0,0,0,0");
        localStorage.setItem("activity_Keys", "");
        localStorage.setItem("activity_Values", "");
        localStorage.setItem("design", "lightMode");

        localStorage.setItem("runOnce", 1);
        checkNotificationPermission() 
    }
    let categories = localStorage.getItem("productivity_Keys").split(",");
    categories.forEach(category => {
        addCategory(category);
    });

    refreshChart();
    
    //Show the last time the chart was updated
    if (localStorage.getItem("last_Time_P"))
        lastTime.textContent = "Last Update: " + localStorage.getItem("last_Time_P");
}

//USER INPUT----------------------------------------------------

//Productivity Input
function selectProductivityCategory() {
    let category = event.target.textContent;

    let categories = localStorage.getItem("productivity_Keys").split(",");
    let times = localStorage.getItem("productivity_Values").split(",");
    let index = categories.indexOf(category);   
    let time = parseFloat(times[index]);

    isNaN(time) ? (time = 0.5) : (time += 0.5);
    times[index] = time;
    localStorage.setItem("productivity_Values", times.toString());
    
    refreshChart();

    let hours = new Date().getHours();
    let min = new Date().getMinutes();
    let mid = " AM";        
 
    if (hours == 0)
        mid = " AM";
    if (hours >= 12) {
        hours -= 12;
        mid = " PM";
    }
    
    if (min <= 9)
        min = "0" + min;
    
    lastTime.textContent = "Last Update: " + hours + ":" + min + mid;
    localStorage.setItem("last_Time_P", hours + ":" + min + mid);
}



//EDIT SOMETHING------------------------------------------------------

//switch to edit mode
function editMode() {
    alterButtons.style.display != "block" ? (alterButtons.style.display = "block") : alterButtons.style.display = "none";
}

//add a category button
function addCategory(category) {
    var cProductivityButton = productivityButton.cloneNode(true);
    cProductivityButton.textContent = category;
    cProductivityButton.removeAttribute("id");
    
    productivityButtons.appendChild(cProductivityButton);
    refreshChart();
}

//add a new category
function addNewCategory() {
   const category = enterCategoryField.value;

   let categories = localStorage.getItem("productivity_Keys").split(",");
   categories.push(category);
   localStorage.setItem("productivity_Keys", categories.toString());

   let times = localStorage.getItem("productivity_Values").split(",");
   times.push(0);
   localStorage.setItem("productivity_Values", times.toString());
   
   addCategory(category);
}

//remove a category
function removeCategory() {
    let category = enterCategoryField.value;
       
    let categories = localStorage.getItem("productivity_Keys").split(",");
    let times = localStorage.getItem("productivity_Values").split(",");
    let index = categories.indexOf(category); 

    productivityButtons.childNodes.forEach(buttonType => {
        if (buttonType.textContent == category) {
            productivityButtons.removeChild(buttonType);

            categories.splice(index, 1);
            times.splice(index, 1);

            localStorage.setItem("productivity_Keys", categories.toString());
            localStorage.setItem("productivity_Values", times.toString());
        }
    });

    refreshChart();
}

//clear all values
function clearCategories() {
    const confirmation = window.prompt("Do you want to clear your current data? Type 'yes' to go ahead with it.");
    
    if (confirmation == "yes") {
        let times = localStorage.getItem("productivity_Values").split(",");
        let newTimes = [];
        newTimes.length = times.length;
        newTimes.fill(0);
        localStorage.setItem("productivity_Values", newTimes.toString());
    }

    refreshChart();
}



//Other----------------------------------------------------------------

//change tab
function changeTab() {
    window.location.href = '../activity/activity.html';
}

//change to dark or light mode
if (localStorage.getItem("design") == "darkMode") {    
    body.style.setProperty('--background-color', 'rgb(37, 35, 35)');
    body.style.setProperty('--topTab-color', 'rgb(100, 131, 165)');
    body.style.setProperty('--secondTab-color', 'rgb(55, 63, 81)');
    body.style.setProperty('--font-color', 'rgb(255, 255, 255, 1)');
}
else {
    body.style.setProperty('--background-color', 'rgb(255, 255, 255)');
    body.style.setProperty('--topTab-color', 'rgb(82, 180, 245)');
    body.style.setProperty('--secondTab-color', 'rgb(127, 134, 139)');
    body.style.setProperty('--font-color', 'rgb(0, 0, 0, 1)');
}