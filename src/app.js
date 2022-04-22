function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayTemperature(response) {
  let currentTemp = document.querySelector("#currentTemp");
  let currentCity = document.querySelector("#currentCity");
  let humidityPercent = document.querySelector("#humidityPercent");
  let windSpeedMPH = document.querySelector("#windSpeedMPH");
  let currentDescrip = document.querySelector("#currentDescrip");
  let dayTime = document.querySelector("#dayTime");
  let currentPic = document.querySelector("#currentPic");


  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = (response.data.name);
  humidityPercent.innerHTML = Math.round(response.data.main.humidity);
  windSpeedMPH.innerHTML = Math.round(response.data.wind.speed);
  currentDescrip.innerHTML = (response.data.weather[0].description);
  dayTime.innerHTML = formatDate(response.data.dt * 1000);
  currentPic.innerHTML = `${response.data.}`;
}


let apiKey = "f9de746b9d23a9c915974277fc1710ae";
let city = "Chicago"
let currentApiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

axios.get(currentApiUrl).then(displayTemperature);

currentTemp