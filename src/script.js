const apiKey = '2262cc716b3b414fa6f202020252802';
const apiUrl = 'https://api.weatherapi.com/v1/current.json?key=';
const cities = [
    'London', 'New York', 'Tokyo', 'Paris', 'Berlin',
    'Moscow', 'Beijing', 'Delhi', 'Sydney', 'Cairo',
    'Rio de Janeiro', 'Toronto', 'Dubai', 'Mumbai',
    'Singapore', 'Seoul', 'Mexico City', 'Bangkok',
    'Hong Kong', 'Istanbul'
];

// DOM Elements
const weatherGrid = document.getElementById('weatherGrid');
const sortButton = document.getElementById('sortButton');
const loadingSpinner = document.getElementById('loadingSpinner');


const state = {
    weatherDataList: [],
    sortAscending: true,
}

// Function to fetch weather data for a city
const fetchWeather = async (city) => {
    try {
        const response = await fetch(`${apiUrl}${apiKey}&q=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error fetching weather for ${city}:`, error);
        return null;
    }
}

const displayWeatherForCities = async () => {
    weatherGrid.innerHTML = ''; // Clear previous content
    state.weatherDataList = []; // Reset the weather data list
    loadingSpinner.style.display = 'block'; // Show spinner

    const results = await Promise.all(cities.map(city => fetchWeather(city)));
    results.forEach((weatherData, index) => {
        if (weatherData) {
            state.weatherDataList.push(weatherData); // Add to the list for sorting
            createWeatherCard(weatherData);
        } else {
            // Display an error message if the city data couldn't be fetched
            const city = cities[index];
            const errorCard = document.createElement('div');
            errorCard.classList.add('weatherCard', 'error');
            errorCard.textContent = `Failed to fetch data for ${city}`;
            weatherGrid.appendChild(errorCard);
        }
    })

    loadingSpinner.style.display = 'none'; // Hide spinner after data is loaded
}

const createWeatherCard = (weatherData) => {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weatherCard');

    weatherCard.innerHTML = `
        <div>
            <h2>${weatherData.location.name}, ${weatherData.location.country}</h2>
            <p>Temperature: ${weatherData.current.temp_c}°C</p>
            <p>Description: ${weatherData.current.condition.text}</p>
            <p>Humidity: ${weatherData.current.humidity}%</p>
        </div>
        <img src="${weatherData.current.condition.icon}" alt="${weatherData.current.condition.text}">
    `;

    weatherGrid.appendChild(weatherCard);
}

const sortWeatherData = (order) => {
    if (order === 'asc') {
        state.weatherDataList.sort((a, b) => a.current.temp_c - b.current.temp_c);
    } else if (order === 'desc') {
        state.weatherDataList.sort((a, b) => b.current.temp_c - a.current.temp_c);
    }

    // Clear the grid and re-display sorted data
    weatherGrid.innerHTML = '';
    state.weatherDataList.forEach((data) => createWeatherCard(data));
}

const handleSort = () => {
    if (state.sortAscending) {
        sortWeatherData('asc');
        sortButton.textContent = 'Sort by Temperature (High to Low)';
    } else {
        sortWeatherData('desc');
        sortButton.textContent = 'Sort by Temperature (Low to High)';
    }
    state.sortAscending = !state.sortAscending; // Toggle sorting order
}

// Event listener for the sort button
sortButton.addEventListener('click', handleSort);

// Fetch and display weather data for all cities on page load
displayWeatherForCities().finally();