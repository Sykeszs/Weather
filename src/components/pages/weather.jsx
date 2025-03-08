
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTemperatureHigh } from "react-icons/fa";
import { FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { GiPressureCooker } from "react-icons/gi";
import { WEATHER_API_KEY, WEATHER_API_URL } from "./api";
import Navbar from './navbar';

const WEEK_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const Weather = () => {
  const [location, setLocation] = useState('Philippines');  // Default location
  const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // For location suggestions

  const dayInAWeek = new Date().getDay();
  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek));

  const handleSearch = async () => {
    try {
      const apiKey = '99f35f301ce4439188d8ecdeef4371c7';
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${location}&key=${apiKey}`
      );

      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry;
        setCoordinates({ lat, lng });
      } else {
        alert('Location not found');
      }
    } catch (error) {
      console.error('Error fetching location:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const apiKey = '99f35f301ce4439188d8ecdeef4371c7';
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${query}&key=${apiKey}&limit=5`
      );

      const fetchedSuggestions = response.data.results.map((result) => result.formatted);
      setSuggestions(fetchedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  useEffect(() => {
    // Default coordinates for Philippines
    const defaultCoordinates = { lat: 12.8797, lng: 121.7740 }; // Philippines' lat, lng

    const coords = coordinates.lat ? coordinates : defaultCoordinates;

    if (coords.lat && coords.lng) {
      const currentWeatherFetch = fetch(
        `${WEATHER_API_URL}/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}&units=metric`
      );
      const forecastFetch = fetch(
        `${WEATHER_API_URL}/forecast?lat=${coords.lat}&lon=${coords.lng}&appid=${WEATHER_API_KEY}&units=metric`
      );

      Promise.all([currentWeatherFetch, forecastFetch])
        .then(async (response) => {
          const weatherResponse = await response[0].json();
          const forecastResponse = await response[1].json();

          const cityName = location.split(',')[0].trim();
          setCurrentWeather({ city: cityName, ...weatherResponse });
          setForecast({ city: cityName, ...forecastResponse });
        })
        .catch(console.error);
    }
  }, [coordinates, location]);

  return (
    <div className="bg-CA min-h-screen w-full h-full">
      <div className="flex lg:flex-row flex-col p-0 lg:px-5">

        <Navbar />
        {/* Weather Content */}
        <div className="flex-1 w-screen h-screen md:max-h-auto lg:max-h-screen min-h-screen p-5">
          {/* Search */}
          <div className="flex flex-col relative ml-12 lg:ml-0">
            <input
              type="text"
              placeholder="Enter location" 
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                fetchSuggestions(e.target.value);
              }}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
              className="w-full bg-CC p-2 mb-3 rounded-md"
            />

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute top-12 w-full md:w-4/5 bg-[#ffffff] rounded-md shadow-lg z-10">
                {suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setLocation(suggestion);
                      setSuggestions([]);
                      handleSearch();
                    }}
                  >
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Current Weather */}
          {currentWeather && (
            <div className="flex flex-row w-full md:h-2/6 mb-3 h-auto rounded-md p-2">
              <div className="flex-1">
                <div className="flex flex-col p-5 justify-between w-full h-full">
                  <div className='text-black'>
                    <p className="font-bold text-4xl">{currentWeather.city}</p>
                    <div className="font-bold text-xl">
                      {currentWeather.weather[0].description}
                    </div>
                    <div className="font-semibold text-xl">
                      H:{Math.round(currentWeather.main.temp_max)}° L:{Math.round(currentWeather.main.temp_min)}°
                    </div>
                  </div>
                  <div className="font-semibold text-7xl">
                    {Math.round(currentWeather.main.temp)}°
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="w-full h-full flex justify-center items-center">
                  <img
                    alt="weather"
                    src={`icons/${currentWeather.weather[0].icon}.png`}
                    className="w-56"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Today Forecast */}
          {forecast && (
            <div className="flex flex-col w-full bg-CC mb-3 rounded-md p-4">
              <div>TODAY'S FORECAST</div>
              <div className="flex flex-row w-full mt-2 items-center justify-between">
                {forecast.list.slice(0, 6).map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center px-2">
                    <div className="text-xs p-1">{`${(idx + 1) * 3}:00`}</div>
                    <div>
                      <img alt="weather" src={`icons/${item.weather[0].icon}.png`} className="w-9" />
                    </div>
                    <div>{Math.round(item.main.temp)}°</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Air Condition */}
          {currentWeather && (
            <div className="flex flex-col w-full bg-CC rounded-md p-4">
              <div className="mb-3">
                <p>AIR CONDITION</p>
              </div>
              <div className="w-full px-5">
                <div className="flex flex-row w-full items-center justify-center">
                  <div className="w-1/2">
                    <div className="flex flex-row">
                      <FaTemperatureHigh size={18} />
                      <p className="text-sm ml-2">Feels like</p>
                    </div>
                    <p className="text-md pl-7">27°</p>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-row">
                      <FaWind size={18} />
                      <p className="text-sm ml-2">Wind</p>
                    </div>
                    <p className="text-md pl-7">{currentWeather.wind.speed} m/s</p>
                  </div>
                </div>
                <div className="flex flex-row w-full items-center justify-center mt-2">
                  <div className="w-1/2">
                    <div className="flex flex-row">
                      <WiHumidity size={18} />
                      <p className="text-sm ml-2">Humidity</p>
                    </div>
                    <p className="text-md pl-7">{currentWeather.main.humidity}%</p>
                  </div>
                  <div className="w-1/2">
                    <div className="flex flex-row">
                      <GiPressureCooker size={18} />
                      <p className="text-sm ml-2">Pressure</p>
                    </div>
                    <p className="text-md pl-7">{currentWeather.main.pressure} hPa</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 7 days forecast */}
        {forecast && (
          <div className="flex-none w-full lg:w-2/6 px-5 pb-5 pt-0 lg:px-0 lg:py-5 mt-3 lg:mt-0">
            <div className="flex w-full h-full bg-CC rounded-md p-2">
              <div className="flex flex-col w-full p-5 justify-between">
                <p>7-DAY FORECAST</p>
                {forecast.list.slice(0, 7).map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 my-2 rounded">
                    <div className="flex w-full justify-between">
                      <p className="w-1/4">{forecastDays[idx]}</p>
                      <div className="w-2/3 flex items-center justify-center">
                        <img
                          alt="weather"
                          src={`/icons/${item.weather[0].icon}.png`}
                          className="w-10 pr-3"
                        />
                        <p className="text-sm">{item.weather[0].description}</p>
                      </div>
                      <p className="w-1/4 text-right">{Math.round(item.main.temp_max)}°</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;