import React, { useState, useEffect } from "react";

function Weather() {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location) return;

    setLoading(true);
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=19b15efc74b01eb7cc0574d85791c65c`
    )
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch data");
        return response.json();
      })
      .then((data) => {
        setData(data);
        setError("");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [location]);

  return (
    <div className="mainpage">
      <div className="inputplace">
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {data && !error && (
        <div>
          <div className="allnaC">
            <div className="name">
              <h4> {data.name}</h4>
              <h1 className="Temperature">{data.main.temp} </h1>
            </div>

            <p className="Condition">{data.weather[0].description}</p>
          </div>
        </div>
      )}

      {/* Footer will always be shown, even without data */}
      <div className="footer">
        <div className="temp">
          <p>{data ? data.main.temp : ""}</p>
          <p>Feel Like</p>
        </div>

        <div className="hum">
          <p>{data ? data.main.humidity : ""}</p>
          <p>Humidity</p>
        </div>

        <div className="wind">
          <p>{data ? data.wind.speed : ""}</p>
          <p>Wind Speed</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;
