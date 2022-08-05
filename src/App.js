import React, { useState } from "react";
import axios from "axios";

// Access api https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  // const searchLocation = (event) => {
  //   if (event.key === "Enter") {
  //     axios.get(url).then((response) => {
  //       setData(response.data);
  //       console.log(response.data);
  //     });
  //     setLocation("");
  //   }
  // };

  // Attempting to use parameters in the axios request to pass back the location
  const searchLocation = (event) => {
    if (event.key === "Enter") {
      const options = {
        method: "GET",
        url: `/weather`,
        params: { location: location },
      };

      axios
        .request(options)
        .then((response) => {
          setData(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter A City Name"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°F</p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
