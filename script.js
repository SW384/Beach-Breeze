const itemInput = document.getElementById("itemInput");
const addItemButton = document.getElementById("addItemButton");
const packingList = document.getElementById("packingList");
const eventInput = document.getElementById("eventInput");
const dateInput = document.getElementById("dateInput");
const addEventButton = document.getElementById("addEventButton");
const scheduleList = document.getElementById("scheduleList");
const trash = document.querySelectorAll(".trash");

function addItem() {
    const itemText = itemInput.value;
    if (itemText.trim() == ""){
        return;
    }
    const newItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const text = document.createTextNode(itemText);
    checkbox.addEventListener("change", function() {
        newItem.classList.toggle("completed");
    });
    newItem.appendChild(checkbox);
    newItem.appendChild(text);
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        newItem.remove();
    });
    newItem.appendChild(deleteButton);
    packingList.appendChild(newItem);
    itemInput.value = "";
}
addItemButton.addEventListener("click", addItem);

function addEvent(){
    const eventText = eventInput.value;
    const eventDate = dateInput.value;
    if(eventText.trim() == "" || eventDate == ""){
        return;
    }
    const newEvent = document.createElement("li");
    newEvent.dataset.date = eventDate;
    const formattedDate = new Date(eventDate).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit"
    });
    newEvent.textContent = eventText + " - " + formattedDate;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function() {
        newEvent.remove();
    });
    newEvent.appendChild(deleteButton);
    scheduleList.appendChild(newEvent);
    const events = Array.from(scheduleList.children);
    events.sort(function(a, b){
        return new Date(a.dataset.date) - new Date(b.dataset.date);
    });
    events.forEach(function(event){
        scheduleList.appendChild(event);
    });
    eventInput.value = "";
    dateInput.value = "";
}
addEventButton.addEventListener("click", addEvent);

function showPage(pageName) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.display = "none";
    });
    document.getElementById(pageName).style.display = "block";
    window.scrollTo(0, 0);
}

let score = 0;
let timer;
let timeLeft = 45;

function randomizeTrash() {
    trash.forEach(function(item) {
        const x = Math.random() * 92;
        const y = 58 + Math.random() * 35;
        item.style.left = x + "%";
        item.style.top = y + "%";
        item.style.visibility = "visible";
    });
}

trash.forEach(function(item) {
    item.addEventListener("click", function() {
        item.style.visibility = "hidden";
        score++;
        document.getElementById("score").textContent = score;
        if (score === trash.length) {
            clearInterval(timer);
            document.getElementById("winMessage").style.display = "block";
        }
    });
});
randomizeTrash();

document.getElementById("playAgainButton").addEventListener("click", function() {
    score = 0
    document.getElementById("score").textContent = "0";
    document.getElementById("winMessage").style.display = "none";
    randomizeTrash();
});

document.getElementById("timerButton").addEventListener("click", function() {
    document.getElementById("timer").style.display = "block";
    clearInterval(timer);
    timeLeft = 45;
    document.getElementById("timer").textContent = "00:45";
    timer = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
        if (timeLeft <= 0) {
            clearInterval(timer);
            trash.forEach(function(item) {
                item.style.visibility = "hidden";
            });
            document.getElementById("loseMessage").style.display = "block";
        }
    }, 1000);
});

document.getElementById("tryAgainButton").addEventListener("click", function() {
    score = 0;
    document.getElementById("score").textContent = "0";
    document.getElementById("loseMessage").style.display = "none";
    document.getElementById("timer").style.display = "block";
    timeLeft = 45;
    document.getElementById("timer").textContent = "00:45";
    randomizeTrash();
    clearInterval(timer);
    timer = setInterval(function() {
        timeLeft--;
        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");
        if (timeLeft <= 0) {
            clearInterval(timer);
            trash.forEach(function(item) {
                item.style.visibility = "hidden";
            });
            document.getElementById("loseMessage").style.display = "block";
        }
    }, 1000);
});