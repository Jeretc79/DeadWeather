$(document).ready(function () {

    setInterval(function () {
        $("#dateDisplay").text(moment().format("MMMM DD, YYYY"))
    }, 1000);

    cityList = JSON.parse(localStorage.getItem("city"));
    if (cityList === null) {
        cityList = [];
    }
    for (var i = 0; i < 5; i++) {
        var cityRow = $("<tr>");
        var cityColumn = $("<td>")
        var cityLink = $("<button>")
        cityLink.attr("class", "btn btn-light");
        cityLink.attr("city-name", cityList[i]);
        cityLink.text(cityList[i]);
        $(cityColumn).append(cityLink);
        $(cityRow).append(cityColumn);
        $("tbody").append(cityRow);

    };


    $("#submit").on("click", function () {

        var city = $("#city").val().trim();
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                lowTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
                highTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

                $("#lowDiv").text("Low of: " + lowTempFaren + "°F");
                $("#highDiv").text("High of: " + highTempFaren + "°F");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#description").text("Today's Weather: " + response.weather[0].description);
                weather_icon = response.weather[0].icon + ".png"
                $("#cityHeader").text(response.name);

                var cityRow = $("<tr>");
                var cityColumn = $("<td>");
                var cityLink = $("<button>");
                cityLink.text(response.name);
                cityLink.attr("class", "btn btn-light");
                cityLink.attr("id", "newBtn");
                cityLink.attr("city-name", response.name);
                $(cityColumn).append(cityLink);
                $(cityRow).append(cityColumn);
                $("tbody").prepend(cityRow);

                cityList = JSON.parse(localStorage.getItem("city"));
                if (cityList === null) {
                    cityList = [];
                }
                cityList.push(response.name);
                localStorage.setItem("city", JSON.stringify(cityList));

            });


        var queryURLForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURLForecast,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                localStorage.setItem("forecast", JSON.stringify(response));
                result = JSON.parse(localStorage.getItem("forecast"));
                newDays = [4, 12, 20, 28, 36]
                for (var i = 0; i < newDays.length; i++) {
                    var dayTemp = result.list[i].main.temp;
                    var dayTempFaren = Math.floor(((dayTemp - 273.15) * 1.8) + 32);
                    var dayDate = result.list[i].dt;
                    var dayHumidity = result.list[i].main.humidity;
                    var dayWindSpeed = result.list[i].wind.speed;
                    var dayWeather = result.list[i].weather[0].description;
                    var dayWeatherId = result.list[i].weather[0].main;
                    var dayIcon = result.list[i].weather[0].icon

                    $("#day" + newDays[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
                    $("#day" + newDays[i] + "_date").attr("class", "date");
                    $("#day" + newDays[i] + "_temp").text(dayTempFaren + "°F");
                    $("#day" + newDays[i] + "_humidity").text(dayHumidity + "% Humidity");
                    $("#day" + newDays[i] + "_wind").attr("class", "windText");
                    $("#day" + newDays[i] + "_wind").text("Wind: " + dayWindSpeed + " MPH");
                    $("#icon" + newDays[i]).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");
                };

                $("#weatherInfo").attr("style", "display: block");
            });

    });


    function buttonWeatherDisplay() {
        console.log($(this).attr("city-name"));
        var city2 = $(this).attr("city-name");
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" +
            city2 + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .then(function (response) {

                console.log(response);

                lowTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);
                highTempFaren = Math.floor(((response.main.temp_min - 273.15) * 1.8) + 32);

                $("#lowDiv").text("Low of: " + lowTempFaren + "°F");
                $("#highDiv").text("High of: " + highTempFaren + "°F");
                $("#humidity").text("Humidity: " + response.main.humidity + "%");
                $("#windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");
                $("#description").text("Today's Weather: " + response.weather[0].description);
                weather_icon = response.weather[0].icon + ".png"
                $("#cityHeader").text(response.name);


            });

        var queryURLForecast2 = "https://api.openweathermap.org/data/2.5/forecast?q=" +
            city2 + "&appid=1f2cf6d8fabf4123eb61df651c4f522d";

        $.ajax({
            url: queryURLForecast2,
            method: "GET"
        })

            .then(function (response) {
                console.log(response);
                localStorage.setItem("forecast", JSON.stringify(response));
                result = JSON.parse(localStorage.getItem("forecast"));
                newDays = [4, 12, 20, 28, 36]
                for (var i = 0; i < newDays.length; i++) {
                    var dayTemp = result.list[i].main.temp;
                    var dayTempFaren = Math.floor(((dayTemp - 273.15) * 1.8) + 32);
                    var dayDate = result.list[i].dt;
                    var dayHumidity = result.list[i].main.humidity;
                    var dayWindSpeed = result.list[i].wind.speed;
                    var dayWeather = result.list[i].weather[0].description;
                    var dayWeatherId = result.list[i].weather[0].main;
                    var dayIcon = result.list[i].weather[0].icon

                    $("#day" + newDays[i] + "_date").text(moment.unix(dayDate).format("MMMM Do"));
                    $("#day" + newDays[i] + "_date").attr("class", "date");
                    $("#day" + newDays[i] + "_temp").text(dayTempFaren + "°F");
                    $("#day" + newDays[i] + "_humidity").text(dayHumidity + "% Humidity");
                    $("#day" + newDays[i] + "_wind").attr("class", "windText");
                    $("#day" + newDays[i] + "_wind").text("Wind: " + dayWindSpeed + " MPH");
                    $("#icon" + newDays[i]).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");
                };

                $("#weatherInfo").attr("style", "display: block");
            });

    };

    $(".btn").on("click", buttonWeatherDisplay);



});