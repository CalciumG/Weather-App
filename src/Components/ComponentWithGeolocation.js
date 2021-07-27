import React, { useState } from "react";
import useGeolocation from "react-hook-geolocation";

const api = {
  key: "01e996920f65e535c780c5ad7bef78ce",
  base: "http://api.openweathermap.org/data/2.5/",
};

const cityApi = {
  key: "b6b6fa899ed2921a32d25deb7e6db975",
  base: "http://api.positionstack.com/v1/reverse?",
};

function ComponentWithGeolocation() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");
  const geolocation = useGeolocation();

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const fetchCity = (city) => {
    fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };

  const getCity = () => {
    fetch(
      `${cityApi.base}access_key=${cityApi.key}&query=${geolocation.latitude},${geolocation.longitude}`
    )
      .then((res) => res.json())
      .then((result) => {
        fetchCity(result.data[0].locality);
      });
  };

  const dateBuilder = (d) => {
    let months = [
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

    let days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "app warm"
            : "app cool"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}C</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : (
          ""
        )}
        <h1>{geolocation.latitude}</h1>
        <h1>{geolocation.longitude}</h1>
        <button onClick={getCity}>Here</button>
      </main>
    </div>
  );
}

export default ComponentWithGeolocation;
