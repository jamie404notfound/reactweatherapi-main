import React from "react";
import "../App.css";

class Today extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      today: [],
      year: 2023,
      month: 3,
      day: 1,
      sortOrder: "",
    };
  }

  componentDidMount() {
    this.setState({ sortOrder: "" }, () => {
      this.getData();
    });
  }

  getData() {
    const year = 2023;
    const month = 3;
    const day = 1;
    fetch(`http://localhost:3005/today/${year}-${month}-${day}`)
      .then((data) => data.json())
      .then((data) => this.setState({ today: data }));
  }

  getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);

    return date.toLocaleString("en-US", {
      month: "long",
    });
  }

  sortDataTable = (sortOrder) => {
    const { today } = this.state;

    const sortProperties = {
      airAsc: "air_temperature",
      airDesc: "air_temperature",
      roadAsc: "road_surface_temperature",
      roadDesc: "road_surface_temperature",
      windAsc: "wind_speed",
      windDesc: "wind_speed",
    };

    const sortProperty = sortProperties[sortOrder];
    const sortedData = [...today].sort(
      (a, b) => a[sortProperty] - b[sortProperty]
    );

    if (
      sortOrder === "airDesc" ||
      sortOrder === "roadDesc" ||
      sortOrder === "windDesc"
    ) {
      sortedData.reverse();
    }

    this.setState({ today: sortedData, sortOrder });
  };

  forwardDay = () => {
    let { year, month, day } = this.state;

    day =
      day === 28 && month === 2 ? 1 : day === 21 && month === 3 ? 21 : day + 1;
    month = day === 1 ? month + 1 : month;

    fetch(`http://localhost:3005/today/${year}-${month}-${day}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ today: data, year, month, day });
      });
  };

  backDay = () => {
    let { year, month, day } = this.state;

    day =
      day === 1 && month === 3 ? 28 : day === 17 && month === 2 ? 17 : day - 1;
    month = day === 28 ? month - 1 : month;

    fetch(`http://localhost:3005/today/${year}-${month}-${day}`)
      .then((data) => data.json())
      .then((data) => {
        this.setState({ today: data, year, month, day });
      });
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css"
        ></link>
        <h1>
          <label>{`${this.getMonthName(this.state.month)} 
          ${this.state.day}, 
          ${this.state.year}`}</label>
        </h1>
        <button className="btn btn-primary btn-sm" onClick={this.backDay}>
          {"<<"}
        </button>
        &zwnj; &zwnj;
        <button className="btn btn-primary btn-sm" onClick={this.forwardDay}>
          {">>"}
        </button>
        <br />
        <br />
        <table className="table-striped table">
          <thead>
            <tr>
              <th>Site Name</th>
              <th>
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("airAsc")}
                >
                  <h6>↑</h6>
                </button>{" "}
                Air Temperature °C
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("airDesc")}
                >
                  <h6>↓</h6>
                </button>
              </th>
              <th>
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("roadAsc")}
                >
                  <h6>↑</h6>
                </button>{" "}
                Road Temperature °C
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("roadDesc")}
                >
                  <h6>↓</h6>
                </button>
              </th>
              <th>
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("windAsc")}
                >
                  <h6>↑</h6>
                </button>{" "}
                Wind Speed km/h
                <button
                  className="btn"
                  onClick={() => this.sortDataTable("windDesc")}
                >
                  <h6>↓</h6>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {this.state.today.map((item, t) => {
              return (
                <tr key={t}>
                  <td>
                    <a
                      className="nav"
                      href={`today/${item.site_name}/${this.state.year}-${this.state.month}-${this.state.day}`}
                    >
                      {item.site_name}
                    </a>
                  </td>
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

export default Today;
