var searchButton = $('#search-button');
var searchHistoryEl = $('#searchHistory');
var historyList = JSON.parse(localStorage.getItem("storedCitiesArray")) || [];
// var historyButtonEl = $('.historyButton')
searchButton.on('click', captureInput);
// historyButtonEl.on('click', bringBackData);

// function bringBackData() {

//   console.log(input.value)
//   // getWeather()
// };
function test(test) {
  console.log(test)
}

function renderSavedData() {
  searchHistoryEl.text('')
  for (var i = 0; i < historyList.length; i++)
  $('<input type="text" readonly="true" onclick="test(' + historyList[i] + ')">').text(historyList[i]).attr('value', historyList[i]).appendTo(searchHistoryEl)
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
      // console.log(data)
      var lat = data[0].lat
      var lon = data[0].lon


      var urlCurrent = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"
      fetch(urlCurrent)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data)
          var date = new Date(data.dt * 1000);
          $('#topCity').text(data.name);
          $('#topDate').text(date);
          $('#topIcon').attr('src', 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png').attr('alt', data.weather[0].description);
          $('#topDesc').text(data.weather[0].description);
          $('#topTemp').text(data.main.temp + ' F');
          $('#topWind').text(data.wind.speed + 'mph');
          $('#topHumid').text(data.main.humidity + '% Humidity');
      })
      //uses coord to search 5 day forcast
      var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=79bbf307779d2f0208bec97652345b71&units=imperial"
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data)
      $('#day1date').text(new Date(data.list[8].dt_txt));
      $('#day1icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[8].weather[0].icon + '.png').attr('alt', data.list[8].weather[0].description);
      $('#day1Desc').text(data.list[8].weather[0].description);
      $('#day1temp').text(data.list[8].main.temp + ' F');
      $('#day1wind').text(data.list[8].wind.speed + 'mph');
      $('#day1humid').text(data.list[8].main.humidity + '% Humidity');
    
      $('#day2date').text(new Date(data.list[16].dt_txt));
      $('#day2icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[16].weather[0].icon + '.png').attr('alt', data.list[16].weather[0].description);
      $('#day2Desc').text(data.list[16].weather[0].description);
      $('#day2temp').text(data.list[16].main.temp + ' F');
      $('#day2wind').text(data.list[16].wind.speed + 'mph');
      $('#day2humid').text(data.list[16].main.humidity + '% Humidity');
    
      $('#day3date').text(new Date(data.list[24].dt_txt));
      $('#day3icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[24].weather[0].icon + '.png').attr('alt', data.list[24].weather[0].description);
      $('#day3Desc').text(data.list[24].weather[0].description);
      $('#day3temp').text(data.list[24].main.temp + ' F');
      $('#day3wind').text(data.list[24].wind.speed + 'mph');
      $('#day3humid').text(data.list[24].main.humidity + '% Humidity');
    
      $('#day4date').text(new Date(data.list[32].dt_txt));
      $('#day4icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[32].weather[0].icon + '.png').attr('alt', data.list[32].weather[0].description);
      $('#day4Desc').text(data.list[32].weather[0].description);
      $('#day4temp').text(data.list[32].main.temp + ' F');
      $('#day4wind').text(data.list[32].wind.speed + 'mph');
      $('#day4humid').text(data.list[32].main.humidity + '% Humidity');
    
      $('#day5date').text(new Date(data.list[39].dt_txt));
      $('#day5icon').attr('src', 'http://openweathermap.org/img/w/' + data.list[39].weather[0].icon + '.png').attr('alt', data.list[39].weather[0].description);
      $('#day5Desc').text(data.list[39].weather[0].description);
      $('#day5temp').text(data.list[39].main.temp + ' F');
      $('#day5wind').text(data.list[39].wind.speed + 'mph');
      $('#day5humid').text(data.list[39].main.humidity + '% Humidity');
    });
  });
};