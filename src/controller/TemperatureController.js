app.controller("TemperatureController", [
  "$scope",
  "WeatherService",
  function ($scope, WeatherService) {
    $scope.temps = [];
    WeatherService.getForecastByCity("Jakarta")
      .then(function (response) {
        $scope.temps = response.data.list.map((item) => ({
          temp: item.main.temp,
          date: new Date(item.dt * 1000),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        console.log($scope.temps);
      })
      .catch(function (error) {
        console.error("Error fetching temp forecast:", error);
      });
  },
]);
