document.getElementById("weatherSubmit").addEventListener("click", function(event) {

  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
  return;
  console.log(value);

  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=5191fb49566a17a0c876b31fcd639c1a";
  fetch(url)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json)
    let results = "";
    results += '<h2>Weather in ' + json.name + "</h2>";
    for (let i=0; i < json.weather.length; i++) {
      results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    }
    results += '<h2>' + json.main.temp + " &deg;F</h2>"
    results += "<p>"
    for (let i=0; i < json.weather.length; i++) {
      results += json.weather[i].description
      if (i !== json.weather.length - 1)
      results += ", "
    }
    results += "</p>";
    results += '<br><p>Wind Speed: ' + json.wind.speed + "mph<\p>"
    document.getElementById("weatherResults").innerHTML = results;
  });
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=5191fb49566a17a0c876b31fcd639c1a";
  fetch(url2)
  .then(function(response) {
    return response.json();
  }).then(function(json) {
    console.log(json)
    let forecast = "";
    for (let i=0; i < json.list.length; i++) {
      forecast += "<div class=\"three_hour\">"
      forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
      forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      forecast += "<div class=\"details\">"
      forecast += "<br><p>Temperature: " + json.list[i].main.temp + "</p>";
      forecast += "<br><p>Humidity: " + json.list[i].main.humidity + "</p>";
      forecast += "<br><p>Feels Like: " + json.list[i].main.feels_like + "</p>";
      forecast += "<\div>"
      forecast += "<\div>"
    }
    document.getElementById("forecastResults").innerHTML = forecast;
  });
});
