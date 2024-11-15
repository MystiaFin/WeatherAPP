app.controller("TemperatureController", [
  "$scope",
  "WeatherService",
  function ($scope, WeatherService) {
    // curr temp
    $scope.temp = 0;
    $scope.humidity = 0;
    $scope.feels_like = 0;
    $scope.temp_min = 0;
    $scope.temp_max = 0;
    WeatherService.getWeatherByCity("Jakarta")
      .then(function (response) {
        $scope.temp = response.data.main.temp;
        $scope.humidity = response.data.main.humidity;
        $scope.mainIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`;
        $scope.feels_like = response.data.main.feels_like;
        $scope.temp_min = response.data.main.temp_min;
        $scope.temp_max = response.data.main.temp_max;
      })
      .catch(function (error) {
        console.error("Error fetching curr temp:", error);
      });

    // today temps and future temps
    $scope.dayTemps = [];
    $scope.futureTemps = [];
    WeatherService.getForecastByCity("Jakarta")
      .then(function (response) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const days = response.data.list.map((item) => {
          const itemDate = new Date(item.dt * 1000);
          return {
            temp: item.main.temp,
            date: itemDate,
            hour: itemDate.getHours() + ":00",
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          };
        });

        $scope.dayTemps = days.filter((item) => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate.getTime() === today.getTime();
        });
        console.log($scope.dayTemps);

        $scope.futureTemps = days.filter((item) => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate.getTime() !== today.getTime();
        });
      })
      .catch(function (error) {
        console.error("Error fetching temp forecast:", error);
      });
  },
]);
