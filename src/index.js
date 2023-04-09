//Date function
function formatDate(timestamp) {
  let now = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[now.getDay()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return ` ${day}, ${hours}:${minutes} `;
}

//Search temperature,day and time by city

function displayApiTemperature(response) {
  let currentCity = document.querySelector(".current-city");

  let temperature = Math.round(response.data.main.temp);
  let currentTempNumber = document.querySelector(".current-temp-number");
  let weatherDescription = document.querySelector(".weather-description");
  let humidityNumber = document.querySelector(".humidity-number");
  let windNumber = document.querySelector(".wind-number");
  currentCity.innerHTML = response.data.name;
  currentTempNumber.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityNumber.innerHTML = response.data.main.humidity;
  windNumber.innerHTML = Math.round(response.data.wind.speed);
  let currentdate = document.querySelector(".current-day-time");
  currentdate.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherIconUrl = response.data.weather[0].icon;

  weatherIcon.setAttribute("src", `images/${weatherIconUrl}.png`);
}

function search(city) {
  let apiKey = "3594d555e3732aed8439d60b3c8232b2";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
  axios
    .get(`${apiUrl}${city}&units=metric&appid=${apiKey}`)
    .then(displayApiTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".city-input").value;
  search(city);
}
let form = document.querySelector(".search-form");
form.addEventListener("submit", handleSubmit);

search("Abuja");

//Temperature for current location
function displaylatlonTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let wind = Math.round(response.data.wind.speed);
  let currentCity = document.querySelector(".current-city");
  let currentTempNumber = document.querySelector(".current-temp-number");
  let weatherDescription = document.querySelector(".weather-description");
  let humidityNumber = document.querySelector(".humidity-number");
  let windNumber = document.querySelector(".wind-number");
  currentCity.innerHTML = response.data.name;
  currentTempNumber.innerHTML = `${temperature}`;
  weatherDescription.innerHTML = response.data.weather[0].description;
  humidityNumber.innerHTML = `${humidity}`;
  windNumber.innerHTML = `${wind}`;
  let currentdate = document.querySelector(".current-day-time");
  currentdate.innerHTML = formatDate(response.data.dt * 1000);
  let weatherIcon = document.querySelector(".weather-icon");
  let weatherIconUrl = response.data.weather[0].icon;

  weatherIcon.setAttribute("src", `images/${weatherIconUrl}.png`);
}
function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "3594d555e3732aed8439d60b3c8232b2";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(
      `${apiUrl}lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    )
    .then(displaylatlonTemperature);
}
function displayCurrentCityTemp() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector(".current-btn");
currentButton.addEventListener("click", displayCurrentCityTemp);

//Handle City Suggestions click
function handleClick(event) {
  event.preventDefault();
  let clickedCity = event.target.innerHTML;
  if (clickedCity === "Abuja") {
    search("Abuja");
  } else if (clickedCity === "Lagos") {
    search("Lagos");
  } else if (clickedCity === "Onitsha") {
    search("Onitsha");
  } else if (clickedCity === "Accra") {
    search("Accra");
  } else if (clickedCity === "Lisbon") {
    search("Lisbon");
  }
}
let citySuggestions = document.querySelector(".city-suggestions");
citySuggestions.addEventListener("click", handleClick);
