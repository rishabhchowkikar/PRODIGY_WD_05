import React, { useState } from "react";
import { Search, MapPin, Wind, Droplet, Eye } from "react-feather";
import "../App.css";
import getWeather from "./apikey";
const Weather = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});

  const getWeatherbyCity = async () => {
    const weatherData = await getWeather(city);
    setWeather(weatherData);
    setCity("");
  };

  const date = () => {
    let tdate = new Date();
    let day = days[tdate.getDay()];
    let date = tdate.getDate();
    let month = months[tdate.getMonth()];
    let year = tdate.getFullYear();
    return `${day}, ${date} ${month} ${year}`;
  };
  return (
    <div>
      <div className="app">
        <h1> Weather App </h1>
        <div className="input-wrapper">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter City Name"
          />
          <button onClick={() => getWeatherbyCity()}>
            <Search />
          </button>
        </div>

        {weather && weather.weather && (
          <div className="content">
            <div className="location d-flex">
              <MapPin />
              <h2>
                {weather.name} <span>({weather.sys.country})</span>
              </h2>
            </div>
            <p className="datatext">{date()}</p>

            <div className="weatherdesc d-flex flex-c">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                alt=""
              />
              <h3>{weather.weather[0].main}</h3>
            </div>

            <div className="temperature d-flex">
              <h1>
                {weather.main.temp}
                <span>&deg;C</span>
              </h1>
            </div>

            <div className="windstats d-flex">
              <Wind />
              <h3>
                {weather.wind.speed} knots in {weather.wind.deg}&deg;
              </h3>
            </div>

            <div className="windstats d-flex">
              <Droplet />
              <h3>
                {weather.main.humidity}% <span>(humidity)</span>
              </h3>
            </div>

            <div className="windstats d-flex">
              <Eye />
              <h3>
                {weather.visibility} mi <span>(Visibility)</span>
              </h3>
            </div>
          </div>
        )}
        {!weather.weather && (
          <div className="content">
            <h4>No Data Found!</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
