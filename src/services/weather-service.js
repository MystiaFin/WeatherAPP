angular.module("weatherService", []).service("WeatherService", [
  "$http",
  function ($http) {
    var apiKey = "640a58fa0d5bbc1efc7c286e2c547ed2";
    var baseUrl = "https://api.openweathermap.org/data/2.5/";

    this.getCurrentWeather = function (city) {
      return $http.get(
        `${baseUrl}weather?q=${city}&appid=${apiKey}&units=metric`
      );
    };

    this.getForecast = function (city) {
      return $http.get(
        `${baseUrl}forecast?q=${city}&appid=${apiKey}&units=metric`
      );
    };

    this.getUVIndex = function () {
      return $http
        .get(`${baseUrl}uvi?lat=-6.233513&lon=107.107101&appid=${apiKey}`)
        .then(function (response) {
          console.log("UV Index Data:", response.data); // Log data to verify
          return response;
        })
        .catch(function (error) {
          console.error("Error fetching UV Index data:", error);
        });
      // Note: Replace the latitude and longitude values with your desired location
    };
  },
]);
