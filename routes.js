angular.module("WeatherAPP", ["ngRoute"]).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "src/pages/home/home.html",
      })
      .when("/forecast", {
        templateUrl: "src/pages/forecast/forecast.html",
      })
      .when("/temperature", {
        templateUrl: "src/pages/temperature/temperature.html",
      })
      .when("/airpolution", {
        templateUrl: "src/pages/airpolution/airpolution.html",
      })
      .when("/uvindex", {
        templateUrl: "src/pages/uvindex/uvindex.html"
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);
