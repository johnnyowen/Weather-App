var searchButton = $('#search-button');
var searchHistoryEl = $('#searchHistory');
var clearHistoryEl = $('#clearHistory')
var historyList = JSON.parse(localStorage.getItem("storedCitiesArray")) || [];
searchButton.on('click', captureInput);
clearHistoryEl.on('click', clearHistory)

function renderSavedData() {
  searchHistoryEl.text('')
  for (var i = 0; i < historyList.length; i++)
  $('<input class="form-control searchButtons m-2" type="text" readonly="true" onclick="bringBackData(' + historyList[i] + ')">').text(historyList[i]).attr('value', historyList[i]).appendTo(searchHistoryEl)
};

renderSavedData();

function captureInput() {
  var citySearch = $('#citySearch').val();
  getWeather(citySearch);
  historyList.push(citySearch)
  localStorage.setItem('storedCitiesArray', JSON.stringify(historyList));
  renderSavedData();
};

function getWeather(city) {
  // geocodes city to lat lon
  var geocodeAPI = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=&appid=79bbf307779d2f0208bec97652345b71"
  fetch(geocodeAPI)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    var lat = data[0].lat
    var lon = data[0].lon
    //uses coord to get current weather
    var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"
    fetch(urlCurrent)
    .then(function (response) {
      return response.json();
    })
    //places data in top card
    .then(function (data) {
        var date = new Date(data.dt * 1000);
        $('#topCity').text(data.name);
        $('#topDate').text(date);
        $('#topIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png').attr('alt', data.weather[0].description);
        $('#topDesc').text(data.weather[0].description);
        $('#topTemp').text('-->Temp:' + data.main.temp + '\u00B0F');
        $('#topWind').text('-->Wind Speed:' + data.wind.speed + 'mph');
        $('#topHumid').text('-->' + data.main.humidity + '% Humidity');
      })
      //uses coord to search 5 day forcast
      var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"
      fetch(url)
      .then(function (response) {
        return response.json();
      })
      //places data in 5 day forcast cards
      .then(function (data) {
        $('#day1date').text(new Date(data.list[4].dt_txt));
        $('#day1icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[4].weather[0].icon + '.png').attr('alt', data.list[8].weather[0].description);
        $('#day1Desc').text(data.list[4].weather[0].description);
        $('#day1temp').text(data.list[4].main.temp + '\u00B0F');
        $('#day1wind').text(data.list[4].wind.speed + 'mph');
        $('#day1humid').text(data.list[4].main.humidity + '% Humidity');
        
        $('#day2date').text(new Date(data.list[12].dt_txt));
        $('#day2icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[12].weather[0].icon + '.png').attr('alt', data.list[16].weather[0].description);
        $('#day2Desc').text(data.list[12].weather[0].description);
        $('#day2temp').text(data.list[12].main.temp + '\u00B0F');
        $('#day2wind').text(data.list[12].wind.speed + 'mph');
        $('#day2humid').text(data.list[12].main.humidity + '% Humidity');
        
        $('#day3date').text(new Date(data.list[20].dt_txt));
        $('#day3icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[20].weather[0].icon + '.png').attr('alt', data.list[24].weather[0].description);
        $('#day3Desc').text(data.list[20].weather[0].description);
        $('#day3temp').text(data.list[20].main.temp + '\u00B0F');
      $('#day3wind').text(data.list[20].wind.speed + 'mph');
      $('#day3humid').text(data.list[20].main.humidity + '% Humidity');
      
      $('#day4date').text(new Date(data.list[28].dt_txt));
      $('#day4icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[28].weather[0].icon + '.png').attr('alt', data.list[32].weather[0].description);
      $('#day4Desc').text(data.list[28].weather[0].description);
      $('#day4temp').text(data.list[28].main.temp + '\u00B0F');
      $('#day4wind').text(data.list[28].wind.speed + 'mph');
      $('#day4humid').text(data.list[28].main.humidity + '% Humidity');
      
      $('#day5date').text(new Date(data.list[36].dt_txt));
      $('#day5icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[36].weather[0].icon + '.png').attr('alt', data.list[39].weather[0].description);
      $('#day5Desc').text(data.list[36].weather[0].description);
      $('#day5temp').text(data.list[36].main.temp + '\u00B0F');
      $('#day5wind').text(data.list[36].wind.speed + 'mph');
      $('#day5humid').text(data.list[36].main.humidity + '% Humidity');
    });
  });
};

function bringBackData(oldCity) {
  var x = oldCity
  console.log(x)
}

function clearHistory() {
  localStorage.clear();
  historyList = [];
  renderSavedData();
}