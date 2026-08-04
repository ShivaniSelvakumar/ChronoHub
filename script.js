
let clockInterval;
let stopwatchSeconds = 0;
let stopwatchMinutes = 0;
let stopwatchHours = 0;
let inputMinutes = 0;
let timerSeconds = 0;
let timerInterval = null;
let stopwatchInterval;
let worldClockInterval;
let pauseBtn;
let savedTheme = localStorage.getItem("theme");

if(savedTheme){

    document.body.className = savedTheme;
}

let clock = document.querySelector(".clock");
let maincontent = document.querySelector("main")
clock.addEventListener("click",clockFunction);

function clockFunction()
{
    clearInterval(worldClockInterval);
    worldClockInterval = null;
    
    maincontent.innerHTML = 
  `  <h2>Digital Clock</h2>

    <p id="time"></p>

    <p id="date"></p> `
   updateClock();
   if (clockInterval) {
    clearInterval(clockInterval);
}
   clockInterval = setInterval(updateClock, 1000);
}
function updateClock()
{
    let timeElement = document.querySelector("#time");
    let dateElement = document.querySelector("#date");

    let now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

   
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timeElement.textContent = `${hours}:${minutes}:${seconds}`;

    const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

let day = now.getDay();
let date = now.getDate();
let month = now.getMonth();
let year = now.getFullYear();

dateElement.textContent = `${days[day]}, ${date} ${months[month]} ${year}`;
}
let stopWatch = document.querySelector(".stop-watch")
stopWatch.addEventListener("click",stopWatchFn)
function stopWatchFn()
{
    clearInterval(clockInterval);
    clockInterval = null;
    clearInterval(worldClockInterval);
    worldClockInterval = null;
   
    maincontent.innerHTML=`
    <h2>⏱ Stopwatch</h2>

<p id="stopwatch-display">00:00:00</p>

<div class="controls">
    <button id="start">Start</button>
    <button id="pause">Pause</button>
    <button id="reset">Reset</button>
</div>`;
let startButton = document.querySelector("#start");
let pauseButton = document.querySelector("#pause");
let resetButton = document.querySelector("#reset");
let stopwatchDisplay = document.querySelector("#stopwatch-display");
startButton.addEventListener("click",startStopwatch);
pauseButton.addEventListener("click",pauseStopwatch);    
resetButton.addEventListener("click",resetStopwatch);
updateStopwatchDisplay();
}
 function startStopwatch()
{
    if (stopwatchInterval) {
    return;
    }
    stopwatchInterval=setInterval(updateStopwatch,1000)
}
 function pauseStopwatch()
{
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
}
 function resetStopwatch()
 {
    clearInterval(stopwatchInterval);
stopwatchInterval = null;

stopwatchHours = 0;
stopwatchMinutes = 0;
stopwatchSeconds = 0;

updateStopwatchDisplay();
 }
 function updateStopwatch()
 {
    stopwatchSeconds++;
    if(stopwatchSeconds==60)
    {
        stopwatchSeconds=0;
        stopwatchMinutes+=1;
    }
    if(stopwatchMinutes==60)
    {
        stopwatchMinutes=0;
        stopwatchHours+=1;
    }
    updateStopwatchDisplay();
 }
 function updateStopwatchDisplay()
{
    let stopwatchDisplay = document.querySelector("#stopwatch-display");

    let displayHours = String(stopwatchHours).padStart(2, "0");
    let displayMinutes = String(stopwatchMinutes).padStart(2, "0");
    let displaySeconds = String(stopwatchSeconds).padStart(2, "0");

    stopwatchDisplay.textContent = `${displayHours}:${displayMinutes}:${displaySeconds}`;
}
let timer = document.querySelector(".timer");
timer.addEventListener("click", timerFn);



function timerFn() {
    clearInterval(clockInterval);
    clockInterval = null;
    
    clearInterval(worldClockInterval);
    worldClockInterval = null;

    maincontent.innerHTML = `
    <h2>⏳ Countdown</h2>
    <input type="number" id="timer-input" placeholder="Enter minutes">

    <p id="timer-display">00:00</p>

    <div class="controls">
        <button id="startT">Start</button>
        <button id="pauseT">Pause</button>
        <button id="resetT">Reset</button>
    </div>
    `;

    let startBtn = document.querySelector("#startT");
     pauseBtn = document.querySelector("#pauseT");
    let resetBtn = document.querySelector("#resetT");

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    updateTimerDisplay();
}

