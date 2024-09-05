  // Correcting typo
let fetchBtn = document.getElementById("fetch-btn");
fetchBtn.addEventListener("click", getLocation);
let mainContainer = document.getElementsByClassName("landing-page")[0];

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert("User denied the request for Geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            alert("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            alert("An unknown error occurred.");
            break;
    }
}



function showPosition(position) {
    mainContainer.remove();

    let latValue = position.coords.latitude;
    let longValue = position.coords.longitude;
    console.log('Latitude:', latValue, 'Longitude:', longValue);
    let apiKey = "0ad5703a5773a1597f26fc27e287b8f4";
    let baseUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latValue}&lon=${longValue}&appid=${apiKey}&units=metric`;
    async function getData() {
        try {
            let response = await fetch(baseUrl);
            let data = await response.json();
            
            if (response.ok) {
                // Process and pass the data to createLoading2
                let weather = {
                    location: data.name,
                    windSpeed: data.wind.speed,
                    humidity: data.main.humidity,
                    pressure: data.main.pressure,
                    windDirection: data.wind.deg,
                    uvIndex: "N/A", // OpenWeatherMap free API doesn't provide UV index
                    feelsLike: data.main.feels_like,
                    timezone: data.timezone
                };
                createLoading2(latValue, longValue, weather);
            } else {
                console.error("Error fetching weather data:", data);
            }
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Failed to fetch weather data.');
        }
    }

    getData();
}
function createLoading2(latValue, longValue, weather) {
    let secondLanding = document.createElement("div");
    secondLanding.className = "second-landing-page";
    let innerSide = document.createElement("div");
    innerSide.innerHTML = `
        <div class="container-2">
            <div class="map-data-container">
                <div class="map-content">
                    <h3>Welcome To The Weather App</h3>
                    <p>Here is your current location</p>
                    <div class="lat-long">
                        <div class="lat">Lat: ${latValue}</div>
                        <div class="long">Long: ${longValue}</div>
                    </div>
                </div>
                <div class="map">
                    <iframe src="https://maps.google.com/maps?q=${latValue},${longValue}&z=15&output=embed"></iframe>
                </div>
            </div>
        </div>
        <div class="weather-data-container">
            <div class="weather-content">
                <h3>Your Weather Data</h3>
                <div class="weather-data">
                     <div class="weather">Location: ${weather.location || 'N/A'}</div>
                    <div>Wind Speed: ${weather.windSpeed || 'N/A'} km/h</div>
                    <div>Humidity: ${weather.humidity || 'N/A'}%</div>
                    <div>Time Zone: GMT ${weather.timezone ? weather.timezone / 3600 : 'N/A'}</div>
                    <div>Pressure: ${weather.pressure || 'N/A'} hPa</div>
                    <div>Wind Direction: ${weather.windDirection || 'N/A'}°</div>
                    <div>UV Index: ${weather.uvIndex}</div>
                    <div>Feels like: ${weather.feelsLike || 'N/A'}°C</div>
                </div>
            </div>
        </div>
    `;
    secondLanding.appendChild(innerSide);
    document.body.appendChild(secondLanding);
}
