import React from "react";
import { Droplet, Eye, MapPin, Wind } from "react-feather";
import getWeather from "./apikey";
import apikey2 from "./apikey2";
import loaderGif from "../Assets/WeatherIcons.gif";
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
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day}, ${date} ${month} ${year}`;
};

class CurrentLocation extends React.Component {
  state = {
    lat: undefined,
    lon: undefined,
    errorMessage: undefined,
    temperatureC: undefined,
    temperatureF: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    deg: undefined,
    description: undefined,
    icon: "CLEAR_DAY",
    sunrise: undefined,
    sunset: undefined,
    errorMsg: undefined,
  };

  componentDidMount() {
    if (navigator.geolocation) {
      this.getPosition()
        .then((pos) =>
          this.getWeather(pos.coords.latitude, pos.coords.longitude)
        )
        .catch((err) => {
          this.getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real time weather."
          );
        });
    } else {
      alert("Geolocation not available");
    }
    this.timerID = setInterval(
      () => getWeather(this.state.lat, this.state.lon),
      600000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  getPosition = (options) => {
    return new Promise(function (resolve, reject) {
      navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
  };

  getWeather = async (lat, lon) => {
    const api_call = await fetch(
      `${apikey2.base}weather?lat=${lat}&lon=${lon}&appid=${apikey2.api_Key}&units=metric`
    );

    const data = await api_call.json();
    this.setState({
      lat: lat,
      lon: lon,
      city: data.name,
      temperatureC: Math.round(data.main.temp),
      // temperatureF: Math.round(data.main.temp * 1.8 + 32),
      humidity: data.main.humidity,
      main: data.weather[0].main,
      wind: data.wind.speed,
      deg: data.wind.deg,
      country: data.sys.country,
      icon: data.weather[0].icon,
      visibility: data.visibility,
      // sunrise: this.getTimeFromUnixTimeStamp(data.sys.sunrise),

      // sunset: this.getTimeFromUnixTimeStamp(data.sys.sunset),
    });
    // switch (this.state.main) {
    //   case "Haze":
    //     this.setState({ icon: "CLEAR_DAY" });
    //     break;
    //   case "Clouds":
    //     this.setState({ icon: "CLOUDY" });
    //     break;
    //   case "Rain":
    //     this.setState({ icon: "RAIN" });
    //     break;
    //   case "Snow":
    //     this.setState({ icon: "SNOW" });
    //     break;
    //   case "Dust":
    //     this.setState({ icon: "WIND" });
    //     break;
    //   case "Drizzle":
    //     this.setState({ icon: "SLEET" });
    //     break;
    //   case "Fog":
    //     this.setState({ icon: "FOG" });
    //     break;
    //   case "Smoke":
    //     this.setState({ icon: "FOG" });
    //     break;
    //   case "Tornado":
    //     this.setState({ icon: "WIND" });
    //     break;
    //   default:
    //     this.setState({ icon: "CLEAR_DAY" });
    // }
  };

  render() {
    if (this.state.temperatureC) {
      return (
        <>
          <div className="app">
            <h1> Current Location Data </h1>
            <div className="content">
              <div className="location d-flex">
                <MapPin />
                <h2>
                  {this.state.city} <span>({this.state.country})</span>
                </h2>
              </div>
              <p className="datatext">{dateBuilder(new Date())}</p>

              <div className="weatherdesc d-flex flex-c">
                <img
                  src={`https://openweathermap.org/img/wn/${this.state.icon}.png`}
                  alt=""
                />
                <h3>{this.state.main}</h3>
              </div>

              <div className="temperature d-flex">
                <h1>
                  {this.state.temperatureC}
                  <span>&deg;C</span>
                </h1>
              </div>

              <div className="windstats d-flex">
                <Wind />
                <h3>
                  {this.state.wind} knots in {this.state.deg}&deg;
                </h3>
              </div>

              <div className="windstats d-flex">
                <Droplet />
                <h3>
                  {this.state.humidity}% <span>(humidity)</span>
                </h3>
              </div>

              <div className="windstats d-flex">
                <Eye />
                <h3>
                  {this.state.visibility} mi <span>(Visibility)</span>
                </h3>
              </div>
            </div>
          </div>
          {/* {this.state.data} */}
        </>
      );
    } else {
      return (
        <div style={{ gap: "5px" }}>
          <img
            src={loaderGif}
            style={{
              width: "50%",
              WebkitUserDrag: "none",
              display: "block",
              marginRight: "auto",
              marginLeft: "auto",
            }}
          />
          <h3
            style={{
              color: "white",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "600",
            }}
          >
            Detecting your location
          </h3>
          <h3
            style={{ color: "white", textAlign: "center", marginTop: "10px" }}
          >
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real time weather.
          </h3>
        </div>
      );
    }
  }
}

export default CurrentLocation;
