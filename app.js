// Feature 1
let currentDateAndTime = new Date();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let days = daysOfWeek[currentDateAndTime.getDay()];

let time = currentDateAndTime.toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
});

let dateAndTime = `${days} ${time}`;

let weekTime = document.querySelector("#day-time");
weekTime.innerHTML = dateAndTime;

// Feature 2

function displayNameAndWeatherTemp(response) {
  console.log(response.data.name);
  console.log(response);
  let heading = document.querySelector("h1");
  heading.innerHTML = response.data.name;
  let temperature = document.querySelector("#temperature");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let weatherDescription = document.querySelector("#description");
  weatherDescription.innerHTML = response.data.weather[0].description;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity + "%";
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed) + " mph";
}

function searchCity(city) {
  let apiKey = "6295b66f26653cb51fb2d0cbfa59847f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayNameAndWeatherTemp);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "6295b66f26653cb51fb2d0cbfa59847f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayNameAndWeatherTemp);
}

function yourLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let buttons = document.querySelector("#search-form");
buttons.addEventListener("submit", handleSubmit);

// Bonus Feature
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToCelsius);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", yourLocation);

searchCity("London");
