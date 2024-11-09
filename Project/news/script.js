function updateCountdown(elementId, targetDate) {
    const countdownElement = document.getElementById(elementId);
    const targetDateTime = new Date(targetDate).getTime();

    function calculateRemainingTime() {
        const now = new Date().getTime();
        const timeLeft = targetDateTime - now;

        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        countdownElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    setInterval(calculateRemainingTime, 1000);
}

updateCountdown('countdown-1', '2025-03-05T19:00:00');
updateCountdown('countdown-2', '2025-03-06T12:00:00');

function displayCurrentDateTime() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true, second: 'numeric'};
    const dateTimeString = now.toLocaleString('en-US', options);
    
    document.getElementById('date-time').innerHTML = dateTimeString;
}

setInterval(displayCurrentDateTime, 1000);
displayCurrentDateTime(); 

const greetings = [
    { time: 12, message: "Good Morning! Current time is..." },
    { time: 18, message: "Good Afternoon! Current time is..." },
    { time: 24, message: "Good Evening! Current time is..." }
];

function getGreeting(hours) {
    return greetings.find(g => hours < g.time)?.message || "Hello!";
}

function updateDateTimeAndGreeting() {
    const now = new Date();
    const hours = now.getHours();
    const currentDateTime = now.toLocaleString();

    const greeting = getGreeting(hours);

    document.getElementById("greeting").innerText = greeting;
    document.getElementById("currentDateTime").innerText = `Current Date and Time: ${currentDateTime}`;
}

document.addEventListener("DOMContentLoaded", updateDateTimeAndGreeting);

function changeBackgroundColor(color) {
    document.body.style.backgroundColor = color;
    closePopup();
}

function openPopup() {
    document.getElementById("colorPopup").classList.remove("hidden");
}

function closePopup() {
    document.getElementById("colorPopup").classList.add("hidden");
}

document.getElementById("colorButton").addEventListener("click", openPopup);

document.addEventListener("DOMContentLoaded", updateDateTimeAndGreeting);

async function getWeather() {
    const city = document.getElementById('city').value;
    const weatherResult = document.getElementById('weather-result');

    if (!city) {
        weatherResult.innerHTML = "Please enter a city name.";
        return;
    }

    try {
        // Adding `lang=en` to ensure the weather is displayed in English
        const response = await fetch(`https://wttr.in/${city}?format=%C+%t&lang=en`);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.text();
        displayWeather(city, data);
    } catch (error) {
        weatherResult.innerHTML = `Error: ${error.message}`;
    }
}

function displayWeather(city, data) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<h2>Weather in ${city}</h2><p>${data}</p>`;
}

// Add event listener for Enter key press on the form
document.getElementById('weather-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    getWeather(); // Trigger the getWeather function when Enter is pressed
});

