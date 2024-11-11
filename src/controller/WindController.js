app.controller("WindController", function ($scope, WindService) {
  $scope.selectedCity = "Jakarta";
  $scope.cities = ["Jakarta", "New York"]; // Ganti dengan nama kota yang diinginkan
  $scope.windData = {};
  $scope.loading = true;

  function loadWind() {
    $scope.loading = true;
    WindService.getWindByCity($scope.selectedCity)
      .then(function (response) {
        $scope.windData = response.data;
        $scope.loading = false;
      })
      .catch(function (error) {
        console.error("Error fetching wind data:", error);
        $scope.loading = false;
      });
  }

  $scope.changeCity = function (city) {
    $scope.selectedCity = city;
    loadWind();
  };

  // Load initial forecast
  loadWind();
});
