$(document).ready(() => {

    const omdb = require("../../omdb");

    const textOne = $(".text1");
    



    const cityEl = $("<h1>");
    const tempetureEl = $("<h5>");
    const humidityEl = $("<h5>");
    const windSpeedEl = $("<h5>");
    const dateEl = $("<h5>");
    cityEl.addClass("");
    cityEl.attr("data-name");
    cityEl.text(apiCityName);
    dateEl.text(monthDayYear);
    tempetureEl.text("Temperature: " + temperature);
    humidityEl.text("Humidity: " + apiHumidity);
    windSpeedEl.text("Wind speed: " + windSpeed);
    // uvIndexEl.text(apiUvIndex);
    // forecastEl.text(forecast);
    $("#current-weather").append(cityEl);
    $("#current-weather").append(dateEl);
    $("#current-weather").append(tempetureEl);
    $("#current-weather").append(humidityEl);
    $("#current-weather").append(windSpeedEl);

})