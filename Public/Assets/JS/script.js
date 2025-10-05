
// clock
(() => {

    const hours = Selector(".hours");
    const minutes = Selector('.minutes');
    const seconds = Selector('.seconds');

    const checkbox = document.getElementById('switch');
    const img = document.getElementById("shops");

    // setInterval method
    setInterval(() => {
        const time = new Date();
        hours.textContent = time.getHours() < 10 ? `0${time.getHours()}` : time.getHours();
        minutes.textContent = time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes();
        seconds.textContent = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds();
    }, 1000);
})();

function Selector(element) {
    return document.querySelector(element);
}


// weatherForecast

async function getWeather() {
  const apiKey = "cbdb848e22654240a63173342250410"; 
  const city = document.getElementById("citySelect").value;
  const resultsContainer = document.getElementById("api-results");

  resultsContainer.textContent = "Loading weather...";

  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data); 

    
    const temp = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    
    resultsContainer.innerHTML = `
      <h3>Weather in ${city}</h3>
      <p><strong>Temperature:</strong> ${temp} °C</p>
      <p><strong>Condition:</strong> ${condition}</p>
      <img src="https:${icon}" alt="${condition}">
    `;

  } catch (error) {
    console.error("Error fetching or displaying data:", error);
    resultsContainer.textContent = "Failed to load weather data.";
  }
}
