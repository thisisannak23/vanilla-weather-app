function displayTemperature(response) {
  console.log(response.data);
  let currentTemp = document.querySelector("#currentTemp");
  let currentCity = document.querySelector("#currentCity");
  let humidityPercent = document.querySelector("#humidityPercent");
  let windSpeedMPH = document.querySelector("#windSpeedMPH");
  let currentDescrip = document.querySelector("#currentDescrip");

  currentTemp.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = (response.data.name);
  humidityPercent.innerHTML = Math.round(response.data.main.humidity);
  windSpeedMPH.innerHTML = Math.round(response.data.wind.speed);
  currentDescrip.innerHTML = (response.data.weather[0].description);
}


let apiKey = "f9de746b9d23a9c915974277fc1710ae";
let currentApiUrl =
  `https://api.openweathermap.org/data/2.5/weather?q=saint louis&appid=${apiKey}&units=imperial`;

axios.get(currentApiUrl).then(displayTemperature);

currentTemp