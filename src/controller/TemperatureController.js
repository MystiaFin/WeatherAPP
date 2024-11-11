app.controller("TemperatureController", [
  "$scope",
  "WeatherService",
  function ($scope, WeatherService) {
    // curr temp
    $scope.temp = 0;
    $scope.humidity = 0;
    $scope.feels_like = 0;
    $scope.wind_speed = 0;
    $scope.pressure = 0;
    WeatherService.getWeatherByCity("Jakarta")
      .then(function (response) {
        $scope.temp = response.data.main.temp;
        $scope.humidity = response.data.main.humidity;
        $scope.mainIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`;
        $scope.feels_like = response.data.main.feels_like;
        $scope.wind_speed = response.data.wind.speed;
        $scope.pressure = response.data.main.pressure;
      })
      .catch(function (error) {
        console.error("Error fetching curr temp:", error);
      });

    // 5 days temps
    $scope.dayTemps = [];
    WeatherService.getForecastByCity("Jakarta")
      .then(function (response) {
        $scope.dayTemps = response.data.list.map((item) => ({
          temp: item.main.temp,
          date: new Date(item.dt * 1000),
          icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
        }));
        console.log($scope.dayTemps);
      })
      .catch(function (error) {
        console.error("Error fetching temp forecast:", error);
      });
  },
]);
