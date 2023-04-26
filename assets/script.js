var searchButton = $('#search-button');
searchButton.on('click', captureInput);
var searchHistoryEl = $('#searchHistory');
var searchList = [];
var historyList = [];

function getSavedData() {
  var storedCities = JSON.parse(localStorage.getItem('storedCitiesArray'))
  if (storedCities !== null)
  historyList = storedCities;
  renderSavedData()
}
getSavedData();

function renderSavedData() {
  for (var i = 0; i < historyList.length; i++)
  $('<button>').text(historyList[i]).attr('id', historyList[i]).appendTo(searchHistoryEl)
}
renderSavedData();

function captureInput() {
    var citySearch = $('#citySearch').val();
    searchList.push(citySearch)
    localStorage.setItem('storedCitiesArray', JSON.stringify(searchList));
    // geocodes city to lat lon
    var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + citySearch + "&limit=&appid=79bbf307779d2f0208bec97652345b71"
    fetch(geocodeAPI)
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
      console.log(data)
      var lat = data[0].lat
      var lon = data[0].lon
      //uses coord to search 5 day forcast
      var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data)
      displayWeather(data)
    })
  })
};
//displays data from 5 day forcast
function displayWeather(data) {
  $('#topCity').text(data.city.name)
  $('#topDate').text(data.list[0].dt_txt)
  $('#topIcon').attr('src', 'http://openweathermap.org/img/w/' + data.list[0].weather[0].icon + '.png')
  $('#topTemp').text(data.list[0].main.temp + ' F')
  $('#topWind').text(data.list[0].wind.speed + 'mph')
  $('#topHumid').text(data.list[0].main.humidity + '% Humidity')

  $('#day1date').text(data.list[8].dt_txt)
  $('#day1icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png')
  $('#day1temp').text(data.list[8].main.temp + ' F')
  $('#day1wind').text(data.list[8].wind.speed + 'mph')
  $('#day1humid').text(data.list[8].main.humidity + '% Humidity')

  $('#day2date').text(data.list[16].dt_txt)
  $('#day2icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png')
  $('#day2temp').text(data.list[16].main.temp + ' F')
  $('#day2wind').text(data.list[16].wind.speed + 'mph')
  $('#day2humid').text(data.list[16].main.humidity + '% Humidity')

  $('#day3date').text(data.list[24].dt_txt)
  $('#day3icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png')
  $('#day3temp').text(data.list[24].main.temp + ' F')
  $('#day3wind').text(data.list[24].wind.speed + 'mph')
  $('#day3humid').text(data.list[24].main.humidity + '% Humidity')

  $('#day4date').text(data.list[32].dt_txt)
  $('#day4icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[32].weather[0].icon + '.png')
  $('#day4temp').text(data.list[32].main.temp + ' F')
  $('#day4wind').text(data.list[32].wind.speed + 'mph')
  $('#day4humid').text(data.list[32].main.humidity + '% Humidity')

  $('#day5date').text(data.list[39].dt_txt)
  $('#day5icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[39].weather[0].icon + '.png')
  $('#day5temp').text(data.list[39].main.temp + ' F')
  $('#day5wind').text(data.list[39].wind.speed + 'mph')
  $('#day5humid').text(data.list[39].main.humidity + '% Humidity')
}