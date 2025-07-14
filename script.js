document.addEventListener('DOMContentLoaded', () => {
    
    // API Configuration - Using your working AccuWeather key
    const ACCUWEATHER_API_KEY = "COQ41StHSZgIASDN41mtGq7PEXPZm0ld";
    
    // DOM Elements
    const cityInput = document.getElementById('city-input');
    const getWeatherBtn = document.getElementById('get-weather-btn');
    const weatherInfo = document.getElementById('weather-info');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');

    // Add Enter key support
    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            getWeatherBtn.click();
        }
    });

    // Main weather fetch function
    getWeatherBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim();
        if (city === "") return;
        
        // Show loading state
        getWeatherBtn.classList.add('loading');
        getWeatherBtn.disabled = true;
        getWeatherBtn.textContent = 'Loading...';
        
        // Hide previous results
        weatherInfo.classList.add('hidden');
        errorMessage.classList.add('hidden');
        
        try {
            const weatherData = await fetchWeatherDataAccuWeather(city);
            displayWeatherData(weatherData);
        } catch (error) {
            console.error('Weather fetch error:', error);
            showError();
        } finally {
            // Reset button state
            getWeatherBtn.classList.remove('loading');
            getWeatherBtn.disabled = false;
            getWeatherBtn.textContent = 'Get Weather';
        }
    });

    // AccuWeather API function (2-step process)
    async function fetchWeatherDataAccuWeather(city) {
        try {
            // Step 1: Get location key
            const locationUrl = `https://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ACCUWEATHER_API_KEY}&q=${encodeURIComponent(city)}`;
            const locationResponse = await fetch(locationUrl);
            
            if (!locationResponse.ok) {
                throw new Error(`Location search failed: ${locationResponse.status}`);
            }
            
            const locationData = await locationResponse.json();
            
            if (locationData.length === 0) {
                throw new Error("City not found");
            }
            
            const locationKey = locationData[0].Key;
            const cityName = locationData[0].LocalizedName;
            const country = locationData[0].Country.LocalizedName;
            
            // Step 2: Get current weather with details
            const weatherUrl = `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&details=true`;
            const weatherResponse = await fetch(weatherUrl);
            
            if (!weatherResponse.ok) {
                throw new Error(`Weather data fetch failed: ${weatherResponse.status}`);
            }
            
            const weatherData = await weatherResponse.json();
            
            if (weatherData.length === 0) {
                throw new Error("Weather data not available");
            }
            
            const current = weatherData[0];
            
            // Step 3: Get 5-day forecast
            const forecastUrl = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}?apikey=${ACCUWEATHER_API_KEY}&metric=true`;
            const forecastResponse = await fetch(forecastUrl);
            const forecastData = await forecastResponse.json();
            
            // Transform AccuWeather data to match enhanced display format
            return {
                name: `${cityName}, ${country}`,
                main: {
                    temp: Math.round(current.Temperature.Metric.Value),
                    feels_like: Math.round(current.RealFeelTemperature.Metric.Value),
                    temp_min: Math.round(current.TemperatureSummary?.Past24HourRange?.Minimum?.Metric?.Value || current.Temperature.Metric.Value - 3),
                    temp_max: Math.round(current.TemperatureSummary?.Past24HourRange?.Maximum?.Metric?.Value || current.Temperature.Metric.Value + 3),
                    pressure: current.Pressure?.Metric?.Value || 1013,
                    humidity: current.RelativeHumidity,
                    visibility: current.Visibility?.Metric?.Value || 10
                },
                weather: [{
                    main: current.WeatherText,
                    description: current.WeatherText.toLowerCase(),
                    icon: getWeatherIcon(current.WeatherIcon)
                }],
                wind: {
                    speed: current.Wind?.Speed?.Metric?.Value || 0,
                    deg: current.Wind?.Direction?.Degrees || 0,
                    direction: current.Wind?.Direction?.English || 'N'
                },
                clouds: {
                    all: current.CloudCover || 0
                },
                sys: {
                    sunrise: new Date().getTime() + (6 * 60 * 60 * 1000), // Mock sunrise
                    sunset: new Date().getTime() + (18 * 60 * 60 * 1000)  // Mock sunset
                },
                dt: new Date(current.LocalObservationDateTime).getTime() / 1000,
                timezone: current.TimeZoneOffset || 0,
                uv: current.UVIndex || 0,
                forecast: forecastData.DailyForecasts ? forecastData.DailyForecasts.map(day => ({
                    date: new Date(day.Date).toLocaleDateString('en-US', { weekday: 'short' }),
                    temp_min: Math.round(day.Temperature.Minimum.Value),
                    temp_max: Math.round(day.Temperature.Maximum.Value),
                    description: day.Day.IconPhrase,
                    icon: getWeatherIcon(day.Day.Icon)
                })) : []
            };
            
        } catch (error) {
            console.error('AccuWeather API Error:', error);
            throw error;
        }
    }

    // Helper function to map AccuWeather icons
    function getWeatherIcon(iconNumber) {
        const iconMap = {
            1: "01d", 2: "02d", 3: "02d", 4: "02d", 5: "02d", 6: "03d",
            7: "04d", 8: "04d", 11: "50d", 12: "09d", 13: "10d", 14: "10d",
            15: "11d", 16: "11d", 17: "11d", 18: "09d", 19: "13d", 20: "13d",
            21: "13d", 22: "13d", 23: "13d", 24: "50d", 25: "50d", 26: "09d",
            29: "09d", 30: "01d", 31: "01n", 32: "02n", 33: "01n", 34: "02n",
            35: "02n", 36: "03n", 37: "04n", 38: "04n", 39: "09n", 40: "10n",
            41: "11n", 42: "11n", 43: "13n", 44: "13n"
        };
        return iconMap[iconNumber] || "01d";
    }

    // Enhanced display function with full weather details
    function displayWeatherData(data) {
        console.log('Weather data:', data);
        
        const { name, main, weather, wind, sys, uv, forecast } = data;
        
        // Update basic weather information
        cityNameDisplay.textContent = name;
        temperatureDisplay.textContent = `${main.temp}°C`;
        descriptionDisplay.textContent = `${weather[0].description}`;
        
        // Create detailed weather information HTML
        const detailsHTML = `
            <div class="weather-details-grid">
                <div class="detail-card">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-content">
                        <div class="detail-label">Feels Like</div>
                        <div class="detail-value">${main.feels_like}°C</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">💧</div>
                    <div class="detail-content">
                        <div class="detail-label">Humidity</div>
                        <div class="detail-value">${main.humidity}%</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">💨</div>
                    <div class="detail-content">
                        <div class="detail-label">Wind Speed</div>
                        <div class="detail-value">${wind.speed} km/h</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">🧭</div>
                    <div class="detail-content">
                        <div class="detail-label">Wind Direction</div>
                        <div class="detail-value">${wind.direction || 'N/A'}</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">📊</div>
                    <div class="detail-content">
                        <div class="detail-label">Pressure</div>
                        <div class="detail-value">${main.pressure} hPa</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">👁️</div>
                    <div class="detail-content">
                        <div class="detail-label">Visibility</div>
                        <div class="detail-value">${main.visibility} km</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">☀️</div>
                    <div class="detail-content">
                        <div class="detail-label">UV Index</div>
                        <div class="detail-value">${uv}</div>
                    </div>
                </div>
                <div class="detail-card">
                    <div class="detail-icon">🌡️</div>
                    <div class="detail-content">
                        <div class="detail-label">Min/Max</div>
                        <div class="detail-value">${main.temp_min}°/${main.temp_max}°C</div>
                    </div>
                </div>
            </div>
        `;
        
        // Create forecast HTML
        const forecastHTML = forecast.length > 0 ? `
            <div class="forecast-section">
                <h3 class="forecast-title">5-Day Forecast</h3>
                <div class="forecast-container">
                    ${forecast.map(day => `
                        <div class="forecast-card">
                            <div class="forecast-day">${day.date}</div>
                            <div class="forecast-icon">🌤️</div>
                            <div class="forecast-temp-max">${day.temp_max}°</div>
                            <div class="forecast-temp-min">${day.temp_min}°</div>
                            <div class="forecast-desc">${day.description}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        ` : '';
        
        // Add details and forecast to weather info
        let existingDetails = weatherInfo.querySelector('.weather-details-grid');
        if (existingDetails) {
            existingDetails.remove();
        }
        let existingForecast = weatherInfo.querySelector('.forecast-section');
        if (existingForecast) {
            existingForecast.remove();
        }
        
        weatherInfo.insertAdjacentHTML('beforeend', detailsHTML + forecastHTML);
        
        // Add weather-specific styling
        updateWeatherTheme(weather[0].main);
        
        // Show weather info with animation
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        
        // Add success animation
        weatherInfo.style.animation = 'fadeInUp 0.5s ease-out';
    }

    // Enhanced error display
    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
        errorMessage.style.animation = 'shake 0.5s ease-in-out';
    }

    // Weather theme updater
    function updateWeatherTheme(weatherType) {
        const body = document.body;
        
        // Remove existing weather classes
        body.classList.remove('sunny', 'rainy', 'cloudy', 'snowy', 'stormy');
        
        // Add appropriate class based on weather
        const weatherLower = weatherType.toLowerCase();
        if (weatherLower.includes('sun') || weatherLower.includes('clear')) {
            body.classList.add('sunny');
        } else if (weatherLower.includes('rain') || weatherLower.includes('drizzle')) {
            body.classList.add('rainy');
        } else if (weatherLower.includes('cloud')) {
            body.classList.add('cloudy');
        } else if (weatherLower.includes('snow')) {
            body.classList.add('snowy');
        } else if (weatherLower.includes('storm') || weatherLower.includes('thunder')) {
            body.classList.add('stormy');
        }
    }

    // Add some fun interactions
    let clickCount = 0;
    getWeatherBtn.addEventListener('click', () => {
        clickCount++;
        if (clickCount === 10) {
            showEasterEgg();
        }
    });

    function showEasterEgg() {
        const container = document.querySelector('.container');
        container.style.animation = 'rainbow 2s ease-in-out';
        setTimeout(() => {
            container.style.animation = '';
            clickCount = 0;
        }, 2000);
    }
});