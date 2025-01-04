import React from "react";
import "../App.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

class LiveMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = { sites: [], test: [], joinedArray: [] };
    this.liveSites = [];
  }

  componentDidMount() {
    fetch("http://localhost:3005/sites")
      .then((data) => data.json())
      .then((data) => this.setState({ sites: data }));

    fetch("https://tiitrafficdata.azurewebsites.net/api/Weather")
      .then((data2) => data2.json())
      .then((data2) => {
        this.setState({ test: data2 });

        // Joining arrays by site_name
        if (data2.features && data2.features.length > 0) {
          this.joinArraysBySiteName(this.state.sites, data2.features);
        }
      });
  }

  joinArraysBySiteName(sitesArray, weatherArray) {
    // Convert the weatherArray to an object for easier lookup
    const weatherMap = {};
    weatherArray.forEach((weather) => {
      const siteName = weather.properties.site_name;
      if (!weatherMap[siteName]) {
        weatherMap[siteName] = [];
      }
      weatherMap[siteName].push(weather);
    });

    // Joining arrays based on site_name
    const joinedArray = sitesArray.map((site) => {
      return {
        ...site,
        weatherData: weatherMap[site.site_name] || [],
      };
    });

    // Update the state with the joined array
    this.setState({ joinedArray });
    this.liveSites = joinedArray;
  }

  render() {
    return (
      <MapContainer
        center={[53.49592253769749, -8.204975925034635]}
        zoom={7}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div>
          {this.liveSites.map((item, t) => {
            return (
              <Marker key={t} position={[item.lat, item.lng]}>
                <Popup>
                  <b>
                    <u key={t}>{item.site_name}</u>
                  </b>{" "}
                  <br /> {[item.weatherData[0].properties.weather_definition]}{" "}
                  <img
                    src={`./${[
                      item.weatherData[0].properties.weather_definition,
                    ]}.png`}
                    alt="loading.."
                    style={{ width: 25 }}
                    loading="lazy"
                  />
                  <br />
                  {[
                    Math.round(
                      item.weatherData[0].properties.air_temperature * 100
                    ) / 100,
                  ]}{" "}
                  °C
                  <br />
                  {[
                    Math.round(
                      item.weatherData[0].properties.wind_speed * 100
                    ) / 100,
                  ]}{" "}
                  km/h
                  <a
                    href={[item.weatherData[0].properties.camera_image]}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <br />
                    <img
                      src="./cam.png"
                      alt="loading.."
                      style={{ width: 25 }}
                      loading="lazy"
                    />
                  </a>
                </Popup>
              </Marker>
            );
          })}
        </div>
      </MapContainer>
    );
  }
}
export default LiveMap;
