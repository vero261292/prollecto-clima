import axios from "axios";
import { useState, useEffect } from "react";

const Clima = () => {
  const [clima, setClima] = useState({});
  const [unit, setUnit] = useState("metric");

  const icons = {
    "01d": "/icons/01d.svg",
    "02d": "/icons/02d.svg",
    "03d": "/icons/03d.svg",
    "04d": "/icons/04d.svg",
    "09d": "/icons/09d.svg",
    "10d": "/icons/10d.svg",
    "11d": "/icons/11d.svg",
    "13d": "/icons/13d.svg",
    "50d": "/icons/50d.svg",
    "01n": "/icons/01n.svg",
    "02n": "/icons/02n.svg",
    "03n": "/icons/03n.svg",
    "04n": "/icons/04n.svg",
    "09n": "/icons/09n.svg",
    "10n": "/icons/10n.svg",
    "11n": "/icons/11n.svg",
    "13n": "/icons/13n.svg",
    "50n": "/icons/50n.svg",
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=9410d47474e20ec2a521f200b20bdbbf&lang=sp&units=metric`
        )
        .then((resp) => setClima(resp.data))
        .catch((error) => console.error(error));
    });
  }, []);

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="weather_card">
      <div className="title">
        <h1>WEATHER APP</h1>
      </div>
      <h1 className="temperature">
        {unit === "metric"
          ? Math.round(clima.main?.temp)
          : Math.round((clima.main?.temp * 9) / 5 + 32)}
        {unit === "metric" ? " °C" : " °F"}
      </h1>
      <div className="Climate_Image">
        <img src={icons[clima.weather?.[0].icon]} alt="iconos" />
      </div>
      <div className="environmental_container">
        <p>VIENTO: {clima.wind?.speed} m/s</p>
        <p>NUBES: {clima.clouds?.all} %</p>
        <p>PRESIÓN: {clima.main?.pressure} hPa </p>
      </div>
      <div className="bottom_row">
        <div className="city_container">
          <p>
            {clima.name}, {clima.sys?.country}
          </p>
        </div>
        <div className="sky_status">
          <p>{clima.weather?.[0].description}</p>
        </div>
      </div>
      <button className="units_button" onClick={toggleUnit}>
        <i className="fg"> F/G </i>
        <i className="fa-solid fa-temperature-low"></i>
        
      </button>
    </div>
  );
};

export default Clima;



