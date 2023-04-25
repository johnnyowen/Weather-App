var searchButton = $('#search-button');
searchButton.on('click', captureInput);
var searchHistoryEl = $('#searchHistory');
var searchList = [];

function captureInput() {
    var citySearch = $('#citySearch').val();
    searchList.push(citySearch)
    console.log(searchList)
  };

function convertCitytoCoord() {
// geocodes city to lat lon
var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=tucson&limit=&appid=79bbf307779d2f0208bec97652345b71"
fetch(geocodeAPI)
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    console.log(data[0].lat)
    console.log(data[0].lon)
    // use this data to convert city to coord
  })
}
convertCitytoCoord();

var topCity = $('#topCity')
var topDate = $('#topDate')
var topIcon = $('#topIcon')
var topTemp = $('#topTemp')
var topWind = $('#topWind')
var topHumid = $('#topHumid')

function displayWeather(data) {
  topCity.text(data.city.name)
  topDate.text(data.list[0].dt_txt)
  topIcon.attr('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png')
  topTemp.text(data.list[0].main.temp + ' F')
  topWind.text(data.list[0].wind.speed + 'mph')
  topHumid.text(data.list[0].main.humidity + '% Humidity')
}

// var lat = data[0].lat
// var lon = data[0].lon
var lat = 32.340015
var lon = -111.029370

function getData() {
  // var url = "https://api.openweathermap.org/data/2.5/forecast?lat=32.340015&lon=-111.029370&appid=79bbf307779d2f0208bec97652345b71&units=imperial"

  var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"

  fetch(url)
  .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
  displayWeather(data)
  })
}
  getData();
