import React from "react";
import "../App.css";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stats: [],
      averages: [],
      minAirSite: "",
      maxAirSit: "",
      maxWindSite: "",
    };
  }

  componentDidMount() {
    fetch("http://localhost:3005/weatherdata")
      .then((data) => data.json())
      .then((data) => this.setState({ stats: data }));

    fetch("http://localhost:3005/weatherdataaverage")
      .then((data) => data.json())
      .then((data) => this.setState({ averages: data }));
  }

  getMaxAirTemp() {
    const maxAirTemp = this.state.stats.reduce((acc, cur) => {
      return cur.air_temperature > acc ? cur.air_temperature : acc;
    }, 0);
    return maxAirTemp;
  }

  getMinAirTemp() {
    const minAirTemp = this.state.stats.reduce((acc, cur) => {
      return cur.air_temperature < acc ? cur.air_temperature : acc;
    }, 0);

    return minAirTemp;
  }

  getMaxRoadTemp() {
    const maxRoadTemp = this.state.stats.reduce((acc, cur) => {
      return cur.road_surface_temperature > acc
        ? cur.road_surface_temperature
        : acc;
    }, 0);

    return maxRoadTemp;
  }

  getMinRoadTemp() {
    const minRoadTemp = this.state.stats.reduce((acc, cur) => {
      return cur.road_surface_temperature < acc
        ? cur.road_surface_temperature
        : acc;
    }, 0);

    return minRoadTemp;
  }

  getMaxWindSpeed() {
    const maxWindSpeed = this.state.stats.reduce((acc, cur) => {
      return cur.wind_speed > acc ? cur.wind_speed : acc;
    }, 0);

    return maxWindSpeed;
  }

  getMinWindSpeed() {
    const minWindSpeed = this.state.stats.reduce((acc, cur) => {
      return cur.wind_speed < acc ? cur.wind_speed : acc;
    }, 0);

    return minWindSpeed;
  }

  getMinAirTempSite() {
    const minAirTempObj = this.state.stats.reduce(
      (acc, cur) => {
        return cur.air_temperature < acc.minTemp
          ? { minTemp: cur.air_temperature, siteName: cur.site_name }
          : acc;
      },
      { minTemp: Infinity, siteName: "" }
    );

    return minAirTempObj.siteName;
  }

  getMaxAirTempSite() {
    const maxAirTempObj = this.state.stats.reduce(
      (acc, cur) => {
        return cur.air_temperature > acc.maxTemp
          ? { maxTemp: cur.air_temperature, siteName: cur.site_name }
          : acc;
      },
      { maxTemp: -Infinity, siteName: "" }
    );

    return maxAirTempObj.siteName;
  }

  getMaxWindSpeedSite() {
    const maxWindSpeedObj = this.state.stats.reduce(
      (acc, cur) => {
        return cur.wind_speed > acc.maxSpeed
          ? { maxSpeed: cur.wind_speed, siteName: cur.site_name }
          : acc;
      },
      { maxSpeed: -Infinity, siteName: "" }
    );

    return maxWindSpeedObj.siteName;
  }

  render() {
    const { averages } = this.state;
    const airAverage = averages.length > 0 ? averages[0].airAverage : 0;
    const roadAverage = averages.length > 0 ? averages[0].roadAverage : 0;
    const windAverage = averages.length > 0 ? averages[0].windAverage : 0;

    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>
        <h1>Statistics</h1>
        <hr />
        <h2>National Statistics</h2>
        <table className="table-striped table">
          <thead>
            <tr>
              <th>Weather Measure</th>
              <th>Min</th>
              <th>Max</th>
              <th>Avg</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Air Temperature</td>
              <td>{this.getMinAirTemp()}</td>
              <td>{this.getMaxAirTemp()}</td>
              <td>{airAverage.toFixed(1)}</td>
            </tr>
            <tr>
              <td>Road Temperature</td>
              <td>{this.getMinRoadTemp()}</td>
              <td>{this.getMaxRoadTemp()}</td>
              <td>{roadAverage.toFixed(1)}</td>
            </tr>
            <tr>
              <td>Wind Speed</td>
              <td>{this.getMinWindSpeed()}</td>
              <td>{this.getMaxWindSpeed()}</td>
              <td>{windAverage.toFixed(1)}</td>
            </tr>
          </tbody>
        </table>
        <hr />
        <h2>Site Statistics</h2>
        <table className="table-striped table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Site</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Coldest</td>
              <td>{this.getMinAirTempSite()}</td>
              <td>{this.getMinAirTemp()}</td>
            </tr>
            <tr>
              <td>Warmest</td>
              <td>{this.getMaxAirTempSite()}</td>
              <td>{this.getMaxAirTemp()}</td>
            </tr>
            <tr>
              <td>Windiest</td>
              <td>{this.getMaxWindSpeedSite()}</td>
              <td>{this.getMaxWindSpeed()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default Stats;
