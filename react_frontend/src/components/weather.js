import React, { useState, useEffect } from 'react';
import styles from './styles/weather.module.css';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [zipcode, setZipcode] = useState('65802')

  // Fetch weather data
  const fetchWeather = async (zip) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?zip=${zip},US&appid=2d05ab30742b95034d8afd9a18685777&units=imperial`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setWeatherData(null);
      setError('Unable to retrieve weather for the given ZIP code.');
    }
  };

  useEffect(() => {
    fetchWeather(zipcode);
  }, []);
  const handleZipChange = (e) => {
    setZipcode(e.target.value);
  };
  const handleFindWeather = () => {
    fetchWeather(zipcode);
  };

  return (
    <div id="searchBox" className={styles['weather-page']}>
      <div>
        {weatherData ? (
          <div className={styles['weatherData']}>
            <h2>{weatherData.name}</h2>
            <br></br>
            <ul>
              <li>Current Temperature: {weatherData.main.temp}°F</li>
              <li>Relative Humidity: {weatherData.main.humidity}%</li>
              <li>Feels Like: {weatherData.main.feels_like}°F</li>
              <li>Current Sky: {weatherData.weather[0].description}</li>
              <li>High Temperature: {weatherData.main.temp_max}°F</li>
              <li>Low Temperature: {weatherData.main.temp_min}°F</li>
            </ul>
          </div>
        ) : error ? (
          <div className={styles['weatherData']}>
            <h3>Error Loading Weather</h3>
            <p className={styles['error']}>{error}</p>
          </div>
        ) : (
          <p>Loading weather data...</p>
        )}
      </div>
      <div>
        <input
          type="text"
          id="zip"
          placeholder="Zipcode"
          required
          size="10"
          onChange={handleZipChange}
          className={styles['zipBox']}
        />
      </div>
      <div>
        <button onClick={handleFindWeather}>Find Weather</button>
      </div>
    </div>
  );
}
export default Weather;
