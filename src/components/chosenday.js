import React from "react";
import "../App.css";

class ChosenDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chosen: [],
      average: [],
      url: window.location.href.split("/"),
    };
  }

  componentDidMount() {
    let params =
      "/" + this.state.url[4].toString() + "/" + this.state.url[5].toString();

    fetch("http://localhost:3005/chosen" + params)
      .then((data) => data.json())
      .then((data) => this.setState({ chosen: data }));

    fetch("http://localhost:3005/weatherdataaverage" + params)
      .then((data) => data.json())
      .then((data) => this.setState({ average: data }));
  }

  getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  render() {
    let cameraSiteName = this.state.url[4]
      .toString()
      .replace("%20", " ")
      .replace("%20", " ");
    let day = this.state.url[5].toString().split("-")[2];
    let month = this.state.url[5].toString().split("-")[1];
    let year = this.state.url[5].toString().split("-")[0];

    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>

        <h1>
          {"@" +
            cameraSiteName +
            " " +
            this.getMonthName(month) +
            " " +
            day +
            ", " +
            year}
        </h1>

        <table className="table-striped table">
          <thead>
            {this.state.average.map((item, i) => {
              return (
                <tr key={i}>
                  <th>Time</th>
                  <th>{`Air Temperature °C (${item.airAverage})`}</th>
                  <th>{`Road Temperature °C (${item.roadAverage})`}</th>
                  <th>{`Wind Speed km/h (${item.windAverage})`}</th>
                </tr>
              );
            })}
          </thead>
          <tbody>
            {this.state.chosen.map((item, t) => {
              return (
                <tr key={t}>
                  <td>{item.timenow}</td>
                  <td>{item.air_temperature}</td>
                  <td>{item.road_surface_temperature}</td>
                  <td>{item.wind_speed}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
export default ChosenDay;
