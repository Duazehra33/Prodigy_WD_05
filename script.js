const cityInput = document.getElementById("cityInput");
const getWeatherBtn = document.getElementById("getWeatherBtn");
const weatherInfo = document.getElementById("weatherInfo");

const api = {
    key: "fcc8de7015bbb202209bbf0261babf4c",
    base: "https://api.openweathermap.org/data/2.5/"
};

getWeatherBtn.addEventListener("click", function () {
    const city = cityInput.value;
    const apiUrl = `${api.base}weather?q=${city}&units=metric&APPID=${api.key}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const { name, main: { temp, humidity }, weather: [{ description }] } = data;
            const date = new Date();

            weatherInfo.innerHTML = `
                <h2>Weather in ${name}</h2>
                <p>Date: ${date.toLocaleDateString()}</p>
                <p>Temperature: ${temp}°C</p>
                <p>Description: ${description}</p>
                <p>Humidity: ${humidity}%</p>
            `;
        })
        .catch(error => {
            console.error(error);
            weatherInfo.innerHTML = "Error fetching weather data";
        });
});

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', function (evt) {
    if (evt.keyCode == 13) {
        const query = searchbox.value;
        const apiUrl = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(displayResults)
            .catch(error => {
                console.error(error);
                weatherInfo.innerHTML = "Error fetching weather data";
            });
    }
});

function displayResults(weather) {
    const city = document.querySelector('.location .city');
    const date = document.querySelector('.location .date');
    const temp = document.querySelector('.current .temp');
    const weather_el = document.querySelector('.current .weather');
    const hilow = document.querySelector('.hi-low');

    city.innerText = `${weather.name}, ${weather.sys.country}`;
    date.innerText = dateBuilder(new Date());
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
    weather_el.innerText = weather.weather[0].main;
    hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function dateBuilder(d) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const day = days[d.getDay()];
    const date = d.getDate();
    const month = months[d.getMonth()];
    const year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}
