
let nextNotification = document.getElementById("Next Notification");

const notificationInterval = 30;

var timer;
let currentTime = localStorage.getItem('currentTime');
let targetTime = localStorage.getItem('targetTime');

if (targetTime == null && currentTime == null) {
    currentTime = new Date();
    targetTime = new Date(currentTime.getTime() + (notificationInterval * 60000));
    localStorage.setItem("currentTime", currentTime);
    localStorage.setItem("targetTime", targetTime);
}
else {
    currentTime = new Date(currentTime);
    targetTime = new Date(targetTime);
}

if (!checkComplete()) {
    timer = setInterval(checkComplete, 1000);
}

function checkComplete() {
    if (currentTime > targetTime) {
        checkNotificationPermission();

        currentTime = new Date();
        targetTime = new Date(currentTime.getTime() + (notificationInterval * 60000));
        localStorage.setItem("currentTime", currentTime);
        localStorage.setItem("targetTime", targetTime);
    }
    else {
        currentTime = new Date();
    }
}

document.onbeforeunload = function() {
    localStorage.setItem('currentTime', currentTime);
}

displayTimer();
setInterval(displayTimer, 5000);
function displayTimer() {
    localStorage.setItem("next_Notification", Math.ceil((targetTime.getTime() - currentTime.getTime()) / 60000) + " min");
    nextNotification.textContent = "Next Reminder: " + localStorage.getItem("next_Notification");
}

//Ask to show notifications
function checkNotificationPermission() {
    if (Notification.permission == "granted")
        showNotification();

    else if (Notification.permission != "denied") {
        Notification.requestPermission().then(permission => {
            if (permission == "granted")
                showNotification();
        });
    }
}

//Handle Notifications
function showNotification() {
    const notification = new Notification("Check-In", {
        body: "Fill out your productivity and activity this last half-hour.",
        icon: "../pictures/wall.png"
    });

    notification.onclick = (err) => {
        window.open("../activity/activity.html");
    }
}