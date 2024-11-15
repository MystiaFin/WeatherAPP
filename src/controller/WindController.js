app.controller("WindController", [
  "$scope",
  "WindService",
  function ($scope, WindController) {
    $scope.selectedCity = "Jakarta";
    $scope.cities = ["Jakarta", "New York"];
    $scope.speed = 0;
    $scope.deg = 0;
    $scope.gust = 0;
    $scope.pressure = 0;
    $scope.visibility = 0;

    WindController.getWeatherByCity($scope.selectedCity)
      .then(function (response) {
        $scope.visibility = response.data.visibility;
        $scope.pressure = response.data.main.pressure;
        $scope.mainIcon = `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@4x.png`;
        $scope.speed = response.data.wind.speed;
        $scope.deg = response.data.wind.deg;
        $scope.gust = response.data.wind.gust;

        const days = response.data.list.map((item) => {
          const itemDate = new Date(item.dt * 1000);
          return {
            temp: item.main.temp,
            date: itemDate,
            hour: itemDate.getHours() + ":00",
            icon: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
          };
        });
      })
      .catch(function (error) {
        console.error("Error fetching curr temp:", error);
      });

    // WindController.getWindByCity($scope.selectedCity)
    //   .then(function (response) {
    //     $scope.speed = response.data.speed;
    //     $scope.deg = response.data.deg;
    //     $scope.gust = response.data.gust;
    //   })
    //   .catch(function (error) {
    //     console.error("Error fetching curr temp:", error);
    //   });

    $scope.dayTemps = [];
    $scope.futureTemps = [];
    WindController.getForecastByCity($scope.selectedCity)
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

        // $scope.dayTemps = days.filter((item) => {
        //   const itemDate = new Date(item.date);
        //   itemDate.setHours(0, 0, 0, 0);
        //   return itemDate.getTime() === today.getTime();
        // });
        // console.log($scope.dayTemps);

        // $scope.futureTemps = days.filter((item) => {
        //   const itemDate = new Date(item.date);
        //   itemDate.setHours(0, 0, 0, 0);
        //   return itemDate.getTime() !== today.getTime();
        // });
      })
      .catch(function (error) {
        console.error("Error fetching temp forecast:", error);
      });
  },
]);
