import React from "react";
import "../App.css";

class Live extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sites: [],
      joinedArray: [],
      filteredArray: [],
    };
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

    // Update the state with the joined array and filtered array
    this.setState({ joinedArray, filteredArray: joinedArray });
  }

  handleInputChange = (event) => {
    const inputValue = event.target.value.toLowerCase();

    // Filter the joinedArray based on the input value
    const filteredArray = this.state.joinedArray.filter((item) => {
      return item.site_name.toLowerCase().includes(inputValue);
    });

    // Update the state with the filtered array
    this.setState({ filteredArray });
  };

  windBearing(degrees) {
    if (degrees >= 337.5 || degrees < 22.5) {
      return "↑"; // North
    } else if (degrees >= 22.5 && degrees < 67.5) {
      return "↗"; // North East
    } else if (degrees >= 67.5 && degrees < 112.5) {
      return "→"; // East
    } else if (degrees >= 112.5 && degrees < 157.5) {
      return "↘"; // South East
    } else if (degrees >= 157.5 && degrees < 202.5) {
      return "↓"; // South
    } else if (degrees >= 202.5 && degrees < 247.5) {
      return "↙"; // South West
    } else if (degrees >= 247.5 && degrees < 292.5) {
      return "←"; // West
    } else {
      return "↖"; // North West
    }
  }

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>

        <h1>Live</h1>
        <a href="https://tiitrafficdata.azurewebsites.net/api/Weather">*</a>
        <hr />
        <h3>Site:</h3>
        <input
          type="text"
          className="form-control"
          placeholder=" site name"
          onChange={this.handleInputChange}
        />
        <hr />

        <table className="table-striped table">
          <thead>
            <tr>
              <th>Site</th>
              <th>Air Temperature</th>
              <th>Road Temperature</th>
              <th>Wind Speed km/h</th>
              <th>Wind Direction</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filteredArray.map((item, t) => {
              return (
                <tr key={t}>
                  <td>{item.site_name}</td>
                  <td>
                    {Math.round(
                      item.weatherData[0].properties.air_temperature * 100
                    ) / 100}
                  </td>
                  <td>
                    {Math.round(
                      item.weatherData[0].properties.road_surface_temperature *
                        100
                    ) / 100}
                  </td>
                  <td>
                    {Math.round(
                      item.weatherData[0].properties.wind_speed * 100
                    ) / 100}
                  </td>
                  <td>
                    {this.windBearing(
                      item.weatherData[0].properties.wind_direction_bearing
                    )}
                  </td>
                  <td>
                    {item.weatherData[0].properties.camera_image ? (
                      <a
                        href={item.weatherData[0].properties.camera_image}
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
                    ) : (
                      "No image"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default Live;
