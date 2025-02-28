# Weather App - Major Cities (Network Request Checkpoint)

This project is a simple weather application that displays the current weather for major cities around the world. It fetches weather data from the WeatherAPI and displays it in a user-friendly interface.

## Features

- Displays current weather information for a list of major cities.
- Allows sorting of cities by temperature in ascending or descending order.
- Shows a loading spinner while fetching data.
- Handles errors gracefully when data for a city cannot be fetched.

## Technologies Used

- HTML
- CSS
- JavaScript

## Project Structure

```
.
├── .gitignore
├── README.md
├── src
│   ├── index.html
│   ├── styles.css
│   └── script.js
```

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/ken-gomycode/network-request-checkpoint
    ```
2. Navigate to the project directory:
    ```sh
    cd network-request-checkpoint
    ```
3. Open `index.html` in your browser to view the application.

## Usage

- The application will automatically fetch and display weather data for a predefined list of major cities.
- Click the "Sort by Temperature" button to toggle between ascending and descending order of temperatures.

## API Key

This project uses the WeatherAPI to fetch weather data. You need to replace the placeholder API key in `src/script.js` with your own API key from [WeatherAPI](https://www.weatherapi.com/).

```javascript
const apiKey = 'YOUR_API_KEY_HERE';
```

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.