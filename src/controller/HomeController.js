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

app.controller("HomeTemperature", function ($scope, WeatherService) {
  $scope.loading = true;

  $scope.temp = 0;
  $scope.feels_like = 0;
  $scope.humidity = 0;
  $scope.temp_min = 0;
  $scope.temp_max = 0;

  function loadTemperature() {
    $scope.loading = true;
    WeatherService.getWeatherByCity($scope.$parent.selectedCity)
      .then(function (response) {
        $scope.temp = response.data.main.temp;
        $scope.feels_like = response.data.main.feels_like;
        $scope.humidity = response.data.main.humidity;
        $scope.temp_min = response.data.main.temp_min;
        $scope.temp_max = response.data.main.temp_max;
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error("Error fetching temperature:", error);
        $scope.loading = false;
      });
  }

  $scope.$watch("$parent.selectedCity", function () {
    loadTemperature();
  });
});

app.controller("HomeWind", function ($scope, WeatherService) {
  $scope.loading = true;

  $scope.speed = 0;
  $scope.deg = 0;
  $scope.gust = 0;

  function loadWind() {
    $scope.loading = true;
    WeatherService.getWeatherByCity($scope.$parent.selectedCity)
      .then(function (response) {
        $scope.speed = response.data.wind.speed;
        $scope.deg = response.data.wind.deg;
        $scope.gust = response.data.wind.gust;
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error("Error fetching wind:", error);
        $scope.loading = false;
      });
  }

  $scope.$watch("$parent.selectedCity", function () {
    loadWind();
  });
});

app.controller("HomeAirQuality", function ($scope, AirPolutionService) {
  $scope.airQualityStatus = "Loading...";
  $scope.coLevel = 0;

  function loadAirQuality() {
    AirPolutionService.getAirPolutionByCity($scope.$parent.selectedCity)
      .then(function (response) {
        const aqi = response.data.aqi;

        if (aqi <= 50) {
          $scope.airQualityStatus = "Good";
        } else if (aqi <= 100) {
          $scope.airQualityStatus = "Moderate";
        } else if (aqi <= 150) {
          $scope.airQualityStatus = "Unhealthy for Sensitive Groups";
        } else if (aqi <= 200) {
          $scope.airQualityStatus = "Unhealthy";
        } else if (aqi <= 300) {
          $scope.airQualityStatus = "Very Unhealthy";
        } else {
          $scope.airQualityStatus = "Hazardous";
        }
      })
      .catch(function (error) {
        console.error("Error fetching air quality data:", error);
        $scope.airQualityStatus = "Error";
      });
  }

  $scope.$watch("$parent.selectedCity", function () {
    loadAirQuality();
  });
});
