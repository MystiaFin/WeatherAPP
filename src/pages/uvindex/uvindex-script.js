angular.module("WeatherAPP").controller("UVIndexController", [
  "$scope",
  "WeatherService",
  function ($scope, WeatherService) {
    // Load detailed UV Index data for UV Index page
    WeatherService.getUVIndex().then(function (response) {
      var uvValue = response.data.value;
      $scope.uvIndex = {
        current: uvValue,
        riskLevel: getRiskLevel(uvValue),
        recommendation: getRecommendation(uvValue),
      };
    });

    // Function to determine risk level based on UV index value
    function getRiskLevel(value) {
      if (value <= 2) return "Low";
      else if (value <= 5) return "Moderate";
      else if (value <= 7) return "High";
      else if (value <= 10) return "Very High";
      return "Extreme";
    }

    // Function to provide recommendations based on risk level
    function getRecommendation(value) {
      if (value <= 2)
        return "Low risk. You can safely enjoy outdoor activities.";
      else if (value <= 5)
        return "Moderate risk. Wear sunglasses and sunscreen if outside.";
      else if (value <= 7)
        return "High risk. Reduce time in direct sun, use SPF 30+ sunscreen.";
      else if (value <= 10)
        return "Very high risk. Avoid direct sun, wear SPF 50+ sunscreen, and protective clothing.";
      return "Extreme risk. Avoid being outside, if possible, and take maximum precautions.";
    }
  },
]);
