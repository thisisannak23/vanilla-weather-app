function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  
  return days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast=response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index<6)
    forecastHTML = forecastHTML +
      `<div class="col-2" width "100%">
    <div class="forecastDate">${formatDay(forecastDay.dt)}</div>
    <img class="forecastIcons" src="src/${forecastDay.weather[0].icon}.png" alt="description" width="100px"/>
    <div class="forecastTemps">
      <span class="forecastTempMax">${Math.round (forecastDay.temp.max)}° <div id="divider">|</div></span>
      <span class="forecastTempMin">${Math.round(forecastDay.temp.min)}°</span>
    </div>
  </div>
`;
  });
  forecastHTML = forecastHTML+`</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "f9de746b9d23a9c915974277fc1710ae";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let currentCity = document.querySelector("#currentCity");
  let humidityPercent = document.querySelector("#humidityPercent");
  let windSpeedMPH = document.querySelector("#windSpeedMPH");
  let currentDescrip = document.querySelector("#currentDescrip");
  let dayTime = document.querySelector("#dayTime");
  let currentPic = document.querySelector("#currentPic");

  fahrenheitTemp = response.data.main.temp;

  currentTemp.innerHTML = `${Math.round(response.data.main.temp)}°`;
  currentCity.innerHTML = response.data.name;
  humidityPercent.innerHTML = Math.round(response.data.main.humidity);
  windSpeedMPH.innerHTML = Math.round(response.data.wind.speed);
  currentDescrip.innerHTML = response.data.weather[0].description;
  dayTime.innerHTML = formatDate(response.data.dt * 1000);
  currentPic.setAttribute("src", `src/${response.data.weather[0].icon}.png`);
  currentPic.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);

}

function search(city) {
  let apiKey = "f9de746b9d23a9c915974277fc1710ae";
  let currentApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(currentApiUrl).then(displayTemperature);
}

function citySearch(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#searchBar");
  search(cityInput.value);
}

function displayCelsTemp(event) {
  event.preventDefault();
  let celsTemperature = (fahrenheitTemp - 32) / 1.8;
  fahrenheitLink.classList.remove("active");
  celsLink.classList.add("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${Math.round(celsTemperature)}°`;
}

function displayFahrenheitTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.add("active");
  celsLink.classList.remove("active");
  let currentTemp = document.querySelector("#currentTemp");
  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}°`;
}

let fahrenheitTemp = null;

let form = document.querySelector("#searchAndButton");
form.addEventListener("submit", citySearch);

let celsLink = document.querySelector("#celsLink");
celsLink.addEventListener("click", displayCelsTemp);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

search("St. Louis");