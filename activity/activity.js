
const alterButtons = document.getElementById("alterButtons");
const enterActivityField = document.getElementById("enterActivityField");
const enterTimeField = document.getElementById("enterTimeField");
const modeButton = document.getElementById("modeButton");
const body = document.body;

refreshChart();
setDesign();

//USER INPUT----------------------------------------------------


//EDIT SOMETHING------------------------------------------------------

//add an entry to the doughnut graph
function updateActivity() {
    const activity = enterActivityField.value;
    const time = parseFloat(enterTimeField.value);

    if (activity != "" && time != "" && !isNaN(time)) {        
        let activities = localStorage.getItem("activity_Keys").split(",");
        let times = localStorage.getItem("activity_Values").split(",");
        
        if (activities.includes(activity)) {
            const n = activities.indexOf(activity);
            const value = parseFloat(times[n]);
            const newValue = value + time;
            isNaN(value) ? times[n] = parseFloat(time) : times[n] = newValue;
        }
        else {
            if (activities[0] == "") {
                activities[0] = activity;
                times[0] = time;
            }
            else {
                activities.push(activity);
                times.push(time);
            }
        }

        localStorage.setItem("activity_Keys", activities.toString());
        localStorage.setItem("activity_Values", times.toString());

        refreshChart();
    }

    else
        window.alert("Enter an activity you did and its integer duration in minutes");
}

//remove a category
function removeActivity() {
    const activity = enterActivityField.value;
       
    if (activity != "") {        
        let activities = localStorage.getItem("activity_Keys").split(",");
        let times = localStorage.getItem("activity_Values").split(",");
        
        if (activities.includes(activity)) {
            const n = activities.indexOf(activity);  
            activities.splice(n, 1);
            times.splice(n, 1);          
        }
        else {
            window.alert("The specified activity isn't present in the graph and thus can't be removed");
        }

        localStorage.setItem("activity_Keys", activities.toString());
        localStorage.setItem("activity_Values", times.toString());

        refreshChart();
    }

    else
        window.alert("You must specify an activity to remove it");
}

//clear all values
function clearCategories() {
    const confirmation = window.prompt("Do you want to clear your current data? Type 'yes' to go ahead with it.");
    
    if (confirmation == "yes") {        
        localStorage.setItem("activity_Keys", "");
        localStorage.setItem("activity_Values", "");
    }

    refreshChart();
}



//Other----------------------------------------------------------------

//change tab
function changeTab() {
    window.location.href = '../productivity/home.html';
}

//change to light or dark mode {
function changeDesignMode() {
    if (localStorage.getItem("design") != "darkMode")
        localStorage.setItem("design", "darkMode");
    else
        localStorage.setItem("design", "lightMode");

    changeDesign();
    refreshChart();
    setDesign();
}

function setDesign() {
    if (localStorage.getItem("design") == "darkMode") {
        body.style.setProperty('--background-color', 'rgb(37, 35, 35)');
        body.style.setProperty('--topTab-color', 'rgb(100, 131, 165)');
        body.style.setProperty('--secondTab-color', 'rgb(55, 63, 81)');
        body.style.setProperty('--font-color', 'rgb(255, 255, 255, 1)');
        modeButton.textContent = "Light Mode";
    }
    else {
        body.style.setProperty('--background-color', 'rgb(255, 255, 255)');
        body.style.setProperty('--topTab-color', 'rgb(82, 180, 245)');
        body.style.setProperty('--secondTab-color', 'rgb(127, 134, 139)');
        body.style.setProperty('--font-color', 'rgb(0, 0, 0, 1)');
        modeButton.textContent = "Dark Mode";
    }


}