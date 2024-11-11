const weatherIconMap = {
  Clear: "src/assets/w-clear.svg",
  Rain: "src/assets/w-drizzle-1.svg",
  Clouds: "src/assets/w-cloud-1.svg",
  Snow: "src/assets/w-snow.svg",
  Thunderstorm: "src/assets/w-thunderstorm-1.svg",
  Drizzle: "src/assets/w-drizzle-2.svg",
  Mist: "src/assets/w-cloud-2.svg",
  Smoke: "src/assets/w-cloud-3.svg",
  Dust: "src/assets/w-cloud-3.svg",
  Fog: "src/assets/w-cloud-3.svg",
};

app.controller("HomeController", function ($scope) {
  $scope.selectedCity = "Jakarta";
  $scope.cities = ["Jakarta", "New York"];

  $scope.changeCity = function (city) {
    $scope.selectedCity = city;
  };
});

app.controller("HomeForecast", function ($scope, WeatherService) {
  $scope.forecast = [];
  $scope.loading = true;

  function loadForecast() {
    $scope.loading = true;
    WeatherService.getForecastByCity($scope.$parent.selectedCity)
      .then(function (response) {
        $scope.forecast = response.data.list.map((item) => {
          const weatherMain = item.weather[0].main;
          const localIcon = weatherIconMap[weatherMain];
          const defaultIcon = `http://openweathermap.org/img/w/${item.weather[0].icon}.png`;
          const date = new Date(item.dt * 1000);

          return {
            weather: weatherMain,
            icon: localIcon ? localIcon : defaultIcon,
            date: new Date(item.dt * 1000),
            hour: date.getHours() + ":00",
          };
        });
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error("Error fetching forecast:", error);
        $scope.loading = false;
      });
  }

  $scope.$watch("$parent.selectedCity", function () {
    loadForecast();
  });
});
