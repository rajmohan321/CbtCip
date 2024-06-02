document.addEventListener("DOMContentLoaded", () => {
  const getWeatherButton = document.getElementById("get-weather-button");
  const cityInput = document.getElementById("city-input");
  const weatherResult = document.getElementById("weather-result");

  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY"; // Replace with your OpenWeatherMap API key

  async function fetchWeather(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
      const data = await response.json();
      displayWeather(data);
    } catch (error) {
      weatherResult.innerHTML = `<p>Error: ${error.message}</p>`;
    }
  }

  function displayWeather(data) {
    const { name, main, weather } = data;
    weatherResult.innerHTML = `
      <h2>Weather in ${name}</h2>
      <p>Temperature: ${main.temp} °C</p>
      <p>Humidity: ${main.humidity} %</p>
      <p>Condition: ${weather[0].description}</p>
    `;
  }

  getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  });
});
