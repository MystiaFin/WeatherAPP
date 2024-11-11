var app = angular.module("WeatherAPP", ["ngRoute"]).config([
  "$routeProvider",
  "$locationProvider",
  function ($routeProvider, $locationProvider) {
    $locationProvider.hashPrefix("");
    $routeProvider
      .when("/", {
        templateUrl: "src/pages/home.html",
        controller: "HomeController",
      })
      .when("/forecast", {
        templateUrl: "src/pages/forecast.html",
      })
      .when("/temperature", {
        templateUrl: "src/pages/temperature/temperature.html",
      })
      .when("/airpolution", {
        templateUrl: "src/pages/airpolution/airpolution.html",
        controller: "AirPolutionController",
      })      
      .when("/uvindex", {
        templateUrl: "src/pages/uvindex/uvindex.html",
        controller: "UVIndexController",
      })
      .otherwise({
        redirectTo: "/",
      });
  },
]);