function startTimer() {

    if (timerInterval) {
        return;
    }

    if (timerSeconds === 0) {

        let timeInput = document.querySelector("#timer-input");

        inputMinutes = Number(timeInput.value);

        if (inputMinutes <= 0) {
            alert("Enter a valid time");
            return;
        }

        timerSeconds = inputMinutes * 60;
    }

    updateTimerDisplay();

    timerInterval = setInterval(updateTimer, 1000);
}
let isPaused = false;

function pauseTimer() {

    if (timerSeconds === 0) {
        return;
    }

    if (!isPaused) {

        clearInterval(timerInterval);
        timerInterval = null;

        isPaused = true;

        pauseBtn.textContent = "Resume";
    }

    else {

        timerInterval = setInterval(updateTimer, 1000);

        isPaused = false;

        pauseBtn.textContent = "Pause";
    }
}
function resetTimer() {

    clearInterval(timerInterval);
    timerInterval = null;

    inputMinutes = 0;
    timerSeconds = 0;

    isPaused = false;
    pauseBtn.textContent = "Pause";

    let timeInput = document.querySelector("#timer-input");
    timeInput.value = "";

    updateTimerDisplay();
}

function updateTimer() {

    if (timerSeconds > 0) {
        timerSeconds--;
        updateTimerDisplay();
    } 
    else {

    clearInterval(timerInterval);
    timerInterval = null;

    isPaused = false;
    pauseBtn.textContent = "Pause";

    alert("Time's up!");
}

}

function updateTimerDisplay() {

    let timerDisplay = document.querySelector("#timer-display");

    let timerMins = String(Math.floor(timerSeconds / 60)).padStart(2, "0");
    let timerSecs = String(timerSeconds % 60).padStart(2, "0");

    timerDisplay.textContent = `${timerMins}:${timerSecs}`;
}
let worldClock = document.querySelector(".world-clock");
console.log(worldClock);
worldClock.addEventListener("click", worldClockFn);
function worldClockFn() {

    clearInterval(clockInterval);
    clockInterval = null;

    clearInterval(stopwatchInterval);
    stopwatchInterval = null;

    clearInterval(timerInterval);
    timerInterval = null;

    maincontent.innerHTML = `
        <h2>🌍 World Clock</h2>

        <select id="city">
        <option value="America/New_York">🇺🇸 New York</option>
        <option value="Europe/London">🇬🇧 London</option>
        <option value="Asia/Tokyo">🇯🇵 Tokyo</option>
        <option value="Europe/Paris">🇫🇷 Paris</option>
        <option value="Australia/Sydney">🇦🇺 Sydney</option>
        <option value="Asia/Dubai">🇦🇪 Dubai</option>
        </select>

        <p id="world-time"></p>
        <p id="location"></p>
    `;

    updateWorldClock();

if (worldClockInterval) {
    clearInterval(worldClockInterval);
}

worldClockInterval = setInterval(updateWorldClock, 1000);
}
function updateWorldClock()
{
    let city = document.querySelector("#city").value;
    let citySelect = document.querySelector("#city");
    let now = new Date();
    let place = citySelect.options[citySelect.selectedIndex].text;
    let worldTime= document.querySelector("#world-time");
    let time = now.toLocaleTimeString("en-US", {
    timeZone: city
});
    worldTime.textContent = time;
    let location = document.querySelector("#location");

    location.textContent = place;
}
let themes = document.querySelector(".themes");
themes.addEventListener("click", themesFn);

function themesFn() {

    clearInterval(clockInterval);
    clearInterval(worldClockInterval);

    maincontent.innerHTML = `
        <h2>🎨 Choose Theme</h2>

        <button id="default">🎨 Default</button>

        <button id="dark">🌙 Dark</button>

        <button id="ocean">🌊 Ocean</button>

        <button id="lavender">🌸 Lavender</button>
    `;

    document.querySelector("#default").addEventListener("click", defaultTheme);
    document.querySelector("#dark").addEventListener("click", darkTheme);
    document.querySelector("#ocean").addEventListener("click", oceanTheme);
    document.querySelector("#lavender").addEventListener("click", lavenderTheme);
}
function defaultTheme() {

    document.body.className = "default-theme";

    localStorage.setItem("theme","default-theme");
}

function darkTheme() {

    document.body.className = "dark-theme";

    localStorage.setItem("theme","dark-theme");
}

function oceanTheme() {

    document.body.className = "ocean-theme";

    localStorage.setItem("theme","ocean-theme");
}

function lavenderTheme() {

    document.body.className = "lavender-theme";

    localStorage.setItem("theme","lavender-theme");
}