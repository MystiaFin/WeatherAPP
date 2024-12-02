  // src/pages/airpolution/airpolution-script.js

  async function fetchAirPollutionData(latitude, longitude) {
    try {
        const response = await fetch(`/api/airpollution/city/${cityName}`);
      const data = await response.json();
      displayAirPollutionData(data);
    } catch (error) {
      console.error('Error fetching air pollution data:', error);
    }
  }
  
  function displayAirPollutionData(data) {
    const container = document.getElementById('air-pollution-data');
    container.innerHTML = `
      <p>CO: ${data.list[0].components.co}</p>
      <p>NO: ${data.list[0].components.no}</p>
      <p>NO2: ${data.list[0].components.no2}</p>
      <p>O3: ${data.list[0].components.o3}</p>
      <p>SO2: ${data.list[0].components.so2}</p>
      <p>PM2.5: ${data.list[0].components.pm2_5}</p>
      <p>PM10: ${data.list[0].components.pm10}</p>
      <p>NH3: ${data.list[0].components.nh3}</p>
    `;
  }

  